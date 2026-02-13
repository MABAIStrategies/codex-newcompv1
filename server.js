"use strict";

const express = require("express");
const next = require("next");
const { SecretManagerServiceClient } = require("@google-cloud/secret-manager");
const Stripe = require("stripe");
const nodemailer = require("nodemailer");
const PDFDocument = require("pdfkit");
const { v4: uuidv4 } = require("uuid");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const server = express();
server.use(express.json({ limit: "2mb" }));

const secretClient = new SecretManagerServiceClient();
const secretCache = new Map();
const projectId = process.env.GOOGLE_CLOUD_PROJECT || process.env.GCP_PROJECT || process.env.SECRET_PROJECT_ID;

async function accessSecret(secretName, fallbackEnv) {
  const cacheKey = secretName || fallbackEnv;
  if (cacheKey && secretCache.has(cacheKey)) {
    return secretCache.get(cacheKey);
  }

  if (!secretName) {
    const fallback = fallbackEnv ? process.env[fallbackEnv] : "";
    if (fallback) {
      secretCache.set(cacheKey, fallback);
    }
    return fallback || "";
  }

  const resourceName = secretName.includes("/versions/")
    ? secretName
    : projectId
      ? `projects/${projectId}/secrets/${secretName}/versions/latest`
      : secretName;

  try {
    const [version] = await secretClient.accessSecretVersion({ name: resourceName });
    const value = version.payload?.data?.toString() || "";
    if (cacheKey) {
      secretCache.set(cacheKey, value);
    }
    return value;
  } catch (error) {
    console.error("SecretManager error", error.message);
    const fallback = fallbackEnv ? process.env[fallbackEnv] : "";
    if (fallback) {
      return fallback;
    }
    return "";
  }
}

let cachedStripe = null;
async function getStripeClient() {
  if (cachedStripe) return cachedStripe;
  const secretKey = await accessSecret(process.env.SECRET_STRIPE_KEY_NAME, "STRIPE_SECRET_KEY");
  if (!secretKey) return null;
  cachedStripe = new Stripe(secretKey, { apiVersion: "2024-06-20" });
  return cachedStripe;
}

let cachedTransporter = null;
async function getMailer() {
  if (cachedTransporter) return cachedTransporter;
  const smtpUri = await accessSecret(process.env.SECRET_SMTP_URI_NAME, "SMTP_URI");
  if (!smtpUri) return null;
  cachedTransporter = nodemailer.createTransport(smtpUri);
  return cachedTransporter;
}

function buildROITimeline(revenue, cost, optimization, months = 12) {
  return Array.from({ length: months }).map((_, idx) => {
    const baseline = revenue - cost;
    const optimizedRevenue = revenue * (1 + optimization / 100);
    const optimizedCost = cost * (1 - optimization / 280);
    const optimized = optimizedRevenue - optimizedCost;
    return {
      month: `M${idx + 1}`,
      baseline: Math.round(baseline),
      optimized: Math.round(optimized),
      netLift: Math.round(optimized - baseline)
    };
  });
}

server.post("/api/roi", async (req, res) => {
  const { currentRevenue = 120000, currentCost = 54000, optimizationPercent = 18 } = req.body || {};
  const timeline = buildROITimeline(Number(currentRevenue), Number(currentCost), Number(optimizationPercent));
  const summary = timeline.reduce(
    (acc, row) => {
      acc.asIs += row.baseline;
      acc.optimized += row.optimized;
      acc.lift += row.netLift;
      return acc;
    },
    { asIs: 0, optimized: 0, lift: 0 }
  );

  return res.json({
    timeline,
    summary,
    inputs: { currentRevenue, currentCost, optimizationPercent }
  });
});

server.get("/api/config/stripe-publishable", async (_req, res) => {
  const publishableKey = await accessSecret(process.env.SECRET_STRIPE_PUBLISHABLE_NAME, "STRIPE_PUBLISHABLE_KEY");
  if (!publishableKey) {
    return res.status(500).json({ error: "Stripe publishable key missing from Secret Manager" });
  }
  return res.json({ publishableKey });
});

server.post("/api/payments/intent", async (req, res) => {
  const { plan = "retainer" } = req.body || {};
  const stripe = await getStripeClient();

  if (!stripe) {
    return res.status(500).json({ error: "Stripe not configured" });
  }

  const amount = plan === "project" ? 250000 : 500000;

  try {
    const intent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      description: plan === "project" ? "Project Deposit" : "Retainer Start",
      automatic_payment_methods: { enabled: true },
      metadata: { plan }
    });

    return res.json({ clientSecret: intent.client_secret, amount });
  } catch (error) {
    console.error("Payment intent error", error.message);
    return res.status(500).json({ error: "Unable to create payment intent" });
  }
});

server.get("/api/config/calendar", async (_req, res) => {
  const embedUrl = await accessSecret(process.env.SECRET_CALENDAR_EMBED_NAME, "CALENDAR_EMBED_URL");
  return res.json({ embedUrl: embedUrl || "" });
});

server.post("/api/lead", async (req, res) => {
  const { name, email, phone, goal } = req.body || {};
  if (!email) {
    return res.status(400).json({ error: "Email is required for lead capture" });
  }

  const webformEndpoint = await accessSecret(process.env.SECRET_WEBFORM3_ENDPOINT_NAME, "WEBFORM3_ENDPOINT");
  const webformToken = await accessSecret(process.env.SECRET_WEBFORM3_TOKEN_NAME, "WEBFORM3_TOKEN");

  try {
    if (webformEndpoint) {
      await fetch(webformEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(webformToken ? { Authorization: `Bearer ${webformToken}` } : {})
        },
        body: JSON.stringify({
          to: "mark@mabaistrategies.com",
          name,
          email,
          phone,
          goal
        })
      });
    }

    const transporter = await getMailer();
    const fromAddress = process.env.NOTIFY_FROM || "noreply@mabaistrategies.com";

    if (transporter) {
      await transporter.sendMail({
        to: "mark@mabaistrategies.com",
        from: fromAddress,
        subject: "New MAB AI Strategies webform lead",
        text: `Lead capture\nName: ${name}\nEmail: ${email}\nPhone: ${phone || "n/a"}\nGoal: ${goal || "n/a"}`
      });

      await transporter.sendMail({
        to: email,
        from: fromAddress,
        subject: "MAB AI Strategies | Command Center Received",
        text: "We received your request. Expect a curated ROI briefing and scheduling link within one business day."
      });
    }

    return res.json({ status: "ok", autoresponder: Boolean(await getMailer()) });
  } catch (error) {
    console.error("Lead capture error", error.message);
    return res.status(500).json({ error: "Lead capture failed" });
  }
});

server.post("/api/report", async (req, res) => {
  const { email, summary = "ROI Snapshot", timeline = [] } = req.body || {};
  if (!email) {
    return res.status(400).json({ error: "Email required for gated report delivery" });
  }

  try {
    const doc = new PDFDocument({ margin: 50 });
    const buffers = [];

    doc.on("data", (data) => buffers.push(data));
    doc.on("end", async () => {
      const transporter = await getMailer();
      const pdfBuffer = Buffer.concat(buffers);
      const fromAddress = process.env.NOTIFY_FROM || "noreply@mabaistrategies.com";

      if (transporter) {
        await transporter.sendMail({
          to: email,
          from: fromAddress,
          subject: "Your ROI Accelerator Report",
          text: "Attached is your interactive ROI briefing. Reply to slot a workshop with our architects.",
          attachments: [{ filename: "roi-report.pdf", content: pdfBuffer }]
        });
      }

      return res.json({ status: "ok", gated: true });
    });

    doc.fontSize(20).fillColor("#0b1a30").text("MAB AI Strategies | ROI Briefing", { underline: true });
    doc.moveDown();
    doc.fontSize(12).fillColor("#000").text(summary);
    doc.moveDown();
    doc.text("12-month lift projection (as-is vs optimized):");
    doc.moveDown();

    timeline.slice(0, 12).forEach((row) => {
      doc.text(`${row.month}: Baseline $${row.baseline?.toLocaleString?.() || row.baseline} -> Optimized $${row.optimized?.toLocaleString?.() || row.optimized}`);
    });

    doc.moveDown();
    doc.text("Delivered by MAB AI Strategies — engineered for Cloud Run, Stripe, and calendar orchestration.");
    doc.end();
  } catch (error) {
    console.error("Report generation error", error.message);
    return res.status(500).json({ error: "Unable to generate report" });
  }
});

server.post("/api/ai-template", async (req, res) => {
  const { email, company, goal } = req.body || {};
  const sessionId = uuidv4();
  const webhook = process.env.AI_TEMPLATE_WEBHOOK || "https://ai-site-spark-19.lovable.app/api/webhook";
  const baseUrl = process.env.AI_TEMPLATE_BASE || "https://ai-site-spark-19.lovable.app/";
  const payload = {
    sessionId,
    email,
    company,
    goal,
    source: "mab-ai-strategies",
    createdAt: new Date().toISOString()
  };

  try {
    await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
  } catch (error) {
    console.error("AI template webhook failed", error.message);
  }

  const launchUrl = `${baseUrl}?session=${encodeURIComponent(sessionId)}&source=mab`;
  return res.json({ launchUrl, sessionId });
});

app.prepare().then(() => {
  server.all("*", (req, res) => handle(req, res));

  const port = process.env.PORT || 3000;
  server.listen(port, "0.0.0.0", () => {
    console.log(`MAB AI Strategies server ready on port ${port}`);
  });
});
