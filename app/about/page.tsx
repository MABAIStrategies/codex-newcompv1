"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { CTAButton } from "@/components/CTAButton";

const tags = [
  "AI Strategy", "Automation Architecture", "Data Storytelling", "Decision Design", "Executive Workshops", "Governance & Risk", "Immersive CX"
];

export default function AboutPage() {
  return (
    <div className="space-y-10">
      <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-4">
          <p className="text-xs uppercase tracking-[0.3em] text-aurum/70">About</p>
          <h1 className="font-heading text-4xl text-aurum">Meet the strategist behind MAB AI Strategies.</h1>
          <p className="text-lg text-ivory/80">
            MAB blends systems thinking, enterprise-grade AI, and luxe interaction design. We build with intention—balancing automation,
            governance, and brand magic.
          </p>
          <div className="flex flex-wrap gap-3">
            {tags.map((tag) => (
              <motion.a
                key={tag}
                href="/services"
                whileHover={{ y: -2, scale: 1.02 }}
                className="rounded-full border border-aurum/40 bg-abyss/70 px-4 py-2 text-sm text-aurum shadow-glow"
              >
                {tag}
              </motion.a>
            ))}
          </div>
          <div className="flex gap-4">
            <CTAButton href="/services">Book Consultation</CTAButton>
            <CTAButton href="/portfolio" variant="ghost">
              View Builds
            </CTAButton>
          </div>
        </div>
        <div className="relative flex items-center justify-center">
          <motion.div
            className="relative h-80 w-80"
            animate={{ rotate: [0, 2, -2, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="absolute inset-0 rounded-[32px] border border-aurum/40" />
            <div className="absolute inset-3 rounded-[26px] border border-aurum/30" />
            <div className="absolute inset-6 rounded-[20px] border border-aurum/20" />
            <div className="absolute inset-0 -z-10 bg-gold-noise opacity-60" />
            <Image
              src="/images/headshot.svg"
              alt="MAB AI Strategies headshot"
              fill
              className="rounded-[28px] object-cover"
            />
          </motion.div>
        </div>
      </div>

      <section className="grid gap-6 rounded-3xl border border-aurum/30 bg-abyss/70 p-8 shadow-glow lg:grid-cols-3">
        {["AI PM", "Systems Designer", "Automation Strategist"].map((lane, idx) => (
          <div key={lane} className="space-y-3">
            <p className="text-xs uppercase tracking-[0.2em] text-aurum/70">Role {idx + 1}</p>
            <h3 className="font-heading text-xl text-aurum">{lane}</h3>
            <p className="text-sm text-ivory/70">
              {idx === 0 && "Owns vision, roadmaps, and experimentation with measurable outcomes."}
              {idx === 1 && "Designs flows that feel inevitable—geometric layouts, intuitive micro-interactions."}
              {idx === 2 && "Ships bots with observability, governance, and ROI dashboards."}
            </p>
          </div>
        ))}
      </section>
    </div>
  );
}
