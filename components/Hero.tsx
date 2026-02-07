"use client";

import Link from "next/link";
import Image from "next/image";
import AmbientVideoBackground from "@/components/AmbientVideoBackground";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

// Background media URLs (use actual file: header-banner.png)
const heroBackgroundImage = "/images/header-banner.png";
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
    <section className="relative h-screen flex items-end justify-center overflow-hidden">
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
            alt="Lola Drip - Luxury Women's Fashion - Designer Dresses & Elegant Clothing"
            className="w-full h-full"
          />
        ) : (
          // Fallback to static image if no video URL provided
          <>
            <Image
              src={heroBackgroundImage}
              alt="Lola Drip - Luxury Women's Fashion - Designer Dresses & Elegant Clothing"
              fill
              priority
              fetchPriority="high"
              quality={85}
              sizes="100vw"
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
              className="object-cover object-[center_35%]"
            />
            {/* Gradient overlay: lighter at top (preserves face), darker at bottom for text */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/60 z-10" />
          </>
        )}
      </div>

      {/* Content Overlay - positioned near bottom, moved down by 100% */}
      <div className="absolute bottom-[1%] left-1/2 -translate-x-1/2 translate-y-[100%] z-20 w-full max-w-6xl px-6 lg:px-8 text-center">
        <div className="flex flex-col items-center gap-4">
          {/* Main Headline */}
          <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-inter font-light text-white/90 tracking-[0.15em] uppercase">
            MAKE YOUR LIFE LUXURIOUS
          </h1>
          {/* CTA Button */}
          <div className="pt-2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/shop"
                aria-label="Shop the new collection"
                className="group inline-flex items-center justify-center bg-transparent border-2 border-white text-white px-8 py-4 md:px-12 md:py-5 hover:bg-gold-accent hover:border-gold-accent transition-colors duration-150 ease-out text-xs md:text-sm uppercase tracking-[0.2em] font-inter font-light relative overflow-hidden active:scale-95 hover:scale-105"
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
          {/* Scroll indicator */}
          <motion.button
            onClick={scrollToContent}
            aria-label="Scroll to content"
            className="mt-8 flex flex-col items-center text-white/80 hover:text-white transition-colors duration-100 group"
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
        </div>
      </div>
    </section>
  );
}
