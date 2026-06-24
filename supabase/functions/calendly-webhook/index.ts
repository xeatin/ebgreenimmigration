// Calendly webhook receiver — forwards booking events to the existing
// n8n workflow that already pushes leads/updates into Kommo.
//
// Configure in Calendly → Integrations → Webhooks:
//   URL: https://<project-ref>.functions.supabase.co/calendly-webhook
//   Events: invitee.created, invitee.canceled
//   Signing key (optional): set the CALENDLY_WEBHOOK_SIGNING_KEY secret here too.

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type, calendly-webhook-signature',
}

const N8N_WEBHOOK_URL = 'https://n8n.srv1283251.hstgr.cloud/webhook/website-form-lead'

async function verifySignature(rawBody: string, header: string | null): Promise<boolean> {
  const secret = Deno.env.get('CALENDLY_WEBHOOK_SIGNING_KEY')
  if (!secret) return true // signature optional
  if (!header) return false
  // header format: "t=timestamp,v1=signature"
  const parts = Object.fromEntries(
    header.split(',').map((p) => p.split('=').map((s) => s.trim()) as [string, string]),
  )
  const t = parts.t
  const v1 = parts.v1
  if (!t || !v1) return false
  const data = `${t}.${rawBody}`
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  )
  const sig = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(data))
  const expected = Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
  return expected === v1
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405, headers: corsHeaders })
  }

  try {
    const rawBody = await req.text()
    const sigOk = await verifySignature(rawBody, req.headers.get('calendly-webhook-signature'))
    if (!sigOk) {
      return new Response(JSON.stringify({ error: 'invalid_signature' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const payload = JSON.parse(rawBody) as {
      event?: string
      payload?: {
        event?: string
        email?: string
        name?: string
        first_name?: string
        last_name?: string
        questions_and_answers?: { question: string; answer: string }[]
        scheduled_event?: {
          start_time?: string
          end_time?: string
          name?: string
          location?: { type?: string; join_url?: string; location?: string }
          uri?: string
        }
        cancel_url?: string
        reschedule_url?: string
        tracking?: Record<string, string>
        uri?: string
        status?: string
      }
    }

    const eventType = payload.event ?? 'invitee.created'
    const inv = payload.payload ?? {}
    const event = inv.scheduled_event ?? {}
    const qa = inv.questions_and_answers ?? []
    const tracking = inv.tracking ?? {}
    const phoneFromQa = qa.find((q) => /telefone|phone|whats/i.test(q.question))?.answer ?? ''
    const visaFromQa = qa.find((q) => /visa|visto|categoria/i.test(q.question))?.answer ?? ''
    // Fallback: o site passa telefone em utm_content e tipo de visto em utm_term
    const phoneAnswer = phoneFromQa || tracking.utm_content || ''
    const visaAnswer = visaFromQa || tracking.utm_term || ''

    // Sanitiza nomes para evitar duplicação tipo "Williams Williams da Silva"
    // que acontece quando o usuário digita o nome completo no campo de sobrenome
    // ou quando o Calendly devolve o nome completo já com o primeiro nome.
    const dedupeName = (first: string, last: string) => {
      const f = (first ?? '').trim()
      const l = (last ?? '').trim()
      if (!f) return { first: '', last: l }
      if (!l) return { first: f, last: '' }
      const fLower = f.toLowerCase()
      const lLower = l.toLowerCase()
      // remove repetição do primeiro nome no início do sobrenome
      if (lLower === fLower) return { first: f, last: '' }
      if (lLower.startsWith(fLower + ' ')) {
        return { first: f, last: l.slice(f.length).trim() }
      }
      return { first: f, last: l }
    }

    const rawFull = (inv.name ?? '').trim()
    const [splitFirst, ...splitRest] = rawFull.split(' ')
    const rawFirst = inv.first_name ?? splitFirst ?? ''
    const rawLast = inv.last_name ?? splitRest.join(' ') ?? ''
    const { first: firstName, last: lastName } = dedupeName(rawFirst, rawLast)

    // Map to the n8n contract used by send-contact-email so Kommo receives
    // a recognizable "agendamento" lead/update.
    const n8nPayload = {
      source: eventType === 'invitee.canceled' ? 'calendly_canceled' : 'calendly_scheduled',
      event_type: eventType,
      firstName,
      lastName,
      email: inv.email ?? '',
      phone: phoneAnswer,
      visa: visaAnswer,
      message:
        `Agendamento Calendly: ${event.name ?? ''}\n` +
        `Início: ${event.start_time ?? ''}\n` +
        `Local: ${event.location?.join_url ?? event.location?.location ?? event.location?.type ?? ''}\n` +
        (inv.cancel_url ? `Cancelar: ${inv.cancel_url}\n` : '') +
        (inv.reschedule_url ? `Remarcar: ${inv.reschedule_url}` : ''),
      qualification: 'qualified',
      scheduling: {
        provider: 'calendly',
        event_uri: event.uri,
        invitee_uri: inv.uri,
        start_time: event.start_time,
        end_time: event.end_time,
        status: eventType === 'invitee.canceled' ? 'canceled' : 'scheduled',
        join_url: event.location?.join_url,
        cancel_url: inv.cancel_url,
        reschedule_url: inv.reschedule_url,
      },
      attribution: inv.tracking ?? {},
    }

    const res = await fetch(N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(n8nPayload),
    })
    const text = await res.text().catch(() => '')
    console.log('[calendly-webhook] forwarded', { event: eventType, status: res.status, n8n: text.slice(0, 500) })

    return new Response(
      JSON.stringify({ ok: res.ok, forwarded_status: res.status }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    )
  } catch (err) {
    console.error('[calendly-webhook] error', err)
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
