"use client";

import { motion } from "framer-motion";

/**
 * Loader animado oficial del sistema Azahares — barco contenedor avanzando
 * sobre olas. Lo usamos en CUALQUIER estado de espera del sitio público:
 *  - search del tracking mientras consulta al backend
 *  - placeholders de página mientras carga data
 *  - transiciones entre vistas
 *
 * Variantes de tamaño: 'sm' (inline, ~80px), 'md' (card, ~140px),
 * 'lg' (full section, ~220px). El color se adapta al entorno con la
 * prop `tone` ('navy' para fondos claros, 'white' para fondos navy).
 */
export function ShipLoader({
  size = "md",
  tone = "navy",
  label,
  className = "",
}: {
  size?: "sm" | "md" | "lg";
  tone?: "navy" | "white";
  label?: string;
  className?: string;
}) {
  const dims = size === "sm" ? 80 : size === "lg" ? 220 : 140;
  const primary = tone === "white" ? "#ffffff" : "#0d1b3d";
  const secondary = tone === "white" ? "rgba(255,255,255,0.55)" : "#1a3578";
  const wave1 = tone === "white" ? "rgba(255,255,255,0.65)" : "#5a82c8";
  const wave2 = tone === "white" ? "rgba(255,255,255,0.4)" : "#8caadb";

  return (
    <div
      className={"flex flex-col items-center justify-center gap-3 " + className}
    >
      <svg
        viewBox="0 0 200 120"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: dims, height: (dims * 120) / 200 }}
        aria-hidden
      >
        {/* Sea base */}
        <motion.path
          d="M 0 86 Q 25 80, 50 86 T 100 86 T 150 86 T 200 86 L 200 120 L 0 120 Z"
          fill={wave2}
          animate={{ d: [
            "M 0 86 Q 25 80, 50 86 T 100 86 T 150 86 T 200 86 L 200 120 L 0 120 Z",
            "M 0 86 Q 25 92, 50 86 T 100 86 T 150 86 T 200 86 L 200 120 L 0 120 Z",
            "M 0 86 Q 25 80, 50 86 T 100 86 T 150 86 T 200 86 L 200 120 L 0 120 Z",
          ] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.path
          d="M 0 92 Q 25 88, 50 92 T 100 92 T 150 92 T 200 92 L 200 120 L 0 120 Z"
          fill={wave1}
          animate={{ d: [
            "M 0 92 Q 25 88, 50 92 T 100 92 T 150 92 T 200 92 L 200 120 L 0 120 Z",
            "M 0 92 Q 25 96, 50 92 T 100 92 T 150 92 T 200 92 L 200 120 L 0 120 Z",
            "M 0 92 Q 25 88, 50 92 T 100 92 T 150 92 T 200 92 L 200 120 L 0 120 Z",
          ] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
        />

        {/* Ship — sliding loop left→right */}
        <motion.g
          initial={{ x: -70 }}
          animate={{ x: 200 }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <motion.g
            animate={{ y: [0, -2, 0, 2, 0] }}
            transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
          >
            {/* Containers stack */}
            <rect x={10} y={56} width={20} height={8} fill={primary} />
            <rect x={32} y={56} width={20} height={8} fill={secondary} />
            <rect x={54} y={56} width={20} height={8} fill={primary} />
            <rect x={10} y={48} width={20} height={8} fill={secondary} />
            <rect x={32} y={48} width={20} height={8} fill={primary} />
            {/* Bridge */}
            <rect x={66} y={42} width={10} height={14} fill="#ffffff" stroke={primary} strokeWidth={0.5} />
            <rect x={68} y={45} width={2} height={2} fill={primary} />
            <rect x={72} y={45} width={2} height={2} fill={primary} />
            {/* Smoke stack */}
            <rect x={70} y={38} width={3} height={6} fill={primary} />
            {/* Hull */}
            <path d="M 4 64 L 8 78 L 78 78 L 82 64 Z" fill={primary} />
            <rect x={8} y={75} width={70} height={1} fill={wave1} opacity={0.7} />
          </motion.g>
        </motion.g>

        {/* Foam splash */}
        <motion.ellipse
          cx={100}
          cy={86}
          rx={28}
          ry={2.5}
          fill="#ffffff"
          opacity={0.6}
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        />
      </svg>
      {label && (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-[12px] font-semibold uppercase tracking-[0.18em]"
          style={{ color: tone === "white" ? "rgba(255,255,255,0.85)" : "#0d1b3d" }}
        >
          {label}
        </motion.div>
      )}
    </div>
  );
}
