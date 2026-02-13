"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

interface CTAButtonProps {
  href: string;
  children: ReactNode;
  variant?: "solid" | "ghost";
}

export const CTAButton = ({ href, children, variant = "solid" }: CTAButtonProps) => {
  const baseClasses =
    "relative overflow-hidden rounded-full px-6 py-3 text-sm uppercase tracking-[0.12em] transition-all";

  const styles =
    variant === "solid"
      ? "bg-gradient-to-r from-aurum via-amber-300 to-aurum text-midnight shadow-glow"
      : "border border-aurum/50 text-aurum";

  return (
    <motion.div whileHover={{ y: -2, scale: 1.02 }} whileTap={{ scale: 0.98 }}>
      <Link href={href} className={`${baseClasses} ${styles}`}>
        <span className="absolute inset-0 bg-white/10 opacity-0 transition-opacity duration-300 hover:opacity-30" />
        <span className="relative font-semibold">{children}</span>
      </Link>
    </motion.div>
  );
};
