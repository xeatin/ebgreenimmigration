import { useEffect, useRef } from "react";
import { trackScrollDepth, trackEngagement, trackCtaClick } from "@/lib/analytics";

/** Tracks scroll depth milestones (25/50/75/100) once per mount. */
export const useScrollDepth = (page?: string) => {
  useEffect(() => {
    const fired = new Set<number>();
    const milestones: (25 | 50 | 75 | 100)[] = [25, 50, 75, 100];

    const onScroll = () => {
      const doc = document.documentElement;
      const scrollTop = window.scrollY || doc.scrollTop;
      const max = doc.scrollHeight - window.innerHeight;
      if (max <= 0) return;
      const pct = Math.min(100, Math.round((scrollTop / max) * 100));
      for (const m of milestones) {
        if (pct >= m && !fired.has(m)) {
          fired.add(m);
          trackScrollDepth(m, page);
        }
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [page]);
};

/** Measures active engagement time and reports on hide/unload. */
export const usePageEngagement = (page: string, visaContext?: string) => {
  const startRef = useRef<number>(Date.now());
  const accumRef = useRef<number>(0);
  const visibleSinceRef = useRef<number>(Date.now());
  const reportedRef = useRef(false);

  useEffect(() => {
    startRef.current = Date.now();
    visibleSinceRef.current = Date.now();
    accumRef.current = 0;
    reportedRef.current = false;

    const accumulate = () => {
      accumRef.current += Date.now() - visibleSinceRef.current;
      visibleSinceRef.current = Date.now();
    };

    const report = (reason: "hidden" | "unload") => {
      if (reportedRef.current) return;
      accumulate();
      const seconds = Math.round(accumRef.current / 1000);
      if (seconds < 1) return;
      trackEngagement({ page, time_seconds: seconds, visa_context: visaContext, reason });
      reportedRef.current = true;
    };

    const onVis = () => {
      if (document.visibilityState === "hidden") {
        report("hidden");
      } else {
        visibleSinceRef.current = Date.now();
        reportedRef.current = false;
      }
    };
    const onUnload = () => report("unload");

    document.addEventListener("visibilitychange", onVis);
    window.addEventListener("pagehide", onUnload);
    window.addEventListener("beforeunload", onUnload);

    return () => {
      report("hidden");
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("pagehide", onUnload);
      window.removeEventListener("beforeunload", onUnload);
    };
  }, [page, visaContext]);
};

/** Global delegated listener that captures clicks on annotated CTAs. */
export const useGlobalCtaTracking = () => {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const el = target.closest<HTMLElement>("[data-cta-id], a.btn-highlight, button.btn-highlight");
      if (!el) return;
      const id = el.dataset.ctaId || el.getAttribute("href") || el.textContent?.trim().slice(0, 40) || "unknown";
      trackCtaClick({
        cta_id: id,
        cta_text: el.textContent?.trim().slice(0, 80),
        cta_location: el.dataset.ctaLocation || location.pathname,
        cta_href: (el as HTMLAnchorElement).href,
        visa_context: el.dataset.visaContext,
      });
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true } as EventListenerOptions);
  }, []);
};
