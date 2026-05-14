import { useEffect, useMemo, useState } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Clock, Calendar, ExternalLink, ChevronUp } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { getPostBySlug, blogPosts, type ArticleBlock } from "@/data/blog-posts";

const renderInline = (text: string) => (
  <span dangerouslySetInnerHTML={{ __html: text }} />
);

const Block = ({ block }: { block: ArticleBlock }) => {
  switch (block.type) {
    case "p":
      return (
        <p className="text-[17px] md:text-lg leading-[1.85] text-foreground/85 font-body mb-6 [&_a]:text-eligibility-green [&_a]:font-semibold [&_a]:underline [&_a]:underline-offset-4 [&_a:hover]:text-gold">
          {renderInline(block.text)}
        </p>
      );
    case "h2":
      return (
        <h2
          id={block.id}
          className="font-display text-2xl md:text-3xl text-green-deep mt-14 mb-5 leading-tight scroll-mt-28"
        >
          {block.text}
        </h2>
      );
    case "h3":
      return (
        <h3 className="font-display text-xl md:text-2xl text-green-deep mt-8 mb-3 leading-tight">
          {block.text}
        </h3>
      );
    case "list":
      return (
        <ul className="space-y-2.5 mb-6 font-body text-[17px] md:text-lg text-foreground/85 leading-[1.7]">
          {block.items.map((item, i) => (
            <li key={i} className="pl-6 relative">
              <span className="absolute left-0 top-[0.7em] w-2 h-2 bg-gold rounded-full" />
              {renderInline(item)}
            </li>
          ))}
        </ul>
      );
    case "ordered":
      return (
        <ol className="space-y-3 mb-6 font-body text-[17px] md:text-lg text-foreground/85 leading-[1.7] list-none counter-reset-item">
          {block.items.map((item, i) => (
            <li key={i} className="pl-12 relative">
              <span className="absolute left-0 top-0 w-8 h-8 rounded-full bg-green-deep text-cream flex items-center justify-center font-display font-bold text-sm">
                {i + 1}
              </span>
              {renderInline(item)}
            </li>
          ))}
        </ol>
      );
    case "quote":
      return (
        <blockquote className="my-10 pl-6 md:pl-8 border-l-4 border-gold">
          <p className="font-display text-xl md:text-2xl text-green-deep leading-snug italic">
            "{block.text}"
          </p>
          {block.author && (
            <footer className="mt-3 text-sm font-body text-green-deep/60 not-italic">
              — {block.author}
            </footer>
          )}
        </blockquote>
      );
    case "callout":
      return (
        <aside className="my-8 p-6 bg-eligibility-green/8 border-l-4 border-eligibility-green rounded-r-lg">
          <p className="font-display text-base font-bold text-eligibility-green uppercase tracking-wider mb-2">
            {block.title}
          </p>
          <p className="font-body text-[17px] text-foreground/85 leading-[1.7]">
            {renderInline(block.text)}
          </p>
        </aside>
      );
    case "cta":
      return (
        <div className="my-12 p-8 md:p-10 bg-gradient-to-br from-green-deep to-green-medium rounded-2xl text-center">
          <button
            type="button"
            onClick={() => window.dispatchEvent(new CustomEvent("open-whatsapp-lead"))}
            className="inline-flex items-center gap-2 bg-gradient-gold text-green-deep px-8 py-4 rounded-md font-bold text-base font-body hover:opacity-90 transition-opacity shadow-card"
          >
            {block.text}
            <ArrowRight size={18} />
          </button>
        </div>
      );
    default:
      return null;
  }
};

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = useMemo(() => (slug ? getPostBySlug(slug) : undefined), [slug]);
  const [progress, setProgress] = useState(0);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [slug]);

  useEffect(() => {
    if (!post) return;
    document.title = post.metaTitle ?? `${post.titulo} | EBGreen`;
    const desc = post.metaDescription ?? post.excerpt;
    const meta = document.head.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", desc);
  }, [post]);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const scrolled = h.scrollTop;
      const max = h.scrollHeight - h.clientHeight;
      setProgress(max > 0 ? (scrolled / max) * 100 : 0);
      setShowTop(scrolled > 600);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!post) return <Navigate to="/blog" replace />;

  const headings = (post.content ?? []).filter(
    (b): b is Extract<ArticleBlock, { type: "h2" }> => b.type === "h2"
  );

  const relatedPosts = (post.related ?? [])
    .map((s) => blogPosts.find((p) => p.slug === s))
    .filter(Boolean);

  return (
    <div className="min-h-screen bg-[hsl(40_25%_97%)]">
      <Navbar />

      {/* Reading progress bar */}
      <div
        className="fixed top-0 left-0 h-1 bg-gradient-gold z-50 transition-[width] duration-100"
        style={{ width: `${progress}%` }}
      />

      {/* Hero — D4U-3 Law Firm Premium (black) */}
      <header className="pt-28 md:pt-32 pb-12 md:pb-16 bg-[#0a0a0a] relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.18] pointer-events-none"
          style={{ backgroundImage: "radial-gradient(circle at 85% 15%, hsl(var(--gold) / 0.55) 0%, transparent 50%)" }}
        />
        <div className="container mx-auto px-6 max-w-7xl relative">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-cream/60 hover:text-gold font-body text-sm transition-colors mb-10"
          >
            <ArrowLeft size={16} />
            Voltar para o blog
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-10 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-block font-body text-[11px] font-bold tracking-[0.28em] text-gold uppercase mb-6">
                {post.categoria}
              </span>

              <h1 className="font-display text-3xl md:text-5xl lg:text-[3.25rem] text-cream leading-[1.1] tracking-tight mb-7">
                {post.titulo}
              </h1>

              <div className="w-16 h-px bg-gold mb-7" />

              <p className="font-body text-cream/75 text-lg leading-relaxed mb-8 max-w-xl">
                {post.excerpt}
              </p>

              <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-cream/55 font-body text-sm">
                {post.author && (
                  <span className="italic">
                    Por <span className="text-cream not-italic">{post.author}</span>
                  </span>
                )}
                {post.author && <span className="text-cream/30">·</span>}
                <span className="inline-flex items-center gap-1.5">
                  <Calendar size={14} /> {post.data}
                </span>
                <span className="text-cream/30">·</span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock size={14} /> {post.leitura} de leitura
                </span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative"
            >
              <div className="absolute -inset-3 bg-gold/10 rounded-sm blur-xl pointer-events-none" />
              <div className="relative aspect-[4/5] lg:aspect-[5/6] overflow-hidden shadow-2xl ring-1 ring-gold/20">
                <img
                  src={post.imagem}
                  alt={post.titulo}
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </header>

      {/* Body */}
      <article className="container mx-auto px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_minmax(0,42rem)_1fr] gap-10 max-w-6xl mx-auto">
          {/* Sticky TOC (desktop) */}
          <aside className="hidden lg:block">
            {headings.length > 0 && (
              <nav className="sticky top-28 pr-6">
                <p className="font-display text-xs uppercase tracking-[0.2em] text-green-deep/50 mb-4">
                  Neste artigo
                </p>
                <ul className="space-y-2.5 border-l border-green-deep/15 pl-4">
                  {headings.map((h) => (
                    <li key={h.id}>
                      <a
                        href={`#${h.id}`}
                        className="block text-sm text-green-deep/70 font-body hover:text-eligibility-green transition-colors leading-snug"
                      >
                        {h.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            )}
          </aside>

          {/* Article content */}
          <div className="min-w-0">
            {post.content ? (
              post.content.map((block, i) => <Block key={i} block={block} />)
            ) : (
              <div className="py-20 text-center">
                <p className="font-body text-green-deep/70 text-lg mb-2">
                  Este artigo está sendo finalizado.
                </p>
                <p className="font-body text-green-deep/50 text-sm">
                  Em breve disponibilizaremos o conteúdo completo aqui.
                </p>
                <Link
                  to="/blog"
                  className="inline-flex items-center gap-2 mt-8 text-eligibility-green font-bold font-body hover:text-gold"
                >
                  <ArrowLeft size={16} /> Voltar para o blog
                </Link>
              </div>
            )}

            {/* External authoritative links */}
            {post.externalLinks && post.externalLinks.length > 0 && (
              <section className="mt-14 pt-10 border-t border-green-deep/10">
                <p className="font-display text-xs uppercase tracking-[0.2em] text-green-deep/50 mb-4">
                  Fontes oficiais
                </p>
                <ul className="space-y-2">
                  {post.externalLinks.map((l) => (
                    <li key={l.url}>
                      <a
                        href={l.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-start gap-2 text-eligibility-green font-body text-sm hover:text-gold transition-colors"
                      >
                        <ExternalLink size={14} className="mt-1 flex-shrink-0" />
                        <span className="underline underline-offset-4">{l.label}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>

          <div className="hidden lg:block" />
        </div>
      </article>

      {/* Related posts */}
      {relatedPosts.length > 0 && (
        <section className="bg-green-deep/[0.04] border-t border-green-deep/10 py-16">
          <div className="container mx-auto px-6 max-w-6xl">
            <h2 className="font-display text-2xl md:text-3xl text-green-deep mb-8">
              Continue lendo
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((rp) => rp && (
                <Link
                  key={rp.slug}
                  to={`/blog/${rp.slug}`}
                  className="group bg-white rounded-xl overflow-hidden border border-green-deep/10 hover:border-eligibility-green/50 hover:shadow-xl transition-all duration-300"
                >
                  <div className="aspect-[16/9] overflow-hidden">
                    <img src={rp.imagem} alt={rp.titulo} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                  </div>
                  <div className="p-5">
                    <span className="inline-block text-[10px] font-semibold font-body text-eligibility-green uppercase tracking-wider mb-2">
                      {rp.categoria}
                    </span>
                    <h3 className="font-display text-lg text-green-deep leading-snug group-hover:text-eligibility-green transition-colors">
                      {rp.titulo}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Back to top */}
      {showTop && (
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Voltar ao topo"
          className="fixed bottom-24 right-6 w-11 h-11 rounded-full bg-green-deep text-cream shadow-lg flex items-center justify-center hover:bg-eligibility-green transition-colors z-40"
        >
          <ChevronUp size={20} />
        </button>
      )}

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default BlogPost;
