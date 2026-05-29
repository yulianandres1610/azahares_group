"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertCircle,
  ArrowRight,
  HelpCircle,
  PackageSearch,
  Search,
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
 * Sincroniza el estado con la URL via ?code=… para que:
 *  - el link sea compartible (mandar tracking a un compañero por chat)
 *  - F5 / reload conserve la búsqueda actual
 *  - back/forward del browser navegue entre LANDING y RESULTS
 */
export function TrackingPageShell() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [query, setQuery] = useState("");
  const [data, setData] = useState<PublicTrackingResponse | null>(null);
  const [identifier, setIdentifier] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /** Mínimo visible del loader. El fetch suele completar en <500 ms y el
   *  ShipLoader queda subliminal — forzamos un piso para que se vea bien
   *  la animación. Si el fetch tarda más, no agregamos delay encima. */
  const MIN_LOADER_MS = 3400;

  const runFetch = useCallback(async (rawCode: string) => {
    const trimmed = rawCode.trim();
    if (!trimmed) return;
    setError(null);
    setData(null);
    setLoading(true);
    const startedAt = Date.now();
    const waitFloor = async () => {
      const elapsed = Date.now() - startedAt;
      if (elapsed < MIN_LOADER_MS) {
        await new Promise((res) =>
          setTimeout(res, MIN_LOADER_MS - elapsed),
        );
      }
    };
    try {
      const r = await fetchPublicTracking(trimmed);
      await waitFloor();
      setData(r);
      setIdentifier(trimmed.toUpperCase());
    } catch (err) {
      await waitFloor();
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
  }, []);

  /** Auto-fetch en el primer mount si la URL ya trae ?code= (compartido
   *  por chat, F5, deep link del email). Usamos ref para que no se
   *  re-dispare cuando router.push actualiza searchParams después. */
  const initialCodeRef = useRef<string | null>(searchParams.get("code"));
  useEffect(() => {
    const code = initialCodeRef.current;
    if (code) {
      setQuery(code.toUpperCase());
      void runFetch(code);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const code = query.trim();
    if (!code) return;
    // Empuja la URL ANTES del fetch — el browser muestra el código en la
    // barra ni bien arranca el loader, y el link queda compartible
    // mientras la página todavía está consultando.
    router.push(`/tracking?code=${encodeURIComponent(code)}`, {
      scroll: false,
    });
    await runFetch(code);
  };

  const onReset = () => {
    router.push("/tracking", { scroll: false });
    setData(null);
    setQuery("");
    setError(null);
  };

  // ───── MODO RESULTS — full-width, mismo diseño que el operativo ─────
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

            {/* ───── Link a FAQ ─────
                Reemplaza el bloque "¿Dónde encuentro mi código?" — ahora
                la explicación detallada vive en /preguntas-frecuentes
                con un anchor a la sección de tracking. */}
            <Link
              href="/preguntas-frecuentes#tracking"
              className="group mt-5 flex items-center justify-between gap-3 rounded-2xl border border-navy-100 bg-navy-50/40 p-4 transition hover:-translate-y-0.5 hover:border-navy-200 hover:bg-navy-50/70 hover:shadow-[0_18px_44px_rgba(13,27,61,0.08)] sm:p-5"
            >
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-navy-900 text-white shadow-[0_6px_18px_rgba(13,27,61,0.25)]">
                  <HelpCircle className="h-4 w-4" strokeWidth={2.2} />
                </div>
                <div className="min-w-0">
                  <div className="text-[12.5px] font-bold text-navy-900 sm:text-[13.5px]">
                    ¿Necesitás ayuda con tu código?
                  </div>
                  <div className="text-[11.5px] leading-snug text-slate-600 sm:text-[12px]">
                    Guía completa de tracking, cotizaciones, pagos y más.
                  </div>
                </div>
              </div>
              <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-white px-3 py-1.5 text-[11px] font-bold text-navy-900 ring-1 ring-navy-200 transition group-hover:bg-navy-900 group-hover:text-white group-hover:ring-navy-900">
                Ver FAQ
                <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>

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
