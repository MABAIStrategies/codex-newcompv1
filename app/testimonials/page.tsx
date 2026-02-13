"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { CTAButton } from "@/components/CTAButton";

const videos = [
  {
    client: "Fintech COO",
    quote: "They slowed the clock on ops and sped up revenue clarity.",
    src: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
  },
  {
    client: "Marketplace VP",
    quote: "The immersive launch made our brand feel premium overnight.",
    src: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/river.mp4",
  },
  {
    client: "CX Director",
    quote: "Bots plus guardrails—now every agent has a co-pilot.",
    src: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/forrest.mp4",
  },
  {
    client: "RevOps Lead",
    quote: "The control tower is our favorite meeting.",
    src: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
  },
  {
    client: "Founder",
    quote: "Consultation to production in weeks, not quarters.",
    src: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/river.mp4",
  },
];

export default function TestimonialsPage() {
  return (
    <div className="space-y-10">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-aurum/70">Testimonials</p>
          <h1 className="font-heading text-4xl text-aurum">A masonry wall that plays on hover.</h1>
          <p className="max-w-3xl text-ivory/70">Hover to play, click to consult—the most frictionless referral.</p>
        </div>
        <CTAButton href="/services">Plan my build</CTAButton>
      </div>

      <div className="video-wall">
        {videos.map((video) => (
          <VideoTile key={video.quote} {...video} />
        ))}
      </div>
    </div>
  );
}

function VideoTile({ client, quote, src }: { client: string; quote: string; src: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  const handlePlay = () => {
    const el = ref.current;
    if (!el) return;
    el.muted = true;
    el.play().catch(() => {
      el.pause();
    });
  };

  const handlePause = () => {
    ref.current?.pause();
  };

  return (
    <motion.div
      className="mb-4 break-inside-avoid rounded-3xl border border-aurum/30 bg-abyss/70 p-3 shadow-glow"
      whileHover={{ y: -4 }}
    >
      <div className="relative overflow-hidden rounded-2xl border border-aurum/40">
        <video
          ref={ref}
          src={src}
          muted
          playsInline
          loop
          preload="metadata"
          onMouseEnter={handlePlay}
          onMouseLeave={handlePause}
          className="h-full w-full object-cover"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-abyss/80 via-abyss/40 to-transparent" />
        <div className="absolute bottom-3 left-3 space-y-1 text-left">
          <p className="text-xs uppercase tracking-[0.2em] text-aurum/70">{client}</p>
          <p className="text-sm text-ivory">“{quote}”</p>
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between text-xs text-aurum">
        <span>Hover to play · Click to consult</span>
        <CTAButton href="/services" variant="ghost">
          Book
        </CTAButton>
      </div>
    </motion.div>
  );
}
