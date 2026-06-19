const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
}
import { z } from 'npm:zod@3.25.76'
import { createClient } from 'npm:@supabase/supabase-js@2'

// Attribution payload sent from the client (UTMs + click IDs + landing context).
// All fields optional — we never block a lead on missing tracking data.
const AttributionSchema = z.object({
  utm_source: z.string().max(500).optional(),
  utm_medium: z.string().max(500).optional(),
  utm_campaign: z.string().max(500).optional(),
  utm_term: z.string().max(500).optional(),
  utm_content: z.string().max(500).optional(),
  fbclid: z.string().max(500).optional(),
  gclid: z.string().max(500).optional(),
  gbraid: z.string().max(500).optional(),
  wbraid: z.string().max(500).optional(),
  msclkid: z.string().max(500).optional(),
  ttclid: z.string().max(500).optional(),
  landing_page: z.string().max(2048).optional(),
  referrer: z.string().max(2048).optional(),
}).partial().optional()

// SHA-256 hex strings produced by the client per Meta CAPI Advanced Matching spec.
const HashedUserDataSchema = z.object({
  em: z.string().length(64).optional(),
  ph: z.string().length(64).optional(),
  fn: z.string().length(64).optional(),
  ln: z.string().length(64).optional(),
  ct: z.string().length(64).optional(),
  st: z.string().length(64).optional(),
  zp: z.string().length(64).optional(),
  country: z.string().length(64).optional(),
}).partial().optional()

const ContactSchema = z.object({
  source: z.string().max(80).optional().default('website'),
  firstName: z.string().min(1).max(100),
  lastName: z.string().min(1).max(100).optional().default(''),
  email: z.union([z.string().email().max(255), z.literal('')]).optional().default(''),
  phoneCode: z.string().max(10).optional().default(''),
  phone: z.string().max(30).optional().default(''),
  visa: z.string().max(50),
  education: z.string().max(50),
  experience: z.string().max(50).optional().default(''),
  message: z.string().max(5000).optional().default(''),
  resumeUrl: z.union([z.string().url().max(2048), z.literal('')]).optional().default(''),
  resumePath: z.string().max(512).optional().default(''),
  resumeName: z.string().max(255).optional().default(''),
  // --- Tracking (all optional — graceful degradation if missing) ---
  event_id: z.string().max(100).optional(),
  event_source_url: z.string().max(2048).optional(),
  user_agent: z.string().max(1000).optional(),
  attribution: AttributionSchema,
  user_data_hashed: HashedUserDataSchema,
  skipKommo: z.boolean().optional().default(false),
})

const extractLeadId = (payload: unknown): string | number | undefined => {
  if (Array.isArray(payload)) {
    const first = payload[0]
    return first && typeof first === 'object' && 'id' in first
      ? (first as { id?: string | number }).id
      : undefined
  }

  if (!payload || typeof payload !== 'object') {
    return undefined
  }

  const record = payload as {
    leadId?: string | number
    lead_id?: string | number
    id?: string | number
    lead?: { id?: string | number }
    data?: { id?: string | number }
  }

  return record.leadId ?? record.lead_id ?? record.id ?? record.lead?.id ?? record.data?.id
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const body = await req.json()
    const parsed = ContactSchema.safeParse(body)
    
    if (!parsed.success) {
      return new Response(
        JSON.stringify({ error: 'Invalid input', details: parsed.error.flatten().fieldErrors }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const {
      source, firstName, lastName, email, phoneCode, phone, visa, education, experience,
      message, resumeUrl: resumeUrlInput, resumePath, resumeName,
      event_id, event_source_url, user_agent, attribution, user_data_hashed,
      skipKommo: skipKommoFlag,
    } = parsed.data

    // Client IP (best-effort; Supabase Edge runtime exposes the original via these headers)
    const client_ip =
      req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      req.headers.get('cf-connecting-ip') ||
      req.headers.get('x-real-ip') ||
      undefined

    const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')
    if (!RESEND_API_KEY) {
      return new Response(
        JSON.stringify({ error: 'Email service not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Generate a signed download URL for the resume (the 'resumes' bucket is
    // private — public URLs no longer work). Valid for 30 days, which is more
    // than enough for the sales team to review the lead.
    let resumeUrl = resumeUrlInput
    if (resumePath) {
      try {
        const SUPABASE_URL = Deno.env.get('SUPABASE_URL') ?? ''
        const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
        if (SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY) {
          const admin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)
          const { data: signed, error: signErr } = await admin.storage
            .from('resumes')
            .createSignedUrl(resumePath, 60 * 60 * 24 * 30)
          if (signErr) {
            console.error('Failed to sign resume URL:', signErr)
          } else if (signed?.signedUrl) {
            resumeUrl = signed.signedUrl
          }
        }
      } catch (err) {
        console.error('Resume signing error:', err)
      }
    }

    const emailHtml = `
      <h2>Novo lead do site EB Green</h2>
      <table style="border-collapse:collapse;width:100%">
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Origem</td><td style="padding:8px;border:1px solid #ddd">${source}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Nome</td><td style="padding:8px;border:1px solid #ddd">${firstName} ${lastName}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">E-mail</td><td style="padding:8px;border:1px solid #ddd">${email}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Telefone</td><td style="padding:8px;border:1px solid #ddd">${phoneCode} ${phone}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Visto</td><td style="padding:8px;border:1px solid #ddd">${visa || 'Não informado'}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Formação</td><td style="padding:8px;border:1px solid #ddd">${education}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Experiência</td><td style="padding:8px;border:1px solid #ddd">${experience}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Mensagem</td><td style="padding:8px;border:1px solid #ddd">${message || 'Nenhuma'}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Currículo</td><td style="padding:8px;border:1px solid #ddd">${resumeUrl ? `<a href="${resumeUrl}" target="_blank" rel="noopener">${resumeName || 'Baixar currículo'}</a>` : 'Não enviado'}</td></tr>
      </table>
    `

    // Skip N8N (Kommo) for low-qualification leads:
    //  - Ensino Médio
    //  - Técnico ou Tecnólogo com menos de 5 anos de experiência
    // Normaliza removendo acentos para evitar falsos negativos ("Ensino Medio" vs "Ensino Médio")
    const stripAccents = (s: string) => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    const eduNormalized = stripAccents((education || '').trim().toLowerCase())
    const expNormalized = stripAccents((experience || '').trim().toLowerCase())
    const isHighSchool = eduNormalized.includes('ensino medio') || eduNormalized === 'high school'
    const isTechnical = eduNormalized.includes('tecnico') || eduNormalized.includes('tecnologo')
    const isLowExperience = expNormalized.includes('menos de 5')
    const skipKommo = isHighSchool || (isTechnical && isLowExperience)
    const qualification = skipKommo ? 'low' : 'qualified'
    const qualificationReason = isHighSchool
      ? 'Ensino Médio'
      : (isTechnical && isLowExperience)
        ? 'Técnico/Tecnólogo com menos de 5 anos de experiência'
        : 'Atende aos critérios mínimos de qualificação'

    // Notify N8N webhook (Kommo). We await so we can return leadId to the client.
    let kommo: { skipped: boolean; status?: number; leadId?: string | number; body?: unknown; error?: string; reason?: string } = { skipped: skipKommo, reason: qualificationReason }
    const n8nPromise = skipKommo
      ? Promise.resolve(console.log('N8N webhook skipped:', { isHighSchool, isTechnical, isLowExperience, reason: qualificationReason }))
      : fetch('https://n8n.srv1283251.hstgr.cloud/webhook/website-form-lead', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            // Origem do lead (CRM/Kommo usa para identificar o canal exato)
            source,
            formSource: source,
            leadSource: source,
            origin: source,
            channel: source,
            // Mensagem composta enviada pelo formulário
            message,
            note: message,
            comments: message,
            // Qualificação
            qualification,
            qualificationReason,
            // Dados do contato
            firstName,
            lastName,
            email,
            phoneCode,
            phone,
            visa,
            education,
            experience,
            resumeUrl,
            resumeName,
            // --- Tracking (consumido pelo n8n e gravado em campos customizados do Kommo) ---
            // Pixel↔CAPI dedupe key (mesmo id que o navegador disparou em fbq Lead)
            event_id,
            event_source_url,
            user_agent,
            client_ip,
            // UTMs + click IDs (atribuição)
            utm_source: attribution?.utm_source,
            utm_medium: attribution?.utm_medium,
            utm_campaign: attribution?.utm_campaign,
            utm_term: attribution?.utm_term,
            utm_content: attribution?.utm_content,
            fbclid: attribution?.fbclid,
            gclid: attribution?.gclid,
            gbraid: attribution?.gbraid,
            wbraid: attribution?.wbraid,
            msclkid: attribution?.msclkid,
            ttclid: attribution?.ttclid,
            landing_page: attribution?.landing_page,
            referrer: attribution?.referrer,
            // User data hasheada (pronta pra Meta CAPI Advanced Matching)
            user_data_hashed,
          }),
        })
          .then(async (r) => {
            console.log('N8N webhook status:', r.status)
            const txt = await r.text().catch(() => '')
            console.log('N8N webhook body:', txt)
            let parsed: unknown = txt
            try {
              parsed = JSON.parse(txt)
            } catch {
              parsed = txt
            }
            const leadId = extractLeadId(parsed)
            kommo = { skipped: false, status: r.status, leadId, body: parsed }
          })
          .catch((err) => {
            console.error('N8N webhook error:', err)
            kommo = { skipped: false, error: String(err) }
          })

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'EB Green Website <info@ebgreenusa.com>',
        to: ['info@ebgreenusa.com'],
        subject: `Novo Lead: ${firstName} ${lastName}`,
        html: emailHtml,
      }),
    })

    const result = await res.text()
    console.log('Resend response status:', res.status)
    console.log('Resend response body:', result)

    // Ensure the N8N call completes (or fails) before the function shuts down,
    // but never let it affect the response to the user.
    await Promise.allSettled([n8nPromise])

    if (!res.ok) {
      return new Response(
        JSON.stringify({ success: false, status: res.status, resend: result, kommo, qualification, qualificationReason }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    return new Response(
      JSON.stringify({ success: true, resend: result, kommo, qualification, qualificationReason }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('send-contact-email error:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
