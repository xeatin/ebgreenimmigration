// Translate blog post fields via Lovable AI Gateway
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const LANG_NAME: Record<string, string> = {
  pt: "Brazilian Portuguese",
  es: "Spanish (Latin America)",
  en: "English (US)",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  try {
    const { texts, target } = (await req.json()) as { texts: string[]; target: string };
    if (!texts?.length || !target || target === "pt") {
      return new Response(JSON.stringify({ texts: texts ?? [] }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY not configured");

    const langName = LANG_NAME[target] ?? target;
    const payload = texts.map((text, i) => ({ id: i, text }));

    const resp = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          {
            role: "system",
            content: `You translate U.S. immigration blog content from Portuguese to ${langName}. Keep proper nouns and visa names (USCIS, EB-1A, EB-2 NIW, Visa Bulletin, Green Card, H-1B, O-1, etc.) in English. Preserve any HTML tags (<a>, <strong>, <em>) exactly. Be faithful and natural, journalistic tone. Return ONLY a valid JSON array of objects {id, text}, no markdown, no commentary.`,
          },
          {
            role: "user",
            content: `Translate to ${langName}:\n${JSON.stringify(payload)}`,
          },
        ],
        temperature: 0.2,
      }),
    });

    if (resp.status === 429 || resp.status === 402) {
      return new Response(JSON.stringify({ texts, fallback: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (!resp.ok) throw new Error(`AI gateway ${resp.status}`);
    const data = await resp.json();
    const content: string = data?.choices?.[0]?.message?.content ?? "[]";
    const cleaned = content.replace(/^```(?:json)?/i, "").replace(/```$/, "").trim();
    let translated: { id: number; text: string }[] = [];
    try {
      translated = JSON.parse(cleaned);
    } catch {
      const m = cleaned.match(/\[[\s\S]*\]/);
      if (m) translated = JSON.parse(m[0]);
    }
    const byId = new Map(translated.map((t) => [t.id, t.text]));
    const merged = texts.map((orig, i) => byId.get(i) ?? orig);

    return new Response(JSON.stringify({ texts: merged }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("translate-blog error:", err);
    return new Response(
      JSON.stringify({ error: err instanceof Error ? err.message : "Failed" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
