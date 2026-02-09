"use client";

import { useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface ImageLightboxProps {
  isOpen: boolean;
  onClose: () => void;
  src: string;
  alt: string;
  images?: string[];
  currentIndex?: number;
  onIndexChange?: (index: number) => void;
}

/**
 * Full-screen lightbox that shows the product image at 100% with object-contain.
 * The entire image is visible—no cropping. One click on image opens, one click to close.
 */
export default function ImageLightbox({
  isOpen,
  onClose,
  src,
  alt,
  images = [],
  currentIndex = 0,
  onIndexChange,
}: ImageLightboxProps) {
  const hasMultiple = images.length > 1;
  const displaySrc = hasMultiple ? images[currentIndex] : src;

  useEffect(() => {
    if (!isOpen) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEscape);
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  if (!displaySrc) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[200] bg-warm-900/95 backdrop-blur-sm flex items-center justify-center p-4 md:p-8"
          onClick={onClose}
          aria-modal="true"
          role="dialog"
          aria-label="View full image"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-3 bg-white/90 backdrop-blur-sm rounded-full text-warm-700 hover:text-warm-900 hover:bg-white shadow-lg min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Close full image view"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Image container - full at once, object-contain so 100% visible, no crop */}
          <div
            className="relative w-full h-[90vh] max-w-6xl flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={displaySrc}
              alt={alt}
              fill
              className="object-contain"
              sizes="100vw"
              quality={95}
              priority
            />
          </div>

          {/* Navigation arrows for multiple images */}
          {hasMultiple && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onIndexChange?.(currentIndex === 0 ? images.length - 1 : currentIndex - 1);
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white min-h-[44px] min-w-[44px] flex items-center justify-center z-10"
                aria-label="Previous image"
              >
                <svg className="w-5 h-5 text-warm-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onIndexChange?.(currentIndex === images.length - 1 ? 0 : currentIndex + 1);
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white min-h-[44px] min-w-[44px] flex items-center justify-center z-10"
                aria-label="Next image"
              >
                <svg className="w-5 h-5 text-warm-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-warm-900/70 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm">
                {currentIndex + 1} / {images.length}
              </div>
            </>
          )}

          {/* Hint text - only when single image to avoid overlap */}
          {!hasMultiple && (
            <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-warm-400 text-xs uppercase tracking-wider">
              Click anywhere to close
            </p>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
