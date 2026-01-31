"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    gtag?: (command: string, targetId: string, config?: Record<string, any>) => void;
  }
}

/** Fires a 404 event to analytics so you can fix broken links. Requires NEXT_PUBLIC_GA_ID and gtag. */
export default function NotFoundTracker() {
  useEffect(() => {
    if (typeof window === "undefined" || !window.gtag) return;
    const gaId = process.env.NEXT_PUBLIC_GA_ID;
    if (!gaId) return;
    window.gtag("event", "page_not_found", {
      page_path: window.location.pathname,
      page_location: window.location.href,
    });
  }, []);

  return null;
}
