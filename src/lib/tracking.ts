import { env } from "./env";

/**
 * Cliente del API público de tracking. Mismas rutas que ya consume el
 * frontend operativo (azaharesfuel.com) — no duplicamos lógica de
 * computar la timeline; el backend devuelve los pasos ya armados.
 */

export type TimelineStep =
  | "order_placed"
  | "quote_sent"
  | "quote_accepted"
  | "payment_received"
  | "invoice_issued"
  | "po_sent_to_supplier"
  | "supplier_accepted"
  | "supplier_processing"
  | "booking_requested"
  | "booking_confirmed"
  | "container_assigned"
  | "container_loaded"
  | "bol_issued"
  | "dispatched"
  | "arrived_at_destination"
  | "delivered";

export interface TimelineEvent {
  step: TimelineStep;
  at: string | null;
  meta?: { catNumbers?: string[] };
}

export interface PublicTrackingResponse {
  orderNumber: string;
  bookingNumber: string | null;
  clientLegalName: string | null;
  productSummary: string | null;
  fetchedAt: string;
  timeline: TimelineEvent[];
  containers?: unknown[];
  purchaseOrders?: Array<{
    id: string;
    orderNumber: string;
    timeline: TimelineEvent[];
  }>;
}

export class TrackingNotFoundError extends Error {
  constructor(public readonly query: string) {
    super(`No encontramos resultados para "${query}".`);
    this.name = "TrackingNotFoundError";
  }
}

/**
 * Busca tracking público. El backend acepta varios formatos:
 *  - CAT (CATXXXXXX) → busca POs con ese CAT asignado
 *  - Booking number (CAT...) → ditto
 *  - Order number (AZH-SO-XXXXXX o WGT-SO-XXXXXX) → busca SO
 *  - Token alfanumérico largo → tracking link directo
 *
 * Probamos primero el endpoint de tracking por número (más permisivo).
 * Si el backend devuelve 404, lanzamos TrackingNotFoundError para que
 * la UI muestre un mensaje claro sin romper.
 */
export async function fetchPublicTracking(
  raw: string,
): Promise<PublicTrackingResponse> {
  const q = raw.trim();
  if (!q) {
    throw new TrackingNotFoundError(raw);
  }

  // El backend expone /public/tracking/by-number?q=XYZ con búsqueda
  // unificada por order_number, booking_number o CAT. Si en algún
  // momento cambia el shape del endpoint, lo ajustamos acá sin tocar
  // la UI.
  const r = await fetch(
    `${env.apiUrl}/public/tracking/by-number?q=${encodeURIComponent(q)}`,
    { cache: "no-store" },
  );

  if (r.status === 404) {
    throw new TrackingNotFoundError(q);
  }
  if (!r.ok) {
    const text = await r.text().catch(() => "");
    throw new Error(
      `Error consultando tracking (${r.status}): ${text || r.statusText}`,
    );
  }
  return (await r.json()) as PublicTrackingResponse;
}

/**
 * Etiquetas de cada step del timeline (mismo orden y nombres que la
 * versión operativa para que el cliente vea la misma narrativa donde
 * sea que abra el tracking).
 */
export const TIMELINE_LABELS: Record<
  TimelineStep,
  { label: string; description: string }
> = {
  order_placed: {
    label: "Orden creada",
    description: "Recibimos tu pedido y lo cargamos en el sistema.",
  },
  quote_sent: {
    label: "Cotización enviada",
    description: "Te mandamos la cotización para que la revises.",
  },
  quote_accepted: {
    label: "Cotización aceptada",
    description: "Aceptaste la cotización — pasamos a facturación.",
  },
  payment_received: {
    label: "Pago recibido",
    description: "Recibimos el pago y lo verificamos.",
  },
  invoice_issued: {
    label: "Factura emitida",
    description: "Generamos la factura comercial de exportación.",
  },
  po_sent_to_supplier: {
    label: "PO enviada al proveedor",
    description: "Le pasamos la orden al proveedor de combustible.",
  },
  supplier_accepted: {
    label: "Proveedor aceptó",
    description: "El proveedor confirmó la PO y empieza la operación.",
  },
  supplier_processing: {
    label: "Procesando con el proveedor",
    description: "Coordinación interna previa al booking marítimo.",
  },
  booking_requested: {
    label: "Booking solicitado a Crowley",
    description: "Pedimos el booking marítimo al carrier.",
  },
  booking_confirmed: {
    label: "Booking confirmado",
    description: "Crowley confirmó el booking y asignó el espacio.",
  },
  container_assigned: {
    label: "Contenedor asignado",
    description: "Se asignó el iso-tanque que va a transportar tu producto.",
  },
  container_loaded: {
    label: "Contenedor cargado",
    description: "El producto está cargado, sellado y listo para despacho.",
  },
  bol_issued: {
    label: "Bill of Lading emitido",
    description: "El BOL fue emitido por la naviera.",
  },
  dispatched: {
    label: "Despachado",
    description: "El contenedor salió rumbo al puerto de destino.",
  },
  arrived_at_destination: {
    label: "Arribó al destino",
    description: "El contenedor llegó al puerto de destino.",
  },
  delivered: {
    label: "Entregado",
    description: "Tu pedido fue entregado al consignatario final.",
  },
};

export const TIMELINE_ORDER: TimelineStep[] = [
  "order_placed",
  "quote_sent",
  "quote_accepted",
  "payment_received",
  "invoice_issued",
  "po_sent_to_supplier",
  "supplier_accepted",
  "supplier_processing",
  "booking_requested",
  "booking_confirmed",
  "container_assigned",
  "container_loaded",
  "bol_issued",
  "dispatched",
  "arrived_at_destination",
  "delivered",
];

export function computeLastDoneIdx(timeline: TimelineEvent[]): number {
  for (let i = timeline.length - 1; i >= 0; i--) {
    if (timeline[i].at) return i;
  }
  return -1;
}
