"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Modal } from "@/components/Modal";
import { CTAButton } from "@/components/CTAButton";

const projects = [
  {
    title: "Autonomous Support Desk",
    category: "Automation Pod",
    summary: "LLM copilots triage, resolve, and escalate with confidence scoring.",
    roi: "+31% NPS, -48% handle time",
    how: ["Intent clustering & policy guardrails", "Dynamic routing to human experts", "Self-healing knowledge base"],
    why: ["Reduced escalations", "Faster time-to-answer", "Consistent brand voice"],
  },
  {
    title: "Revenue Control Tower",
    category: "Decision Intelligence",
    summary: "A luxe cockpit blending forecasting, pricing experiments, and risk alerts.",
    roi: "+18% win rate, +22% margin clarity",
    how: ["Probabilistic forecasts", "Incentive experimentation", "Executive-ready storyboards"],
    why: ["Sharper GTM focus", "Aligned incentives", "Rapid scenario testing"],
  },
  {
    title: "Immersive Product Reveal",
    category: "Experiential",
    summary: "3D interactive launch with gold-dust cursor trails and cinematic lighting.",
    roi: "3x time-on-page, 2.4x conversions",
    how: ["WebGL scene with motion controls", "Guided storyline overlays", "CRM-connected CTAs"],
    why: ["Emotional resonance", "Higher qualified leads", "Memorable brand moments"],
  },
  {
    title: "Ops Efficiency AI",
    category: "Automation Pod",
    summary: "Process mining plus bots that reconcile, notify, and remediate in real time.",
    roi: "1,900 hrs saved, $2.6M lift",
    how: ["Process graph mapping", "Bot library with approvals", "Observability for every action"],
    why: ["Audit-ready", "Consistent quality", "Relentless efficiency"],
  },
];

export default function PortfolioPage() {
  const [selected, setSelected] = useState<number | null>(null);

  const activeProject = selected !== null ? projects[selected] : null;

  return (
    <div className="space-y-10">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-aurum/70">Portfolio</p>
          <h1 className="font-heading text-4xl text-aurum">Proof in motion.</h1>
          <p className="max-w-3xl text-ivory/70">Gold-bordered cards reveal how we build and why it delivers ROI.</p>
        </div>
        <CTAButton href="/services">Book Consultation</CTAButton>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        {projects.map((project, index) => (
          <motion.button
            key={project.title}
            onClick={() => setSelected(index)}
            className="group relative overflow-hidden rounded-3xl border border-aurum/30 bg-abyss/70 p-6 text-left shadow-glow"
            whileHover={{ y: -8 }}
          >
            <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-gold-noise" />
            <div className="relative space-y-3">
              <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-aurum/70">
                <span>{project.category}</span>
                <span className="rounded-full border border-aurum/40 px-3 py-1 text-[10px]">Tap to expand</span>
              </div>
              <h3 className="font-heading text-2xl text-aurum">{project.title}</h3>
              <p className="text-sm text-ivory/70">{project.summary}</p>
              <div className="text-sm text-aurum">{project.roi}</div>
            </div>
          </motion.button>
        ))}
      </div>

      <Modal open={!!activeProject} onClose={() => setSelected(null)} title={activeProject?.title ?? ""}>
        {activeProject && (
          <>
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-[0.18em] text-aurum/70">How we built it</p>
              <ul className="space-y-2 text-sm text-ivory/80">
                {activeProject.how.map((step) => (
                  <li key={step} className="flex items-start gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-aurum" />
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-[0.18em] text-aurum/70">Why it moved ROI</p>
              <ul className="space-y-2 text-sm text-ivory/80">
                {activeProject.why.map((why) => (
                  <li key={why} className="flex items-start gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-aurum" />
                    <span>{why}</span>
                  </li>
                ))}
              </ul>
              <CTAButton href="/services">Plan a similar build</CTAButton>
            </div>
          </>
        )}
      </Modal>
    </div>
  );
}
