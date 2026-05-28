"use client";

import { motion } from "framer-motion";

/**
 * Escena SVG animada — barco mercante avanzando sobre olas, con contenedores
 * apilados y un avión cargo cruzando. Pura geometría — sin assets externos.
 * Se usa como decoración en heros y secciones de servicios.
 */
export function ShipScene({ className = "" }: { className?: string }) {
  return (
    <div className={"relative w-full " + className} aria-hidden>
      <svg
        viewBox="0 0 800 320"
        xmlns="http://www.w3.org/2000/svg"
        className="h-auto w-full"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Sky gradient subtle */}
        <defs>
          <linearGradient id="sky" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#1d3a8a" stopOpacity="0" />
            <stop offset="100%" stopColor="#0d1b3d" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="sea" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#1a3578" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#0d1b3d" stopOpacity="0.85" />
          </linearGradient>
          <linearGradient id="hull" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#0d1b3d" />
            <stop offset="100%" stopColor="#1a3578" />
          </linearGradient>
        </defs>

        {/* Sky */}
        <rect width="800" height="320" fill="url(#sky)" />

        {/* Distant clouds */}
        <motion.g
          initial={{ x: -120 }}
          animate={{ x: 880 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        >
          <Cloud cx={120} cy={60} scale={1} opacity={0.18} />
          <Cloud cx={420} cy={45} scale={0.85} opacity={0.14} />
          <Cloud cx={640} cy={70} scale={1.2} opacity={0.2} />
        </motion.g>

        {/* Cargo plane crossing top */}
        <motion.g
          initial={{ x: -200 }}
          animate={{ x: 1000 }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear", delay: 4 }}
        >
          <Plane />
        </motion.g>

        {/* Sea base */}
        <path d="M 0 240 L 800 240 L 800 320 L 0 320 Z" fill="url(#sea)" />

        {/* Animated wave layers */}
        <Wave
          baseline={240}
          amplitude={6}
          speed={9}
          opacity={0.35}
          color="#5a82c8"
        />
        <Wave
          baseline={250}
          amplitude={8}
          speed={11}
          opacity={0.55}
          color="#1d3a8a"
          delay={0.6}
        />
        <Wave
          baseline={262}
          amplitude={5}
          speed={7}
          opacity={0.85}
          color="#0d1b3d"
          delay={1.2}
        />

        {/* Container ship — entry slide + idle bob */}
        <motion.g
          initial={{ x: -480, y: 0 }}
          animate={{ x: 0 }}
          transition={{ duration: 3, ease: [0.21, 0.47, 0.32, 0.98] }}
        >
          <motion.g
            animate={{ y: [0, -3, 0, 3, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ContainerShip />
          </motion.g>
        </motion.g>

        {/* Foam splash near bow */}
        <motion.g
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        >
          <ellipse cx={600} cy={246} rx={36} ry={4} fill="#ffffff" opacity="0.35" />
          <ellipse cx={620} cy={250} rx={22} ry={3} fill="#ffffff" opacity="0.25" />
        </motion.g>
      </svg>
    </div>
  );
}

function Cloud({
  cx,
  cy,
  scale = 1,
  opacity = 0.2,
}: {
  cx: number;
  cy: number;
  scale?: number;
  opacity?: number;
}) {
  return (
    <g transform={`translate(${cx} ${cy}) scale(${scale})`} opacity={opacity}>
      <ellipse rx={26} ry={9} fill="#ffffff" />
      <ellipse cx={-18} ry={7} rx={16} fill="#ffffff" />
      <ellipse cx={18} ry={6} rx={14} fill="#ffffff" />
    </g>
  );
}

function Plane() {
  return (
    <g transform="translate(0 50)">
      {/* Body */}
      <path
        d="M 0 0 L 56 -2 L 70 0 L 56 2 Z"
        fill="#ffffff"
        opacity="0.85"
      />
      {/* Wings */}
      <path d="M 28 -1 L 22 -10 L 30 -1 Z" fill="#ffffff" opacity="0.7" />
      <path d="M 28 1 L 22 10 L 30 1 Z" fill="#ffffff" opacity="0.7" />
      {/* Tail */}
      <path d="M 4 -1 L -2 -7 L 6 -1 Z" fill="#ffffff" opacity="0.65" />
      {/* Contrail */}
      <rect x={-50} y={-1} width={50} height={2} fill="#ffffff" opacity="0.18" />
      <rect x={-100} y={-0.5} width={50} height={1} fill="#ffffff" opacity="0.1" />
    </g>
  );
}

function ContainerShip() {
  // Ship rendered at coordinates (380..620 horizontally, 200..260 vertically)
  return (
    <g transform="translate(380 200)">
      {/* Containers — stacked rows, alternating navy shades */}
      <ContainerStack x={10} y={0} colors={["#0d1b3d", "#162d66", "#1a3578"]} />
      <ContainerStack x={60} y={0} colors={["#1a3578", "#0d1b3d", "#162d66"]} />
      <ContainerStack x={110} y={0} colors={["#162d66", "#1a3578", "#0d1b3d"]} />
      <ContainerStack x={160} y={0} colors={["#0d1b3d", "#162d66", "#1a3578"]} />

      {/* Bridge / superstructure (right side) */}
      <rect x={196} y={10} width={28} height={36} fill="#ffffff" opacity="0.92" />
      <rect x={200} y={16} width={6} height={6} fill="#5a82c8" />
      <rect x={210} y={16} width={6} height={6} fill="#5a82c8" />
      <rect x={200} y={26} width={6} height={6} fill="#5a82c8" />
      <rect x={210} y={26} width={6} height={6} fill="#5a82c8" />
      {/* Smoke stack */}
      <rect x={208} y={-4} width={6} height={14} fill="#0d1b3d" />

      {/* Hull */}
      <path
        d="M 0 46 L 6 60 L 226 60 L 232 46 Z"
        fill="url(#hull)"
      />
      {/* Waterline stripe */}
      <rect x={6} y={56} width={220} height={1.5} fill="#5a82c8" opacity="0.6" />
    </g>
  );
}

function ContainerStack({
  x,
  y,
  colors,
}: {
  x: number;
  y: number;
  colors: string[];
}) {
  return (
    <g transform={`translate(${x} ${y})`}>
      {colors.map((c, i) => (
        <g key={i} transform={`translate(0 ${i * 14})`}>
          <rect width={46} height={12} y={32} fill={c} stroke="#5a82c8" strokeOpacity="0.3" />
          {/* Container ribs */}
          <rect width={1} height={12} x={8} y={32} fill="#ffffff" opacity="0.08" />
          <rect width={1} height={12} x={18} y={32} fill="#ffffff" opacity="0.08" />
          <rect width={1} height={12} x={28} y={32} fill="#ffffff" opacity="0.08" />
          <rect width={1} height={12} x={38} y={32} fill="#ffffff" opacity="0.08" />
        </g>
      ))}
    </g>
  );
}

function Wave({
  baseline,
  amplitude,
  speed,
  opacity,
  color,
  delay = 0,
}: {
  baseline: number;
  amplitude: number;
  speed: number;
  opacity: number;
  color: string;
  delay?: number;
}) {
  // Two paths that swap to create the looping wave effect.
  const pathA = buildWavePath(baseline, amplitude, 0);
  const pathB = buildWavePath(baseline, amplitude, Math.PI);
  return (
    <motion.path
      initial={{ d: pathA }}
      animate={{ d: [pathA, pathB, pathA] }}
      transition={{
        duration: speed,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
      fill={color}
      opacity={opacity}
    />
  );
}

function buildWavePath(
  baseline: number,
  amplitude: number,
  phase: number,
): string {
  const points: string[] = [];
  const segments = 16;
  for (let i = 0; i <= segments; i++) {
    const x = (i / segments) * 800;
    const y = baseline + Math.sin(i * 0.6 + phase) * amplitude;
    points.push(`${i === 0 ? "M" : "L"} ${x} ${y}`);
  }
  points.push(`L 800 320 L 0 320 Z`);
  return points.join(" ");
}
