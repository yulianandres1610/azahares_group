import Image from "next/image";
import { TrackingClient } from "@/components/TrackingClient";
import { Activity, Ship, ShieldCheck } from "lucide-react";

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
      {/* ───── HERO LIGHT con imagen ───── */}
      <section className="relative isolate overflow-hidden bg-white pt-24 pb-12 sm:pt-32 sm:pb-16 lg:pt-32 lg:pb-20">
        {/* Imagen de fondo — composición logística light */}
        <div className="pointer-events-none absolute inset-0">
          <Image
            src="/images/tracking-hero.png"
            alt=""
            fill
            sizes="100vw"
            priority
            className="object-cover object-center"
          />
          {/* Overlay para fade hacia los bordes — la imagen ya es light,
              solo aclaramos un poco más para que el texto se lea bien sobre
              cualquier sección del compuesto. */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/55 to-white/85" />
          <div className="absolute inset-0 bg-gradient-to-r from-white/65 via-white/20 to-white/65" />
        </div>

        <div className="relative z-10 mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
          {/* Headline centrado */}
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-navy-200 bg-white/85 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-navy-700 shadow-[0_4px_18px_rgba(13,27,61,0.08)] backdrop-blur sm:text-[11px]">
              <Ship className="h-3 w-3" />
              Tracking público
            </span>
            <h1 className="mt-5 font-serif text-[2.5rem] font-bold leading-[1.05] tracking-tight text-navy-900 sm:text-5xl lg:text-[3.5rem]">
              Tu envío,
              <br />
              <span className="text-navy-500">paso a paso.</span>
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-navy-800/75 sm:text-base lg:text-lg">
              Ingresá tu código y te mostramos cada hito del envío — desde la
              cotización hasta la entrega al consignatario final.
            </p>
          </div>

          {/* Glass card central con el form */}
          <div className="relative mx-auto mt-10 max-w-3xl sm:mt-12">
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-4 -z-10 rounded-[40px] bg-gradient-to-br from-navy-100/30 to-navy-200/20 blur-2xl"
            />
            <div className="rounded-[28px] border border-navy-100 bg-white/90 p-5 shadow-[0_24px_60px_rgba(13,27,61,0.14)] backdrop-blur-xl sm:p-7">
              <TrackingClient />
            </div>
          </div>
        </div>
      </section>

      {/* ───── TRUST STRIP ───── */}
      <section className="bg-gradient-to-b from-white to-slate-50 py-14 sm:py-20">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
          <div className="grid gap-5 md:grid-cols-3 md:gap-6">
            {TRUST.map((t) => (
              <div
                key={t.title}
                className="rounded-3xl border border-navy-100 bg-white p-6 transition hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(13,27,61,0.1)] sm:p-7"
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
