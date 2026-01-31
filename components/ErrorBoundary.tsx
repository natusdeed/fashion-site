"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";
import Link from "next/link";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    if (process.env.NODE_ENV === "development") {
      console.error("Error caught by boundary:", error, errorInfo);
    }
    // In production, send to error tracking (e.g. Sentry.captureException(error, { contexts: { react: errorInfo } }))
    // Example: Sentry.captureException(error, { contexts: { react: errorInfo } });
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen flex items-center justify-center px-4 bg-warm-50">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-6xl md:text-8xl font-playfair text-warm-900 mb-6 font-normal">
              Oops!
            </h1>
            <h2 className="text-2xl md:text-3xl font-playfair text-warm-700 mb-4 font-normal">
              Something went wrong
            </h2>
            <p className="text-warm-600 mb-8 font-light leading-relaxed">
              We&apos;re sorry, but something unexpected happened. Our team has been notified
              and we&apos;re working to fix it.
            </p>
            {process.env.NODE_ENV === "development" && this.state.error && (
              <details className="mb-8 text-left bg-warm-100 p-4 rounded-sm">
                <summary className="cursor-pointer text-warm-700 font-medium mb-2">
                  Error Details (Development Only)
                </summary>
                <pre className="text-xs text-warm-600 overflow-auto">
                  {this.state.error.toString()}
                  {this.state.error.stack}
                </pre>
              </details>
            )}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/"
                className="inline-flex items-center justify-center bg-warm-900 text-warm-50 px-8 py-4 hover:bg-gold-600 transition-colors duration-300 text-sm uppercase tracking-[0.15em] font-light min-h-[44px]"
              >
                Go Home
              </Link>
              <button
                onClick={() => {
                  this.setState({ hasError: false, error: null });
                  window.location.reload();
                }}
                className="inline-flex items-center justify-center border-2 border-warm-900 text-warm-900 px-8 py-4 hover:bg-warm-900 hover:text-warm-50 transition-colors duration-300 text-sm uppercase tracking-[0.15em] font-light min-h-[44px]"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
