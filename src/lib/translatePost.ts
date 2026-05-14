import { supabase } from "@/integrations/supabase/client";
import type { BlogPost, ArticleBlock } from "@/data/blog-posts";
import type { Language } from "@/i18n/translations";

// Bump this when the extraction shape or translation prompt changes
// to invalidate the on-disk + sessionStorage cache.
const TRANSLATION_VERSION = "v1";

type Slot = string;

/** Walk a post and pull out every translatable string in a stable order. */
function extractStrings(post: BlogPost): Slot[] {
  const out: Slot[] = [];
  out.push(post.titulo);
  out.push(post.categoria);
  out.push(post.excerpt);
  out.push(post.metaTitle ?? "");
  out.push(post.metaDescription ?? "");
  out.push(post.author ?? "");

  for (const b of post.content ?? []) {
    switch (b.type) {
      case "p":
      case "h2":
      case "h3":
      case "cta":
        out.push(b.text);
        break;
      case "quote":
        out.push(b.text);
        out.push(b.author ?? "");
        break;
      case "callout":
        out.push(b.title);
        out.push(b.text);
        break;
      case "list":
      case "ordered":
        out.push(String(b.items.length));
        for (const it of b.items) out.push(it);
        break;
    }
  }

  for (const l of post.externalLinks ?? []) out.push(l.label);
  return out;
}

/** Reverse of extractStrings: rebuild a post using the translated slots. */
function applyStrings(post: BlogPost, slots: Slot[]): BlogPost {
  let i = 0;
  const next: BlogPost = {
    ...post,
    titulo: slots[i++] ?? post.titulo,
    categoria: slots[i++] ?? post.categoria,
    excerpt: slots[i++] ?? post.excerpt,
    metaTitle: post.metaTitle ? (slots[i++] ?? post.metaTitle) : (i++, post.metaTitle),
    metaDescription: post.metaDescription
      ? (slots[i++] ?? post.metaDescription)
      : (i++, post.metaDescription),
    author: post.author ? (slots[i++] ?? post.author) : (i++, post.author),
  };

  if (post.content) {
    next.content = post.content.map<ArticleBlock>((b) => {
      switch (b.type) {
        case "p":
          return { ...b, text: slots[i++] ?? b.text };
        case "h2":
          return { ...b, text: slots[i++] ?? b.text };
        case "h3":
          return { ...b, text: slots[i++] ?? b.text };
        case "cta":
          return { ...b, text: slots[i++] ?? b.text };
        case "quote":
          return {
            ...b,
            text: slots[i++] ?? b.text,
            author: b.author ? slots[i++] ?? b.author : (i++, b.author),
          };
        case "callout":
          return {
            ...b,
            title: slots[i++] ?? b.title,
            text: slots[i++] ?? b.text,
          };
        case "list": {
          i++; // consume length marker
          const items = b.items.map(() => slots[i++] ?? "");
          return { ...b, items };
        }
        case "ordered": {
          i++;
          const items = b.items.map(() => slots[i++] ?? "");
          return { ...b, items };
        }
      }
    });
  }

  if (post.externalLinks) {
    next.externalLinks = post.externalLinks.map((l) => ({
      ...l,
      label: slots[i++] ?? l.label,
    }));
  }

  return next;
}

const memCache = new Map<string, BlogPost>();

function sessionKey(slug: string, lang: Language) {
  return `tpost:${TRANSLATION_VERSION}:${slug}:${lang}`;
}

export async function translatePost(
  post: BlogPost,
  lang: Language,
): Promise<BlogPost> {
  if (lang === "pt") return post;

  const memKey = `${post.slug}:${lang}`;
  if (memCache.has(memKey)) return memCache.get(memKey)!;

  // sessionStorage cache (per tab, instant on re-render)
  try {
    const raw = sessionStorage.getItem(sessionKey(post.slug, lang));
    if (raw) {
      const parsed = JSON.parse(raw) as BlogPost;
      memCache.set(memKey, parsed);
      return parsed;
    }
  } catch { /* ignore */ }

  const texts = extractStrings(post);
  const cacheKey = `post:${post.slug}:${TRANSLATION_VERSION}`;

  const { data, error } = await supabase.functions.invoke("translate-content", {
    body: {
      cacheKey,
      lang,
      texts,
      context: "EBGreen blog article about U.S. immigration / Green Card.",
    },
  });

  if (error || !data?.texts) {
    console.error("translatePost failed", error, data);
    return post; // fallback to PT
  }

  const translated = applyStrings(post, data.texts as string[]);
  memCache.set(memKey, translated);
  try {
    sessionStorage.setItem(sessionKey(post.slug, lang), JSON.stringify(translated));
  } catch { /* quota — ignore */ }
  return translated;
}

/** Translate just the summary fields used in the listing grid. */
export async function translatePostSummary(
  post: BlogPost,
  lang: Language,
): Promise<BlogPost> {
  if (lang === "pt") return post;

  const memKey = `summary:${post.slug}:${lang}`;
  if (memCache.has(memKey)) return memCache.get(memKey)!;

  try {
    const raw = sessionStorage.getItem(`t${memKey}:${TRANSLATION_VERSION}`);
    if (raw) {
      const parsed = JSON.parse(raw) as BlogPost;
      memCache.set(memKey, parsed);
      return parsed;
    }
  } catch { /* ignore */ }

  const texts = [post.titulo, post.categoria, post.excerpt];
  const cacheKey = `summary:${post.slug}:${TRANSLATION_VERSION}`;

  const { data, error } = await supabase.functions.invoke("translate-content", {
    body: {
      cacheKey,
      lang,
      texts,
      context: "Blog post card preview (title, category, excerpt).",
    },
  });

  if (error || !data?.texts) {
    console.error("translatePostSummary failed", error, data);
    return post;
  }

  const [titulo, categoria, excerpt] = data.texts as string[];
  const out: BlogPost = { ...post, titulo, categoria, excerpt };
  memCache.set(memKey, out);
  try {
    sessionStorage.setItem(`t${memKey}:${TRANSLATION_VERSION}`, JSON.stringify(out));
  } catch { /* ignore */ }
  return out;
}
