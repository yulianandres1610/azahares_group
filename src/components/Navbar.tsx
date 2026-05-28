"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, LogIn, Ship, Search, Package, Mail } from "lucide-react";
import { env } from "@/lib/env";
import { Logo } from "./Logo";

/**
 * Páginas cuyo hero es LIGHT (fondo blanco / claro). El navbar arranca
 * en estilo sólido (logo navy + texto navy) en estas rutas desde el
 * primer render, sin esperar al scroll — sino el logo blanco quedaba
 * invisible sobre el fondo blanco.
 */
const LIGHT_HERO_ROUTES = new Set<string>(["/tracking"]);

const NAV_LINKS: Array<{
  href: string;
  label: string;
  icon: typeof Ship;
  desc: string;
}> = [
  { href: "/", label: "Inicio", icon: Ship, desc: "Volver a la página principal" },
  { href: "/servicios", label: "Servicios", icon: Package, desc: "Logística end-to-end" },
  { href: "/tracking", label: "Tracking", icon: Search, desc: "Rastrear envíos" },
  { href: "/contacto", label: "Contacto", icon: Mail, desc: "Hablar con un ejecutivo" },
];

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const isSolid = scrolled || LIGHT_HERO_ROUTES.has(pathname ?? "");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Body lock + escape key handler — solo activos mientras drawer abierto.
  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  // Cerrar drawer automáticamente al navegar a otra ruta.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={
          "fixed inset-x-0 top-0 z-40 transition-all duration-300 " +
          (isSolid
            ? "bg-white/90 backdrop-blur-2xl shadow-[0_6px_28px_rgba(13,27,61,0.08)]"
            : "bg-transparent")
        }
      >
        <div className="mx-auto flex w-full max-w-[1400px] items-center justify-between gap-4 px-5 py-3 sm:px-8 lg:px-12 lg:py-4">
          <Link href="/" className="group flex shrink-0 items-center">
            <Logo
              whiteOnDark={!isSolid}
              height={56}
              className="h-12 w-auto transition-transform group-hover:scale-105 sm:h-14 lg:h-16"
            />
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={
                  "rounded-full px-5 py-2.5 text-sm font-semibold transition-colors " +
                  (isSolid
                    ? "text-navy-800 hover:bg-navy-50"
                    : "text-white/90 hover:bg-white/10")
                }
              >
                {l.label}
              </Link>
            ))}
            <a
              href={env.loginUrl}
              className={
                "ml-3 inline-flex items-center gap-2 rounded-full border-2 px-5 py-2.5 text-sm font-bold transition-all duration-200 hover:-translate-y-0.5 " +
                (isSolid
                  ? "border-navy-900 bg-navy-900 text-white shadow-[0_8px_24px_rgba(13,27,61,0.28)] hover:border-navy-900 hover:bg-white hover:text-navy-900 hover:shadow-[0_10px_28px_rgba(13,27,61,0.18)]"
                  : "border-white bg-white text-navy-900 shadow-[0_8px_24px_rgba(13,27,61,0.28)] hover:bg-transparent hover:text-white")
              }
            >
              <LogIn className="h-4 w-4" />
              Acceder
            </a>
          </nav>

          {/* Mobile hamburger — solo muestra cuando el drawer está cerrado.
              Al abrir, la X principal queda en el drawer (más grande, más
              clickeable). Así evitamos competencia visual entre dos X. */}
          {!open && (
            <button
              type="button"
              onClick={() => setOpen(true)}
              className={
                "grid h-11 w-11 place-items-center rounded-2xl transition lg:hidden " +
                (isSolid
                  ? "bg-navy-900 text-white shadow-[0_6px_18px_rgba(13,27,61,0.22)]"
                  : "bg-white/15 text-white backdrop-blur-xl border border-white/25")
              }
              aria-label="Abrir menú"
            >
              <Menu className="h-5 w-5" />
            </button>
          )}
        </div>
      </header>

      {/* ───── MOBILE DRAWER ─────
          Sibling del header (no child) — así tiene su propio stacking
          context con z-50, queda por encima de TODO incluyendo header. */}
      <AnimatePresence>
        {open && (
          <div className="lg:hidden">
            {/* Backdrop — z-50 igual que drawer pero anterior en DOM */}
            <motion.button
              type="button"
              aria-label="Cerrar menú"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-50 cursor-pointer bg-navy-900/55 backdrop-blur-md"
            />

            {/* Drawer */}
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 280, damping: 32 }}
              className="fixed inset-y-0 right-0 z-50 flex w-[min(92vw,420px)] flex-col overflow-hidden bg-navy-900 text-white shadow-[0_0_60px_rgba(13,27,61,0.55)]"
              role="dialog"
              aria-modal="true"
              aria-label="Menú principal"
            >
              <div className="hero-bg pointer-events-none absolute inset-0 opacity-80" />

              <div className="relative z-10 flex h-full flex-col">
                {/* Header del drawer */}
                <div className="flex items-center justify-between border-b border-white/10 px-5 py-4 sm:px-6 sm:py-5">
                  <Logo whiteOnDark height={48} className="h-11 w-auto sm:h-12" />
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    aria-label="Cerrar menú"
                    className="grid h-11 w-11 place-items-center rounded-2xl border border-white/20 bg-white/10 text-white backdrop-blur transition hover:bg-white/20"
                  >
                    <X className="h-5 w-5" strokeWidth={2.5} />
                  </button>
                </div>

                {/* Links */}
                <div className="flex-1 space-y-2 overflow-y-auto px-4 py-5 sm:py-6">
                  {NAV_LINKS.map((l, i) => {
                    const isActive =
                      pathname === l.href ||
                      (l.href !== "/" && pathname?.startsWith(l.href));
                    return (
                      <motion.div
                        key={l.href}
                        initial={{ x: 40, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{
                          delay: 0.06 + i * 0.06,
                          duration: 0.35,
                          ease: [0.21, 0.47, 0.32, 0.98],
                        }}
                      >
                        <Link
                          href={l.href}
                          onClick={() => setOpen(false)}
                          className={
                            "group flex items-center gap-4 rounded-2xl border px-4 py-4 backdrop-blur transition " +
                            (isActive
                              ? "border-white/40 bg-white/20"
                              : "border-white/10 bg-white/5 hover:bg-white/15")
                          }
                        >
                          <div
                            className={
                              "grid h-11 w-11 shrink-0 place-items-center rounded-xl text-white transition " +
                              (isActive ? "bg-white/25" : "bg-white/15")
                            }
                          >
                            <l.icon className="h-5 w-5" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="text-base font-bold">{l.label}</div>
                            <div className="mt-0.5 truncate text-[12px] text-white/65">
                              {l.desc}
                            </div>
                          </div>
                          <span className="text-white/40 transition group-hover:translate-x-1 group-hover:text-white">
                            →
                          </span>
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Footer del drawer */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.35, duration: 0.4 }}
                  className="border-t border-white/10 px-5 pb-7 pt-5"
                >
                  <a
                    href={env.loginUrl}
                    className="flex w-full items-center justify-center gap-2 rounded-full border-2 border-white bg-white px-5 py-3.5 text-sm font-bold text-navy-900 shadow-[0_10px_30px_rgba(13,27,61,0.5)] transition hover:-translate-y-0.5 hover:bg-transparent hover:text-white"
                  >
                    <LogIn className="h-4 w-4" />
                    Acceder al portal
                  </a>
                  <p className="mt-4 text-center text-[11px] text-white/55">
                    © {new Date().getFullYear()} Azahares Import &amp; Export
                  </p>
                </motion.div>
              </div>
            </motion.aside>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
