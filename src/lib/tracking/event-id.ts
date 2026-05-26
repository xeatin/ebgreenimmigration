/**
 * Event ID + user data hashing utilities.
 *
 * `event_id` is the linchpin of Meta CAPI ↔ Pixel deduplication:
 *   - Browser fires Pixel with `eventID: <uuid>`
 *   - Server (Edge Function) fires CAPI with same `event_id`
 *   - Meta dedupes by (event_name, event_id) within 48h
 *
 * `hashUserData()` produces the SHA-256 hex expected by Meta CAPI's
 * Advanced Matching parameters (em, ph, fn, ln, ct, st, zp, country).
 * Always lowercase + trim BEFORE hashing per Meta's spec.
 */

export const newEventId = (): string => {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  // Fallback for very old browsers
  return "evt-" + Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 10);
};

const sha256Hex = async (input: string): Promise<string> => {
  if (typeof crypto === "undefined" || !crypto.subtle) return "";
  const encoder = new TextEncoder();
  const data = encoder.encode(input);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
};

export interface RawUserData {
  email?: string;
  phone?: string;
  phoneCode?: string; // e.g. "+55"
  firstName?: string;
  lastName?: string;
  city?: string;
  state?: string; // 2-letter
  zip?: string;
  country?: string; // ISO 3166-1 alpha-2, lowercase
}

export interface HashedUserData {
  em?: string;
  ph?: string;
  fn?: string;
  ln?: string;
  ct?: string;
  st?: string;
  zp?: string;
  country?: string;
}

const normalizePhone = (phone: string, code?: string) => {
  const digits = (code || "") + phone;
  return digits.replace(/[^\d]/g, "");
};

/**
 * Hash PII to Meta's expected format. Returns an object you can ship to the
 * Edge Function (which forwards to CAPI).
 */
export const hashUserData = async (raw: RawUserData): Promise<HashedUserData> => {
  const out: HashedUserData = {};
  const tasks: Promise<void>[] = [];

  const set = async (key: keyof HashedUserData, value: string) => {
    const normalized = value.trim().toLowerCase();
    if (!normalized) return;
    out[key] = await sha256Hex(normalized);
  };

  if (raw.email) tasks.push(set("em", raw.email));
  if (raw.phone) tasks.push(set("ph", normalizePhone(raw.phone, raw.phoneCode)));
  if (raw.firstName) tasks.push(set("fn", raw.firstName));
  if (raw.lastName) tasks.push(set("ln", raw.lastName));
  if (raw.city) tasks.push(set("ct", raw.city.replace(/\s+/g, "")));
  if (raw.state) tasks.push(set("st", raw.state));
  if (raw.zip) tasks.push(set("zp", raw.zip.replace(/[^a-z0-9]/gi, "")));
  if (raw.country) tasks.push(set("country", raw.country));

  await Promise.all(tasks);
  return out;
};
