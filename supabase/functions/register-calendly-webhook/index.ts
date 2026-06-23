import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';

const WEBHOOK_URL = 'https://zkktyrxdkugkdhaiqxkv.functions.supabase.co/calendly-webhook';
const EVENTS = ['invitee.created', 'invitee.canceled'];

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { calendlyToken } = await req.json().catch(() => ({}));
    if (!calendlyToken || typeof calendlyToken !== 'string') {
      return new Response(
        JSON.stringify({ error: 'calendlyToken (PAT) is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      );
    }

    // 1. Get current user URI + organization
    const meRes = await fetch('https://api.calendly.com/users/me', {
      headers: { Authorization: `Bearer ${calendlyToken}` },
    });
    const meBody = await meRes.json();
    if (!meRes.ok) {
      return new Response(
        JSON.stringify({ error: 'Failed to fetch Calendly user', detail: meBody }),
        { status: meRes.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      );
    }
    const userUri: string = meBody?.resource?.uri;
    const orgUri: string = meBody?.resource?.current_organization;
    if (!userUri || !orgUri) {
      return new Response(
        JSON.stringify({ error: 'Missing user/organization URI from Calendly', detail: meBody }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      );
    }

    // 2. Create webhook subscription
    const subRes = await fetch('https://api.calendly.com/webhook_subscriptions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${calendlyToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: WEBHOOK_URL,
        events: EVENTS,
        organization: orgUri,
        user: userUri,
        scope: 'user',
      }),
    });
    const subBody = await subRes.json();
    if (!subRes.ok) {
      return new Response(
        JSON.stringify({ error: 'Failed to create Calendly webhook', detail: subBody }),
        { status: subRes.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      );
    }

    const signingKey: string | undefined = subBody?.resource?.signing_key;
    const webhookUri: string | undefined = subBody?.resource?.uri;

    return new Response(
      JSON.stringify({
        ok: true,
        webhook_uri: webhookUri,
        signing_key: signingKey,
        events: EVENTS,
        callback_url: WEBHOOK_URL,
        note: 'Copy the signing_key and store it in Supabase Edge Function Secrets as CALENDLY_WEBHOOK_SIGNING_KEY.',
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: 'Unexpected error', detail: String(err) }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    );
  }
});
