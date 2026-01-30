"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface FeaturedItem {
  name: string;
  price: number;
  imageUrl: string;
  imageAlt: string;
}

const featuredItems: FeaturedItem[] = [
  {
    name: "Silk Evening Gown",
    price: 1299,
    imageUrl: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800&q=80",
    imageAlt: "Elegant silk evening gown",
  },
  {
    name: "Cashmere Trench Coat",
    price: 899,
    imageUrl: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800&q=80",
    imageAlt: "Luxurious cashmere trench coat",
  },
  {
    name: "Lace Cocktail Dress",
    price: 699,
    imageUrl: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80",
    imageAlt: "Beautiful lace cocktail dress",
  },
];

export default function FeaturedCollection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-20 md:py-32 px-6 lg:px-8"
      style={{ backgroundColor: "#F5F1E8" }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header with Decorative Gold Lines */}
        <div className="text-center mb-16 md:mb-20">
          <div className="flex items-center justify-center gap-4 md:gap-8 mb-6">
            {/* Left Decorative Line */}
            <div className="flex-1 max-w-[100px] md:max-w-[150px] h-px bg-gradient-to-r from-transparent via-gold-500 to-gold-500" />
            
            {/* Heading */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-playfair text-warm-900 font-normal tracking-[0.05em] whitespace-nowrap">
              Featured Collection
            </h2>
            
            {/* Right Decorative Line */}
            <div className="flex-1 max-w-[100px] md:max-w-[150px] h-px bg-gradient-to-l from-transparent via-gold-500 to-gold-500" />
          </div>
          
          {/* Tagline */}
          <p className="text-warm-600 text-sm md:text-base font-light tracking-[0.1em] uppercase max-w-2xl mx-auto leading-relaxed">
            Pieces of exceptional elegance
          </p>
        </div>

        {/* Featured Items Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 lg:gap-12">
          {featuredItems.map((item, index) => (
            <div
              key={item.name}
              className={`group relative ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{
                transition: `opacity 0.8s ease-out ${index * 0.2}s, transform 0.8s ease-out ${index * 0.2}s`,
              }}
            >
              {/* Product Image Container */}
              <div className="relative aspect-[3/4] bg-gradient-to-br from-warm-50 to-warm-100 overflow-hidden mb-4 rounded-sm">
                <Image
                  src={item.imageUrl}
                  alt={item.imageAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  loading="lazy"
                  quality={85}
                />
                
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-warm-900/0 group-hover:bg-warm-900/5 transition-all duration-500" />
              </div>

              {/* Product Info */}
              <div className="space-y-2 text-center">
                <h3 className="text-warm-900 font-playfair text-xl md:text-2xl font-normal tracking-[0.02em] group-hover:text-gold-600 transition-colors duration-300">
                  {item.name}
                </h3>
                <p className="text-warm-700 text-base md:text-lg font-light tracking-[0.05em]">
                  ${item.price.toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
