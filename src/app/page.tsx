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
    image: "/images/home-hero-logistics.png",
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
      {/* ───── HERO ───── */}
      {/* Sin min-h forzado — el hero crece naturalmente al contenido,
          evitando una franja navy vacía en el bottom cuando el contenido
          es más chico que el viewport (Full HD especialmente). */}
      <section className="hero-bg hero-bg-noise relative isolate overflow-hidden pt-28 pb-20 text-white sm:pt-32 sm:pb-24 lg:pt-32 lg:pb-28 xl:pt-36 xl:pb-32">
        <HeroOrbs />
        <div className="relative z-10 mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
          <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-12 xl:gap-16">
            <div className="text-center lg:text-left">
              <h1 className="font-serif text-[2.5rem] font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-[3rem] xl:text-[3.75rem] 2xl:text-[4.25rem]">
                Logística sin fronteras,
                <br />
                <span className="text-white/70">precios cerrados en destino.</span>
              </h1>
              <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-white/80 sm:mt-5 sm:text-base lg:mx-0 lg:text-[15.5px] xl:text-lg">
                Coordinamos combustibles en iso tanques, contenedores de
                alimentos, paquetería y cargas internacionales con documentación
                completa, tracking satelital y precio CIF cerrado de antemano.
              </p>
              <div className="mt-7 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
                <Link href="/tracking" className="btn-glass-primary">
                  <Search className="h-4 w-4" />
                  Rastrear envío
                </Link>
                <Link href="/servicios" className="btn-glass-ghost">
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
                    src="/images/home-hero-logistics.png"
                    alt="Logística internacional Azahares — barco, ISO tank, reefer y avión cargo sobre red mundial"
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

      {/* ───── FEATURES — diseño moderno con números + accents animados ───── */}
      {/* bg-white→navy-50/50 gradient suave que conecta con la siguiente
          sección (bg-navy-50/60) sin franja blanca residual. */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white via-white to-navy-50/40 py-16 sm:py-20 lg:py-24">
        {/* Decorativo: gradiente radial sutil de fondo */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 10% 0%, rgba(29,58,138,0.06), transparent 60%), radial-gradient(ellipse 50% 50% at 90% 100%, rgba(29,58,138,0.05), transparent 60%)",
          }}
        />

        <div className="relative mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
          <RevealOnScroll className="mb-12 text-center sm:mb-14">
            <span className="inline-flex items-center gap-2 rounded-full border border-navy-200 bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-navy-700 shadow-[0_4px_18px_rgba(13,27,61,0.06)] sm:text-[11px]">
              <span className="h-1.5 w-1.5 rounded-full bg-success-500" />
              Por qué Azahares
            </span>
            <h2 className="mt-4 font-serif text-[1.75rem] font-bold leading-tight text-navy-900 sm:text-3xl lg:text-[2.5rem]">
              Una sola operación,{" "}
              <span className="relative inline-block">
                cero fricción
                <span
                  aria-hidden
                  className="absolute -bottom-1 left-0 right-0 h-[3px] rounded-full bg-gradient-to-r from-navy-300 via-navy-500 to-navy-300"
                />
              </span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-relaxed text-slate-600 sm:text-base">
              Centralizamos cotización, documentación, booking marítimo o
              aéreo, despacho aduanero y delivery. Tu operación arranca en un
              email y termina con el cliente recibiendo la mercadería.
            </p>
          </RevealOnScroll>

          <div className="grid gap-5 md:grid-cols-3 md:gap-6 lg:gap-8">
            {FEATURES.map((f, i) => (
              <RevealOnScroll key={f.title} delay={i * 0.1}>
                <div className="group relative h-full overflow-hidden rounded-3xl border border-navy-100 bg-white p-7 transition-all duration-500 hover:-translate-y-2 hover:border-navy-200 hover:shadow-[0_24px_60px_-12px_rgba(13,27,61,0.22)] lg:p-8">
                  {/* Hover accent — barra de gradient navy aparece arriba */}
                  <div
                    aria-hidden
                    className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-navy-500 via-navy-700 to-navy-900 transition-transform duration-500 group-hover:scale-x-100"
                  />

                  {/* Número grande fantasma */}
                  <div className="pointer-events-none absolute right-5 top-4 select-none font-serif text-7xl font-bold leading-none text-navy-900/[0.04] transition-colors duration-500 group-hover:text-navy-900/[0.08]">
                    0{i + 1}
                  </div>

                  {/* Icono — caja navy con glow al hover */}
                  <div className="relative inline-grid h-14 w-14 place-items-center rounded-2xl bg-navy-900 text-white shadow-[0_10px_24px_rgba(13,27,61,0.28)] transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-[0_16px_36px_rgba(13,27,61,0.42)]">
                    <f.icon className="h-6 w-6" strokeWidth={2.2} />
                    {/* Pulse dot */}
                    <span
                      aria-hidden
                      className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-success-500 ring-4 ring-white"
                    />
                  </div>

                  <h3 className="relative mt-6 font-serif text-xl font-bold leading-tight text-navy-900 lg:text-[1.35rem]">
                    {f.title}
                  </h3>

                  {/* Underline accent que crece al hover */}
                  <div
                    aria-hidden
                    className="mt-2 h-0.5 w-8 origin-left bg-navy-300 transition-all duration-500 group-hover:w-16 group-hover:bg-navy-700"
                  />

                  <p className="relative mt-4 text-[14.5px] leading-relaxed text-slate-600">
                    {f.desc}
                  </p>

                  {/* Read-more chevron que aparece al hover */}
                  <div className="relative mt-5 inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-navy-700 opacity-0 transition-all duration-500 group-hover:opacity-100">
                    <span>Saber más</span>
                    <ArrowRight className="h-3 w-3 transition-transform duration-500 group-hover:translate-x-1" />
                  </div>
                </div>
              </RevealOnScroll>
            ))}
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

      {/* ───── CTA TRACKING ───── */}
      <section className="relative isolate overflow-hidden py-16 sm:py-24 lg:py-28">
        <div className="absolute inset-0 hero-bg" />
        <HeroOrbs />
        <div className="relative z-10 mx-auto max-w-5xl px-5 text-center text-white sm:px-8 lg:px-12">
          <RevealOnScroll>
            <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-white/75 sm:text-xs">
              Tracking
            </span>
            <h2 className="mt-3 font-serif text-[1.75rem] font-bold leading-tight sm:text-4xl lg:text-5xl">
              Saber dónde está tu carga, siempre.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-white/80">
              Con tu número de orden, factura o booking CAT te mostramos cada
              hito del envío, la ubicación GPS en vivo del contenedor y la
              fecha estimada de entrega al consignatario.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link href="/tracking" className="btn-glass-primary">
                <Search className="h-4 w-4" />
                Rastrear ahora
              </Link>
              <Link href="/contacto" className="btn-glass-ghost">
                Hablar con un ejecutivo
              </Link>
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </>
  );
}

