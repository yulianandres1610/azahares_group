"use client";

import { motion } from "framer-motion";

/**
 * Orbes flotantes decorativos que dan profundidad al hero navy.
 * Posición absoluta sobre el fondo; el contenido principal va con
 * z-index > 0 encima de estos.
 */
export function HeroOrbs() {
  return (
    <>
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="pointer-events-none absolute -left-32 top-10 h-[420px] w-[420px] rounded-full bg-amber-500/25 blur-3xl animate-float-slow"
      />
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4, delay: 0.2 }}
        className="pointer-events-none absolute -right-24 bottom-0 h-[520px] w-[520px] rounded-full bg-navy-400/30 blur-3xl animate-float-medium"
      />
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.6, delay: 0.4 }}
        className="pointer-events-none absolute left-1/3 top-1/2 h-[280px] w-[280px] rounded-full bg-white/10 blur-3xl"
      />
    </>
  );
}
