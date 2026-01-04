"use client";

import { useEffect, useState } from "react";
import CTAButton from "@/components/ui/CTAButton";
import MotionShell from "@/components/ui/MotionShell";

const automationSlides = [
  {
    title: "Ops Automation",
    description: "API-first bots reconcile data, trigger approvals, and notify owners with observability built in.",
    metric: "-42% cycle time",
    tag: "SLA guardian"
  },
  {
    title: "Revenue Command",
    description: "Outbound agents mine intent, auto-draft outreach, and sync with human closers in a single lane.",
    metric: "+19% win rate",
    tag: "Deal acceleration"
  },
  {
    title: "Customer Intelligence",
    description: "Contextual copilots resolve tickets, update records, and turn every conversation into insights.",
    metric: "85% CSAT",
    tag: "Delight loop"
  }
];

export default function ServicesPage() {
  const [index, setIndex] = useState(0);
  const [clock, setClock] = useState<string>(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
  const [profit, setProfit] = useState(128000);

  useEffect(() => {
    const rotate = setInterval(() => setIndex((prev) => (prev + 1) % automationSlides.length), 4200);
    const tick = setInterval(() => setClock(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })), 1000);
    const profitTick = setInterval(() => setProfit((p) => p + Math.floor(Math.random() * 120 + 80)), 900);
    return () => {
      clearInterval(rotate);
      clearInterval(tick);
      clearInterval(profitTick);
    };
  }, []);

  const slide = automationSlides[index];

  return (
    <div className="space-y-12">
      <MotionShell className="section-shell">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-[0.28em] text-mab-gold">Automation slider</p>
            <h1 className="font-heading text-4xl text-mab-ivory">Deploy autonomous lanes with human-in-the-loop control.</h1>
            <p className="text-mab-ivory/70 max-w-3xl">
              Build animated flows, clock your wins, and visualize profit lift as you hover and engage. Every CTA routes you into the exact lane you need.
            </p>
          </div>
          <CTAButton href="#consult" label="Schedule Consultation" glow />
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mt-8">
          <div id="automation" className="motion-grid p-5 rounded-2xl">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-mab-ivory/70">Automation lane</p>
              <span className="text-xs uppercase tracking-[0.18em] text-mab-gold">Live</span>
            </div>
            <div className="relative overflow-hidden rounded-xl border border-white/5 bg-black/40 p-5 min-h-[220px]">
              <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_20%_20%,rgba(212,175,55,0.2),transparent_35%)]" />
              <div className="relative space-y-3">
                <div className="flex items-center gap-3">
                  <span className="h-3 w-3 rounded-full bg-mab-gold animate-pulse" />
                  <p className="text-mab-ivory/80">{slide.tag}</p>
                </div>
                <h3 className="font-heading text-2xl text-mab-ivory">{slide.title}</h3>
                <p className="text-mab-ivory/70">{slide.description}</p>
                <div className="inline-flex items-center gap-2 rounded-full border border-mab-gold/30 bg-mab-gold/10 px-3 py-1 text-sm text-mab-gold">
                  {slide.metric}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3 mt-4 text-sm text-mab-ivory/70">
              {["Observe", "Authorize", "Deploy"].map((stage, i) => (
                <div key={stage} className={`rounded-xl border px-3 py-4 text-center ${i === index ? "border-mab-gold text-mab-gold" : "border-white/10"}`}>
                  {stage}
                </div>
              ))}
            </div>
          </div>

          <div id="profit" className="motion-grid p-5 rounded-2xl">
            <div className="flex items-center justify-between">
              <p className="text-sm text-mab-ivory/70">Clock + Profit pulse</p>
              <span className="text-xs text-mab-gold">Automation heartbeat</span>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center">
                <p className="text-xs uppercase tracking-[0.2em] text-mab-gold mb-2">Live clock</p>
                <p className="font-heading text-3xl text-mab-ivory">{clock}</p>
                <p className="text-xs text-mab-ivory/60">Command window</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center">
                <p className="text-xs uppercase tracking-[0.2em] text-mab-gold mb-2">Profit lift</p>
                <p className="font-heading text-3xl text-mab-gold">${profit.toLocaleString()}</p>
                <p className="text-xs text-mab-ivory/60">Simulated cumulative</p>
              </div>
            </div>
            <div className="mt-6 space-y-3 text-sm text-mab-ivory/70">
              <div className="flex items-center justify-between">
                <span>Automation coverage</span>
                <span className="text-mab-gold">78%</span>
              </div>
              <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                <span className="block h-full w-[78%] bg-gradient-to-r from-mab-gold to-mab-ivory" />
              </div>
              <div className="flex items-center justify-between">
                <span>Human approvals</span>
                <span className="text-mab-gold">22%</span>
              </div>
              <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                <span className="block h-full w-[22%] bg-gradient-to-r from-mab-ivory to-mab-gold" />
              </div>
            </div>
          </div>

          <div id="consult" className="motion-grid p-6 rounded-2xl flex flex-col gap-4">
            <p className="text-xs uppercase tracking-[0.24em] text-mab-gold">Engage</p>
            <h3 className="font-heading text-2xl text-mab-ivory">Schedule a Consultation</h3>
            <p className="text-mab-ivory/70">
              Every button routes to a live path—connect to automate, accelerate, or validate your AI decisions.
            </p>
            <CTAButton href="mailto:hello@mabaistrategies.com" label="Email Command" fullWidth />
            <CTAButton href="/about#resume" label="View Credentials" fullWidth glow />
          </div>
        </div>
      </MotionShell>
    </div>
  );
}
