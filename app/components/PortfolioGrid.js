'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const projects = [
  {
    title: 'Executive Liaison Agent',
    category: 'Agents',
    impact: '+38% faster decisions',
    logic: ['Ingest board decks', 'Summarize risks', 'Trigger follow-ups'],
    why: 'Reclaimed 12 hrs/week for the CEO.',
  },
  {
    title: 'Zero-Touch CRM Automation',
    category: 'Automations',
    impact: '-62% manual updates',
    logic: ['Parse emails', 'Auto-sync deals', 'Notify reps'],
    why: 'Raised pipeline hygiene to 96%.',
  },
  {
    title: 'Multilingual Support Titan',
    category: 'Agents',
    impact: '24/7 coverage, 9 languages',
    logic: ['Detect sentiment', 'Translate live', 'Escalate when needed'],
    why: 'CSAT up 14 points globally.',
  },
  {
    title: 'Auto-Invoicing Engine',
    category: 'Automations',
    impact: '-84% billing time',
    logic: ['Read usage', 'Generate invoices', 'Push to ERP'],
    why: 'Cash collection improved by 11 days.',
  },
];

export default function PortfolioGrid() {
  const [active, setActive] = useState(null);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project, idx) => (
        <motion.button
          key={project.title}
          className="card text-left flex flex-col gap-3 border-gold/30"
          whileHover={{ y: -4, boxShadow: '0 10px 40px rgba(212, 175, 55, 0.25)' }}
          onClick={() => setActive(project)}
        >
          <p className="text-xs uppercase tracking-[0.3em] text-gold">{project.category}</p>
          <h3 className="text-xl font-semibold text-alabaster">{project.title}</h3>
          <p className="text-alabaster/70">{project.impact}</p>
          <div className="flex items-center justify-between text-sm text-gold">
            <span>Tap to expand</span>
            <span className="text-lg">↗</span>
          </div>
        </motion.button>
      ))}

      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-50 bg-midnight/80 backdrop-blur-xl flex items-center justify-center p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
          >
            <motion.div
              className="max-w-3xl w-full card relative"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-4 right-4 text-gold hover:text-white"
                onClick={() => setActive(null)}
              >
                Close
              </button>
              <p className="text-xs uppercase tracking-[0.3em] text-gold">{active.category}</p>
              <h3 className="text-2xl font-semibold mb-3">{active.title}</h3>
              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <div className="glass rounded-xl p-4">
                  <p className="text-gold mb-2">How</p>
                  <ul className="space-y-2 list-disc list-inside text-alabaster/80">
                    {active.logic.map((step) => (
                      <li key={step}>{step}</li>
                    ))}
                  </ul>
                </div>
                <div className="glass rounded-xl p-4">
                  <p className="text-gold mb-2">Why it matters</p>
                  <p className="text-alabaster/80">{active.why}</p>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-3">
                <a href="/services#contact" className="button-primary">Book a similar build</a>
                <a href="/services#roi" className="button-secondary">See ROI</a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
