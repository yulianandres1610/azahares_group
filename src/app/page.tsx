import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Boxes,
  CheckCircle2,
  Fuel,
  Package,
  Plane,
  Search,
  Ship,
  Sparkles,
} from "lucide-react";
import { HeroOrbs } from "@/components/HeroOrbs";
import { RevealOnScroll } from "@/components/RevealOnScroll";

const STATS = [
  { value: "8+", label: "años operando" },
  { value: "100%", label: "precios CIF" },
  { value: "USA→CU", label: "ruta directa" },
  { value: "24/7", label: "tracking GPS" },
];

const SERVICES = [
  {
    id: "combustible",
    icon: Fuel,
    title: "Combustible en iso tanques",
    description:
      "Gasolina, diésel y jet fuel exportados desde Puerto Everglades en iso tanques de 20 ft a Cuba.",
    cta: "Conocer más",
    image:
      "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=900&q=70",
  },
  {
    id: "alimentos",
    icon: Boxes,
    title: "Contenedores de alimentos",
    description:
      "Importación de víveres, productos refrigerados y secos para distribución dentro de la isla.",
    cta: "Ver contenedores",
    image:
      "https://images.unsplash.com/photo-1543393470-b2ff86618388?auto=format&fit=crop&w=900&q=70",
  },
  {
    id: "courier",
    icon: Package,
    title: "Courier y paquetería",
    description:
      "Servicio puerta a puerta para envíos personales y comerciales. Trazabilidad en línea, entregas en La Habana y municipios.",
    cta: "Solicitar envío",
    image:
      "https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?auto=format&fit=crop&w=900&q=70",
  },
  {
    id: "logistica",
    icon: Ship,
    title: "Logística marítima y aérea",
    description:
      "Coordinación end-to-end de cargas — booking con Crowley, BOL, despacho aduanero y delivery al consignatario.",
    cta: "Hablar con ventas",
    image:
      "https://images.unsplash.com/photo-1577563908411-5077b6dc7624?auto=format&fit=crop&w=900&q=70",
  },
];

const FEATURES = [
  {
    icon: CheckCircle2,
    title: "Precio CIF transparente",
    desc: "Todo cotizado puesto en destino — flete marítimo, THCD, ISPD, seguro y aduana ya incluidos.",
  },
  {
    icon: Sparkles,
    title: "Documentación lista",
    desc: "Factura comercial export, packing list, Dangerous Goods Declaration y BOL generados automáticamente.",
  },
  {
    icon: Search,
    title: "Tracking en tiempo real",
    desc: "Seguí cada contenedor desde la salida del yard hasta la entrega final con GPS satelital cada hora.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* ───── HERO ───── */}
      <section className="hero-bg hero-bg-noise relative isolate overflow-hidden pt-28 pb-24 text-white sm:pt-36 sm:pb-32">
        <HeroOrbs />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_1fr]">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-amber-300 backdrop-blur">
                <Sparkles className="h-3 w-3" />
                Grupo Azahares · USA ↔ Cuba
              </span>
              <h1 className="mt-5 font-serif text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
                Logística que mueve <span className="text-amber-300">Cuba</span> hacia adelante.
              </h1>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
                Combustible en iso tanques, contenedores de alimentos y courier
                de paquetería — todo con precio CIF puesto en destino y tracking
                satelital en vivo.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link href="/tracking" className="btn-glass-primary">
                  <Search className="h-4 w-4" />
                  Rastrear envío
                </Link>
                <Link href="/servicios" className="btn-glass-ghost">
                  Conocer servicios
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              {/* Stats inline */}
              <div className="mt-12 grid max-w-lg grid-cols-2 gap-3 sm:grid-cols-4">
                {STATS.map((s) => (
                  <div
                    key={s.label}
                    className="glass-panel rounded-2xl px-3 py-3 text-center"
                  >
                    <div className="font-serif text-xl font-bold text-white sm:text-2xl">
                      {s.value}
                    </div>
                    <div className="mt-0.5 text-[10px] font-semibold uppercase tracking-wider text-white/65">
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero card — visual de iso tanque + servicios destacados */}
            <div className="relative">
              <div className="glass-panel-strong relative overflow-hidden rounded-[28px] p-6">
                <Image
                  src="https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&w=1200&q=80"
                  alt="Contenedores en puerto"
                  width={1200}
                  height={800}
                  className="aspect-[5/4] w-full rounded-2xl object-cover"
                  priority
                />
                <div className="mt-5 grid grid-cols-3 gap-3">
                  <ServicePill icon={Fuel} label="Combustible" />
                  <ServicePill icon={Boxes} label="Alimentos" />
                  <ServicePill icon={Plane} label="Aéreo" />
                </div>
              </div>
              <div
                aria-hidden
                className="pointer-events-none absolute -bottom-8 left-1/2 h-24 w-3/4 -translate-x-1/2 rounded-full bg-amber-500/30 blur-3xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ───── FEATURES STRIP ───── */}
      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <RevealOnScroll className="mb-12 text-center">
            <span className="text-xs font-bold uppercase tracking-[0.22em] text-amber-600">
              Por qué Azahares
            </span>
            <h2 className="mt-3 font-serif text-3xl font-bold text-navy-900 sm:text-4xl">
              Operación end-to-end, sin sorpresas
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-slate-600">
              Sumamos en una sola plataforma todo lo necesario para que tu
              importación o exportación a Cuba salga limpia desde la
              cotización hasta la entrega final.
            </p>
          </RevealOnScroll>

          <div className="grid gap-6 md:grid-cols-3">
            {FEATURES.map((f, i) => (
              <RevealOnScroll key={f.title} delay={i * 0.08}>
                <div className="group h-full rounded-3xl border border-navy-100 bg-gradient-to-br from-white to-navy-50/40 p-7 transition hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(13,27,61,0.12)]">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-navy-900 text-amber-300 shadow-[0_8px_20px_rgba(13,27,61,0.25)]">
                    <f.icon className="h-6 w-6" strokeWidth={2.2} />
                  </div>
                  <h3 className="mt-5 font-serif text-xl font-bold text-navy-900">
                    {f.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {f.desc}
                  </p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ───── SERVICES GRID ───── */}
      <section
        id="servicios"
        className="relative overflow-hidden bg-navy-50/60 py-20 sm:py-28"
      >
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-navy-300/60 to-transparent" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <RevealOnScroll className="mb-12 max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-[0.22em] text-amber-600">
              Servicios
            </span>
            <h2 className="mt-3 font-serif text-3xl font-bold text-navy-900 sm:text-4xl">
              Cuatro verticales, una sola operación
            </h2>
            <p className="mt-3 text-slate-600">
              Coordinamos importación, exportación, despacho aduanero y delivery
              a lo largo de toda la cadena.
            </p>
          </RevealOnScroll>

          <div className="grid gap-6 sm:grid-cols-2">
            {SERVICES.map((s, i) => (
              <RevealOnScroll key={s.id} delay={(i % 2) * 0.1}>
                <div
                  id={s.id}
                  className="group relative overflow-hidden rounded-3xl bg-white shadow-[0_10px_30px_rgba(13,27,61,0.06)] transition hover:-translate-y-1 hover:shadow-[0_28px_60px_rgba(13,27,61,0.18)]"
                >
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <Image
                      src={s.image}
                      alt={s.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover transition duration-[1.2s] group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-900/85 via-navy-900/20 to-transparent" />
                    <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white backdrop-blur">
                      <s.icon className="h-3.5 w-3.5 text-amber-300" />
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
                      className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-navy-700 transition group-hover:text-amber-600"
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
      <section className="relative isolate overflow-hidden py-20 sm:py-28">
        <div className="absolute inset-0 hero-bg" />
        <HeroOrbs />
        <div className="relative z-10 mx-auto max-w-5xl px-4 text-center text-white sm:px-6 lg:px-8">
          <RevealOnScroll>
            <span className="text-xs font-bold uppercase tracking-[0.22em] text-amber-300">
              Tracking
            </span>
            <h2 className="mt-3 font-serif text-3xl font-bold sm:text-5xl">
              Tu carga, en tiempo real.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-white/80">
              Ingresá tu número de orden, factura o booking CAT y te mostramos
              exactamente dónde está tu contenedor, qué documentos ya emitimos
              y cuándo llega al destino.
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

function ServicePill({
  icon: Icon,
  label,
}: {
  icon: typeof Fuel;
  label: string;
}) {
  return (
    <div className="flex flex-col items-center gap-1.5 rounded-2xl bg-white/15 px-2 py-3 text-center backdrop-blur">
      <Icon className="h-5 w-5 text-amber-300" />
      <span className="text-[11px] font-semibold uppercase tracking-wider text-white/90">
        {label}
      </span>
    </div>
  );
}
