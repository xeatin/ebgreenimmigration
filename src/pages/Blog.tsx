import { useMemo } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { useLanguage } from "@/i18n/LanguageContext";
import { translations, t } from "@/i18n/translations";
import { blogPosts } from "@/data/blog-posts";
import { useBlogTexts } from "@/hooks/useBlogTranslation";

const Blog = () => {
  const { lang } = useLanguage();
  const s = translations.blog;

  const ordered = useMemo(() => [...blogPosts].reverse(), []);
  const sourceTexts = useMemo(
    () => ordered.flatMap((p) => [p.titulo, p.excerpt, p.categoria]),
    [ordered],
  );
  const { texts: translated } = useBlogTexts(sourceTexts);


  return (
    <div className="min-h-screen bg-green-deep">
      <Navbar />

      {/* Hero */}
      <section id="hero" className="relative pt-32 pb-6 overflow-hidden bg-gradient-to-b from-green-deep via-green-medium to-green-deep">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle at 20% 30%, hsl(var(--gold) / 0.4) 0%, transparent 55%)" }} />
        </div>
        <div className="relative z-10 container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-5xl"
          >
            <div className="relative flex flex-col md:flex-row items-start md:items-end gap-10 border-b border-gold/30 pb-12">
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-6">
                  <span className="h-px w-12 bg-gold"></span>
                  <span className="font-body text-gold text-[11px] tracking-[0.4em] font-semibold uppercase">
                    {t(s.eyebrow, lang)}
                  </span>
                </div>
                <h1 className="font-display font-medium text-cream leading-[0.95] tracking-tight text-4xl sm:text-5xl md:text-6xl">
                  {t(s.titleLine1, lang)}
                  <br />
                  <span className="text-gradient-gold">{t(s.titleLine2, lang)}</span>
                </h1>
              </div>

              <div className="md:w-1/3 flex flex-col gap-6">
                <p className="font-body text-cream/60 text-sm md:text-base leading-relaxed border-l border-gold pl-6">
                  {t(s.intro, lang)}
                </p>
              </div>

              <div className="hidden md:block absolute -top-4 -right-4 w-24 h-24 border-t border-r border-gold/20"></div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="pt-8 pb-20 bg-green-deep">
        <div className="container mx-auto px-6">
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {ordered.map((post, index) => {
              const hasContent = !!post.content;
              const titulo = translated[index * 3] ?? post.titulo;
              const excerpt = translated[index * 3 + 1] ?? post.excerpt;
              const categoria = translated[index * 3 + 2] ?? post.categoria;
              return (
                <motion.div
                  key={post.id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.04 }}
                >
                  <Link
                    to={`/blog/${post.slug}`}
                    className="group block bg-green-medium rounded-lg overflow-hidden border border-cream/10 hover:border-eligibility-green/60 shadow-card hover:shadow-card-hover transition-all duration-300 h-full flex flex-col"
                  >
                    <div className="relative h-52 overflow-hidden">
                      <img
                        src={post.imagem}
                        alt={post.titulo}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-green-deep via-green-deep/30 to-transparent" />
                      <span className="absolute top-4 left-4 inline-block px-3 py-1 rounded-sm text-[11px] font-semibold font-body bg-gradient-gold text-green-deep shadow-card">
                        {post.categoria}
                      </span>
                    </div>

                    <div className="p-6 flex flex-col flex-1">
                      <h2 className="font-display text-xl font-bold text-cream mb-3 leading-snug group-hover:text-gold transition-colors">
                        {post.titulo}
                      </h2>

                      <p className="font-body text-cream/60 text-sm leading-relaxed mb-5 line-clamp-3 flex-1">
                        {post.excerpt}
                      </p>

                      <div className="flex items-center gap-3 mb-5 text-[11px] font-body text-cream/60">
                        <span>{post.data}</span>
                        <span className="opacity-40">·</span>
                        <span className="inline-flex items-center gap-1">
                          <Clock size={11} /> {post.leitura}
                        </span>
                      </div>

                      <span className="btn-highlight inline-flex items-center justify-center gap-2 bg-gradient-gold text-green-deep px-6 py-3 rounded-md font-bold text-sm font-body group-hover:opacity-90 transition-opacity shadow-card group-hover:shadow-card-hover w-full">
                        {t(s.readArticle, lang)}
                        <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>

          {blogPosts.length === 0 && (
            <div className="text-center py-20">
              <p className="font-body text-cream/50 text-lg">
                {t(s.empty, lang)}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-b from-green-deep to-green-medium border-t border-cream/10">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-cream mb-4">
              {t(s.ctaTitle1, lang)} <span className="text-gradient-gold">{t(s.titleLine2, lang)}</span> {t(s.ctaTitle2, lang)}
            </h2>
            <p className="text-cream/70 font-body text-lg mb-8">
              {t(s.ctaSubtitle, lang)}
            </p>
            <button
              type="button"
              onClick={() => window.dispatchEvent(new CustomEvent("open-whatsapp-lead"))}
              className="btn-highlight inline-flex items-center gap-2 bg-gradient-gold text-green-deep px-8 py-4 rounded-md font-bold text-lg font-body hover:opacity-90 transition-opacity shadow-card hover:shadow-card-hover"
            >
              {t(translations.nav.cta, lang)}
              <ArrowRight size={20} />
            </button>
          </motion.div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Blog;
