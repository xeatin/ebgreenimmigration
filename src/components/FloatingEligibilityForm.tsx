import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, ChevronUp, Sparkles } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { translations, t } from "@/i18n/translations";
import { useToast } from "@/hooks/use-toast";

const VISA_OPTIONS = [
  "EB-1A",
  "EB-2 NIW",
  "EB-5 / E-2 (Investidor)",
  "H-1B / L-1 / O-1 (Trabalho)",
  "F-1 (Estudante)",
  "Family-Based",
  "Não sei / Preciso de orientação",
];

const FloatingEligibilityForm = () => {
  const { lang } = useLanguage();
  const { toast } = useToast();
  const f = translations.services.quickForm;

  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [data, setData] = useState({ email: "", phone: "", visa: "" });

  useEffect(() => {
    const onScroll = () => {
      if (dismissed) return;
      const scrolled = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const pct = total > 0 ? scrolled / total : 0;

      // Hide if contact section is in view
      const contact = document.getElementById("contato");
      if (contact) {
        const rect = contact.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.8) {
          setVisible(false);
          return;
        }
      }
      setVisible(pct >= 0.3);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [dismissed]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
      toast({ title: "E-mail inválido", variant: "destructive" });
      return;
    }
    if (data.phone.replace(/\D/g, "").length < 6) {
      toast({ title: "Telefone inválido", variant: "destructive" });
      return;
    }
    if (!data.visa) {
      toast({ title: "Selecione um visto", variant: "destructive" });
      return;
    }
    setSending(true);
    try {
      await fetch("https://n8n.srv1283251.hstgr.cloud/webhook/website-form-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "website-floating-quick-form",
          email: data.email,
          phone: data.phone,
          visa: data.visa,
          language: lang,
        }),
      });
      setSubmitted(true);
      toast({ title: t(f.success, lang) });
    } catch (err) {
      toast({ title: t(f.error, lang), variant: "destructive" });
    } finally {
      setSending(false);
    }
  };

  if (dismissed) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-6 left-6 z-40 max-w-sm w-[calc(100%-3rem)] sm:w-[360px]"
        >
          {minimized ? (
            <button
              onClick={() => setMinimized(false)}
              className="bg-eligibility-green hover:bg-eligibility-green-hover text-white font-body font-semibold text-sm px-4 py-3 rounded-full shadow-2xl flex items-center gap-2"
            >
              <Sparkles size={16} />
              {t(f.submit, lang)}
              <ChevronUp size={16} />
            </button>
          ) : (
            <div className="bg-green-deep border border-gold/30 rounded-2xl shadow-2xl overflow-hidden">
              <div className="flex items-start justify-between p-4 pb-2 bg-gradient-to-r from-green-deep to-green-medium">
                <div className="flex-1 pr-2">
                  <p className="text-gold text-[10px] font-body font-bold tracking-widest uppercase mb-0.5">
                    EB Green USA
                  </p>
                  <h4 className="font-display text-cream text-base font-semibold leading-tight">
                    {t(f.title, lang)}
                  </h4>
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={() => setMinimized(true)}
                    aria-label="Minimize"
                    className="text-cream/60 hover:text-cream p-1"
                  >
                    <ChevronUp size={16} className="rotate-180" />
                  </button>
                  <button
                    onClick={() => setDismissed(true)}
                    aria-label={t(f.close, lang)}
                    className="text-cream/60 hover:text-cream p-1"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>

              {submitted ? (
                <div className="p-5 text-center">
                  <div className="w-10 h-10 rounded-full bg-eligibility-green/20 flex items-center justify-center mx-auto mb-2">
                    <Sparkles className="text-eligibility-green" size={20} />
                  </div>
                  <p className="text-cream font-body text-sm">{t(f.success, lang)}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="p-4 pt-2 space-y-2.5">
                  <input
                    type="email"
                    required
                    placeholder={t(f.email, lang)}
                    value={data.email}
                    onChange={(e) => setData({ ...data, email: e.target.value })}
                    className="w-full bg-cream/5 border border-cream/15 focus:border-eligibility-green text-cream placeholder:text-cream/40 text-sm font-body rounded-lg px-3 py-2.5 outline-none transition-colors"
                  />
                  <input
                    type="tel"
                    required
                    placeholder={t(f.phone, lang)}
                    value={data.phone}
                    onChange={(e) => setData({ ...data, phone: e.target.value })}
                    className="w-full bg-cream/5 border border-cream/15 focus:border-eligibility-green text-cream placeholder:text-cream/40 text-sm font-body rounded-lg px-3 py-2.5 outline-none transition-colors"
                  />
                  <select
                    required
                    value={data.visa}
                    onChange={(e) => setData({ ...data, visa: e.target.value })}
                    className="w-full bg-cream/5 border border-cream/15 focus:border-eligibility-green text-cream text-sm font-body rounded-lg px-3 py-2.5 outline-none transition-colors"
                  >
                    <option value="" className="bg-green-deep">
                      {t(f.visaPlaceholder, lang)}
                    </option>
                    {VISA_OPTIONS.map((v) => (
                      <option key={v} value={v} className="bg-green-deep">
                        {v}
                      </option>
                    ))}
                  </select>
                  <button
                    type="submit"
                    disabled={sending}
                    className="w-full inline-flex items-center justify-center gap-1.5 bg-eligibility-green hover:bg-eligibility-green-hover disabled:opacity-60 text-white font-body font-semibold text-sm py-2.5 px-4 rounded-lg transition-colors"
                  >
                    {sending ? t(f.sending, lang) : (<>{t(f.submit, lang)} <Send size={14} /></>)}
                  </button>
                </form>
              )}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FloatingEligibilityForm;
