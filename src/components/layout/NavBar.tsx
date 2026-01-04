"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import CTAButton from "@/components/ui/CTAButton";

const navLinks = [
  { href: "/", label: "Command Center" },
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/testimonials", label: "Testimonials" },
  { href: "/about", label: "About" }
];

export default function NavBar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 inset-x-0 z-40 backdrop-blur-xl bg-[#000c1f]/80 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-11 h-11 rounded-2xl overflow-hidden border border-white/10 shadow-glow">
            <span className="absolute inset-0 bg-gold-radial opacity-70" />
            <Image src="/logo.svg" alt="MAB AI Strategies logo" fill className="object-contain p-2" priority />
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-mab-gold">MAB AI Strategies</p>
            <p className="text-sm text-mab-ivory">Command Your Intelligence</p>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-3 py-2 transition-colors duration-200 ${
                  isActive ? "text-mab-gold" : "text-mab-ivory/80"
                }`}
              >
                <span className="breathing-dot pr-3 text-sm leading-none">{link.label}</span>
                {isActive && <span className="absolute inset-x-0 -bottom-1 h-[2px] bg-gradient-to-r from-mab-gold via-mab-ivory to-transparent" />}
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:block">
          <CTAButton href="/services#automation" label="Scale Your Intelligence" glow />
        </div>

        <button
          type="button"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="md:hidden rounded-xl border border-white/10 px-3 py-2 text-mab-ivory"
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-[#0b1a30]/95 border-t border-white/10">
          <div className="max-w-7xl mx-auto px-6 py-4 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block text-mab-ivory py-2 text-lg"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <CTAButton href="/services#automation" label="Scale Your Intelligence" fullWidth glow />
          </div>
        </div>
      )}
    </header>
  );
}
