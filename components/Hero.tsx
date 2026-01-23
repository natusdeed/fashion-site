"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

// Elegant fashion shopping bags image
const heroBackgroundImage = "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&q=80";

export default function Hero() {
  const parallaxRef = useRef<HTMLDivElement>(null);

  // Parallax scrolling effect
  useEffect(() => {
    const handleScroll = () => {
      if (parallaxRef.current) {
        const scrolled = window.pageYOffset;
        const parallaxSpeed = 0.5;
        parallaxRef.current.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Parallax Background Image */}
      <div 
        ref={parallaxRef}
        className="absolute inset-0 w-full h-[120%] bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('${heroBackgroundImage}')`,
        }}
      />
      
      {/* Dark Overlay for Text Readability */}
      <div className="absolute inset-0 bg-black/30 z-10" />

      {/* Content Overlay */}
      <div className="relative z-20 w-full max-w-6xl mx-auto px-6 lg:px-8 text-center">
        {/* Main Headline - Timeless Elegance */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-playfair text-white mb-6 leading-tight font-normal tracking-wide">
          Timeless Elegance
        </h1>
        
        {/* Subtitle */}
        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/90 mb-12 max-w-2xl mx-auto font-inter font-light tracking-[0.15em] uppercase">
          MAKE YOUR LIFE LUXURIOUS
        </p>

        {/* CTA Button */}
        <div className="flex justify-center">
          <Link
            href="/shop"
            aria-label="Shop the new collection"
            className="group inline-flex items-center justify-center bg-transparent border-2 border-white text-white px-8 py-4 md:px-12 md:py-5 hover:bg-gold-accent hover:border-gold-accent transition-all duration-300 ease-in-out text-xs md:text-sm uppercase tracking-[0.2em] font-inter font-light relative overflow-hidden"
          >
            <span className="relative z-10">SHOP THE NEW COLLECTION</span>
            <svg
              className="ml-3 md:ml-4 w-4 h-4 md:w-5 md:h-5 transform group-hover:translate-x-1 transition-transform duration-300"
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

      {/* Smooth Scroll Indicator */}
      <button
        onClick={scrollToContent}
        aria-label="Scroll to content"
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex flex-col items-center text-white/80 hover:text-white transition-colors duration-300 group"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] font-inter font-light mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          Scroll
        </span>
        <div className="w-px h-12 bg-gradient-to-b from-white/60 to-transparent animate-bounce" />
        <svg
          className="w-5 h-5 mt-2 animate-bounce"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </button>
    </section>
  );
}
