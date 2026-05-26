# Tracking Architecture — EBGreen

Single source of truth for how leads/conversions flow from the site → Kommo CRM → ad platforms (Meta, GA4, Google Ads).

> **Status:** Runtime path ready for publication from the site repo.
> Qualified leads go browser → n8n → Kommo for full tracking, then browser → Supabase for an email-only owner notification that is forced to skip CRM.
> Low-qualification leads go browser → Supabase for owner email only and are skipped in CRM.

---

## TL;DR architecture

```
   ┌──────────────┐
   │   Browser    │
   │  (React SPA) │
   │              │
   │ 1. initAttribution() reads UTMs/fbclid/gclid → localStorage (90d)
   │ 2. On form submit:
   │    • generate event_id (UUID)
   │    • SHA-256 hash PII (email, phone, name)
   │    • fbq('track','Lead', {...}, {eventID})    ← Meta Pixel (client)
   │    • dataLayer.push({event:'meta_lead', ...}) ← GTM → GA4
       │    • qualify lead in-browser
       │    • qualified → POST to /webhook/website-form-lead-tracking-v1
       │    • qualified → POST email-only notification to send-contact-email
       │    • low qualification → POST to send-contact-email Edge Function
   └──────┬───────┘
          │ qualified CRM path
          ▼
   ┌──────────────────────────┐
   │  n8n (srv1283251)        │
   │  /webhook/website-form-  │
   │  lead-tracking-v1        │
   │                          │
   │ • Creates lead in Kommo  │
   │ • Saves utm_*, fbclid,   │
   │   gclid, event_id,       │
   │   event_source_url,      │
   │   client_ip, user_agent  │
   │ • Writes tracking note   │
   │ • Applies IA/source tags │
   └──────┬───────────────────┘
          │ qualified email notification + low leads
          ▼
   ┌──────────────────────────┐
   │ Supabase Edge Function   │
   │ /send-contact-email      │
   │                          │
   │ • Sends owner email via  │
   │   Resend                 │
   │ • Skips CRM when low     │
   │ • Also skips CRM for     │
   │   qualified notification │
   │   payloads               │
   └──────┬───────────────────┘
          ▼ (Kommo stage changes via automation)
   ┌──────────────────────────┐
   │ Phase 3: track-conversion │
   │ (Supabase Edge Function)  │
   │                           │
   │ Kommo webhook → CAPI Purchase + GA4 MP purchase + Google Ads conversion
   └───────────────────────────┘
```

---

## Phase status

| Phase | What | Status | Blocker |
|---|---|---|---|
| 1 | Cleanup (remove duplicate GTM, single fbq init) | ✅ Done | — |
| 1 | UTM persistence + click IDs (`attribution.ts`) | ✅ Done | — |
| 1 | `event_id` + PII hashing helpers | ✅ Done | — |
| 1 | Pixel Lead with `eventID` (ready for dedupe) | ✅ Done | — |
| 1 | Browser-qualified submit goes direct to n8n tracking v1 | ✅ Done | — |
| 1 | Owner email notification preserved through Supabase email-only call | ✅ Done | — |
| 1 | Low-qualification fallback via Edge Function + Resend | ✅ Done | — |
| 2 | GTM container audit + GA4 config tag | 🟡 Pending | GTM access for `tivgowork@gmail.com` |
| 2 | n8n flow updated to save new fields in Kommo | ✅ Done | — |
| 2 | Deploy updated Supabase Edge Function with full tracking forward | 🔴 Pending | Supabase access |
| 3 | `track-conversion` Edge Function (Meta CAPI + GA4 MP) | 🔴 Pending | Supabase service role + access token |
| 3 | Google Ads Offline Conversions (when CRM stage = sale) | 🔴 Pending | Google Ads Developer Token + OAuth |

---

## Credentials reference

Stored where?

| Credential | Location | Status |
|---|---|---|
| `META_CAPI_ACCESS_TOKEN` | `CRM/.env` | ✅ Present |
| `KOMMO_SUBDOMAIN` + `KOMMO_ACCESS_TOKEN` | `CRM/.env` | ✅ Present |
| `META_TEST_EVENT_CODE` | Hardcode in dev, env var in prod | `TEST36612` (dev only) |
| `GA4_MEASUREMENT_ID` | Public, in `.env` of site | `G-ML3ZYWM8BM` |
| `GA4_API_SECRET` | Supabase secret (Phase 3) | `44ogGgRbRaKwAgg0IN6XUw` (to be moved to Supabase) |
| `GTM_CONTAINER_ID` | `index.html` | `GTM-N2BG96B5` |
| `META_PIXEL_ID` | `index.html` | `2277686873020759` |
| Supabase service role | Supabase Dashboard | ❌ Pending client access |
| Supabase access token | Personal | ❌ Pending |
| Google Ads OAuth | — | ⏳ Phase 3 (optional now) |

> ⚠️ **Never commit `.env` files.** They are gitignored.

---

## Required Kommo custom fields

For Phase 2 (n8n updates) to work, create these custom fields on the Lead entity in Kommo:

| Field name | Type | Purpose |
|---|---|---|
| `utm_source` | Text | Attribution |
| `utm_medium` | Text | Attribution |
| `utm_campaign` | Text | Attribution |
| `utm_term` | Text | Attribution |
| `utm_content` | Text | Attribution |
| `fbclid` | Text | Meta click ID |
| `gclid` | Text | Google Ads click ID |
| `event_id` | Text | CAPI ↔ Pixel dedupe key (UUID) |
| `event_source_url` | URL | Page where lead converted |
| `client_ip` | Text | CAPI Advanced Matching |
| `user_agent` | Text | CAPI Advanced Matching |
| `landing_page` | Text | First page visited |
| `referrer` | URL | Where visitor came from |

After creating, fetch their IDs once via `GET /api/v4/leads/custom_fields` and map them in the n8n flow.

---

## Files of interest

| File | Role |
|---|---|
| `index.html` | Loads GTM-N2BG96B5 (lazy via requestIdleCallback) + Meta Pixel init |
| `src/main.tsx` | Calls `initAttribution()` on app boot |
| `src/lib/tracking/attribution.ts` | URL → localStorage attribution capture |
| `src/lib/tracking/event-id.ts` | UUID generator + SHA-256 PII hashing |
| `src/lib/analytics.ts` | dataLayer + fbq wrappers (supports eventID) |
| `src/components/ContactSection.tsx` | Main lead form — qualified to n8n tracking + email-only notification, low to Supabase email |
| `supabase/functions/send-contact-email/index.ts` | Owner email notification via Resend + low-lead CRM skip |
| `CRM/` | Kommo automation scripts (separate folder) |

---

## How to validate Phase 1 manually

1. Open the site with a UTM-loaded URL: `?utm_source=test&utm_medium=manual&fbclid=ABC123`
2. DevTools console: `JSON.parse(localStorage.getItem('ebg_attribution_v1'))` → should show the captured values
3. Fill and submit the contact form with a qualified profile
4. Network tab → look at the request to `website-form-lead-tracking-v1`. Body should include `event_id`, `attribution`, `user_data_hashed`
5. Confirm a second `send-contact-email` request is made for the owner notification and returns `kommo.skipped = true`
6. Facebook Pixel Helper extension → should show Lead event with an `eventID` attribute
7. Meta Events Manager → Test Events (`TEST36612`) → Lead should appear with the same event_id

If all 7 pass, Phase 1 is healthy.

---

## Next actions (in order)

1. **Get GTM access** (`tivgowork@gmail.com` invite to `GTM-N2BG96B5`)
2. Audit existing tags in `GTM-N2BG96B5` — identify and remove any Meta Pixel `Lead` tag that would duplicate the code-fired event
3. Add GA4 config tag (`G-ML3ZYWM8BM`) + custom event triggers for `meta_lead`, `form_submit`, `cta_click`, `scroll_depth`
4. Create the Kommo custom fields listed above + grab their IDs
5. Update n8n flow to write the new fields into Kommo
6. Wait for Supabase access → deploy `track-conversion` Edge Function (Meta CAPI + GA4 MP)
7. (Optional) Google Ads Developer Token + OAuth for Offline Conversions
