import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

/**
 * Dominio canónico actual del sitio corporativo. Mientras no esté
 * registrado azaharesgroup.com en el DNS, usamos el subdominio Vercel
 * como base — así los OG / Twitter cards / canonical apuntan a una URL
 * accesible (sin esto Next cae a http://localhost:3000 y los crawlers
 * reciben links rotos).
 */
const SITE_URL = "https://azahares-group.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Azahares Import & Export · Logística internacional",
  description:
    "Grupo corporativo dedicado a logística internacional — combustibles en iso tanques, contenedores de alimentos y courier de paquetería. Todos los precios CIF puestos en destino.",
  icons: { icon: "/logos/favicon.png" },
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: "Azahares Import & Export",
    description:
      "Logística marítima y aérea internacional — combustible, alimentos, paquetería con precio CIF.",
    url: SITE_URL,
    siteName: "Azahares Import & Export",
    images: ["/logos/logo-square.png"],
    locale: "es_AR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Azahares Import & Export",
    description:
      "Logística marítima y aérea internacional con precio CIF cerrado.",
    images: ["/logos/logo-square.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
