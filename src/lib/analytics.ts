// Lightweight GA4 / GTM dataLayer helpers
// All events are pushed to window.dataLayer for GTM → GA4 forwarding

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (
      command: "js" | "config" | "event" | "set",
      target: string | Date,
      params?: Record<string, unknown>,
    ) => void;
    fbq?: {
      (
        action: "track" | "trackCustom" | "trackSingle" | "trackSingleCustom" | "init" | "set",
        eventOrPixel: string,
        eventOrParams?: string | Record<string, unknown>,
        paramsOrOpts?: Record<string, unknown>,
        opts?: { eventID?: string },
      ): void;
      loaded?: boolean;
      version?: string;
      queue?: unknown[];
    };
  }
}

const dl = () => {
  if (typeof window === "undefined") return null;
  window.dataLayer = window.dataLayer || [];
  return window.dataLayer;
};

export type AnalyticsParams = Record<string, string | number | boolean | undefined | null>;

const cleanParams = (params: AnalyticsParams = {}) =>
  Object.fromEntries(Object.entries(params).filter(([, value]) => value !== undefined && value !== null));

export const track = (event: string, params: AnalyticsParams = {}) => {
  const cleaned = cleanParams(params);
  const layer = dl();
  if (layer) {
    layer.push({ event, ...cleaned, ts: Date.now() });
  }
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", event, cleaned);
  }
};

const trackMeta = (
  action: "track" | "trackCustom",
  event: string,
  params: AnalyticsParams = {},
  eventId?: string,
) => {
  if (typeof window === "undefined" || typeof window.fbq !== "function") return;
  const payload = cleanParams(params);
  const opts = eventId ? { eventID: eventId } : undefined;
  if (Object.keys(payload).length > 0) {
    if (opts) window.fbq(action, event, payload, opts);
    else window.fbq(action, event, payload);
    return;
  }
  if (opts) window.fbq(action, event, undefined, opts);
  else window.fbq(action, event);
};

// Same pixel id initialized in index.html. Used to refresh manual Advanced
// Matching data once PII is available at form submit time.
const META_PIXEL_ID = "989361967125949";

/**
 * Hashed (SHA-256) user data for Meta Advanced Matching. Keys follow Meta's
 * spec (em, ph, fn, ln, ct, st, zp, country) - same shape as `HashedUserData`
 * produced by `hashUserData()` in tracking/event-id.ts.
 */
export type MetaAdvancedMatch = Partial<
  Record<"em" | "ph" | "fn" | "ln" | "ct" | "st" | "zp" | "country", string>
>;

/**
 * Apply manual Advanced Matching by re-initializing the pixel with hashed user
 * data. Meta detects the SHA-256 hashes and attaches them to subsequent events
 * fired from this pixel (no re-hashing on their side). Safe no-op when fbq is
 * unavailable or there is no data to send.
 */
const applyMetaAdvancedMatch = (userDataHashed?: MetaAdvancedMatch) => {
  if (!userDataHashed) return;
  if (typeof window === "undefined" || typeof window.fbq !== "function") return;
  const am = cleanParams(userDataHashed);
  if (Object.keys(am).length === 0) return;
  window.fbq("init", META_PIXEL_ID, am);
};

/**
 * Fire Meta Lead with optional `event_id` for CAPI deduplication.
 * When `userDataHashed` is provided, manual Advanced Matching is applied first
 * so the Lead carries the hashed PII (improves match quality / dedupe).
 * Also pushes a parallel dataLayer event so GTM / GA4 can react to the same
 * conversion with the same id (useful for cross-platform debugging).
 */
export const trackMetaLead = (
  params: AnalyticsParams = {},
  options: { eventId?: string; userDataHashed?: MetaAdvancedMatch } = {},
) => {
  const { eventId, userDataHashed } = options;
  applyMetaAdvancedMatch(userDataHashed);
  trackMeta("track", "Lead", params, eventId);
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", "generate_lead", cleanParams({ ...params, event_id: eventId }));
  }
  if (eventId) {
    track("meta_lead", { ...params, event_id: eventId });
  }
};

export const trackMetaCustom = (
  event: string,
  params: AnalyticsParams = {},
  options: { eventId?: string } = {},
) => trackMeta("trackCustom", event, params, options.eventId);

/**
 * Fire Meta `ViewContent` - a pre-lead intent signal for high-value pages
 * (e.g. visa content). Mirrors to dataLayer so GA4/GTM can react too.
 */
export const trackMetaViewContent = (
  params: {
    content_name: string;
    content_category?: string;
    visa_context?: string;
  },
  options: { eventId?: string } = {},
) => {
  trackMeta("track", "ViewContent", params, options.eventId);
  track("view_content", { ...params, event_id: options.eventId });
};

const GOOGLE_ADS_LEAD_SEND_TO = "AW-17856877793/ebT-COCyq6AcEOGp6cJC";

export const trackGoogleAdsLead = (
  params: {
    eventId?: string;
    value?: number;
    currency?: string;
    userDataHashed?: {
      em?: string;
      ph?: string;
      fn?: string;
      ln?: string;
      country?: string;
    };
  } = {},
) => {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;

  if (params.userDataHashed) {
    window.gtag("set", "user_data", cleanParams(params.userDataHashed));
  }

  window.gtag(
    "event",
    "conversion",
    cleanParams({
      send_to: GOOGLE_ADS_LEAD_SEND_TO,
      value: params.value,
      currency: params.currency,
      transaction_id: params.eventId,
    }),
  );
};

// CTA click
export const trackCtaClick = (params: {
  cta_id: string;
  cta_text?: string;
  cta_location?: string;
  cta_href?: string;
  visa_context?: string;
}) => track("cta_click", params);

// Form lifecycle
export type FormEvent =
  | "form_start"
  | "form_step"
  | "form_abandon"
  | "form_submit"
  | "form_error"
  | "schedule_click"
  | "eb3_sponsor_answer";

export const trackForm = (
  type: FormEvent,
  params: {
    form_id: string;
    form_step?: number | string;
    visa_context?: string;
    field?: string;
    reason?: string;
    answer?: string;
  },
) => track(type, params);

// Scroll depth
export const trackScrollDepth = (depth: 25 | 50 | 75 | 100, page?: string) =>
  track("scroll_depth", { depth, page: page || (typeof location !== "undefined" ? location.pathname : "") });

// Session engagement (time on page)
export const trackEngagement = (params: {
  page: string;
  time_seconds: number;
  visa_context?: string;
  reason: "hidden" | "unload";
}) => track("page_engagement", params);
