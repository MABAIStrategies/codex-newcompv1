"use client";

import { useMemo, useState } from "react";
import CTAButton from "@/components/ui/CTAButton";
import MotionShell from "@/components/ui/MotionShell";

const solutionPrompts = [
  "Deploy an autonomous triage bot for inbound requests",
  "Instrument profit radar dashboards with AI variance alerts",
  "Spin up an RPA swarm to eliminate swivel-chair tasks",
  "Route knowledge to the right operator with semantic search",
  "Launch a fine-tuned agent that mirrors your best closer"
];

const capabilityTiles = [
  {
    title: "Command Board",
    description: "Live orchestration of AI agents, data streams, and human approvals.",
    stat: "37% faster",
    accent: "coordination"
  },
  {
    title: "Signal Engine",
    description: "Pattern-mining across product, revenue, and ops telemetry to anticipate risk.",
    stat: "+18% margin",
    accent: "foresight"
  },
  {
    title: "Solution Generator",
    description: "Guided prompts refine into deployable playbooks—ready to ship in minutes.",
    stat: "Launch x5",
    accent: "speed"
  }
];

export default function HomePage() {
  const [prompt, setPrompt] = useState("Give me a way to automate client onboarding with approvals");
  const [idea, setIdea] = useState(solutionPrompts[0]);

  const shimmeringParticles = useMemo(
    () =>
      Array.from({ length: 26 }).map((_, idx) => ({
        id: idx,
        delay: Math.random() * 4,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        size: 4 + Math.random() * 18
      })),
    []
  );

  return (
    <div className="space-y-16">
      <MotionShell className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#0b1a30]/90 via-[#000c1f]/80 to-[#0b1a30]/90 p-10 shadow-aurora">
        <div className="ribbon" />
        <div className="grid lg:grid-cols-2 gap-10 items-center relative z-10">
          <div className="space-y-6">
            <p className="text-xs uppercase tracking-[0.32em] text-mab-gold">MAB AI Command Center</p>
            <h1 className="font-heading text-4xl sm:text-5xl leading-tight text-mab-ivory">
              AI-driven <span className="text-mab-gold">Solution Generator</span> to scale
              <span className="block">your intelligence and profit velocity.</span>
            </h1>
            <p className="text-lg text-mab-ivory/70 max-w-2xl">
              Orchestrate elite automation, decisioning, and experience in one interlinked stack. Every
              interaction invites participation—tap, hover, and command.
            </p>
            <div className="flex flex-wrap gap-4">
              <CTAButton href="/services#automation" label="Scale Your Intelligence" glow />
              <CTAButton href="#solution-generator" label="Generate a Blueprint" />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm text-mab-ivory/70">
              {["Automation", "Intelligence", "Experience", "Security"].map((badge) => (
                <span
                  key={badge}
                  className="rounded-full border border-white/10 px-3 py-2 text-center hover:border-mab-gold hover:text-mab-gold transition-colors"
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 blur-3xl opacity-60 bg-gold-radial" />
            <div className="relative w-full rounded-3xl bg-[#030a18] border border-white/10 p-6 shadow-glow overflow-hidden">
              <div className="flex items-center justify-between mb-4 text-sm text-mab-ivory/60">
                <span className="font-heading text-mab-ivory">MAB Command Center</span>
                <span className="rounded-full border border-mab-gold/30 px-3 py-1 text-mab-gold">Live</span>
              </div>

              <div className="relative h-60 rounded-2xl bg-gradient-to-br from-mab-deep to-black border border-white/5 overflow-hidden">
                {shimmeringParticles.map((p) => (
                  <span
                    key={p.id}
                    className="absolute rounded-full bg-mab-gold/60 blur-[1px] animate-ping"
                    style={{
                      width: p.size,
                      height: p.size,
                      top: p.top,
                      left: p.left,
                      animationDelay: `${p.delay}s`
                    }}
                  />
                ))}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center gap-3">
                  <div className="relative w-36 h-36 rounded-full border border-mab-gold/60 flex items-center justify-center shadow-glow">
                    <div className="absolute inset-3 rounded-full border border-white/10" />
                    <span className="font-heading text-3xl text-mab-ivory tracking-widest">MAB</span>
                    <span className="absolute inset-0 animate-spin-slow" />
                  </div>
                  <p className="text-sm text-mab-ivory/70 max-w-xs">
                    Gold-particle signature logo pulsing with signal strength.
                  </p>
                </div>
              </div>

              <div id="solution-generator" className="mt-5 space-y-3">
                <label className="text-xs uppercase tracking-[0.2em] text-mab-gold">Solution Generator</label>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                  <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    rows={3}
                    className="w-full bg-transparent text-mab-ivory outline-none resize-none text-sm"
                  />
                  <div className="flex items-center justify-between mt-3">
                    <p className="text-xs text-mab-ivory/60">Hover for hint, click to deploy.</p>
                    <button
                      type="button"
                      onClick={() => setIdea(solutionPrompts[Math.floor(Math.random() * solutionPrompts.length)])}
                      className="rounded-full border border-mab-gold/50 bg-mab-gold/10 px-4 py-2 text-xs uppercase tracking-[0.16em] text-mab-gold hover:bg-mab-gold/20"
                    >
                      Generate
                    </button>
                  </div>
                </div>
                <div className="gradient-border">
                  <div className="p-4 rounded-2xl text-sm text-mab-ivory/80 flex items-start gap-3">
                    <span className="mt-1 h-3 w-3 rounded-full bg-mab-gold shadow-glow" />
                    <p>{idea}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </MotionShell>

      <MotionShell className="grid md:grid-cols-3 gap-6">
        {capabilityTiles.map((tile, idx) => (
          <div key={tile.title} className="section-shell hover-tilt" style={{ animationDelay: `${idx * 0.08}s` }}>
            <p className="text-xs uppercase tracking-[0.24em] text-mab-gold">{tile.accent}</p>
            <h3 className="font-heading text-2xl text-mab-ivory mt-2">{tile.title}</h3>
            <p className="text-mab-ivory/70 mt-2">{tile.description}</p>
            <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-mab-gold/40 bg-mab-gold/10 px-3 py-1 text-sm text-mab-gold">
              <span className="h-2 w-2 rounded-full bg-mab-gold animate-pulse" />
              {tile.stat}
            </div>
          </div>
        ))}
      </MotionShell>
    </div>
  );
}
