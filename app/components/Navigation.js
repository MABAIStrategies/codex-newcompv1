'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

const navItems = [
  { label: 'Command Center', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Testimonials', href: '/testimonials' },
  { label: 'About', href: '/about' },
];

export default function Navigation() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-midnight/70 border-b border-gold/20">
      <nav className="flex items-center justify-between px-6 py-4 max-w-6xl mx-auto">
        <Link href="/" className="flex items-center gap-3">
          <motion.img
            src="/mab-logo.svg"
            alt="MAB AI Strategies logo"
            className="h-10 w-10 rounded-lg border border-gold/40 bg-navy"
            whileHover={{ rotate: 5, scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 200, damping: 10 }}
          />
          <div className="flex flex-col leading-tight">
            <span className="text-gold text-sm tracking-[0.25em]">MAB</span>
            <span className="text-white font-semibold">AI Strategies</span>
          </div>
        </Link>
        <div className="flex items-center gap-6 text-sm uppercase tracking-wide">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="text-alabaster hover:text-gold transition-colors">
              {item.label}
            </Link>
          ))}
          <Link href="/services#schedule" className="button-secondary">Schedule</Link>
        </div>
      </nav>
    </header>
  );
}
