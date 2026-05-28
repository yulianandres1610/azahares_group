"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  PackageSearch,
  Search,
  ShipWheel,
} from "lucide-react";
import {
  computeLastDoneIdx,
  fetchPublicTracking,
  TIMELINE_LABELS,
  TIMELINE_ORDER,
  TrackingNotFoundError,
  type PublicTrackingResponse,
  type TimelineEvent,
} from "@/lib/tracking";
import { ShipLoader } from "./ShipLoader";

const SAMPLE_CODES = [
  { label: "CAT", value: "CAT52626825" },
  { label: "ORDEN", value: "AZH-SO-000034" },
  { label: "FACTURA", value: "AZH-INV-000020" },
];

export function TrackingClient() {
  const [query, setQuery] = useState("");
  const [data, setData] = useState<PublicTrackingResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setData(null);
    if (!query.trim()) return;
    setLoading(true);
    try {
      const r = await fetchPublicTracking(query);
      setData(r);
    } catch (err) {
      if (err instanceof TrackingNotFoundError) {
        setError(
          `No encontramos ningún envío con el código "${err.query}". Verificá que sea un CAT (CATXXXXX), número de orden (AZH-SO-XXXXXX) o factura.`,
        );
      } else {
        setError(
          err instanceof Error ? err.message : "Error inesperado consultando el tracking.",
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* ───── FORM ───── */}
      <div>
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

          {/* Sample codes — pre-fill on click */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
              Probar con:
            </span>
            {SAMPLE_CODES.map((s) => (
              <button
                key={s.value}
                type="button"
                onClick={() => setQuery(s.value)}
                disabled={loading}
                className="group inline-flex items-center gap-1.5 rounded-full border border-navy-100 bg-navy-50/60 px-3 py-1 text-[11px] font-semibold text-navy-700 transition hover:border-navy-300 hover:bg-navy-100 disabled:opacity-50"
              >
                <span className="text-[9px] font-bold uppercase tracking-wider text-navy-500">
                  {s.label}
                </span>
                <span className="font-mono">{s.value}</span>
              </button>
            ))}
          </div>
        </form>
      </div>

      {/* ───── LOADING ───── */}
      <AnimatePresence mode="wait">
        {loading && (
          <motion.div
            key="loading"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center py-10"
          >
            <ShipLoader size="lg" tone="navy" label="Buscando tu envío…" />
            <p className="mt-3 max-w-sm text-center text-xs text-slate-500">
              Consultando la base de operaciones — esto toma unos segundos.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ───── ERROR ───── */}
      <AnimatePresence>
        {error && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex items-start gap-3 rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-900"
          >
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-rose-600" />
            <span>{error}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ───── RESULT ───── */}
      <AnimatePresence>
        {data && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="space-y-6"
          >
            <TrackingHeader data={data} />
            <TrackingTimeline timeline={data.timeline} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function TrackingHeader({ data }: { data: PublicTrackingResponse }) {
  const lastDoneIdx = computeLastDoneIdx(data.timeline);
  const total = data.timeline.length;
  const pct = total > 0 ? Math.round(((lastDoneIdx + 1) / total) * 100) : 0;
  const currentLabel =
    lastDoneIdx >= 0
      ? TIMELINE_LABELS[data.timeline[lastDoneIdx].step]?.label
      : "Recibiendo el pedido";

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.05 }}
      className="overflow-hidden rounded-3xl border border-navy-100 bg-white shadow-[0_18px_44px_rgba(13,27,61,0.08)]"
    >
      <div className="hero-bg p-6 text-white sm:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-white/75">
              Estado actual
            </span>
            <motion.h3
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15, duration: 0.4 }}
              className="mt-2 font-serif text-2xl font-bold sm:text-3xl"
            >
              {currentLabel}
            </motion.h3>
            {data.clientLegalName && (
              <p className="mt-2 text-sm text-white/80">
                Cliente · {data.clientLegalName}
              </p>
            )}
          </div>
          <div className="text-right">
            <div className="text-[11px] font-bold uppercase tracking-wider text-white/65">
              Orden
            </div>
            <div className="mt-0.5 font-mono text-lg font-bold tabular-nums">
              {data.orderNumber}
            </div>
            {data.bookingNumber && (
              <div className="mt-1 inline-flex items-center gap-1 rounded-full bg-white/15 px-2 py-0.5 text-[11px] font-bold backdrop-blur">
                <ShipWheel className="h-3 w-3" />
                {data.bookingNumber}
              </div>
            )}
          </div>
        </div>

        {/* Progress bar animado */}
        <div className="mt-6">
          <div className="flex items-baseline justify-between text-[11px] font-bold uppercase tracking-wider">
            <span className="text-white/70">Avance del envío</span>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.4 }}
              className="text-white"
            >
              {pct}%
            </motion.span>
          </div>
          <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-white/15">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${pct}%` }}
              transition={{ duration: 1.4, delay: 0.3, ease: "easeOut" }}
              className="h-full rounded-full bg-gradient-to-r from-white/70 to-white"
            />
          </div>
        </div>
      </div>

      {data.productSummary && (
        <div className="border-t border-navy-100 bg-navy-50/40 px-6 py-4 text-sm text-navy-900 sm:px-8">
          <span className="text-[11px] font-bold uppercase tracking-wider text-navy-600">
            Carga
          </span>
          <div className="mt-1 font-semibold">{data.productSummary}</div>
        </div>
      )}
    </motion.div>
  );
}

function TrackingTimeline({ timeline }: { timeline: TimelineEvent[] }) {
  const lastDoneIdx = computeLastDoneIdx(timeline);
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="rounded-3xl border border-navy-100 bg-white p-6 shadow-[0_10px_30px_rgba(13,27,61,0.06)] sm:p-8"
    >
      <div className="flex items-baseline justify-between">
        <h4 className="font-serif text-lg font-bold text-navy-900 sm:text-xl">
          Línea de tiempo
        </h4>
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
          {lastDoneIdx + 1} / {TIMELINE_ORDER.length} hitos
        </span>
      </div>
      <p className="mt-1 text-xs text-slate-500 sm:text-sm">
        Cada hito se marca cuando el sistema detecta el evento real.
      </p>

      <ol className="relative mt-6 space-y-3">
        {TIMELINE_ORDER.map((step, idx) => {
          const event = timeline.find((e) => e.step === step);
          const at = event?.at ?? null;
          const isDone = idx <= lastDoneIdx;
          const isCurrent = idx === lastDoneIdx + 1;
          const meta = TIMELINE_LABELS[step];

          return (
            <motion.li
              key={step}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                delay: 0.35 + idx * 0.05,
                duration: 0.4,
                ease: [0.21, 0.47, 0.32, 0.98],
              }}
              className="relative grid grid-cols-[44px_1fr_auto] items-start gap-3"
            >
              <div className="relative flex h-11 w-11 items-center justify-center">
                <div
                  className={
                    "absolute inset-0 rounded-full transition " +
                    (isDone
                      ? "bg-success-500/20"
                      : isCurrent
                        ? "bg-navy-100 animate-pulse"
                        : "bg-slate-100")
                  }
                />
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    delay: 0.55 + idx * 0.05,
                    duration: 0.35,
                    ease: [0.34, 1.56, 0.64, 1],
                  }}
                  className={
                    "relative grid h-7 w-7 place-items-center rounded-full transition " +
                    (isDone
                      ? "bg-success-500 text-white shadow-[0_4px_12px_rgba(16,185,129,0.4)]"
                      : isCurrent
                        ? "bg-navy-700 text-white"
                        : "bg-slate-200 text-slate-400")
                  }
                >
                  {isDone ? (
                    <CheckCircle2 className="h-4 w-4" />
                  ) : isCurrent ? (
                    <ArrowRight className="h-3.5 w-3.5" />
                  ) : (
                    <span className="text-[10px] font-bold">{idx + 1}</span>
                  )}
                </motion.div>
                {idx < TIMELINE_ORDER.length - 1 && (
                  <motion.div
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ delay: 0.7 + idx * 0.05, duration: 0.3 }}
                    style={{ transformOrigin: "top" }}
                    className={
                      "absolute left-1/2 top-11 h-5 w-0.5 -translate-x-1/2 " +
                      (isDone ? "bg-success-400/55" : "bg-slate-200")
                    }
                  />
                )}
              </div>
              <div className="min-w-0">
                <div
                  className={
                    "text-sm font-bold " +
                    (isDone
                      ? "text-navy-900"
                      : isCurrent
                        ? "text-navy-800"
                        : "text-slate-500")
                  }
                >
                  {meta.label}
                </div>
                <div className="mt-0.5 text-xs text-slate-500">
                  {meta.description}
                </div>
                {event?.meta?.catNumbers && event.meta.catNumbers.length > 0 && (
                  <div className="mt-1.5 flex flex-wrap gap-1">
                    {event.meta.catNumbers.map((cat) => (
                      <span
                        key={cat}
                        className="rounded-full border border-navy-200 bg-navy-50 px-2 py-0.5 font-mono text-[10px] font-semibold tabular-nums text-navy-800"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <div className="text-right">
                <div
                  className={
                    "text-[10px] font-bold uppercase tracking-wider " +
                    (isDone
                      ? "text-success-600"
                      : isCurrent
                        ? "text-navy-700"
                        : "text-slate-400")
                  }
                >
                  {isDone ? "Hecho" : isCurrent ? "En curso" : "Pendiente"}
                </div>
                {at && (
                  <div className="mt-0.5 font-mono text-[11px] tabular-nums text-slate-600">
                    {new Date(at).toLocaleDateString("es-AR", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </div>
                )}
              </div>
            </motion.li>
          );
        })}
      </ol>
    </motion.div>
  );
}
