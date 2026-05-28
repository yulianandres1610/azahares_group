import { HeroOrbs } from "@/components/HeroOrbs";
import { TrackingClient } from "@/components/TrackingClient";
import { LogisticsInfographic } from "@/components/LogisticsInfographic";
import { Search, Ship, Activity, ShieldCheck } from "lucide-react";

export const metadata = {
  title: "Tracking · Azahares Import & Export",
  description:
    "Rastreá tu envío con número de orden, factura o booking CAT. Tracking GPS en tiempo real.",
};

const TRUST = [
  {
    icon: Activity,
    title: "Actualizado al instante",
    desc: "Cada cambio operacional se refleja en el tracking en menos de un minuto.",
  },
  {
    icon: Ship,
    title: "GPS satelital",
    desc: "Coordenadas precisas del contenedor cada hora, desde yard hasta delivery.",
  },
  {
    icon: ShieldCheck,
    title: "Acceso público",
    desc: "Compartí el código con tu cliente — no necesita usuario ni contraseña.",
  },
];

export default function TrackingPage() {
  return (
    <>
      {/* ───── HERO ───── */}
      <section className="hero-bg hero-bg-noise relative isolate overflow-hidden pt-28 pb-16 text-white sm:pt-36 sm:pb-20 lg:pt-40 lg:pb-24">
        <HeroOrbs />
        <div className="relative z-10 mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
          <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-14 xl:gap-20">
            {/* Left — copy */}
            <div className="text-center lg:text-left">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white/85 backdrop-blur sm:text-[11px]">
                <Ship className="h-3 w-3" />
                Tracking público
              </span>
              <h1 className="mt-5 font-serif text-[2.5rem] font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-[3.5rem] xl:text-6xl">
                Tu envío,
                <br />
                <span className="text-white/70">paso a paso.</span>
              </h1>
              <p className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-white/80 sm:text-base lg:mx-0 lg:text-lg">
                Cada hito queda registrado con timestamp y ubicación GPS.
                Vos y tu cliente acceden al mismo tracking — sin llamadas para
                pedir actualizaciones.
              </p>

              {/* Quick search hint cards */}
              <div className="mt-8 grid grid-cols-1 gap-2.5 sm:grid-cols-3 lg:max-w-lg">
                <SearchHint label="CAT" example="CAT52626825" />
                <SearchHint label="ORDEN" example="AZH-SO-000034" />
                <SearchHint label="FACTURA" example="AZH-INV-000020" />
              </div>
            </div>

            {/* Right — Infographic */}
            <div className="relative mx-auto w-full max-w-[560px] lg:max-w-none">
              <div className="glass-panel-strong relative overflow-hidden rounded-[28px] p-4 sm:p-6">
                <LogisticsInfographic />
              </div>
              <div
                aria-hidden
                className="pointer-events-none absolute -bottom-8 left-1/2 h-24 w-3/4 -translate-x-1/2 rounded-full bg-white/15 blur-3xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ───── SEARCH SECTION ───── */}
      <section className="relative bg-gradient-to-b from-slate-50 to-white py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-[1100px] px-5 sm:px-8 lg:px-12">
          <div className="mb-8 text-center sm:mb-10">
            <div className="inline-flex items-center gap-2 rounded-full bg-navy-900 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.22em] text-white">
              <Search className="h-3 w-3" />
              Búsqueda pública
            </div>
            <h2 className="mt-4 font-serif text-2xl font-bold text-navy-900 sm:text-3xl lg:text-4xl">
              ¿Cuál es tu código?
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-sm text-slate-600 sm:text-base">
              Lo encontrás en tu factura o cotización. Si no lo tenés a mano,
              pedinos referencia por WhatsApp.
            </p>
          </div>

          <TrackingClient />
        </div>
      </section>

      {/* ───── TRUST STRIP ───── */}
      <section className="bg-white py-14 sm:py-20">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
          <div className="grid gap-5 md:grid-cols-3 md:gap-6">
            {TRUST.map((t) => (
              <div
                key={t.title}
                className="rounded-3xl border border-navy-100 bg-gradient-to-br from-white to-navy-50/50 p-6 transition hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(13,27,61,0.1)] sm:p-7"
              >
                <div className="grid h-11 w-11 place-items-center rounded-2xl bg-navy-900 text-white sm:h-12 sm:w-12">
                  <t.icon className="h-5 w-5" strokeWidth={2.2} />
                </div>
                <h3 className="mt-4 font-serif text-lg font-bold text-navy-900 sm:text-xl">
                  {t.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {t.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function SearchHint({ label, example }: { label: string; example: string }) {
  return (
    <div className="rounded-2xl border border-white/15 bg-white/8 px-4 py-3 text-left backdrop-blur-xl">
      <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/55">
        {label}
      </div>
      <div className="mt-1 font-mono text-[12px] font-semibold text-white sm:text-[13px]">
        {example}
      </div>
    </div>
  );
}
