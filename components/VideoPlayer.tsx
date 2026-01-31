"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";

// Vendor-prefixed Fullscreen API (not in all TS lib.dom versions)
interface FullscreenElement extends HTMLElement {
  webkitRequestFullscreen?: () => Promise<void>;
  mozRequestFullScreen?: () => Promise<void>;
  msRequestFullscreen?: () => Promise<void>;
}
interface FullscreenDocument extends Document {
  webkitFullscreenElement?: Element | null;
  webkitExitFullscreen?: () => Promise<void>;
  mozFullScreenElement?: Element | null;
  mozCancelFullScreen?: () => Promise<void>;
  msFullscreenElement?: Element | null;
  msExitFullscreen?: () => Promise<void>;
}

interface VideoPlayerProps {
  src: string;
  poster: string;
  autoplay?: boolean;
  muted?: boolean;
  loop?: boolean;
  controls?: boolean; // Show/hide custom controls
  className?: string;
  onPlay?: () => void;
  onPause?: () => void;
  onEnded?: () => void;
}

/**
 * Luxury Video Player Component
 * 
 * Features:
 * - Elegant custom controls (not browser default)
 * - Large center play button
 * - Bottom control bar (fade in on hover)
 * - Keyboard controls (space, arrows)
 * - Auto-hide controls after 3s
 * - Touch gestures (double-tap to skip)
 * - Loading spinner during buffering
 * - Error handling
 * - Fully accessible
 */
export default function VideoPlayer({
  src,
  poster,
  autoplay = false,
  muted: initialMuted = false,
  loop = false,
  controls = true,
  className = "",
  onPlay,
  onPause,
  onEnded,
}: VideoPlayerProps) {
  // CRITICAL RULE: Autoplay MUST be muted (no sound with autoplay)
  // This prevents browser autoplay restrictions and poor UX
  const muted = autoplay ? true : initialMuted;

  // State management
  const [isPlaying, setIsPlaying] = useState(autoplay);
  const [isMuted, setIsMuted] = useState(muted);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isBuffering, setIsBuffering] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [showPoster, setShowPoster] = useState(true);
  const [isHovering, setIsHovering] = useState(false);

  // Refs
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastTapTimeRef = useRef<number>(0);

  // Format time helper
  const formatTime = (seconds: number): string => {
    if (isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // Calculate progress percentage
  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

  // Auto-hide controls after 3s of inactivity
  const resetControlsTimeout = useCallback(() => {
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }

    // Always show controls on mobile
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      setShowControls(true);
      return;
    }

    setShowControls(true);
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) {
        setShowControls(false);
      }
    }, 3000);
  }, [isPlaying]);

  // Play/Pause toggle
  const togglePlayPause = useCallback(() => {
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
      onPause?.();
    } else {
      videoRef.current.play().catch((error) => {
        console.error("Error playing video:", error);
        setHasError(true);
      });
      setIsPlaying(true);
      setShowPoster(false);
      onPlay?.();
    }
    resetControlsTimeout();
  }, [isPlaying, onPlay, onPause, resetControlsTimeout]);

  // Mute/Unmute toggle
  const toggleMute = useCallback(() => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
    resetControlsTimeout();
  }, [isMuted, resetControlsTimeout]);

  // Seek to specific time
  const seekTo = useCallback((time: number) => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = time;
    setCurrentTime(time);
    resetControlsTimeout();
  }, [resetControlsTimeout]);

  // Handle progress bar click
  const handleProgressClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!progressRef.current || !videoRef.current) return;

      const rect = progressRef.current.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const percentage = clickX / rect.width;
      const newTime = percentage * duration;

      seekTo(newTime);
    },
    [duration, seekTo]
  );

  // Fullscreen toggle
  const toggleFullscreen = useCallback(() => {
    if (!containerRef.current) return;

    const el = containerRef.current as FullscreenElement;
    if (!isFullscreen) {
      if (el.requestFullscreen) {
        el.requestFullscreen();
      } else if (el.webkitRequestFullscreen) {
        el.webkitRequestFullscreen();
      } else if (el.mozRequestFullScreen) {
        el.mozRequestFullScreen();
      } else if (el.msRequestFullscreen) {
        el.msRequestFullscreen();
      }
    } else {
      const doc = document as FullscreenDocument;
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (doc.webkitExitFullscreen) {
        doc.webkitExitFullscreen();
      } else if (doc.mozCancelFullScreen) {
        doc.mozCancelFullScreen();
      } else if (doc.msExitFullscreen) {
        doc.msExitFullscreen();
      }
    }
    resetControlsTimeout();
  }, [isFullscreen, resetControlsTimeout]);

  // Skip forward/backward
  const skip = useCallback(
    (seconds: number) => {
      if (!videoRef.current) return;
      const newTime = Math.max(
        0,
        Math.min(duration, currentTime + seconds)
      );
      seekTo(newTime);
    },
    [currentTime, duration, seekTo]
  );

  // Adjust volume
  const adjustVolume = useCallback(
    (delta: number) => {
      if (!videoRef.current) return;
      const newVolume = Math.max(
        0,
        Math.min(1, (videoRef.current.volume || 0) + delta)
      );
      videoRef.current.volume = newVolume;
      if (newVolume === 0) {
        setIsMuted(true);
        videoRef.current.muted = true;
      } else if (isMuted) {
        setIsMuted(false);
        videoRef.current.muted = false;
      }
      resetControlsTimeout();
    },
    [isMuted, resetControlsTimeout]
  );

  // Keyboard controls
  useEffect(() => {
    // Only add keyboard listeners on client side
    if (typeof window === 'undefined') return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't handle if user is typing in an input
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      switch (e.key) {
        case " ":
        case "k":
          e.preventDefault();
          togglePlayPause();
          break;
        case "ArrowLeft":
          e.preventDefault();
          skip(-10);
          break;
        case "ArrowRight":
          e.preventDefault();
          skip(10);
          break;
        case "ArrowUp":
          e.preventDefault();
          adjustVolume(0.1);
          break;
        case "ArrowDown":
          e.preventDefault();
          adjustVolume(-0.1);
          break;
        case "f":
        case "F":
          e.preventDefault();
          toggleFullscreen();
          break;
        case "m":
        case "M":
          e.preventDefault();
          toggleMute();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [togglePlayPause, skip, adjustVolume, toggleFullscreen, toggleMute]);

  // Double-tap gesture handler (mobile)
  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      const currentTime = Date.now();
      const tapLength = currentTime - lastTapTimeRef.current;

      // Don't handle if touching controls
      if (
        (e.target as HTMLElement).closest(".video-controls") ||
        (e.target as HTMLElement).closest(".center-play-button")
      ) {
        return;
      }

      if (tapLength < 300 && tapLength > 0) {
        // Double tap detected - skip video
        e.preventDefault();
        e.stopPropagation();
        
        const rect = containerRef.current?.getBoundingClientRect();
        if (rect) {
          const tapX = e.changedTouches[0]?.clientX;
          if (tapX) {
            const videoWidth = rect.width;
            const tapPosition = tapX - rect.left;

            // Left half: skip backward, Right half: skip forward
            if (tapPosition < videoWidth / 2) {
              skip(-10);
            } else {
              skip(10);
            }
          }
        }
        lastTapTimeRef.current = 0; // Reset to prevent triple tap
      } else {
        // Single tap - will be handled by onClick after delay check
        lastTapTimeRef.current = currentTime;
      }
    },
    [skip]
  );

  // Video event handlers
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
    };

    const handleDurationChange = () => {
      setDuration(video.duration);
    };

    const handlePlay = () => {
      setIsPlaying(true);
      setShowPoster(false);
      onPlay?.();
    };

    const handlePause = () => {
      setIsPlaying(false);
      onPause?.();
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setShowPoster(true);
      onEnded?.();
    };

    const handleWaiting = () => {
      setIsBuffering(true);
    };

    const handleCanPlay = () => {
      setIsBuffering(false);
    };

    const handleError = () => {
      setHasError(true);
      setIsBuffering(false);
    };

    const handleLoadedMetadata = () => {
      setDuration(video.duration);
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("durationchange", handleDurationChange);
    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);
    video.addEventListener("ended", handleEnded);
    video.addEventListener("waiting", handleWaiting);
    video.addEventListener("canplay", handleCanPlay);
    video.addEventListener("error", handleError);
    video.addEventListener("loadedmetadata", handleLoadedMetadata);

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("durationchange", handleDurationChange);
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
      video.removeEventListener("ended", handleEnded);
      video.removeEventListener("waiting", handleWaiting);
      video.removeEventListener("canplay", handleCanPlay);
      video.removeEventListener("error", handleError);
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, [onPlay, onPause, onEnded]);

  // Fullscreen change handler
  useEffect(() => {
    // Only add fullscreen listeners on client side
    if (typeof document === 'undefined') return;

    const handleFullscreenChange = () => {
      const doc = document as FullscreenDocument;
      const isFull =
        document.fullscreenElement ||
        doc.webkitFullscreenElement ||
        doc.mozFullScreenElement ||
        doc.msFullscreenElement;

      setIsFullscreen(!!isFull);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    document.addEventListener("mozfullscreenchange", handleFullscreenChange);
    document.addEventListener("MSFullscreenChange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener(
        "webkitfullscreenchange",
        handleFullscreenChange
      );
      document.removeEventListener("mozfullscreenchange", handleFullscreenChange);
      document.removeEventListener("MSFullscreenChange", handleFullscreenChange);
    };
  }, []);

  // Initialize controls timeout
  useEffect(() => {
    if (isPlaying) {
      resetControlsTimeout();
    }
    return () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, [isPlaying, resetControlsTimeout]);

  // Handle autoplay on mount
  useEffect(() => {
    if (autoplay && videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.error("Autoplay prevented:", error);
        setHasError(false); // Don't show error for autoplay prevention
      });
    }
  }, [autoplay]);

  // Handle container click (play/pause)
  const handleContainerClick = useCallback(
    (e: React.MouseEvent) => {
      // Don't trigger if clicking on controls
      if (
        (e.target as HTMLElement).closest(".video-controls") ||
        (e.target as HTMLElement).closest(".center-play-button")
      ) {
        return;
      }
      togglePlayPause();
    },
    [togglePlayPause]
  );

  // Handle mouse movement (show controls)
  const handleMouseMove = useCallback(() => {
    resetControlsTimeout();
  }, [resetControlsTimeout]);

  if (hasError) {
    return (
      <div
        className={`relative w-full aspect-video bg-black/80 flex items-center justify-center ${className}`}
      >
        <div className="text-center text-white p-6">
          <p className="text-lg mb-2">Unable to load video</p>
          <p className="text-sm text-white/70">
            Please check your connection and try again.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`relative w-full aspect-video bg-black overflow-hidden group ${className}`}
      onMouseEnter={() => {
        if (typeof window !== 'undefined') setIsHovering(true);
      }}
      onMouseLeave={() => {
        if (typeof window !== 'undefined') setIsHovering(false);
      }}
      onMouseMove={handleMouseMove}
      onClick={(e) => {
        // On mobile, delay click to check for double-tap
        if (typeof window !== 'undefined' && window.innerWidth < 768) {
          setTimeout(() => {
            if (Date.now() - lastTapTimeRef.current > 300) {
              handleContainerClick(e);
            }
          }, 300);
        } else {
          handleContainerClick(e);
        }
      }}
      onTouchEnd={handleTouchEnd}
    >
      {/* Video Element */}
      <video
        ref={videoRef}
        src={src}
        className="w-full h-full object-cover"
        poster={poster}
        muted={isMuted}
        loop={loop}
        playsInline
        preload="metadata"
        aria-label="Video player"
      />

      {/* Poster Image */}
      {showPoster && (
        <div className="absolute inset-0 z-10">
          <Image
            src={poster}
            alt="Lola Drip - Luxury Fashion Video"
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
          />
        </div>
      )}

      {/* Loading Spinner */}
      {isBuffering && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/40">
          <div className="w-12 h-12 border-2 border-gold-500/30 border-t-gold-500 rounded-full animate-spin" />
        </div>
      )}

      {/* Custom Controls Overlay */}
      {controls && (
        <>
          {/* Center Play Button (appears on pause/hover) */}
          {(!isPlaying || isHovering) && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                togglePlayPause();
              }}
              className="center-play-button absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30 w-20 h-20 bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 hover:bg-black/80 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-gold-500/50 min-w-[80px] min-h-[80px]"
              aria-label={isPlaying ? "Pause video" : "Play video"}
            >
              {isPlaying ? (
                <svg
                  className="w-10 h-10 text-gold-500"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                </svg>
              ) : (
                <svg
                  className="w-10 h-10 text-gold-500 ml-1"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>
          )}

          {/* Bottom Control Bar */}
          <div
            className={`video-controls absolute bottom-0 left-0 right-0 z-30 transition-opacity duration-300 ${
              showControls || isHovering ? "opacity-100" : "opacity-0"
            }`}
            onMouseEnter={resetControlsTimeout}
          >
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/60 to-transparent pointer-events-none" />

            {/* Control Bar Content */}
            <div className="relative px-4 py-3 md:px-6 md:py-4">
              {/* Progress Bar */}
              <div
                ref={progressRef}
                className="mb-3 h-1.5 bg-white/20 rounded-full cursor-pointer hover:h-2 transition-all duration-200 relative group"
                onClick={handleProgressClick}
                role="progressbar"
                aria-valuenow={currentTime}
                aria-valuemin={0}
                aria-valuemax={duration}
                aria-label="Video progress"
              >
                {/* Progress Fill */}
                <div
                  className="absolute left-0 top-0 h-full bg-gold-500 rounded-full transition-all duration-200"
                  style={{ width: `${progressPercentage}%` }}
                />
                {/* Progress Hover Indicator */}
                <div className="absolute left-0 top-0 h-full bg-gold-500/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
              </div>

              {/* Control Buttons Row */}
              <div className="flex items-center justify-between gap-4">
                {/* Left Side: Play/Pause, Mute, Time */}
                <div className="flex items-center gap-3 md:gap-4">
                  {/* Play/Pause Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      togglePlayPause();
                    }}
                    className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center text-white hover:text-gold-500 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-gold-500/50 rounded-full min-w-[44px] min-h-[44px]"
                    aria-label={isPlaying ? "Pause" : "Play"}
                  >
                    {isPlaying ? (
                      <svg
                        className="w-6 h-6 md:w-7 md:h-7"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                      </svg>
                    ) : (
                      <svg
                        className="w-6 h-6 md:w-7 md:h-7 ml-0.5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    )}
                  </button>

                  {/* Mute/Unmute Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleMute();
                    }}
                    className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center text-white hover:text-gold-500 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-gold-500/50 rounded-full min-w-[44px] min-h-[44px]"
                    aria-label={isMuted ? "Unmute" : "Mute"}
                  >
                    {isMuted ? (
                      <svg
                        className="w-5 h-5 md:w-6 md:h-6"
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
                        className="w-5 h-5 md:w-6 md:h-6"
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

                  {/* Time Display */}
                  <div className="text-white text-xs md:text-sm font-light tabular-nums select-none">
                    <span>{formatTime(currentTime)}</span>
                    <span className="text-white/60"> / </span>
                    <span className="text-white/60">{formatTime(duration)}</span>
                  </div>
                </div>

                {/* Right Side: Fullscreen */}
                <div className="flex items-center">
                  {/* Fullscreen Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFullscreen();
                    }}
                    className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center text-white hover:text-gold-500 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-gold-500/50 rounded-full min-w-[44px] min-h-[44px]"
                    aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
                  >
                    {isFullscreen ? (
                      <svg
                        className="w-5 h-5 md:w-6 md:h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="w-5 h-5 md:w-6 md:h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                        />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
