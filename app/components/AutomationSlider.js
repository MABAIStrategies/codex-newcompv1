'use client';

import { motion, useSpring, useTransform } from 'framer-motion';
import { useState } from 'react';

export default function AutomationSlider() {
  const [hours, setHours] = useState(10);
  const progress = useSpring(hours, { stiffness: 80, damping: 20 });
  const profit = useTransform(progress, (value) => Math.round(value * 750));

  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gold uppercase tracking-[0.3em] text-xs">Automation Slider</p>
          <h3 className="text-2xl font-semibold">Watch hours disappear and profit rise</h3>
        </div>
        <span className="text-sm text-alabaster/70">Hours saved: {hours}</span>
      </div>
      <div className="mt-4">
        <input
          type="range"
          min={0}
          max={40}
          value={hours}
          onChange={(e) => setHours(Number(e.target.value))}
          className="w-full accent-gold"
        />
      </div>
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="glass rounded-xl p-4 flex items-center gap-3">
          <div className="h-12 w-12 rounded-full bg-gold/20 border border-gold/50" />
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-gold">Clock</p>
            <motion.p className="text-xl font-semibold" animate={{ rotate: [0, 5, -5, 0] }} transition={{ repeat: Infinity, duration: 4 }}>
              Slowing…
            </motion.p>
          </div>
        </div>
        <div className="glass rounded-xl p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-gold">Profit</p>
          <motion.p className="text-3xl font-bold" key={hours} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            ${profit.get()}
          </motion.p>
          <p className="text-sm text-alabaster/70">Projected monthly lift</p>
        </div>
        <motion.div className="glass rounded-xl p-4" initial={{ scale: 0.95 }} animate={{ scale: 1 }}>
          <p className="text-xs uppercase tracking-[0.2em] text-gold">Action</p>
          <p className="text-lg font-semibold">Book the automation sprint</p>
          <a href="#contact" className="button-secondary mt-3 inline-flex">Start now</a>
        </motion.div>
      </div>
    </div>
  );
}
