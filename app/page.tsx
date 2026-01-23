import Link from "next/link";
import type { Metadata } from "next";
import Hero from "@/components/Hero";
import Collections from "@/components/Collections";

export const metadata: Metadata = {
  title: "Luxury Women's Fashion | Designer Collections & Premium Clothing",
  description: "Welcome to Luxe Couture - your destination for exclusive luxury women's fashion. Explore our curated collection of designer evening gowns, sophisticated ready-to-wear pieces, and premium accessories. Handcrafted elegance, exceptional quality, and timeless style for the modern woman.",
  keywords: [
    "luxury fashion",
    "designer women's clothing",
    "evening wear",
    "luxury dresses",
    "premium fashion boutique",
    "high-end women's fashion",
    "designer collections"
  ],
  openGraph: {
    title: "Luxe Couture | Luxury Women's Fashion & Designer Collections",
    description: "Discover exclusive luxury women's fashion with handcrafted elegance and exceptional quality. Shop designer evening gowns, sophisticated ready-to-wear, and premium accessories.",
    url: "/",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Luxe Couture - Luxury Women's Fashion Collection",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Luxe Couture | Luxury Women's Fashion & Designer Collections",
    description: "Discover exclusive luxury women's fashion with handcrafted elegance and exceptional quality.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  return (
    <div className="pt-24">
      <Hero />
      
      {/* Discover Our Collections Section */}
      <Collections />

      {/* CTA Section */}
      <section className="py-40 px-6 lg:px-8 bg-warm-50 border-t border-warm-200/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-playfair text-warm-900 mb-12 font-normal tracking-[0.05em]">
            Experience Luxury Fashion
          </h2>
          <p className="text-warm-600 mb-16 text-sm font-light tracking-[0.1em] uppercase max-w-2xl mx-auto leading-relaxed">
            Join our exclusive community and be the first to discover new collections
          </p>
          <Link
            href="/shop"
            aria-label="Explore our complete luxury fashion collection"
            className="group inline-flex items-center text-warm-900 border border-warm-900 px-10 py-4 hover:bg-warm-900 hover:text-warm-50 transition-all duration-300 text-xs uppercase tracking-[0.2em] font-light hover:scale-105 hover:shadow-lg rounded-sm hover:border-gold-500/30"
          >
            Explore Collection
            <svg
              className="ml-3 w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
}
