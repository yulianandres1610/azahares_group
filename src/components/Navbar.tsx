"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, LogIn, Ship, Search, Package, Mail } from "lucide-react";
import { env } from "@/lib/env";
import { Logo } from "./Logo";

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
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={
        "fixed inset-x-0 top-0 z-50 transition-all duration-300 " +
        (scrolled
          ? "bg-white/90 backdrop-blur-2xl shadow-[0_6px_28px_rgba(13,27,61,0.08)]"
          : "bg-transparent")
      }
    >
      <div className="mx-auto flex w-full max-w-[1500px] items-center justify-between gap-4 px-5 py-3 sm:px-8 lg:px-12 lg:py-4">
        <Link href="/" className="group flex shrink-0 items-center">
          <Logo
            whiteOnDark={!scrolled}
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
                (scrolled
                  ? "text-navy-800 hover:bg-navy-50"
                  : "text-white/90 hover:bg-white/10")
              }
            >
              {l.label}
            </Link>
          ))}
          <a
            href={env.loginUrl}
            className="ml-3 btn-glass-primary text-sm"
            style={{ padding: "0.6rem 1.4rem" }}
          >
            <LogIn className="h-4 w-4" />
            Acceder
          </a>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className={
            "grid h-11 w-11 place-items-center rounded-2xl transition lg:hidden " +
            (scrolled
              ? "bg-navy-900 text-white shadow-[0_6px_18px_rgba(13,27,61,0.22)]"
              : "bg-white/15 text-white backdrop-blur-xl border border-white/25")
          }
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
        >
          <AnimatePresence mode="wait" initial={false}>
            {open ? (
              <motion.span
                key="x"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.18 }}
              >
                <X className="h-5 w-5" />
              </motion.span>
            ) : (
              <motion.span
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.18 }}
              >
                <Menu className="h-5 w-5" />
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>

      {/* ───── MOBILE DRAWER ───── */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-40 bg-navy-900/55 backdrop-blur-md lg:hidden"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 280, damping: 32 }}
              className="fixed inset-y-0 right-0 z-50 flex w-[min(92vw,420px)] flex-col bg-navy-900 text-white shadow-[0_0_60px_rgba(13,27,61,0.55)] lg:hidden"
            >
              <div className="hero-bg absolute inset-0 opacity-80" />
              <div className="relative z-10 flex h-full flex-col">
                <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
                  <Logo whiteOnDark height={48} className="h-12 w-auto" />
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    aria-label="Cerrar"
                    className="grid h-10 w-10 place-items-center rounded-2xl bg-white/10 text-white backdrop-blur"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="flex-1 space-y-2 overflow-y-auto px-4 py-6">
                  {NAV_LINKS.map((l, i) => (
                    <motion.div
                      key={l.href}
                      initial={{ x: 40, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{
                        delay: 0.05 + i * 0.06,
                        duration: 0.35,
                        ease: [0.21, 0.47, 0.32, 0.98],
                      }}
                    >
                      <Link
                        href={l.href}
                        onClick={() => setOpen(false)}
                        className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 px-4 py-4 backdrop-blur transition hover:bg-white/15"
                      >
                        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white/15 text-white">
                          <l.icon className="h-5 w-5" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="text-base font-bold">{l.label}</div>
                          <div className="mt-0.5 truncate text-[12px] text-white/65">
                            {l.desc}
                          </div>
                        </div>
                        <span className="text-white/40 transition group-hover:text-white">
                          →
                        </span>
                      </Link>
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.35, duration: 0.4 }}
                  className="px-5 pb-7 pt-3"
                >
                  <a
                    href={env.loginUrl}
                    className="flex w-full items-center justify-center gap-2 rounded-full bg-white px-5 py-3.5 text-sm font-bold text-navy-900 shadow-[0_10px_30px_rgba(13,27,61,0.5)] transition hover:-translate-y-0.5"
                  >
                    <LogIn className="h-4 w-4" />
                    Acceder al portal
                  </a>
                  <p className="mt-4 text-center text-[11px] text-white/55">
                    © {new Date().getFullYear()} Azahares Import &amp; Export
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
