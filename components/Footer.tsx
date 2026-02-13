"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export const Footer = () => (
  <footer className="mt-16 border-t border-aurum/10 bg-abyss/60 px-6 py-10 text-sm text-ivory/70 backdrop-blur">
    <div className="mx-auto flex max-w-6xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
      <div className="space-y-1">
        <div className="font-heading text-lg text-aurum">MAB AI Strategies</div>
        <p className="max-w-xl text-ivory/70">
          Enterprise-grade automation, decision intelligence, and immersive experiences powered by human-centered AI craft.
        </p>
      </div>
      <div className="flex items-center gap-4">
        <motion.div whileHover={{ y: -2 }} className="rounded-full border border-aurum/30 px-4 py-2">
          <Link href="/services">Schedule a consultation</Link>
        </motion.div>
        <motion.div whileHover={{ y: -2 }} className="rounded-full border border-aurum/30 px-4 py-2">
          <Link href="/portfolio">Explore portfolio</Link>
        </motion.div>
      </div>
    </div>
  </footer>
);
