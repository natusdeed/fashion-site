"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";

/**
 * OptimizedVideo Component
 * 
 * Video optimization requirements:
 * ✅ Format: MP4 (H.264) - best compatibility
 * ✅ Quality: 1080p max (desktop), 720p (mobile)
 * ✅ Length: 3-15 seconds for products, 30-60s for stories
 * ✅ Sound: Muted by default (allow unmute)
 * ✅ Loading: Lazy load (only when in viewport)
 * ✅ Fallback: Always have poster image (thumbnail)
 * ✅ Mobile: Use lighter versions (720p)
 * ✅ Autoplay: Only for ambient/background videos
 * ✅ Controls: Show for long videos (30s+), hide for short loops
 */
interface OptimizedVideoProps {
  // Video sources - MP4 (H.264) format required
  videoUrl: string; // Desktop: 1080p max (1920x1080)
  videoUrlMobile?: string; // Optional 720p version (1280x720) for mobile devices
  posterUrl: string; // Required poster/thumbnail image (always shown as fallback)
  alt: string;
  
  // Video behavior
  autoplay?: boolean; // Only for ambient/background videos
  loop?: boolean;
  muted?: boolean; // Default: true
  showControls?: boolean; // Auto-determined by duration if not specified
  duration?: number; // Video duration in seconds (for auto-controls logic)
  
  // Video type
  type?: "product" | "story" | "ambient"; // Determines default behavior
  
  // Styling
  className?: string;
  aspectRatio?: string; // e.g., "16/9", "3/4", "1/1"
  
  // Callbacks
  onPlay?: () => void;
  onPause?: () => void;
  onEnded?: () => void;
}

export default function OptimizedVideo({
  videoUrl,
  videoUrlMobile,
  posterUrl,
  alt,
  autoplay = false,
  loop = false,
  muted: initialMuted = true,
  showControls: explicitControls,
  duration,
  type = "product",
  className = "",
  aspectRatio = "16/9",
  onPlay,
  onPause,
  onEnded,
}: OptimizedVideoProps) {
  // CRITICAL RULE: Autoplay MUST be muted (no sound with autoplay)
  // This prevents browser autoplay restrictions and poor UX
  const muted = autoplay ? true : initialMuted;
  
  const [isPlaying, setIsPlaying] = useState(autoplay);
  const [isMuted, setIsMuted] = useState(muted);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInViewport, setIsInViewport] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Determine if controls should be shown
  useEffect(() => {
    if (explicitControls !== undefined) {
      setShowControls(explicitControls);
    } else if (duration !== undefined) {
      // Show controls for videos 30s or longer
      setShowControls(duration >= 30);
    } else if (type === "story") {
      // Stories are typically 30-60s, show controls
      setShowControls(true);
    } else {
      // Products are typically 3-15s, hide controls
      setShowControls(false);
    }
  }, [explicitControls, duration, type]);

  // Detect mobile device with responsive detection
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    if (typeof window !== "undefined") {
      checkMobile();
      window.addEventListener("resize", checkMobile);
      return () => window.removeEventListener("resize", checkMobile);
    }
  }, []);
  
  const finalVideoUrl = isMobile && videoUrlMobile ? videoUrlMobile : videoUrl;

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInViewport(true);
            // Only load video when in viewport
            if (videoRef.current && !isLoaded) {
              videoRef.current.load();
              setIsLoaded(true);
            }
          }
        });
      },
      {
        rootMargin: "50px", // Start loading slightly before entering viewport
        threshold: 0.1,
      }
    );

    observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
    };
  }, [isLoaded, finalVideoUrl]);

  // Handle autoplay for ambient videos
  useEffect(() => {
    if (autoplay && isInViewport && videoRef.current && isLoaded) {
      videoRef.current
        .play()
        .catch(() => {
          // Autoplay was prevented (browser policy)
          setIsPlaying(false);
        });
    }
  }, [autoplay, isInViewport, isLoaded]);

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
      onPlay?.();
    }
  };

  const handlePause = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
      onPause?.();
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVideoEnded = () => {
    setIsPlaying(false);
    onEnded?.();
  };

  const handleVideoClick = () => {
    if (isPlaying) {
      handlePause();
    } else {
      handlePlay();
    }
  };

  // Calculate aspect ratio style
  const aspectRatioStyle = aspectRatio.includes("/")
    ? { aspectRatio: aspectRatio }
    : {};

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-hidden ${className}`}
      style={aspectRatioStyle}
    >
      {/* Poster Image - Always shown as fallback */}
      <div
        className={`absolute inset-0 transition-opacity duration-500 ${
          isPlaying ? "opacity-0" : "opacity-100"
        }`}
      >
        <Image
          src={posterUrl}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={true}
          loading="eager"
        />
      </div>

      {/* Video Element */}
      {isInViewport && (
        <video
          ref={videoRef}
          src={finalVideoUrl}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
            isPlaying ? "opacity-100" : "opacity-0"
          }`}
          muted={isMuted}
          loop={loop}
          playsInline
          preload="none" // Lazy load - only load when in viewport
          controls={showControls}
          onEnded={handleVideoEnded}
          onPlay={() => {
            setIsPlaying(true);
            onPlay?.();
          }}
          onPause={() => {
            setIsPlaying(false);
            onPause?.();
          }}
        />
      )}

      {/* Custom Controls Overlay (only for short videos without native controls) */}
      {!showControls && (
        <div
          className="absolute inset-0 flex items-center justify-center bg-black/0 hover:bg-black/10 transition-colors duration-300 cursor-pointer z-10"
          onClick={handleVideoClick}
          aria-label={isPlaying ? "Pause video" : "Play video"}
        >
          {/* Play/Pause Button */}
          <div
            className={`bg-black/60 backdrop-blur-sm rounded-full p-4 transition-all duration-300 ${
              isPlaying ? "opacity-0 scale-90" : "opacity-100 scale-100"
            }`}
          >
            {isPlaying ? (
              <svg
                className="w-8 h-8 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
              </svg>
            ) : (
              <svg
                className="w-8 h-8 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </div>
        </div>
      )}

      {/* Mute/Unmute Button (always visible, allows user control) */}
      <button
        onClick={toggleMute}
        className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-sm rounded-full p-2 z-20 transition-all duration-300 hover:bg-black/80 focus:outline-none focus:ring-2 focus:ring-white/50"
        aria-label={isMuted ? "Unmute video" : "Mute video"}
      >
        {isMuted ? (
          <svg
            className="w-5 h-5 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"
            />
          </svg>
        ) : (
          <svg
            className="w-5 h-5 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
            />
          </svg>
        )}
      </button>

      {/* Loading Indicator */}
      {!isLoaded && isInViewport && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 z-10">
          <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
}
