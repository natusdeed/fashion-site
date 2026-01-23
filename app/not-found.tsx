import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 - Page Not Found | Lola Drip",
  description: "The page you're looking for doesn't exist. Return to Lola Drip home page.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-warm-50">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-8xl md:text-9xl font-playfair text-warm-900 mb-6 font-normal">
          404
        </h1>
        <h2 className="text-3xl md:text-4xl font-playfair text-warm-700 mb-4 font-normal">
          Page Not Found
        </h2>
        <p className="text-warm-600 mb-8 font-light leading-relaxed text-lg">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Let&apos;s get you back to exploring our beautiful collection.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center bg-warm-900 text-warm-50 px-8 py-4 hover:bg-gold-600 transition-colors duration-300 text-sm uppercase tracking-[0.15em] font-light min-h-[44px]"
          >
            Go Home
          </Link>
          <Link
            href="/shop"
            className="inline-flex items-center justify-center border-2 border-warm-900 text-warm-900 px-8 py-4 hover:bg-warm-900 hover:text-warm-50 transition-colors duration-300 text-sm uppercase tracking-[0.15em] font-light min-h-[44px]"
          >
            Browse Shop
          </Link>
        </div>
      </div>
    </div>
  );
}
