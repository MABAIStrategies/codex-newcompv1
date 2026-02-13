"use client";

import { useMemo } from "react";

const generateStars = (count: number) =>
  Array.from({ length: count }, (_, i) => ({
    id: i,
    top: Math.random() * 100,
    left: Math.random() * 100,
    size: Math.random() * 2 + 0.5,
    opacity: Math.random() * 0.7 + 0.3,
    delay: Math.random() * 5,
  }));

export const StarryBackdrop = () => {
  const stars = useMemo(() => generateStars(180), []);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[radial-gradient(circle_at_50%_20%,rgba(212,175,55,0.08),transparent_35%),radial-gradient(circle_at_80%_10%,rgba(212,175,55,0.08),transparent_35%)]">
      <div className="mesh-overlay absolute inset-0 opacity-40" />
      {stars.map((star) => (
        <span
          key={star.id}
          className="absolute animate-pulse rounded-full bg-aurum shadow-glow"
          style={{
            top: `${star.top}%`,
            left: `${star.left}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
            animationDelay: `${star.delay}s`,
          }}
        />
      ))}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#0b1a30_0,rgba(0,12,31,0.95)_35%,rgba(0,12,31,0.85)_100%)]" />
    </div>
  );
};
