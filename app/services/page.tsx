"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { CTAButton } from "@/components/CTAButton";

const services = [
  {
    title: "Automation Pods",
    description: "Task orchestration, RPA, and human-in-the-loop controls aligned to governance.",
    outcomes: ["Shift repetitive work to bots", "Instrument quality gates", "Prove ROI in 30 days"],
  },
  {
    title: "Decision Intelligence",
    description: "Forecasting, causal inference, and decision engines tuned to revenue and risk.",
    outcomes: ["Predict demand and churn", "Optimize pricing and incentives", "Close the loop with live data"],
  },
  {
    title: "Immersive Experiences",
    description: "3D product revealers, gold-standard dashboards, and bespoke copilots for teams.",
    outcomes: ["Elevate perception", "Shorten time-to-answer", "Delight customers with micro-interactions"],
  },
];

export default function ServicesPage() {
  const [hours, setHours] = useState(840);
  const clockSpeed = useMemo(() => Math.max(0.3, 1.4 - hours / 1400), [hours]);
  const profit = useMemo(() => Math.round(hours * 520), [hours]);

  return (
    <div className="space-y-12">
      <header className="space-y-4">
        <p className="text-xs uppercase tracking-[0.3em] text-aurum/70">Core Services</p>
        <h1 className="font-heading text-4xl text-aurum">Automation that slows time and compounds profit.</h1>
        <p className="max-w-3xl text-ivory/70">
          Use the automation slider to see how many hours we hand back to your teams. Watch the clock decelerate while the profit counter
          accelerates—our favorite visual for momentum.
        </p>
      </header>

      <section className="grid gap-8 rounded-3xl border border-aurum/30 bg-abyss/70 p-8 shadow-glow lg:grid-cols-2">
        <div className="space-y-6">
          <div className="flex items-center justify-between text-sm text-ivory/70">
            <span>Automation intensity</span>
            <span className="text-aurum">{hours} hrs saved / month</span>
          </div>
          <input
            type="range"
            min={120}
            max={1600}
            value={hours}
            onChange={(e) => setHours(Number(e.target.value))}
            className="w-full accent-aurum"
          />
          <div className="grid grid-cols-2 gap-4 text-center">
            <motion.div
              className="rounded-2xl border border-aurum/30 bg-midnight/80 p-6"
              animate={{ boxShadow: ["0 0 24px rgba(212,175,55,0.15)", "0 0 36px rgba(212,175,55,0.3)"] }}
              transition={{ duration: 2, repeat: Infinity, repeatType: "mirror" }}
            >
              <p className="text-xs uppercase tracking-[0.2em] text-aurum/70">Clock slows</p>
              <motion.div
                className="mx-auto mt-2 h-24 w-24 rounded-full border-2 border-aurum/50"
                animate={{ rotate: 360 }}
                transition={{ duration: 12 * clockSpeed, ease: "linear", repeat: Infinity }}
              >
                <div className="relative h-full w-full">
                  <span className="absolute left-1/2 top-2 h-5 w-[2px] -translate-x-1/2 rounded-full bg-aurum" />
                  <span className="absolute left-1/2 top-1/2 h-10 w-[3px] -translate-x-1/2 -translate-y-1/2 origin-bottom rounded-full bg-aurum/80" />
                </div>
              </motion.div>
              <p className="text-lg text-aurum">{hours} hours back</p>
            </motion.div>
            <motion.div
              className="rounded-2xl border border-aurum/30 bg-midnight/80 p-6"
              animate={{ scale: [1, 1.02, 0.99, 1.01, 1], boxShadow: ["0 0 24px rgba(212,175,55,0.2)", "0 0 36px rgba(212,175,55,0.35)"] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <p className="text-xs uppercase tracking-[0.2em] text-aurum/70">Profit counter</p>
              <div className="text-3xl font-semibold text-aurum">${profit.toLocaleString()}</div>
              <p className="text-sm text-ivory/70">Annualized impact, modeled from efficiency gains.</p>
            </motion.div>
          </div>
          <div className="flex flex-wrap gap-3 text-xs text-aurum">
            <span className="rounded-full border border-aurum/30 px-3 py-2">Observability baked in</span>
            <span className="rounded-full border border-aurum/30 px-3 py-2">Compliance ready</span>
            <span className="rounded-full border border-aurum/30 px-3 py-2">Human override friendly</span>
          </div>
        </div>
        <div className="space-y-5">
          {services.map((service) => (
            <motion.div
              key={service.title}
              className="rounded-3xl border border-aurum/20 bg-midnight/70 p-5"
              whileHover={{ y: -6, borderColor: "rgba(212,175,55,0.6)" }}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-aurum/70">Service Lane</p>
                  <h3 className="font-heading text-xl text-aurum">{service.title}</h3>
                  <p className="text-sm text-ivory/70">{service.description}</p>
                </div>
                <CTAButton href="/services" variant="ghost">
                  Consult
                </CTAButton>
              </div>
              <div className="mt-3 flex flex-wrap gap-2 text-xs text-ivory/70">
                {service.outcomes.map((o) => (
                  <span key={o} className="rounded-full border border-aurum/30 px-3 py-2">
                    {o}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
          <div id="consult" className="flex flex-wrap gap-4 pt-2">
            <CTAButton href="/portfolio">See proof</CTAButton>
            <CTAButton href="/testimonials" variant="ghost">
              Watch clients react
            </CTAButton>
          </div>
        </div>
      </section>
    </div>
  );
}
