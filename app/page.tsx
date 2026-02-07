"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import Hero from "@/components/Hero";
import FadeInOnScroll from "@/components/animations/FadeInOnScroll";
import { useEffect } from "react";
import { initSmoothScroll } from "@/lib/smooth-scroll";
import { motion } from "framer-motion";

// Dynamic imports for below-the-fold components - code splitting for better performance
const CollectionSkeleton = () => (
  <div className="py-20 md:py-32 px-6 lg:px-8 bg-warm-50">
    <div className="max-w-7xl mx-auto">
      <div className="h-12 bg-warm-200 rounded w-1/3 mx-auto mb-16 animate-pulse" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="aspect-[3/4] bg-warm-200 rounded-sm mb-4" />
            <div className="h-3 bg-warm-200 rounded w-1/3 mb-2" />
            <div className="h-5 bg-warm-300 rounded w-2/3" />
          </div>
        ))}
      </div>
    </div>
  </div>
);

const FeaturedCollection = dynamic(
  () => import("@/components/FeaturedCollection"),
  { loading: () => <CollectionSkeleton /> }
);
const Collections = dynamic(
  () => import("@/components/Collections"),
  { loading: () => <CollectionSkeleton /> }
);
const CompleteCollection = dynamic(
  () => import("@/components/CompleteCollection"),
  { loading: () => <CollectionSkeleton /> }
);
const FeaturedAccessories = dynamic(
  () => import("@/components/FeaturedAccessories"),
  { loading: () => <CollectionSkeleton /> }
);

export default function Home() {
  useEffect(() => {
    initSmoothScroll();
  }, []);

  return (
    <div>
      <Hero />
      
      {/* Featured Collection Section */}
      <FadeInOnScroll>
        <FeaturedCollection />
      </FadeInOnScroll>

      {/* Discover Our Collections Section */}
      <FadeInOnScroll delay={100}>
        <Collections />
      </FadeInOnScroll>

      {/* Complete Collection Section with Filters */}
      <FadeInOnScroll delay={200}>
        <CompleteCollection />
      </FadeInOnScroll>

      {/* Featured Accessories Section */}
      <FadeInOnScroll delay={250}>
        <FeaturedAccessories />
      </FadeInOnScroll>

      {/* CTA Section */}
      <FadeInOnScroll delay={300}>
        <section className="py-40 px-6 lg:px-8 bg-warm-50 border-t border-warm-200/50">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-playfair text-warm-900 mb-12 font-normal tracking-[0.05em]">
              Experience Luxury Fashion
            </h2>
            <p className="text-warm-600 mb-16 text-sm font-light tracking-[0.1em] uppercase max-w-2xl mx-auto leading-relaxed">
              Join our exclusive community and be the first to discover new collections
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/shop"
                aria-label="Explore our complete luxury fashion collection"
                className="group inline-flex items-center text-warm-900 border border-warm-900 px-10 py-4 hover:bg-warm-900 hover:text-warm-50 transition-colors duration-150 text-xs uppercase tracking-[0.2em] font-light hover:shadow-lg rounded-sm hover:border-gold-500/30 active:scale-95 hover:scale-105"
              >
                Explore Collection
                <motion.svg
                  className="ml-3 w-4 h-4"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  animate={{ x: [0, 4, 0] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                >
                  <path d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </motion.svg>
              </Link>
            </motion.div>
          </div>
        </section>
      </FadeInOnScroll>
    </div>
  );
}
