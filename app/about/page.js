import InteractiveResume from '../components/InteractiveResume';
import SectionHeading from '../components/SectionHeading';
import { motion } from 'framer-motion';

export default function AboutPage() {
  return (
    <div className="section max-w-6xl mx-auto space-y-12">
      <SectionHeading
        eyebrow="The Architect"
        title="Mark — strategist, builder, keynote guide"
        description="Headshot framed in gold geometry, plus an interactive resume to explore specific case studies."
      />
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <motion.div className="relative" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <div className="absolute -inset-4 bg-gradient-to-br from-gold/20 via-transparent to-transparent blur-3xl" />
          <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-gold/50">
            <img
              src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80"
              alt="Mark headshot"
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 border-4 border-gold/60 mix-blend-screen" />
          </div>
        </motion.div>
        <InteractiveResume />
      </div>
      <div className="card flex flex-wrap gap-4 items-center">
        <div className="flex-1">
          <p className="text-gold uppercase tracking-[0.3em] text-xs">Consultation CTA</p>
          <h3 className="text-2xl font-semibold">Ready to architect the next move?</h3>
          <p className="text-alabaster/70">Jump directly to the consultation scheduler or fire up the blueprint builder.</p>
        </div>
        <div className="flex gap-3">
          <a href="/services#schedule" className="button-primary">Schedule a consultation</a>
          <a href="https://ai-site-spark-19.lovable.app/" target="_blank" rel="noreferrer" className="button-secondary">Initialize Custom Web Template</a>
        </div>
      </div>
    </div>
  );
}
