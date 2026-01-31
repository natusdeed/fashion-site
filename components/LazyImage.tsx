"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";

const PLACEHOLDER_IMAGE = "/images/placeholder-product.svg";

interface LazyImageProps {
  src: string;
  alt: string;
  fill?: boolean;
  sizes?: string;
  className?: string;
  priority?: boolean;
  /** On load error, show this image instead of "Failed to load" */
  fallbackSrc?: string;
}

export default function LazyImage({
  src,
  alt,
  fill = false,
  sizes,
  className = "",
  priority = false,
  fallbackSrc = PLACEHOLDER_IMAGE,
}: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [useFallback, setUseFallback] = useState(false);

  const displaySrc = useFallback && fallbackSrc ? fallbackSrc : (src || fallbackSrc || PLACEHOLDER_IMAGE);

  // Create a tiny blur placeholder
  const blurDataURL =
    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2Y1ZjFlOCIvPjwvc3ZnPg==";

  const handleError = () => {
    if (fallbackSrc && !useFallback) {
      setUseFallback(true);
      setHasError(false);
      setIsLoaded(false);
    } else {
      setHasError(true);
    }
  };

  if (hasError) {
    return (
      <div className={`bg-warm-200 flex items-center justify-center ${className}`}>
        <span className="text-warm-500 text-xs">Failed to load</span>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${fill ? "w-full h-full" : ""} ${className}`}>
      {/* Blur placeholder */}
      {!isLoaded && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: isLoaded ? 0 : 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 bg-warm-200 blur-sm scale-110"
          style={{
            backgroundImage: `url(${blurDataURL})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      )}

      <Image
        src={displaySrc}
        alt={alt}
        fill={fill}
        sizes={sizes || "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"}
        className={`transition-opacity duration-500 ${
          isLoaded ? "opacity-100" : "opacity-0"
        } ${fill ? "object-cover" : ""}`}
        onLoad={() => setIsLoaded(true)}
        onError={handleError}
        loading={priority ? undefined : "lazy"}
        quality={85}
        placeholder="blur"
        blurDataURL={blurDataURL}
      />
    </div>
  );
}
