import Link from "next/link";
import { Mail, MapPin, Phone, Ship } from "lucide-react";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-navy-900 text-white">
      <div className="absolute inset-0 hero-bg opacity-60" />
      <div className="relative mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-12">
        {/* ───── Desktop / tablet (sm+) ───── */}
        <div className="hidden gap-12 py-14 sm:grid sm:grid-cols-[1.6fr_1fr_1fr_1fr] sm:py-16">
          <div>
            <Logo whiteOnDark height={56} className="h-14 w-auto" />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/70">
              Grupo corporativo especializado en logística internacional —
              combustibles, alimentos y paquetería con operación end-to-end y
              precios CIF puestos en destino.
            </p>
            <div className="mt-6 flex items-center gap-2 text-xs text-white/55">
              <Ship className="h-4 w-4 text-white/85" />
              <span>Logística marítima y aérea · cobertura global</span>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.18em] text-white/60">
              Servicios
            </h4>
            <ul className="mt-4 space-y-2 text-sm text-white/80">
              <li><Link href="/servicios#combustible" className="transition hover:text-white">Combustible — iso tanques</Link></li>
              <li><Link href="/servicios#alimentos" className="transition hover:text-white">Contenedores de alimentos</Link></li>
              <li><Link href="/servicios#courier" className="transition hover:text-white">Courier · paquetería</Link></li>
              <li><Link href="/servicios#logistica" className="transition hover:text-white">Logística internacional</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.18em] text-white/60">
              Empresa
            </h4>
            <ul className="mt-4 space-y-2 text-sm text-white/80">
              <li><Link href="/" className="transition hover:text-white">Inicio</Link></li>
              <li><Link href="/tracking" className="transition hover:text-white">Tracking</Link></li>
              <li><Link href="/contacto" className="transition hover:text-white">Contacto</Link></li>
              <li>
                <a
                  href="https://www.azaharesfuel.com"
                  target="_blank"
                  rel="noreferrer"
                  className="transition hover:text-white"
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
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-white/70" />
                <span>4221 SW 74 CT<br />Miami, FL 33155 · USA</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-white/70" />
                <a href="tel:+13057140001" className="transition hover:text-white">+1 (305) 714-0001</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-white/70" />
                <a href="mailto:info@azaharesgroup.com" className="transition hover:text-white">info@azaharesgroup.com</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="hidden border-t border-white/10 py-5 sm:block">
          <div className="text-xs text-white/55">
            © {new Date().getFullYear()} Azahares Import &amp; Export. Todos los derechos reservados.
          </div>
        </div>

        {/* ───── Mobile (<sm) — versión compacta ───── */}
        <div className="block py-10 sm:hidden">
          <div className="flex flex-col items-center text-center">
            <Logo whiteOnDark height={56} className="h-14 w-auto" />
            <p className="mt-4 text-xs text-white/65">
              Logística internacional · CIF · tracking 24/7
            </p>
            <div className="mt-5 flex flex-col items-center gap-2 text-sm">
              <a href="tel:+13057140001" className="flex items-center gap-2 text-white/85">
                <Phone className="h-4 w-4" /> +1 (305) 714-0001
              </a>
              <a href="mailto:info@azaharesgroup.com" className="flex items-center gap-2 text-white/85">
                <Mail className="h-4 w-4" /> info@azaharesgroup.com
              </a>
            </div>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-[12px]">
              <Link href="/servicios" className="text-white/80">Servicios</Link>
              <span className="text-white/30">·</span>
              <Link href="/tracking" className="text-white/80">Tracking</Link>
              <span className="text-white/30">·</span>
              <Link href="/contacto" className="text-white/80">Contacto</Link>
            </div>
            <div className="mt-6 border-t border-white/10 pt-4 text-[11px] text-white/45">
              © {new Date().getFullYear()} Azahares Import &amp; Export
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
