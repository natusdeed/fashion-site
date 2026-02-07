'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { accessories, accessoryCategories } from '@/data/accessories';
import CollectionVideoBanner from '@/components/CollectionVideoBanner';

const PLACEHOLDER_IMAGE = '/images/placeholder-product.svg';

export default function AccessoriesPage() {
  const searchParams = useSearchParams();
  const categoryFromUrl = searchParams.get('category');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [failedImageIds, setFailedImageIds] = useState<Set<string>>(() => new Set());

  useEffect(() => {
    if (categoryFromUrl && accessoryCategories.some((c) => c.id === categoryFromUrl)) {
      setSelectedCategory(categoryFromUrl);
    }
  }, [categoryFromUrl]);

  const handleImageError = useCallback((itemId: string) => {
    setFailedImageIds((prev) => new Set(prev).add(itemId));
  }, []);

  const [sortBy, setSortBy] = useState<string>('featured');

  const filteredAccessories = selectedCategory === 'all'
    ? accessories
    : accessories.filter(item => item.category === selectedCategory);

  const sortedAccessories = [...filteredAccessories].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'featured') return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    return 0;
  });

  return (
    <div>
      <CollectionVideoBanner
        imageUrl="/images/accessories-banner.png"
        collectionName="Accessories"
        description="Complete your look with our stunning collection"
        ctaLink="/shop/accessories"
        ctaText="Shop Accessories"
        overlayOpacity={0.2}
      />

      <div className="pt-20 pb-40 px-6 lg:px-8 bg-warm-50">
        <div className="max-w-7xl mx-auto">
        {/* Category Filter */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-warm-900">Shop by Category</h2>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-6 py-3 rounded-full font-medium transition-all ${
                selectedCategory === 'all'
                  ? 'bg-gold-500 text-warm-900 shadow-lg'
                  : 'bg-white text-warm-700 hover:bg-warm-100 border border-warm-200'
              }`}
            >
              All Accessories
            </button>
            {accessoryCategories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-6 py-3 rounded-full font-medium transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-gold-500 text-warm-900 shadow-lg'
                    : 'bg-white text-warm-700 hover:bg-warm-100 border border-warm-200'
                }`}
              >
                <span className="mr-2">{cat.icon}</span>
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Sort Options */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-warm-600">
            Showing {sortedAccessories.length} {sortedAccessories.length === 1 ? 'item' : 'items'}
          </p>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 border border-warm-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-gold-500 bg-white text-warm-800"
          >
            <option value="featured">Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedAccessories.map(item => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-warm-100"
            >
              <div className="relative h-64 bg-warm-100">
                <img
                  src={failedImageIds.has(item.id) ? PLACEHOLDER_IMAGE : item.image}
                  alt={item.name}
                  className="w-full h-full object-cover [content-visibility:visible]"
                  loading="lazy"
                  decoding="async"
                  onError={() => handleImageError(item.id)}
                />
                {item.featured && (
                  <span className="absolute top-3 left-3 bg-gold-500 text-warm-900 px-3 py-1 rounded-full text-sm font-semibold">
                    Featured
                  </span>
                )}
                {!item.inStock && (
                  <div className="absolute inset-0 bg-warm-900/50 flex items-center justify-center">
                    <span className="text-white font-bold text-lg">Out of Stock</span>
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2 text-warm-900">{item.name}</h3>
                <p className="text-warm-600 text-sm mb-3">{item.description}</p>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-gold-600 font-bold text-xl">${item.price}</span>
                    {item.originalPrice && (
                      <span className="text-warm-500 line-through ml-2 text-sm">
                        ${item.originalPrice}
                      </span>
                    )}
                  </div>
                  <button
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      item.inStock
                        ? 'bg-gold-500 text-warm-900 hover:bg-gold-600'
                        : 'bg-warm-300 text-warm-600 cursor-not-allowed'
                    }`}
                    disabled={!item.inStock}
                  >
                    {item.inStock ? 'Add to Cart' : 'Sold Out'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        </div>
      </div>
    </div>
  );
}
