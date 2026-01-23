"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { products, Product } from "@/data/products";
import LazyImage from "@/components/LazyImage";

interface SearchFilters {
  category: string;
  minPrice: number;
  maxPrice: number;
  availability: "all" | "in-stock" | "on-sale";
}

const POPULAR_SEARCHES = [
  "Dresses",
  "Outerwear",
  "Tops",
  "Bottoms",
  "Evening Wear",
  "Silk",
  "Leather",
  "Sale",
];

const MAX_RECENT_SEARCHES = 5;
const RESULTS_PER_PAGE = 5;

export default function SearchBar({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<SearchFilters>({
    category: "all",
    minPrice: 0,
    maxPrice: 2000,
    availability: "all",
  });
  const [showResults, setShowResults] = useState(false);

  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Load recent searches from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("recentSearches");
      if (stored) {
        try {
          setRecentSearches(JSON.parse(stored));
        } catch (e) {
          console.error("Error parsing recent searches:", e);
        }
      }
    }
  }, []);

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Perform search
  useEffect(() => {
    if (!debouncedQuery.trim()) {
      setResults([]);
      setShowResults(false);
      return;
    }

    const filtered = products.filter((product) => {
      // Text search
      const matchesQuery =
        product.name.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(debouncedQuery.toLowerCase());

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

    setResults(filtered);
    setShowResults(true);
  }, [debouncedQuery, filters]);

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  // Focus input when search opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Save search to recent searches
  const saveRecentSearch = useCallback((query: string) => {
    if (!query.trim()) return;

    setRecentSearches((prev) => {
      const updated = [
        query,
        ...prev.filter((item) => item.toLowerCase() !== query.toLowerCase()),
      ].slice(0, MAX_RECENT_SEARCHES);

      if (typeof window !== "undefined") {
        localStorage.setItem("recentSearches", JSON.stringify(updated));
      }

      return updated;
    });
  }, []);

  // Handle search submission
  const handleSearch = (query: string) => {
    if (!query.trim()) return;

    saveRecentSearch(query);
    setSearchQuery("");
    setShowResults(false);
    onClose();
    router.push(`/search?q=${encodeURIComponent(query)}`);
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    const totalItems = results.length + (recentSearches.length > 0 ? recentSearches.length : 0) + (POPULAR_SEARCHES.length > 0 ? POPULAR_SEARCHES.length : 0);
    const displayedResults = results.slice(0, RESULTS_PER_PAGE);

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex((prev) => {
          const maxIndex = searchQuery.trim()
            ? displayedResults.length - 1
            : Math.max(recentSearches.length - 1, POPULAR_SEARCHES.length - 1);
          return prev < maxIndex ? prev + 1 : prev;
        });
        break;

      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;

      case "Enter":
        e.preventDefault();
        if (selectedIndex >= 0 && searchQuery.trim()) {
        if (selectedIndex < displayedResults.length) {
          handleSearch(searchQuery);
          router.push(`/shop/${displayedResults[selectedIndex].slug}`);
        }
        } else if (searchQuery.trim()) {
          handleSearch(searchQuery);
        }
        break;

      case "Escape":
        e.preventDefault();
        onClose();
        break;
    }
  };

  // Format price
  const formatPrice = (price: number) => {
    return `$${price.toLocaleString()}`;
  };

  // Get categories for filter
  const categories = ["all", ...Array.from(new Set(products.map((p) => p.category)))];

  const displayedResults = results.slice(0, RESULTS_PER_PAGE);
  const hasMoreResults = results.length > RESULTS_PER_PAGE;
  const showSuggestions = !searchQuery.trim();

  return (
    <div ref={containerRef} className="relative">
      {/* Search Input */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-4">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (searchQuery.trim()) {
              handleSearch(searchQuery);
            }
          }}
          className="relative"
        >
          <div className="relative">
            <input
              ref={inputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setSelectedIndex(-1);
              }}
              onKeyDown={handleKeyDown}
              onFocus={() => {
                if (searchQuery.trim()) {
                  setShowResults(true);
                } else if (recentSearches.length > 0 || POPULAR_SEARCHES.length > 0) {
                  setShowResults(true);
                }
              }}
              placeholder="Search for products..."
              className="w-full px-4 py-3 pl-12 pr-32 bg-warm-100 border border-warm-300 rounded-sm text-warm-900 placeholder-warm-500 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-gold-500 transition-all duration-300"
            />
            <button
              type="submit"
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-warm-600 hover:text-gold-600 transition-colors duration-300"
              aria-label="Submit search"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => setShowFilters(!showFilters)}
              className="absolute right-20 top-1/2 transform -translate-y-1/2 px-3 py-1.5 text-xs text-warm-600 hover:text-gold-600 transition-colors duration-300 flex items-center gap-1"
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
              Filters
            </button>
            <button
              type="button"
              onClick={onClose}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-warm-600 hover:text-warm-900 transition-colors duration-300"
              aria-label="Close search"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </form>

        {/* Filters Panel */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="mt-3 p-4 bg-warm-50 border border-warm-200 rounded-sm space-y-4">
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
                  <div className="flex gap-4">
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
        </AnimatePresence>
      </div>

      {/* Search Results Dropdown */}
      <AnimatePresence>
        {(showResults || (showSuggestions && isOpen)) && (
          <motion.div
            ref={resultsRef}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 z-50 bg-warm-50 border-x border-b border-warm-200 shadow-2xl max-h-[600px] overflow-y-auto"
          >
            {searchQuery.trim() ? (
              // Search Results
              <>
                {displayedResults.length > 0 ? (
                  <>
                    <div className="p-2">
                      {displayedResults.map((product, index) => (
                        <Link
                          key={product.id}
                          href={`/shop/${product.slug}`}
                          onClick={() => {
                            handleSearch(searchQuery);
                            onClose();
                          }}
                          className={`block p-3 hover:bg-warm-100 transition-colors duration-200 ${
                            selectedIndex === index ? "bg-warm-100" : ""
                          }`}
                        >
                          <div className="flex items-center gap-4">
                            <div className="relative w-16 h-16 flex-shrink-0 bg-warm-200 rounded-sm overflow-hidden">
                              {product.imageUrl && (
                                <LazyImage
                                  src={product.imageUrl}
                                  alt={product.name}
                                  fill
                                  sizes="64px"
                                  className="object-cover"
                                />
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="text-sm font-light text-warm-900 truncate">
                                {product.name}
                              </h4>
                              <p className="text-xs text-warm-500 uppercase tracking-[0.05em] mt-0.5">
                                {product.category}
                              </p>
                              <div className="flex items-center gap-2 mt-1">
                                {product.isOnSale && product.originalPrice ? (
                                  <>
                                    <span className="text-xs text-warm-500 line-through">
                                      {formatPrice(product.originalPrice)}
                                    </span>
                                    <span className="text-sm font-medium text-red-600">
                                      {formatPrice(product.price)}
                                    </span>
                                  </>
                                ) : (
                                  <span className="text-sm font-light text-warm-700">
                                    {formatPrice(product.price)}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>

                    {hasMoreResults && (
                      <div className="border-t border-warm-200 p-3">
                        <Link
                          href={`/search?q=${encodeURIComponent(searchQuery)}`}
                          onClick={() => {
                            handleSearch(searchQuery);
                            onClose();
                          }}
                          className="block text-center text-sm text-gold-600 hover:text-gold-700 font-light uppercase tracking-[0.1em] transition-colors duration-200"
                        >
                          View All Results ({results.length})
                        </Link>
                      </div>
                    )}
                  </>
                ) : (
                  // No Results
                  <div className="p-8 text-center">
                    <svg
                      className="w-16 h-16 mx-auto text-warm-300 mb-4"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-warm-600 font-light mb-4">
                      No products found for &quot;{searchQuery}&quot;
                    </p>
                    <div className="space-y-2">
                      <p className="text-xs text-warm-500 uppercase tracking-[0.1em] mb-3">
                        Try searching for:
                      </p>
                      <div className="flex flex-wrap gap-2 justify-center">
                        {POPULAR_SEARCHES.slice(0, 4).map((term) => (
                          <button
                            key={term}
                            onClick={() => {
                              setSearchQuery(term);
                              handleSearch(term);
                            }}
                            className="px-4 py-2 text-xs bg-warm-100 hover:bg-warm-200 text-warm-700 rounded-sm transition-colors duration-200 uppercase tracking-[0.05em]"
                          >
                            {term}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </>
            ) : (
              // Suggestions (Recent & Popular)
              <div className="p-4">
                {recentSearches.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-xs font-light text-warm-500 uppercase tracking-[0.1em] mb-3">
                      Recent Searches
                    </h3>
                    <div className="space-y-1">
                      {recentSearches.map((search, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            setSearchQuery(search);
                            handleSearch(search);
                          }}
                          className="w-full text-left px-3 py-2 text-sm text-warm-700 hover:bg-warm-100 rounded-sm transition-colors duration-200 flex items-center justify-between group"
                        >
                          <span className="flex items-center gap-2">
                            <svg
                              className="w-4 h-4 text-warm-400"
                              fill="none"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="1.5"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {search}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <h3 className="text-xs font-light text-warm-500 uppercase tracking-[0.1em] mb-3">
                    Popular Searches
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {POPULAR_SEARCHES.map((term) => (
                      <button
                        key={term}
                        onClick={() => {
                          setSearchQuery(term);
                          handleSearch(term);
                        }}
                        className="px-4 py-2 text-xs bg-warm-100 hover:bg-warm-200 text-warm-700 rounded-sm transition-colors duration-200 uppercase tracking-[0.05em]"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
