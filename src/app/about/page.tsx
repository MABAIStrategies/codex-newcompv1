"use client";

import { useState } from "react";
import Image from "next/image";
import CTAButton from "@/components/ui/CTAButton";
import MotionShell from "@/components/ui/MotionShell";

const experiences = [
  { tag: "Automation", detail: "Built orchestration for global ops with deterministic + generative agents." },
  { tag: "Strategy", detail: "Designed AI roadmaps that align revenue, risk, and experience objectives." },
  { tag: "Delivery", detail: "Led pods shipping production LLM features with governance and telemetry." }
];

const credentials = [
  "10+ enterprise AI deployments",
  "Security-first governance with audit trails",
  "Operator-friendly interfaces with delightful polish"
];

export default function AboutPage() {
  const [selected, setSelected] = useState(experiences[0]);

  return (
    <div className="space-y-10">
      <MotionShell className="section-shell" id="resume">
        <div className="grid lg:grid-cols-5 gap-8 items-center">
          <div className="lg:col-span-2 relative">
            <div className="absolute inset-0 blur-3xl bg-gold-radial opacity-70" />
            <div className="relative aspect-square rounded-3xl overflow-hidden border border-white/10 shadow-aurora">
              <Image src="/headshot.svg" alt="Professional headshot" fill className="object-cover" />
            </div>
          </div>
          <div className="lg:col-span-3 space-y-4">
            <p className="text-xs uppercase tracking-[0.28em] text-mab-gold">Interactive resume</p>
            <h1 className="font-heading text-4xl text-mab-ivory">Builder, strategist, operator.</h1>
            <p className="text-mab-ivory/70">
              Hover through experiences to see how we blend automation, intelligence, and design to craft MAB-grade outcomes.
            </p>
            <div className="flex flex-wrap gap-2">
              {experiences.map((exp) => (
                <button
                  key={exp.tag}
                  type="button"
                  onMouseEnter={() => setSelected(exp)}
                  className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                    selected.tag === exp.tag ? "border-mab-gold text-mab-gold" : "border-white/10 text-mab-ivory/70"
                  }`}
                >
                  {exp.tag}
                </button>
              ))}
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-mab-ivory/80">
              {selected.detail}
            </div>
            <div id="credentials" className="grid sm:grid-cols-3 gap-3">
              {credentials.map((item) => (
                <div key={item} className="rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-mab-ivory/80">
                  {item}
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-3 pt-2">
              <CTAButton href="/services#consult" label="Schedule Consultation" glow />
              <CTAButton href="/portfolio" label="View Portfolio" />
            </div>
          </div>
        </div>
      </MotionShell>
    </div>
  );
}
