"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const navItems = [
  { href: "/", label: "Command Center" },
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/testimonials", label: "Testimonials" },
  { href: "/about", label: "About" },
];

export const Navbar = () => {
  const pathname = usePathname();

  return (
    <motion.nav
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="sticky top-0 z-30 flex items-center justify-between bg-abyss/80 px-6 py-4 backdrop-blur-xl border-b border-aurum/20"
    >
      <Link href="/" className="flex items-center gap-3 text-xl font-heading tracking-[0.2em]">
        <span className="h-10 w-10 rounded-full bg-gradient-to-br from-aurum via-aurum/90 to-amber-400 text-midnight flex items-center justify-center font-bold shadow-glow">M</span>
        <div className="leading-tight">
          <div className="text-sm text-ivory/70 uppercase">MAB AI</div>
          <div className="text-lg text-aurum">Strategies</div>
        </div>
      </Link>
      <div className="flex items-center gap-4 text-sm">
        {navItems.map((item) => {
          const active = pathname === item.href;
          return (
            <Link key={item.href} href={item.href} className="relative px-4 py-2">
              <span className="relative z-10 font-body uppercase tracking-[0.08em] text-ivory/80 hover:text-aurum transition-colors">
                {item.label}
              </span>
              {active && (
                <motion.span
                  layoutId="active-pill"
                  className="absolute inset-0 rounded-full bg-aurum/10 border border-aurum/50"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </Link>
          );
        })}
        <Link
          href="/services"
          className="relative overflow-hidden rounded-full border border-aurum/60 px-4 py-2 text-xs uppercase tracking-[0.1em] text-ivory/90 shadow-glow"
        >
          <span className="absolute inset-0 bg-gradient-to-r from-aurum/20 via-aurum/35 to-aurum/20 opacity-60" />
          <span className="relative">Book Consultation</span>
        </Link>
      </div>
    </motion.nav>
  );
};
