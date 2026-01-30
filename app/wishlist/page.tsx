"use client";

import { useWishlist } from "@/lib/wishlist-context";
import { useCart } from "@/lib/cart-context";
import { useToast } from "@/lib/toast-context";
import ProductCard from "@/components/ProductCard";
import StaggeredGrid from "@/components/animations/StaggeredGrid";
import FadeInOnScroll from "@/components/animations/FadeInOnScroll";
import { useEffect } from "react";
import { initSmoothScroll } from "@/lib/smooth-scroll";
import { motion } from "framer-motion";
import Link from "next/link";

export default function WishlistPage() {
  const { wishlistItems, removeFromWishlist, shareWishlist, getWishlistCount } = useWishlist();
  const { addToCart, setIsCartOpen } = useCart();
  const { showToast } = useToast();

  useEffect(() => {
    initSmoothScroll();
  }, []);

  const handleMoveToCart = (item: typeof wishlistItems[0]) => {
    // Get full product data - we'll need to reconstruct it from wishlist item
    addToCart({
      productId: item.productId,
      name: item.name,
      price: item.price,
      image: item.imageUrl || "",
      size: "M", // Default size
      color: "Default",
      colorValue: "#000000",
      slug: item.slug,
    });
    showToast(`${item.name} moved to cart`, "success");
    setIsCartOpen(true);
  };

  const handleShare = async () => {
    try {
      await shareWishlist();
      showToast("Wishlist link copied to clipboard!", "success");
    } catch (error) {
      showToast("Failed to share wishlist", "error");
    }
  };

  if (wishlistItems.length === 0) {
    return (
      <div>
        {/* Hero Banner */}
        <FadeInOnScroll>
          <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-warm-900/50 to-warm-900/60 z-10" />
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1445205170230-053b83016050?w=1920&q=80')",
              }}
            />
            <div className="relative z-20 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-playfair text-warm-50 mb-6 tracking-wide">
                My Wishlist
              </h1>
            </div>
          </section>
        </FadeInOnScroll>

        {/* Empty State */}
        <div className="pt-20 pb-40 px-6 lg:px-8 bg-warm-50 min-h-[60vh] flex items-center justify-center">
          <div className="max-w-md mx-auto text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", damping: 15, stiffness: 200 }}
              className="mb-8"
            >
              <svg
                className="w-24 h-24 mx-auto text-warm-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </motion.div>
            <h2 className="text-3xl font-playfair text-warm-900 mb-4">Your wishlist is empty</h2>
            <p className="text-warm-600 mb-8 font-light">
              Start adding items you love to your wishlist by clicking the heart icon on any product.
            </p>
            <Link
              href="/shop"
              className="inline-block bg-warm-900 text-warm-50 px-8 py-3.5 text-sm uppercase tracking-[0.15em] font-light hover:bg-gold-600 transition-colors duration-200 min-h-[44px]"
            >
              Start Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Hero Banner */}
      <FadeInOnScroll>
        <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-warm-900/50 to-warm-900/60 z-10" />
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1445205170230-053b83016050?w=1920&q=80')",
            }}
          />
          <div className="relative z-20 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-playfair text-warm-50 mb-6 tracking-wide">
              My Wishlist
            </h1>
            <p className="text-xl md:text-2xl text-warm-100 font-light tracking-wide max-w-2xl mx-auto">
              {getWishlistCount()} {getWishlistCount() === 1 ? "item" : "items"} saved
            </p>
          </div>
        </section>
      </FadeInOnScroll>

      {/* Wishlist Actions Bar */}
      <div className="bg-warm-50 border-b border-warm-200 py-4">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-warm-600 text-sm font-light">
              {getWishlistCount()} {getWishlistCount() === 1 ? "item" : "items"} in your wishlist
            </p>
            <motion.button
              onClick={handleShare}
              className="flex items-center gap-2 text-warm-600 hover:text-warm-900 text-sm font-light uppercase tracking-[0.1em] transition-colors duration-200 min-h-[44px] px-4"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.935-2.186 2.25 2.25 0 00-3.935 2.186z"
                />
              </svg>
              Share Wishlist
            </motion.button>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="pt-20 pb-40 px-6 lg:px-8 bg-warm-50">
        <div className="max-w-7xl mx-auto">
          {/* Product Grid */}
          <StaggeredGrid
            staggerDelay={50}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 md:gap-10 lg:gap-12"
          >
            {wishlistItems.map((item) => (
              <div key={item.productId} className="relative">
                <ProductCard
                  id={item.productId}
                  slug={item.slug}
                  name={item.name}
                  price={item.price}
                  originalPrice={item.originalPrice}
                  isOnSale={item.isOnSale}
                  category={item.category}
                  imageUrl={item.imageUrl}
                  imageAlt={item.imageAlt}
                  videoUrl={item.videoUrl}
                />
                {/* Mobile Quick Actions */}
                <div className="md:hidden mt-4 flex gap-2">
                  <motion.button
                    onClick={() => handleMoveToCart(item)}
                    className="flex-1 bg-warm-900 text-warm-50 py-3 text-xs uppercase tracking-[0.15em] font-light hover:bg-gold-600 transition-colors duration-200 min-h-[44px]"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Move to Cart
                  </motion.button>
                  <motion.button
                    onClick={() => {
                      removeFromWishlist(item.productId);
                      showToast(`${item.name} removed from wishlist`, "success");
                    }}
                    className="px-4 bg-white text-warm-700 py-3 text-xs uppercase tracking-[0.15em] font-light hover:bg-warm-100 transition-colors duration-200 min-h-[44px] border border-warm-200"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    aria-label="Remove from wishlist"
                  >
                    Remove
                  </motion.button>
                </div>
              </div>
            ))}
          </StaggeredGrid>
        </div>
      </div>
    </div>
  );
}
