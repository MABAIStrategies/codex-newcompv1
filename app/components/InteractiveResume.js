'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const experiences = [
  {
    tag: 'Product Strategy',
    headline: 'Scaled enterprise AI portfolios across 4 industries',
    detail: 'Designed playbooks, multi-quarter roadmaps, and adoption rituals for leadership.',
  },
  {
    tag: 'Automation',
    headline: 'Cut operational drag by 60%',
    detail: 'Zero-touch billing, CRM hygiene, onboarding, and compliance flows.',
  },
  {
    tag: 'Web Apps',
    headline: 'Built luxury-grade dashboards',
    detail: 'Real-time analytics, multi-tenant access, and cinematic motion systems.',
  },
  {
    tag: 'Keynotes',
    headline: 'Spoke on the future of AI work',
    detail: 'Executive workshops and stage keynotes that translate AI into revenue stories.',
  },
];

export default function InteractiveResume() {
  const [active, setActive] = useState(experiences[0]);

  return (
    <div className="card">
      <div className="flex flex-wrap gap-3 mb-6">
        {experiences.map((exp) => (
          <button
            key={exp.tag}
            onClick={() => setActive(exp)}
            className={`button-secondary ${active.tag === exp.tag ? 'bg-gold text-midnight' : ''}`}
          >
            {exp.tag}
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={active.tag}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          className="space-y-2"
        >
          <p className="text-gold text-sm uppercase tracking-[0.2em]">{active.tag}</p>
          <h3 className="text-2xl font-semibold text-alabaster">{active.headline}</h3>
          <p className="text-alabaster/80 text-lg">{active.detail}</p>
          <div className="flex gap-3 mt-4">
            <a href="/services#contact" className="button-primary">Request the case study</a>
            <a href="/services#schedule" className="button-secondary">Schedule consultation</a>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
