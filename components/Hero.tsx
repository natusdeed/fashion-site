"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

// #region agent log
if (typeof window === 'undefined') { fetch('http://127.0.0.1:7244/ingest/03c008b9-73dd-4259-8e28-9e129667c391',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'components/Hero.tsx:5',message:'Hero component module loading',data:{timestamp:Date.now()},sessionId:'debug-session',runId:'startup',hypothesisId:'C'})}).catch(()=>{}); }
// #endregion

// Luxury fashion images featuring well-dressed ladies
const heroImages = [
  "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1920&q=80",
  "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1920&q=80",
  "https://images.unsplash.com/photo-1524502397800-2eeaad7c3fe5?w=1920&q=80",
  "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1920&q=80",
  "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=1920&q=80",
];

export default function Hero() {
  // #region agent log
  if (typeof window !== 'undefined') { fetch('http://127.0.0.1:7244/ingest/03c008b9-73dd-4259-8e28-9e129667c391',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'components/Hero.tsx:15',message:'Hero component rendering (client)',data:{timestamp:Date.now()},sessionId:'debug-session',runId:'startup',hypothesisId:'C'})}).catch(()=>{}); }
  // #endregion
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-advance slideshow
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image Slideshow Area - Optimized for performance */}
      <div className="absolute inset-0">
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
            style={{
              backgroundImage: `url('${image}')`,
            }}
          />
        ))}
        {/* Gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-warm-900/40 via-warm-900/20 to-warm-900/50" />
        {/* Subtle texture overlay for luxury feel */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(212,175,55,0.05),transparent_50%)]" />
        {/* Soft vignette overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-warm-900/10 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-warm-900/10 via-transparent to-warm-900/10" />
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 lg:px-8">
        <div className="text-center">
          {/* Elegant Headline */}
          <h1 className="text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] font-playfair text-warm-900 mb-8 leading-[0.95] font-normal tracking-[0.02em]">
            Timeless
            <br />
            <span className="text-6xl md:text-7xl lg:text-8xl xl:text-[9rem] font-light italic tracking-[0.08em] text-warm-700">
              Elegance
            </span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-lg md:text-xl text-warm-600 mb-16 max-w-2xl mx-auto font-light tracking-[0.05em] leading-relaxed">
            Where exotic luxury meets refined sophistication
          </p>

          {/* Call-to-Action Button */}
          <div className="flex justify-center">
            <Link
              href="/shop"
              aria-label="Shop our luxury fashion collection"
              className="group inline-flex items-center justify-center bg-warm-900 text-warm-50 px-12 py-5 hover:bg-warm-800 hover:text-gold-100 transition-all duration-500 text-xs uppercase tracking-[0.25em] font-light relative overflow-hidden hover:scale-105 hover:shadow-xl rounded-sm border border-gold-500/20"
            >
              {/* Subtle shine effect on hover */}
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-gold-400/10 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              <span className="relative">Shop the Collection</span>
              <svg
                className="ml-4 w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-500"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      {/* Subtle corner accents */}
      <div className="absolute top-20 left-8 w-px h-24 bg-gradient-to-b from-gold-400/40 to-transparent hidden lg:block" />
      <div className="absolute top-20 right-8 w-px h-24 bg-gradient-to-b from-gold-400/40 to-transparent hidden lg:block" />
      
      {/* Slide Navigation Dots */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-20 flex gap-3">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`transition-all duration-300 rounded-full ${
              index === currentSlide
                ? "w-8 h-1.5 bg-gold-400"
                : "w-1.5 h-1.5 bg-warm-500/50 hover:bg-warm-500/70"
            }`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 z-10">
        <div className="flex flex-col items-center text-warm-500/70 group cursor-pointer">
          <span className="text-[10px] uppercase tracking-[0.3em] font-light mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-gold-600">
            Discover
          </span>
          <div className="w-px h-12 bg-gradient-to-b from-gold-500/50 to-transparent" />
        </div>
      </div>
    </section>
  );
}
