"use client";

import { useState, useEffect, useMemo, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { products, Product } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { motion } from "framer-motion";

interface SearchFilters {
  category: string;
  minPrice: number;
  maxPrice: number;
  availability: "all" | "in-stock" | "on-sale";
}

function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get("q") || "";
  const [filters, setFilters] = useState<SearchFilters>({
    category: "all",
    minPrice: 0,
    maxPrice: 2000,
    availability: "all",
  });

  const [showFilters, setShowFilters] = useState(false);

  // Filter products based on query and filters
  const filteredProducts = useMemo(() => {
    if (!query.trim()) return [];

    return products.filter((product) => {
      // Text search
      const matchesQuery =
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase());

      if (!matchesQuery) return false;

      // Category filter
      if (filters.category !== "all" && product.category !== filters.category) {
        return false;
      }

      // Price filter
      if (product.price < filters.minPrice || product.price > filters.maxPrice) {
        return false;
      }

      // Availability filter
      if (filters.availability === "on-sale" && !product.isOnSale) {
        return false;
      }

      return true;
    });
  }, [query, filters]);

  const categories = ["all", ...Array.from(new Set(products.map((p) => p.category)))];

  if (!query.trim()) {
    return (
      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 min-h-screen">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-playfair text-warm-900 mb-4">
            Search Products
          </h1>
          <p className="text-warm-600 mb-8">
            Enter a search term to find products
          </p>
          <Link
            href="/shop"
            className="inline-block px-6 py-3 bg-warm-900 text-warm-50 hover:bg-gold-600 transition-colors duration-200 uppercase tracking-[0.1em] text-sm"
          >
            Browse All Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-playfair text-warm-900 mb-2">
                Search Results
              </h1>
              <p className="text-warm-600">
                {filteredProducts.length} {filteredProducts.length === 1 ? "result" : "results"} for &quot;
                {query}&quot;
              </p>
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 border border-warm-300 hover:border-gold-500 transition-colors duration-200 text-sm uppercase tracking-[0.1em] text-warm-700"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              {showFilters ? "Hide" : "Show"} Filters
            </button>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-6 p-6 bg-warm-50 border border-warm-200 rounded-sm"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Category Filter */}
                <div>
                  <label className="block text-xs font-light text-warm-700 uppercase tracking-[0.1em] mb-2">
                    Category
                  </label>
                  <select
                    value={filters.category}
                    onChange={(e) =>
                      setFilters({ ...filters, category: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-white border border-warm-300 rounded-sm text-warm-900 text-sm focus:outline-none focus:ring-2 focus:ring-gold-500"
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat === "all" ? "All Categories" : cat}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Price Range Filter */}
                <div>
                  <label className="block text-xs font-light text-warm-700 uppercase tracking-[0.1em] mb-2">
                    Price Range: ${filters.minPrice} - ${filters.maxPrice}
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      min="0"
                      max="2000"
                      value={filters.minPrice}
                      onChange={(e) =>
                        setFilters({
                          ...filters,
                          minPrice: parseInt(e.target.value) || 0,
                        })
                      }
                      className="flex-1 px-3 py-2 bg-white border border-warm-300 rounded-sm text-warm-900 text-sm focus:outline-none focus:ring-2 focus:ring-gold-500"
                      placeholder="Min"
                    />
                    <input
                      type="number"
                      min="0"
                      max="2000"
                      value={filters.maxPrice}
                      onChange={(e) =>
                        setFilters({
                          ...filters,
                          maxPrice: parseInt(e.target.value) || 2000,
                        })
                      }
                      className="flex-1 px-3 py-2 bg-white border border-warm-300 rounded-sm text-warm-900 text-sm focus:outline-none focus:ring-2 focus:ring-gold-500"
                      placeholder="Max"
                    />
                  </div>
                </div>

                {/* Availability Filter */}
                <div>
                  <label className="block text-xs font-light text-warm-700 uppercase tracking-[0.1em] mb-2">
                    Availability
                  </label>
                  <select
                    value={filters.availability}
                    onChange={(e) =>
                      setFilters({
                        ...filters,
                        availability: e.target.value as SearchFilters["availability"],
                      })
                    }
                    className="w-full px-3 py-2 bg-white border border-warm-300 rounded-sm text-warm-900 text-sm focus:outline-none focus:ring-2 focus:ring-gold-500"
                  >
                    <option value="all">All Products</option>
                    <option value="in-stock">In Stock</option>
                    <option value="on-sale">On Sale</option>
                  </select>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Results */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                slug={product.slug}
                name={product.name}
                price={product.price}
                originalPrice={product.originalPrice}
                isOnSale={product.isOnSale}
                category={product.category}
                imageUrl={product.imageUrl}
                imageAlt={product.imageAlt}
                videoUrl={product.videoUrl}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <svg
              className="w-24 h-24 mx-auto text-warm-300 mb-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h2 className="text-2xl font-playfair text-warm-900 mb-4">
              No products found
            </h2>
            <p className="text-warm-600 mb-8">
              We couldn&apos;t find any products matching &quot;{query}&quot;. Try adjusting your filters or search term.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => {
                  setFilters({
                    category: "all",
                    minPrice: 0,
                    maxPrice: 2000,
                    availability: "all",
                  });
                }}
                className="px-6 py-3 border border-warm-300 hover:border-gold-500 text-warm-700 hover:text-gold-600 transition-colors duration-200 uppercase tracking-[0.1em] text-sm"
              >
                Clear Filters
              </button>
              <Link
                href="/shop"
                className="px-6 py-3 bg-warm-900 text-warm-50 hover:bg-gold-600 transition-colors duration-200 uppercase tracking-[0.1em] text-sm text-center"
              >
                Browse All Products
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 min-h-screen">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-playfair text-warm-900 mb-4">
            Search Products
          </h1>
          <p className="text-warm-600 mb-8">Loading...</p>
        </div>
      </div>
    }>
      <SearchContent />
    </Suspense>
  );
}
