"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";

interface AmbientVideoBackgroundProps {
  videoUrl: string;
  fallbackImageUrl: string;
  overlayOpacity?: number; // Default: 0.5 (rgba(44, 44, 44, 0.5))
  playbackRate?: number; // Default: 0.75 for slow-motion
  alt?: string;
  className?: string;
}

/**
 * AmbientVideoBackground Component
 * 
 * Features:
 * - Auto-plays muted video on page load (desktop, fast connection only)
 * - Falls back to static image on mobile or slow connections
 * - Pauses when tab is not visible
 * - Smooth fade-in animation (1s delay)
 * - Minimal pause/play button (top-right)
 * - Connection-aware loading
 * - Performance optimized (loads after critical content)
 * 
 * Video Specifications (recommended for hero/ambient videos):
 * - Format: MP4 (H.264)
 * - Resolution: 1920x1080
 * - Duration: 20-30 seconds (loops)
 * - File Size: < 5MB
 * - Frame Rate: 24fps (cinematic)
 * - Bitrate: 1.5-2 Mbps
 * - Audio: None (remove audio track)
 * 
 * See docs/CINEMATIC_VIDEO_SPECS.md for encoding details
 */
export default function AmbientVideoBackground({
  videoUrl,
  fallbackImageUrl,
  overlayOpacity = 0.5,
  playbackRate = 0.75,
  alt = "Background video",
  className = "",
}: AmbientVideoBackgroundProps) {
  const [isVideoSupported, setIsVideoSupported] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [showVideo, setShowVideo] = useState(false);
  const [wasPlayingBeforeHidden, setWasPlayingBeforeHidden] = useState(false);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Check if device is mobile
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  // Connection speed detection
  useEffect(() => {
    const checkConnection = () => {
      // Always use image on mobile
      if (isMobile) {
        setIsVideoSupported(false);
        setShouldLoadVideo(false);
        return;
      }

      // Check connection API
      const connection = 
        (navigator as any).connection || 
        (navigator as any).mozConnection || 
        (navigator as any).webkitConnection;

      if (!connection) {
        // Assume good connection if API not available
        setIsVideoSupported(true);
        setShouldLoadVideo(true);
        return;
      }

      const effectiveType = connection.effectiveType;
      const downlink = connection.downlink || 0;

      // Only load video on fast connections
      // 4g or 3g with downlink > 1.5 Mbps
      const shouldLoad = 
        effectiveType === "4g" || 
        (effectiveType === "3g" && downlink > 1.5);

      setIsVideoSupported(shouldLoad);
      setShouldLoadVideo(shouldLoad);
    };

    checkConnection();

    // Listen for connection changes
    const connection = 
      (navigator as any).connection || 
      (navigator as any).mozConnection || 
      (navigator as any).webkitConnection;
    
    if (connection) {
      connection.addEventListener("change", checkConnection);
      return () => connection.removeEventListener("change", checkConnection);
    }
  }, [isMobile]);

  // Tab visibility API - pause when tab is hidden
  useEffect(() => {
    const handleVisibilityChange = () => {
      const hidden = document.hidden;
      setIsVisible(!hidden);

      if (videoRef.current && shouldLoadVideo) {
        if (hidden) {
          // Tab hidden - pause video
          if (!videoRef.current.paused) {
            setWasPlayingBeforeHidden(true);
            videoRef.current.pause();
            setIsPlaying(false);
          }
        } else {
          // Tab visible - resume if it was playing
          if (wasPlayingBeforeHidden && !isPaused) {
            videoRef.current.play().catch(() => {
              // Autoplay was prevented
              setIsPlaying(false);
            });
            setIsPlaying(true);
          }
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [shouldLoadVideo, wasPlayingBeforeHidden, isPaused]);

  // Intersection Observer - pause when out of viewport
  useEffect(() => {
    if (!containerRef.current || !shouldLoadVideo) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (videoRef.current) {
            if (entry.isIntersecting) {
              // In viewport - play if not paused by user
              if (!isPaused && isVideoLoaded) {
                videoRef.current.play().catch(() => {
                  setIsPlaying(false);
                });
                setIsPlaying(true);
              }
            } else {
              // Out of viewport - pause
              if (!videoRef.current.paused) {
                videoRef.current.pause();
                setIsPlaying(false);
              }
            }
          }
        });
      },
      {
        threshold: 0.1, // Trigger when 10% visible
      }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [shouldLoadVideo, isVideoLoaded, isPaused]);

  // Delayed video loading (1s after page load) - loads after critical content
  useEffect(() => {
    if (!shouldLoadVideo) return;

    const timer = setTimeout(() => {
      setShowVideo(true);
      // Start loading video after delay
      if (videoRef.current) {
        videoRef.current.load();
      }
    }, 1000); // 1 second delay

    return () => clearTimeout(timer);
  }, [shouldLoadVideo]);

  // Smooth fade-in animation
  useEffect(() => {
    if (isVideoLoaded && shouldLoadVideo) {
      // Additional delay for fade-in effect
      const fadeTimer = setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.style.opacity = "1";
        }
      }, 1500); // 1.5s total (1s initial + 0.5s fade)

      return () => clearTimeout(fadeTimer);
    }
  }, [isVideoLoaded, shouldLoadVideo]);

  // Auto-play video when loaded and visible
  useEffect(() => {
    if (
      shouldLoadVideo &&
      isVideoLoaded &&
      isVisible &&
      !isPaused &&
      videoRef.current
    ) {
      const playPromise = videoRef.current.play();
      
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
          })
          .catch(() => {
            // Autoplay was prevented (browser policy)
            setIsPlaying(false);
          });
      }
    }
  }, [shouldLoadVideo, isVideoLoaded, isVisible, isPaused]);

  // Keep playbackRate in sync when prop changes
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = playbackRate;
    }
  }, [playbackRate]);

  // Handle video loaded
  const handleVideoLoaded = () => {
    if (videoRef.current) {
      videoRef.current.playbackRate = playbackRate;
    }
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

  // Toggle pause/play
  const togglePause = () => {
    if (!videoRef.current || !shouldLoadVideo) return;

    if (isPaused) {
      // Resume
      videoRef.current.play().catch(() => {
        setIsPlaying(false);
      });
      setIsPaused(false);
      setIsPlaying(true);
    } else {
      // Pause
      videoRef.current.pause();
      setIsPaused(true);
      setIsPlaying(false);
    }
  };

  // Calculate overlay color with opacity
  const overlayColor = `rgba(44, 44, 44, ${overlayOpacity})`;

  return (
    <div ref={containerRef} className={`absolute inset-0 w-full h-full ${className}`}>
      {/* Fallback Image - Always rendered */}
      <div
        className={`absolute inset-0 transition-opacity duration-1000 ${
          shouldLoadVideo && isVideoLoaded && isPlaying && !isPaused
            ? "opacity-0"
            : "opacity-100"
        }`}
      >
        <Image
          src={fallbackImageUrl}
          alt={alt}
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
          onLoadedData={handleVideoLoaded}
          onPlay={handlePlay}
          onPause={handlePause}
          // Video format: MP4 (H.264 codec)
          type="video/mp4"
        />
      )}

      {/* Dark Overlay for Text Readability */}
      <div
        className="absolute inset-0 z-10"
        style={{ backgroundColor: overlayColor }}
      />

      {/* Pause/Play Button - Only show when video is supported and loaded */}
      {shouldLoadVideo && isVideoLoaded && (
        <button
          onClick={togglePause}
          className="absolute top-6 right-6 z-30 bg-black/40 backdrop-blur-sm rounded-full p-2.5 hover:bg-black/60 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50 min-w-[44px] min-h-[44px] flex items-center justify-center"
          aria-label={isPaused ? "Play video" : "Pause video"}
        >
          {isPaused ? (
            // Play icon
            <svg
              className="w-4 h-4 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          ) : (
            // Pause icon
            <svg
              className="w-4 h-4 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
            </svg>
          )}
        </button>
      )}
    </div>
  );
}
