// Lightweight Calendly popup loader. Injects the official widget script on demand
// and opens a prefilled popup. No npm dependency required.

export const CALENDLY_URL = "https://calendly.com/ebgreenusa/30min";

declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (opts: {
        url: string;
        prefill?: {
          name?: string;
          firstName?: string;
          lastName?: string;
          email?: string;
          customAnswers?: Record<string, string>;
        };
        utm?: {
          utmCampaign?: string;
          utmSource?: string;
          utmMedium?: string;
          utmContent?: string;
          utmTerm?: string;
        };
      }) => void;
    };
  }
}

const SCRIPT_SRC = "https://assets.calendly.com/assets/external/widget.js";
const CSS_HREF = "https://assets.calendly.com/assets/external/widget.css";

let loadingPromise: Promise<void> | null = null;

function ensureCalendlyLoaded(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.Calendly) return Promise.resolve();
  if (loadingPromise) return loadingPromise;

  loadingPromise = new Promise<void>((resolve, reject) => {
    if (!document.querySelector(`link[href="${CSS_HREF}"]`)) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = CSS_HREF;
      document.head.appendChild(link);
    }
    const existing = document.querySelector<HTMLScriptElement>(
      `script[src="${SCRIPT_SRC}"]`,
    );
    if (existing) {
      existing.addEventListener("load", () => resolve());
      existing.addEventListener("error", () => reject(new Error("calendly_load_failed")));
      return;
    }
    const script = document.createElement("script");
    script.src = SCRIPT_SRC;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("calendly_load_failed"));
    document.body.appendChild(script);
  });

  return loadingPromise;
}

export type OpenCalendlyOptions = {
  url?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  customAnswers?: Record<string, string>;
  utm?: {
    utmSource?: string;
    utmMedium?: string;
    utmCampaign?: string;
    utmContent?: string;
    utmTerm?: string;
  };
};

export async function openCalendlyPopup(opts: OpenCalendlyOptions = {}): Promise<void> {
  await ensureCalendlyLoaded();
  if (!window.Calendly) return;
  const name = [opts.firstName, opts.lastName].filter(Boolean).join(" ").trim();
  window.Calendly.initPopupWidget({
    url: opts.url ?? CALENDLY_URL,
    prefill: {
      name: name || undefined,
      firstName: opts.firstName,
      lastName: opts.lastName,
      email: opts.email,
      customAnswers: opts.customAnswers,
    },
    utm: opts.utm,
  });
}
