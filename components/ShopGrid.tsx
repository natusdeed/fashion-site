"use client";

import ProductCard from "@/components/ProductCard";
import StaggeredGrid from "@/components/animations/StaggeredGrid";
import CollectionVideoBanner from "@/components/CollectionVideoBanner";
import Link from "next/link";
import { useEffect } from "react";
import { initSmoothScroll } from "@/lib/smooth-scroll";
import type { Product } from "@/data/products";

const PER_PAGE = 12;

interface ShopGridProps {
  products: Product[];
  currentPage: number;
  totalPages: number;
}

export default function ShopGrid({
  products,
  currentPage,
  totalPages,
}: ShopGridProps) {
  useEffect(() => {
    initSmoothScroll();
  }, []);

  return (
    <div>
      <CollectionVideoBanner
        imageUrl="/images/shop.header.png"
        collectionName="Collection"
        description="Curated pieces of timeless elegance"
        ctaLink="/shop"
        ctaText="Shop Collection"
        overlayOpacity={0.2}
      />

      <div className="pt-20 pb-40 px-6 lg:px-8 bg-warm-50">
        <div className="max-w-7xl mx-auto">
          <StaggeredGrid
            staggerDelay={50}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 md:gap-10 lg:gap-12"
          >
            {products.map((product) => (
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

          {/* Pagination - rel next/prev set in page metadata */}
          {totalPages > 1 && (
            <nav
              className="mt-20 flex flex-wrap items-center justify-center gap-4"
              aria-label="Shop pagination"
            >
              {currentPage > 1 && (
                <Link
                  href={currentPage === 2 ? "/shop" : `/shop?page=${currentPage - 1}`}
                  className="text-warm-600 hover:text-warm-900 hover:text-gold-600 text-xs uppercase tracking-[0.2em] font-light border-b border-warm-300 hover:border-gold-600 transition-colors duration-150 pb-1 min-h-[44px] flex items-center"
                >
                  Previous
                </Link>
              )}
              <span className="text-warm-600 text-xs uppercase tracking-[0.2em] font-light">
                Page {currentPage} of {totalPages}
              </span>
              {currentPage < totalPages && (
                <Link
                  href={`/shop?page=${currentPage + 1}`}
                  className="text-warm-600 hover:text-warm-900 hover:text-gold-600 text-xs uppercase tracking-[0.2em] font-light border-b border-warm-300 hover:border-gold-600 transition-colors duration-150 pb-1 min-h-[44px] flex items-center"
                >
                  Next
                </Link>
              )}
              <Link
                href="/shop/all"
                className="text-warm-500 hover:text-gold-600 text-xs uppercase tracking-[0.2em] font-light ml-4 min-h-[44px] flex items-center"
              >
                View all
              </Link>
            </nav>
          )}
        </div>
      </div>
    </div>
  );
}

export { PER_PAGE };
