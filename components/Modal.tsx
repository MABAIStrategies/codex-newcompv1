"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ReactNode } from "react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

export const Modal = ({ open, onClose, title, children }: ModalProps) => {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-40 flex items-center justify-center bg-black/50 backdrop-blur"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 24 }}
            className="relative w-full max-w-3xl overflow-hidden rounded-3xl border border-aurum/30 bg-abyss/90 p-8 shadow-glow"
          >
            <div className="flex items-center justify-between pb-4">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-aurum/70">Portfolio Insight</p>
                <h3 className="font-heading text-2xl text-aurum">{title}</h3>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="rounded-full border border-aurum/50 px-3 py-1 text-sm text-aurum transition hover:bg-aurum/10"
              >
                Close
              </button>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
