const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
}
import { z } from 'npm:zod@3.25.76'

const ContactSchema = z.object({
  firstName: z.string().min(1).max(100),
  lastName: z.string().min(1).max(100),
  email: z.string().email().max(255),
  phoneCode: z.string().max(10),
  phone: z.string().max(30),
  visa: z.string().max(50),
  education: z.string().max(50),
  experience: z.string().max(50),
  message: z.string().max(5000),
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

    const { firstName, lastName, email, phoneCode, phone, visa, education, experience, message } = parsed.data

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
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Nome</td><td style="padding:8px;border:1px solid #ddd">${firstName} ${lastName}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">E-mail</td><td style="padding:8px;border:1px solid #ddd">${email}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Telefone</td><td style="padding:8px;border:1px solid #ddd">${phoneCode} ${phone}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Visto</td><td style="padding:8px;border:1px solid #ddd">${visa || 'Não informado'}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Formação</td><td style="padding:8px;border:1px solid #ddd">${education}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Experiência</td><td style="padding:8px;border:1px solid #ddd">${experience}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Mensagem</td><td style="padding:8px;border:1px solid #ddd">${message || 'Nenhuma'}</td></tr>
      </table>
    `

    // Skip N8N (Kommo) when education is "ensino médio" (high school).
    // Matches Portuguese, English and Spanish variants used across the site.
    const eduNormalized = (education || '').trim().toLowerCase()
    const isHighSchool =
      eduNormalized === 'ensino-medio' ||
      eduNormalized === 'ensino medio' ||
      eduNormalized === 'ensino médio' ||
      eduNormalized === 'high school' ||
      eduNormalized === 'secundaria'

    // Fire-and-forget: notify N8N webhook in parallel (does not block user response)
    const n8nPromise = isHighSchool
      ? Promise.resolve(console.log('N8N webhook skipped: education is high school'))
      : fetch('https://n8n.srv1283251.hstgr.cloud/webhook/website-form-lead', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            firstName,
            lastName,
            email,
            phoneCode,
            phone,
            visa,
            education,
            experience,
            message,
          }),
        })
          .then(async (r) => {
            console.log('N8N webhook status:', r.status)
            try {
              const txt = await r.text()
              console.log('N8N webhook body:', txt)
            } catch (_) {}
          })
          .catch((err) => {
            console.error('N8N webhook error:', err)
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
        JSON.stringify({ success: false, status: res.status, resend: result }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    return new Response(
      JSON.stringify({ success: true, resend: result }),
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
