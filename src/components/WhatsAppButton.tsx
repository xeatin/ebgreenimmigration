import { useState } from "react";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLanguage } from "@/i18n/LanguageContext";
import { supabase } from "@/integrations/supabase/client";

const WHATSAPP_NUMBER = "17712017117";

const leadSchema = z.object({
  fullName: z.string().trim().min(1, "Obrigatório").max(200),
  email: z.string().trim().email("E-mail inválido").max(255),
  visa: z.string().trim().min(1, "Obrigatório").max(80),
  education: z.string().trim().min(1, "Obrigatório").max(120),
});

type FormState = z.infer<typeof leadSchema>;
type FormErrors = Partial<Record<keyof FormState, string>>;

const copy = {
  pt: {
    title: "Antes de continuar no WhatsApp",
    desc: "Preencha os dados abaixo para que a BIA inicie seu atendimento com mais rapidez e precisão.",
    fullName: "Nome completo",
    email: "E-mail",
    visa: "Tipo de visto",
    education: "Formação acadêmica",
    visaPlaceholder: "Selecione",
    eduPlaceholder: "Selecione",
    visaOptions: [
      { value: "EB-1A", label: "EB-1A" },
      { value: "EB-2 NIW", label: "EB-2 NIW" },
      { value: "EB-3", label: "EB-3" },
      { value: "EB-4", label: "EB-4" },
      { value: "EB-5", label: "EB-5" },
      { value: "CR-1", label: "CR-1" },
      { value: "E-2", label: "E-2" },
      { value: "F-1/F-2", label: "F-1/F-2" },
      { value: "L-1A", label: "L-1A" },
      { value: "K-1", label: "K-1" },
      { value: "O-1", label: "O-1" },
      { value: "R-1", label: "R-1" },
      { value: "Family-Based", label: "Family-Based" },
      { value: "AOS", label: "AOS" },
      { value: "Outros", label: "Outros / Não sei" },
    ],
    eduOptions: [
      { value: "Ensino Médio", label: "Ensino Médio" },
      { value: "Técnico", label: "Curso Técnico" },
      { value: "Graduação", label: "Graduação" },
      { value: "Pós-graduação", label: "Pós-graduação / MBA" },
      { value: "Mestrado", label: "Mestrado" },
      { value: "Doutorado", label: "Doutorado" },
    ],
    submit: "Continuar para WhatsApp",
    sending: "Enviando...",
    aria: "Falar pelo WhatsApp",
    greet: (n: string, e: string, v: string, ed: string) =>
      `Olá, meu nome é ${n}.\n\nSeguem minhas informações:\n\nE-mail: ${e}\nTipo de visto: ${v}\nFormação acadêmica: ${ed}\n\nGostaria de mais informações.`,
  },
  en: {
    title: "Before continuing on WhatsApp",
    desc: "Fill in quickly so BIA can start your service with context.",
    fullName: "Full name",
    email: "Email",
    visa: "Visa type",
    education: "Education",
    visaPlaceholder: "Select",
    eduPlaceholder: "Select",
    visaOptions: [
      { value: "EB-1A", label: "EB-1A" },
      { value: "EB-2 NIW", label: "EB-2 NIW" },
      { value: "EB-3", label: "EB-3" },
      { value: "EB-4", label: "EB-4" },
      { value: "EB-5", label: "EB-5" },
      { value: "CR-1", label: "CR-1" },
      { value: "E-2", label: "E-2" },
      { value: "F-1/F-2", label: "F-1/F-2" },
      { value: "L-1A", label: "L-1A" },
      { value: "K-1", label: "K-1" },
      { value: "O-1", label: "O-1" },
      { value: "R-1", label: "R-1" },
      { value: "Family-Based", label: "Family-Based" },
      { value: "AOS", label: "AOS" },
      { value: "Other", label: "Other / Not sure" },
    ],
    eduOptions: [
      { value: "High School", label: "High School" },
      { value: "Technical", label: "Technical Course" },
      { value: "Bachelor's", label: "Bachelor's Degree" },
      { value: "Postgraduate", label: "Postgraduate / MBA" },
      { value: "Master's", label: "Master's Degree" },
      { value: "PhD", label: "PhD" },
    ],
    submit: "Continue to WhatsApp",
    sending: "Sending...",
    aria: "Chat on WhatsApp",
    greet: (n: string, e: string, v: string, ed: string) =>
      `Hello, my name is ${n}.\n\nHere is my information:\n\nEmail: ${e}\nVisa type: ${v}\nEducation: ${ed}\n\nI would like more information.`,
  },
  es: {
    title: "Antes de continuar en WhatsApp",
    desc: "Complete rápidamente para que BIA inicie su atención con contexto.",
    fullName: "Nombre completo",
    email: "Correo electrónico",
    visa: "Tipo de visa",
    education: "Formación académica",
    visaPlaceholder: "Seleccione",
    eduPlaceholder: "Seleccione",
    visaOptions: [
      { value: "EB-1A", label: "EB-1A" },
      { value: "EB-2 NIW", label: "EB-2 NIW" },
      { value: "EB-3", label: "EB-3" },
      { value: "EB-4", label: "EB-4" },
      { value: "EB-5", label: "EB-5" },
      { value: "CR-1", label: "CR-1" },
      { value: "E-2", label: "E-2" },
      { value: "F-1/F-2", label: "F-1/F-2" },
      { value: "L-1A", label: "L-1A" },
      { value: "K-1", label: "K-1" },
      { value: "O-1", label: "O-1" },
      { value: "R-1", label: "R-1" },
      { value: "Family-Based", label: "Family-Based" },
      { value: "AOS", label: "AOS" },
      { value: "Otros", label: "Otros / No sé" },
    ],
    eduOptions: [
      { value: "Secundaria", label: "Secundaria" },
      { value: "Técnico", label: "Curso Técnico" },
      { value: "Pregrado", label: "Pregrado" },
      { value: "Posgrado", label: "Posgrado / MBA" },
      { value: "Maestría", label: "Maestría" },
      { value: "Doctorado", label: "Doctorado" },
    ],
    submit: "Continuar a WhatsApp",
    sending: "Enviando...",
    aria: "Hablar por WhatsApp",
    greet: (n: string, e: string, v: string, ed: string) =>
      `Hola, mi nombre es ${n}.\n\nMis datos:\n\nCorreo: ${e}\nTipo de visa: ${v}\nFormación académica: ${ed}\n\nMe gustaría más información.`,
  },
};

const initialForm: FormState = {
  fullName: "",
  email: "",
  visa: "",
  education: "",
};

const WhatsAppButton = () => {
  const { lang } = useLanguage();
  const c = copy[lang];

  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = leadSchema.safeParse(form);
    if (!parsed.success) {
      const fe = parsed.error.flatten().fieldErrors;
      setErrors({
        fullName: fe.fullName?.[0],
        email: fe.email?.[0],
        visa: fe.visa?.[0],
        education: fe.education?.[0],
      });
      return;
    }
    setErrors({});
    setSubmitting(true);

    const { fullName, email, visa, education } = parsed.data;
    const parts = fullName.split(/\s+/);
    const firstName = parts[0] || fullName;
    const lastName = parts.slice(1).join(" ");

    try {
      await supabase.functions.invoke("send-contact-email", {
        body: {
          source: "whatsapp-popup-form",
          firstName,
          lastName,
          email,
          phoneCode: "",
          phone: "",
          visa,
          education,
          message: "Lead via botão WhatsApp (pop-up)",
        },
      });
    } catch {
      // não bloqueia o redirect
    }

    const message = c.greet(fullName, email, visa, education);
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

    setSubmitting(false);
    setOpen(false);
    setForm(initialForm);

    window.open(url, "_blank", "noopener,noreferrer");
  };

  const req = <span className="text-destructive">*</span>;

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
        <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-display text-xl">{c.title}</DialogTitle>
            <DialogDescription className="font-body text-sm">{c.desc}</DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="wa-name" className="font-body">{c.fullName} {req}</Label>
              <Input
                id="wa-name"
                value={form.fullName}
                onChange={(e) => update("fullName", e.target.value)}
                maxLength={200}
                autoComplete="name"
                required
                aria-invalid={!!errors.fullName}
              />
              {errors.fullName && <p className="text-xs text-destructive">{errors.fullName}</p>}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="wa-email" className="font-body">{c.email} {req}</Label>
              <Input
                id="wa-email"
                type="email"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                maxLength={255}
                autoComplete="email"
                required
                aria-invalid={!!errors.email}
              />
              {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="wa-visa" className="font-body">{c.visa} {req}</Label>
              <Select value={form.visa} onValueChange={(v) => update("visa", v)}>
                <SelectTrigger id="wa-visa" aria-invalid={!!errors.visa}>
                  <SelectValue placeholder={c.visaPlaceholder} />
                </SelectTrigger>
                <SelectContent>
                  {c.visaOptions.map((o) => (
                    <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.visa && <p className="text-xs text-destructive">{errors.visa}</p>}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="wa-edu" className="font-body">{c.education} {req}</Label>
              <Select value={form.education} onValueChange={(v) => update("education", v)}>
                <SelectTrigger id="wa-edu" aria-invalid={!!errors.education}>
                  <SelectValue placeholder={c.eduPlaceholder} />
                </SelectTrigger>
                <SelectContent>
                  {c.eduOptions.map((o) => (
                    <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.education && <p className="text-xs text-destructive">{errors.education}</p>}
            </div>


            <Button
              type="submit"
              disabled={submitting}
              className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-body font-semibold"
            >
              {submitting ? c.sending : c.submit}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default WhatsAppButton;
