import { Mail, MapPin, MessageCircle, Phone, Send } from "lucide-react";
import { HeroOrbs } from "@/components/HeroOrbs";
import { RevealOnScroll } from "@/components/RevealOnScroll";

export const metadata = {
  title: "Contacto · Azahares Import & Export",
  description:
    "Hablá con un ejecutivo de Azahares. Cotizaciones CIF para importación y exportación internacional.",
};

const CHANNELS = [
  {
    icon: Phone,
    label: "Teléfono / WhatsApp",
    value: "+1 (305) 714-0001",
    href: "tel:+13057140001",
  },
  {
    icon: Mail,
    label: "Email",
    value: "info@azaharesgroup.com",
    href: "mailto:info@azaharesgroup.com",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp directo",
    value: "Chatear con ventas",
    href: "https://wa.me/13057140001",
  },
];

export default function ContactoPage() {
  return (
    <>
      <section className="hero-bg hero-bg-noise relative isolate overflow-hidden pt-28 pb-14 text-white sm:pt-36 sm:pb-20 lg:pt-40 lg:pb-24">
        <HeroOrbs />
        <div className="relative z-10 mx-auto max-w-[1400px] px-5 text-center sm:px-8 sm:text-left lg:px-12">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white/85 backdrop-blur sm:text-[11px]">
            Contacto
          </span>
          <h1 className="mt-5 font-serif text-[2.5rem] font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-[3.5rem] xl:text-[4.25rem]">
            Conversemos.
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-[15px] leading-relaxed text-white/80 sm:mx-0 sm:text-base lg:text-lg">
            Cotizaciones CIF en menos de 24 horas. Coordinamos combustible,
            alimentos, paquetería y logística general — contanos qué necesitás
            mover.
          </p>
        </div>
      </section>

      <section className="bg-slate-50 py-16 sm:py-24">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
            <RevealOnScroll direction="right">
              <div className="space-y-6">
                {CHANNELS.map((c) => (
                  <a
                    key={c.label}
                    href={c.href}
                    target={c.href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                    className="group flex items-center gap-4 rounded-3xl border border-navy-100 bg-white p-5 shadow-[0_8px_24px_rgba(13,27,61,0.06)] transition hover:-translate-y-1 hover:shadow-[0_18px_44px_rgba(13,27,61,0.14)]"
                  >
                    <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-navy-900 text-white shadow-[0_8px_20px_rgba(13,27,61,0.25)]">
                      <c.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                        {c.label}
                      </div>
                      <div className="mt-0.5 font-serif text-lg font-bold text-navy-900 transition group-hover:text-navy-700">
                        {c.value}
                      </div>
                    </div>
                  </a>
                ))}

                <div className="rounded-3xl border border-navy-100 bg-navy-50/60 p-5">
                  <div className="flex items-start gap-3">
                    <MapPin className="mt-0.5 h-5 w-5 text-navy-700" />
                    <div>
                      <div className="text-[11px] font-bold uppercase tracking-wider text-navy-700">
                        Oficina Miami
                      </div>
                      <div className="mt-1 font-semibold text-navy-900">
                        4221 SW 74 CT
                        <br />
                        Miami, FL 33155 · USA
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </RevealOnScroll>

            <RevealOnScroll direction="left">
              <form
                action="mailto:info@azaharesgroup.com"
                method="post"
                encType="text/plain"
                className="rounded-3xl border border-navy-100 bg-white p-6 shadow-[0_18px_44px_rgba(13,27,61,0.08)] sm:p-8"
              >
                <h2 className="font-serif text-2xl font-bold text-navy-900">
                  Pedir cotización CIF
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Contanos qué necesitás mover y te respondemos rápido.
                </p>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <Field label="Nombre completo" name="nombre" required />
                  <Field label="Empresa" name="empresa" />
                  <Field label="Email" name="email" type="email" required />
                  <Field label="Teléfono / WhatsApp" name="telefono" />
                </div>

                <div className="mt-4">
                  <label className="block text-xs font-bold uppercase tracking-wider text-navy-700">
                    Tipo de servicio
                  </label>
                  <select
                    name="servicio"
                    className="mt-2 h-12 w-full rounded-2xl border border-navy-200 bg-white px-4 text-sm text-navy-900 outline-none transition focus:border-navy-500 focus:shadow-[0_0_0_4px_rgba(29,58,138,0.1)]"
                  >
                    <option>Combustible — iso tanques</option>
                    <option>Contenedores de alimentos</option>
                    <option>Courier · paquetería</option>
                    <option>Logística general / otro</option>
                  </select>
                </div>

                <div className="mt-4">
                  <label className="block text-xs font-bold uppercase tracking-wider text-navy-700">
                    Detalles del envío
                  </label>
                  <textarea
                    name="mensaje"
                    rows={5}
                    placeholder="Volumen, origen, destino, fecha aproximada, etc."
                    className="mt-2 w-full rounded-2xl border border-navy-200 bg-white px-4 py-3 text-sm text-navy-900 outline-none transition focus:border-navy-500 focus:shadow-[0_0_0_4px_rgba(29,58,138,0.1)]"
                  />
                </div>

                <button
                  type="submit"
                  className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-navy-900 px-6 py-3 text-sm font-bold text-white shadow-[0_8px_24px_rgba(13,27,61,0.28)] transition hover:-translate-y-0.5 hover:bg-navy-700"
                >
                  <Send className="h-4 w-4" />
                  Enviar consulta
                </button>
                <p className="mt-3 text-[11px] text-slate-500">
                  Al enviar, tu mail abrirá un mensaje pre-armado a
                  info@azaharesgroup.com.
                </p>
              </form>
            </RevealOnScroll>
          </div>
        </div>
      </section>
    </>
  );
}

function Field({
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
    <div>
      <label className="block text-xs font-bold uppercase tracking-wider text-navy-700">
        {label}
        {required && <span className="ml-1 text-navy-500">*</span>}
      </label>
      <input
        type={type}
        name={name}
        required={required}
        className="mt-2 h-12 w-full rounded-2xl border border-navy-200 bg-white px-4 text-sm text-navy-900 outline-none transition focus:border-navy-500 focus:shadow-[0_0_0_4px_rgba(29,58,138,0.1)]"
      />
    </div>
  );
}
