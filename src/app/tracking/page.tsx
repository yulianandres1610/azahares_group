import Image from "next/image";
import { HeroOrbs } from "@/components/HeroOrbs";
import { TrackingClient } from "@/components/TrackingClient";
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
                Tu envío, paso a paso
              </h1>
              <p className="mt-4 max-w-2xl text-base text-white/80 sm:text-lg">
                Cada cambio queda registrado con timestamp y ubicación GPS.
                Vos y tu cliente acceden al mismo tracking — sin llamadas para
                pedir actualizaciones.
              </p>
            </div>
            <div className="relative hidden lg:block">
              <div className="glass-panel-strong relative overflow-hidden rounded-[28px] p-3">
                <div className="relative aspect-[5/4] overflow-hidden rounded-2xl">
                  <Image
                    src="https://images.unsplash.com/photo-1577563908411-5077b6dc7624?auto=format&fit=crop&w=1600&q=88"
                    alt="Operación portuaria — contenedores"
                    fill
                    sizes="(max-width: 1024px) 100vw, 45vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-900/85 via-navy-900/10 to-transparent" />
                  <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-white backdrop-blur-xl">
                    <Ship className="h-3.5 w-3.5" />
                    GPS satelital
                  </div>
                </div>
              </div>
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
