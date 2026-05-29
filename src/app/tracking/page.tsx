import { Suspense } from "react";
import { TrackingPageShell } from "@/components/TrackingPageShell";

export const metadata = {
  title: "Tracking · Azahares Import & Export",
  description:
    "Rastreá tu envío con número de booking (CAT…) o el token de tracking. Posición GPS en tiempo real y timeline de cada hito de tu pedido.",
};

/**
 * El shell usa useSearchParams para leer ?code= en el primer mount.
 * Next 16 exige una Suspense boundary alrededor de cualquier client
 * component que use useSearchParams para que la página pueda seguir
 * prerendering estático — el fallback se muestra durante el hidrate
 * inicial mientras React lee los search params.
 */
export default function TrackingPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-white pt-[76px] sm:pt-[88px]" />
      }
    >
      <TrackingPageShell />
    </Suspense>
  );
}
