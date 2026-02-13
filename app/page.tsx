"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { InteractiveLogo } from "@/components/InteractiveLogo";
import { CTAButton } from "@/components/CTAButton";

const suggestionPool = [
  "Automate onboarding in 7 days",
  "Reduce churn with predictive ops",
  "Deploy a gold-standard KPI cockpit",
  "Spin up a co-pilot for your agents",
  "Instrument a revenue-aware AI assistant",
  "Map workflows to autonomous decisions",
];

export default function HomePage() {
  const [input, setInput] = useState("Automation that pays for itself");
  const [suggestions, setSuggestions] = useState<string[]>(suggestionPool.slice(0, 3));

  useEffect(() => {
    const interval = setInterval(() => {
      setSuggestions((prev) => {
        const next = suggestionPool[(suggestionPool.indexOf(prev[0]) + 1) % suggestionPool.length];
        const rotated = [next, ...prev.slice(0, 2)];
        setInput(rotated[0]);
        return rotated;
      });
    }, 2400);
    return () => clearInterval(interval);
  }, []);

  const dataBursts = useMemo(
    () =>
      [
        { title: "Automation Hours Saved", value: "1,280", delta: "+38%", detail: "Across ops & revenue teams" },
        { title: "Profit Lift", value: "$3.4M", delta: "+24%", detail: "Attributed to AI motions" },
        { title: "Time-to-Impact", value: "30-45d", delta: "fast", detail: "From pilot to production" },
      ],
    []
  );

  return (
    <div className="space-y-14 pb-8">
      <section className="grid items-center gap-10 lg:grid-cols-2">
        <div className="space-y-6">
          <p className="text-xs uppercase tracking-[0.3em] text-aurum/80">Command Center</p>
          <h1 className="font-heading text-4xl leading-tight text-aurum md:text-5xl">
            MAB AI Strategies — Hyper-interactive growth copilots for bold teams.
          </h1>
          <p className="text-lg text-ivory/80">
            We orchestrate automation, decision intelligence, and experiential systems that feel alive. Every motion is intentional,
            instrumented, and tuned to ROI.
          </p>
          <div className="flex flex-wrap gap-4">
            <CTAButton href="/services">Explore Services</CTAButton>
            <CTAButton href="/portfolio" variant="ghost">
              View Portfolio
            </CTAButton>
            <CTAButton href="/services" variant="ghost">
              Book Consultation
            </CTAButton>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {dataBursts.map((item) => (
              <motion.div
                key={item.title}
                className="rounded-2xl border border-aurum/30 bg-abyss/70 p-4 shadow-glow"
                whileHover={{ y: -4, borderColor: "rgba(212,175,55,0.7)" }}
              >
                <p className="text-xs uppercase tracking-[0.2em] text-aurum/70">{item.title}</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-semibold text-aurum">{item.value}</span>
                  <span className="text-xs text-ivory/70">{item.delta}</span>
                </div>
                <p className="text-sm text-ivory/70">{item.detail}</p>
              </motion.div>
            ))}
          </div>
        </div>
        <div className="flex flex-col items-center gap-6">
          <InteractiveLogo />
          <p className="text-sm text-ivory/70">
            A 3D gold-particle emblem that orients to your cursor—mirroring how our systems respond to every signal.
          </p>
        </div>
      </section>

      <section className="rounded-3xl border border-aurum/30 bg-abyss/70 p-8 shadow-glow">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.28em] text-aurum/70">Solution Generator</p>
            <h2 className="font-heading text-3xl text-aurum">Describe your challenge</h2>
            <p className="text-ivory/70">We’ll respond with an AI-native play that boosts efficiency and profit.</p>
          </div>
          <div className="w-full max-w-xl space-y-3">
            <div className="relative overflow-hidden rounded-2xl border border-aurum/40 bg-midnight/70">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="w-full bg-transparent px-4 py-4 text-lg text-ivory placeholder:text-ivory/50 focus:outline-none"
                placeholder="Automate revenue operations..."
              />
              <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_20%_50%,rgba(212,175,55,0.08),transparent_40%)]" />
            </div>
            <div className="flex flex-wrap gap-2 text-xs">
              {suggestions.map((s, index) => (
                <motion.button
                  key={s}
                  onClick={() => setInput(s)}
                  className="rounded-full border border-aurum/40 bg-abyss/80 px-3 py-2 text-aurum/90 shadow-glow"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.08 }}
                >
                  {s}
                </motion.button>
              ))}
            </div>
            <div className="flex items-center justify-between border-t border-aurum/20 pt-4 text-sm text-ivory/80">
              <span>AI Suggestion Engine primes a service route instantly.</span>
              <Link href="/services" className="text-aurum underline decoration-aurum/50">Route to Services</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        {["Automation Pods", "Decision Intelligence", "Immersive Experiences"].map((title, idx) => (
          <motion.div
            key={title}
            className="group relative overflow-hidden rounded-3xl border border-aurum/30 bg-abyss/70 p-6 shadow-glow"
            whileHover={{ y: -6 }}
          >
            <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-gold-noise" />
            <div className="relative">
              <p className="text-xs uppercase tracking-[0.24em] text-aurum/70">Signature {idx + 1}</p>
              <h3 className="mb-2 font-heading text-2xl text-aurum">{title}</h3>
              <p className="text-sm text-ivory/70">
                {idx === 0 && "Robotic process orchestration, human-in-the-loop controls, and telemetry-rich copilots."}
                {idx === 1 && "Data products, probabilistic forecasting, and reinforcement learning tuned to profit."}
                {idx === 2 && "Spatial storytelling, 3D interfaces, and luxe micro-interactions that feel magical."}
              </p>
              <div className="mt-4 flex items-center justify-between text-xs text-aurum">
                <span>Interactive</span>
                <Link href="/services" className="underline decoration-aurum/50">View service</Link>
              </div>
            </div>
          </motion.div>
        ))}
      </section>
    </div>
  );
}
