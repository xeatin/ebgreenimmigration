import { useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Star, Award, type LucideIcon } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ContactSection from "@/components/ContactSection";
import heroBg from "@/assets/hero-bg.jpg";
import { useScrollDepth, usePageEngagement } from "@/hooks/useAnalytics";

export type VisaLPContent = {
  visaId: string;
  badge: string;
  title: string;
  titleHighlight: string;
  subtitle: string;
  benefits: { icon: LucideIcon; title: string; desc: string }[];
  socialProof: { stat: string; label: string }[];
  testimonial: { quote: string; author: string; role: string };
  ctaTitle: string;
  ctaDesc: string;
  seoTitle: string;
  seoDescription: string;
};

// Map LP visa IDs → values used by ContactSection's VISA_OPTIONS
const VISA_PRESET_MAP: Record<string, string> = {
  "EB-1A": "EB-1A",
  "EB-2 NIW": "EB-2 NIW",
  "EB-5": "EB-5 / E-2 Investidor",
  "H-1B / L-1": "H-1B / L-1 / O-1",
  "F-1": "F-1 Estudante",
  "Family-Based": "Family-Based",
};

const VisaLandingPage = ({ content }: { content: VisaLPContent }) => {
  const pagePath = typeof window !== "undefined" ? window.location.pathname : `/visto-${content.visaId}`;
  useScrollDepth(pagePath);
  usePageEngagement(pagePath, content.visaId);

  useEffect(() => {
    document.title = content.seoTitle;
    const el = document.head.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (el) el.setAttribute("content", content.seoDescription);
  }, [content]);

  const presetVisa = VISA_PRESET_MAP[content.visaId] ?? content.visaId;
  const formIdSuffix = content.visaId.toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "");

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
              <a href="#contato" data-cta-id="lp_hero_cta" data-cta-location="lp_hero" data-visa-context={content.visaId} className="btn-highlight inline-flex items-center justify-center gap-2 bg-gradient-gold text-green-deep px-8 py-4 rounded-md font-bold text-lg font-body hover:opacity-90 transition-opacity shadow-card">
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

      {/* Same multi-step contact form as homepage, with visa pre-selected */}
      <ContactSection presetVisa={presetVisa} formIdSuffix={formIdSuffix} />

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default VisaLandingPage;
