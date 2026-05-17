// Translate a batch of news items via Lovable AI Gateway
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface Item {
  id: string;
  title: string;
  description?: string;
}

const LANG_NAME: Record<string, string> = {
  pt: "Brazilian Portuguese",
  es: "Spanish (Latin America)",
  en: "English",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  try {
    const { items, target } = (await req.json()) as { items: Item[]; target: string };
    if (!items?.length || !target || target === "en") {
      return new Response(JSON.stringify({ items: items ?? [] }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY not configured");

    const langName = LANG_NAME[target] ?? target;
    const payload = items.map((i) => ({ id: i.id, title: i.title, description: i.description ?? "" }));

    const resp = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash-lite",
        messages: [
          {
            role: "system",
            content:
              `You translate U.S. immigration news from English to ${langName}. Keep proper nouns (USCIS, EB-1A, Visa Bulletin, Green Card, H-1B, etc.) in English. Be faithful, concise, journalistic tone. Return ONLY a valid JSON array of objects {id, title, description}, no markdown, no commentary.`,
          },
          {
            role: "user",
            content: `Translate these to ${langName}:\n${JSON.stringify(payload)}`,
          },
        ],
        temperature: 0.2,
      }),
    });

    if (resp.status === 429 || resp.status === 402) {
      // rate-limit / credits: return originals so UI doesn't break
      return new Response(JSON.stringify({ items, fallback: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (!resp.ok) throw new Error(`AI gateway ${resp.status}`);
    const data = await resp.json();
    const content: string = data?.choices?.[0]?.message?.content ?? "[]";
    const cleaned = content.replace(/^```(?:json)?/i, "").replace(/```$/, "").trim();
    let translated: Item[] = [];
    try {
      translated = JSON.parse(cleaned);
    } catch {
      const m = cleaned.match(/\[[\s\S]*\]/);
      if (m) translated = JSON.parse(m[0]);
    }
    const byId = new Map(translated.map((t) => [t.id, t]));
    const merged = items.map((i) => {
      const t = byId.get(i.id);
      return t ? { ...i, title: t.title || i.title, description: t.description || i.description } : i;
    });

    return new Response(JSON.stringify({ items: merged }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("translate-news error:", err);
    return new Response(
      JSON.stringify({ error: err instanceof Error ? err.message : "Failed" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
