// US Immigration news proxy — uses Bing News RSS for direct publisher URLs
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Focused on USCIS and US visa/immigration news from American sources,
// including Congress, legislation and policy updates.
const QUERIES = [
  "USCIS",
  '"US visa" policy',
  '"immigration law" Congress',
  '"green card" USCIS',
  '"visa bulletin"',
  '"immigration bill" Congress',
];
const FEED_URLS = QUERIES.map(
  (q) =>
    `https://www.bing.com/news/search?q=${encodeURIComponent(q)}&format=rss&setlang=en-US&cc=US`
);

interface NewsItem {
  title: string;
  link: string;
  pubDate: string;
  description: string;
  source: string;
}

function decodeEntities(str: string): string {
  return str
    .replace(/<!\[CDATA\[(.*?)\]\]>/gs, "$1")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(parseInt(n, 10)))
    .replace(/<[^>]+>/g, "")
    .trim();
}

function unwrapBingUrl(link: string): string {
  try {
    const u = new URL(link);
    if (u.hostname.includes("news.google.com")) return "";
    const real = u.searchParams.get("url");
    if (real) return real;
    if (u.hostname.includes("bing.com")) return "";
    return link;
  } catch {
    return link;
  }
}

function isBlockedNewsUrl(link: string): boolean {
  try {
    const hostname = new URL(link).hostname.replace(/^www\./, "");
    return hostname === "news.google.com" || hostname.endsWith(".news.google.com") || hostname.endsWith("bing.com");
  } catch {
    return true;
  }
}

function hostFromUrl(link: string): string {
  try {
    return new URL(link).hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
}

function parseRss(xml: string): NewsItem[] {
  const items: NewsItem[] = [];
  const itemRegex = /<item>([\s\S]*?)<\/item>/g;
  let match;
  while ((match = itemRegex.exec(xml)) !== null) {
    const block = match[1];
    const get = (tag: string) => {
      const r = new RegExp(`<${tag}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${tag}>`).exec(block);
      return r ? decodeEntities(r[1]) : "";
    };
    const rawLink = get("link");
    const link = unwrapBingUrl(rawLink);
    items.push({
      title: get("title"),
      link,
      pubDate: get("pubDate"),
      description: get("description"),
      source: hostFromUrl(link),
    });
  }
  return items;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const responses = await Promise.all(
      FEED_URLS.map((url) =>
        fetch(url, {
          headers: {
            "User-Agent":
              "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36",
            "Accept": "application/rss+xml, application/xml, text/xml, */*",
            "Accept-Language": "pt-BR,pt;q=0.9,en;q=0.8",
          },
        })
          .then((r) => (r.ok ? r.text() : ""))
          .catch(() => "")
      )
    );

    const all = responses
      .flatMap(parseRss)
      .filter((i) => i.link && i.title && !isBlockedNewsUrl(i.link));

    // Deduplicate by link
    const seen = new Set<string>();
    const unique = all.filter((i) => {
      if (seen.has(i.link)) return false;
      seen.add(i.link);
      return true;
    });

    // Sort by pubDate desc
    unique.sort((a, b) => {
      const da = new Date(a.pubDate).getTime() || 0;
      const db = new Date(b.pubDate).getTime() || 0;
      return db - da;
    });

    const items = unique.slice(0, 15);

    if (items.length === 0) throw new Error("No items returned from upstream feeds");

    return new Response(JSON.stringify({ items, fetchedAt: new Date().toISOString() }), {
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
        "Cache-Control": "no-store, max-age=0",
      },
    });
  } catch (err) {
    console.error("uscis-news error:", err);
    return new Response(
      JSON.stringify({ error: err instanceof Error ? err.message : "Failed to fetch news" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

