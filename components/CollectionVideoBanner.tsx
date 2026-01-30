"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

// Network Information API (vendor-prefixed in some browsers)
interface NavigatorWithConnection extends Navigator {
  connection?: { effectiveType?: string; downlink?: number; addEventListener: (type: string, fn: () => void) => void; removeEventListener: (type: string, fn: () => void) => void };
  mozConnection?: { effectiveType?: string; downlink?: number; addEventListener: (type: string, fn: () => void) => void; removeEventListener: (type: string, fn: () => void) => void };
  webkitConnection?: { effectiveType?: string; downlink?: number; addEventListener: (type: string, fn: () => void) => void; removeEventListener: (type: string, fn: () => void) => void };
}

interface CollectionVideoBannerProps {
  // Media
  videoUrl?: string; // Optional video URL
  imageUrl: string; // Required fallback image
  posterUrl?: string; // Optional poster image for video (uses imageUrl if not provided)
  
  // Content
  collectionName: string;
  description?: string;
  ctaLink: string;
  ctaText?: string; // Defaults to "Shop Collection"
  
  // Optional customization
  overlayOpacity?: number; // Default: 0.6
  parallaxSpeed?: number; // Default: 0.5
}

/**
 * CollectionVideoBanner Component
 * 
 * Features:
 * - Optional video header with autoplay, muted, loop
 * - Full-width banner: 400px desktop, 250px mobile
 * - Parallax effect on scroll (video moves slower than page)
 * - Lazy loading (only when section in viewport)
 * - Pauses when scrolled past
 * - Mobile: uses poster image instead of video
 * - Dark overlay gradient for text readability
 * - Elegant serif font (Playfair) for text
 * - Gold CTA button with hover effect
 * - Smooth fade-in animation on load
 * - Fallback to static image if no video provided
 * 
 * Video Specifications (when using videoUrl):
 * - Format: MP4 (H.264)
 * - Resolution: 1080x1350 (portrait) or 1920x1080 (landscape)
 * - Duration: 5-10 seconds
 * - File Size: < 2MB per video
 * - Frame Rate: 30fps
 * - Bitrate: 2-3 Mbps
 * - Audio: Optional (muted by default)
 * 
 * Usage Example:
 * ```tsx
 * // With video
 * <CollectionVideoBanner
 *   videoUrl="/videos/evening-wear-collection.mp4"
 *   imageUrl="https://example.com/evening-wear-poster.jpg"
 *   collectionName="Evening Wear Collection"
 *   description="Elegant evening pieces for your special moments"
 *   ctaLink="/shop?category=evening-wear"
 *   ctaText="Shop Evening Wear"
 * />
 * 
 * // Without video (image only)
 * <CollectionVideoBanner
 *   imageUrl="https://example.com/collection-banner.jpg"
 *   collectionName="Evening Wear Collection"
 *   description="Elegant evening pieces for your special moments"
 *   ctaLink="/shop?category=evening-wear"
 * />
 * ```
 */
export default function CollectionVideoBanner({
  videoUrl,
  imageUrl,
  posterUrl,
  collectionName,
  description,
  ctaLink,
  ctaText = "Shop Collection",
  overlayOpacity = 0.6,
  parallaxSpeed = 0.5,
}: CollectionVideoBannerProps) {
  const [isVideoSupported, setIsVideoSupported] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [showVideo, setShowVideo] = useState(false);
  const [isInViewport, setIsInViewport] = useState(false);
  const [wasPlayingBeforeHidden, setWasPlayingBeforeHidden] = useState(false);
  const [isFadedIn, setIsFadedIn] = useState(false);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);

  // Check if device is mobile
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  // Connection speed detection and mobile check
  useEffect(() => {
    const checkConnection = () => {
      // Always use image on mobile
      if (isMobile) {
        setIsVideoSupported(false);
        setShouldLoadVideo(false);
        return;
      }

      // Check connection API
      const nav = navigator as NavigatorWithConnection;
      const connection = nav.connection || nav.mozConnection || nav.webkitConnection;

      if (!connection) {
        // Assume good connection if API not available
        setIsVideoSupported(true);
        setShouldLoadVideo(!!videoUrl);
        return;
      }

      const effectiveType = connection.effectiveType;
      const downlink = connection.downlink || 0;

      // Only load video on fast connections
      const shouldLoad = 
        effectiveType === "4g" || 
        (effectiveType === "3g" && downlink > 1.5);

      setIsVideoSupported(shouldLoad);
      setShouldLoadVideo(shouldLoad && !!videoUrl);
    };

    checkConnection();

    // Listen for connection changes
    const nav = navigator as NavigatorWithConnection;
    const connection = nav.connection || nav.mozConnection || nav.webkitConnection;

    if (connection) {
      connection.addEventListener("change", checkConnection);
      return () => connection.removeEventListener("change", checkConnection);
    }
  }, [isMobile, videoUrl]);

  // Tab visibility API - pause when tab is hidden
  useEffect(() => {
    const handleVisibilityChange = () => {
      const hidden = document.hidden;
      setIsVisible(!hidden);

      if (videoRef.current && shouldLoadVideo) {
        if (hidden) {
          if (!videoRef.current.paused) {
            setWasPlayingBeforeHidden(true);
            videoRef.current.pause();
            setIsPlaying(false);
          }
        } else {
          if (wasPlayingBeforeHidden && !isPaused && isInViewport) {
            videoRef.current.play().catch(() => {
              setIsPlaying(false);
            });
            setIsPlaying(true);
          }
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [shouldLoadVideo, wasPlayingBeforeHidden, isPaused, isInViewport]);

  // Intersection Observer - lazy load and pause when out of viewport
  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInViewport(true);
            // Start loading video when in viewport
            if (shouldLoadVideo && !showVideo) {
              setShowVideo(true);
              if (videoRef.current) {
                videoRef.current.load();
              }
            }
            // Play if not paused by user
            if (videoRef.current && !isPaused && isVideoLoaded) {
              videoRef.current.play().catch(() => {
                setIsPlaying(false);
              });
              setIsPlaying(true);
            }
          } else {
            setIsInViewport(false);
            // Pause when out of viewport
            if (videoRef.current && !videoRef.current.paused) {
              videoRef.current.pause();
              setIsPlaying(false);
            }
          }
        });
      },
      {
        threshold: 0.1, // Trigger when 10% visible
        rootMargin: "50px", // Start loading slightly before entering viewport
      }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [shouldLoadVideo, isVideoLoaded, isPaused, showVideo]);

  // Parallax scrolling effect
  useEffect(() => {
    const handleScroll = () => {
      if (parallaxRef.current) {
        const scrolled = window.pageYOffset;
        parallaxRef.current.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
      }
    };

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
  }, [parallaxSpeed]);

  // Smooth fade-in animation on load
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsFadedIn(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  // Auto-play video when loaded and visible
  useEffect(() => {
    if (
      shouldLoadVideo &&
      isVideoLoaded &&
      isVisible &&
      !isPaused &&
      isInViewport &&
      videoRef.current
    ) {
      const playPromise = videoRef.current.play();
      
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
          })
          .catch(() => {
            setIsPlaying(false);
          });
      }
    }
  }, [shouldLoadVideo, isVideoLoaded, isVisible, isPaused, isInViewport]);

  // Handle video loaded
  const handleVideoLoaded = () => {
    setIsVideoLoaded(true);
  };

  // Handle video play
  const handlePlay = () => {
    setIsPlaying(true);
  };

  // Handle video pause
  const handlePause = () => {
    setIsPlaying(false);
  };

  // Calculate overlay color with opacity
  const overlayColor = `rgba(0, 0, 0, ${overlayOpacity})`;

  // Use poster image if provided, otherwise use imageUrl
  const finalPosterUrl = posterUrl || imageUrl;

  return (
    <section
      ref={containerRef}
      className={`relative w-full h-[250px] md:h-[400px] flex items-center justify-center overflow-hidden transition-opacity duration-1000 ${
        isFadedIn ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Background Media Container with Parallax */}
      <div 
        ref={parallaxRef}
        className="absolute inset-0 w-full h-[120%]"
      >
        {/* Fallback Image - Always rendered */}
        <div
          className={`absolute inset-0 transition-opacity duration-1000 ${
            shouldLoadVideo && isVideoLoaded && isPlaying && !isPaused
              ? "opacity-0"
              : "opacity-100"
          }`}
        >
          <Image
            src={imageUrl}
            alt={collectionName}
            fill
            priority
            quality={90}
            sizes="100vw"
            className="object-cover"
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQADAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
          />
        </div>

        {/* Video Element - Only on desktop with fast connection */}
        {/* 
          Video Specs: MP4 (H.264), 1080x1350 or 1920x1080, 5-10s, <2MB, 30fps, 2-3Mbps
          See docs/COLLECTION_VIDEO_SPECS.md for encoding details
        */}
        {shouldLoadVideo && showVideo && (
          <video
            ref={videoRef}
            src={videoUrl}
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1500"
            style={{
              opacity: isVideoLoaded && isPlaying && !isPaused ? 1 : 0,
              zIndex: 0,
            }}
            muted
            loop
            playsInline
            preload="none"
            poster={finalPosterUrl}
            onLoadedData={handleVideoLoaded}
            onPlay={handlePlay}
            onPause={handlePause}
          />
        )}
      </div>

      {/* Dark Overlay Gradient for Text Readability */}
      <div
        className="absolute inset-0 z-10 bg-gradient-to-b from-black/60 via-black/50 to-black/60"
        style={{ backgroundColor: overlayColor }}
      />

      {/* Content Overlay */}
      <div className="relative z-20 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isFadedIn ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Collection Name */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-playfair text-white mb-3 md:mb-4 tracking-wide font-normal">
            {collectionName}
          </h2>

          {/* Description */}
          {description && (
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/90 mb-6 md:mb-8 max-w-2xl mx-auto font-light tracking-wide">
              {description}
            </p>
          )}

          {/* CTA Button */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              href={ctaLink}
              aria-label={`${ctaText} - ${collectionName}`}
              className="group inline-flex items-center justify-center bg-gold-500 text-warm-900 px-6 py-3 md:px-8 md:py-4 hover:bg-gold-400 transition-all duration-300 ease-in-out text-xs md:text-sm uppercase tracking-[0.2em] font-light rounded-sm shadow-lg hover:shadow-xl hover:shadow-gold-500/20 min-h-[44px]"
            >
              <span className="relative z-10">{ctaText}</span>
              <motion.svg
                className="ml-3 w-4 h-4"
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
        </motion.div>
      </div>
    </section>
  );
}
