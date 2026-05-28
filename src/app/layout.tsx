import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Azahares Import & Export · Logística internacional",
  description:
    "Grupo corporativo dedicado a logística internacional — combustibles en iso tanques, contenedores de alimentos y courier de paquetería. Todos los precios CIF puestos en destino.",
  icons: { icon: "/logos/favicon.png" },
  openGraph: {
    title: "Azahares Import & Export",
    description:
      "Logística marítima y aérea internacional — combustible, alimentos, paquetería con precio CIF.",
    images: ["/logos/logo-square.png"],
    type: "website",
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
