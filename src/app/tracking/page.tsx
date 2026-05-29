import { TrackingPageShell } from "@/components/TrackingPageShell";

export const metadata = {
  title: "Tracking · Azahares Import & Export",
  description:
    "Rastreá tu envío con número de booking (CAT…) o el token de tracking. Posición GPS en tiempo real y timeline de cada hito de tu pedido.",
};

export default function TrackingPage() {
  return <TrackingPageShell />;
}
