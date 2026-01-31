"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import SearchBar from "@/components/SearchBar";
import { motion } from "framer-motion";
import { throttle } from "@/lib/utils";
import { useCart } from "@/lib/cart-context";
import { useQuickView } from "@/lib/quickview-context";
import { useWishlist } from "@/lib/wishlist-context";

// Shop categories with images for mega-menu
const shopCategories = [
  {
    name: "Dresses",
    href: "/shop/dresses",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&q=80",
  },
  {
    name: "Outerwear",
    href: "/shop/outerwear",
    image: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=400&q=80",
  },
  {
    name: "Tops",
    href: "/shop/tops",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&q=80",
  },
  {
    name: "Bottoms",
    href: "/shop/bottoms",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&q=80",
  },
  {
    name: "Evening Wear",
    href: "/shop/evening-wear",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&q=80",
  },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isShopMenuOpen, setIsShopMenuOpen] = useState(false);
  const { getCartCount, isCartOpen, setIsCartOpen } = useCart();
  const { getWishlistCount } = useWishlist();
  const cartCount = getCartCount();
  const wishlistCount = getWishlistCount();
  const pathname = usePathname();
  const shopMenuRef = useRef<HTMLDivElement>(null);

  // Handle scroll effect - throttled 16ms (60fps) + passive for instant response
  useEffect(() => {
    const handleScroll = throttle(() => {
      setIsScrolled(window.scrollY > 20);
    }, 16);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);


  // Close shop menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (shopMenuRef.current && !shopMenuRef.current.contains(event.target as Node)) {
        setIsShopMenuOpen(false);
      }
    };
    if (isShopMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isShopMenuOpen]);

  // Close search on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsSearchOpen(false);
      }
    };
    if (isSearchOpen) {
      window.addEventListener("keydown", handleEscape);
    }
    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isSearchOpen]);

  const navLinks = [
    { href: "/", label: "HOME" },
    { href: "/shop", label: "SHOP" },
    { href: "/about", label: "ABOUT" },
    { href: "/contact", label: "CONTACT" },
  ];

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };


  return (
    <>
      <nav
        className={`sticky top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 transition-shadow duration-150 ${
          isScrolled ? "shadow-sm" : ""
        }`}
      >
        <div className="max-w-7xl mx-auto h-24 px-8 py-4">
          <div className="flex items-center justify-between h-full">
            {/* Logo - Left Side */}
            <Link
              href="/"
              className="flex-shrink-0 flex items-center group focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-2 focus:ring-offset-warm-50 rounded-sm p-1 -m-1 z-50"
              aria-label="Lola Drip - Home"
            >
              <span 
                className="text-4xl tracking-tight transition-transform duration-100 group-hover:scale-105 active:scale-95 group-hover:text-[#D4AF37] text-[#1a1a1a]"
                style={{
                  fontFamily: 'var(--font-playfair), Georgia, serif',
                  fontWeight: 600,
                }}
              >
                Lola <span className="italic">Drip</span>
              </span>
            </Link>

            {/* Desktop Navigation Links - Center */}
            <div className="hidden lg:flex items-center gap-10 absolute left-1/2 transform -translate-x-1/2">
              {navLinks.map((link) => (
                <div key={link.href} className="relative" ref={link.label === "SHOP" ? shopMenuRef : null}>
                  <Link
                    href={link.href}
                    onMouseEnter={() => link.label === "SHOP" && setIsShopMenuOpen(true)}
                    className={`group relative px-3 py-2 text-base font-medium tracking-widest uppercase transition-colors duration-100 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-2 rounded-sm ${
                      isActive(link.href)
                        ? "text-[#D4AF37]"
                        : "text-[#4a4a4a] hover:text-[#1a1a1a]"
                    }`}
                    style={{
                      fontFamily: 'var(--font-inter), system-ui, sans-serif',
                      fontWeight: 500,
                    }}
                  >
                    {link.label}
                    {/* Active gold underline */}
                    {isActive(link.href) && (
                      <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#D4AF37] rounded-full transition-transform duration-100" />
                    )}
                    {/* Hover underline (only when not active) - gold underline appearing */}
                    {!isActive(link.href) && (
                      <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#D4AF37] rounded-full scale-x-0 transition-transform duration-150 origin-center group-hover:scale-x-100" />
                    )}
                  </Link>

                  {/* Shop Mega Menu */}
                  {link.label === "SHOP" && (
                    <div
                      className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[600px] bg-warm-50 border border-warm-200 shadow-2xl transition-[transform,opacity] duration-200 ease-out ${
                        isShopMenuOpen
                          ? "opacity-100 visible translate-y-0"
                          : "opacity-0 invisible -translate-y-2 pointer-events-none"
                      }`}
                      onMouseLeave={() => setIsShopMenuOpen(false)}
                    >
                      <div className="grid grid-cols-3 gap-4 p-6">
                        {shopCategories.map((category) => (
                          <Link
                            key={category.name}
                            href={category.href}
                            className="group block focus:outline-none focus:ring-2 focus:ring-gold-500 rounded-sm"
                            onClick={() => setIsShopMenuOpen(false)}
                          >
                            <div className="relative overflow-hidden rounded-sm mb-2 aspect-square">
                              <Image
                                src={category.image}
                                alt={`Shop ${category.name} - Lola Drip`}
                                fill
                                sizes="(max-width: 768px) 50vw, 200px"
                                className="object-cover transition-transform duration-200 group-hover:scale-110"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-warm-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-150" />
                            </div>
                            <p className="text-sm font-light text-warm-700 group-hover:text-gold-600 transition-colors duration-100 text-center">
                              {category.name}
                            </p>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Right Side Icons */}
            <div className="flex items-center gap-6">
              {/* Search Icon */}
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2 rounded-full transition-transform duration-100 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-2 min-h-[44px] min-w-[44px] flex items-center justify-center hover:text-[#D4AF37] hover:scale-110 active:scale-95 hover:bg-[#D4AF37]/10 text-[#4a4a4a]"
                aria-label="Search"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>

              {/* Wishlist Icon with Badge */}
              <Link
                href="/wishlist"
                className="relative p-2 rounded-full transition-transform duration-100 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-2 min-h-[44px] min-w-[44px] flex items-center justify-center hover:text-[#D4AF37] hover:scale-110 active:scale-95 hover:bg-[#D4AF37]/10 text-[#4a4a4a]"
                aria-label="Wishlist"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                {wishlistCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-0 right-0 bg-[#D4AF37] text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center"
                  >
                    {wishlistCount > 9 ? "9+" : wishlistCount}
                  </motion.span>
                )}
              </Link>

              {/* User Icon */}
              <Link
                href="/account"
                className="p-2 rounded-full transition-transform duration-100 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-2 min-h-[44px] min-w-[44px] flex items-center justify-center hover:text-[#D4AF37] hover:scale-110 active:scale-95 hover:bg-[#D4AF37]/10 text-[#4a4a4a]"
                aria-label="Account"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </Link>

              {/* Shopping Cart Icon with Badge */}
              <motion.button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 rounded-full transition-transform duration-100 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-2 min-h-[44px] min-w-[44px] flex items-center justify-center hover:text-[#D4AF37] hover:scale-110 active:scale-95 hover:bg-[#D4AF37]/10 text-[#4a4a4a]"
                aria-label="Shopping Cart"
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                {cartCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-0 right-0 bg-[#D4AF37] text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center"
                  >
                    {cartCount > 9 ? "9+" : cartCount}
                  </motion.span>
                )}
              </motion.button>

              {/* Mobile Menu Button */}
              <button
                className="lg:hidden p-2.5 text-warm-600 hover:text-warm-900 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-2 rounded-sm min-h-[44px] min-w-[44px] flex items-center justify-center"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={isMenuOpen}
              >
                <svg
                  className="w-6 h-6 transform transition-transform duration-200"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {isMenuOpen ? (
                    <path d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Expandable Search Bar */}
        <div
          className={`overflow-visible transition-all duration-200 ease-out ${
            isSearchOpen ? "max-h-[800px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          {isSearchOpen && (
            <SearchBar isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
          )}
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      <motion.div
        className="fixed inset-0 z-40 lg:hidden"
        initial={false}
        animate={{
          pointerEvents: isMenuOpen ? "auto" : "none",
        }}
      >
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-warm-900/50 backdrop-blur-sm"
          onClick={() => setIsMenuOpen(false)}
          initial={{ opacity: 0 }}
          animate={{ opacity: isMenuOpen ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        />

        {/* Drawer */}
        <motion.div
          className="absolute right-0 top-0 bottom-0 w-80 max-w-[85vw] bg-warm-50 shadow-2xl overflow-y-auto"
          initial={{ x: "100%" }}
          animate={{ x: isMenuOpen ? 0 : "100%" }}
          transition={{
            type: "spring",
            damping: 30,
            stiffness: 300,
            duration: 0.2,
          }}
        >
          <div className="p-6">
            {/* Close Button */}
            <div className="flex justify-end mb-8">
              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-2.5 text-warm-600 hover:text-warm-900 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gold-500 rounded-sm min-h-[44px] min-w-[44px] flex items-center justify-center"
                aria-label="Close menu"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Mobile Navigation Links */}
            <nav className="flex flex-col space-y-2">
              {navLinks.map((link, index) => (
                <div key={link.href}>
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{
                      opacity: isMenuOpen ? 1 : 0,
                      x: isMenuOpen ? 0 : 20,
                    }}
                    transition={{
                      duration: 0.2,
                      delay: index * 0.05,
                    }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsMenuOpen(false)}
                      className={`block px-4 py-3.5 text-base font-light tracking-[0.15em] uppercase transition-all duration-200 rounded-sm focus:outline-none focus:ring-2 focus:ring-gold-500 min-h-[44px] flex items-center ${
                        isActive(link.href)
                          ? "text-warm-900 bg-warm-100 border-l-4 border-gold-500"
                          : "text-warm-600 hover:text-warm-900 hover:bg-warm-100"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>

                  {/* Mobile Shop Submenu */}
                  {link.label === "SHOP" && (
                    <motion.div
                      className="mt-2 ml-4 space-y-1"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{
                        opacity: isMenuOpen ? 1 : 0,
                        height: isMenuOpen ? "auto" : 0,
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      {shopCategories.map((category) => (
                        <Link
                          key={category.name}
                          href={category.href}
                          onClick={() => setIsMenuOpen(false)}
                          className="block px-4 py-3 text-sm text-warm-600 hover:text-gold-600 hover:bg-warm-100 rounded-sm transition-all duration-200 min-h-[44px] flex items-center"
                        >
                          {category.name}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </div>
              ))}
            </nav>

            {/* Mobile Account & Cart Links */}
            <motion.div
              className="mt-8 pt-8 border-t border-warm-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: isMenuOpen ? 1 : 0,
                y: isMenuOpen ? 0 : 20,
              }}
              transition={{ duration: 0.2, delay: 0.2 }}
            >
              <Link
                href="/wishlist"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center px-4 py-3.5 text-warm-600 hover:text-warm-900 transition-colors duration-200 min-h-[44px]"
              >
                <svg
                  className="w-5 h-5 mr-3"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                Wishlist
                {wishlistCount > 0 && (
                  <span className="ml-2 bg-gold-500 text-warm-900 text-xs font-semibold rounded-full px-2 py-0.5">
                    {wishlistCount}
                  </span>
                )}
              </Link>
              <Link
                href="/account"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center px-4 py-3.5 text-warm-600 hover:text-warm-900 transition-colors duration-200 min-h-[44px]"
              >
                <svg
                  className="w-5 h-5 mr-3"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Account
              </Link>
              <button
                type="button"
                onClick={() => {
                  setIsMenuOpen(false);
                  setIsCartOpen(true);
                }}
                className="flex items-center w-full px-4 py-3.5 text-warm-600 hover:text-warm-900 transition-colors duration-200 min-h-[44px] text-left"
                aria-label="Open shopping cart"
              >
                <svg
                  className="w-5 h-5 mr-3"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Shopping Cart
                {cartCount > 0 && (
                  <span className="ml-2 bg-gold-500 text-warm-900 text-xs font-semibold rounded-full px-2 py-0.5">
                    {cartCount}
                  </span>
                )}
              </button>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      {/* Cart Drawer and Quick View Modal are now in layout.tsx for better code splitting */}
    </>
  );
}
