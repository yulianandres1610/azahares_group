"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import {
  Anchor,
  ArrowLeft,
  Boxes,
  CheckCircle2,
  ClipboardCheck,
  CreditCard,
  FileText,
  MapPin,
  Navigation,
  Package,
  Receipt,
  RefreshCw,
  Satellite,
  Send,
  Ship,
  ShoppingBag,
  Truck,
  Warehouse as WarehouseIcon,
  type LucideIcon,
} from "lucide-react";
import { env } from "@/lib/env";
import {
  STATUS_COLOR,
  STATUS_LABEL,
  type PublicTrackingPurchaseOrder,
  type PublicTrackingResponse,
  type TimelineEvent,
  type TimelineStep,
} from "@/lib/tracking";
import { cn } from "@/lib/utils";

/**
 * Vista pública de tracking — port 1:1 del componente del frontend
 * operativo azaharesfuel.com (frontend/src/components/tracking/
 * PublicTrackingView.tsx). Misma narrativa, mismas etiquetas, mismo
 * diseño navy + emerald. Cualquier cambio acá debe quedar también allá
 * y viceversa.
 */

const REFRESH_INTERVAL_MS = 60_000;

// ============================================================================
// Timeline: definición de cada hito (orden + label + icono).
// ============================================================================
interface TimelineStepDef {
  step: TimelineStep;
  label: string;
  description: string;
  icon: LucideIcon;
}

const TIMELINE_STEPS: TimelineStepDef[] = [
  {
    step: "order_placed",
    label: "Pedido registrado",
    description: "Tu orden fue creada en el sistema.",
    icon: ShoppingBag,
  },
  {
    step: "quote_sent",
    label: "Cotización enviada",
    description: "Te enviamos la cotización con los precios y términos.",
    icon: FileText,
  },
  {
    step: "quote_accepted",
    label: "Cotización aceptada",
    description: "Confirmaste los términos y el sistema generó la factura.",
    icon: ClipboardCheck,
  },
  // Invoice antes que payment — el flujo real es: aceptamos la
  // cotización, emitimos la factura y el cliente paga contra esa factura.
  {
    step: "invoice_issued",
    label: "Factura emitida",
    description: "Tu factura comercial ya está disponible.",
    icon: Receipt,
  },
  {
    step: "payment_received",
    label: "Pago recibido",
    description: "Registramos tu pago y lo verificamos.",
    icon: CreditCard,
  },
  {
    step: "po_sent_to_supplier",
    label: "Orden enviada al proveedor",
    description: "Azahares envió la orden de compra al proveedor.",
    icon: Send,
  },
  {
    step: "supplier_accepted",
    label: "Proveedor aceptó la orden",
    description: "El proveedor confirmó la disponibilidad del producto.",
    icon: CheckCircle2,
  },
  {
    step: "supplier_processing",
    label: "Procesando por el proveedor",
    description:
      "El proveedor está preparando tu pedido y coordinando la operación interna.",
    icon: Boxes,
  },
  {
    step: "booking_requested",
    label: "Booking solicitado a Crowley",
    description: "Pedimos el booking marítimo al carrier.",
    icon: Ship,
  },
  {
    step: "booking_confirmed",
    label: "Booking confirmado",
    description: "Crowley confirmó el booking y asignó el espacio.",
    icon: CheckCircle2,
  },
  {
    step: "container_assigned",
    label: "Contenedor asignado",
    description: "Se asignó el iso-tanque que va a transportar tu producto.",
    icon: Package,
  },
  {
    step: "container_loaded",
    label: "Contenedor cargado y sellado",
    description: "El producto fue cargado, sellado y está listo para despacho.",
    icon: Boxes,
  },
  {
    step: "bol_issued",
    label: "Bill of Lading emitido",
    description: "El BOL fue emitido por la naviera.",
    icon: FileText,
  },
  {
    step: "dispatched",
    label: "En tránsito",
    description: "El contenedor salió del puerto de origen.",
    icon: Truck,
  },
  {
    step: "arrived_at_destination",
    label: "Llegó al destino",
    description: "El contenedor llegó al puerto de destino.",
    icon: Anchor,
  },
  {
    step: "delivered",
    label: "Entregado",
    description: "El producto fue entregado a destino final.",
    icon: CheckCircle2,
  },
];

interface Props {
  /** Datos ya resueltos por el form de la landing — evitamos refetch
   *  innecesario en el mount. La vista se encarga del refresh 60s. */
  initialData: PublicTrackingResponse;
  /** Identificador usado para refresh (token o CAT). */
  identifier: string;
  /** Callback opcional: cuando se renderiza dentro del shell de la
   *  página corporativa, permite volver al form de búsqueda desde el
   *  botón "Nueva búsqueda" del header. */
  onReset?: () => void;
}

export function PublicTrackingView({
  initialData,
  identifier,
  onReset,
}: Props) {
  const [data, setData] = useState<PublicTrackingResponse>(initialData);
  const [refreshing, setRefreshing] = useState(false);
  const [activeContainerId, setActiveContainerId] = useState<string | null>(
    null,
  );
  // Cuando hay múltiples POs el cliente puede cambiar entre "Todos"
  // (timeline agregado) y cada PO individual. null = vista agregada.
  const [selectedPoId, setSelectedPoId] = useState<string | null>(null);

  const load = useCallback(async () => {
    setRefreshing(true);
    try {
      const r = await fetch(
        `${env.apiUrl}/public/tracking/${encodeURIComponent(identifier)}`,
        { cache: "no-store" },
      );
      if (r.ok) {
        setData((await r.json()) as PublicTrackingResponse);
      }
    } catch {
      // Silencioso — mantenemos data anterior si el refresh falla.
    } finally {
      setRefreshing(false);
    }
  }, [identifier]);

  useEffect(() => {
    const t = setInterval(() => void load(), REFRESH_INTERVAL_MS);
    return () => clearInterval(t);
  }, [load]);

  const hasContainersWithLocation = data.containers.some(
    (c) => c.lastLocation != null,
  );
  const hasContainers = data.containers.length > 0;

  // Timeline activo: agregado (default) o el de la PO seleccionada.
  const selectedPo =
    selectedPoId != null
      ? data.purchaseOrders.find((p) => p.id === selectedPoId)
      : null;
  const activeTimeline = selectedPo?.timeline ?? data.timeline;
  const hasMultiplePos = data.purchaseOrders.length > 1;

  return (
    <div className="bg-slate-50">
      <Header
        data={data}
        refreshing={refreshing}
        onRefresh={() => load()}
        onReset={onReset}
      />

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-8 sm:py-8">
        {/* Selector de PO arriba de todo cuando hay >= 2 POs. */}
        {hasMultiplePos && (
          <PoSelector
            purchaseOrders={data.purchaseOrders}
            selectedPoId={selectedPoId}
            onSelect={setSelectedPoId}
          />
        )}

        <div className={hasMultiplePos ? "mt-4" : ""}>
          <ProgressSummary timeline={activeTimeline} />
        </div>

        {/* Multi-container: grilla full-width arriba. */}
        {data.containers.length > 1 && (
          <section className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-3">
              <div className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500">
                Contenedores · {data.containers.length}
              </div>
              <h2 className="font-serif text-lg font-bold text-navy-900">
                Cada contenedor se procesa por separado
              </h2>
              <p className="mt-0.5 text-[12px] text-slate-500">
                Tu pedido se divide en varios iso-tanques. Cada uno tiene su
                propia orden de compra con el proveedor y avanza de manera
                independiente — podés ver el estado de cada uno acá.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {data.containers.map((c) => (
                <ContainerCard
                  key={c.id}
                  c={c}
                  active={c.id === activeContainerId}
                  onClick={() =>
                    setActiveContainerId((prev) =>
                      prev === c.id ? null : c.id,
                    )
                  }
                />
              ))}
            </div>
          </section>
        )}

        <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,460px)_minmax(0,1fr)]">
          {/* Timeline */}
          <OrderTimeline timeline={activeTimeline} scopedToPo={selectedPo} />

          {/* Map + container cards (solo single-container; en multi ya
              están arriba). */}
          <div className="space-y-4">
            {hasContainersWithLocation ? (
              <>
                <TrackingMap
                  containers={data.containers}
                  activeId={activeContainerId}
                  onSelect={setActiveContainerId}
                />
                {data.containers.length === 1 && (
                  <div className="space-y-3">
                    {data.containers.map((c) => (
                      <ContainerCard
                        key={c.id}
                        c={c}
                        active={c.id === activeContainerId}
                        onClick={() =>
                          setActiveContainerId((prev) =>
                            prev === c.id ? null : c.id,
                          )
                        }
                      />
                    ))}
                  </div>
                )}
              </>
            ) : hasContainers ? (
              <PendingGpsPanel />
            ) : (
              <AwaitingContainerPanel />
            )}
          </div>
        </div>
      </main>

      <footer className="mx-auto max-w-7xl px-6 pb-10 text-center text-[11px] text-slate-400 sm:px-10">
        Powered by Azahares Import &amp; Export · GPS Samsara satelital
      </footer>
    </div>
  );
}

// ============================================================================
// Header — navy gradient con datos de la orden
// ============================================================================
function Header({
  data,
  refreshing,
  onRefresh,
  onReset,
}: {
  data: PublicTrackingResponse;
  refreshing: boolean;
  onRefresh: () => void;
  onReset?: () => void;
}) {
  return (
    <header className="bg-gradient-to-br from-navy-900 via-navy-800 to-navy-700 px-4 py-6 text-white sm:px-10">
      <div className="mx-auto flex max-w-7xl flex-wrap items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em]">
            <Ship className="h-3 w-3" />
            Seguimiento de tu pedido
          </div>
          <h1 className="mt-2 font-serif text-2xl font-bold sm:text-4xl">
            Pedido {data.order.orderNumber}
          </h1>
          <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
            {data.order.bookingNumber && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-[11px] font-semibold ring-1 ring-emerald-300/40">
                <span className="font-mono">
                  Booking {data.order.bookingNumber}
                </span>
              </span>
            )}
            {data.order.portOfLoading && data.order.portOfDischarge && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-0.5 text-[11px] font-semibold ring-1 ring-white/20">
                {data.order.portOfLoading} → {data.order.portOfDischarge}
              </span>
            )}
          </div>
          <p className="mt-1.5 text-sm text-white/80">
            {data.client.legalName}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {onReset && (
            <button
              type="button"
              onClick={onReset}
              className="inline-flex items-center gap-1.5 rounded-full border border-navy-200 bg-white px-3 py-1.5 text-[11px] font-bold text-navy-700 transition hover:bg-navy-50"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Nueva búsqueda
            </button>
          )}
          <button
            type="button"
            onClick={onRefresh}
            disabled={refreshing}
            className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-3 py-2 text-xs font-semibold transition hover:bg-white/20 disabled:opacity-50"
          >
            <RefreshCw
              className={cn("h-3.5 w-3.5", refreshing && "animate-spin")}
            />
            Actualizar
          </button>
        </div>
      </div>
      <p className="mx-auto mt-3 max-w-7xl text-[11px] text-white/60">
        Última actualización: {new Date(data.fetchedAt).toLocaleString("es")} ·
        ubicación GPS satelital actualizada cada hora.
      </p>
    </header>
  );
}

// ============================================================================
// Progress summary — barra horizontal con % completado
// ============================================================================
function ProgressSummary({ timeline }: { timeline: TimelineEvent[] }) {
  const total = timeline.length;
  const lastDoneIdx = computeLastDoneIdx(timeline);
  const doneCount = lastDoneIdx + 1;
  const pct = total > 0 ? Math.round((doneCount / total) * 100) : 0;
  const isComplete = lastDoneIdx >= total - 1;
  const currentDef =
    lastDoneIdx < 0
      ? TIMELINE_STEPS[0]
      : TIMELINE_STEPS[Math.min(lastDoneIdx, total - 1)];

  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="grid gap-4 p-4 sm:grid-cols-[1fr_auto] sm:items-center sm:p-5">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500">
              Estado actual
            </span>
            {isComplete && (
              <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-700">
                Completado
              </span>
            )}
          </div>
          <h2 className="mt-1 font-serif text-lg font-bold text-navy-900 sm:text-xl">
            {currentDef.label}
          </h2>
          <p className="mt-0.5 text-[12px] text-slate-500">
            {currentDef.description}
          </p>
        </div>
        <div className="flex items-center gap-3 sm:flex-col sm:items-end">
          <div className="text-right">
            <div className="font-mono text-2xl font-bold text-navy-900 sm:text-3xl">
              {pct}%
            </div>
            <div className="text-[10px] uppercase tracking-wider text-slate-500">
              {doneCount} de {total} hitos
            </div>
          </div>
        </div>
      </div>
      <div className="relative h-2 bg-slate-100">
        <div
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-emerald-500 to-emerald-600 transition-[width] duration-700 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
    </section>
  );
}

// ============================================================================
// OrderTimeline — vertical stepper, navy + emerald
// ============================================================================
function computeLastDoneIdx(timeline: TimelineEvent[]): number {
  for (let i = timeline.length - 1; i >= 0; i--) {
    if (timeline[i].at) return i;
  }
  return -1;
}

function OrderTimeline({
  timeline,
  scopedToPo,
}: {
  timeline: TimelineEvent[];
  scopedToPo?: PublicTrackingPurchaseOrder | null;
}) {
  const lastDoneIdx = computeLastDoneIdx(timeline);
  const currentIdx = lastDoneIdx + 1;

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-5 flex items-center justify-between">
        <div className="min-w-0 flex-1">
          <div className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500">
            Línea de tiempo
          </div>
          <h2 className="font-serif text-lg font-bold text-navy-900">
            {scopedToPo
              ? `Proceso de PO ${scopedToPo.orderNumber}`
              : "Proceso completo de tu pedido"}
          </h2>
          {scopedToPo && (
            <p className="mt-0.5 text-[12px] text-slate-500">
              {scopedToPo.containerNumber
                ? `Iso-tanque ${scopedToPo.containerNumber} · seguimiento individual.`
                : "Aún no se asignó el iso-tanque para esta PO."}
            </p>
          )}
        </div>
      </div>

      <ol className="relative space-y-0">
        {timeline.map((event, idx) => {
          const def = TIMELINE_STEPS[idx];
          const isDone = idx <= lastDoneIdx;
          const isCurrent = idx === currentIdx;
          const isLast = idx === timeline.length - 1;
          return (
            <TimelineRow
              key={event.step}
              def={def}
              at={event.at}
              meta={event.meta}
              isDone={isDone}
              isCurrent={isCurrent}
              isLast={isLast}
              index={idx}
            />
          );
        })}
      </ol>
    </section>
  );
}

function TimelineRow({
  def,
  at,
  meta,
  isDone,
  isCurrent,
  isLast,
  index,
}: {
  def: TimelineStepDef;
  at: string | null;
  meta?: TimelineEvent["meta"];
  isDone: boolean;
  isCurrent: boolean;
  isLast: boolean;
  index: number;
}) {
  const Icon = def.icon;
  return (
    <li
      className="relative flex gap-4 pb-5 last:pb-0"
      style={{
        animationDelay: `${Math.min(index, 8) * 60}ms`,
        animationFillMode: "both",
      }}
    >
      {!isLast && (
        <span
          aria-hidden
          className={cn(
            "absolute left-[19px] top-10 bottom-0 w-0.5 transition-colors",
            isDone ? "bg-emerald-500" : "bg-slate-200",
          )}
        />
      )}
      <span
        className={cn(
          "relative z-10 grid h-10 w-10 shrink-0 place-items-center rounded-full ring-4 ring-white transition-all",
          isDone
            ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/30"
            : isCurrent
              ? "bg-gradient-to-br from-navy-700 to-navy-900 text-white shadow-md shadow-navy-700/30"
              : "border-2 border-slate-200 bg-white text-slate-300",
        )}
      >
        {isCurrent && (
          <span
            aria-hidden
            className="absolute inset-0 animate-ping rounded-full bg-navy-700/40"
            style={{ animationDuration: "1.6s" }}
          />
        )}
        {isDone ? (
          <CheckCircle2 className="relative h-5 w-5" strokeWidth={2.5} />
        ) : (
          <Icon className="relative h-4 w-4" strokeWidth={2.2} />
        )}
      </span>
      <div className="min-w-0 flex-1 pt-1">
        <div className="flex flex-wrap items-baseline justify-between gap-x-2 gap-y-0.5">
          <h3
            className={cn(
              "text-[14px] font-bold",
              isDone
                ? "text-navy-900"
                : isCurrent
                  ? "text-navy-900"
                  : "text-slate-400",
            )}
          >
            {def.label}
          </h3>
          {at && (
            <time
              className="font-mono text-[11px] text-emerald-700"
              dateTime={at}
            >
              {new Date(at).toLocaleDateString("es", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </time>
          )}
          {isCurrent && !at && (
            <span className="rounded-full bg-navy-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-navy-700">
              En curso
            </span>
          )}
        </div>
        <p
          className={cn(
            "mt-0.5 text-[12px] leading-relaxed",
            isDone || isCurrent ? "text-slate-600" : "text-slate-400",
          )}
        >
          {def.description}
        </p>
        {meta?.catNumbers && meta.catNumbers.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1.5">
            {meta.catNumbers.map((cat) => (
              <span
                key={cat}
                className="inline-flex items-center gap-1 rounded-md bg-navy-50 px-2 py-0.5 font-mono text-[11px] font-semibold text-navy-700 ring-1 ring-navy-100"
                title="Número de CAT emitido por Crowley — usalo para tracking directo en su portal."
              >
                <span className="text-[9px] font-bold uppercase tracking-wider text-navy-500">
                  CAT
                </span>
                {cat}
              </span>
            ))}
          </div>
        )}
        {at && (
          <p className="mt-0.5 text-[10px] text-slate-400">
            {new Date(at).toLocaleTimeString("es", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        )}
      </div>
    </li>
  );
}

// ============================================================================
// PoSelector — tabs para alternar entre vista agregada y cada PO
// ============================================================================
function PoSelector({
  purchaseOrders,
  selectedPoId,
  onSelect,
}: {
  purchaseOrders: PublicTrackingPurchaseOrder[];
  selectedPoId: string | null;
  onSelect: (id: string | null) => void;
}) {
  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-3 shadow-sm sm:p-4">
      <div className="mb-2 flex items-baseline justify-between gap-2">
        <div className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500">
          Tu pedido tiene {purchaseOrders.length} iso-tanques
        </div>
        <div className="text-[10px] text-slate-400">
          Cada uno se procesa por separado
        </div>
      </div>
      <div className="-mx-1 flex flex-wrap gap-2 overflow-x-auto px-1 pb-1">
        <PoTab
          label="Todos"
          subtitle="Vista combinada"
          active={selectedPoId === null}
          onClick={() => onSelect(null)}
        />
        {purchaseOrders.map((po) => (
          <PoTab
            key={po.id}
            label={`PO ${po.orderNumber.replace(/^.*-PO-/i, "")}`}
            subtitle={
              po.containerNumber
                ? po.containerNumber
                : "Sin contenedor asignado"
            }
            active={selectedPoId === po.id}
            onClick={() => onSelect(po.id)}
          />
        ))}
      </div>
    </section>
  );
}

function PoTab({
  label,
  subtitle,
  active,
  onClick,
}: {
  label: string;
  subtitle: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "group inline-flex shrink-0 flex-col items-start gap-0.5 rounded-xl border px-3 py-2 text-left transition",
        active
          ? "border-navy-700 bg-gradient-to-br from-navy-700 to-navy-900 text-white shadow-md shadow-navy-700/20"
          : "border-slate-200 bg-white text-slate-700 hover:border-navy-300 hover:bg-slate-50",
      )}
    >
      <span
        className={cn(
          "font-mono text-[12px] font-bold",
          active ? "text-white" : "text-navy-900",
        )}
      >
        {label}
      </span>
      <span
        className={cn(
          "text-[10px]",
          active ? "text-white/80" : "text-slate-500",
        )}
      >
        {subtitle}
      </span>
    </button>
  );
}

// ============================================================================
// Paneles para estados intermedios
// ============================================================================
function AwaitingContainerPanel() {
  return (
    <div className="grid h-full min-h-[280px] place-items-center rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
      <div className="max-w-sm">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-navy-50 text-navy-700">
          <Package className="h-7 w-7" strokeWidth={2} />
        </div>
        <h3 className="mt-4 font-serif text-base font-bold text-navy-900">
          Esperando asignación de contenedor
        </h3>
        <p className="mt-2 text-[12px] leading-relaxed text-slate-600">
          Cuando el proveedor asigne el iso-tanque que va a transportar tu
          producto, vas a poder ver acá su ubicación GPS en tiempo real.
          Mientras tanto, podés seguir el avance del proceso en la línea de
          tiempo.
        </p>
      </div>
    </div>
  );
}

function PendingGpsPanel() {
  return (
    <div className="grid h-full min-h-[280px] place-items-center rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
      <div className="max-w-sm">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-navy-50 text-navy-700">
          <Satellite className="h-7 w-7 animate-pulse" strokeWidth={2} />
        </div>
        <h3 className="mt-4 font-serif text-base font-bold text-navy-900">
          Contenedor asignado · esperando primer reporte GPS
        </h3>
        <p className="mt-2 text-[12px] leading-relaxed text-slate-600">
          El iso-tanque ya está asignado a tu pedido. En cuanto el satélite
          reporte la primera posición, vas a ver el mapa con su ubicación.
        </p>
      </div>
    </div>
  );
}

// ============================================================================
// Map: pinta marker por contenedor, polyline del trail y warehouses
// ============================================================================
function TrackingMap({
  containers,
  activeId,
  onSelect,
}: {
  containers: PublicTrackingResponse["containers"];
  activeId: string | null;
  onSelect: (id: string) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<Map<string, mapboxgl.Marker>>(new Map());
  const trailLayersRef = useRef<Set<string>>(new Set());

  const token = env.mapboxToken;
  const enabled = token.length > 0;

  useEffect(() => {
    if (!enabled || !containerRef.current || mapRef.current) return;
    mapboxgl.accessToken = token;
    const map = new mapboxgl.Map({
      container: containerRef.current,
      style: "mapbox://styles/mapbox/streets-v12",
      projection: { name: "mercator" },
      center: [-83.0, 25.0],
      zoom: 4,
      attributionControl: false,
    });
    mapRef.current = map;
    map.addControl(new mapboxgl.NavigationControl(), "top-right");
    map.addControl(new mapboxgl.FullscreenControl(), "top-right");
    return () => {
      map.remove();
      mapRef.current = null;
      markersRef.current.clear();
      trailLayersRef.current.clear();
    };
  }, [enabled, token]);

  useEffect(() => {
    if (!mapRef.current) return;
    const map = mapRef.current;
    const live = new Set(containers.map((c) => c.id));

    for (const [id, m] of markersRef.current) {
      if (!live.has(id)) {
        m.remove();
        markersRef.current.delete(id);
      }
    }

    for (const id of trailLayersRef.current) {
      if (!live.has(id)) {
        const layerId = `trail-line-${id}`;
        const sourceId = `trail-${id}`;
        if (map.getLayer(layerId)) map.removeLayer(layerId);
        if (map.getSource(sourceId)) map.removeSource(sourceId);
        trailLayersRef.current.delete(id);
      }
    }

    const renderTrails = () => {
      if (!map.isStyleLoaded()) return;
      for (const c of containers) {
        if (c.trail.length < 2) continue;
        const sourceId = `trail-${c.id}`;
        const layerId = `trail-line-${c.id}`;
        const geojson: GeoJSON.Feature<GeoJSON.LineString> = {
          type: "Feature",
          properties: {},
          geometry: {
            type: "LineString",
            coordinates: c.trail.map((p) => [p.lng, p.lat]),
          },
        };
        const existing = map.getSource(sourceId) as
          | mapboxgl.GeoJSONSource
          | undefined;
        if (existing) {
          existing.setData(geojson);
        } else {
          map.addSource(sourceId, { type: "geojson", data: geojson });
          map.addLayer({
            id: layerId,
            type: "line",
            source: sourceId,
            layout: { "line-cap": "round", "line-join": "round" },
            paint: {
              "line-color": "#1e3a8a",
              "line-width": 3,
              "line-opacity": 0.6,
              "line-dasharray": [2, 1],
            },
          });
          trailLayersRef.current.add(c.id);
        }
      }
    };

    if (map.isStyleLoaded()) renderTrails();
    else map.once("load", renderTrails);

    for (const c of containers) {
      if (!c.lastLocation) continue;
      const existing = markersRef.current.get(c.id);
      if (existing) {
        existing.setLngLat([c.lastLocation.lng, c.lastLocation.lat]);
        existing.getElement().innerHTML = pinHtml(c, c.id === activeId);
        continue;
      }
      const el = document.createElement("div");
      el.className = "azh-public-tracking-pin";
      el.style.cssText = "cursor:pointer;";
      el.innerHTML = pinHtml(c, c.id === activeId);
      el.addEventListener("click", () => onSelect(c.id));
      const marker = new mapboxgl.Marker({ element: el, anchor: "bottom" })
        .setLngLat([c.lastLocation.lng, c.lastLocation.lat])
        .addTo(map);
      markersRef.current.set(c.id, marker);
    }

    const points: [number, number][] = [];
    for (const c of containers) {
      if (c.lastLocation)
        points.push([c.lastLocation.lng, c.lastLocation.lat]);
      if (c.originWarehouse)
        points.push([c.originWarehouse.lng, c.originWarehouse.lat]);
      if (c.destinationWarehouse)
        points.push([c.destinationWarehouse.lng, c.destinationWarehouse.lat]);
    }
    if (points.length > 1) {
      const bounds = new mapboxgl.LngLatBounds();
      for (const p of points) bounds.extend(p);
      map.fitBounds(bounds, { padding: 80, maxZoom: 11, duration: 600 });
    } else if (points.length === 1) {
      map.flyTo({ center: points[0], zoom: 9, duration: 600 });
    }
  }, [containers, activeId, onSelect]);

  useEffect(() => {
    if (!mapRef.current || !activeId) return;
    const c = containers.find((x) => x.id === activeId);
    if (!c?.lastLocation) return;
    mapRef.current.flyTo({
      center: [c.lastLocation.lng, c.lastLocation.lat],
      zoom: 12,
      duration: 600,
    });
  }, [activeId, containers]);

  if (!enabled) {
    return (
      <div className="grid h-[60vh] place-items-center rounded-2xl border border-amber-200 bg-amber-50 p-6 text-center text-sm text-amber-800">
        Configuración de mapa pendiente.
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="h-[55vh] min-h-[360px] overflow-hidden rounded-2xl border border-slate-200 shadow-sm sm:h-[60vh]"
    />
  );
}

function pinHtml(
  c: PublicTrackingResponse["containers"][number],
  active: boolean,
): string {
  const [base, dark] = active
    ? (["#10b981", "#047857"] as const)
    : (STATUS_COLOR[c.status] ?? STATUS_COLOR.in_transit);
  const num =
    c.containerNumber.length > 7
      ? c.containerNumber.slice(-7)
      : c.containerNumber;
  return `
    <svg viewBox="0 0 44 56" width="44" height="56"
         style="display:block;filter:drop-shadow(0 4px 8px rgba(13,27,61,0.4));">
      <defs>
        <linearGradient id="pubg-${c.id}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${base}"/>
          <stop offset="100%" stop-color="${dark}"/>
        </linearGradient>
      </defs>
      <path d="M6 0 H38 a6 6 0 0 1 6 6 V36 a6 6 0 0 1 -6 6 H28 L22 56 L16 42 H6 a6 6 0 0 1 -6 -6 V6 a6 6 0 0 1 6 -6 Z"
            fill="url(#pubg-${c.id})" stroke="white" stroke-width="2"/>
      <text x="22" y="26"
            text-anchor="middle"
            font-family="ui-monospace, SFMono-Regular, Menlo, Consolas, monospace"
            font-size="9"
            font-weight="700"
            fill="white"
            letter-spacing="-0.3">${num.replace(/[<>&]/g, "")}</text>
    </svg>
  `;
}

// ============================================================================
// Card por contenedor — status, dirección, milestones
// ============================================================================
function ContainerCard({
  c,
  active,
  onClick,
}: {
  c: PublicTrackingResponse["containers"][number];
  active: boolean;
  onClick: () => void;
}) {
  const [base] = STATUS_COLOR[c.status] ?? ["#1e3a8a"];
  const milestones = useMemo(() => {
    const m = c.milestones;
    return [
      { label: "Cargado", at: m.loadedAt },
      { label: "BOL emitido", at: m.bolIssuedAt },
      { label: "Despachado", at: m.dispatchedAt },
      { label: "Llegó al destino", at: m.arrivedAtDestinationAt },
    ];
  }, [c.milestones]);

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "w-full overflow-hidden rounded-2xl border bg-white p-4 text-left transition",
        active
          ? "border-emerald-300 ring-2 ring-emerald-200"
          : "border-slate-200 hover:border-navy-300 hover:shadow",
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <div className="font-mono text-sm font-bold text-navy-900">
          {c.containerNumber}
        </div>
        <span
          className="rounded-full px-2 py-0.5 text-[10px] font-semibold text-white"
          style={{ background: base }}
        >
          {STATUS_LABEL[c.status] ?? c.status}
        </span>
      </div>
      <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-0.5">
        {c.productName && (
          <span className="text-xs text-slate-500">{c.productName}</span>
        )}
        {c.poOrderNumber && (
          <span className="inline-flex items-center gap-1 rounded-full bg-navy-50 px-2 py-0.5 font-mono text-[10px] font-semibold text-navy-700 ring-1 ring-navy-100">
            PO {c.poOrderNumber}
          </span>
        )}
      </div>

      {c.lastLocation ? (
        <div className="mt-3 space-y-1 rounded-xl bg-slate-50 px-3 py-2 text-xs">
          <div className="flex items-start gap-1.5 text-navy-900">
            <MapPin className="mt-0.5 h-3 w-3 shrink-0 text-slate-400" />
            <span className="min-w-0 flex-1">
              {c.lastLocation.address ?? "Coordenadas en alta mar"}
            </span>
          </div>
          <div className="flex items-center gap-2 text-[10px] text-slate-500">
            <Navigation className="h-3 w-3" />
            <span>
              {new Date(c.lastLocation.seenAt).toLocaleString("es")}
              {c.lastLocation.speedMph != null &&
                ` · ${c.lastLocation.speedMph.toFixed(0)} mph`}
            </span>
          </div>
        </div>
      ) : (
        <p className="mt-3 rounded-xl bg-navy-50 px-3 py-2 text-xs text-navy-800">
          Esperando primer reporte GPS.
        </p>
      )}

      {(c.originWarehouse || c.destinationWarehouse) && (
        <div className="mt-3 flex items-center justify-between gap-2 text-[10px] text-slate-600">
          <div className="inline-flex items-center gap-1">
            <WarehouseIcon className="h-3 w-3" />
            {c.originWarehouse?.name ?? "—"}
          </div>
          <span className="text-slate-400">→</span>
          <div className="inline-flex items-center gap-1">
            {c.destinationWarehouse?.name ?? "—"}
            <WarehouseIcon className="h-3 w-3" />
          </div>
        </div>
      )}

      {milestones.some((m) => m.at) && (
        <ul className="mt-3 space-y-1 text-[11px]">
          {milestones.map((m) => (
            <li
              key={m.label}
              className={cn(
                "flex items-center justify-between",
                m.at ? "text-emerald-700" : "text-slate-400",
              )}
            >
              <span>{m.label}</span>
              <span>
                {m.at ? new Date(m.at).toLocaleDateString("es") : "—"}
              </span>
            </li>
          ))}
        </ul>
      )}
    </button>
  );
}
