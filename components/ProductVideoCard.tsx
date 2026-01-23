"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

interface ProductVideoCardProps {
  id?: number;
  slug: string;
  name: string;
  price: number;
  category: string;
  imageUrl?: string;
  imageAlt?: string;
  videoUrl: string;
}

export default function ProductVideoCard({
  slug,
  name,
  price,
  category,
  imageUrl,
  imageAlt,
  videoUrl,
}: ProductVideoCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const playVideo = () => {
    if (videoRef.current && videoUrl) {
      videoRef.current.play().catch(() => {
        // Handle autoplay restrictions gracefully
      });
      setIsPlaying(true);
      setIsHovered(true);
    }
  };

  const stopVideo = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      setIsPlaying(false);
      setIsHovered(false);
    }
  };

  const handleMouseEnter = () => {
    playVideo();
  };

  const handleMouseLeave = () => {
    stopVideo();
  };

  const handleMouseDown = () => {
    playVideo();
  };

  const handleTouchStart = () => {
    playVideo();
  };

  return (
    <Link 
      href={`/shop/${slug}`} 
      className="group block h-full"
      aria-label={`View ${name} product details`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
    >
      <div className="relative bg-white border border-warm-200/60 transition-all duration-300 ease-in-out group-hover:border-gold-500/40 group-hover:shadow-2xl group-hover:shadow-warm-900/10 overflow-hidden h-full flex flex-col">
        {/* Luxury Card Container */}
        <div className="relative">
          {/* Premium Top Accent Line */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold-500/0 to-transparent group-hover:via-gold-500/60 transition-all duration-300 ease-in-out z-20" />
          
          {/* Product Video/Image Container */}
          <div className="relative aspect-[3/4] bg-gradient-to-br from-warm-50 via-warm-100 to-warm-50 overflow-hidden">
            {/* Video Element */}
            <video
              ref={videoRef}
              src={videoUrl}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                isPlaying && isHovered ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
              muted
              loop
              playsInline
              preload="metadata"
            />
            {/* Fallback Image */}
            {imageUrl && (
              <Image
                src={imageUrl}
                alt={imageAlt || name}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className={`object-cover transition-all duration-300 ease-in-out ${
                  isPlaying && isHovered ? "opacity-0 scale-110" : "opacity-100 scale-100"
                }`}
                loading="lazy"
                quality={90}
              />
            )}
            {/* Video Play Indicator */}
            <div className={`absolute top-4 left-4 z-20 transition-all duration-300 ease-in-out ${
              isHovered || isPlaying ? "opacity-100" : "opacity-70"
            }`}>
              <div className="bg-warm-900/80 backdrop-blur-sm px-3 py-1.5 border border-gold-500/40 rounded-sm">
                <div className="flex items-center gap-2">
                  <svg className="w-3 h-3 text-gold-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                  <span className="text-[10px] text-gold-500 uppercase tracking-[0.2em] font-light">
                    Video
                  </span>
                </div>
              </div>
            </div>

            {/* Luxury Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-warm-900/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out z-10" />
            
            {/* Subtle Vignette Effect */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_60%,rgba(44,44,44,0.03))] opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out z-10" />

            {/* Premium Badge - Top Right */}
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0 z-20">
              <div className="bg-warm-900/95 backdrop-blur-sm px-3 py-1.5 border border-gold-500/30">
                <span className="text-[10px] text-gold-500 uppercase tracking-[0.25em] font-light">
                  View
                </span>
              </div>
            </div>

            {/* Elegant Bottom Indicator */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold-500/0 to-transparent group-hover:via-gold-500/50 transition-all duration-300 ease-in-out z-10" />
          </div>

          {/* Product Info Section - Premium Styling */}
          <div className="p-3 lg:p-4 bg-white relative flex-1 flex flex-col">
            {/* Decorative Top Border */}
            <div className="absolute top-0 left-3 right-3 lg:left-4 lg:right-4 h-px bg-gradient-to-r from-transparent via-warm-200 to-transparent group-hover:via-gold-500/30 transition-all duration-300 ease-in-out" />
            
            {/* Category Label */}
            <div className="mb-1.5">
              <p className="text-[10px] text-warm-500 uppercase tracking-[0.3em] font-light letter-spacing-wider">
                {category}
              </p>
            </div>

            {/* Product Name */}
            <h3 className="text-warm-900 font-playfair text-lg lg:text-xl font-normal tracking-[0.02em] mb-2 leading-tight group-hover:text-gold-500 transition-all duration-300 ease-in-out">
              {name}
            </h3>

            {/* Price Section - Luxury Formatting */}
            <div className="flex items-baseline justify-between pt-2 border-t border-warm-100 group-hover:border-gold-500/50 transition-all duration-300 ease-in-out mt-auto">
              <div>
                <span className="text-[11px] text-warm-500 uppercase tracking-[0.2em] font-light mr-2">
                  From
                </span>
                <span className="text-xl lg:text-2xl font-playfair text-warm-900 font-normal tracking-wide">
                  ${price.toLocaleString()}
                </span>
              </div>
              
              {/* Elegant Arrow Indicator */}
              <div className="opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-2 group-hover:translate-x-0">
                <svg 
                  className="w-5 h-5 text-gold-500" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={1.5} 
                    d="M17 8l4 4m0 0l-4 4m4-4H3" 
                  />
                </svg>
              </div>
            </div>

            {/* Subtle Bottom Accent */}
            <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-warm-200 to-transparent group-hover:via-gold-500/20 transition-all duration-300 ease-in-out" />
          </div>
        </div>

        {/* Luxury Shadow Effect on Hover */}
        <div className="absolute inset-0 border border-gold-500/0 group-hover:border-gold-500/20 transition-all duration-300 ease-in-out pointer-events-none" />
      </div>
    </Link>
  );
}
