"use client";

import Link from "next/link";

/**
 * Catches unhandled errors at the root layout level.
 * Must define its own html/body since it replaces the root layout when triggered.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: "system-ui, sans-serif", background: "#faf8f5" }}>
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1rem",
          }}
        >
          <div style={{ maxWidth: "32rem", textAlign: "center" }}>
            <h1 style={{ fontSize: "2.5rem", fontWeight: 600, marginBottom: "1rem", color: "#1a1a1a" }}>
              Something went wrong
            </h1>
            <p style={{ color: "#6b6b6b", marginBottom: "2rem", lineHeight: 1.6 }}>
              We&apos;re sorry, but something unexpected happened. Please try again.
            </p>
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
              <button
                onClick={() => reset()}
                style={{
                  padding: "0.75rem 1.5rem",
                  background: "#1a1a1a",
                  color: "#fff",
                  border: "none",
                  borderRadius: "4px",
                  fontSize: "0.875rem",
                  cursor: "pointer",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                }}
              >
                Try again
              </button>
              <Link
                href="/"
                style={{
                  padding: "0.75rem 1.5rem",
                  border: "2px solid #1a1a1a",
                  color: "#1a1a1a",
                  borderRadius: "4px",
                  fontSize: "0.875rem",
                  textDecoration: "none",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                }}
              >
                Go home
              </Link>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
