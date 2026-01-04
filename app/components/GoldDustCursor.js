'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function GoldDustCursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener('pointermove', handleMove);
    return () => window.removeEventListener('pointermove', handleMove);
  }, []);

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-50"
      animate={{ x: pos.x - 150, y: pos.y - 150 }}
      transition={{ type: 'spring', stiffness: 120, damping: 20 }}
    >
      <div className="w-72 h-72 rounded-full bg-gold/10 blur-3xl" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(212,175,55,0.4),_transparent_60%)]" />
    </motion.div>
  );
}
