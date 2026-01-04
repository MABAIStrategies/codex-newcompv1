import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-gold/10 bg-navy text-sm">
      <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-3 gap-8">
        <div>
          <p className="text-gold uppercase tracking-[0.3em] text-xs">MAB AI Strategies</p>
          <p className="text-alabaster/80 mt-2">
            Building autonomous intelligence, high-touch automations, and hyper-interactive web experiences.
          </p>
        </div>
        <div>
          <p className="text-gold font-semibold mb-3">Navigation</p>
          <div className="space-y-2 flex flex-col">
            <Link href="/services">Services</Link>
            <Link href="/portfolio">Portfolio</Link>
            <Link href="/testimonials">Testimonials</Link>
            <Link href="/about">About</Link>
          </div>
        </div>
        <div>
          <p className="text-gold font-semibold mb-3">Engage</p>
          <div className="space-y-2 flex flex-col">
            <Link href="mailto:mark@mabaistrategies.com">mark@mabaistrategies.com</Link>
            <Link href="/services#contact">Contact</Link>
            <Link href="/services#payments">Payments</Link>
            <a href="https://ai-site-spark-19.lovable.app/" target="_blank" rel="noreferrer">AI Site Spark</a>
          </div>
        </div>
      </div>
      <div className="border-t border-gold/10 text-center py-4 text-alabaster/60">
        © {new Date().getFullYear()} MAB AI Strategies. Elite by design.
      </div>
    </footer>
  );
}
