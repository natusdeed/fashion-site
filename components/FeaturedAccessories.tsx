"use client";

import Link from "next/link";
import { useState, useCallback } from "react";
import { accessories } from "@/data/accessories";

const PLACEHOLDER_IMAGE = "/images/placeholder-product.svg";

/**
 * Featured Accessories section for the homepage.
 * Displays category quick links and featured accessory products.
 */
export default function FeaturedAccessories() {
  const featuredItems = accessories.filter((item) => item.featured).slice(0, 4);
  const [failedImageIds, setFailedImageIds] = useState<Set<string>>(() => new Set());

  const handleImageError = useCallback((itemId: string) => {
    setFailedImageIds((prev) => new Set(prev).add(itemId));
  }, []);

  return (
    <section className="py-16 bg-warm-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-warm-900 mb-4">Complete Your Look</h2>
          <p className="text-xl text-warm-600">Discover our stunning accessories collection</p>
        </div>

        {/* Category Quick Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <Link href="/shop/accessories?category=handbags" className="group">
            <div className="bg-gradient-to-br from-warm-100 to-warm-200 rounded-xl p-6 text-center hover:shadow-lg transition-all border border-warm-200/50">
              <div className="text-5xl mb-3">👜</div>
              <h3 className="font-semibold text-warm-800 group-hover:text-gold-600">Handbags</h3>
            </div>
          </Link>
          <Link href="/shop/accessories?category=purses" className="group">
            <div className="bg-gradient-to-br from-warm-100 to-warm-200 rounded-xl p-6 text-center hover:shadow-lg transition-all border border-warm-200/50">
              <div className="text-5xl mb-3">👛</div>
              <h3 className="font-semibold text-warm-800 group-hover:text-gold-600">Purses</h3>
            </div>
          </Link>
          <Link href="/shop/accessories?category=earrings" className="group">
            <div className="bg-gradient-to-br from-warm-100 to-warm-200 rounded-xl p-6 text-center hover:shadow-lg transition-all border border-warm-200/50">
              <div className="text-5xl mb-3">💎</div>
              <h3 className="font-semibold text-warm-800 group-hover:text-gold-600">Earrings</h3>
            </div>
          </Link>
          <Link href="/shop/accessories?category=necklaces" className="group">
            <div className="bg-gradient-to-br from-warm-100 to-warm-200 rounded-xl p-6 text-center hover:shadow-lg transition-all border border-warm-200/50">
              <div className="text-5xl mb-3">📿</div>
              <h3 className="font-semibold text-warm-800 group-hover:text-gold-600">Necklaces</h3>
            </div>
          </Link>
        </div>

        {/* Featured Accessories Products */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {featuredItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow border border-warm-100"
            >
              <div className="relative h-48 bg-warm-100">
                <img
                  src={failedImageIds.has(item.id) ? PLACEHOLDER_IMAGE : item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                  onError={() => handleImageError(item.id)}
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-warm-900 mb-2">{item.name}</h3>
                <div className="flex items-center justify-between">
                  <span className="text-gold-600 font-bold">${item.price}</span>
                  <Link
                    href="/shop/accessories"
                    className="bg-gold-500 text-warm-900 px-4 py-2 rounded-lg text-sm hover:bg-gold-600 transition-colors"
                  >
                    Shop Now
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/shop/accessories"
            className="inline-block bg-gradient-to-r from-warm-700 to-warm-800 text-warm-50 px-8 py-4 rounded-full font-semibold text-lg hover:shadow-xl transition-all hover:from-warm-800 hover:to-warm-900"
          >
            View All Accessories →
          </Link>
        </div>
      </div>
    </section>
  );
}
