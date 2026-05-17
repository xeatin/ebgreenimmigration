// Latest USCIS / DoS Visa Bulletin proxy
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const INDEX_URL =
  "https://travel.state.gov/content/travel/en/legal/visa-law0/visa-bulletin.html";
const BASE = "https://travel.state.gov";

const MONTHS: Record<string, number> = {
  january: 1, february: 2, march: 3, april: 4, may: 5, june: 6,
  july: 7, august: 8, september: 9, october: 10, november: 11, december: 12,
};

interface Bulletin {
  month: string;
  monthNumber: number;
  year: number;
  url: string;
  publishedAt: string;
}

async function fetchText(url: string): Promise<string> {
  const r = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36",
      "Accept": "text/html,application/xhtml+xml",
    },
  });
  if (!r.ok) throw new Error(`Fetch ${url} -> ${r.status}`);
  return await r.text();
}

function findCurrentBulletin(html: string): Bulletin | null {
  // Look for links like .../visa-bulletin/YYYY/visa-bulletin-for-<month>-<year>.html
  const re = /\/content\/travel\/en\/legal\/visa-law0\/visa-bulletin\/(\d{4})\/visa-bulletin-for-([a-z]+)-(\d{4})\.html/gi;
  const found: Bulletin[] = [];
  let m;
  while ((m = re.exec(html)) !== null) {
    const monthName = m[2].toLowerCase();
    const year = parseInt(m[3], 10);
    const monthNumber = MONTHS[monthName];
    if (!monthNumber) continue;
    const url = `${BASE}${m[0]}`;
    found.push({
      month: monthName,
      monthNumber,
      year,
      url,
      publishedAt: new Date(year, monthNumber - 1, 1).toISOString(),
    });
  }
  if (!found.length) return null;
  // Pick the one with the highest year+month that is <= current month + 1 (allow upcoming)
  const now = new Date();
  const cap = now.getFullYear() * 12 + (now.getMonth() + 1) + 1; // allow next month (upcoming bulletin)
  const valid = found.filter((b) => b.year * 12 + b.monthNumber <= cap);
  const pool = valid.length ? valid : found;
  pool.sort((a, b) => (b.year * 12 + b.monthNumber) - (a.year * 12 + a.monthNumber));
  // Prefer the "current" one (not future). If top is future, pick most recent past/current.
  const currentKey = now.getFullYear() * 12 + (now.getMonth() + 1);
  const currentOrPast = pool.find((b) => b.year * 12 + b.monthNumber <= currentKey);
  return currentOrPast ?? pool[0];
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  try {
    const html = await fetchText(INDEX_URL);
    const bulletin = findCurrentBulletin(html);
    if (!bulletin) throw new Error("Could not locate latest visa bulletin link");

    return new Response(
      JSON.stringify({ bulletin, fetchedAt: new Date().toISOString() }),
      {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
          "Cache-Control": "no-store, max-age=0",
        },
      }
    );
  } catch (err) {
    console.error("visa-bulletin error:", err);
    return new Response(
      JSON.stringify({ error: err instanceof Error ? err.message : "Failed" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
