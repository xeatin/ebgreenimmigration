import { useEffect, useState } from "react";

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

/**
 * Persistent 50/50 A/B variant per visitor (localStorage).
 * Pushes an `ab_exposure` event to GTM dataLayer on first render of each session.
 */
export const useAbVariant = (
  experimentId: string,
  variants: readonly [string, string] = ["A", "B"] as const
): string => {
  const [variant, setVariant] = useState<string>(variants[0]);

  useEffect(() => {
    const storageKey = `ab_${experimentId}`;
    let assigned: string | null = null;
    try {
      assigned = localStorage.getItem(storageKey);
    } catch {
      // localStorage may be unavailable (private mode); fall through to random
    }
    if (!assigned || !variants.includes(assigned as (typeof variants)[number])) {
      assigned = Math.random() < 0.5 ? variants[0] : variants[1];
      try {
        localStorage.setItem(storageKey, assigned);
      } catch {
        /* ignore */
      }
    }
    setVariant(assigned);

    // Track exposure once per session per experiment
    const sessionKey = `ab_${experimentId}_exposed`;
    try {
      if (!sessionStorage.getItem(sessionKey)) {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          event: "ab_exposure",
          experiment_id: experimentId,
          variant: assigned,
        });
        sessionStorage.setItem(sessionKey, "1");
      }
    } catch {
      /* ignore */
    }
  }, [experimentId, variants]);

  return variant;
};
