/**
 * Attribution capture & persistence.
 *
 * On the first visit we read UTM params + ad click IDs from the URL and stash
 * them in localStorage for 90 days. Subsequent visits keep the original source
 * unless a NEW set of UTMs arrives (last-touch wins on each campaign click).
 *
 * The result is injected into every form submission so the CRM (Kommo) and
 * downstream conversion events (Meta CAPI, GA4 MP, Google Ads) all carry the
 * same attribution.
 */

const STORAGE_KEY = "ebg_attribution_v1";
const TTL_MS = 90 * 24 * 60 * 60 * 1000; // 90 days
const MAX_TOUCHPOINTS = 10; // keep the last N campaign touches only

export interface Touchpoint {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  at: number;
}

export interface Attribution {
  // Standard UTMs
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  // Ad platform click IDs
  fbclid?: string;
  gclid?: string;
  gbraid?: string;
  wbraid?: string;
  msclkid?: string;
  ttclid?: string;
  // Referrer & landing context
  landing_page?: string;
  referrer?: string;
  // Bookkeeping
  first_touch_at?: number;
  last_touch_at?: number;
  // Ordered history of campaign touches (oldest → newest, capped)
  touchpoints?: Touchpoint[];
}

const ATTRIBUTION_KEYS: (keyof Attribution)[] = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "fbclid",
  "gclid",
  "gbraid",
  "wbraid",
  "msclkid",
  "ttclid",
];

const normalizeSource = (value?: string) =>
  (value || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();

const sanitizeAttribution = (attr: Attribution): Attribution => {
  const next: Attribution = { ...attr };
  const normalizedSource = normalizeSource(attr.utm_source);

  if (["meta", "facebook", "instagram"].includes(normalizedSource)) {
    delete next.gclid;
    delete next.gbraid;
    delete next.wbraid;
  }

  if (normalizedSource === "google") {
    delete next.fbclid;
  }

  return next;
};

const safeStorage = () => {
  if (typeof window === "undefined") return null;
  try {
    // Test write - throws in private browsing on some Safari versions
    const t = "__ebg_test__";
    window.localStorage.setItem(t, "1");
    window.localStorage.removeItem(t);
    return window.localStorage;
  } catch {
    return null;
  }
};

const readStored = (): Attribution | null => {
  const ls = safeStorage();
  if (!ls) return null;
  try {
    const raw = ls.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Attribution;
    if (!parsed.first_touch_at || Date.now() - parsed.first_touch_at > TTL_MS) {
      ls.removeItem(STORAGE_KEY);
      return null;
    }
    const sanitized = sanitizeAttribution(parsed);
    const serialized = JSON.stringify(sanitized);
    if (serialized !== raw) {
      ls.setItem(STORAGE_KEY, serialized);
    }
    return sanitized;
  } catch {
    return null;
  }
};

const writeStored = (attr: Attribution) => {
  const ls = safeStorage();
  if (!ls) return;
  try {
    ls.setItem(STORAGE_KEY, JSON.stringify(attr));
  } catch {
    // Quota errors → ignore silently
  }
};

const readFromUrl = (): Partial<Attribution> => {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);
  const out: Record<string, string> = {};
  for (const key of ATTRIBUTION_KEYS) {
    const value = params.get(key);
    if (value) out[key] = value.slice(0, 500); // hard cap to avoid abuse
  }
  return out as Partial<Attribution>;
};

/**
 * Initialize attribution capture. Call once on app boot.
 * Safe to call multiple times - idempotent.
 */
export const initAttribution = (): Attribution => {
  if (typeof window === "undefined") return {};

  const fromUrl = readFromUrl();
  const hasFreshTouch = Object.keys(fromUrl).length > 0;
  const stored = readStored();
  const now = Date.now();

  // No URL params and we have a valid stored attribution → keep it as-is
  if (!hasFreshTouch && stored) return stored;

  // Append a touchpoint for each fresh campaign click, capped to the last N.
  const touchpoints = [...(stored?.touchpoints ?? [])];
  if (hasFreshTouch) {
    touchpoints.push({
      utm_source: fromUrl.utm_source,
      utm_medium: fromUrl.utm_medium,
      utm_campaign: fromUrl.utm_campaign,
      at: now,
    });
    if (touchpoints.length > MAX_TOUCHPOINTS) {
      touchpoints.splice(0, touchpoints.length - MAX_TOUCHPOINTS);
    }
  }

  // New touch (or first ever visit)
  const next: Attribution = sanitizeAttribution(
    hasFreshTouch
      ? {
          ...fromUrl,
          first_touch_at: stored?.first_touch_at ?? now,
          last_touch_at: now,
          landing_page: window.location.pathname + window.location.search,
          referrer: document.referrer || undefined,
          touchpoints,
        }
      : {
          ...(stored ?? {}),
          first_touch_at: stored?.first_touch_at ?? now,
          last_touch_at: now,
          landing_page: stored?.landing_page ?? window.location.pathname + window.location.search,
          referrer: stored?.referrer ?? (document.referrer || undefined),
          touchpoints,
        },
  );

  writeStored(next);
  return next;
};

/**
 * Read the current attribution snapshot.
 * Returns an empty object if nothing was ever captured.
 */
export const getAttribution = (): Attribution => {
  const stored = readStored();
  if (stored) return stored;
  return initAttribution();
};

/**
 * Flatten attribution for inclusion in API payloads.
 * Drops bookkeeping fields and undefined values.
 */
export const attributionPayload = (attr: Attribution = getAttribution()) => {
  const out: Record<string, string> = {};
  for (const key of ATTRIBUTION_KEYS) {
    const value = attr[key];
    if (value) out[key] = String(value);
  }
  if (attr.landing_page) out.landing_page = attr.landing_page;
  if (attr.referrer) out.referrer = attr.referrer;
  if (attr.touchpoints?.length) out.touchpoint_count = String(attr.touchpoints.length);
  return out;
};
