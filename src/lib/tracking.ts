import { env } from "./env";

/**
 * Cliente del API público de tracking — mismo endpoint que consume el
 * frontend operativo azaharesfuel.com.
 *
 * El backend (`/public/tracking/:token`) acepta DOS formatos:
 *  - trackingToken: 32 chars hex (UUID sin guiones, el único id opaco
 *    que da datos del cliente — solo presente en el link del email).
 *  - bookingNumber: `CAT` + dígitos (ej. CAT40104033) emitido por
 *    Crowley.
 *
 * NO acepta order numbers (AZH-SO-XXXXXX) ni invoice numbers — la
 * auditoría detectó enumeración secuencial y se eliminó ese lookup.
 */

// ============================================================================
// Tipos — espejo de backend/src/.../public-tracking.dto y
// frontend/src/lib/api/types.ts (PublicTrackingResponse).
// ============================================================================
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

export type ContainerStatus =
  | "available"
  | "in_transit"
  | "in_vessel"
  | "delivered"
  | "maintenance";

export interface TimelineMeta {
  catNumbers?: string[];
}

export interface TimelineEvent {
  step: TimelineStep;
  at: string | null;
  meta?: TimelineMeta;
}

export interface PublicTrackingPing {
  lat: number;
  lng: number;
  recordedAt: string;
}

export interface PublicTrackingContainer {
  id: string;
  containerNumber: string;
  status: ContainerStatus;
  productName: string | null;
  poOrderNumber: string | null;
  lastLocation: {
    lat: number;
    lng: number;
    seenAt: string;
    address: string | null;
    speedMph: number | null;
  } | null;
  trail: PublicTrackingPing[];
  originWarehouse: { id: string; name: string; lat: number; lng: number } | null;
  destinationWarehouse: {
    id: string;
    name: string;
    lat: number;
    lng: number;
  } | null;
  milestones: {
    loadedAt: string | null;
    bolIssuedAt: string | null;
    dispatchedAt: string | null;
    arrivedAtDestinationAt: string | null;
  };
}

export interface PublicTrackingPurchaseOrder {
  id: string;
  orderNumber: string;
  containerNumber: string | null;
  containerStatus: ContainerStatus | null;
  timeline: TimelineEvent[];
}

export interface PublicTrackingResponse {
  order: {
    orderNumber: string;
    bookingNumber: string | null;
    status: string;
    createdAt: string;
    portOfLoading: string | null;
    portOfDischarge: string | null;
  };
  client: { legalName: string };
  containers: PublicTrackingContainer[];
  timeline: TimelineEvent[];
  purchaseOrders: PublicTrackingPurchaseOrder[];
  fetchedAt: string;
}

// ============================================================================
// Errores
// ============================================================================
export class TrackingNotFoundError extends Error {
  constructor(public readonly query: string) {
    super(`No encontramos resultados para "${query}".`);
    this.name = "TrackingNotFoundError";
  }
}

// ============================================================================
// Fetch
// ============================================================================
/**
 * GET /public/tracking/:token — devuelve el detalle completo (header,
 * timeline, containers, purchaseOrders). `value` puede ser un
 * trackingToken (32 hex) o un bookingNumber (CAT+dígitos).
 */
export async function fetchPublicTracking(
  raw: string,
): Promise<PublicTrackingResponse> {
  const q = raw.trim();
  if (!q || q.length < 6) {
    throw new TrackingNotFoundError(raw);
  }

  const r = await fetch(
    `${env.apiUrl}/public/tracking/${encodeURIComponent(q)}`,
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

// ============================================================================
// Timeline metadata — etiquetas + descripciones de cada paso. Mismo
// copy que el operativo para que el cliente vea idéntica narrativa.
// ============================================================================
export const TIMELINE_LABELS: Record<
  TimelineStep,
  { label: string; description: string }
> = {
  order_placed: {
    label: "Pedido registrado",
    description: "Tu orden fue creada en el sistema.",
  },
  quote_sent: {
    label: "Cotización enviada",
    description: "Te enviamos la cotización con los precios y términos.",
  },
  quote_accepted: {
    label: "Cotización aceptada",
    description: "Confirmaste los términos y el sistema generó la factura.",
  },
  payment_received: {
    label: "Pago recibido",
    description: "Registramos tu pago y lo verificamos.",
  },
  invoice_issued: {
    label: "Factura emitida",
    description: "Tu factura comercial ya está disponible.",
  },
  po_sent_to_supplier: {
    label: "Orden enviada al proveedor",
    description: "Azahares envió la orden de compra al proveedor.",
  },
  supplier_accepted: {
    label: "Proveedor aceptó la orden",
    description: "El proveedor confirmó la disponibilidad del producto.",
  },
  supplier_processing: {
    label: "Procesando por el proveedor",
    description:
      "El proveedor está preparando tu pedido y coordinando la operación interna.",
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
    label: "Contenedor cargado y sellado",
    description: "El producto fue cargado, sellado y está listo para despacho.",
  },
  bol_issued: {
    label: "Bill of Lading emitido",
    description: "El BOL fue emitido por la naviera.",
  },
  dispatched: {
    label: "En tránsito",
    description: "El contenedor salió del puerto de origen.",
  },
  arrived_at_destination: {
    label: "Llegó al destino",
    description: "El contenedor llegó al puerto de destino.",
  },
  delivered: {
    label: "Entregado",
    description: "El producto fue entregado a destino final.",
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

// ============================================================================
// Helpers
// ============================================================================
export const STATUS_LABEL: Record<ContainerStatus, string> = {
  available: "En yarda",
  in_transit: "En tránsito",
  in_vessel: "En barco",
  delivered: "Entregado",
  maintenance: "Mantenimiento",
};

export const STATUS_COLOR: Record<ContainerStatus, [string, string]> = {
  available: ["#10b981", "#047857"],
  in_transit: ["#1d4ed8", "#1e3a8a"],
  in_vessel: ["#1e3a8a", "#0d1b3d"],
  delivered: ["#10b981", "#047857"],
  maintenance: ["#0d1b3d", "#0a1430"],
};

/**
 * Índice del último step done (con timestamp). -1 si nada está done.
 * Todo step antes de este índice cuenta como done implícito aunque su
 * `at` sea null — esto evita que un step intermedio sin timestamp
 * aparezca "en curso" cuando ya hay actividad posterior.
 */
export function computeLastDoneIdx(timeline: TimelineEvent[]): number {
  for (let i = timeline.length - 1; i >= 0; i--) {
    if (timeline[i].at) return i;
  }
  return -1;
}
