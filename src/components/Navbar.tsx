"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X, LogIn } from "lucide-react";
import { env } from "@/lib/env";
import { Logo } from "./Logo";

const NAV_LINKS = [
  { href: "/", label: "Inicio" },
  { href: "/servicios", label: "Servicios" },
  { href: "/tracking", label: "Tracking" },
  { href: "/contacto", label: "Contacto" },
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

  return (
    <header
      className={
        "fixed inset-x-0 top-0 z-50 transition-all duration-300 " +
        (scrolled
          ? "bg-white/85 backdrop-blur-xl shadow-[0_6px_24px_rgba(13,27,61,0.08)]"
          : "bg-transparent")
      }
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <Logo whiteOnDark={!scrolled} className="h-8 w-auto sm:h-9" />
          <span
            className={
              "hidden font-serif text-base font-bold tracking-tight sm:inline transition-colors " +
              (scrolled ? "text-navy-900" : "text-white")
            }
          >
            GROUP
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={
                "rounded-full px-4 py-2 text-sm font-semibold transition-colors " +
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
            className="ml-2 btn-glass-primary text-sm"
            style={{ padding: "0.55rem 1.1rem" }}
          >
            <LogIn className="h-4 w-4" />
            Acceder
          </a>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className={
            "grid h-10 w-10 place-items-center rounded-full md:hidden " +
            (scrolled
              ? "bg-navy-50 text-navy-900"
              : "bg-white/10 text-white backdrop-blur")
          }
          aria-label="Abrir menú"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="border-t border-navy-100 bg-white/95 backdrop-blur-xl md:hidden">
          <div className="mx-auto max-w-7xl space-y-1 px-4 py-4">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="block rounded-xl px-4 py-3 text-sm font-semibold text-navy-800 hover:bg-navy-50"
              >
                {l.label}
              </Link>
            ))}
            <a
              href={env.loginUrl}
              className="mt-2 flex items-center justify-center gap-2 rounded-full bg-navy-900 px-4 py-3 text-sm font-bold text-white"
            >
              <LogIn className="h-4 w-4" />
              Acceder
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
