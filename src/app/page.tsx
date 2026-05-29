import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Boxes,
  CheckCircle2,
  Fuel,
  Package,
  Search,
  Ship,
  Sparkles,
} from "lucide-react";
import { HeroOrbs } from "@/components/HeroOrbs";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { AnimatedCounter } from "@/components/AnimatedCounter";

const STATS: Array<{
  value: number | string;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  label: string;
}> = [
  { value: 8, suffix: "+", label: "años operando" },
  { value: 100, suffix: "%", label: "precios CIF" },
  { value: 24, suffix: "/7", label: "tracking GPS" },
  { value: "Global", label: "cobertura" },
];

const SERVICES = [
  {
    id: "combustible",
    icon: Fuel,
    title: "Combustible en iso tanques",
    description:
      "Gasolina, diésel y jet fuel exportados en iso tanques de 20 ft. Documentación BIS/EAR99 completa, BOL marítimo y certificados de calidad listos para Aduana.",
    cta: "Conocer más",
    image: "/images/service-combustible.png",
  },
  {
    id: "alimentos",
    icon: Boxes,
    title: "Contenedores de alimentos",
    description:
      "Reefer y dry de 20 ft y 40 ft para víveres, productos refrigerados y secos. Cadena de frío certificada y manifiesto detallado por SKU.",
    cta: "Ver contenedores",
    image: "/images/service-alimentos.png",
  },
  {
    id: "courier",
    icon: Package,
    title: "Courier y paquetería",
    description:
      "Servicio puerta a puerta para envíos personales y comerciales con trazabilidad en vivo, tiempos comprometidos y delivery al consignatario final.",
    cta: "Solicitar envío",
    image: "/images/service-courier.png",
  },
  {
    id: "logistica",
    icon: Ship,
    title: "Logística internacional",
    description:
      "Coordinación end-to-end — booking marítimo o aéreo, despacho aduanero, documentación BIS/EAR99 y última milla con red de partners verificados.",
    cta: "Hablar con ventas",
    image: "/images/service-logistica.png",
  },
];

const FEATURES = [
  {
    icon: CheckCircle2,
    title: "Precio CIF cerrado",
    desc: "Cotización final incluye flete marítimo o aéreo, THC, seguro, documentación, despacho aduanero y delivery. Sin cargos sorpresa al arribo.",
  },
  {
    icon: Sparkles,
    title: "Documentación impecable",
    desc: "Generamos Commercial Invoice, Packing List, Dangerous Goods Declaration y BOL en formato exigido por la naviera y autoridades aduaneras.",
  },
  {
    icon: Search,
    title: "Trazabilidad satelital",
    desc: "Cada contenedor reporta posición GPS por hora desde la salida del yard hasta la entrega — vos y tu cliente ven el mismo dato en tiempo real.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* ───── HERO ─────
          Padding natural en mobile/sm/lg/xl — MBP 14" (1512px → cae en
          xl) ya rellena bien el viewport con este padding.

          A partir de 2xl (≥1536px, ej. monitor 1920×1080 externo) el
          contenido es ~210px más corto que la pantalla y se ve una
          banda blanca del feature section antes de scrollear. Usamos
          `2xl:min-h-screen` + `2xl:flex 2xl:items-center` para que la
          sección llene el viewport y centre el contenido verticalmente.
          En MBP 14" no se activa porque está por debajo del breakpoint
          2xl (1536px). */}
      <section className="hero-bg hero-bg-noise relative isolate overflow-hidden pt-24 pb-14 text-white sm:pt-32 sm:pb-24 lg:pt-32 lg:pb-28 xl:pt-36 xl:pb-32 2xl:flex 2xl:min-h-screen 2xl:items-center 2xl:pb-20 2xl:pt-20">
        <HeroOrbs />
        {/* w-full a partir de 2xl: cuando el section pasa a flex para
            centrar el contenido vertical en monitores 1920×1080, el div
            necesita ocupar todo el ancho disponible para que mx-auto +
            max-w-[1400px] sigan centrando horizontalmente. */}
        <div className="relative z-10 mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12 2xl:w-full">
          <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-12 xl:gap-16">
            <div className="text-center lg:text-left">
              {/* Typography mobile-tuned: h1 más chico para que no se
                  desborde en iPhone 14/15/17 (~390px), <br> sale en mobile
                  para mejor wrap. Desktop intacto desde sm:. */}
              <h1 className="font-serif text-[2.1rem] font-bold leading-[1.08] tracking-tight sm:text-5xl sm:leading-[1.05] lg:text-[3rem] xl:text-[3.75rem] 2xl:text-[4.25rem]">
                Logística sin fronteras,{" "}
                <span className="text-white/70">precios cerrados en destino.</span>
              </h1>
              <p className="mx-auto mt-3 max-w-xl text-[14px] leading-relaxed text-white/80 sm:mt-5 sm:text-base lg:mx-0 lg:text-[15.5px] xl:text-lg">
                Coordinamos combustibles en iso tanques, contenedores de
                alimentos, paquetería y cargas internacionales con documentación
                completa, tracking satelital y precio CIF cerrado de antemano.
              </p>
              {/* Mobile: botones full-width stacked para mejor tap target.
                  Desktop sm+: vuelve al flex-wrap horizontal. */}
              <div className="mt-6 flex flex-col gap-2.5 sm:mt-7 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-3 lg:justify-start">
                <Link
                  href="/tracking"
                  className="btn-glass-primary justify-center sm:justify-start"
                >
                  <Search className="h-4 w-4" />
                  Rastrear envío
                </Link>
                <Link
                  href="/servicios"
                  className="btn-glass-ghost justify-center sm:justify-start"
                >
                  Conocer servicios
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              {/* Stats con contador animado — padding y typography ajustados
                  para que la fila completa entre en la altura del hero en
                  MBP 14" sin empujar el card derecho. */}
              <div className="mx-auto mt-8 grid max-w-xl grid-cols-2 gap-2.5 sm:mt-10 sm:gap-3 md:grid-cols-4 lg:mx-0 xl:mt-12">
                {STATS.map((s) => (
                  <div
                    key={s.label}
                    className="glass-panel rounded-2xl px-3 py-3 text-center sm:py-3.5 xl:py-4"
                  >
                    <div className="font-serif text-[1.5rem] font-bold leading-tight text-white sm:text-[1.65rem] xl:text-3xl">
                      <AnimatedCounter
                        value={s.value}
                        prefix={s.prefix}
                        suffix={s.suffix}
                        decimals={s.decimals}
                      />
                    </div>
                    <div className="mt-0.5 text-[9.5px] font-semibold uppercase tracking-wider text-white/65 sm:text-[10px]">
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero visual — render compuesto custom de Azahares limpio.
                Sin badges ni overlays — la imagen habla por sí misma con
                todos los servicios (ship, ISO tank, reefer, truck, plane,
                mapa con pins). */}
            <div className="relative mx-auto w-full max-w-[520px] lg:max-w-[560px] xl:max-w-[640px]">
              <div className="glass-panel-strong relative overflow-hidden rounded-[28px] p-3">
                <div className="relative aspect-[16/9] overflow-hidden rounded-2xl sm:aspect-[16/10]">
                  <Image
                    src="/images/tracking-hero.png"
                    alt="Logística internacional Azahares — barco contenedor, avión cargo y truck sobre red mundial"
                    fill
                    sizes="(max-width: 640px) 90vw, (max-width: 1024px) 70vw, 45vw"
                    priority
                    className="object-cover"
                  />
                </div>
              </div>
              <div
                aria-hidden
                className="pointer-events-none absolute -bottom-8 left-1/2 h-24 w-3/4 -translate-x-1/2 rounded-full bg-white/15 blur-3xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ───── FEATURES — bento layout moderno ─────
          Card grande feature destacada a la izquierda + 2 cards
          apiladas a la derecha. Asimétrico, sin grid uniforme aburrido,
          con micro-interacciones y profundidad. */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white via-white to-navy-50/40 py-16 sm:py-20 lg:py-24">
        {/* Decorativos de fondo */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-70"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 10% 0%, rgba(29,58,138,0.08), transparent 60%), radial-gradient(ellipse 50% 50% at 90% 100%, rgba(29,58,138,0.06), transparent 60%)",
          }}
        />
        {/* Grid pattern decorativo top-right */}
        <svg
          aria-hidden
          className="pointer-events-none absolute right-0 top-0 h-72 w-72 opacity-[0.07]"
          viewBox="0 0 100 100"
        >
          <defs>
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#0d1b3d" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#grid)" />
        </svg>

        <div className="relative mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
          {/* ── Header section ── */}
          <RevealOnScroll className="mb-12 text-center sm:mb-16">
            <span className="inline-flex items-center gap-2 rounded-full border border-navy-200 bg-white px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.22em] text-navy-700 shadow-[0_4px_18px_rgba(13,27,61,0.08)] sm:text-[11px]">
              <span className="relative flex h-2 w-2">
                <span className="absolute inset-0 animate-ping rounded-full bg-success-500 opacity-75" />
                <span className="relative h-2 w-2 rounded-full bg-success-500" />
              </span>
              Por qué Azahares
            </span>
            <h2 className="mt-5 font-serif text-[1.85rem] font-bold leading-[1.1] text-navy-900 sm:text-[2.25rem] lg:text-[2.75rem]">
              Una sola operación,{" "}
              <span className="relative inline-block whitespace-nowrap">
                cero fricción
                <svg
                  aria-hidden
                  viewBox="0 0 200 12"
                  className="absolute -bottom-2 left-0 right-0 h-2 w-full"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M 0 6 Q 50 0, 100 6 T 200 6"
                    stroke="url(#stroke-grad)"
                    strokeWidth="3"
                    fill="none"
                    strokeLinecap="round"
                  />
                  <defs>
                    <linearGradient id="stroke-grad" x1="0" x2="1">
                      <stop offset="0%" stopColor="#8caadb" />
                      <stop offset="50%" stopColor="#1d3a8a" />
                      <stop offset="100%" stopColor="#8caadb" />
                    </linearGradient>
                  </defs>
                </svg>
              </span>
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-[15px] leading-relaxed text-slate-600 sm:text-base">
              Centralizamos cotización, documentación, booking marítimo o
              aéreo, despacho aduanero y delivery. Tu operación arranca en un
              email y termina con el cliente recibiendo la mercadería.
            </p>
          </RevealOnScroll>

          {/* ── Bento grid ── */}
          <div className="grid gap-5 lg:grid-cols-12 lg:gap-6">
            {/* Feature destacada (col-7) — Precio CIF */}
            <RevealOnScroll className="lg:col-span-7" delay={0.05}>
              <FeatureCardLarge feature={FEATURES[0]} index={1} />
            </RevealOnScroll>

            {/* Sub-features (col-5) — apiladas */}
            <div className="grid gap-5 lg:col-span-5">
              <RevealOnScroll delay={0.15}>
                <FeatureCardSmall feature={FEATURES[1]} index={2} />
              </RevealOnScroll>
              <RevealOnScroll delay={0.25}>
                <FeatureCardSmall feature={FEATURES[2]} index={3} />
              </RevealOnScroll>
            </div>
          </div>
        </div>
      </section>

      {/* ───── SERVICES GRID ───── */}
      <section
        id="servicios"
        className="relative overflow-hidden bg-navy-50/40 py-16 sm:py-24 lg:py-28"
      >
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-navy-300/60 to-transparent" />
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
          <RevealOnScroll className="mb-10 max-w-2xl text-center sm:mb-12 sm:text-left">
            <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-navy-600 sm:text-xs">
              Servicios
            </span>
            <h2 className="mt-3 font-serif text-[1.75rem] font-bold leading-tight text-navy-900 sm:text-3xl lg:text-4xl">
              Cuatro verticales, una sola red logística
            </h2>
            <p className="mt-3 text-slate-600">
              Combustible, alimentos, paquetería y carga general — cada vertical
              con su propio expertise técnico, todas operadas desde la misma
              plataforma.
            </p>
          </RevealOnScroll>

          <div className="grid gap-6 sm:grid-cols-2">
            {SERVICES.map((s, i) => (
              <RevealOnScroll key={s.id} delay={(i % 2) * 0.1}>
                <div
                  id={s.id}
                  className="group relative overflow-hidden rounded-3xl bg-white shadow-[0_10px_30px_rgba(13,27,61,0.06)] transition hover:-translate-y-1 hover:shadow-[0_28px_60px_rgba(13,27,61,0.18)]"
                >
                  {/* Aspect 5/4 — los renders nuevos son cuadrados (1254x1254).
                      5/4 crop mínimo (8% top/bottom) que mantiene los elementos
                      principales centrados visibles. */}
                  <div className="relative aspect-[5/4] overflow-hidden">
                    <Image
                      src={s.image}
                      alt={s.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover transition duration-[1.2s] group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-900/85 via-navy-900/10 to-transparent" />
                    <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white backdrop-blur-xl">
                      <s.icon className="h-3.5 w-3.5" />
                      Servicio
                    </div>
                    <h3 className="absolute bottom-4 left-5 right-5 font-serif text-2xl font-bold text-white">
                      {s.title}
                    </h3>
                  </div>
                  <div className="p-6">
                    <p className="text-sm leading-relaxed text-slate-600">
                      {s.description}
                    </p>
                    <Link
                      href={`/servicios#${s.id}`}
                      className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-navy-700 transition group-hover:text-navy-900"
                    >
                      {s.cta}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ───── CTA TRACKING — light, con imagen mapa mundial con pins.
          La imagen ya es muy clara (mapa punteado navy + pins + rutas
          curvas sobre fondo blanco), así que solo necesitamos un overlay
          sutil que asegure legibilidad del texto sin tapar los pins. */}
      <section className="relative isolate overflow-hidden bg-white py-16 sm:py-24 lg:py-28">
        <div className="pointer-events-none absolute inset-0">
          <Image
            src="/images/home-cta-worldmap.png"
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-center"
          />
          {/* Overlay radial centrado — abre un "halo" blanco detrás del
              texto sin opacar el mapa de los bordes. */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 60% 70% at 50% 50%, rgba(255,255,255,0.85), rgba(255,255,255,0.35) 70%, rgba(255,255,255,0.15))",
            }}
          />
        </div>

        <div className="relative z-10 mx-auto max-w-5xl px-5 text-center sm:px-8 lg:px-12">
          <RevealOnScroll>
            <span className="inline-flex items-center gap-2 rounded-full border border-navy-200 bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-navy-700 shadow-[0_4px_18px_rgba(13,27,61,0.08)] sm:text-[11px]">
              <span className="relative flex h-2 w-2">
                <span className="absolute inset-0 animate-ping rounded-full bg-success-500 opacity-75" />
                <span className="relative h-2 w-2 rounded-full bg-success-500" />
              </span>
              Tracking
            </span>
            <h2 className="mt-4 font-serif text-[1.85rem] font-bold leading-tight text-navy-900 sm:text-[2.25rem] lg:text-[2.75rem]">
              Saber dónde está tu carga, siempre.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-relaxed text-navy-800/75 sm:text-base">
              Con tu número de orden, factura o booking CAT te mostramos cada
              hito del envío, la ubicación GPS en vivo del contenedor y la
              fecha estimada de entrega al consignatario.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                href="/tracking"
                className="inline-flex items-center gap-2 rounded-full border-2 border-navy-900 bg-navy-900 px-7 py-3 text-sm font-bold text-white shadow-[0_10px_30px_rgba(13,27,61,0.28)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-white hover:text-navy-900"
              >
                <Search className="h-4 w-4" />
                Rastrear ahora
              </Link>
              <Link
                href="/contacto"
                className="inline-flex items-center gap-2 rounded-full border-2 border-navy-900 bg-transparent px-7 py-3 text-sm font-bold text-navy-900 transition-all duration-200 hover:-translate-y-0.5 hover:bg-navy-900 hover:text-white"
              >
                Hablar con un ejecutivo
              </Link>
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </>
  );
}

// ============================================================================
// Bento Feature Cards
// ============================================================================

type FeatureItem = (typeof FEATURES)[number];

/**
 * Card grande destacada del bento — col-span-7 en desktop. Usa la primera
 * feature (Precio CIF cerrado) como hero del bloque "Por qué Azahares".
 * Layout split: visual a la derecha + contenido a la izquierda.
 */
function FeatureCardLarge({
  feature,
  index,
}: {
  feature: FeatureItem;
  index: number;
}) {
  const Icon = feature.icon;
  return (
    <div className="group relative h-full overflow-hidden rounded-3xl border border-navy-100 bg-white p-7 transition-all duration-500 hover:-translate-y-2 hover:border-navy-200 hover:shadow-[0_28px_70px_-12px_rgba(13,27,61,0.25)] sm:p-8 lg:p-10">
      {/* Top accent bar */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-navy-500 via-navy-700 to-navy-900 transition-transform duration-500 group-hover:scale-x-100"
      />

      {/* Gradient orb decorative */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-gradient-to-br from-navy-100/60 to-transparent blur-3xl transition-opacity duration-700 group-hover:opacity-100 opacity-70"
      />

      <div className="relative grid gap-8 sm:grid-cols-[1.2fr_1fr] sm:items-center">
        <div>
          {/* Step pill */}
          <div className="inline-flex items-center gap-2 rounded-full border border-navy-200 bg-navy-50/60 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-navy-700">
            <span className="font-mono tabular-nums">0{index}</span>
            <span className="h-1 w-1 rounded-full bg-navy-400" />
            <span>Diferencial principal</span>
          </div>

          {/* Icon + title */}
          <div className="mt-5 flex items-start gap-4">
            <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-navy-900 text-white shadow-[0_10px_24px_rgba(13,27,61,0.28)] transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 sm:h-16 sm:w-16">
              <Icon className="h-6 w-6 sm:h-7 sm:w-7" strokeWidth={2.2} />
            </div>
            <div className="min-w-0">
              <h3 className="font-serif text-[1.4rem] font-bold leading-tight text-navy-900 sm:text-[1.65rem]">
                {feature.title}
              </h3>
              <div
                aria-hidden
                className="mt-2 h-0.5 w-10 origin-left bg-navy-300 transition-all duration-500 group-hover:w-20 group-hover:bg-navy-700"
              />
            </div>
          </div>

          <p className="mt-5 text-[15px] leading-relaxed text-slate-600 sm:text-[15.5px]">
            {feature.desc}
          </p>

          {/* Checklist de items que SÍ están incluidos en CIF */}
          <ul className="mt-6 grid grid-cols-2 gap-2 text-[12px] sm:gap-x-4">
            {[
              "Flete marítimo/aéreo",
              "Despacho aduanero",
              "Documentación",
              "Última milla",
            ].map((item) => (
              <li
                key={item}
                className="flex items-center gap-2 text-navy-800"
              >
                <CheckCircle2
                  className="h-3.5 w-3.5 shrink-0 text-success-500"
                  strokeWidth={2.5}
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Visual — cotización mockup */}
        <div className="relative">
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-br from-navy-100/30 to-navy-200/20 blur-2xl"
          />
          <div className="rounded-2xl border border-navy-100 bg-gradient-to-br from-white to-navy-50/50 p-5 shadow-[0_18px_44px_rgba(13,27,61,0.08)] transition-transform duration-500 group-hover:-rotate-1">
            <div className="text-[9px] font-bold uppercase tracking-wider text-navy-500">
              Cotización · COT-25-0001
            </div>
            <div className="mt-3 space-y-2 text-[11px]">
              {[
                { l: "FOB combustible", v: "$ 63,920" },
                { l: "Flete marítimo", v: "$  5,300" },
                { l: "THC + ISPD", v: "$  3,300" },
                { l: "Seguro", v: "$    800" },
              ].map((r) => (
                <div
                  key={r.l}
                  className="flex items-baseline justify-between text-slate-600"
                >
                  <span>{r.l}</span>
                  <span className="font-mono tabular-nums">{r.v}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 rounded-xl bg-navy-900 px-4 py-3 text-white">
              <div className="text-[9px] uppercase tracking-wider text-white/60">
                Total CIF
              </div>
              <div className="mt-0.5 flex items-baseline justify-between">
                <span className="font-mono text-xl font-bold tabular-nums">
                  $ 73,320
                </span>
                <span className="rounded-full bg-success-500/20 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-success-300">
                  Cerrado
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Card pequeña del bento — col-span-5 lado a lado. Una versión más
 * compacta para las features secundarias.
 */
function FeatureCardSmall({
  feature,
  index,
}: {
  feature: FeatureItem;
  index: number;
}) {
  const Icon = feature.icon;
  return (
    <div className="group relative h-full overflow-hidden rounded-3xl border border-navy-100 bg-white p-6 transition-all duration-500 hover:-translate-y-1.5 hover:border-navy-200 hover:shadow-[0_22px_55px_-12px_rgba(13,27,61,0.22)] sm:p-7">
      {/* Top accent bar */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-navy-500 via-navy-700 to-navy-900 transition-transform duration-500 group-hover:scale-x-100"
      />

      <div className="flex items-start gap-4">
        <div className="relative">
          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-navy-900 text-white shadow-[0_10px_24px_rgba(13,27,61,0.28)] transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
            <Icon className="h-5 w-5" strokeWidth={2.2} />
          </div>
          <span
            aria-hidden
            className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-success-500 ring-4 ring-white"
          />
        </div>
        <div className="min-w-0 flex-1">
          {/* Step number */}
          <div className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-navy-500">
            0{index} · Operación
          </div>
          <h3 className="mt-1 font-serif text-lg font-bold leading-tight text-navy-900 sm:text-xl">
            {feature.title}
          </h3>
        </div>
      </div>

      <div
        aria-hidden
        className="mt-4 h-0.5 w-10 origin-left bg-navy-300 transition-all duration-500 group-hover:w-20 group-hover:bg-navy-700"
      />

      <p className="mt-3 text-[14px] leading-relaxed text-slate-600">
        {feature.desc}
      </p>

      {/* Read-more chevron al hover */}
      <div className="mt-4 inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-navy-700 opacity-0 transition-all duration-500 group-hover:opacity-100">
        <span>Ver detalle</span>
        <ArrowRight className="h-3 w-3 transition-transform duration-500 group-hover:translate-x-1" />
      </div>
    </div>
  );
}
