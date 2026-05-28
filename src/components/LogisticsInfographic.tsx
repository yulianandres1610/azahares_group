"use client";

import { motion } from "framer-motion";
import {
  Warehouse,
  Ship,
  FileCheck2,
  Truck,
  PackageCheck,
  Plane,
} from "lucide-react";

/**
 * Infografía de logística end-to-end. Layout vertical en mobile, distribución
 * orgánica en desktop. Diseño:
 *  - 5 stages en flujo (Origen → Puerto → Tránsito → Aduana → Entrega)
 *  - Route line curva con dash animado
 *  - Container icon viajando por la ruta
 *  - Stat cards flotantes con badges live
 *  - Pulsing dots en cada stage
 *
 * Puro SVG + Framer Motion — sin assets externos, escalable a cualquier
 * tamaño manteniendo proporciones.
 */
export function LogisticsInfographic({ className = "" }: { className?: string }) {
  // Coordenadas de los 5 stages en el viewBox 800x600
  const STAGES = [
    { id: "origin", x: 100, y: 140, icon: Warehouse, label: "Origen" },
    { id: "port", x: 260, y: 240, icon: Ship, label: "Puerto" },
    { id: "transit", x: 440, y: 180, icon: Plane, label: "Tránsito" },
    { id: "customs", x: 600, y: 280, icon: FileCheck2, label: "Aduana" },
    { id: "delivery", x: 720, y: 410, icon: PackageCheck, label: "Entrega" },
  ];

  // Curva conectora cubic-bezier que pasa por los 5 stages
  const routePath = `
    M ${STAGES[0].x} ${STAGES[0].y}
    C 160 220, 200 260, ${STAGES[1].x} ${STAGES[1].y}
    C 320 220, 380 140, ${STAGES[2].x} ${STAGES[2].y}
    C 500 220, 540 280, ${STAGES[3].x} ${STAGES[3].y}
    C 660 340, 690 380, ${STAGES[4].x} ${STAGES[4].y}
  `;

  return (
    <div className={"relative w-full " + className} aria-hidden>
      <svg
        viewBox="0 0 800 600"
        xmlns="http://www.w3.org/2000/svg"
        className="h-auto w-full"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="route" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.25" />
          </linearGradient>
          <linearGradient id="routeFill" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
            <stop offset="55%" stopColor="#ffffff" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
          <radialGradient id="nodeGlow">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.6" />
            <stop offset="70%" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>
          <filter id="softblur">
            <feGaussianBlur stdDeviation="6" />
          </filter>
        </defs>

        {/* Background grid pattern */}
        <BackgroundGrid />

        {/* Orbital decorative circles */}
        <motion.circle
          cx={420}
          cy={300}
          r={260}
          fill="none"
          stroke="#ffffff"
          strokeOpacity="0.06"
          strokeDasharray="2 4"
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "420px 300px" }}
        />
        <motion.circle
          cx={420}
          cy={300}
          r={180}
          fill="none"
          stroke="#ffffff"
          strokeOpacity="0.08"
          strokeDasharray="1 6"
          initial={{ rotate: 0 }}
          animate={{ rotate: -360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "420px 300px" }}
        />

        {/* Route — base line (full visible) */}
        <path
          d={routePath}
          fill="none"
          stroke="url(#route)"
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeDasharray="6 8"
          opacity={0.55}
        />

        {/* Route — animated dashed overlay simulating flow */}
        <motion.path
          d={routePath}
          fill="none"
          stroke="#ffffff"
          strokeWidth={3}
          strokeLinecap="round"
          strokeDasharray="12 18"
          initial={{ strokeDashoffset: 0 }}
          animate={{ strokeDashoffset: -120 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          opacity={0.9}
        />

        {/* Container moving along route */}
        <motion.g
          initial={{ offsetDistance: "0%" }}
          animate={{ offsetDistance: "100%" }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          style={{
            offsetPath: `path('${routePath.trim()}')`,
            offsetRotate: "0deg",
          } as React.CSSProperties}
        >
          <MovingContainer />
        </motion.g>

        {/* Stage nodes */}
        {STAGES.map((s, i) => (
          <StageNode
            key={s.id}
            x={s.x}
            y={s.y}
            icon={s.icon}
            label={s.label}
            delay={i * 0.18}
            index={i + 1}
          />
        ))}

        {/* Floating stat badges */}
        <FloatingStat
          x={50}
          y={70}
          delay={0.6}
          big="24/7"
          label="GPS satelital"
        />
        <FloatingStat
          x={560}
          y={70}
          delay={0.9}
          big="100%"
          label="precios CIF"
        />
        <FloatingStat
          x={50}
          y={500}
          delay={1.2}
          big="end-to-end"
          label="trazabilidad"
        />

        {/* Bottom corner — small ship silhouette */}
        <motion.g
          initial={{ x: -40 }}
          animate={{ x: 40 }}
          transition={{ duration: 16, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
        >
          <BottomShip />
        </motion.g>
      </svg>
    </div>
  );
}

// ────────────────────────────────────────────────────────────
// Sub-components
// ────────────────────────────────────────────────────────────

function BackgroundGrid() {
  // Líneas tenues que dan sensación de mapa/dashboard de logística
  const lines: React.ReactNode[] = [];
  for (let i = 1; i < 8; i++) {
    const y = (i * 600) / 8;
    lines.push(
      <line
        key={`h${i}`}
        x1={0}
        x2={800}
        y1={y}
        y2={y}
        stroke="#ffffff"
        strokeOpacity={i === 4 ? 0.06 : 0.03}
      />,
    );
  }
  for (let i = 1; i < 10; i++) {
    const x = (i * 800) / 10;
    lines.push(
      <line
        key={`v${i}`}
        x1={x}
        x2={x}
        y1={0}
        y2={600}
        stroke="#ffffff"
        strokeOpacity={i === 5 ? 0.06 : 0.03}
      />,
    );
  }
  return <g>{lines}</g>;
}

function StageNode({
  x,
  y,
  icon: Icon,
  label,
  delay,
  index,
}: {
  x: number;
  y: number;
  icon: React.ComponentType<{ className?: string; size?: number }>;
  label: string;
  delay: number;
  index: number;
}) {
  return (
    <g>
      {/* Outer glow */}
      <circle cx={x} cy={y} r={42} fill="url(#nodeGlow)" />

      {/* Pulsing ring */}
      <motion.circle
        cx={x}
        cy={y}
        r={28}
        fill="none"
        stroke="#ffffff"
        strokeWidth={1.5}
        initial={{ scale: 1, opacity: 0.65 }}
        animate={{ scale: [1, 1.45, 1], opacity: [0.65, 0, 0.65] }}
        transition={{
          duration: 2.2,
          repeat: Infinity,
          delay,
          ease: "easeOut",
        }}
        style={{ transformOrigin: `${x}px ${y}px` }}
      />

      {/* Node circle */}
      <motion.circle
        cx={x}
        cy={y}
        r={26}
        fill="#0d1b3d"
        stroke="#ffffff"
        strokeWidth={2}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.55, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
        style={{ transformOrigin: `${x}px ${y}px` }}
      />

      {/* Icon inside node — placed via foreignObject to use lucide */}
      <motion.foreignObject
        x={x - 13}
        y={y - 13}
        width={26}
        height={26}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: delay + 0.3 }}
      >
        <div
          className="flex h-full w-full items-center justify-center text-white"
          style={{ pointerEvents: "none" }}
        >
          <Icon size={14} />
        </div>
      </motion.foreignObject>

      {/* Numbered badge */}
      <motion.g
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: delay + 0.4 }}
      >
        <circle cx={x + 22} cy={y - 22} r={10} fill="#ffffff" />
        <text
          x={x + 22}
          y={y - 18}
          textAnchor="middle"
          fontSize={11}
          fontWeight="bold"
          fill="#0d1b3d"
        >
          {index}
        </text>
      </motion.g>

      {/* Label below */}
      <motion.text
        x={x}
        y={y + 50}
        textAnchor="middle"
        fontSize={13}
        fontWeight="700"
        fill="#ffffff"
        opacity={0.92}
        initial={{ opacity: 0, y: y + 56 }}
        animate={{ opacity: 0.92, y: y + 50 }}
        transition={{ duration: 0.5, delay: delay + 0.35 }}
        style={{ letterSpacing: "0.04em" }}
      >
        {label.toUpperCase()}
      </motion.text>
    </g>
  );
}

function FloatingStat({
  x,
  y,
  delay,
  big,
  label,
}: {
  x: number;
  y: number;
  delay: number;
  big: string;
  label: string;
}) {
  return (
    <motion.g
      initial={{ opacity: 0, y: y + 16 }}
      animate={{ opacity: 1, y }}
      transition={{ duration: 0.6, delay }}
    >
      {/* Card background */}
      <rect
        x={x}
        y={y}
        width={150}
        height={64}
        rx={14}
        fill="#ffffff"
        fillOpacity={0.1}
        stroke="#ffffff"
        strokeOpacity={0.22}
        strokeWidth={1}
      />
      <rect
        x={x}
        y={y}
        width={150}
        height={64}
        rx={14}
        fill="url(#routeFill)"
        opacity={0.06}
      />
      {/* Big value */}
      <text
        x={x + 14}
        y={y + 30}
        fontSize={22}
        fontWeight="bold"
        fill="#ffffff"
        style={{ fontFamily: "Times New Roman, serif" }}
      >
        {big}
      </text>
      {/* Label */}
      <text
        x={x + 14}
        y={y + 50}
        fontSize={10}
        fontWeight="600"
        fill="#ffffff"
        opacity={0.7}
        style={{ letterSpacing: "0.08em", textTransform: "uppercase" }}
      >
        {label}
      </text>
      {/* Pulse dot */}
      <motion.circle
        cx={x + 135}
        cy={y + 16}
        r={4}
        fill="#34d399"
        animate={{ opacity: [1, 0.4, 1] }}
        transition={{ duration: 1.8, repeat: Infinity, delay }}
      />
    </motion.g>
  );
}

function MovingContainer() {
  // Pequeño "container" representativo que se mueve por la ruta
  return (
    <g transform="translate(-14 -10)">
      <rect width={28} height={20} fill="#ffffff" stroke="#ffffff" strokeOpacity={0.4} />
      <rect width={1} height={20} x={6} fill="#0d1b3d" opacity={0.18} />
      <rect width={1} height={20} x={12} fill="#0d1b3d" opacity={0.18} />
      <rect width={1} height={20} x={18} fill="#0d1b3d" opacity={0.18} />
      {/* Glow halo */}
      <circle cx={14} cy={10} r={18} fill="#ffffff" opacity={0.18} filter="url(#softblur)" />
    </g>
  );
}

function BottomShip() {
  return (
    <g transform="translate(220 540)" opacity={0.55}>
      {/* Stacked containers */}
      <rect x={20} y={6} width={26} height={10} fill="#ffffff" opacity={0.85} />
      <rect x={48} y={6} width={26} height={10} fill="#ffffff" opacity={0.65} />
      <rect x={20} y={-4} width={26} height={10} fill="#ffffff" opacity={0.6} />
      <rect x={48} y={-4} width={26} height={10} fill="#ffffff" opacity={0.5} />
      {/* Hull */}
      <path d="M 0 16 L 6 30 L 100 30 L 106 16 Z" fill="#ffffff" opacity={0.9} />
      {/* Bridge */}
      <rect x={82} y={2} width={12} height={14} fill="#ffffff" opacity={0.85} />
    </g>
  );
}
