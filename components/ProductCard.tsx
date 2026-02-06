"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import LazyImage from "@/components/LazyImage";
import { useToast } from "@/lib/toast-context";
import { motion } from "framer-motion";
import { useCart } from "@/lib/cart-context";
import { useQuickView } from "@/lib/quickview-context";
import { useWishlist } from "@/lib/wishlist-context";
import { getProductBySlug } from "@/data/products";

interface ProductCardProps {
  id?: number;
  slug: string;
  name: string;
  price: number;
  originalPrice?: number;
  isOnSale?: boolean;
  category: string;
  imageUrl?: string;
  imageAlt?: string;
  videoUrl?: string;
}

export default function ProductCard({
  id,
  slug,
  name,
  price,
  originalPrice,
  isOnSale,
  category,
  imageUrl,
  imageAlt,
  videoUrl,
}: ProductCardProps) {
  const { showToast } = useToast();
  const { addToCart, setIsCartOpen } = useCart();
  const { openQuickView } = useQuickView();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isMobileVideoActive, setIsMobileVideoActive] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [hasVideoError, setHasVideoError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const isWishlisted = id ? isInWishlist(id) : false;
  // Only show video if URL exists and hasn't errored
  const hasVideo = Boolean(videoUrl) && !hasVideoError;

  // Intersection Observer to stop video when out of viewport
  useEffect(() => {
    if (!hasVideo || !videoRef.current || !containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting && videoRef.current) {
            // Stop video when out of viewport
            videoRef.current.pause();
            setIsVideoPlaying(false);
            setIsMobileVideoActive(false);
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
    };
  }, [hasVideo]);

  // Load video metadata when component mounts
  useEffect(() => {
    if (!hasVideo || !videoRef.current) return;
    
    const video = videoRef.current;
    
    const handleLoadedData = () => {
      setIsVideoLoaded(true);
    };

    const handleError = () => {
      // Extract meaningful error info from MediaError
      const mediaError = video.error;
      if (mediaError) {
        const errorMessages: Record<number, string> = {
          1: 'MEDIA_ERR_ABORTED - Video loading was aborted',
          2: 'MEDIA_ERR_NETWORK - Network error while loading video',
          3: 'MEDIA_ERR_DECODE - Video decoding failed',
          4: 'MEDIA_ERR_SRC_NOT_SUPPORTED - Video format not supported',
        };
        // Only log in development, silently fail in production
        if (process.env.NODE_ENV === 'development') {
          console.warn(`Video error for ${slug}:`, errorMessages[mediaError.code] || `Unknown error (code: ${mediaError.code})`);
        }
      }
      setIsVideoLoaded(false);
      setHasVideoError(true); // Disable video functionality for this product
    };

    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('error', handleError);

    // Preload metadata
    video.load();

    return () => {
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('error', handleError);
    };
  }, [hasVideo]);

  // Handle desktop hover to play/pause video
  useEffect(() => {
    if (!hasVideo || !videoRef.current || isMobileVideoActive) return;

    const video = videoRef.current;

    if (isHovered) {
      // Try to play the video
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsVideoPlaying(true);
          })
          .catch(() => {
            // Video play failed (likely autoplay blocked or video error)
            setIsVideoPlaying(false);
            setHasVideoError(true);
          });
      }
    } else {
      // Pause video on unhover (desktop only)
      video.pause();
      video.currentTime = 0;
      setIsVideoPlaying(false);
    }
  }, [isHovered, hasVideo, isMobileVideoActive]);

  // Handle mobile tap to toggle video
  const handleMobileVideoToggle = (e: React.MouseEvent | React.TouchEvent) => {
    if (!hasVideo || !videoRef.current) return;
    
    // Only handle on mobile devices
    if (window.innerWidth >= 768) return;

    e.preventDefault();
    e.stopPropagation();

    const video = videoRef.current;

    if (isMobileVideoActive) {
      // Pause and reset video
      video.pause();
      video.currentTime = 0;
      setIsMobileVideoActive(false);
      setIsVideoPlaying(false);
    } else {
      // Load video if not loaded yet
      if (!isVideoLoaded) {
        video.load();
        setIsVideoLoaded(true);
      }
      // Play video
      video.play().catch(() => {
        setIsVideoPlaying(false);
        setHasVideoError(true);
      });
      setIsMobileVideoActive(true);
      setIsVideoPlaying(true);
    }
  };

  const handleMouseEnter = () => {
    if (window.innerWidth >= 768) {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    if (window.innerWidth >= 768) {
      setIsHovered(false);
    }
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!id) {
      // If no id provided, try to get product by slug
      const product = getProductBySlug(slug);
      if (!product) {
        showToast("Product not found", "error");
        return;
      }
      
      if (isWishlisted) {
        removeFromWishlist(product.id);
        showToast(`${name} removed from wishlist`, "success");
      } else {
        addToWishlist(product);
        showToast(`${name} added to wishlist`, "success");
      }
      return;
    }
    
    if (isWishlisted) {
      removeFromWishlist(id);
      showToast(`${name} removed from wishlist`, "success");
    } else {
      const product = getProductBySlug(slug);
      if (product) {
        addToWishlist(product);
        showToast(`${name} added to wishlist`, "success");
      }
    }
  };

  const handleQuickViewClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const product = getProductBySlug(slug);
    if (product) {
      openQuickView(product);
    }
  };

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isAddingToCart) return;
    
    setIsAddingToCart(true);
    
    try {
      // Get full product data to access sizes and colors
      const product = getProductBySlug(slug);
      
      if (!product) {
        showToast("Product not found", "error");
        return;
      }

      // Use first available size and color as defaults
      const defaultSize = product.sizes?.[0] || "M";
      const defaultColor = product.colors?.[0] || { name: "Default", value: "#000000" };
      
      // Simulate async operation (replace with actual API call if needed)
      await new Promise(resolve => setTimeout(resolve, 300));
      
      addToCart({
        productId: product.id,
        name: product.name,
        price: product.price,
        image: product.imageUrl || product.images?.[0] || "",
        size: defaultSize,
        color: defaultColor.name,
        colorValue: defaultColor.value,
        slug: product.slug,
      });

      showToast(`${name} added to cart`, "success");
    } catch (error) {
      showToast("Failed to add item to cart", "error");
    } finally {
      setIsAddingToCart(false);
    }
  };

  return (
    <div className="group relative">
      <Link 
        href={`/shop/${slug}`} 
        className="block"
        aria-label={`View ${name} product details`}
      >
        {/* Product Image Container */}
        <div 
          ref={containerRef}
          className="relative aspect-[3/4] bg-gradient-to-br from-warm-50 to-warm-100 overflow-hidden mb-4 rounded-sm"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={handleMobileVideoToggle}
          onTouchStart={handleMobileVideoToggle}
        >
          {/* Image Display - use placeholder if imageUrl missing or broken */}
          {(imageUrl || "/images/placeholder-product.svg") && (
            <div
              className={`absolute inset-0 transition-opacity duration-150 ${
                (isHovered && hasVideo && !isMobileVideoActive) || (isMobileVideoActive && hasVideo)
                  ? "opacity-0"
                  : "opacity-100"
              }`}
            >
              <LazyImage
                src={imageUrl || "/images/placeholder-product.svg"}
                alt={imageAlt || name}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover transition-transform duration-200 ease-out group-hover:scale-105"
                fallbackSrc="/images/placeholder-product.svg"
              />
            </div>
          )}

          {/* Video Display */}
          {hasVideo && videoUrl && (
            <video
              ref={videoRef}
              src={videoUrl}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-150 transition-transform duration-200 ease-out group-hover:scale-105 ${
                (isHovered && !isMobileVideoActive) || isMobileVideoActive
                  ? "opacity-100 z-10"
                  : "opacity-0 z-0"
              }`}
              muted
              loop
              playsInline
              preload="metadata"
              onPlay={() => setIsVideoPlaying(true)}
              onPause={() => setIsVideoPlaying(false)}
              onLoadedData={() => setIsVideoLoaded(true)}
              onError={(e) => {
                // Extract meaningful error from MediaError object
                const video = e.currentTarget;
                const mediaError = video.error;
                if (mediaError && process.env.NODE_ENV === 'development') {
                  const errorMessages: Record<number, string> = {
                    1: 'MEDIA_ERR_ABORTED',
                    2: 'MEDIA_ERR_NETWORK', 
                    3: 'MEDIA_ERR_DECODE',
                    4: 'MEDIA_ERR_SRC_NOT_SUPPORTED',
                  };
                  console.warn(`Video failed for ${slug}:`, errorMessages[mediaError.code] || `Code ${mediaError.code}`);
                }
                setIsVideoLoaded(false);
                setHasVideoError(true);
              }}
            />
          )}

          {!imageUrl && !hasVideo && (
            <div className="absolute inset-0 bg-warm-200" />
          )}

          {/* Video Icon Badge - Bottom Right */}
          {hasVideo && (
            <div className="absolute bottom-3 right-3 z-20 bg-[#D4AF37] rounded-full p-2 shadow-lg">
              <svg
                className="w-4 h-4 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          )}

          {/* SALE Badge - Top Left */}
          {isOnSale && (
            <div className="absolute top-3 left-3 z-10 bg-red-600 text-white px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.1em] shadow-lg min-h-[44px] min-w-[44px] flex items-center justify-center">
              SALE
            </div>
          )}

          {/* Wishlist Heart Icon - Top Right - Always visible on mobile */}
          <motion.button
            onClick={handleWishlistClick}
            className="absolute top-3 right-3 z-10 p-2.5 bg-white/90 backdrop-blur-sm rounded-full md:opacity-0 md:group-hover:opacity-100 opacity-100 transition-transform duration-100 hover:bg-white shadow-md min-h-[44px] min-w-[44px] flex items-center justify-center active:scale-95"
            aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            animate={isWishlisted ? { scale: [1, 1.2, 1] } : {}}
            transition={{ duration: 0.2 }}
          >
            <svg
              className={`w-5 h-5 transition-colors duration-200 ${
                isWishlisted ? "text-red-500 fill-red-500" : "text-warm-700"
              }`}
              fill={isWishlisted ? "currentColor" : "none"}
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </motion.button>

          {/* Quick View Icon - Center - Hidden on mobile */}
          <motion.button
            onClick={handleQuickViewClick}
            className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 p-3 bg-white/95 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-transform duration-100 hover:bg-white shadow-lg min-h-[44px] min-w-[44px] active:scale-95"
            aria-label="Quick view"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg
              className="w-5 h-5 text-warm-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
          </motion.button>

          {/* Add to Cart Button - Always visible on mobile, slides up on desktop */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 z-10 md:translate-y-full"
            initial={{ y: 0 }}
            whileHover={{ y: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 200, duration: 0.2 }}
          >
            <motion.button
              onClick={handleAddToCart}
              disabled={isAddingToCart}
              className="w-full bg-warm-900 text-warm-50 py-3.5 md:py-3 text-xs uppercase tracking-[0.15em] font-light hover:bg-gold-600 transition-transform duration-100 min-h-[44px] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 active:scale-95"
              aria-label="Add to cart"
              whileHover={{ scale: isAddingToCart ? 1 : 1.02 }}
              whileTap={{ scale: isAddingToCart ? 1 : 0.98 }}
            >
              {isAddingToCart ? (
                <>
                  <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Adding...
                </>
              ) : (
                "Add to Cart"
              )}
            </motion.button>
          </motion.div>

          {/* Hover overlay - Only on desktop */}
          <div className="absolute inset-0 bg-warm-900/0 md:group-hover:bg-warm-900/5 transition-opacity duration-150" />
        </div>

        {/* Product Info - Simplified for mobile */}
        <div className="space-y-1.5 md:space-y-2">
          <p className="text-warm-500 text-xs uppercase tracking-[0.15em] font-light hidden md:block">
            {category}
          </p>
          <h3 className="text-warm-900 font-playfair text-base md:text-lg font-normal tracking-[0.02em] group-hover:text-gold-600 transition-colors duration-200 line-clamp-2">
            {name}
          </h3>
          <div className="flex items-center gap-2">
            {isOnSale && originalPrice ? (
              <>
                <span className="text-warm-700 text-sm font-light tracking-[0.05em] line-through opacity-60">
                  ${originalPrice.toLocaleString()}
                </span>
                <span className="text-red-600 text-sm font-medium tracking-[0.05em]">
                  ${price.toLocaleString()}
                </span>
              </>
            ) : (
              <span className="text-warm-700 text-sm font-light tracking-[0.05em]">
                ${price.toLocaleString()}
              </span>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}
