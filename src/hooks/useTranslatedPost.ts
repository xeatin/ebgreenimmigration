import { useEffect, useState } from "react";
import type { BlogPost } from "@/data/blog-posts";
import type { Language } from "@/i18n/translations";
import { translatePost, translatePostSummary } from "@/lib/translatePost";

export function useTranslatedPost(post: BlogPost | undefined, lang: Language) {
  const [data, setData] = useState<BlogPost | undefined>(post);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!post) {
      setData(undefined);
      return;
    }
    if (lang === "pt") {
      setData(post);
      return;
    }
    let cancelled = false;
    setLoading(true);
    setData(post); // optimistic PT while translating
    translatePost(post, lang)
      .then((p) => {
        if (!cancelled) setData(p);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [post?.slug, lang]); // eslint-disable-line react-hooks/exhaustive-deps

  return { post: data, loading };
}

export function useTranslatedSummaries(posts: BlogPost[], lang: Language) {
  const [data, setData] = useState<BlogPost[]>(posts);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (lang === "pt") {
      setData(posts);
      return;
    }
    let cancelled = false;
    setLoading(true);
    setData(posts); // optimistic PT first
    Promise.all(posts.map((p) => translatePostSummary(p, lang)))
      .then((translated) => {
        if (!cancelled) setData(translated);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [lang, posts]); // posts ref must be stable across renders

  return { posts: data, loading };
}
