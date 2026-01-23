"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { useToast } from "@/lib/toast-context";
import { useQuickView } from "@/lib/quickview-context";

export default function QuickViewModal() {
  const { isOpen, product, closeQuickView } = useQuickView();
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const imageRef = useRef<HTMLDivElement>(null);

  const { addToCart, setIsCartOpen } = useCart();
  const { showToast } = useToast();

  // Initialize selections when product changes
  useEffect(() => {
    if (product) {
      setSelectedSize(product.sizes?.[0] || null);
      setSelectedColor(product.colors?.[0]?.name || null);
      setSelectedImageIndex(0);
      setQuantity(1);
    }
  }, [product]);

  // Reset on close
  useEffect(() => {
    if (!isOpen) {
      setSelectedSize(null);
      setSelectedColor(null);
      setSelectedImageIndex(0);
      setQuantity(1);
      setIsZoomed(false);
    }
  }, [isOpen, product]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        closeQuickView();
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen, closeQuickView]);

  if (!product) return null;

  const productImages = product.images && product.images.length > 0
    ? product.images
    : product.imageUrl
    ? [product.imageUrl]
    : [];

  const selectedColorObj = product.colors?.find((c) => c.name === selectedColor) ||
    product.colors?.[0] ||
    { name: "Default", value: "#000000" };

  const handleImageZoom = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current) return;
    const rect = imageRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPosition({ x, y });
    setIsZoomed(true);
  };

  const handleImageLeave = () => {
    setIsZoomed(false);
  };

  const handleImageMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isZoomed && imageRef.current) {
      const rect = imageRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setZoomPosition({ x, y });
    }
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      showToast("Please select a size", "error");
      return;
    }

    addToCart(
      {
        productId: product.id,
        name: product.name,
        price: product.price,
        image: productImages[selectedImageIndex] || product.imageUrl || "",
        size: selectedSize,
        color: selectedColorObj.name,
        colorValue: selectedColorObj.value,
        slug: product.slug,
      },
      quantity
    );

    showToast(`${product.name} added to cart`, "success");
    setIsCartOpen(true);
    closeQuickView();
  };

  const handleWishlistToggle = () => {
    const newWishlistState = !isWishlisted;
    setIsWishlisted(newWishlistState);
    showToast(
      newWishlistState
        ? `${product.name} added to wishlist`
        : `${product.name} removed from wishlist`,
      "success"
    );
  };

  const handleQuantityChange = (delta: number) => {
    setQuantity((prev) => Math.max(1, Math.min(10, prev + delta)));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-warm-900/70 backdrop-blur-sm z-[100]"
            onClick={closeQuickView}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ duration: 0.4, type: "spring", damping: 30 }}
            className="fixed inset-0 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 z-[101] md:max-w-6xl md:w-full md:max-h-[90vh] md:rounded-sm bg-warm-50 shadow-2xl overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeQuickView}
              className="absolute top-4 right-4 z-10 p-2.5 bg-white/90 backdrop-blur-sm rounded-full text-warm-600 hover:text-warm-900 hover:bg-white transition-all duration-200 shadow-lg min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Close modal"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Content - Scrollable on mobile */}
            <div className="flex-1 overflow-y-auto">
              <div className="grid md:grid-cols-2 gap-6 md:gap-8 p-6 md:p-8">
                {/* Left Column - Images */}
                <div className="space-y-4">
                  {/* Main Image with Zoom */}
                  <div
                    ref={imageRef}
                    className="relative aspect-square bg-warm-100 rounded-sm overflow-hidden cursor-zoom-in group"
                    onMouseEnter={handleImageZoom}
                    onMouseMove={handleImageMove}
                    onMouseLeave={handleImageLeave}
                  >
                    {productImages[selectedImageIndex] && (
                      <div className="relative w-full h-full">
                        <Image
                          src={productImages[selectedImageIndex]}
                          alt={product.name}
                          fill
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className={`object-cover transition-transform duration-300 ease-out ${
                            isZoomed ? "scale-150" : "scale-100"
                          }`}
                          style={{
                            transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                          }}
                          priority
                        />
                      </div>
                    )}
                    {/* Zoom indicator - only show on desktop */}
                    <div className="absolute inset-0 bg-warm-900/0 md:group-hover:bg-warm-900/5 transition-colors duration-200 pointer-events-none hidden md:block" />
                  </div>

                  {/* Thumbnails */}
                  {productImages.length > 1 && (
                    <div className="flex gap-3 overflow-x-auto pb-2">
                      {productImages.map((image, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedImageIndex(index)}
                          className={`relative flex-shrink-0 w-20 h-20 rounded-sm overflow-hidden border-2 transition-all duration-200 ${
                            selectedImageIndex === index
                              ? "border-gold-600 scale-105"
                              : "border-warm-200 hover:border-warm-400"
                          }`}
                          aria-label={`View image ${index + 1}`}
                        >
                          <Image
                            src={image}
                            alt={`${product.name} view ${index + 1}`}
                            fill
                            sizes="80px"
                            className="object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Right Column - Product Info */}
                <div className="space-y-6">
                  {/* Product Name and Price */}
                  <div>
                    <p className="text-warm-500 text-xs uppercase tracking-[0.15em] font-light mb-2">
                      {product.category}
                    </p>
                    <h2 className="text-2xl md:text-3xl font-playfair text-warm-900 mb-4 font-normal tracking-[0.02em]">
                      {product.name}
                    </h2>
                    <div className="flex items-center gap-3">
                      {product.isOnSale && product.originalPrice ? (
                        <>
                          <span className="text-warm-700 text-xl font-light line-through opacity-60">
                            ${product.originalPrice.toLocaleString()}
                          </span>
                          <span className="text-red-600 text-2xl font-medium">
                            ${product.price.toLocaleString()}
                          </span>
                        </>
                      ) : (
                        <span className="text-warm-900 text-2xl font-light">
                          ${product.price.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Short Description */}
                  <p className="text-warm-600 text-sm font-light leading-relaxed">
                    {product.description}
                  </p>

                  {/* Size Selector */}
                  <div>
                    <label className="block text-warm-700 text-xs uppercase tracking-[0.2em] font-light mb-4">
                      Size {selectedSize && `- ${selectedSize}`}
                    </label>
                    <div className="flex flex-wrap gap-3">
                      {product.sizes?.map((size) => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`px-6 py-3 border transition-all duration-200 text-xs uppercase tracking-[0.2em] font-light min-w-[60px] min-h-[44px] rounded-sm flex items-center justify-center ${
                            selectedSize === size
                              ? "border-gold-600 bg-gold-50 text-warm-900"
                              : "border-warm-300 text-warm-700 hover:border-warm-600 hover:bg-warm-100"
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Color Selector */}
                  {product.colors && product.colors.length > 0 && (
                    <div>
                      <label className="block text-warm-700 text-xs uppercase tracking-[0.2em] font-light mb-4">
                        Color {selectedColor && `- ${selectedColor}`}
                      </label>
                      <div className="flex gap-4">
                        {product.colors.map((color) => (
                          <button
                            key={color.name}
                            onClick={() => setSelectedColor(color.name)}
                            className={`relative w-12 h-12 rounded-full border-2 transition-all duration-300 ${
                              selectedColor === color.name
                                ? "border-gold-600 scale-110 shadow-md ring-2 ring-gold-200"
                                : "border-warm-300 hover:border-warm-600 hover:scale-110 hover:shadow-sm"
                            }`}
                            style={{ backgroundColor: color.value }}
                            aria-label={color.name}
                          >
                            {selectedColor === color.name && (
                              <div className="absolute inset-0 flex items-center justify-center">
                                <svg
                                  className="w-5 h-5 text-white drop-shadow-lg"
                                  fill="none"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2.5"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path d="M5 13l4 4L19 7" />
                                </svg>
                              </div>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Quantity Selector */}
                  <div>
                    <label className="block text-warm-700 text-xs uppercase tracking-[0.2em] font-light mb-4">
                      Quantity
                    </label>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleQuantityChange(-1)}
                        disabled={quantity <= 1}
                        className="p-2.5 border border-warm-300 text-warm-600 hover:text-warm-900 hover:bg-warm-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors rounded-sm min-h-[44px] min-w-[44px] flex items-center justify-center"
                        aria-label="Decrease quantity"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M20 12H4"
                          />
                        </svg>
                      </button>
                      <motion.span
                        key={quantity}
                        initial={{ scale: 1.2 }}
                        animate={{ scale: 1 }}
                        className="px-6 py-2.5 border border-warm-300 text-warm-900 font-medium text-lg min-w-[4ch] text-center rounded-sm"
                      >
                        {quantity}
                      </motion.span>
                      <button
                        onClick={() => handleQuantityChange(1)}
                        disabled={quantity >= 10}
                        className="p-2.5 border border-warm-300 text-warm-600 hover:text-warm-900 hover:bg-warm-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors rounded-sm min-h-[44px] min-w-[44px] flex items-center justify-center"
                        aria-label="Increase quantity"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 4v16m8-8H4"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-3 pt-4">
                    <button
                      onClick={handleAddToCart}
                      disabled={!selectedSize}
                      className="w-full bg-warm-900 text-warm-50 py-4 text-sm uppercase tracking-[0.15em] font-light hover:bg-gold-600 disabled:bg-warm-300 disabled:cursor-not-allowed transition-colors duration-300 min-h-[44px] flex items-center justify-center gap-2"
                    >
                      Add to Cart
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                        />
                      </svg>
                    </button>
                    <button
                      onClick={handleWishlistToggle}
                      className={`w-full border py-4 text-sm uppercase tracking-[0.15em] font-light transition-colors duration-300 min-h-[44px] flex items-center justify-center gap-2 ${
                        isWishlisted
                          ? "border-red-500 text-red-600 bg-red-50 hover:bg-red-100"
                          : "border-warm-900 text-warm-900 hover:bg-warm-900 hover:text-warm-50"
                      }`}
                    >
                      {isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
                      <svg
                        className={`w-5 h-5 ${isWishlisted ? "fill-current" : ""}`}
                        fill={isWishlisted ? "currentColor" : "none"}
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                      </svg>
                    </button>
                  </div>

                  {/* View Full Details Link */}
                  <Link
                    href={`/shop/${product.slug}`}
                    onClick={closeQuickView}
                    className="inline-flex items-center text-warm-600 hover:text-gold-600 text-sm uppercase tracking-[0.15em] font-light transition-colors duration-200 group"
                  >
                    View Full Details
                    <svg
                      className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
