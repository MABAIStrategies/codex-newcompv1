"use client";

import Image from "next/image";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useRef } from "react";

export const InteractiveLogo = () => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-200, 200], [12, -12]);
  const rotateY = useTransform(x, [-200, 200], [-12, 12]);

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const relativeX = event.clientX - (rect.left + rect.width / 2);
    const relativeY = event.clientY - (rect.top + rect.height / 2);
    x.set(relativeX);
    y.set(relativeY);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onPointerMove={handlePointerMove}
      onPointerLeave={handleLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="relative flex h-72 w-72 items-center justify-center rounded-3xl border border-aurum/30 bg-gradient-to-br from-abyss/60 via-midnight/80 to-abyss/60 p-6 shadow-glow"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(212,175,55,0.15),transparent_45%),radial-gradient(circle_at_80%_0%,rgba(212,175,55,0.18),transparent_35%)]" />
      <motion.div
        className="absolute inset-4 rounded-2xl border border-aurum/40"
        animate={{ boxShadow: ["0 0 30px rgba(212,175,55,0.12)", "0 0 60px rgba(212,175,55,0.28)"] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="relative z-10"
        initial={{ scale: 0.9, opacity: 0.8 }}
        animate={{ scale: [0.96, 1.02, 0.98, 1], opacity: 1 }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <Image
          src="/images/mab-logo.svg"
          alt="MAB AI Strategies Logo"
          width={220}
          height={220}
          priority
          className="drop-shadow-[0_0_35px_rgba(212,175,55,0.35)]"
        />
      </motion.div>
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0.4 }}
        animate={{ opacity: [0.4, 0.7, 0.45] }}
        transition={{ duration: 6, repeat: Infinity, repeatType: "mirror" }}
      >
        {[...Array(18)].map((_, i) => (
          <motion.span
            key={i}
            className="absolute h-1 w-1 rounded-full bg-aurum/80"
            style={{
              top: `${10 + Math.random() * 80}%`,
              left: `${10 + Math.random() * 80}%`,
            }}
            animate={{
              scale: [0.8, 1.4, 0.9],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{ duration: 3 + Math.random() * 2, repeat: Infinity }}
          />
        ))}
      </motion.div>
    </motion.div>
  );
};
