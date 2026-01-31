"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

// Product data with free images and videos
// Using reliable video sources that work across browsers
const products = [
  {
    id: 1,
    name: "Elegant Evening Dress",
    price: 299,
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&q=80",
    video: "https://videos.pexels.com/video-files/3045163/3045163-hd_1920_1080_25fps.mp4",
  },
  {
    id: 2,
    name: "Luxury Silk Blouse",
    price: 189,
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80",
    video: "https://videos.pexels.com/video-files/3044083/3044083-hd_1920_1080_25fps.mp4",
  },
  {
    id: 3,
    name: "Designer Trench Coat",
    price: 449,
    image: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800&q=80",
    video: "https://videos.pexels.com/video-files/3045163/3045163-hd_1920_1080_25fps.mp4",
  },
  {
    id: 4,
    name: "Classic Black Dress",
    price: 249,
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80",
    video: "https://videos.pexels.com/video-files/3044083/3044083-hd_1920_1080_25fps.mp4",
  },
  {
    id: 5,
    name: "Elegant White Gown",
    price: 399,
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80",
    video: "https://videos.pexels.com/video-files/3045163/3045163-hd_1920_1080_25fps.mp4",
  },
  {
    id: 6,
    name: "Stylish Blazer",
    price: 329,
    image: "https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=800&q=80",
    video: "https://videos.pexels.com/video-files/3044083/3044083-hd_1920_1080_25fps.mp4",
  },
];

export default function VideoDemoPage() {
  return (
    <div className="min-h-screen bg-warm-50">
      {/* Page Header */}
      <div className="bg-white border-b border-warm-200 py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-semibold text-warm-900 mb-4 tracking-tight">
            Product Video Demo
          </h1>
          <p className="text-warm-600 text-lg font-light tracking-wide">
            Hover over products to see videos play
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16 space-y-24">
        {/* Product Grid */}
        <section className="space-y-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-serif font-semibold text-warm-900 mb-3 tracking-tight">
              Product Collection
            </h2>
            <p className="text-warm-600 font-light max-w-2xl mx-auto">
              Hover over any product card to see the video play automatically
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <ProductCardWithHover
                key={product.id}
                product={product}
                index={index}
              />
            ))}
          </div>
        </section>

        {/* Custom Video Player */}
        <section className="space-y-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-serif font-semibold text-warm-900 mb-3 tracking-tight">
              Custom Video Player
            </h2>
            <p className="text-warm-600 font-light max-w-2xl mx-auto">
              Full-featured player with play/pause, mute/unmute, and progress controls
            </p>
          </div>

          <div className="flex justify-center">
            <CustomVideoPlayer />
          </div>
        </section>
      </div>
    </div>
  );
}

// Product Card with Hover Video
function ProductCardWithHover({ 
  product, 
  index 
}: { 
  product: typeof products[0];
  index: number;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Load video metadata when component mounts
  useEffect(() => {
    if (!videoRef.current) return;
    
    const video = videoRef.current;
    
    const handleLoadedData = () => {
      setIsVideoLoaded(true);
    };

    const handlePlay = () => {
      setIsVideoPlaying(true);
    };

    const handlePause = () => {
      setIsVideoPlaying(false);
    };

    const handleError = (e: Event) => {
      console.error('Video error:', e);
      setIsVideoPlaying(false);
      setIsVideoLoaded(false);
    };

    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('error', handleError);

    // Preload metadata
    video.load();

    return () => {
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('error', handleError);
    };
  }, []);

  useEffect(() => {
    if (!videoRef.current) return;

    if (isHovered) {
      // Try to play the video
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsVideoPlaying(true);
          })
          .catch((error) => {
            console.error('Video play error:', error);
            setIsVideoPlaying(false);
          });
      }
    } else {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      setIsVideoPlaying(false);
    }
  }, [isHovered]);

  return (
    <motion.div
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      {/* Image/Video Container */}
      <div className="relative aspect-[3/4] bg-gradient-to-br from-warm-50 to-warm-100 overflow-hidden mb-4 rounded-sm">
        {/* Static Image */}
        <div
          className={`absolute inset-0 transition-opacity duration-300 ${
            isHovered ? "opacity-0" : "opacity-100"
          }`}
        >
          <Image
            src={product.image}
            alt={`${product.name} - Lola Drip`}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        {/* Video */}
        <video
          ref={videoRef}
          src={product.video}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
            isHovered ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
          muted
          loop
          playsInline
          preload="auto"
          onLoadedData={() => setIsVideoLoaded(true)}
          onError={(e) => {
            console.error('Video load error:', e);
            setIsVideoLoaded(false);
          }}
        />

        {/* Video Icon Badge - Gold, Bottom Right */}
        <div className="absolute bottom-3 right-3 z-20 bg-[#D4AF37] rounded-full p-2 shadow-lg">
          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>

      {/* Product Info */}
      <div className="space-y-2 text-center">
        <h3 className="text-warm-900 font-serif text-lg font-normal tracking-tight group-hover:text-[#D4AF37] transition-colors duration-300">
          {product.name}
        </h3>
        <p className="text-warm-700 text-base font-light tracking-wide">
          ${product.price.toLocaleString()}
        </p>
      </div>
    </motion.div>
  );
}

// Custom Video Player
function CustomVideoPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  const videoUrl = "https://videos.pexels.com/video-files/3045163/3045163-hd_1920_1080_25fps.mp4";

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateProgress = () => {
      if (video.duration) {
        setProgress((video.currentTime / video.duration) * 100);
      }
    };

    const updateDuration = () => {
      setDuration(video.duration);
    };

    video.addEventListener("timeupdate", updateProgress);
    video.addEventListener("loadedmetadata", updateDuration);

    return () => {
      video.removeEventListener("timeupdate", updateProgress);
      video.removeEventListener("loadedmetadata", updateDuration);
    };
  }, []);

  const togglePlayPause = () => {
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().catch(() => {
        setIsPlaying(false);
      });
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!videoRef.current || !progressRef.current) return;

    const rect = progressRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const percentage = clickX / width;

    videoRef.current.currentTime = percentage * duration;
    setProgress(percentage * 100);
  };

  const formatTime = (seconds: number) => {
    if (!seconds || !isFinite(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <motion.div
      className="w-full max-w-2xl bg-white rounded-sm shadow-sm border border-warm-200 overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      {/* Video Container */}
      <div className="relative aspect-video bg-warm-900">
        <video
          ref={videoRef}
          src={videoUrl}
          className="w-full h-full object-cover"
          muted={isMuted}
          loop
          playsInline
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        />

        {/* Controls Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent">
          {/* Top Controls */}
          <div className="absolute top-4 right-4 flex gap-3">
            {/* Mute/Unmute Button */}
            <button
              onClick={toggleMute}
              className="bg-white/90 backdrop-blur-sm rounded-full p-3 hover:bg-white transition-all duration-300 shadow-lg min-h-[44px] min-w-[44px] flex items-center justify-center group"
              aria-label={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? (
                <svg className="w-5 h-5 text-warm-900 group-hover:text-[#D4AF37] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-warm-900 group-hover:text-[#D4AF37] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                </svg>
              )}
            </button>
          </div>

          {/* Bottom Controls */}
          <div className="absolute bottom-0 left-0 right-0 p-4">
            {/* Progress Bar */}
            <div
              ref={progressRef}
              onClick={handleProgressClick}
              className="relative h-1 bg-white/20 rounded-full mb-4 cursor-pointer group"
            >
              <div
                className="absolute left-0 top-0 h-full bg-[#D4AF37] rounded-full transition-all duration-150"
                style={{ width: `${progress}%` }}
              >
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-[#D4AF37] rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>

            {/* Control Buttons */}
            <div className="flex items-center justify-between">
              {/* Play/Pause Button */}
              <button
                onClick={togglePlayPause}
                className="bg-[#D4AF37] rounded-full p-3 hover:bg-[#B8941F] transition-colors duration-300 shadow-lg min-h-[44px] min-w-[44px] flex items-center justify-center"
                aria-label={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? (
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                )}
              </button>

              {/* Time Display */}
              <div className="flex items-center gap-2 text-white text-sm font-light">
                <span>{formatTime(videoRef.current?.currentTime || 0)}</span>
                <span className="text-white/60">/</span>
                <span className="text-white/60">{formatTime(duration)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
