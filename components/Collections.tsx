"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const collections = [
  {
    title: "Evening Wear",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80",
    href: "/shop?category=evening-wear",
  },
  {
    title: "Ready-to-Wear",
    image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&q=80",
    href: "/shop?category=ready-to-wear",
  },
  {
    title: "Accessories",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=80",
    href: "/shop?category=accessories",
  },
];

export default function Collections() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
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
      className="py-20 md:py-32 px-6 lg:px-8 bg-[#1a1a1a]"
    >
      <div className="max-w-7xl mx-auto">
        {/* Centered Heading */}
        <div className="text-center mb-16 md:mb-20">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-playfair text-white mb-4 font-normal tracking-wide">
            Discover Our Collections
          </h2>
        </div>

        {/* Collection Cards Grid */}
        <div
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10 transition-opacity duration-1000 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          {collections.map((collection, index) => (
            <div
              key={collection.title}
              className="group relative overflow-hidden aspect-[3/4] rounded-sm"
              style={{
                animationDelay: `${index * 150}ms`,
                animation: isVisible
                  ? "fadeInUp 0.8s ease-out forwards"
                  : "none",
              }}
            >
              {/* Background Image with Zoom Effect */}
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-700 ease-out group-hover:scale-110"
                style={{
                  backgroundImage: `url('${collection.image}')`,
                }}
              />

              {/* Semi-transparent Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20 group-hover:from-black/80 transition-all duration-300" />

              {/* Content Overlay */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 md:p-8 text-center">
                <h3 className="text-3xl md:text-4xl font-playfair text-white mb-6 font-normal tracking-wide">
                  {collection.title}
                </h3>
                <Link
                  href={collection.href}
                  aria-label={`Shop ${collection.title} collection`}
                  className="inline-flex items-center justify-center bg-transparent border-2 border-white text-white px-8 py-3 md:px-10 md:py-4 hover:bg-white hover:text-[#1a1a1a] transition-all duration-300 ease-in-out text-xs md:text-sm uppercase tracking-[0.15em] font-inter font-light group-hover:border-gold-accent group-hover:bg-gold-accent"
                >
                  SHOP NOW
                  <svg
                    className="ml-3 w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
