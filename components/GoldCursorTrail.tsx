"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface TrailPoint {
  id: number;
  x: number;
  y: number;
}

export const GoldCursorTrail = () => {
  const [trail, setTrail] = useState<TrailPoint[]>([]);

  useEffect(() => {
    let id = 0;
    const handleMove = (event: MouseEvent) => {
      const nextPoint = { id: id++, x: event.clientX, y: event.clientY };
      setTrail((prev) => [...prev.slice(-14), nextPoint]);
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-50">
      {trail.map((point, index) => (
        <motion.span
          key={point.id}
          className="particle absolute h-4 w-4 rounded-full bg-gradient-to-tr from-aurum/70 via-aurum to-ivory/70 blur-[1px]"
          initial={{ opacity: 0.9, scale: 0.2 }}
          animate={{
            opacity: 0,
            scale: 1.5,
            filter: "blur(6px)",
          }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          style={{
            left: point.x,
            top: point.y,
            transform: "translate(-50%, -50%)",
            zIndex: 20 - index,
          }}
        />
      ))}
    </div>
  );
};
