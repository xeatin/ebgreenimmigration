const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
}
import { z } from 'npm:zod@3.25.76'

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
  resumeName: z.string().max(255).optional().default(''),
})

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

    const { source, firstName, lastName, email, phoneCode, phone, visa, education, experience, message, resumeUrl, resumeName } = parsed.data

    const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')
    if (!RESEND_API_KEY) {
      return new Response(
        JSON.stringify({ error: 'Email service not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
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
    const eduNormalized = (education || '').trim().toLowerCase()
    const expNormalized = (experience || '').trim().toLowerCase()
    const isHighSchool = eduNormalized === 'ensino médio'
    const isTechnical = eduNormalized.includes('tecnico') || eduNormalized.includes('tecnólogo')
    const isLowExperience = expNormalized === 'menos de 5 anos' || expNormalized.includes('menos de 5')
    const skipKommo = isHighSchool || (isTechnical && isLowExperience)

    // Notify N8N webhook (Kommo). We await so we can return leadId to the client.
    let kommo: { skipped: boolean; status?: number; leadId?: string | number; body?: unknown; error?: string } = { skipped: skipKommo }
    const n8nPromise = skipKommo
      ? Promise.resolve(console.log('N8N webhook skipped:', { isHighSchool, isTechnical, isLowExperience }))
      : fetch('https://n8n.srv1283251.hstgr.cloud/webhook/website-form-lead', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            source,
            formSource: source,
            leadSource: source,
            firstName,
            lastName,
            email,
            phoneCode,
            phone,
            visa,
            education,
            experience,
            message,
            resumeUrl,
            resumeName,
          }),
        })
          .then(async (r) => {
            console.log('N8N webhook status:', r.status)
            const txt = await r.text().catch(() => '')
            console.log('N8N webhook body:', txt)
            let parsed: any = txt
            try { parsed = JSON.parse(txt) } catch (_) {}
            const leadId =
              parsed?.leadId ?? parsed?.lead_id ?? parsed?.id ??
              parsed?.lead?.id ?? parsed?.data?.id ?? parsed?.[0]?.id
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

    // Fire-and-forget server-side webhook to N8N (Kommo)
    fetch('https://n8n.srv1283251.hstgr.cloud/webhook/website-form-lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        source,
        firstName,
        lastName,
        email,
        phoneCode,
        phone,
        visa,
        education,
        experience,
        message,
        resumeUrl,
        resumeName,
      }),
    }).catch(() => {})

    // Ensure the N8N call completes (or fails) before the function shuts down,
    // but never let it affect the response to the user.
    await Promise.allSettled([n8nPromise])

    if (!res.ok) {
      return new Response(
        JSON.stringify({ success: false, status: res.status, resend: result, kommo }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    return new Response(
      JSON.stringify({ success: true, resend: result, kommo }),
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
