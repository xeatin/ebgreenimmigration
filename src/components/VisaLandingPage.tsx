import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check, ShieldCheck, Star, Award } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import heroBg from "@/assets/hero-bg.jpg";
import { useToast } from "@/hooks/use-toast";

export type VisaLPContent = {
  visaId: string;
  badge: string;
  title: string;
  titleHighlight: string;
  subtitle: string;
  benefits: { icon: React.ComponentType<{ size?: number; className?: string }>; title: string; desc: string }[];
  socialProof: { stat: string; label: string }[];
  testimonial: { quote: string; author: string; role: string };
  ctaTitle: string;
  ctaDesc: string;
  seoTitle: string;
  seoDescription: string;
};

const VisaLandingPage = ({ content }: { content: VisaLPContent }) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });

  useEffect(() => {
    document.title = content.seoTitle;
    const setMeta = (selector: string, attr: string, value: string) => {
      const el = document.head.querySelector(selector) as HTMLMetaElement | null;
      if (el) el.setAttribute(attr, value);
    };
    setMeta('meta[name="description"]', "content", content.seoDescription);
  }, [content]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone) {
      toast({ title: "Preencha todos os campos obrigatórios", variant: "destructive" });
      return;
    }
    setLoading(true);
    try {
      await fetch("https://n8n.srv1283251.hstgr.cloud/webhook/website-form-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: `landing-page-${content.visaId}`,
          firstName: form.name,
          lastName: "",
          email: form.email,
          phoneCode: "",
          phone: form.phone,
          visa: content.visaId,
          message: form.message,
        }),
      });
      toast({ title: "Recebemos seu contato!", description: "Em breve um especialista entrará em contato." });
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch {
      toast({ title: "Erro no envio", description: "Tente novamente.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-[88vh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroBg} alt={content.title} className="w-full h-full object-cover" loading="eager" fetchPriority="high" decoding="async" />
          <div className="absolute inset-0 bg-gradient-to-t from-green-deep via-green-deep/85 to-green-deep/50" />
        </div>
        <div className="relative z-10 container mx-auto px-6 pb-20 pt-40">
          <div className="max-w-4xl">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 bg-cream/10 backdrop-blur-sm border border-cream/20 rounded-full px-4 py-2 mb-8">
              <ShieldCheck size={14} className="text-gold" />
              <span className="text-cream/90 font-body text-sm">{content.badge}</span>
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="font-display text-4xl sm:text-5xl md:text-[3.5rem] lg:text-[4.2rem] font-bold text-cream leading-[1.05] tracking-tight">
              {content.title} <span className="text-gradient-gold">{content.titleHighlight}</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="mt-6 text-cream/80 text-lg md:text-xl max-w-2xl font-body leading-relaxed">
              {content.subtitle}
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="mt-10">
              <a href="#lp-form" className="btn-highlight inline-flex items-center justify-center gap-2 bg-gradient-gold text-green-deep px-8 py-4 rounded-md font-bold text-lg font-body hover:opacity-90 transition-opacity shadow-card">
                Avaliar Minha Elegibilidade <ArrowRight size={20} />
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-cream">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-gold font-body uppercase tracking-widest text-sm mb-3">Benefícios</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-green-deep">
              Por que escolher o {content.visaId}
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {content.benefits.map((b, i) => {
              const Icon = b.icon;
              return (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="bg-white p-8 rounded-xl shadow-card border border-green-deep/10">
                  <div className="w-12 h-12 rounded-lg bg-green-deep flex items-center justify-center mb-5">
                    <Icon size={22} className="text-gold" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-green-deep mb-2">{b.title}</h3>
                  <p className="font-body text-green-deep/70 leading-relaxed">{b.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Social proof */}
      <section className="py-20 bg-green-deep">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {content.socialProof.map((s, i) => (
              <div key={i} className="text-center">
                <p className="font-display text-5xl font-bold text-gold">{s.stat}</p>
                <p className="text-cream/70 font-body mt-2">{s.label}</p>
              </div>
            ))}
          </div>
          <div className="max-w-3xl mx-auto bg-cream/5 backdrop-blur border border-cream/10 rounded-xl p-8 md:p-10">
            <div className="flex gap-1 mb-4">
              {[...Array(5)].map((_, i) => <Star key={i} size={18} className="fill-gold text-gold" />)}
            </div>
            <p className="font-body text-cream/90 text-lg leading-relaxed italic">"{content.testimonial.quote}"</p>
            <div className="mt-5 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-gold flex items-center justify-center">
                <Award size={18} className="text-green-deep" />
              </div>
              <div>
                <p className="font-body font-semibold text-cream">{content.testimonial.author}</p>
                <p className="font-body text-cream/60 text-sm">{content.testimonial.role}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA + Form */}
      <section id="lp-form" className="py-20 bg-cream">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-green-deep leading-tight">
                {content.ctaTitle}
              </h2>
              <p className="mt-4 font-body text-green-deep/70 text-lg leading-relaxed">{content.ctaDesc}</p>
              <ul className="mt-6 space-y-3">
                {["Análise individualizada do seu caso", "Atendimento em PT, EN e ES", "Equipe especializada nos EUA"].map((item) => (
                  <li key={item} className="flex items-start gap-3 font-body text-green-deep/80">
                    <Check size={20} className="text-eligibility-green shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-card p-8 border border-green-deep/10">
              <h3 className="font-display text-2xl font-bold text-green-deep mb-1">Avaliação gratuita</h3>
              <p className="font-body text-green-deep/60 text-sm mb-6">Resposta em até 24h.</p>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Nome completo *"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-md border border-green-deep/20 font-body focus:outline-none focus:border-eligibility-green"
                  required
                />
                <input
                  type="email"
                  placeholder="E-mail *"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-md border border-green-deep/20 font-body focus:outline-none focus:border-eligibility-green"
                  required
                />
                <input
                  type="tel"
                  placeholder="Telefone / WhatsApp *"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-md border border-green-deep/20 font-body focus:outline-none focus:border-eligibility-green"
                  required
                />
                <textarea
                  placeholder="Conte um pouco sobre seu perfil (opcional)"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-3 rounded-md border border-green-deep/20 font-body focus:outline-none focus:border-eligibility-green resize-none"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-highlight w-full bg-gradient-gold text-green-deep py-3.5 rounded-md font-bold font-body hover:opacity-90 transition-opacity disabled:opacity-60"
                >
                  {loading ? "Enviando..." : `Quero avaliar meu ${content.visaId}`}
                </button>
                <p className="text-xs text-green-deep/50 font-body text-center">
                  Seus dados são confidenciais e não serão compartilhados.
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default VisaLandingPage;
