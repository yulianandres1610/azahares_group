import { HeroOrbs } from "@/components/HeroOrbs";
import { TrackingClient } from "@/components/TrackingClient";
import { ShipScene } from "@/components/ShipScene";
import { Ship } from "lucide-react";

export const metadata = {
  title: "Tracking · Azahares Import & Export",
  description:
    "Rastreá tu envío con número de orden, factura o booking CAT. Tracking GPS en tiempo real.",
};

export default function TrackingPage() {
  return (
    <>
      <section className="hero-bg hero-bg-noise relative isolate overflow-hidden pt-32 pb-12 text-white sm:pt-40 sm:pb-16">
        <HeroOrbs />
        <div className="relative z-10 mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-12">
          <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_1fr]">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-white/85 backdrop-blur">
                <Ship className="h-3 w-3" />
                Tracking público
              </span>
              <h1 className="mt-5 font-serif text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                Seguimiento de envíos
              </h1>
              <p className="mt-4 max-w-2xl text-base text-white/80 sm:text-lg">
                Ingresá el código de tu envío y te mostramos cada etapa — desde
                la cotización hasta la entrega al consignatario final.
              </p>
            </div>
            <div className="hidden lg:block">
              <ShipScene className="opacity-95" />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-12 sm:py-16">
        <div className="mx-auto max-w-[1100px] px-5 sm:px-8 lg:px-12">
          <TrackingClient />
        </div>
      </section>
    </>
  );
}
