"use client";

import Link from "next/link";
import Image from "next/image";
import AmbientVideoBackground from "@/components/AmbientVideoBackground";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

// Background media URLs (use actual file: header.banner.png.png)
const heroBackgroundImage = "/images/header.banner.png.png";
// Optional: Add your ambient video URL here when ready
// Example: const heroVideoUrl = "/videos/hero-ambient.mp4";
const heroVideoUrl = ""; // Set this to your video URL when ready

export default function Hero() {
  const parallaxRef = useRef<HTMLDivElement>(null);

  // Parallax scrolling effect with 0.5 speed
  useEffect(() => {
    const handleScroll = () => {
      if (parallaxRef.current) {
        const scrolled = window.pageYOffset;
        const parallaxSpeed = 0.5; // As specified
        parallaxRef.current.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
      }
    };

    // Use requestAnimationFrame for smoother performance
    let ticking = false;
    const optimizedScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", optimizedScroll, { passive: true });
    return () => window.removeEventListener("scroll", optimizedScroll);
  }, []);

  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Ambient Video Background or Static Image */}
      <div 
        ref={parallaxRef}
        className="absolute inset-0 w-full h-[120%]"
      >
        {heroVideoUrl ? (
          <AmbientVideoBackground
            videoUrl={heroVideoUrl}
            fallbackImageUrl={heroBackgroundImage}
            overlayOpacity={0.5}
            playbackRate={0.75}
            alt="Luxury fashion collection"
            className="w-full h-full"
          />
        ) : (
          // Fallback to static image if no video URL provided
          <>
            <Image
              src={heroBackgroundImage}
              alt="Luxury fashion collection"
              fill
              priority
              quality={85}
              sizes="100vw"
              className="object-cover object-[center_35%]"
            />
            {/* Dark Overlay for Text Readability */}
            <div className="absolute inset-0 bg-black/30 z-10" />
          </>
        )}
      </div>

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
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              href="/shop"
              aria-label="Shop the new collection"
              className="group inline-flex items-center justify-center bg-transparent border-2 border-white text-white px-8 py-4 md:px-12 md:py-5 hover:bg-gold-accent hover:border-gold-accent transition-all duration-300 ease-in-out text-xs md:text-sm uppercase tracking-[0.2em] font-inter font-light relative overflow-hidden"
            >
              <span className="relative z-10">SHOP THE NEW COLLECTION</span>
              <motion.svg
                className="ml-3 md:ml-4 w-4 h-4 md:w-5 md:h-5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
                animate={{ x: [0, 4, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              >
                <path d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </motion.svg>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Smooth Scroll Indicator */}
      <motion.button
        onClick={scrollToContent}
        aria-label="Scroll to content"
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex flex-col items-center text-white/80 hover:text-white transition-colors duration-300 group"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <motion.span
          className="text-[10px] uppercase tracking-[0.3em] font-inter font-light mb-2"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          Scroll
        </motion.span>
        <motion.div
          className="w-px h-12 bg-gradient-to-b from-white/60 to-transparent"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        />
        <motion.svg
          className="w-5 h-5 mt-2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut", delay: 0.2 }}
        >
          <path d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </motion.svg>
      </motion.button>
    </section>
  );
}
