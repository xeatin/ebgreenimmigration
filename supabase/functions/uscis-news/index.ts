// USCIS News RSS proxy — fetches the official feed and returns parsed JSON
// No auth required; verify_jwt is disabled in supabase/config.toml
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const FEED_URL =
  "https://news.google.com/rss/search?q=(USCIS+OR+%22imigra%C3%A7%C3%A3o+americana%22+OR+%22green+card%22+OR+%22visto+americano%22)+when:14d&hl=pt-BR&gl=BR&ceid=BR:pt";

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
    .replace(/&nbsp;/g, " ")
    .replace(/<[^>]+>/g, "")
    .trim();
}

function parseRss(xml: string): NewsItem[] {
  const items: NewsItem[] = [];
  const itemRegex = /<item>([\s\S]*?)<\/item>/g;
  let match;
  while ((match = itemRegex.exec(xml)) !== null) {
    const block = match[1];
    const getRaw = (tag: string) => {
      const r = new RegExp(`<${tag}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${tag}>`).exec(block);
      return r ? r[1] : "";
    };
    const get = (tag: string) => decodeEntities(getRaw(tag));

    // Try to extract the real source link from the description's first <a href="...">
    const descRaw = getRaw("description").replace(/<!\[CDATA\[(.*?)\]\]>/gs, "$1");
    const hrefMatch = /<a[^>]+href=["']([^"']+)["']/i.exec(descRaw);
    const fallbackLink = get("link");
    const link = hrefMatch ? hrefMatch[1].replace(/&amp;/g, "&") : fallbackLink;

    items.push({
      title: get("title"),
      link,
      pubDate: get("pubDate"),
      description: get("description"),
      source: get("source"),
    });
  }
  return items;
}

// Decode the base64-encoded protobuf inside Google News article URLs
// to recover the original publisher URL. Falls back to the input on failure.
function resolveGoogleNewsUrl(gUrl: string): string {
  try {
    const m = /\/articles\/([^?\/]+)/.exec(gUrl);
    if (!m) return gUrl;
    let b64 = m[1].replace(/-/g, "+").replace(/_/g, "/");
    while (b64.length % 4) b64 += "=";
    const bin = atob(b64);
    // Look for an http(s):// substring inside the decoded protobuf payload
    const urlMatch = /https?:\/\/[^\x00-\x1f"<>\\^`{|}\s]+/.exec(bin);
    if (urlMatch) {
      // Trim trailing protobuf garbage (length-prefixed strings often have non-url bytes after)
      return urlMatch[0].replace(/[^\w\d\-._~:/?#\[\]@!$&'()*+,;=%]+$/, "");
    }
    return gUrl;
  } catch {
    return gUrl;
  }
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const res = await fetch(FEED_URL, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36",
        "Accept": "application/rss+xml, application/xml, text/xml, */*",
        "Accept-Language": "pt-BR,pt;q=0.9,en;q=0.8",
      },
    });
    if (!res.ok) throw new Error(`Feed returned ${res.status}`);
    const xml = await res.text();
    const items = parseRss(xml).slice(0, 15).map((it) => ({
      ...it,
      link: it.link.includes("news.google.com") ? resolveGoogleNewsUrl(it.link) : it.link,
    }));

    return new Response(JSON.stringify({ items, fetchedAt: new Date().toISOString() }), {
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=1800", // 30 min cache
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
