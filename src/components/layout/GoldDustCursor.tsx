"use client";

import { useEffect, useRef, useState } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  life: number;
}

export default function GoldDustCursor() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const idRef = useRef(0);

  useEffect(() => {
    const handleMove = (event: MouseEvent) => {
      const rect = document.body.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      setParticles((prev) => {
        const next: Particle = {
          id: idRef.current++,
          x,
          y,
          size: 6 + Math.random() * 10,
          life: 1
        };
        return [...prev.slice(-35), next];
      });
    };

    const decay = setInterval(() => {
      setParticles((prev) => prev.filter((p) => p.life > 0.08).map((p) => ({ ...p, life: p.life - 0.06 })));
    }, 50);

    window.addEventListener("pointermove", handleMove);
    return () => {
      clearInterval(decay);
      window.removeEventListener("pointermove", handleMove);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden" aria-hidden>
      {particles.map((particle) => (
        <span
          key={particle.id}
          className="absolute rounded-full blur-[1px] particle-layer"
          style={{
            width: particle.size,
            height: particle.size,
            left: particle.x,
            top: particle.y,
            opacity: particle.life,
            background: "radial-gradient(circle, rgba(212,175,55,0.9) 0%, rgba(248,249,250,0.2) 60%, transparent 70%)",
            transform: `translate(-50%, -50%) scale(${1 + (1 - particle.life) * 0.6})`
          }}
        />
      ))}
    </div>
  );
}
