"use client";

import { useState } from "react";
import CTAButton from "@/components/ui/CTAButton";
import MotionShell from "@/components/ui/MotionShell";

const testimonials = [
  {
    name: "Riya Patel",
    title: "VP, Operations",
    quote: "MAB rebuilt our intake with AI approvals—our teams finally feel like command operators, not ticket pushers.",
    clip: "Ops Clarity"
  },
  {
    name: "David Kim",
    title: "Chief Revenue Officer",
    quote: "The automation slider let us see wins live. Pipeline velocity jumped without burning out reps.",
    clip: "Revenue Lift"
  },
  {
    name: "Amira Solano",
    title: "Head of CX",
    quote: "Gold-dust trails, hover-to-play clips—the experience mirrors how responsive their product is.",
    clip: "Experience Glow"
  }
];

export default function TestimonialsPage() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div className="space-y-10">
      <MotionShell className="section-shell">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-mab-gold">Testimonials</p>
            <h1 className="font-heading text-4xl text-mab-ivory">Hover-to-play video wall.</h1>
            <p className="text-mab-ivory/70 max-w-3xl">Every card lights up with motion on hover—click through to the services most relevant to you.</p>
          </div>
          <CTAButton href="/services#consult" label="Schedule Consultation" glow />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {testimonials.map((item) => (
            <div
              key={item.name}
              onMouseEnter={() => setActive(item.name)}
              onMouseLeave={() => setActive(null)}
              className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#050d1c] p-4 shadow-aurora hover:border-mab-gold/60 transition-colors"
            >
              <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300 bg-[radial-gradient(circle_at_20%_20%,rgba(212,175,55,0.2),transparent_35%)]" />
              <div className="relative h-40 rounded-xl bg-black/50 border border-white/5 overflow-hidden">
                <div className={`absolute inset-0 transition-all duration-500 ${
                  active === item.name ? "bg-gradient-to-br from-mab-gold/30 via-mab-gold/10 to-transparent" : "bg-gradient-to-br from-white/5 to-transparent"
                }`} />
                <div className="absolute inset-4 border border-mab-gold/40 rounded-xl animate-pulse" />
                <div className="absolute bottom-3 left-3 right-3 h-1 bg-white/10 rounded-full overflow-hidden">
                  <span
                    className={`block h-full rounded-full bg-mab-gold transition-all duration-500 ${active === item.name ? "w-full" : "w-0"}`}
                  />
                </div>
                <div className="absolute inset-0 flex items-center justify-center text-center">
                  <div className="space-y-2">
                    <p className="text-xs uppercase tracking-[0.2em] text-mab-gold">{item.clip}</p>
                    <p className="text-lg text-mab-ivory font-heading">Hover to play</p>
                  </div>
                </div>
              </div>
              <div className="relative mt-4 space-y-1">
                <p className="font-heading text-xl text-mab-ivory">{item.name}</p>
                <p className="text-sm text-mab-ivory/70">{item.title}</p>
                <p className="text-mab-ivory/80 mt-2">“{item.quote}”</p>
                <CTAButton href="/services#automation" label="See Service" />
              </div>
            </div>
          ))}
        </div>
      </MotionShell>
    </div>
  );
}
