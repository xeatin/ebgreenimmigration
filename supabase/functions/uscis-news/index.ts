// USCIS News RSS proxy — fetches the official feed and returns parsed JSON
// No auth required; verify_jwt is disabled in supabase/config.toml
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const FEED_URL = "https://www.uscis.gov/news/rss-feed/59";

interface NewsItem {
  title: string;
  link: string;
  pubDate: string;
  description: string;
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
    const get = (tag: string) => {
      const r = new RegExp(`<${tag}>([\\s\\S]*?)<\\/${tag}>`).exec(block);
      return r ? decodeEntities(r[1]) : "";
    };
    items.push({
      title: get("title"),
      link: get("link"),
      pubDate: get("pubDate"),
      description: get("description"),
    });
  }
  return items;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const res = await fetch(FEED_URL, {
      headers: { "User-Agent": "Mozilla/5.0 EBGreen-Immigration-News-Reader" },
    });
    if (!res.ok) throw new Error(`USCIS feed returned ${res.status}`);
    const xml = await res.text();
    const items = parseRss(xml).slice(0, 15);

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
