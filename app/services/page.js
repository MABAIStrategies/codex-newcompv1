import AutomationSlider from '../components/AutomationSlider';
import RoiCalculator from '../components/RoiCalculator';
import SectionHeading from '../components/SectionHeading';
import { motion } from 'framer-motion';

const services = [
  {
    id: 'agents',
    title: 'Custom Agents',
    description: 'Autonomous employees that do not sleep — trained on your playbooks and judgement.',
    bullets: ['Executive liaison with memory', 'Support titan in 9 languages', 'Proactive deal desk'],
  },
  {
    id: 'automation',
    title: 'Custom Automations',
    description: 'Eliminating the friction of existence — orchestrated across your stack.',
    bullets: ['Zero-touch CRM hygiene', 'Auto invoicing & collections', 'Employee onboarding autopilot'],
  },
  {
    id: 'webapps',
    title: 'Custom Web Apps',
    description: 'Digital infrastructure for the 1% — cinematic, secure, realtime.',
    bullets: ['Luxury dashboards', 'Client command centers', 'Embedded data stories'],
  },
  {
    id: 'keynote',
    title: 'Keynote Coaching',
    description: 'Speaking the language of the future — keynotes that convert AI into revenue stories.',
    bullets: ['Narrative builds', 'Stage coaching', 'Executive workshops'],
  },
];

export default function ServicesPage() {
  return (
    <div className="section max-w-6xl mx-auto space-y-16">
      <SectionHeading
        eyebrow="Services"
        title="The Arsenal"
        description="Each engagement is a precision build—automations, agents, and experiences tuned for ROI."
      />

      <div className="grid gap-6 md:grid-cols-2">
        {services.map((service) => (
          <motion.div key={service.id} className="card" whileHover={{ y: -4, boxShadow: '0 15px 40px rgba(212, 175, 55, 0.3)' }} id={service.id}>
            <p className="text-gold uppercase tracking-[0.3em] text-xs">{service.title}</p>
            <p className="text-alabaster/80 mb-3">{service.description}</p>
            <ul className="space-y-2 text-sm text-alabaster/80 list-disc list-inside">
              {service.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
            <div className="flex gap-3 mt-4">
              <a href="#contact" className="button-primary">Engage</a>
              <a href="#payments" className="button-secondary">Payments</a>
            </div>
          </motion.div>
        ))}
      </div>

      <section id="automation" className="space-y-6">
        <SectionHeading
          eyebrow="Automation"
          title="Interactive Automation Slider"
          description="Slide to witness time collapse and profit rise in real time."
        />
        <AutomationSlider />
      </section>

      <section id="roi" className="space-y-6">
        <SectionHeading
          eyebrow="ROI"
          title="Model the economics before kickoff"
          description="12-month projection, break-even analysis, and cost comparisons."
        />
        <RoiCalculator compact />
      </section>

      <section id="payments" className="card space-y-4">
        <SectionHeading
          eyebrow="Payments"
          title="Stripe-secured, gold-trimmed checkout"
          description="Choose your entry—Retainer Start or Project Deposit. Stripe Elements, PCI clean."
        />
        <div className="flex flex-wrap gap-4">
          <a className="button-primary" href="#contact">Retainer Start</a>
          <a className="button-secondary" href="#contact">Project Deposit</a>
          <p className="text-sm text-alabaster/70">Stripe Elements embedded in production. Cloud Run + SSL locked.</p>
        </div>
      </section>

      <section id="schedule" className="card space-y-4">
        <SectionHeading
          eyebrow="Schedule"
          title="Real-time availability"
          description="Google Calendar integration for direct consultation scheduling."
        />
        <div className="glass rounded-xl p-4">
          <p className="text-sm text-alabaster/70 mb-3">Live availability widget connects to Google Calendar via Secret Manager.</p>
          <a href="mailto:mark@mabaistrategies.com" className="button-primary">Email to schedule</a>
          <a href="https://calendar.google.com" className="button-secondary ml-3">Open Calendar</a>
        </div>
      </section>

      <section id="contact" className="card space-y-4">
        <SectionHeading
          eyebrow="Lead Gen"
          title="Webform3-powered contact"
          description="Every contact routes to mark@mabaistrategies.com with an auto-responder."
        />
        <form className="space-y-3" action="/api/lead" method="post">
          <div className="grid sm:grid-cols-2 gap-3">
            <input name="name" required placeholder="Name" className="bg-midnight/60 border border-gold/30 rounded-lg px-3 py-2" />
            <input name="email" type="email" required placeholder="Email" className="bg-midnight/60 border border-gold/30 rounded-lg px-3 py-2" />
          </div>
          <textarea name="message" required placeholder="Tell us the problem" className="w-full bg-midnight/60 border border-gold/30 rounded-lg px-3 py-2" rows="3" />
          <div className="flex gap-3">
            <button type="submit" className="button-primary">Contact me</button>
            <a href="https://ai-site-spark-19.lovable.app/" className="button-secondary" target="_blank" rel="noreferrer">
              Initialize Custom Web Template
            </a>
          </div>
        </form>
      </section>
    </div>
  );
}
