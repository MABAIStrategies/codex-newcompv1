"use client";

import { useState } from "react";
import CTAButton from "@/components/ui/CTAButton";
import MotionShell from "@/components/ui/MotionShell";

const projects = [
  {
    title: "Realtime Risk Sentinel",
    summary: "Streaming anomaly detection with human approvals and live playbooks.",
    result: "Latent risk down 31%",
    how: "Combined vector search on telemetry with reinforcement-trained classifiers for event fusion.",
    why: "Reduce outage ripple effects while retaining explainability for auditors.",
    stack: "Next.js, LangGraph, Kafka, Pinecone"
  },
  {
    title: "Revenue Acceleration Loop",
    summary: "Autonomous campaign generator with adaptive cadences and scoring.",
    result: "+14% pipeline velocity",
    how: "Multi-armed bandit tests across subject, copy, and timing with reward shaping to revenue events.",
    why: "Increase wins while guarding deliverability and rep experience.",
    stack: "Vercel, Supabase, OpenAI, Temporal"
  },
  {
    title: "Autonomous Fulfillment Desk",
    summary: "RPA + LLM agents coordinating procurement, logistics, and updates.",
    result: "Handle time -46%",
    how: "Orchestration graph triggers RPA bots, validates receipts, and posts status to all channels.",
    why: "Tighten SLAs without adding headcount while keeping customers in the loop.",
    stack: "Next.js, Playwright, Airbyte, LangChain"
  }
];

export default function PortfolioPage() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const activeProject = activeIndex !== null ? projects[activeIndex] : null;

  return (
    <div className="space-y-10">
      <MotionShell className="section-shell">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-mab-gold">Case portfolio</p>
            <h1 className="font-heading text-4xl text-mab-ivory">Grid of wins with technical how & why.</h1>
          </div>
          <CTAButton href="/services#automation" label="Build My Win" glow />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {projects.map((project, idx) => (
            <button
              type="button"
              key={project.title}
              onClick={() => setActiveIndex(idx)}
              className="text-left section-shell hover-tilt"
            >
              <p className="text-xs uppercase tracking-[0.18em] text-mab-gold">{project.result}</p>
              <h3 className="font-heading text-xl text-mab-ivory mt-2">{project.title}</h3>
              <p className="text-mab-ivory/70 mt-2">{project.summary}</p>
              <div className="mt-4 text-sm text-mab-ivory/60">Stack: {project.stack}</div>
              <span className="mt-4 inline-flex items-center gap-2 text-mab-gold">
                Open How / Why
                <span aria-hidden>↗</span>
              </span>
            </button>
          ))}
        </div>
      </MotionShell>

      {activeProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-6" role="dialog">
          <div className="relative max-w-3xl w-full section-shell bg-[#030915]">
            <button
              type="button"
              aria-label="Close modal"
              onClick={() => setActiveIndex(null)}
              className="absolute right-4 top-4 text-mab-ivory/60 hover:text-mab-gold"
            >
              Close
            </button>
            <div className="space-y-4">
              <p className="text-xs uppercase tracking-[0.2em] text-mab-gold">{activeProject.result}</p>
              <h2 className="font-heading text-3xl text-mab-ivory">{activeProject.title}</h2>
              <p className="text-mab-ivory/70">{activeProject.summary}</p>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-mab-gold mb-2">How we built it</p>
                  <p className="text-mab-ivory/80 leading-relaxed">{activeProject.how}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-mab-gold mb-2">Why it mattered</p>
                  <p className="text-mab-ivory/80 leading-relaxed">{activeProject.why}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                <CTAButton href="/services#automation" label="Recreate Automation" />
                <CTAButton href="/about#resume" label="Meet the Builders" glow />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
