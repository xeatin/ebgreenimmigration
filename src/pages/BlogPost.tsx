import { useEffect, useMemo, useState } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Clock, Calendar, ExternalLink, ChevronUp } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { getPostBySlug, blogPosts, type ArticleBlock } from "@/data/blog-posts";
import { useLanguage } from "@/i18n/LanguageContext";
import { translations, t } from "@/i18n/translations";
import { useBlogTexts } from "@/hooks/useBlogTranslation";

const renderInline = (text: string) => (
  <span dangerouslySetInnerHTML={{ __html: text }} />
);

const Block = ({ block }: { block: ArticleBlock }) => {
  switch (block.type) {
    case "p":
      return (
        <p className="text-[17px] md:text-lg leading-[1.85] text-green-deep/85 font-body mb-6 [&_a]:text-green-deep [&_a]:font-semibold [&_a]:underline [&_a]:decoration-gold [&_a]:underline-offset-4 [&_a:hover]:text-gold-dark [&_a:hover]:decoration-gold-dark">
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
        <ul className="space-y-2.5 mb-6 font-body text-[17px] md:text-lg text-green-deep/85 leading-[1.7]">
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
        <ol className="space-y-3 mb-6 font-body text-[17px] md:text-lg text-green-deep/85 leading-[1.7] list-none counter-reset-item">
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
        <aside className="my-8 p-6 bg-gold/10 border-l-4 border-gold rounded-r-lg">
          <p className="font-display text-base font-bold text-green-deep uppercase tracking-wider mb-2">
            {block.title}
          </p>
          <p className="font-body text-[17px] text-green-deep/85 leading-[1.7]">
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
  const { lang } = useLanguage();
  const s = translations.blog;
  const { slug } = useParams<{ slug: string }>();
  const post = useMemo(() => (slug ? getPostBySlug(slug) : undefined), [slug]);
  const [progress, setProgress] = useState(0);
  const [showTop, setShowTop] = useState(false);

  // Flatten every translatable string from the post (and related posts) into
  // a single array so the hook can translate + cache them in one call.
  const relatedPostsRaw = useMemo(
    () =>
      (post?.related ?? [])
        .map((sl) => blogPosts.find((p) => p.slug === sl))
        .filter((p): p is NonNullable<typeof p> => Boolean(p)),
    [post],
  );

  const sourceTexts = useMemo(() => {
    if (!post) return [] as string[];
    const arr: string[] = [post.titulo, post.excerpt, post.categoria];
    (post.content ?? []).forEach((b) => {
      switch (b.type) {
        case "p":
        case "h2":
        case "h3":
        case "cta":
          arr.push(b.text);
          break;
        case "list":
        case "ordered":
          b.items.forEach((it) => arr.push(it));
          break;
        case "quote":
          arr.push(b.text);
          if (b.author) arr.push(b.author);
          break;
        case "callout":
          arr.push(b.title);
          arr.push(b.text);
          break;
      }
    });
    (post.externalLinks ?? []).forEach((l) => arr.push(l.label));
    relatedPostsRaw.forEach((rp) => {
      arr.push(rp.titulo);
      arr.push(rp.categoria);
    });
    return arr;
  }, [post, relatedPostsRaw]);

  const { texts: translated } = useBlogTexts(sourceTexts);

  // Rebuild a translated copy of the post mirroring the source order above.
  const tPost = useMemo(() => {
    if (!post) return post;
    let i = 0;
    const take = () => translated[i++] ?? sourceTexts[i - 1];
    const titulo = take();
    const excerpt = take();
    const categoria = take();
    const content: ArticleBlock[] | undefined = post.content?.map((b) => {
      switch (b.type) {
        case "p":
          return { ...b, text: take() };
        case "h2":
          return { ...b, text: take() };
        case "h3":
          return { ...b, text: take() };
        case "cta":
          return { ...b, text: take() };
        case "list":
          return { ...b, items: b.items.map(() => take()) };
        case "ordered":
          return { ...b, items: b.items.map(() => take()) };
        case "quote":
          return { ...b, text: take(), author: b.author ? take() : undefined };
        case "callout":
          return { ...b, title: take(), text: take() };
        default:
          return b;
      }
    });
    const externalLinks = post.externalLinks?.map((l) => ({ ...l, label: take() }));
    return { ...post, titulo, excerpt, categoria, content, externalLinks };
  }, [post, translated, sourceTexts]);

  const relatedPosts = useMemo(() => {
    let i = sourceTexts.length - relatedPostsRaw.length * 2;
    return relatedPostsRaw.map((rp) => {
      const titulo = translated[i++] ?? rp.titulo;
      const categoria = translated[i++] ?? rp.categoria;
      return { ...rp, titulo, categoria };
    });
  }, [relatedPostsRaw, translated, sourceTexts]);

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

  if (!post || !tPost) return <Navigate to="/blog" replace />;

  const headings = (tPost.content ?? []).filter(
    (b): b is Extract<ArticleBlock, { type: "h2" }> => b.type === "h2"
  );


  return (
    <div className="min-h-screen bg-cream">
      <Navbar />

      {/* Reading progress bar */}
      <div
        className="fixed top-0 left-0 h-1 bg-gradient-gold z-50 transition-[width] duration-100"
        style={{ width: `${progress}%` }}
      />

      {/* Hero — dark compact split: photo left, text right */}
      <header className="pt-24 md:pt-28 pb-8 md:pb-10 bg-green-deep relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-30 pointer-events-none"
          style={{ backgroundImage: "radial-gradient(circle at 80% 20%, hsl(var(--gold) / 0.35) 0%, transparent 55%)" }}
        />
        <div className="container mx-auto px-6 max-w-6xl relative">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-cream/70 hover:text-gold font-body text-sm transition-colors mb-8"
          >
            <ArrowLeft size={16} />
            {t(s.backToBlog, lang)}
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] gap-8 md:gap-12 items-center"
          >
            {/* Photo */}
            <div className="relative overflow-hidden shadow-2xl aspect-[4/3] md:aspect-[16/10]">
              <img
                src={post.imagem}
                alt={post.titulo}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Text */}
            <div>
              <p className="font-body text-[11px] md:text-xs font-bold uppercase tracking-[0.25em] text-gold mb-3">
                {post.categoria}
              </p>

              <h1 className="font-display font-medium text-cream leading-[1.05] tracking-tight text-3xl md:text-4xl lg:text-[2.75rem] mb-3">
                {post.titulo}
              </h1>

              <p className="font-body text-cream/75 text-sm md:text-[14px] leading-relaxed mb-4 max-w-xl">
                {post.excerpt}
              </p>

              <div className="w-20 h-px bg-gold mb-3" />

              {post.author && (
                <p className="font-display italic text-cream text-sm md:text-base mb-1">
                  {t(s.writtenBy, lang)} <span className="font-semibold not-italic">{post.author}</span>
                </p>
              )}
              <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-cream/60 font-body text-xs md:text-sm">
                <span className="inline-flex items-center gap-1.5">
                  <Clock size={13} /> {post.leitura} {t(s.readTime, lang)}
                </span>
              </div>
            </div>
          </motion.div>
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
                  {t(s.inThisArticle, lang)}
                </p>
                <ul className="space-y-2.5 border-l border-green-deep/15 pl-4">
                  {headings.map((h) => (
                    <li key={h.id}>
                      <a
                        href={`#${h.id}`}
                        className="block text-sm text-green-deep/70 font-body hover:text-gold-dark transition-colors leading-snug"
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
                  {t(s.finishing, lang)}
                </p>
                <p className="font-body text-green-deep/50 text-sm">
                  {t(s.finishingSub, lang)}
                </p>
                <Link
                  to="/blog"
                  className="inline-flex items-center gap-2 mt-8 text-green-deep font-bold font-body hover:text-gold-dark transition-colors"
                >
                  <ArrowLeft size={16} /> {t(s.backToBlog, lang)}
                </Link>
              </div>
            )}

            {/* External authoritative links */}
            {post.externalLinks && post.externalLinks.length > 0 && (
              <section className="mt-14 pt-10 border-t border-green-deep/10">
                <p className="font-display text-xs uppercase tracking-[0.2em] text-green-deep/50 mb-4">
                  {t(s.officialSources, lang)}
                </p>
                <ul className="space-y-2">
                  {post.externalLinks.map((l) => (
                    <li key={l.url}>
                      <a
                        href={l.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-start gap-2 text-green-deep font-body text-sm hover:text-gold-dark transition-colors"
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
        <section className="bg-cream border-t border-green-deep/10 py-16">
          <div className="container mx-auto px-6 max-w-6xl">
            <h2 className="font-display text-2xl md:text-3xl text-green-deep mb-8">
              {t(s.keepReading, lang)}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((rp) => rp && (
                <Link
                  key={rp.slug}
                  to={`/blog/${rp.slug}`}
                  className="group bg-white/70 backdrop-blur-sm rounded-xl overflow-hidden border border-green-deep/10 hover:border-gold/60 hover:shadow-xl transition-all duration-300"
                >
                  <div className="aspect-[16/9] overflow-hidden">
                    <img src={rp.imagem} alt={rp.titulo} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                  </div>
                  <div className="p-5">
                    <span className="inline-block text-[10px] font-semibold font-body text-gold-dark uppercase tracking-[0.2em] mb-2">
                      {rp.categoria}
                    </span>
                    <h3 className="font-display text-lg text-green-deep leading-snug group-hover:text-gold-dark transition-colors">
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
          aria-label={t(s.backToTop, lang)}
          className="fixed bottom-24 right-6 w-11 h-11 rounded-full bg-green-deep text-gold shadow-lg flex items-center justify-center hover:bg-gold hover:text-green-deep transition-colors z-40"
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
