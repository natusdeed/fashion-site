"use client";

import { useState, useMemo } from "react";
import ProductCard from "@/components/ProductCard";
import { getAllProducts, Product } from "@/data/products";
import StaggeredGrid from "@/components/animations/StaggeredGrid";
import { motion } from "framer-motion";

interface FilterState {
  categories: string[];
  priceRange: [number, number];
  sizes: string[];
  colors: string[];
}

const ITEMS_PER_PAGE = 12;

export default function CompleteCollection() {
  const allProducts = getAllProducts();
  const [showFilters, setShowFilters] = useState(false);
  const [displayCount, setDisplayCount] = useState(ITEMS_PER_PAGE);
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    priceRange: [0, 2000],
    sizes: [],
    colors: [],
  });

  // Get unique values for filters
  const categories = useMemo(() => {
    return Array.from(new Set(allProducts.map((p) => p.category))).sort();
  }, [allProducts]);

  const sizes = useMemo(() => {
    return Array.from(
      new Set(allProducts.flatMap((p) => p.sizes))
    ).sort();
  }, [allProducts]);

  const colors = useMemo(() => {
    return Array.from(
      new Set(allProducts.flatMap((p) => p.colors.map((c) => c.name)))
    ).sort();
  }, [allProducts]);

  // Filter products
  const filteredProducts = useMemo(() => {
    return allProducts.filter((product) => {
      // Category filter
      if (
        filters.categories.length > 0 &&
        !filters.categories.includes(product.category)
      ) {
        return false;
      }

      // Price range filter
      const price = product.isOnSale && product.originalPrice
        ? product.originalPrice
        : product.price;
      if (price < filters.priceRange[0] || price > filters.priceRange[1]) {
        return false;
      }

      // Size filter
      if (
        filters.sizes.length > 0 &&
        !filters.sizes.some((size) => product.sizes.includes(size))
      ) {
        return false;
      }

      // Color filter
      if (
        filters.colors.length > 0 &&
        !filters.colors.some((color) =>
          product.colors.some((c) => c.name === color)
        )
      ) {
        return false;
      }

      return true;
    });
  }, [allProducts, filters]);

  // Products to display (with pagination)
  const displayedProducts = useMemo(() => {
    return filteredProducts.slice(0, displayCount);
  }, [filteredProducts, displayCount]);

  const hasMore = displayCount < filteredProducts.length;

  const handleLoadMore = () => {
    setDisplayCount((prev) => prev + ITEMS_PER_PAGE);
  };

  const handleCategoryToggle = (category: string) => {
    setFilters((prev) => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter((c) => c !== category)
        : [...prev.categories, category],
    }));
    setDisplayCount(ITEMS_PER_PAGE); // Reset pagination when filter changes
  };

  const handleSizeToggle = (size: string) => {
    setFilters((prev) => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter((s) => s !== size)
        : [...prev.sizes, size],
    }));
    setDisplayCount(ITEMS_PER_PAGE);
  };

  const handleColorToggle = (color: string) => {
    setFilters((prev) => ({
      ...prev,
      colors: prev.colors.includes(color)
        ? prev.colors.filter((c) => c !== color)
        : [...prev.colors, color],
    }));
    setDisplayCount(ITEMS_PER_PAGE);
  };

  const handlePriceRangeChange = (min: number, max: number) => {
    setFilters((prev) => ({
      ...prev,
      priceRange: [min, max],
    }));
    setDisplayCount(ITEMS_PER_PAGE);
  };

  const clearFilters = () => {
    setFilters({
      categories: [],
      priceRange: [0, 2000],
      sizes: [],
      colors: [],
    });
    setDisplayCount(ITEMS_PER_PAGE);
  };

  const activeFilterCount =
    filters.categories.length +
    (filters.priceRange[0] > 0 || filters.priceRange[1] < 2000 ? 1 : 0) +
    filters.sizes.length +
    filters.colors.length;

  return (
    <section className="py-20 md:py-32 px-6 lg:px-8 bg-warm-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-playfair text-warm-900 mb-4 font-normal tracking-[0.05em]">
            Complete Collection
          </h2>
          <p className="text-warm-600 text-sm md:text-base font-light tracking-[0.1em] uppercase max-w-2xl mx-auto leading-relaxed">
            Discover the art of timeless fashion
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Filter Sidebar */}
          <aside
            className={`w-full lg:w-64 flex-shrink-0 ${
              showFilters ? "block" : "hidden lg:block"
            }`}
          >
            <div className="bg-white p-6 rounded-sm border border-warm-200 sticky top-24">
              {/* Filter Header */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-warm-900 font-playfair text-xl font-normal tracking-[0.02em]">
                  Filters
                </h3>
                {activeFilterCount > 0 && (
                  <button
                    onClick={clearFilters}
                    className="text-xs text-warm-600 hover:text-warm-900 uppercase tracking-[0.1em] font-light border-b border-transparent hover:border-warm-600 transition-colors"
                  >
                    Clear All
                  </button>
                )}
              </div>

              {/* Category Filter */}
              <div className="mb-8">
                <h4 className="text-warm-900 font-light text-sm uppercase tracking-[0.1em] mb-4">
                  Category
                </h4>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <label
                      key={category}
                      className="flex items-center cursor-pointer group"
                    >
                      <input
                        type="checkbox"
                        checked={filters.categories.includes(category)}
                        onChange={() => handleCategoryToggle(category)}
                        className="w-4 h-4 text-gold-600 border-warm-300 rounded focus:ring-gold-500 focus:ring-2"
                      />
                      <span className="ml-3 text-sm text-warm-700 font-light group-hover:text-warm-900 transition-colors">
                        {category}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range Filter */}
              <div className="mb-8">
                <h4 className="text-warm-900 font-light text-sm uppercase tracking-[0.1em] mb-4">
                  Price Range
                </h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs text-warm-600 mb-2">Min Price</label>
                    <input
                      type="range"
                      min="0"
                      max="2000"
                      step="50"
                      value={filters.priceRange[0]}
                      onChange={(e) =>
                        handlePriceRangeChange(
                          Number(e.target.value),
                          filters.priceRange[1]
                        )
                      }
                      className="w-full h-2 bg-warm-200 rounded-lg appearance-none cursor-pointer accent-gold-600"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-warm-600 mb-2">Max Price</label>
                    <input
                      type="range"
                      min="0"
                      max="2000"
                      step="50"
                      value={filters.priceRange[1]}
                      onChange={(e) =>
                        handlePriceRangeChange(
                          filters.priceRange[0],
                          Number(e.target.value)
                        )
                      }
                      className="w-full h-2 bg-warm-200 rounded-lg appearance-none cursor-pointer accent-gold-600"
                    />
                  </div>
                  <div className="flex justify-between text-xs text-warm-700 font-light pt-2 border-t border-warm-200">
                    <span>${filters.priceRange[0]}</span>
                    <span>${filters.priceRange[1]}</span>
                  </div>
                </div>
              </div>

              {/* Size Filter */}
              <div className="mb-8">
                <h4 className="text-warm-900 font-light text-sm uppercase tracking-[0.1em] mb-4">
                  Size
                </h4>
                <div className="flex flex-wrap gap-2">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => handleSizeToggle(size)}
                      className={`px-4 py-2 text-xs uppercase tracking-[0.1em] font-light border transition-all ${
                        filters.sizes.includes(size)
                          ? "bg-warm-900 text-warm-50 border-warm-900"
                          : "bg-white text-warm-700 border-warm-300 hover:border-warm-900"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Filter */}
              <div className="mb-8">
                <h4 className="text-warm-900 font-light text-sm uppercase tracking-[0.1em] mb-4">
                  Color
                </h4>
                <div className="space-y-2">
                  {colors.map((color) => (
                    <label
                      key={color}
                      className="flex items-center cursor-pointer group"
                    >
                      <input
                        type="checkbox"
                        checked={filters.colors.includes(color)}
                        onChange={() => handleColorToggle(color)}
                        className="w-4 h-4 text-gold-600 border-warm-300 rounded focus:ring-gold-500 focus:ring-2"
                      />
                      <span className="ml-3 text-sm text-warm-700 font-light group-hover:text-warm-900 transition-colors">
                        {color}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Results Count */}
              <div className="pt-6 border-t border-warm-200">
                <p className="text-xs text-warm-600 font-light uppercase tracking-[0.1em]">
                  {filteredProducts.length} {filteredProducts.length === 1 ? "item" : "items"} found
                </p>
              </div>
            </div>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Mobile Filter Toggle */}
            <div className="lg:hidden mb-6 flex items-center justify-between">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 text-warm-700 hover:text-warm-900 text-sm uppercase tracking-[0.1em] font-light border border-warm-300 px-4 py-3 hover:border-warm-900 transition-colors duration-200 min-h-[44px]"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                  />
                </svg>
                Filters
                {activeFilterCount > 0 && (
                  <span className="bg-gold-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {activeFilterCount}
                  </span>
                )}
              </button>
            </div>

            {/* Products Grid */}
            {displayedProducts.length > 0 ? (
              <>
                <StaggeredGrid
                  staggerDelay={50}
                  className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-10 lg:gap-12"
                >
                  {displayedProducts.map((product) => (
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
                </StaggeredGrid>

                {/* Load More Button */}
                {hasMore && (
                  <div className="text-center mt-16">
                    <button
                      onClick={handleLoadMore}
                      className="group inline-flex items-center text-warm-900 border border-warm-900 px-10 py-4 hover:bg-warm-900 hover:text-warm-50 transition-all duration-200 md:duration-300 text-xs uppercase tracking-[0.2em] font-light hover:scale-105 hover:shadow-lg rounded-sm hover:border-gold-500/30 min-h-[44px]"
                    >
                      Load More
                      <svg
                        className="ml-3 w-4 h-4 transform group-hover:translate-y-1 transition-transform duration-300"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                      </svg>
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-20">
                <p className="text-warm-600 text-lg font-light mb-4">
                  No products found matching your filters.
                </p>
                <button
                  onClick={clearFilters}
                  className="text-warm-900 border border-warm-900 px-6 py-2 text-sm uppercase tracking-[0.1em] font-light hover:bg-warm-900 hover:text-warm-50 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
