import Image from "next/image";
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
      {/* ───── HERO LIGHT con imagen — única sección de la página
          (minimalist by design). Aumento pb para que la transición al
          footer sea generosa y la imagen de fondo se aprecie completa. */}
      <section className="relative isolate overflow-hidden bg-white pt-24 pb-20 sm:pt-32 sm:pb-28 lg:pt-32 lg:pb-32">
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
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-navy-200 bg-white/85 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-navy-700 shadow-[0_4px_18px_rgba(13,27,61,0.08)] backdrop-blur sm:text-[11px]">
              <Ship className="h-3 w-3" />
              Seguimiento de envíos
            </span>
            <h1 className="mt-5 font-serif text-[2.25rem] font-bold leading-[1.08] tracking-tight text-navy-900 sm:text-[2.75rem] lg:text-[3.25rem]">
              Tracking de tu carga, en tiempo real
            </h1>
            <p className="mx-auto mt-4 max-w-lg text-[15px] leading-relaxed text-navy-800/70 sm:text-base">
              Consultá el estado de tu envío con el número de orden, factura
              o booking CAT. Datos GPS actualizados cada hora.
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

    </>
  );
}
