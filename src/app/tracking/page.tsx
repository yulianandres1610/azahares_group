import Image from "next/image";
import { TrackingClient } from "@/components/TrackingClient";

export const metadata = {
  title: "Tracking · Azahares Import & Export",
  description:
    "Rastreá tu envío con número de orden, factura o booking CAT. Tracking GPS en tiempo real.",
};

export default function TrackingPage() {
  return (
    <>
      {/* ───── HERO LIGHT con imagen — sección minimalista:
          card del search centrada verticalmente en el viewport
          (calc(100vh - navbar). Cuando aparecen resultados, el contenedor
          crece naturalmente y el scroll automático del TrackingClient
          lleva al user al header del resultado. */}
      <section className="relative isolate flex min-h-[calc(100vh-76px)] items-center overflow-hidden bg-white py-16 sm:py-20 lg:min-h-[calc(100vh-88px)] lg:py-24">
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
          <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/55 to-white/85" />
          <div className="absolute inset-0 bg-gradient-to-r from-white/65 via-white/20 to-white/65" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[1400px] px-5 sm:px-8 lg:px-12">
          {/* Glass card central con el form — sin texto previo, máxima
              limpieza visual: el imagery del hero + la card hablan solas. */}
          <div className="relative mx-auto max-w-3xl">
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

    </>
  );
}
