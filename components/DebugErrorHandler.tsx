"use client";

import { useEffect } from "react";

/** Client-side error handler: logs uncaught errors in development. Add Sentry/etc for production. */
export default function DebugErrorHandler() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "development") return;

    const onError = (event: ErrorEvent) => {
      console.error("[Uncaught Error]", event.message, event.filename, event.lineno, event.error);
    };
    const onUnhandled = (event: PromiseRejectionEvent) => {
      console.error("[Unhandled Rejection]", event.reason);
    };

    window.addEventListener("error", onError);
    window.addEventListener("unhandledrejection", onUnhandled);
    return () => {
      window.removeEventListener("error", onError);
      window.removeEventListener("unhandledrejection", onUnhandled);
    };
  }, []);

  return null;
}
