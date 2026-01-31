import Link from "next/link";
import type { Metadata } from "next";
import { getCategories } from "@/data/products";
import NotFoundTracker from "@/components/NotFoundTracker";

export const metadata: Metadata = {
  title: "404 - Page Not Found | Lola Drip",
  description:
    "The page you're looking for doesn't exist. Search our collection or browse categories. Return to Lola Drip home.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  const categories = getCategories();

  return (
    <>
      <NotFoundTracker />
      <div className="min-h-screen flex flex-col items-center justify-center px-4 py-16 bg-warm-50">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-8xl md:text-9xl font-playfair text-warm-900 mb-6 font-normal">
            404
          </h1>
          <h2 className="text-3xl md:text-4xl font-playfair text-warm-700 mb-4 font-normal">
            Page Not Found
          </h2>
          <p className="text-warm-600 mb-10 font-light leading-relaxed text-lg">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
            Search or browse below to find what you need.
          </p>

          {/* Search - internal linking & recovery */}
          <form
            action="/search"
            method="get"
            className="mb-12 max-w-md mx-auto"
            role="search"
          >
            <label htmlFor="404-search" className="sr-only">
              Search our collection
            </label>
            <div className="flex gap-2">
              <input
                id="404-search"
                type="search"
                name="q"
                placeholder="Search products..."
                className="flex-1 px-4 py-3 border border-warm-300 bg-warm-50 text-warm-900 placeholder-warm-500 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent min-h-[44px]"
              />
              <button
                type="submit"
                className="bg-warm-900 text-warm-50 px-6 py-3 hover:bg-gold-600 transition-colors text-sm uppercase tracking-wider font-light min-h-[44px]"
              >
                Search
              </button>
            </div>
          </form>

          {/* Popular categories - internal linking */}
          <div className="mb-12">
            <h3 className="text-sm uppercase tracking-[0.2em] text-warm-500 font-light mb-4">
              Popular categories
            </h3>
            <ul className="flex flex-wrap justify-center gap-3">
              {categories.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/shop/${cat.slug}`}
                    className="inline-flex items-center px-5 py-2.5 border border-warm-300 text-warm-700 hover:border-warm-900 hover:text-warm-900 hover:bg-warm-100 transition-colors text-sm uppercase tracking-wider font-light min-h-[44px]"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Helpful navigation */}
          <nav className="flex flex-wrap justify-center gap-4 text-sm" aria-label="Helpful links">
            <Link
              href="/"
              className="text-warm-600 hover:text-gold-600 border-b border-transparent hover:border-gold-600 transition-colors"
            >
              Home
            </Link>
            <Link
              href="/shop"
              className="text-warm-600 hover:text-gold-600 border-b border-transparent hover:border-gold-600 transition-colors"
            >
              Shop
            </Link>
            <Link
              href="/about"
              className="text-warm-600 hover:text-gold-600 border-b border-transparent hover:border-gold-600 transition-colors"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-warm-600 hover:text-gold-600 border-b border-transparent hover:border-gold-600 transition-colors"
            >
              Contact
            </Link>
            <Link
              href="/faq"
              className="text-warm-600 hover:text-gold-600 border-b border-transparent hover:border-gold-600 transition-colors"
            >
              FAQ
            </Link>
          </nav>

          <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
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
    </>
  );
}
