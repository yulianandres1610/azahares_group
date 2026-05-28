import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Azahares Group · Importación y exportación a Cuba",
  description:
    "Grupo corporativo Azahares — combustibles en iso tanques, contenedores de alimentos, courier de paquetería. Todos los precios CIF puestos en destino.",
  icons: { icon: "/logos/favicon.png" },
  openGraph: {
    title: "Azahares Group",
    description:
      "Logística marítima y aérea entre USA y Cuba — combustible, alimentos, paquetería.",
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
