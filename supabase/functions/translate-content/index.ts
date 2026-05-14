// Translates an array of strings to a target language using Lovable AI Gateway.
// Caches results in public.post_translations keyed by (cache_key, lang).
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const LANG_NAME: Record<string, string> = {
  en: "English (US)",
  es: "Spanish (neutral Latin American)",
  pt: "Brazilian Portuguese",
};

interface Body {
  cacheKey: string; // stable id (e.g. "post:<slug>:v1")
  lang: "en" | "es" | "pt";
  texts: string[];
  context?: string;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const { cacheKey, lang, texts, context }: Body = await req.json();

    if (!cacheKey || !lang || !Array.isArray(texts)) {
      return json({ error: "cacheKey, lang and texts[] are required" }, 400);
    }
    if (lang === "pt") return json({ texts });
    if (!LANG_NAME[lang]) return json({ error: "Unsupported lang" }, 400);
    if (texts.length === 0) return json({ texts: [] });

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    // Cache lookup
    const { data: cached } = await supabase
      .from("post_translations")
      .select("data")
      .eq("cache_key", cacheKey)
      .eq("lang", lang)
      .maybeSingle();

    if (cached?.data && Array.isArray((cached.data as any).texts) &&
        (cached.data as any).texts.length === texts.length) {
      return json({ texts: (cached.data as any).texts, cached: true });
    }

    const apiKey = Deno.env.get("LOVABLE_API_KEY");
    if (!apiKey) return json({ error: "LOVABLE_API_KEY missing" }, 500);

    const systemPrompt = `You translate marketing/legal/immigration content from Brazilian Portuguese to ${LANG_NAME[lang]}.
Rules:
- Return the SAME number of items in the same order.
- Preserve inline HTML tags (<strong>, <a href="...">, <em>, <br>) exactly.
- Preserve URLs, emails, phone numbers, brand names ("EBGreen", "USCIS", "Green Card", visa codes like EB-2 NIW, EB-1A, O-1, EB-5, E-2, F-1, R-1, EB-3) UNCHANGED.
- Keep tone professional and natural. Do not add or omit information.
- Do not translate code-like tokens such as visa categories, statute numbers, or proper nouns.
${context ? `Context: ${context}` : ""}`;

    const aiRes = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          {
            role: "user",
            content:
              `Translate every item in this JSON array to ${LANG_NAME[lang]}. Return ONLY the translated array via the tool call.\n\n` +
              JSON.stringify(texts),
          },
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "return_translations",
              description: "Return the translated strings in the same order.",
              parameters: {
                type: "object",
                properties: {
                  texts: {
                    type: "array",
                    items: { type: "string" },
                  },
                },
                required: ["texts"],
                additionalProperties: false,
              },
            },
          },
        ],
        tool_choice: { type: "function", function: { name: "return_translations" } },
      }),
    });

    if (!aiRes.ok) {
      const errText = await aiRes.text();
      console.error("AI gateway error", aiRes.status, errText);
      if (aiRes.status === 429) return json({ error: "Rate limit exceeded" }, 429);
      if (aiRes.status === 402) return json({ error: "Payment required" }, 402);
      return json({ error: "AI gateway error" }, 500);
    }

    const aiJson = await aiRes.json();
    const toolCall = aiJson?.choices?.[0]?.message?.tool_calls?.[0];
    const args = toolCall?.function?.arguments;
    if (!args) return json({ error: "No translation returned" }, 500);

    let parsed: { texts: string[] };
    try {
      parsed = JSON.parse(args);
    } catch {
      return json({ error: "Invalid translation JSON" }, 500);
    }

    if (!Array.isArray(parsed.texts) || parsed.texts.length !== texts.length) {
      return json({ error: "Translation length mismatch" }, 500);
    }

    // Cache (upsert)
    await supabase.from("post_translations").upsert({
      cache_key: cacheKey,
      lang,
      data: { texts: parsed.texts },
    });

    return json({ texts: parsed.texts, cached: false });
  } catch (e) {
    console.error("translate-content error", e);
    return json({ error: e instanceof Error ? e.message : "Unknown error" }, 500);
  }
});

function json(payload: unknown, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}
