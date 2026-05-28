"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

/**
 * Wrapper genérico para animar elementos al entrar en viewport.
 * Usado en grids de servicios, cards de stats, etc.
 */
export function RevealOnScroll({
  children,
  delay = 0,
  className,
  direction = "up",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  direction?: "up" | "down" | "left" | "right" | "none";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const offset = 24;
  const from =
    direction === "up"
      ? { y: offset }
      : direction === "down"
        ? { y: -offset }
        : direction === "left"
          ? { x: offset }
          : direction === "right"
            ? { x: -offset }
            : {};

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, ...from }}
      animate={inView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, ...from }}
      transition={{ duration: 0.7, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
