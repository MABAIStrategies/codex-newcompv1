"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

type RoiRow = {
  month: string;
  baseline: number;
  optimized: number;
  netLift: number;
};

const defaultInputs = {
  currentRevenue: 120000,
  currentCost: 54000,
  optimizationPercent: 18
};

const formatter = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

function buildFallbackTimeline(revenue: number, cost: number, optimization: number): RoiRow[] {
  return Array.from({ length: 12 }).map((_, idx) => {
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

export default function ROIShowcase() {
  const [inputs, setInputs] = useState(defaultInputs);
  const [timeline, setTimeline] = useState<RoiRow[]>(() =>
    buildFallbackTimeline(defaultInputs.currentRevenue, defaultInputs.currentCost, defaultInputs.optimizationPercent)
  );
  const [reportEmail, setReportEmail] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    setIsLoading(true);
    const timer = setTimeout(() => {
      fetch("/api/roi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(inputs),
        signal: controller.signal
      })
        .then((res) => res.json())
        .then((data) => setTimeline(data.timeline || []))
        .catch(() =>
          setTimeline(buildFallbackTimeline(inputs.currentRevenue, inputs.currentCost, inputs.optimizationPercent))
        )
        .finally(() => setIsLoading(false));
    }, 320);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [inputs]);

  const summary = useMemo(() => {
    return timeline.reduce(
      (acc, row) => {
        acc.asIs += row.baseline;
        acc.optimized += row.optimized;
        acc.lift += row.netLift;
        return acc;
      },
      { asIs: 0, optimized: 0, lift: 0 }
    );
  }, [timeline]);

  const barData = [
    { name: "As-Is", value: summary.asIs },
    { name: "Optimized", value: summary.optimized },
    { name: "Net Lift", value: summary.lift }
  ];

  const handleReport = async () => {
    if (!reportEmail) {
      setStatus("Enter an email to unlock the PDF briefing.");
      return;
    }
    setStatus("Packaging your gated PDF via secure Cloud Run...");
    try {
      await fetch("/api/report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: reportEmail, summary: "ROI acceleration briefing", timeline })
      });
      setStatus("Report sent to your inbox — check spam just in case.");
    } catch (error) {
      setStatus("We could not dispatch email right now. Try again shortly.");
    }
  };

  return (
    <div className="section-shell relative">
      <div className="absolute inset-0 bg-gold-radial opacity-30 pointer-events-none" />
      <div className="relative grid lg:grid-cols-3 gap-6">
        <div className="space-y-4">
          <p className="text-xs uppercase tracking-[0.28em] text-mab-gold">ROI command</p>
          <h2 className="font-heading text-3xl text-mab-ivory">12-month ROI canvas</h2>
          <p className="text-mab-ivory/70">
            Adjust assumptions and watch the timeline and bar chart respond instantly. Every input is wired to the
            Express ROI endpoint for Cloud Run.
          </p>

          <div className="space-y-3 text-sm text-mab-ivory/80">
            <label className="flex justify-between gap-3">
              <span>Current monthly revenue</span>
              <input
                type="number"
                className="bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-right"
                value={inputs.currentRevenue}
                onChange={(e) => setInputs((prev) => ({ ...prev, currentRevenue: Number(e.target.value) }))}
              />
            </label>
            <label className="flex justify-between gap-3">
              <span>Current monthly cost</span>
              <input
                type="number"
                className="bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-right"
                value={inputs.currentCost}
                onChange={(e) => setInputs((prev) => ({ ...prev, currentCost: Number(e.target.value) }))}
              />
            </label>
            <label className="flex justify-between gap-3">
              <span>Optimization lift %</span>
              <input
                type="range"
                min={5}
                max={45}
                value={inputs.optimizationPercent}
                className="w-40 accent-mab-gold"
                onChange={(e) => setInputs((prev) => ({ ...prev, optimizationPercent: Number(e.target.value) }))}
              />
              <span className="text-mab-gold font-semibold">{inputs.optimizationPercent}%</span>
            </label>
          </div>

          <div className="flex items-center gap-4">
            <Image
              src="/headshot.svg"
              alt="MAB AI Strategies principal"
              width={60}
              height={60}
              className="rounded-2xl border border-white/10 bg-black/50"
            />
            <div>
              <p className="text-mab-ivory font-semibold">Mark Bais</p>
              <p className="text-xs text-mab-ivory/70">Principal Architect | MAB AI Strategies</p>
            </div>
          </div>

          <div className="rounded-2xl border border-mab-gold/30 bg-mab-gold/10 p-4 space-y-3">
            <p className="text-sm text-mab-ivory/80">Gate the PDF report to your inbox.</p>
            <div className="flex gap-3">
              <input
                type="email"
                placeholder="you@company.com"
                className="flex-1 bg-black/40 border border-white/10 rounded-lg px-3 py-2"
                value={reportEmail}
                onChange={(e) => setReportEmail(e.target.value)}
              />
              <button
                type="button"
                onClick={handleReport}
                className="rounded-xl bg-mab-gold text-mab-deep px-4 py-2 font-semibold shadow-glow hover:scale-[1.01] transition"
              >
                Send PDF
              </button>
            </div>
            {status && <p className="text-xs text-mab-ivory/70">{status}</p>}
          </div>
        </div>

        <div className="lg:col-span-2 grid gap-6">
          <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm text-mab-ivory/70">12-month timeline</p>
              <span className="text-xs text-mab-gold">{isLoading ? "Refreshing..." : "Live"}</span>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={timeline}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1f2b40" />
                  <XAxis dataKey="month" stroke="#f8f9fa" />
                  <YAxis stroke="#f8f9fa" tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
                  <Tooltip
                    contentStyle={{ background: "#0b1a30", border: "1px solid #d4af37", borderRadius: 12 }}
                    formatter={(value: number) => formatter.format(value)}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="baseline" stroke="#f8f9fa" strokeWidth={2} dot={false} name="As-Is" />
                  <Line type="monotone" dataKey="optimized" stroke="#d4af37" strokeWidth={2} dot={false} name="Optimized" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm text-mab-ivory/70">As-is vs optimized</p>
              <span className="text-xs text-mab-gold">Net lift {formatter.format(summary.lift)}</span>
            </div>
            <div className="h-52">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1f2b40" />
                  <XAxis dataKey="name" stroke="#f8f9fa" />
                  <YAxis stroke="#f8f9fa" tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
                  <Tooltip
                    contentStyle={{ background: "#0b1a30", border: "1px solid #d4af37", borderRadius: 12 }}
                    formatter={(value: number) => formatter.format(value)}
                  />
                  <Bar dataKey="value" fill="#d4af37" radius={[12, 12, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
