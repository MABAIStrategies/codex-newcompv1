import { motion } from 'framer-motion';
import RoiCalculator from './components/RoiCalculator';
import SectionHeading from './components/SectionHeading';

const highlights = [
  'Autonomous agents that mirror elite operators',
  'Automation sprints that delete friction',
  'Cinematic web experiences for the 1%',
];

export default function Home() {
  return (
    <div className="section grid-overlay">
      <div className="max-w-6xl mx-auto space-y-16">
        <section className="grid md:grid-cols-2 gap-10 items-center">
          <div className="space-y-6">
            <p className="text-gold uppercase tracking-[0.3em] text-xs">Command Center</p>
            <h1 className="text-4xl sm:text-5xl font-semibold leading-tight text-alabaster">
              Scale your intelligence with MAB — gold-standard AI agents, automations, and web systems.
            </h1>
            <p className="text-lg text-alabaster/80">
              Type your business problem and watch the Solution Generator map you to the exact service.
            </p>
            <div className="glass rounded-2xl p-4">
              <label className="text-sm text-gold">The Solution Generator</label>
              <div className="mt-2 flex flex-col gap-2">
                <input
                  type="text"
                  placeholder="e.g., We spend 30 hours weekly cleaning CRM data"
                  className="w-full bg-midnight/60 border border-gold/30 rounded-xl px-4 py-3 text-alabaster placeholder:text-alabaster/40 focus:border-gold focus:outline-none"
                />
                <div className="flex items-center justify-between text-sm text-alabaster/70">
                  <span>Suggested: Custom Automation sprint</span>
                  <div className="flex gap-3">
                    <a href="/services#automation" className="button-secondary">View playbook</a>
                    <a href="/services#roi" className="button-primary">See ROI</a>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <a href="/services" className="button-primary">Scale Your Intelligence</a>
              <a href="/services#schedule" className="button-secondary">Schedule Consultation</a>
            </div>
            <div className="grid sm:grid-cols-3 gap-3">
              {highlights.map((item) => (
                <motion.div key={item} className="glass rounded-xl p-4" whileHover={{ y: -4, boxShadow: '0 15px 40px rgba(212, 175, 55, 0.3)' }}>
                  <p className="text-sm text-alabaster/80">{item}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            className="relative h-full min-h-[320px] flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gold/20 via-gold/5 to-transparent blur-3xl" />
            <motion.div
              className="h-64 w-64 rounded-full border border-gold/40 bg-gradient-to-br from-gold/30 to-transparent shadow-glow"
              animate={{ rotate: [0, 2, -2, 0] }}
              transition={{ repeat: Infinity, duration: 12, ease: 'easeInOut' }}
            />
            <motion.div
              className="absolute text-center"
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
            >
              <p className="text-gold text-sm uppercase tracking-[0.3em]">MAB</p>
              <p className="text-2xl font-semibold">Gold Particle Sigil</p>
              <p className="text-alabaster/70 text-sm">Responsive to your motion — hover to feel it.</p>
            </motion.div>
          </motion.div>
        </section>

        <section id="roi" className="space-y-6">
          <SectionHeading
            eyebrow="ROI"
            title="Model the lift before you build"
            description="Input your signals to see the break-even point, projected across 12 months."
          />
          <RoiCalculator />
        </section>
      </div>
    </div>
  );
}
