"use client";

import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";

/**
 * Contador que anima de 0 al valor objetivo cuando entra en viewport.
 * Soporta prefijo / sufijo (ej. "+", "%", "k") y formato con separador
 * de miles. Para valores no-numéricos (ej. "USA→GLO") fallback a render
 * directo sin animación.
 */
export function AnimatedCounter({
  value,
  prefix = "",
  suffix = "",
  duration = 1.6,
  decimals = 0,
}: {
  value: number | string;
  prefix?: string;
  suffix?: string;
  duration?: number;
  decimals?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-30px" });
  const isNumeric = typeof value === "number";
  const mv = useMotionValue(0);
  const rounded = useTransform(mv, (v) =>
    decimals > 0 ? v.toFixed(decimals) : Math.round(v).toLocaleString("en-US"),
  );
  const [text, setText] = useState("0");

  useEffect(() => {
    if (!isNumeric || !inView) return;
    const controls = animate(mv, value as number, {
      duration,
      ease: [0.21, 0.47, 0.32, 0.98],
    });
    const unsub = rounded.on("change", (v) => setText(String(v)));
    return () => {
      controls.stop();
      unsub();
    };
  }, [inView, isNumeric, value, duration, mv, rounded]);

  if (!isNumeric) {
    return <span ref={ref}>{value}</span>;
  }

  return (
    <span ref={ref}>
      {prefix}
      <motion.span>{text}</motion.span>
      {suffix}
    </span>
  );
}
