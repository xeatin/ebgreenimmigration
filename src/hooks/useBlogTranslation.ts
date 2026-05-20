import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/i18n/LanguageContext";
import type { Language } from "@/i18n/translations";

const CACHE_PREFIX = "ebgreen-blog-i18n-v1";

const readCache = (key: string): Record<string, string> => {
  try {
    const raw = localStorage.getItem(`${CACHE_PREFIX}:${key}`);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
};

const writeCache = (key: string, data: Record<string, string>) => {
  try {
    localStorage.setItem(`${CACHE_PREFIX}:${key}`, JSON.stringify(data));
  } catch {
    /* ignore quota */
  }
};

/**
 * Translates an array of Portuguese strings to the active language.
 * Returns the original array immediately, then the translated array when ready.
 * Results are cached in localStorage per language.
 */
export function useBlogTexts(texts: string[]): { texts: string[]; loading: boolean } {
  const { lang } = useLanguage();
  const [out, setOut] = useState<string[]>(texts);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (lang === "pt" || texts.length === 0) {
      setOut(texts);
      return;
    }

    const cache = readCache(lang);
    const missing: string[] = [];
    const resolved = texts.map((t) => {
      if (!t) return t;
      if (cache[t]) return cache[t];
      missing.push(t);
      return t;
    });
    setOut(resolved);

    if (missing.length === 0) return;

    let cancelled = false;
    setLoading(true);
    (async () => {
      try {
        const unique = Array.from(new Set(missing));
        const { data, error } = await supabase.functions.invoke("translate-blog", {
          body: { texts: unique, target: lang as Language },
        });
        if (error) throw error;
        const translated: string[] = data?.texts ?? unique;
        const next = { ...cache };
        unique.forEach((src, i) => {
          if (translated[i]) next[src] = translated[i];
        });
        writeCache(lang, next);
        if (!cancelled) {
          setOut(texts.map((t) => (t && next[t]) || t));
        }
      } catch (e) {
        console.error("translate-blog failed", e);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang, texts.join("\u0001")]);

  return { texts: out, loading };
}
