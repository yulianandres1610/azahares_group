"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertCircle,
  HelpCircle,
  Link2,
  Mail,
  PackageSearch,
  Search,
  Ship,
} from "lucide-react";
import {
  fetchPublicTracking,
  TrackingNotFoundError,
  type PublicTrackingResponse,
} from "@/lib/tracking";
import { PublicTrackingView } from "./PublicTrackingView";
import { ShipLoader } from "./ShipLoader";

/**
 * Shell de la página /tracking — cambia entre dos modos:
 *  - LANDING: hero light con imagen + glass card centrada con el form.
 *  - RESULTS: oculta el hero y renderiza PublicTrackingView a ancho
 *    completo (header navy + timeline + map + containers, idéntico al
 *    operativo azaharesfuel.com).
 *
 * Necesita ser client para el state — page.tsx sigue siendo server por
 * el metadata export.
 */
export function TrackingPageShell() {
  const [query, setQuery] = useState("");
  const [data, setData] = useState<PublicTrackingResponse | null>(null);
  const [identifier, setIdentifier] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setData(null);
    if (!query.trim()) return;
    setLoading(true);

    // Mínimo visible del loader. El fetch suele completar en <500 ms y
    // el ShipLoader animado queda subliminal — forzamos un piso de
    // 3.4 s para que el usuario perciba bien la animación del barco
    // ("buscando → te muestro el resultado"). Si el fetch tarda más,
    // se respeta el tiempo real (no agregamos delay extra encima).
    const MIN_LOADER_MS = 3400;
    const startedAt = Date.now();

    try {
      const r = await fetchPublicTracking(query);
      const elapsed = Date.now() - startedAt;
      if (elapsed < MIN_LOADER_MS) {
        await new Promise((res) => setTimeout(res, MIN_LOADER_MS - elapsed));
      }
      setData(r);
      setIdentifier(query.trim().toUpperCase());
    } catch (err) {
      const elapsed = Date.now() - startedAt;
      if (elapsed < MIN_LOADER_MS) {
        await new Promise((res) => setTimeout(res, MIN_LOADER_MS - elapsed));
      }
      if (err instanceof TrackingNotFoundError) {
        setError(
          `No encontramos ningún envío con el código "${err.query}". Verificá que sea un número de booking (CAT…) o el token de tracking del email.`,
        );
      } else {
        setError(
          err instanceof Error
            ? err.message
            : "Error inesperado consultando el tracking.",
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const onReset = () => {
    setData(null);
    setQuery("");
    setError(null);
  };

  // ───── MODO RESULTS — full-width, mismo diseño que el operativo ─────
  // El botón "Nueva búsqueda" vive ahora dentro del header navy del
  // PublicTrackingView, al lado de "Actualizar". Acá solo damos el
  // padding del navbar fijo para que el header no quede tapado.
  if (data) {
    return (
      <div className="min-h-screen bg-slate-50 pt-[60px] sm:pt-[72px]">
        <PublicTrackingView
          initialData={data}
          identifier={identifier}
          onReset={onReset}
        />
      </div>
    );
  }

  // ───── MODO LANDING — hero light con imagen + glass card ─────
  return (
    <section className="relative isolate flex min-h-screen items-center overflow-hidden bg-white pt-[76px] pb-16 sm:pt-[88px] sm:pb-20 lg:pb-24">
      <div className="pointer-events-none absolute inset-0">
        <Image
          src="/images/tracking-hero.png"
          alt=""
          fill
          sizes="100vw"
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-white/40 to-white/75" />
        <div className="absolute inset-0 bg-gradient-to-r from-white/50 via-transparent to-white/50" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <div className="relative mx-auto max-w-3xl">
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-4 -z-10 rounded-[40px] bg-gradient-to-br from-navy-100/30 to-navy-200/20 blur-2xl"
          />
          <div className="rounded-[28px] border border-navy-100 bg-white/90 p-5 shadow-[0_24px_60px_rgba(13,27,61,0.14)] backdrop-blur-xl sm:p-7">
            <form onSubmit={onSubmit} className="space-y-4">
              <label className="block text-[11px] font-bold uppercase tracking-[0.22em] text-navy-700">
                Código de seguimiento
              </label>
              <div className="flex flex-col gap-3 sm:flex-row">
                <div className="relative flex-1">
                  <PackageSearch className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-navy-400" />
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value.toUpperCase())}
                    placeholder="CAT52626825"
                    spellCheck={false}
                    autoComplete="off"
                    autoCapitalize="characters"
                    disabled={loading}
                    className="h-14 w-full rounded-2xl border-2 border-navy-200 bg-white pl-12 pr-4 font-mono text-base font-semibold tabular-nums text-navy-900 outline-none transition focus:border-navy-500 focus:shadow-[0_0_0_4px_rgba(29,58,138,0.12)] disabled:opacity-60 sm:text-[17px]"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading || !query.trim()}
                  className="inline-flex h-14 items-center justify-center gap-2 rounded-2xl bg-navy-900 px-7 text-sm font-bold text-white shadow-[0_8px_24px_rgba(13,27,61,0.28)] transition hover:-translate-y-0.5 hover:bg-navy-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <Search className="h-4 w-4" />
                  Rastrear
                </button>
              </div>

            </form>

            {/* ───── ¿Dónde encuentro mi código? ─────
                Explicación de los dos formatos válidos que acepta el
                backend (CAT de Crowley o token del email Azahares). */}
            <div className="mt-5 rounded-2xl border border-navy-100 bg-navy-50/40 p-4 sm:p-5">
              <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-navy-700">
                <HelpCircle className="h-3.5 w-3.5" />
                ¿Dónde encuentro mi código?
              </div>
              <ul className="mt-3 space-y-3 text-[13px] leading-relaxed text-navy-900">
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-xl bg-navy-900 text-white shadow-[0_4px_12px_rgba(13,27,61,0.25)]">
                    <Ship className="h-3.5 w-3.5" strokeWidth={2.2} />
                  </span>
                  <span className="min-w-0">
                    <strong className="font-bold text-navy-900">
                      Número de booking (CAT)
                    </strong>
                    <span className="block text-[12.5px] text-slate-600">
                      Emitido por Crowley cuando confirman el booking
                      marítimo. Empieza con{" "}
                      <code className="rounded bg-white px-1 py-0.5 font-mono text-[11px] font-semibold text-navy-700 ring-1 ring-navy-200">
                        CAT
                      </code>{" "}
                      seguido de dígitos. Lo encontrás en el email de
                      confirmación que te enviamos al asignar el iso-tanque.
                    </span>
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-xl bg-navy-900 text-white shadow-[0_4px_12px_rgba(13,27,61,0.25)]">
                    <Link2 className="h-3.5 w-3.5" strokeWidth={2.2} />
                  </span>
                  <span className="min-w-0">
                    <strong className="font-bold text-navy-900">
                      Link directo desde un email Azahares
                    </strong>
                    <span className="block text-[12.5px] text-slate-600">
                      Todos los emails de tu pedido (cotización, factura,
                      despacho) incluyen un botón{" "}
                      <span className="font-semibold text-navy-700">
                        Ver tracking
                      </span>{" "}
                      que abre la página con el token ya cargado — no
                      necesitás escribir nada.
                    </span>
                  </span>
                </li>
              </ul>
              <p className="mt-4 flex items-center gap-2 border-t border-navy-100 pt-3 text-[11.5px] leading-relaxed text-slate-500">
                <Mail className="h-3.5 w-3.5 shrink-0 text-navy-500" />
                ¿No encontrás el código? Escribinos a{" "}
                <a
                  href="mailto:info@azaharesgroup.com"
                  className="font-semibold text-navy-700 underline-offset-2 hover:underline"
                >
                  info@azaharesgroup.com
                </a>{" "}
                y te lo enviamos.
              </p>
            </div>

            <AnimatePresence mode="wait">
              {loading && (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-8 flex flex-col items-center justify-center py-6"
                >
                  <ShipLoader
                    size="lg"
                    tone="navy"
                    label="Buscando tu envío…"
                  />
                  <p className="mt-3 max-w-sm text-center text-xs text-slate-500">
                    Consultando la base de operaciones — esto toma unos
                    segundos.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {error && !loading && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-5 flex items-start gap-3 rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-900"
                >
                  <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-rose-600" />
                  <span>{error}</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
