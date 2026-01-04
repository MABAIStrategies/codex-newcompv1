import Link from "next/link";
import { ReactNode } from "react";

interface CTAButtonProps {
  href: string;
  label: string;
  icon?: ReactNode;
  glow?: boolean;
  fullWidth?: boolean;
}

export default function CTAButton({ href, label, icon, glow, fullWidth }: CTAButtonProps) {
  return (
    <Link
      href={href}
      className={`group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-gradient-to-r from-mab-gold via-[#f1d27a] to-mab-gold px-6 py-3 text-sm font-semibold text-[#0b1a30] shadow-lg transition-transform duration-300 hover:scale-[1.01] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mab-gold ${
        fullWidth ? "w-full" : "w-auto"
      } ${glow ? "shadow-glow" : ""}`}
    >
      <span className="absolute inset-0 bg-gradient-to-r from-white/40 via-transparent to-white/30 opacity-0 transition-opacity duration-300 group-hover:opacity-60" />
      <span className="relative flex items-center gap-2 tracking-wide">
        {label}
        {icon}
      </span>
    </Link>
  );
}
