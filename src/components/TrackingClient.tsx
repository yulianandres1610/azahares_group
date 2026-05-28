"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  Loader2,
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
    <div className="space-y-10">
      {/* ───── FORM ───── */}
      <div className="glass-card-light rounded-3xl p-6 sm:p-8">
        <form onSubmit={onSubmit} className="space-y-4">
          <label className="block text-xs font-bold uppercase tracking-[0.22em] text-navy-700">
            Código de seguimiento
          </label>
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <PackageSearch className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-navy-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value.toUpperCase())}
                placeholder="CAT52626825 · AZH-SO-000034 · AZH-INV-000020"
                spellCheck={false}
                autoComplete="off"
                autoCapitalize="characters"
                className="h-14 w-full rounded-2xl border border-navy-200 bg-white/80 pl-12 pr-4 font-mono text-sm tabular-nums text-navy-900 outline-none transition focus:border-navy-500 focus:bg-white focus:shadow-[0_0_0_4px_rgba(29,58,138,0.12)] sm:text-base"
              />
            </div>
            <button
              type="submit"
              disabled={loading || !query.trim()}
              className="btn-glass-primary justify-center disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Buscando…
                </>
              ) : (
                <>
                  <Search className="h-4 w-4" />
                  Rastrear envío
                </>
              )}
            </button>
          </div>
          <p className="text-xs text-slate-500">
            Aceptamos CAT (CATXXXXX), número de orden (AZH-SO-XXXXXX),
            número de factura (AZH-INV-XXXXXX) o número de booking.
          </p>
        </form>
      </div>

      {/* ───── ERROR ───── */}
      <AnimatePresence>
        {error && (
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
        {data && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
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
    <div className="overflow-hidden rounded-3xl border border-navy-100 bg-white shadow-[0_20px_50px_rgba(13,27,61,0.08)]">
      <div className="hero-bg p-6 text-white sm:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-amber-300">
              Estado actual
            </span>
            <h3 className="mt-2 font-serif text-2xl font-bold sm:text-3xl">
              {currentLabel}
            </h3>
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
                <ShipWheel className="h-3 w-3 text-amber-300" />
                {data.bookingNumber}
              </div>
            )}
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-6">
          <div className="flex items-baseline justify-between text-[11px] font-bold uppercase tracking-wider">
            <span className="text-white/70">Avance del envío</span>
            <span className="text-amber-300">{pct}%</span>
          </div>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/15">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${pct}%` }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="h-full rounded-full bg-gradient-to-r from-amber-300 to-amber-500"
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
    </div>
  );
}

function TrackingTimeline({ timeline }: { timeline: TimelineEvent[] }) {
  const lastDoneIdx = computeLastDoneIdx(timeline);
  return (
    <div className="rounded-3xl border border-navy-100 bg-white p-6 shadow-[0_10px_30px_rgba(13,27,61,0.06)] sm:p-8">
      <h4 className="font-serif text-lg font-bold text-navy-900">
        Línea de tiempo
      </h4>
      <p className="mt-1 text-sm text-slate-500">
        Cada hito se marca cuando el sistema detecta el evento real.
      </p>
      <ol className="relative mt-6 space-y-4">
        {TIMELINE_ORDER.map((step, idx) => {
          const event = timeline.find((e) => e.step === step);
          const at = event?.at ?? null;
          const isDone = idx <= lastDoneIdx;
          const isCurrent = idx === lastDoneIdx + 1;
          const meta = TIMELINE_LABELS[step];

          return (
            <motion.li
              key={step}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.04, duration: 0.4 }}
              className="relative grid grid-cols-[40px_1fr_auto] items-start gap-3"
            >
              <div className="relative flex h-10 w-10 items-center justify-center">
                <div
                  className={
                    "absolute inset-0 rounded-full transition " +
                    (isDone
                      ? "bg-amber-500/20"
                      : isCurrent
                        ? "bg-navy-100 animate-pulse"
                        : "bg-slate-100")
                  }
                />
                <div
                  className={
                    "relative grid h-7 w-7 place-items-center rounded-full transition " +
                    (isDone
                      ? "bg-amber-500 text-white shadow-[0_4px_12px_rgba(245,158,11,0.45)]"
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
                </div>
                {idx < TIMELINE_ORDER.length - 1 && (
                  <div
                    className={
                      "absolute left-1/2 top-10 h-6 w-0.5 -translate-x-1/2 " +
                      (isDone ? "bg-amber-400/50" : "bg-slate-200")
                    }
                  />
                )}
              </div>
              <div>
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
                  <div className="mt-1 flex flex-wrap gap-1">
                    {event.meta.catNumbers.map((cat) => (
                      <span
                        key={cat}
                        className="rounded-full border border-amber-200 bg-amber-50 px-2 py-0.5 font-mono text-[10px] font-semibold tabular-nums text-amber-800"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <div className="text-right">
                <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
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
    </div>
  );
}
