"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface MotionShellProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export default function MotionShell({ children, delay = 0, className }: MotionShellProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
