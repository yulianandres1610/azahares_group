import { HeroOrbs } from "@/components/HeroOrbs";
import { TrackingClient } from "@/components/TrackingClient";
import { Ship } from "lucide-react";

export const metadata = {
  title: "Tracking · Azahares Group",
  description:
    "Rastreá tu envío con número de orden, factura o booking CAT. Tracking GPS en tiempo real.",
};

export default function TrackingPage() {
  return (
    <>
      <section className="hero-bg hero-bg-noise relative isolate overflow-hidden pt-28 pb-16 text-white sm:pt-36 sm:pb-24">
        <HeroOrbs />
        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-amber-300 backdrop-blur">
            <Ship className="h-3 w-3" />
            Tracking público
          </span>
          <h1 className="mt-5 font-serif text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
            Seguimiento de envíos
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-white/80">
            Ingresá el código de tu envío y te mostramos cada etapa — desde la
            cotización hasta la entrega al consignatario final.
          </p>
        </div>
      </section>

      <section className="bg-slate-50 py-12 sm:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <TrackingClient />
        </div>
      </section>
    </>
  );
}
