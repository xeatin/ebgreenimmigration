import { useState } from "react";
import { z } from "zod";
import { User, Mail, Plane, GraduationCap, ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/i18n/LanguageContext";
import { supabase } from "@/integrations/supabase/client";

const WHATSAPP_NUMBER = "17712017117";

const leadSchema = z.object({
  name: z.string().trim().min(1, "Nome obrigatório").max(120),
  email: z.string().trim().email("E-mail inválido").max(255),
  visa: z.string().trim().max(80).optional().or(z.literal("")),
  education: z.string().trim().max(120).optional().or(z.literal("")),
});

const copy = {
  pt: {
    badge: "Atendimento BIA",
    title: "Antes de continuar no WhatsApp",
    desc: "Preencha os dados abaixo para que a BIA inicie seu atendimento já com contexto.",
    name: "Nome completo",
    namePh: "Como podemos te chamar?",
    email: "E-mail",
    emailPh: "voce@email.com",
    visa: "Tipo de visto",
    visaPh: "Ex: EB-1A, EB-2 NIW, O-1...",
    education: "Graduação",
    eduPh: "Ex: Graduado em Engenharia",
    optional: "opcional",
    required: "obrigatório",
    submit: "Continuar para WhatsApp",
    sending: "Enviando...",
    privacy: "Seus dados estão seguros e são usados apenas para seu atendimento.",
    aria: "Falar pelo WhatsApp",
    greet: (n: string, e: string, v: string, ed: string) =>
      `Olá, meu nome é ${n}.\n\nSeguem minhas informações:\n\nE-mail: ${e}\nTipo de visto: ${v || "Não informado"}\nGraduação: ${ed || "Não informado"}\n\nGostaria de mais informações.`,
  },
  en: {
    badge: "BIA Assistant",
    title: "Before continuing on WhatsApp",
    desc: "Fill in your details so BIA can start your service with full context.",
    name: "Full name",
    namePh: "What should we call you?",
    email: "Email",
    emailPh: "you@email.com",
    visa: "Visa type",
    visaPh: "Ex: EB-1A, EB-2 NIW, O-1...",
    education: "Education",
    eduPh: "Ex: Bachelor's in Engineering",
    optional: "optional",
    required: "required",
    submit: "Continue to WhatsApp",
    sending: "Sending...",
    privacy: "Your data is safe and used only for your service.",
    aria: "Chat on WhatsApp",
    greet: (n: string, e: string, v: string, ed: string) =>
      `Hello, my name is ${n}.\n\nHere is my information:\n\nEmail: ${e}\nVisa type: ${v || "Not provided"}\nEducation: ${ed || "Not provided"}\n\nI would like more information.`,
  },
  es: {
    badge: "Atención BIA",
    title: "Antes de continuar en WhatsApp",
    desc: "Complete sus datos para que BIA inicie su atención con contexto.",
    name: "Nombre completo",
    namePh: "¿Cómo te llamamos?",
    email: "Correo electrónico",
    emailPh: "tu@correo.com",
    visa: "Tipo de visa",
    visaPh: "Ej: EB-1A, EB-2 NIW, O-1...",
    education: "Formación",
    eduPh: "Ej: Graduado en Ingeniería",
    optional: "opcional",
    required: "obligatorio",
    submit: "Continuar a WhatsApp",
    sending: "Enviando...",
    privacy: "Sus datos están seguros y se usan solo para su atención.",
    aria: "Hablar por WhatsApp",
    greet: (n: string, e: string, v: string, ed: string) =>
      `Hola, mi nombre es ${n}.\n\nMis datos:\n\nCorreo: ${e}\nTipo de visa: ${v || "No informado"}\nFormación: ${ed || "No informado"}\n\nMe gustaría más información.`,
  },
};

const WhatsAppButton = () => {
  const { lang } = useLanguage();
  const c = copy[lang];

  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", visa: "", education: "" });
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = leadSchema.safeParse(form);
    if (!parsed.success) {
      const fieldErrors = parsed.error.flatten().fieldErrors;
      setErrors({
        name: fieldErrors.name?.[0],
        email: fieldErrors.email?.[0],
      });
      return;
    }
    setErrors({});
    setSubmitting(true);

    const { name, email, visa, education } = parsed.data;
    const [firstName, ...rest] = name.split(" ");
    const lastName = rest.join(" ") || "-";

    try {
      await supabase.functions.invoke("send-contact-email", {
        body: {
          firstName,
          lastName,
          email,
          phoneCode: "",
          phone: "",
          visa: visa || "",
          education: education || "",
          experience: "",
          message: "Lead via botão WhatsApp (pop-up)",
        },
      });
    } catch {
      // não bloqueia o redirect
    }

    const message = c.greet(name, email, visa || "", education || "");
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

    setSubmitting(false);
    setOpen(false);
    setForm({ name: "", email: "", visa: "", education: "" });

    window.open(url, "_blank", "noopener,noreferrer");
  };

  const fieldWrap =
    "group relative rounded-xl border border-input bg-background transition-all focus-within:border-[#25D366] focus-within:ring-2 focus-within:ring-[#25D366]/20";
  const inputBase =
    "w-full bg-transparent pl-11 pr-3 py-3 text-sm font-body text-foreground placeholder:text-muted-foreground/70 focus:outline-none";
  const iconBase =
    "absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-[#25D366] transition-colors";

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-full p-3.5 shadow-lg transition-colors animate-bounce-slow"
        aria-label={c.aria}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="p-0 overflow-hidden sm:max-w-[460px] border-border/60 rounded-2xl">
          {/* Header em gradiente verde-marca */}
          <div className="relative bg-gradient-to-br from-[#128C7E] via-[#25D366] to-[#20bd5a] px-6 pt-7 pb-6 text-white">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur px-3 py-1 text-[11px] font-semibold tracking-wide uppercase">
              <Sparkles size={13} />
              {c.badge}
            </div>
            <h2 className="font-display text-xl sm:text-2xl font-bold mt-3 leading-tight">
              {c.title}
            </h2>
            <p className="font-body text-sm text-white/90 mt-1.5 leading-relaxed">
              {c.desc}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="px-6 pt-5 pb-6 space-y-4">
            {/* Nome */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="wa-name" className="text-xs font-body font-semibold text-foreground tracking-wide">
                  {c.name}
                </label>
                <span className="text-[10px] uppercase tracking-wider text-[#25D366] font-semibold">
                  {c.required}
                </span>
              </div>
              <div className={fieldWrap}>
                <User size={16} className={iconBase} />
                <input
                  id="wa-name"
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  maxLength={120}
                  autoComplete="name"
                  required
                  placeholder={c.namePh}
                  className={inputBase}
                />
              </div>
              {errors.name && <p className="mt-1 text-xs text-destructive font-body">{errors.name}</p>}
            </div>

            {/* E-mail */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="wa-email" className="text-xs font-body font-semibold text-foreground tracking-wide">
                  {c.email}
                </label>
                <span className="text-[10px] uppercase tracking-wider text-[#25D366] font-semibold">
                  {c.required}
                </span>
              </div>
              <div className={fieldWrap}>
                <Mail size={16} className={iconBase} />
                <input
                  id="wa-email"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  maxLength={255}
                  autoComplete="email"
                  required
                  placeholder={c.emailPh}
                  className={inputBase}
                />
              </div>
              {errors.email && <p className="mt-1 text-xs text-destructive font-body">{errors.email}</p>}
            </div>

            {/* Visto + Graduação em grid no desktop */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label htmlFor="wa-visa" className="text-xs font-body font-semibold text-foreground tracking-wide">
                    {c.visa}
                  </label>
                  <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">
                    {c.optional}
                  </span>
                </div>
                <div className={fieldWrap}>
                  <Plane size={16} className={iconBase} />
                  <input
                    id="wa-visa"
                    type="text"
                    value={form.visa}
                    onChange={(e) => setForm({ ...form, visa: e.target.value })}
                    maxLength={80}
                    placeholder={c.visaPh}
                    className={inputBase}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label htmlFor="wa-edu" className="text-xs font-body font-semibold text-foreground tracking-wide">
                    {c.education}
                  </label>
                  <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">
                    {c.optional}
                  </span>
                </div>
                <div className={fieldWrap}>
                  <GraduationCap size={16} className={iconBase} />
                  <input
                    id="wa-edu"
                    type="text"
                    value={form.education}
                    onChange={(e) => setForm({ ...form, education: e.target.value })}
                    maxLength={120}
                    placeholder={c.eduPh}
                    className={inputBase}
                  />
                </div>
              </div>
            </div>

            {/* CTA */}
            <Button
              type="submit"
              disabled={submitting}
              className="w-full h-12 bg-[#25D366] hover:bg-[#20bd5a] text-white font-body font-semibold text-sm rounded-xl shadow-md hover:shadow-lg transition-all group"
            >
              {submitting ? c.sending : c.submit}
              {!submitting && (
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
              )}
            </Button>

            {/* Microcopy de privacidade */}
            <div className="flex items-center justify-center gap-1.5 text-[11px] text-muted-foreground font-body pt-1">
              <ShieldCheck size={12} className="text-[#25D366]" />
              <span>{c.privacy}</span>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default WhatsAppButton;
