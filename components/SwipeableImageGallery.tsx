"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import ImageLightbox from "@/components/ImageLightbox";

interface SwipeableImageGalleryProps {
  images: string[];
  alt: string;
  className?: string;
}

export default function SwipeableImageGallery({
  images,
  alt,
  className = "",
}: SwipeableImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isFullImageOpen, setIsFullImageOpen] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    touchEndX.current = null;
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const onTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && currentIndex < images.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
    if (isRightSwipe && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  if (images.length === 0) return null;

  return (
    <div className={`relative ${className}`}>
      {/* Main Image Container - Click to view full 100% (no cropping) */}
      <div
        className="relative aspect-[4/5] lg:aspect-[3/4] bg-gradient-to-br from-warm-50 to-warm-100 overflow-hidden rounded-sm cursor-pointer"
        onTouchStart={isMobile ? onTouchStart : undefined}
        onTouchMove={isMobile ? onTouchMove : undefined}
        onTouchEnd={isMobile ? onTouchEnd : undefined}
        onClick={() => setIsFullImageOpen(true)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && setIsFullImageOpen(true)}
        aria-label="View full image"
      >
        <motion.div
          className="relative w-full h-full"
          key={currentIndex}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.2 }}
        >
          <Image
            src={images[currentIndex]}
            alt={`${alt} - ${currentIndex + 1}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority={currentIndex === 0}
            quality={90}
          />
        </motion.div>

        {/* Navigation Arrows - Desktop Only */}
        {!isMobile && images.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-white transition-all duration-200 min-h-[44px] min-w-[44px] flex items-center justify-center z-10"
              aria-label="Previous image"
            >
              <svg
                className="w-5 h-5 text-warm-700"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-white transition-all duration-200 min-h-[44px] min-w-[44px] flex items-center justify-center z-10"
              aria-label="Next image"
            >
              <svg
                className="w-5 h-5 text-warm-700"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}

        {/* Image Counter - Mobile Only */}
        {isMobile && images.length > 1 && (
          <div className="absolute top-4 right-4 bg-warm-900/70 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs font-light">
            {currentIndex + 1} / {images.length}
          </div>
        )}
      </div>

      {/* Thumbnail Gallery - Desktop Only */}
      {!isMobile && images.length > 1 && (
        <div className="grid grid-cols-4 gap-4 mt-4">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`relative aspect-square bg-warm-100 overflow-hidden border-2 transition-all duration-200 rounded-sm min-h-[44px] ${
                currentIndex === index
                  ? "border-gold-600 shadow-md scale-105"
                  : "border-transparent hover:border-warm-300 hover:scale-105 hover:shadow-md"
              }`}
              aria-label={`View image ${index + 1}`}
            >
              <Image
                src={image}
                alt={`${alt} thumbnail ${index + 1}`}
                fill
                className="object-cover"
                sizes="128px"
                loading="lazy"
                quality={75}
              />
            </button>
          ))}
        </div>
      )}

        {/* Full image lightbox - 100% visible, no cropping */}
      <ImageLightbox
        isOpen={isFullImageOpen}
        onClose={() => setIsFullImageOpen(false)}
        src={images[currentIndex]}
        alt={`${alt} - ${currentIndex + 1}`}
        images={images}
        currentIndex={currentIndex}
        onIndexChange={setCurrentIndex}
      />

      {/* Swipe Indicators - Mobile Only */}
      {isMobile && images.length > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-1.5 rounded-full transition-all duration-200 min-w-[44px] min-h-[44px] flex items-center justify-center ${
                currentIndex === index
                  ? "bg-gold-600 w-8"
                  : "bg-warm-300 w-1.5"
              }`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
