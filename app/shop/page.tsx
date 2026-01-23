"use client";

import Image from "next/image";
import ProductCard from "@/components/ProductCard";
import { getAllProducts } from "@/data/products";
import StaggeredGrid from "@/components/animations/StaggeredGrid";
import FadeInOnScroll from "@/components/animations/FadeInOnScroll";
import { useEffect } from "react";
import { initSmoothScroll } from "@/lib/smooth-scroll";

export default function Shop() {
  const products = getAllProducts();

  useEffect(() => {
    initSmoothScroll();
  }, []);

  return (
    <div>
      {/* Hero Banner */}
      <FadeInOnScroll>
        <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-warm-900/50 to-warm-900/60 z-10" />
          <div className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1445205170230-053b83016050?w=1920&q=80"
              alt="Shop collection"
              fill
              priority
              quality={90}
              sizes="100vw"
              className="object-cover"
            />
          </div>
          <div className="relative z-20 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-playfair text-warm-50 mb-6 tracking-wide">
              Collection
            </h1>
            <p className="text-xl md:text-2xl text-warm-100 font-light tracking-wide max-w-2xl mx-auto">
              Curated pieces of timeless elegance
            </p>
          </div>
        </section>
      </FadeInOnScroll>

      {/* Products Section */}
      <div className="pt-20 pb-40 px-6 lg:px-8 bg-warm-50">
        <div className="max-w-7xl mx-auto">
          {/* Product Grid */}
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
              />
            ))}
          </StaggeredGrid>

          {/* Optional: Load More or Pagination */}
          <div className="text-center mt-32">
            <button className="text-warm-600 hover:text-warm-900 hover:text-gold-600 text-xs uppercase tracking-[0.2em] font-light border-b border-warm-300 hover:border-gold-600 transition-all duration-300 pb-1 hover:scale-105">
              Load More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
