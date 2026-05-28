import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "./Logo";

const SERVICES = [
  { href: "/servicios#combustible", label: "Combustible · iso tanques" },
  { href: "/servicios#alimentos", label: "Contenedores de alimentos" },
  { href: "/servicios#courier", label: "Courier · paquetería" },
  { href: "/servicios#logistica", label: "Logística internacional" },
];

const COMPANY = [
  { href: "/", label: "Inicio" },
  { href: "/tracking", label: "Tracking" },
  { href: "/contacto", label: "Contacto" },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-navy-900 text-white">
      <div className="absolute inset-0 hero-bg opacity-55" />
      <div className="relative mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        {/* ───── Top — logo + tagline únicos, centrados ───── */}
        <div className="flex flex-col items-center border-b border-white/10 py-12 text-center sm:py-14">
          <Logo whiteOnDark height={56} className="h-12 w-auto sm:h-14" />
          <p className="mt-4 max-w-md text-xs leading-relaxed text-white/65 sm:text-sm">
            Logística internacional · combustibles, alimentos y paquetería
            con precios CIF puestos en destino.
          </p>
        </div>

        {/* ───── Mid — grid de columnas (desktop) / acordeón visual (mobile) ───── */}
        <div className="hidden gap-12 py-12 sm:grid sm:grid-cols-3">
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-[0.22em] text-white/55">
              Servicios
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm text-white/80">
              {SERVICES.map((s) => (
                <li key={s.href}>
                  <Link href={s.href} className="transition hover:text-white">
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-[0.22em] text-white/55">
              Empresa
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm text-white/80">
              {COMPANY.map((c) => (
                <li key={c.href}>
                  <Link href={c.href} className="transition hover:text-white">
                    {c.label}
                  </Link>
                </li>
              ))}
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
            <h4 className="text-[11px] font-bold uppercase tracking-[0.22em] text-white/55">
              Contacto
            </h4>
            <ul className="mt-4 space-y-3 text-sm text-white/80">
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-white/55" />
                <span className="leading-relaxed">
                  4221 SW 74 CT
                  <br />
                  Miami, FL 33155 · USA
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 text-white/55" />
                <a
                  href="tel:+13057140001"
                  className="transition hover:text-white"
                >
                  +1 (305) 714-0001
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-white/55" />
                <a
                  href="mailto:info@azaharesgroup.com"
                  className="transition hover:text-white"
                >
                  info@azaharesgroup.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* ───── Mobile mid — contacto compacto inline ───── */}
        <div className="block py-8 sm:hidden">
          <div className="flex flex-col items-center gap-3 text-sm">
            <a
              href="tel:+13057140001"
              className="flex items-center gap-2 text-white/85"
            >
              <Phone className="h-4 w-4" /> +1 (305) 714-0001
            </a>
            <a
              href="mailto:info@azaharesgroup.com"
              className="flex items-center gap-2 text-white/85"
            >
              <Mail className="h-4 w-4" /> info@azaharesgroup.com
            </a>
          </div>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[12px]">
            <Link href="/servicios" className="text-white/75 hover:text-white">
              Servicios
            </Link>
            <span className="text-white/25">·</span>
            <Link href="/tracking" className="text-white/75 hover:text-white">
              Tracking
            </Link>
            <span className="text-white/25">·</span>
            <Link href="/contacto" className="text-white/75 hover:text-white">
              Contacto
            </Link>
          </div>
        </div>

        {/* ───── Bottom — copyright único centrado ───── */}
        <div className="border-t border-white/10 py-5 text-center">
          <p className="text-[11px] text-white/45">
            © {new Date().getFullYear()} Azahares Import &amp; Export · Todos los derechos reservados
          </p>
        </div>
      </div>
    </footer>
  );
}
