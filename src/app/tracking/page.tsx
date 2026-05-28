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
          card centrada en el VIEWPORT VISIBLE debajo del navbar.

          Truco: el navbar es 'fixed top:0' (no quita espacio del flow),
          entonces si usamos min-h con calc(vh - navbar), el flex items-
          center centra dentro de la sección pero esa sección empieza en
          y:0 (DETRÁS del navbar), por lo que el centro visual queda
          desplazado hacia arriba.

          Fix: usamos min-h-screen + pt = altura navbar. La sección llena
          el viewport entero, el padding-top empuja al contenido fuera de
          la zona oculta por el navbar, y items-center lo centra en la
          parte VISIBLE. */}
      <section className="relative isolate flex min-h-screen items-center overflow-hidden bg-white pt-[76px] pb-16 sm:pt-[88px] sm:pb-20 lg:pb-24">
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
