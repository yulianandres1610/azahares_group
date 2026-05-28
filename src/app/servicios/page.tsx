import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Boxes,
  CheckCircle2,
  Droplet,
  FileCheck2,
  Fuel,
  Package,
  Plane,
  Ship,
  Snowflake,
  Truck,
} from "lucide-react";
import { HeroOrbs } from "@/components/HeroOrbs";
import { RevealOnScroll } from "@/components/RevealOnScroll";

export const metadata = {
  title: "Servicios · Azahares Group",
  description:
    "Combustible en iso tanques, contenedores de alimentos, courier de paquetería y logística end-to-end USA → Cuba.",
};

const SECTIONS = [
  {
    id: "combustible",
    eyebrow: "Energía",
    title: "Combustible en iso tanques",
    image:
      "https://images.unsplash.com/photo-1518709268805-4e9042af2176?auto=format&fit=crop&w=1400&q=80",
    intro:
      "Exportamos gasolina regular, gasolina premium, diésel y kerosene/jet fuel desde Puerto Everglades (Florida) a Mariel y otros puertos cubanos en iso tanques de 20 ft.",
    bullets: [
      { icon: Droplet, text: "Capacidad 23,848 L · 6,300 GAL por iso tanque" },
      { icon: FileCheck2, text: "Commercial Invoice, DGD y BOL listos para Aduana" },
      { icon: Ship, text: "Booking Crowley con tracking GPS satelital" },
    ],
    cta: "Cotizar combustible",
  },
  {
    id: "alimentos",
    eyebrow: "Alimentos",
    title: "Contenedores de alimentos",
    image:
      "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1400&q=80",
    intro:
      "Coordinamos envíos de víveres, productos refrigerados y alimentos secos para distribución dentro de la isla. Contenedores reefer + dry de 20 ft y 40 ft.",
    bullets: [
      { icon: Snowflake, text: "Reefer con cadena de frío garantizada (-25 °C a +25 °C)" },
      { icon: Boxes, text: "Mezcla de productos por contenedor con manifiesto detallado" },
      { icon: Truck, text: "Delivery hasta el almacén del consignatario en La Habana" },
    ],
    cta: "Solicitar cotización",
  },
  {
    id: "courier",
    eyebrow: "Paquetería",
    title: "Courier puerta a puerta",
    image:
      "https://images.unsplash.com/photo-1607082352121-fa243f3dde32?auto=format&fit=crop&w=1400&q=80",
    intro:
      "Servicio de courier para envíos personales y comerciales. Recogemos en Miami, transportamos vía aérea o consolidado marítimo, y entregamos en La Habana y municipios.",
    bullets: [
      { icon: Package, text: "Envíos hasta 70 lb · tarifas planas por libra" },
      { icon: Plane, text: "Modalidad express (3-5 días) y económica (10-15 días)" },
      { icon: CheckCircle2, text: "Seguimiento en vivo desde el momento del recogido" },
    ],
    cta: "Coordinar envío",
  },
  {
    id: "logistica",
    eyebrow: "Logística integral",
    title: "Coordinación end-to-end",
    image:
      "https://images.unsplash.com/photo-1577563908411-5077b6dc7624?auto=format&fit=crop&w=1400&q=80",
    intro:
      "Si necesitás importar o exportar algo distinto a combustible, alimentos o paquetería, también lo hacemos. Coordinamos cargas FCL/LCL, despacho aduanero y delivery final.",
    bullets: [
      { icon: Ship, text: "Cargas FCL (20/40/45 ft) y consolidado LCL" },
      { icon: FileCheck2, text: "Gestión de licencias OFAC y documentación BIS/EAR99" },
      { icon: Truck, text: "Última milla con red propia en territorio cubano" },
    ],
    cta: "Hablar con un ejecutivo",
  },
];

export default function ServiciosPage() {
  return (
    <>
      <section className="hero-bg hero-bg-noise relative isolate overflow-hidden pt-28 pb-16 text-white sm:pt-36 sm:pb-24">
        <HeroOrbs />
        <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-amber-300 backdrop-blur">
            Nuestros servicios
          </span>
          <h1 className="mt-5 font-serif text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Movemos lo que Cuba necesita.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">
            Combustible, alimentos, paquetería y logística general — todo
            coordinado desde una sola operación, con precios CIF y tracking en
            tiempo real.
          </p>
        </div>
      </section>

      {SECTIONS.map((s, i) => (
        <section
          key={s.id}
          id={s.id}
          className={
            "py-20 sm:py-28 " + (i % 2 === 0 ? "bg-white" : "bg-navy-50/60")
          }
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div
              className={
                "grid items-center gap-10 lg:grid-cols-2 " +
                (i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : "")
              }
            >
              <RevealOnScroll direction={i % 2 === 0 ? "right" : "left"}>
                <div className="relative overflow-hidden rounded-3xl shadow-[0_20px_50px_rgba(13,27,61,0.18)]">
                  <Image
                    src={s.image}
                    alt={s.title}
                    width={1400}
                    height={900}
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="aspect-[4/3] w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-navy-900/35 via-transparent to-transparent" />
                </div>
              </RevealOnScroll>

              <RevealOnScroll direction={i % 2 === 0 ? "left" : "right"}>
                <span className="text-xs font-bold uppercase tracking-[0.22em] text-amber-600">
                  {s.eyebrow}
                </span>
                <h2 className="mt-3 font-serif text-3xl font-bold text-navy-900 sm:text-4xl">
                  {s.title}
                </h2>
                <p className="mt-4 text-base leading-relaxed text-slate-600">
                  {s.intro}
                </p>
                <ul className="mt-6 space-y-3">
                  {s.bullets.map((b) => (
                    <li
                      key={b.text}
                      className="flex items-start gap-3 rounded-2xl border border-navy-100 bg-white/60 p-3 backdrop-blur"
                    >
                      <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-navy-900 text-amber-300">
                        <b.icon className="h-4 w-4" strokeWidth={2.4} />
                      </div>
                      <span className="text-sm leading-relaxed text-navy-900">
                        {b.text}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="mt-7 flex flex-wrap gap-3">
                  <Link
                    href="/contacto"
                    className="inline-flex items-center gap-2 rounded-full bg-navy-900 px-5 py-3 text-sm font-bold text-white shadow-[0_8px_24px_rgba(13,27,61,0.28)] transition hover:-translate-y-0.5 hover:bg-navy-700"
                  >
                    {s.cta}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/tracking"
                    className="inline-flex items-center gap-2 rounded-full border border-navy-200 bg-white px-5 py-3 text-sm font-bold text-navy-800 transition hover:bg-navy-50"
                  >
                    Tracking
                  </Link>
                </div>
              </RevealOnScroll>
            </div>
          </div>
        </section>
      ))}

      {/* ───── CTA final ───── */}
      <section className="relative isolate overflow-hidden py-20 text-white sm:py-28">
        <div className="absolute inset-0 hero-bg" />
        <HeroOrbs />
        <div className="relative z-10 mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <RevealOnScroll>
            <h2 className="font-serif text-3xl font-bold sm:text-5xl">
              ¿Listos para mover tu carga?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-white/80">
              Te respondemos en menos de 24 horas con una cotización CIF
              cerrada y los pasos para arrancar la operación.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link href="/contacto" className="btn-glass-primary">
                Contactanos
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/tracking" className="btn-glass-ghost">
                Ya tengo un envío activo
              </Link>
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </>
  );
}
