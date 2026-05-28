import Link from "next/link";
import { Mail, MapPin, Phone, Ship } from "lucide-react";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-navy-900 text-white">
      <div className="absolute inset-0 hero-bg opacity-60" />
      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2">
              <Logo whiteOnDark className="h-9 w-auto" />
              <span className="font-serif text-lg font-bold tracking-tight">GROUP</span>
            </div>
            <p className="mt-4 max-w-xs text-sm text-white/70">
              Grupo corporativo dedicado a importación y exportación a Cuba.
              Combustibles, paquetería, alimentos — todo con precio CIF puesto
              en destino.
            </p>
            <div className="mt-6 flex items-center gap-2 text-xs text-white/55">
              <Ship className="h-4 w-4 text-amber-400" />
              <span>Puerto Everglades · Mariel · La Habana</span>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.18em] text-white/60">
              Servicios
            </h4>
            <ul className="mt-4 space-y-2 text-sm text-white/80">
              <li><Link href="/servicios#combustible" className="hover:text-amber-300">Combustible — iso tanques</Link></li>
              <li><Link href="/servicios#alimentos" className="hover:text-amber-300">Contenedores de alimentos</Link></li>
              <li><Link href="/servicios#courier" className="hover:text-amber-300">Courier · paquetería</Link></li>
              <li><Link href="/servicios#logistica" className="hover:text-amber-300">Logística marítima y aérea</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.18em] text-white/60">
              Empresa
            </h4>
            <ul className="mt-4 space-y-2 text-sm text-white/80">
              <li><Link href="/" className="hover:text-amber-300">Inicio</Link></li>
              <li><Link href="/tracking" className="hover:text-amber-300">Tracking</Link></li>
              <li><Link href="/contacto" className="hover:text-amber-300">Contacto</Link></li>
              <li>
                <a
                  href="https://www.azaharesfuel.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-amber-300"
                >
                  Portal operativo →
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.18em] text-white/60">
              Contacto
            </h4>
            <ul className="mt-4 space-y-3 text-sm text-white/80">
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
                <span>4221 SW 74 CT<br />Miami, FL 33155 · USA</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-amber-400" />
                <a href="tel:+13057140001" className="hover:text-amber-300">+1 (305) 714-0001</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-amber-400" />
                <a href="mailto:info@azaharesgroup.com" className="hover:text-amber-300">info@azaharesgroup.com</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-white/55">
          <span>© {new Date().getFullYear()} Azahares Group. Todos los derechos reservados.</span>
          <span>Diseño + plataforma operativa por el equipo Azahares.</span>
        </div>
      </div>
    </footer>
  );
}
