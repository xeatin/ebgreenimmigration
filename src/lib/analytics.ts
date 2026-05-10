// Lightweight GA4 / GTM dataLayer helpers
// All events are pushed to window.dataLayer for GTM → GA4 forwarding

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
  }
}

const dl = () => {
  if (typeof window === "undefined") return null;
  window.dataLayer = window.dataLayer || [];
  return window.dataLayer;
};

export type AnalyticsParams = Record<string, string | number | boolean | undefined | null>;

export const track = (event: string, params: AnalyticsParams = {}) => {
  const layer = dl();
  if (!layer) return;
  layer.push({ event, ...params, ts: Date.now() });
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
  | "form_error";

export const trackForm = (
  type: FormEvent,
  params: {
    form_id: string;
    form_step?: number | string;
    visa_context?: string;
    field?: string;
    reason?: string;
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
