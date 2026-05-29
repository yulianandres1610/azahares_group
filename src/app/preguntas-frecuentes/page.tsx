import Link from "next/link";
import {
  ArrowRight,
  ClipboardCheck,
  CreditCard,
  FileCheck2,
  HeadphonesIcon,
  Mail,
  MessageCircle,
  Search,
  Ship,
  type LucideIcon,
} from "lucide-react";
import { HeroOrbs } from "@/components/HeroOrbs";
import { RevealOnScroll } from "@/components/RevealOnScroll";

export const metadata = {
  title: "Preguntas frecuentes · Azahares Import & Export",
  description:
    "Respuestas a las dudas más comunes sobre tracking, cotizaciones, documentación, pagos y soporte de Azahares Import & Export.",
};

interface FaqItem {
  q: string;
  a: string;
}

interface FaqCategory {
  id: string;
  title: string;
  icon: LucideIcon;
  description: string;
  items: FaqItem[];
}

const CATEGORIES: FaqCategory[] = [
  {
    id: "tracking",
    title: "Tracking y seguimiento",
    icon: Search,
    description:
      "Cómo rastrear tu envío, qué códigos acepta el sistema y cómo interpretar el timeline.",
    items: [
      {
        q: "¿Dónde encuentro mi número de booking (CAT)?",
        a: "El número CAT es emitido por Crowley (la naviera) cuando confirman el booking marítimo de tu pedido. Llega en el email de confirmación que te enviamos al asignar el iso-tanque. Tiene el formato CAT seguido de dígitos, por ejemplo CAT40104033.",
      },
      {
        q: "¿Qué es el token de tracking?",
        a: "Es un identificador único de 32 caracteres hexadecimales que generamos para cada pedido y enviamos como link directo en todos los emails relacionados con tu operación. Al hacer click en el botón \"Ver tracking\" del email, abre la página con el token ya cargado — no necesitás escribir nada.",
      },
      {
        q: "¿Por qué el sistema no acepta mi número de orden AZH-SO-…?",
        a: "Por seguridad. Los números de orden son secuenciales (AZH-SO-000001, 000002, etc.) y permitirían a un atacante iterar y leer tracking de pedidos ajenos. Solo aceptamos identificadores con entropía suficiente: token de 32 hex o booking CAT de Crowley.",
      },
      {
        q: "¿Con qué frecuencia se actualiza la ubicación GPS?",
        a: "Cada contenedor reporta su posición vía satélite Samsara cada hora aproximadamente. La página de tracking refresca los datos automáticamente cada 60 segundos, así que vas a ver la última posición conocida sin recargar.",
      },
      {
        q: "¿Qué significa cada estado del timeline?",
        a: "El timeline tiene 16 hitos que cubren todo el ciclo: desde el pedido inicial, pasando por cotización, pago, factura, coordinación con el proveedor de combustible, booking marítimo con Crowley, asignación y carga del contenedor, BOL, despacho y entrega final al consignatario. Cada hito se marca verde cuando el sistema detecta el evento real.",
      },
      {
        q: "Mi pedido tiene varios contenedores. ¿Cómo los rastreo?",
        a: "Cuando una orden tiene 2 o más iso-tanques (cada uno es una purchase order separada), aparece un selector arriba del timeline para alternar entre la vista combinada y el seguimiento individual de cada contenedor. Cada uno se procesa por separado por el proveedor y tiene su propia ubicación GPS.",
      },
    ],
  },
  {
    id: "cotizaciones",
    title: "Cotizaciones y precios CIF",
    icon: ClipboardCheck,
    description:
      "Qué incluye el precio CIF, tiempos de respuesta y cómo manejamos las cotizaciones.",
    items: [
      {
        q: "¿En cuánto tiempo recibo una cotización?",
        a: "Menos de 24 horas hábiles. Para envíos urgentes mismo día, escribinos por WhatsApp y respondemos en minutos con un estimado rápido y cotización formal apenas la confirmes.",
      },
      {
        q: "¿La cotización CIF realmente incluye todo?",
        a: "Sí. CIF (Cost, Insurance & Freight) en nuestra modalidad cubre flete marítimo o aéreo, THC (Terminal Handling Charges), ISPS, seguro de carga, documentación BIS/EAR99, despacho aduanero en destino y la última milla hasta el almacén del consignatario final. Sin cargos sorpresa al arribo.",
      },
      {
        q: "¿Cobran por hacer cotizaciones?",
        a: "No. La cotización es gratuita y sin obligación. Solo te respondemos con números cerrados — vos decidís si avanzar o no.",
      },
      {
        q: "¿Cómo me cotizan varios productos en un mismo envío?",
        a: "Mandanos la lista completa con cantidades y especificaciones. Cotizamos línea por línea y armamos el consolidado en un mismo contenedor cuando es viable (combustibles tienen restricciones de mezcla por seguridad, alimentos no).",
      },
    ],
  },
  {
    id: "documentacion",
    title: "Documentación y compliance",
    icon: FileCheck2,
    description:
      "Qué documentos generamos, cuáles necesitamos de tu lado y cómo manejamos OFAC.",
    items: [
      {
        q: "¿Qué documentos necesito como cliente?",
        a: "Identificación fiscal del consignatario (EIN para Estados Unidos, RFC para México, NIT para Cuba, o equivalente). Si tuviste operaciones previas con otro proveedor, el Bill of Lading anterior ayuda a acelerar el proceso. Y la especificación detallada de la mercadería.",
      },
      {
        q: "¿Quién emite la Commercial Invoice?",
        a: "La emitimos nosotros con tu sello, formato y datos del consignatario. La generamos siguiendo el formato exigido por la naviera y por las autoridades aduaneras del país de destino. Vas a verla disponible en tu portal cuando esté lista.",
      },
      {
        q: "¿Manejan licencias OFAC?",
        a: "Sí. Para destinos OFAC-restringidos (como Cuba) gestionamos las licencias humanitarias correspondientes. Trabajamos exclusivamente con cargas que califican bajo las excepciones legales aplicables — combustible para uso humanitario, alimentos básicos, equipamiento médico.",
      },
      {
        q: "¿Qué pasa si el destino requiere certificaciones especiales?",
        a: "Coordinamos con laboratorios y entidades certificadoras para cargas que requieran análisis de calidad (combustibles), certificado fitosanitario (alimentos), o documentación específica para mercaderías controladas. El costo se incluye en la cotización CIF original.",
      },
    ],
  },
  {
    id: "pagos",
    title: "Pagos y facturación",
    icon: CreditCard,
    description: "Métodos aceptados, tiempos de verificación y opciones.",
    items: [
      {
        q: "¿Qué métodos de pago aceptan?",
        a: "Transferencia bancaria internacional (wire transfer) en USD a nuestra cuenta operativa en Miami. Para clientes recurrentes podemos acordar plazos de pago — todo se documenta en la cotización aceptada.",
      },
      {
        q: "¿Cómo verifican un pago recibido?",
        a: "Una vez que el banco confirma la acreditación, el equipo de billing marca el pago en el sistema y vos recibís un email automático con la confirmación. Para pagos vía broker, el broker carga el comprobante en su portal y nosotros lo verificamos antes de avanzar.",
      },
      {
        q: "¿Aceptan pagos de terceros?",
        a: "Por compliance bancario y OFAC, solo aceptamos pagos del cliente cuyo tax ID figura en la factura, salvo que haya una relación documentada (carta de instrucción, broker autorizado). Si tenés una estructura particular, consultanos antes para validar.",
      },
    ],
  },
  {
    id: "operacion",
    title: "Servicios y operación",
    icon: Ship,
    description: "Cobertura, modalidades y alcance del servicio end-to-end.",
    items: [
      {
        q: "¿Qué servicios ofrece Azahares?",
        a: "Cuatro verticales: combustible en iso tanques (gasolina, diésel, jet fuel); contenedores de alimentos (reefer y dry); courier y paquetería puerta a puerta; logística internacional general (cargas FCL y LCL, despacho aduanero, documentación, última milla).",
      },
      {
        q: "¿A qué países exportan?",
        a: "Cobertura global con foco en Caribe, Centroamérica y Sudamérica. Tenemos red operativa más densa en Cuba, República Dominicana, Honduras, Guatemala, Nicaragua, Colombia y Venezuela. Para otros destinos cotizamos caso por caso.",
      },
      {
        q: "¿Pueden coordinar la última milla en destino?",
        a: "Sí. Tenemos red de partners verificados en cada destino frecuente — el contenedor llega al puerto, despachan en aduana y nuestro partner local lo entrega al almacén del consignatario. Vos solo tenés que recibir.",
      },
      {
        q: "¿Hay volumen mínimo o máximo?",
        a: "Para combustible: 1 iso tanque (≈23.848 L / 6.300 GAL) es la unidad mínima. Para alimentos: aceptamos desde 1 m³ vía consolidado LCL hasta 40 ft FCL. Para courier: 1 lb mínimo, 70 lb máximo por bulto. No tenemos máximo total — armamos múltiples contenedores si la operación lo requiere.",
      },
    ],
  },
  {
    id: "soporte",
    title: "Soporte y atención",
    icon: HeadphonesIcon,
    description: "Canales de contacto y horarios de atención.",
    items: [
      {
        q: "¿Cómo contacto al equipo en una emergencia?",
        a: "Por WhatsApp al +1 (305) 714-0001. Para situaciones críticas fuera de horario hábil (contenedor demorado en puerto, problema documental, urgencia OFAC), el equipo de guardia responde en menos de una hora.",
      },
      {
        q: "¿Tienen horario de atención?",
        a: "Lunes a viernes de 9:00 a 18:00 hora del este de USA (UTC-5). Sábados de 10:00 a 14:00 para urgencias. Domingos cerrado, pero el WhatsApp queda monitoreado para emergencias.",
      },
      {
        q: "¿Puedo hablar con alguien en español?",
        a: "Sí. Todo el equipo opera en español como idioma principal. También atendemos en inglés si tu equipo lo prefiere.",
      },
    ],
  },
];

export default function FaqPage() {
  return (
    <>
      {/* ───── HERO ───── */}
      <section className="hero-bg hero-bg-noise relative isolate overflow-hidden pt-28 pb-16 text-white sm:pt-36 sm:pb-20 lg:pt-40 lg:pb-24">
        <HeroOrbs />
        <div className="relative z-10 mx-auto max-w-[1400px] px-5 text-center sm:px-8 sm:text-left lg:px-12">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white/85 backdrop-blur sm:text-[11px]">
            Preguntas frecuentes
          </span>
          <h1 className="mt-5 font-serif text-[2.5rem] font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-[3.5rem] xl:text-[4.25rem]">
            Las dudas más comunes,{" "}
            <span className="text-white/70">resueltas.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-[15px] leading-relaxed text-white/80 sm:mx-0 sm:text-base lg:text-lg">
            Respuestas sobre tracking, cotizaciones CIF, documentación, pagos
            y soporte. Si no encontrás lo que buscás, escribinos por WhatsApp
            o email — respondemos en menos de 24 horas hábiles.
          </p>
        </div>
      </section>

      {/* ───── CATEGORÍAS — nav anchor pills ───── */}
      <section className="sticky top-[60px] z-30 border-b border-navy-100 bg-white/85 backdrop-blur-xl sm:top-[72px]">
        <div className="mx-auto max-w-[1400px] px-5 py-3 sm:px-8 lg:px-12">
          <div className="flex flex-wrap gap-2 overflow-x-auto">
            {CATEGORIES.map((cat) => (
              <a
                key={cat.id}
                href={`#${cat.id}`}
                className="group inline-flex items-center gap-1.5 rounded-full border border-navy-100 bg-white px-3 py-1.5 text-[11px] font-bold text-navy-700 transition hover:-translate-y-0.5 hover:border-navy-300 hover:bg-navy-50 sm:text-[12px]"
              >
                <cat.icon className="h-3.5 w-3.5" strokeWidth={2.2} />
                {cat.title}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ───── FAQ POR CATEGORÍA ───── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white via-white to-navy-50/40 py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
          <div className="space-y-16 lg:space-y-20">
            {CATEGORIES.map((cat, catIdx) => (
              <section
                key={cat.id}
                id={cat.id}
                className="scroll-mt-32 sm:scroll-mt-36"
              >
                <RevealOnScroll>
                  <div className="grid gap-8 lg:grid-cols-[1fr_2fr] lg:gap-12">
                    {/* Sidebar de la categoría */}
                    <div>
                      <div className="sticky top-[140px] sm:top-[152px]">
                        <div className="flex items-center gap-3">
                          <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-navy-900 text-white shadow-[0_10px_24px_rgba(13,27,61,0.28)]">
                            <cat.icon className="h-5 w-5" strokeWidth={2.2} />
                          </div>
                          <div className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-navy-500">
                            0{catIdx + 1}
                          </div>
                        </div>
                        <h2 className="mt-4 font-serif text-2xl font-bold leading-tight text-navy-900 sm:text-[1.75rem]">
                          {cat.title}
                        </h2>
                        <p className="mt-3 text-[14px] leading-relaxed text-slate-600">
                          {cat.description}
                        </p>
                      </div>
                    </div>

                    {/* Lista de Q&A */}
                    <div className="space-y-3">
                      {cat.items.map((item, i) => (
                        <RevealOnScroll key={item.q} delay={i * 0.05}>
                          <details className="group rounded-2xl border border-navy-100 bg-white p-5 transition hover:border-navy-200 hover:shadow-[0_18px_44px_rgba(13,27,61,0.06)] sm:p-6">
                            <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                              <span className="font-serif text-[15px] font-bold text-navy-900 sm:text-base">
                                {item.q}
                              </span>
                              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-navy-200 bg-white text-navy-700 transition group-open:rotate-45 group-open:border-navy-900 group-open:bg-navy-900 group-open:text-white">
                                <svg
                                  viewBox="0 0 12 12"
                                  className="h-3 w-3"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                >
                                  <path d="M6 2v8M2 6h8" strokeLinecap="round" />
                                </svg>
                              </span>
                            </summary>
                            <p className="mt-4 text-[14px] leading-relaxed text-slate-600">
                              {item.a}
                            </p>
                          </details>
                        </RevealOnScroll>
                      ))}
                    </div>
                  </div>
                </RevealOnScroll>
              </section>
            ))}
          </div>
        </div>
      </section>

      {/* ───── CTA FINAL ───── */}
      <section className="relative overflow-hidden bg-navy-50/40 py-16 sm:py-20 lg:py-24">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-navy-300/60 to-transparent" />
        <div className="mx-auto max-w-3xl px-5 text-center sm:px-8 lg:px-12">
          <RevealOnScroll>
            <span className="inline-flex items-center gap-2 rounded-full border border-navy-200 bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-navy-700 shadow-[0_4px_18px_rgba(13,27,61,0.08)] sm:text-[11px]">
              <span className="relative flex h-2 w-2">
                <span className="absolute inset-0 animate-ping rounded-full bg-success-500 opacity-75" />
                <span className="relative h-2 w-2 rounded-full bg-success-500" />
              </span>
              Equipo en línea
            </span>
            <h2 className="mt-4 font-serif text-[1.85rem] font-bold leading-tight text-navy-900 sm:text-[2.25rem] lg:text-[2.5rem]">
              ¿Tu pregunta no está acá?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-slate-600 sm:text-base">
              Respondemos en menos de 24 horas hábiles por email y en minutos
              por WhatsApp durante horario de oficina.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a
                href="https://wa.me/13057140001"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border-2 border-navy-900 bg-navy-900 px-7 py-3 text-sm font-bold text-white shadow-[0_10px_30px_rgba(13,27,61,0.28)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-white hover:text-navy-900"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp directo
              </a>
              <Link
                href="/contacto"
                className="inline-flex items-center gap-2 rounded-full border-2 border-navy-900 bg-transparent px-7 py-3 text-sm font-bold text-navy-900 transition-all duration-200 hover:-translate-y-0.5 hover:bg-navy-900 hover:text-white"
              >
                <Mail className="h-4 w-4" />
                Formulario de contacto
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </>
  );
}
