"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useCart } from "@/lib/cart-context";
import Link from "next/link";
import Image from "next/image";

const FREE_SHIPPING_THRESHOLD = 200;

export default function CartDrawer() {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    getCartTotal,
    isCartOpen,
    setIsCartOpen,
  } = useCart();
  const [removingItemId, setRemovingItemId] = useState<string | null>(null);
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);

  const subtotal = getCartTotal();
  const freeShippingRemaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const freeShippingProgress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  const handleRemoveItem = (itemId: string) => {
    setRemovingItemId(itemId);
    // Small delay for animation
    setTimeout(() => {
      removeFromCart(itemId);
      setRemovingItemId(null);
    }, 200);
  };

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) {
      handleRemoveItem(itemId);
    } else {
      updateQuantity(itemId, newQuantity);
    }
  };

  const handlePromoCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple promo code validation (you can enhance this)
    if (promoCode.toUpperCase() === "WELCOME10" || promoCode.toUpperCase() === "SAVE10") {
      setPromoApplied(true);
    } else {
      alert("Invalid promo code");
    }
  };

  const handleCheckout = () => {
    // Navigate to checkout page
    setIsCartOpen(false);
    // You can add navigation logic here
    console.log("Proceeding to checkout");
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-warm-900/50 backdrop-blur-sm z-50"
            onClick={() => setIsCartOpen(false)}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{
              type: "spring",
              damping: 30,
              stiffness: 300,
            }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-warm-50 shadow-2xl z-50 overflow-y-auto flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-6 border-b border-warm-200 flex-shrink-0">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-playfair text-warm-900 font-normal tracking-[0.02em]">
                  Shopping Cart
                </h2>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 text-warm-600 hover:text-warm-900 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-gold-500 rounded-sm min-h-[44px] min-w-[44px] flex items-center justify-center"
                  aria-label="Close cart"
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
              </div>
            </div>

            {/* Cart Content - Scrollable */}
            <div className="flex-1 overflow-y-auto p-6">
              {cartItems.length > 0 ? (
                <>
                  {/* Free Shipping Progress Bar */}
                  {freeShippingRemaining > 0 ? (
                    <div className="mb-6 p-4 bg-warm-100 rounded-sm border border-warm-200">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-warm-700 font-light">
                          {freeShippingRemaining > 0
                            ? `Add $${freeShippingRemaining.toFixed(2)} for free shipping`
                            : "You've unlocked free shipping!"}
                        </span>
                        <span className="text-xs text-warm-600">
                          ${subtotal.toFixed(2)} / ${FREE_SHIPPING_THRESHOLD}
                        </span>
                      </div>
                      <div className="w-full bg-warm-200 rounded-full h-2 overflow-hidden">
                        <motion.div
                          className="bg-gold-500 h-full rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${freeShippingProgress}%` }}
                          transition={{ duration: 0.5, ease: "easeOut" }}
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="mb-6 p-4 bg-gold-50 border border-gold-200 rounded-sm">
                      <p className="text-sm text-warm-900 font-light flex items-center gap-2">
                        <svg
                          className="w-5 h-5 text-gold-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        You&apos;ve unlocked free shipping!
                      </p>
                    </div>
                  )}

                  {/* Cart Items */}
                  <div className="space-y-4 mb-6">
                    <AnimatePresence mode="popLayout">
                      {cartItems.map((item, index) => (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{
                            opacity: removingItemId === item.id ? 0 : 1,
                            x: removingItemId === item.id ? -20 : 0,
                            scale: removingItemId === item.id ? 0.95 : 1,
                          }}
                          exit={{ opacity: 0, x: -20, scale: 0.95 }}
                          transition={{
                            duration: 0.2,
                            delay: index * 0.05,
                          }}
                          className="flex gap-4 p-4 bg-white border border-warm-200 rounded-sm"
                        >
                          {/* Product Thumbnail */}
                          <div className="relative w-20 h-20 flex-shrink-0 bg-warm-100 rounded-sm overflow-hidden">
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              sizes="80px"
                              className="object-cover"
                            />
                          </div>

                          {/* Item Details */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2 mb-2">
                              <div className="flex-1 min-w-0">
                                <Link
                                  href={`/shop/${item.slug}`}
                                  onClick={() => setIsCartOpen(false)}
                                  className="font-playfair text-warm-900 hover:text-gold-600 transition-colors text-base mb-1 block"
                                >
                                  {item.name}
                                </Link>
                                <div className="flex items-center gap-3 text-sm text-warm-600">
                                  <span className="font-light">
                                    Size: <span className="font-medium">{item.size}</span>
                                  </span>
                                  <span className="font-light">•</span>
                                  <div className="flex items-center gap-2">
                                    <span className="font-light">Color:</span>
                                    <div
                                      className="w-4 h-4 rounded-full border border-warm-300"
                                      style={{ backgroundColor: item.colorValue }}
                                      title={item.color}
                                    />
                                    <span className="font-medium text-xs">{item.color}</span>
                                  </div>
                                </div>
                              </div>
                              <button
                                onClick={() => handleRemoveItem(item.id)}
                                className="p-1.5 text-warm-400 hover:text-warm-900 transition-colors flex-shrink-0 min-h-[44px] min-w-[44px] flex items-center justify-center"
                                aria-label="Remove item"
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
                                    strokeWidth={1.5}
                                    d="M6 18L18 6M6 6l12 12"
                                  />
                                </svg>
                              </button>
                            </div>

                            {/* Price and Quantity Controls */}
                            <div className="flex items-center justify-between">
                              <span className="text-warm-900 font-light text-base">
                                ${(item.price * item.quantity).toLocaleString("en-US", {
                                  minimumFractionDigits: 2,
                                  maximumFractionDigits: 2,
                                })}
                              </span>

                              {/* Quantity Controls */}
                              <div className="flex items-center gap-2 border border-warm-300 rounded-sm">
                                <button
                                  onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                  className="p-2 text-warm-600 hover:text-warm-900 hover:bg-warm-100 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                                  aria-label="Decrease quantity"
                                >
                                  <svg
                                    className="w-4 h-4"
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
                                  key={item.quantity}
                                  initial={{ scale: 1.2 }}
                                  animate={{ scale: 1 }}
                                  className="px-3 py-2 text-warm-900 font-medium min-w-[3ch] text-center"
                                >
                                  {item.quantity}
                                </motion.span>
                                <button
                                  onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                  className="p-2 text-warm-600 hover:text-warm-900 hover:bg-warm-100 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                                  aria-label="Increase quantity"
                                >
                                  <svg
                                    className="w-4 h-4"
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
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>

                  {/* Promo Code Section */}
                  <div className="mb-6 p-4 bg-warm-100 rounded-sm border border-warm-200">
                    <form onSubmit={handlePromoCodeSubmit} className="flex gap-2">
                      <input
                        type="text"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        placeholder="Promo code"
                        className="flex-1 px-4 py-2.5 bg-white border border-warm-300 rounded-sm text-warm-900 placeholder-warm-500 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-gold-500 text-sm"
                        disabled={promoApplied}
                      />
                      <button
                        type="submit"
                        disabled={promoApplied || !promoCode.trim()}
                        className="px-4 py-2.5 bg-warm-900 text-warm-50 text-sm uppercase tracking-[0.1em] font-light hover:bg-gold-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px]"
                      >
                        {promoApplied ? "Applied" : "Apply"}
                      </button>
                    </form>
                    {promoApplied && (
                      <p className="mt-2 text-sm text-gold-600 font-light">
                        Promo code applied! 10% discount will be applied at checkout.
                      </p>
                    )}
                  </div>
                </>
              ) : (
                /* Empty Cart State */
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="mb-6"
                  >
                    <svg
                      className="w-24 h-24 text-warm-300 mx-auto"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1}
                        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                      />
                    </svg>
                  </motion.div>
                  <h3 className="text-xl font-playfair text-warm-900 mb-2">
                    Your cart is empty
                  </h3>
                  <p className="text-warm-600 font-light mb-6 max-w-xs">
                    Looks like you haven&apos;t added anything to your cart yet. Start shopping to fill
                    it up!
                  </p>
                  <Link
                    href="/shop"
                    onClick={() => setIsCartOpen(false)}
                    className="inline-block bg-warm-900 text-warm-50 px-8 py-3 text-sm uppercase tracking-[0.15em] font-light hover:bg-gold-600 transition-colors duration-300 min-h-[44px] flex items-center justify-center"
                  >
                    Continue Shopping
                  </Link>
                </div>
              )}
            </div>

            {/* Footer - Fixed at bottom */}
            {cartItems.length > 0 && (
              <div className="border-t border-warm-200 bg-warm-50 p-6 flex-shrink-0">
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-warm-700 font-light uppercase tracking-[0.1em] text-sm">
                      Subtotal
                    </span>
                    <span className="text-warm-900 font-playfair text-xl">
                      ${subtotal.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </span>
                  </div>
                  {promoApplied && (
                    <div className="flex justify-between items-center text-sm text-gold-600">
                      <span className="font-light">Promo discount (10%)</span>
                      <span className="font-medium">
                        -$
                        {((subtotal * 0.1).toLocaleString("en-US", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        }))}
                      </span>
                    </div>
                  )}
                  <p className="text-xs text-warm-500 font-light mt-2">
                    Shipping and taxes calculated at checkout
                  </p>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="flex-1 border border-warm-900 text-warm-900 py-3.5 text-sm uppercase tracking-[0.15em] font-light hover:bg-warm-900 hover:text-warm-50 transition-colors duration-300 min-h-[44px]"
                  >
                    Continue Shopping
                  </button>
                  <button
                    onClick={handleCheckout}
                    className="flex-1 bg-warm-900 text-warm-50 py-3.5 text-sm uppercase tracking-[0.15em] font-light hover:bg-gold-600 transition-colors duration-300 min-h-[44px]"
                  >
                    Checkout
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
