import Link from "next/link";
import CTAButton from "@/components/ui/CTAButton";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#000c1f]/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16 py-10 grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">
        <div className="space-y-3">
          <p className="text-xs uppercase tracking-[0.24em] text-mab-gold">MAB AI Strategies</p>
          <p className="text-mab-ivory/80">We orchestrate automation, intelligence, and experience to scale your competitive edge.</p>
          <div className="pt-3">
            <CTAButton href="/services#consult" label="Schedule Consultation" glow />
          </div>
        </div>
        <div>
          <h4 className="font-heading text-lg text-mab-ivory mb-3">Explore</h4>
          <div className="space-y-2 text-mab-ivory/70">
            <Link href="/services">Services</Link>
            <Link href="/portfolio">Portfolio</Link>
            <Link href="/testimonials">Testimonials</Link>
            <Link href="/about">About</Link>
          </div>
        </div>
        <div>
          <h4 className="font-heading text-lg text-mab-ivory mb-3">Engage</h4>
          <div className="space-y-2 text-mab-ivory/70">
            <Link href="mailto:hello@mabaistrategies.com">hello@mabaistrategies.com</Link>
            <Link href="/services#automation">Automation Command</Link>
            <Link href="/services#profit">Profit Acceleration</Link>
            <Link href="/about#credentials">Credentials</Link>
          </div>
        </div>
        <div className="space-y-3">
          <h4 className="font-heading text-lg text-mab-ivory">Stay in sync</h4>
          <p className="text-mab-ivory/70">Receive mission-grade playbooks, automation drops, and intelligence briefs.</p>
          <form className="space-y-2">
            <input
              type="email"
              placeholder="you@enterprise.com"
              className="w-full rounded-full border border-white/10 bg-white/5 px-4 py-3 text-mab-ivory placeholder:text-mab-ivory/50 focus:border-mab-gold focus:outline-none"
            />
            <CTAButton href="/services#consult" label="Enroll" fullWidth />
          </form>
        </div>
      </div>
      <div className="border-t border-white/5 py-4 text-center text-xs text-mab-ivory/50">
        Crafted for innovators | MAB AI Strategies © {new Date().getFullYear()}
      </div>
    </footer>
  );
}
