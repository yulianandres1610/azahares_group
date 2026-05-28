import {
  ArrowRight,
  Boxes,
  Building2,
  Clock,
  Fuel,
  Mail,
  MapPin,
  MessageCircle,
  Package,
  Phone,
  Send,
  Shield,
  Ship,
} from "lucide-react";
import { HeroOrbs } from "@/components/HeroOrbs";
import { RevealOnScroll } from "@/components/RevealOnScroll";

export const metadata = {
  title: "Contacto · Azahares Import & Export",
  description:
    "Hablá con un ejecutivo de Azahares. Cotizaciones CIF en menos de 24 horas para combustible, alimentos, paquetería y logística general.",
};

const CHANNELS = [
  {
    icon: Phone,
    label: "Teléfono",
    value: "+1 (305) 714-0001",
    sub: "Lun-Vie · 9-18 EST",
    href: "tel:+13057140001",
  },
  {
    icon: Mail,
    label: "Email",
    value: "info@azaharesgroup.com",
    sub: "Respuesta < 24h",
    href: "mailto:info@azaharesgroup.com",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "Chat directo con ventas",
    sub: "Más rápido — minutos",
    href: "https://wa.me/13057140001",
  },
];

const SERVICE_OPTIONS = [
  { value: "combustible", label: "Combustible", icon: Fuel, desc: "Iso tanques" },
  { value: "alimentos", label: "Alimentos", icon: Boxes, desc: "Reefer + dry" },
  { value: "courier", label: "Courier", icon: Package, desc: "Paquetería" },
  { value: "logistica", label: "Logística", icon: Ship, desc: "FCL / LCL" },
];

const SCHEDULE = [
  { d: "Lun · Vie", h: "9:00 - 18:00", live: true },
  { d: "Sábado", h: "10:00 - 14:00", live: false },
  { d: "Domingo", h: "Cerrado", live: false },
];

const FAQ = [
  {
    q: "¿En cuánto tiempo recibo una cotización?",
    a: "Menos de 24 horas hábiles. Para envíos urgentes mismo día, mejor escribinos por WhatsApp y te respondemos en minutos.",
  },
  {
    q: "¿La cotización CIF realmente incluye todo?",
    a: "Sí — flete marítimo o aéreo, THC, ISPS, seguro, documentación BIS/EAR99, despacho aduanero y delivery hasta el almacén del consignatario final. Sin cargos sorpresa al arribo.",
  },
  {
    q: "¿Qué documentos necesito para arrancar?",
    a: "Identificación del consignatario (EIN, RFC, NIT o equivalente), Bill of Lading anterior si aplica, y especificación de mercadería. El resto lo generamos nosotros: Commercial Invoice Export, Packing List, DGD y BOL listos para aduana.",
  },
  {
    q: "¿A qué países exportan?",
    a: "Cobertura global con énfasis en el Caribe, Centroamérica y Sudamérica. Para destinos OFAC-restringidos gestionamos las licencias humanitarias correspondientes.",
  },
];

export default function ContactoPage() {
  return (
    <>
      {/* ───── HERO — split layout: copy a la izquierda + quick-channels glass
          flotando a la derecha. Tone navy gradient como el resto del sitio. */}
      <section className="hero-bg hero-bg-noise relative isolate overflow-hidden pt-24 pb-16 text-white sm:pt-32 sm:pb-24 lg:pt-36 lg:pb-28 xl:pt-40 xl:pb-32">
        <HeroOrbs />
        <div className="relative z-10 mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
          <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-14 xl:gap-20">
            <div className="text-center lg:text-left">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-white/90 backdrop-blur sm:text-[11px]">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inset-0 animate-ping rounded-full bg-success-400 opacity-75" />
                  <span className="relative h-2 w-2 rounded-full bg-success-400" />
                </span>
                Equipo en línea · Miami UTC-5
              </span>
              <h1 className="mt-5 font-serif text-[2.1rem] font-bold leading-[1.08] tracking-tight sm:text-[3.25rem] sm:leading-[1.05] lg:text-[3.5rem] xl:text-[4.25rem]">
                Hablemos sobre{" "}
                <span className="text-white/70">tu próximo envío.</span>
              </h1>
              <p className="mx-auto mt-4 max-w-xl text-[14px] leading-relaxed text-white/80 sm:mx-0 sm:mt-6 sm:text-base lg:text-[15.5px] xl:text-lg">
                Cotizaciones CIF cerradas en menos de 24 horas. Combustible,
                alimentos, paquetería o logística internacional — contanos qué
                necesitás mover y armamos la operación de punta a punta.
              </p>

              <div className="mx-auto mt-7 grid max-w-md grid-cols-3 gap-2.5 sm:mx-0 sm:mt-9 sm:max-w-lg sm:gap-3">
                {[
                  { v: "< 24h", l: "respuesta" },
                  { v: "100%", l: "precio CIF" },
                  { v: "8+", l: "años operando" },
                ].map((s) => (
                  <div
                    key={s.l}
                    className="glass-panel rounded-2xl px-2.5 py-3 text-center sm:px-3 sm:py-3.5"
                  >
                    <div className="font-serif text-[1.35rem] font-bold leading-tight text-white sm:text-[1.6rem] xl:text-2xl">
                      {s.v}
                    </div>
                    <div className="mt-0.5 text-[9.5px] font-semibold uppercase tracking-wider text-white/65 sm:text-[10px]">
                      {s.l}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              {CHANNELS.map((c) => (
                <a
                  key={c.label}
                  href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  className="group flex items-center gap-4 rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-xl transition hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/15 sm:p-5"
                >
                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-white/15 text-white shadow-inner sm:h-14 sm:w-14">
                    <c.icon className="h-5 w-5 sm:h-6 sm:w-6" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/60">
                      {c.label}
                    </div>
                    <div className="mt-0.5 truncate font-serif text-[15px] font-bold text-white sm:text-lg">
                      {c.value}
                    </div>
                    <div className="mt-0.5 text-[11px] text-white/55">
                      {c.sub}
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 shrink-0 text-white/40 transition group-hover:translate-x-1 group-hover:text-white" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ───── FORM SECTION — bento 12-col: form a la izquierda + sidebar
          con response time / mapa / horarios a la derecha. */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white via-white to-navy-50/40 py-16 sm:py-24 lg:py-28">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 10% 0%, rgba(29,58,138,0.06), transparent 60%), radial-gradient(ellipse 50% 50% at 90% 100%, rgba(29,58,138,0.05), transparent 60%)",
          }}
        />

        <div className="relative mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
          <RevealOnScroll className="mb-10 text-center sm:mb-14">
            <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-navy-600 sm:text-xs">
              Cotización
            </span>
            <h2 className="mt-3 font-serif text-[1.85rem] font-bold leading-[1.1] text-navy-900 sm:text-[2.25rem] lg:text-[2.75rem]">
              Una cotización en{" "}
              <span className="relative inline-block whitespace-nowrap">
                tres pasos
                <svg
                  aria-hidden
                  viewBox="0 0 200 12"
                  className="absolute -bottom-2 left-0 right-0 h-2 w-full"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M 0 6 Q 50 0, 100 6 T 200 6"
                    stroke="url(#contact-stroke)"
                    strokeWidth="3"
                    fill="none"
                    strokeLinecap="round"
                  />
                  <defs>
                    <linearGradient id="contact-stroke" x1="0" x2="1">
                      <stop offset="0%" stopColor="#8caadb" />
                      <stop offset="50%" stopColor="#1d3a8a" />
                      <stop offset="100%" stopColor="#8caadb" />
                    </linearGradient>
                  </defs>
                </svg>
              </span>
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-[15px] leading-relaxed text-slate-600 sm:text-base">
              Servicio, tus datos, detalles de operación. El equipo te responde
              con cotización CIF cerrada en menos de 24 horas hábiles.
            </p>
          </RevealOnScroll>

          <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
            {/* FORM CARD */}
            <RevealOnScroll className="lg:col-span-8" direction="right">
              <form
                action="mailto:info@azaharesgroup.com"
                method="post"
                encType="text/plain"
                className="relative overflow-hidden rounded-3xl border border-navy-100 bg-white p-5 shadow-[0_24px_60px_rgba(13,27,61,0.08)] sm:p-8 lg:p-10"
              >
                <div
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-navy-500 via-navy-700 to-navy-900"
                />

                <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="font-serif text-[1.5rem] font-bold text-navy-900 sm:text-[1.75rem]">
                      Pedir cotización CIF
                    </h3>
                    <p className="mt-1 text-[13px] text-slate-500 sm:text-sm">
                      Respondemos antes de 24h hábiles.
                    </p>
                  </div>
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-success-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-success-600">
                    <Shield className="h-3 w-3" />
                    Datos confidenciales
                  </div>
                </div>

                {/* PASO 1 — Servicio (radio cards) */}
                <fieldset className="mt-7">
                  <legend className="text-[11px] font-bold uppercase tracking-[0.2em] text-navy-700">
                    <span className="mr-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-navy-900 text-[10px] font-bold text-white">
                      1
                    </span>
                    Tipo de servicio
                  </legend>
                  <div className="mt-3 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                    {SERVICE_OPTIONS.map((opt, i) => (
                      <label key={opt.value} className="relative cursor-pointer">
                        <input
                          type="radio"
                          name="servicio"
                          value={opt.value}
                          defaultChecked={i === 0}
                          className="peer sr-only"
                        />
                        <div className="h-full rounded-2xl border-2 border-navy-100 bg-white p-3 text-center text-navy-900 transition-all duration-200 hover:-translate-y-0.5 hover:border-navy-300 peer-checked:border-navy-900 peer-checked:bg-navy-900 peer-checked:text-white peer-checked:shadow-[0_10px_30px_rgba(13,27,61,0.25)] sm:p-4">
                          <opt.icon
                            className="mx-auto h-5 w-5 sm:h-6 sm:w-6"
                            strokeWidth={2}
                          />
                          <div className="mt-2 text-[12px] font-bold leading-tight sm:text-[13px]">
                            {opt.label}
                          </div>
                          <div className="mt-0.5 text-[10px] opacity-60">
                            {opt.desc}
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>
                </fieldset>

                {/* PASO 2 — Datos personales */}
                <fieldset className="mt-7">
                  <legend className="text-[11px] font-bold uppercase tracking-[0.2em] text-navy-700">
                    <span className="mr-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-navy-900 text-[10px] font-bold text-white">
                      2
                    </span>
                    Tus datos
                  </legend>
                  <div className="mt-3 grid gap-3 sm:grid-cols-2 sm:gap-4">
                    <FloatingField label="Nombre completo" name="nombre" required />
                    <FloatingField label="Empresa" name="empresa" />
                    <FloatingField label="Email" name="email" type="email" required />
                    <FloatingField label="Teléfono / WhatsApp" name="telefono" />
                  </div>
                </fieldset>

                {/* PASO 3 — Operación */}
                <fieldset className="mt-7">
                  <legend className="text-[11px] font-bold uppercase tracking-[0.2em] text-navy-700">
                    <span className="mr-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-navy-900 text-[10px] font-bold text-white">
                      3
                    </span>
                    Operación
                  </legend>
                  <div className="mt-3 grid gap-3 sm:grid-cols-2 sm:gap-4">
                    <FloatingField label="Origen (ciudad / puerto)" name="origen" />
                    <FloatingField label="Destino (ciudad / puerto)" name="destino" />
                  </div>
                  <div className="mt-4">
                    <label className="block text-[11px] font-bold uppercase tracking-[0.18em] text-navy-700">
                      Detalles del envío
                    </label>
                    <textarea
                      name="mensaje"
                      rows={4}
                      placeholder="Volumen, fecha aproximada, tipo de mercadería, requerimientos especiales…"
                      className="mt-2 w-full rounded-2xl border border-navy-200 bg-white px-4 py-3 text-sm leading-relaxed text-navy-900 placeholder:text-slate-400 outline-none transition focus:border-navy-500 focus:shadow-[0_0_0_4px_rgba(29,58,138,0.1)]"
                    />
                  </div>
                </fieldset>

                {/* SUBMIT */}
                <div className="mt-8 flex flex-col-reverse items-stretch gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-2 text-[12px] text-slate-500">
                    <Clock className="h-3.5 w-3.5 text-navy-600" />
                    <span>Respuesta &lt; 24h hábiles</span>
                  </div>
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-navy-900 bg-navy-900 px-7 py-3.5 text-sm font-bold text-white shadow-[0_10px_30px_rgba(13,27,61,0.28)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-white hover:text-navy-900"
                  >
                    <Send className="h-4 w-4" />
                    Enviar consulta
                  </button>
                </div>

                <p className="mt-4 text-[11px] leading-relaxed text-slate-400">
                  Al enviar abrirá un email pre-armado a info@azaharesgroup.com.
                  Tus datos no se comparten con terceros.
                </p>
              </form>
            </RevealOnScroll>

            {/* SIDEBAR */}
            <div className="space-y-5 lg:col-span-4">
              {/* Response time card — dark */}
              <RevealOnScroll delay={0.1}>
                <div className="relative overflow-hidden rounded-3xl border border-navy-100 bg-gradient-to-br from-navy-900 to-navy-700 p-6 text-white shadow-[0_24px_60px_rgba(13,27,61,0.2)] sm:p-7">
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white/5 blur-2xl"
                  />
                  <div className="relative">
                    <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white/85 backdrop-blur">
                      <span className="relative flex h-2 w-2">
                        <span className="absolute inset-0 animate-ping rounded-full bg-success-400 opacity-75" />
                        <span className="relative h-2 w-2 rounded-full bg-success-400" />
                      </span>
                      Equipo en línea
                    </div>
                    <div className="mt-5 font-serif text-[2.75rem] font-bold leading-none tracking-tight">
                      &lt; 24h
                    </div>
                    <div className="mt-2 text-sm font-semibold text-white/85">
                      Tiempo de respuesta promedio
                    </div>
                    <p className="mt-2.5 text-[13px] leading-relaxed text-white/65">
                      Para envíos urgentes mismo día, mejor escribinos por
                      WhatsApp directo — respondemos en minutos.
                    </p>
                    <a
                      href="https://wa.me/13057140001"
                      target="_blank"
                      rel="noreferrer"
                      className="mt-5 inline-flex items-center gap-2 rounded-full border-2 border-white bg-white px-5 py-2.5 text-[13px] font-bold text-navy-900 shadow-[0_10px_30px_rgba(0,0,0,0.18)] transition hover:-translate-y-0.5 hover:bg-transparent hover:text-white"
                    >
                      <MessageCircle className="h-4 w-4" />
                      WhatsApp express
                    </a>
                  </div>
                </div>
              </RevealOnScroll>

              {/* Office card with stylized map */}
              <RevealOnScroll delay={0.2}>
                <div className="overflow-hidden rounded-3xl border border-navy-100 bg-white shadow-[0_18px_44px_rgba(13,27,61,0.08)]">
                  <div className="relative h-32 bg-gradient-to-br from-navy-50 to-navy-100 sm:h-36">
                    <svg
                      aria-hidden
                      className="absolute inset-0 h-full w-full opacity-50"
                      viewBox="0 0 400 144"
                      preserveAspectRatio="xMidYMid slice"
                    >
                      <defs>
                        <pattern
                          id="map-grid"
                          width="20"
                          height="20"
                          patternUnits="userSpaceOnUse"
                        >
                          <path
                            d="M 20 0 L 0 0 0 20"
                            fill="none"
                            stroke="#1d3a8a"
                            strokeWidth="0.4"
                          />
                        </pattern>
                      </defs>
                      <rect width="400" height="144" fill="url(#map-grid)" />
                      <path
                        d="M 0 80 Q 100 60, 200 90 T 400 70"
                        stroke="#5a82c8"
                        strokeWidth="2"
                        fill="none"
                        opacity="0.5"
                      />
                      <path
                        d="M 60 0 L 90 144"
                        stroke="#5a82c8"
                        strokeWidth="1.5"
                        fill="none"
                        opacity="0.4"
                      />
                      <path
                        d="M 250 0 L 285 144"
                        stroke="#5a82c8"
                        strokeWidth="1.5"
                        fill="none"
                        opacity="0.4"
                      />
                    </svg>
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[60%]">
                      <div className="relative">
                        <div className="absolute inset-0 animate-ping rounded-full bg-navy-500 opacity-30" />
                        <div className="relative grid h-11 w-11 place-items-center rounded-full bg-navy-900 text-white shadow-[0_10px_28px_rgba(13,27,61,0.4)]">
                          <MapPin className="h-5 w-5" strokeWidth={2.4} />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-5 sm:p-6">
                    <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-navy-600">
                      Oficina central
                    </div>
                    <div className="mt-1.5 flex items-center gap-2 font-serif text-lg font-bold text-navy-900">
                      <Building2 className="h-4 w-4 text-navy-700" />
                      Miami, Florida
                    </div>
                    <div className="mt-2 text-[13px] leading-relaxed text-slate-600">
                      4221 SW 74 CT
                      <br />
                      Miami, FL 33155 · USA
                    </div>
                    <a
                      href="https://maps.google.com/?q=4221+SW+74+CT+Miami+FL+33155"
                      target="_blank"
                      rel="noreferrer"
                      className="mt-3 inline-flex items-center gap-1 text-[12px] font-bold text-navy-700 transition hover:text-navy-900"
                    >
                      Ver en Google Maps
                      <ArrowRight className="h-3 w-3" />
                    </a>
                  </div>
                </div>
              </RevealOnScroll>

              {/* Schedule card */}
              <RevealOnScroll delay={0.3}>
                <div className="rounded-3xl border border-navy-100 bg-white p-5 shadow-[0_18px_44px_rgba(13,27,61,0.06)] sm:p-6">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-navy-700" />
                    <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-navy-600">
                      Horario de atención
                    </div>
                  </div>
                  <ul className="mt-3 space-y-2 text-[13px]">
                    {SCHEDULE.map((row) => (
                      <li
                        key={row.d}
                        className="flex items-center justify-between"
                      >
                        <span className="font-semibold text-navy-900">
                          {row.d}
                        </span>
                        <span className="flex items-center gap-1.5 font-mono tabular-nums text-slate-600">
                          {row.live && (
                            <span className="relative flex h-1.5 w-1.5">
                              <span className="absolute inset-0 animate-ping rounded-full bg-success-500 opacity-75" />
                              <span className="relative h-1.5 w-1.5 rounded-full bg-success-500" />
                            </span>
                          )}
                          {row.h}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-3 text-[11px] text-slate-500">
                    Hora del este de USA · UTC-5
                  </div>
                </div>
              </RevealOnScroll>
            </div>
          </div>
        </div>
      </section>

      {/* ───── FAQ ─────
          <details> nativos sin client-side state — accordion accesible. */}
      <section className="relative overflow-hidden bg-navy-50/40 py-16 sm:py-24 lg:py-28">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-navy-300/60 to-transparent" />
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
          <RevealOnScroll className="mb-10 text-center sm:mb-12">
            <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-navy-600 sm:text-xs">
              Preguntas frecuentes
            </span>
            <h2 className="mt-3 font-serif text-[1.85rem] font-bold leading-[1.1] text-navy-900 sm:text-[2.25rem] lg:text-[2.75rem]">
              Antes de arrancar
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-relaxed text-slate-600 sm:text-base">
              Las dudas más comunes que recibimos antes de abrir una operación.
            </p>
          </RevealOnScroll>

          <div className="mx-auto max-w-3xl space-y-3">
            {FAQ.map((item, i) => (
              <RevealOnScroll key={item.q} delay={i * 0.08}>
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

          {/* Fallback CTA */}
          <RevealOnScroll className="mx-auto mt-12 max-w-2xl text-center" delay={0.4}>
            <p className="text-[14px] text-slate-600">
              ¿Tu pregunta no está acá?
            </p>
            <a
              href="https://wa.me/13057140001"
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-flex items-center gap-2 rounded-full border-2 border-navy-900 bg-transparent px-6 py-3 text-sm font-bold text-navy-900 transition-all duration-200 hover:-translate-y-0.5 hover:bg-navy-900 hover:text-white"
            >
              <MessageCircle className="h-4 w-4" />
              Preguntar por WhatsApp
            </a>
          </RevealOnScroll>
        </div>
      </section>
    </>
  );
}

/**
 * Floating-label input — el label arranca como placeholder y flota arriba
 * cuando el input está focused o tiene contenido. Truco: placeholder=" "
 * (espacio) hace que peer-placeholder-shown matchee SOLO cuando el input
 * está vacío.
 */
function FloatingField({
  label,
  name,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div className="relative">
      <input
        id={name}
        type={type}
        name={name}
        required={required}
        placeholder=" "
        className="peer block h-[58px] w-full rounded-2xl border border-navy-200 bg-white px-4 pt-5 pb-1.5 text-sm text-navy-900 placeholder:text-transparent outline-none transition focus:border-navy-500 focus:shadow-[0_0_0_4px_rgba(29,58,138,0.1)]"
      />
      <label
        htmlFor={name}
        className="pointer-events-none absolute left-4 top-2 text-[10px] font-bold uppercase tracking-[0.12em] text-navy-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-[13px] peer-placeholder-shown:font-medium peer-placeholder-shown:normal-case peer-placeholder-shown:tracking-normal peer-placeholder-shown:text-slate-400 peer-focus:top-2 peer-focus:translate-y-0 peer-focus:text-[10px] peer-focus:font-bold peer-focus:uppercase peer-focus:tracking-[0.12em] peer-focus:text-navy-600"
      >
        {label}
        {required && <span className="ml-1 text-navy-500">*</span>}
      </label>
    </div>
  );
}
