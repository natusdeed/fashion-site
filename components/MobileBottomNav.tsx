"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useCart } from "@/lib/cart-context";

export default function MobileBottomNav() {
  const pathname = usePathname();
  const { getCartCount, setIsCartOpen } = useCart();
  const cartCount = getCartCount();

  const navItems: Array<{
    href: string;
    label: string;
    icon: React.ReactNode;
    badge?: number | null;
    onClick?: (e: React.MouseEvent) => void;
  }> = [
    {
      href: "/",
      label: "Home",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
    },
    {
      href: "/shop",
      label: "Shop",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      ),
    },
    {
      href: "#",
      label: "Cart",
      icon: (
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
      ),
      badge: cartCount > 0 ? cartCount : null,
      onClick: (e: React.MouseEvent) => {
        e.preventDefault();
        setIsCartOpen(true);
      },
    },
    {
      href: "/account",
      label: "Account",
      icon: (
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
      ),
    },
  ];

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-warm-50 border-t border-warm-200 shadow-lg md:hidden">
      <div className="flex items-center justify-around h-16 px-2">
        {navItems.map((item) => {
          if (item.onClick) {
            return (
              <button
                key={item.href}
                onClick={item.onClick}
                className={`relative flex flex-col items-center justify-center min-w-[44px] min-h-[44px] px-3 py-2 rounded-sm transition-colors duration-200 ${
                  isActive(item.href)
                    ? "text-gold-600"
                    : "text-warm-600 hover:text-warm-900"
                }`}
                aria-label={item.label}
              >
            <div className="relative">
              {item.icon}
              {item.badge && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.2 }}
                  className="absolute -top-2 -right-2 bg-gold-500 text-warm-900 text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center"
                >
                  {item.badge > 9 ? "9+" : item.badge}
                </motion.span>
              )}
            </div>
            <span className="text-xs mt-1 font-light tracking-wide">
              {item.label}
            </span>
            {isActive(item.href) && (
              <motion.div
                layoutId="activeIndicator"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold-600"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
              </button>
            );
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`relative flex flex-col items-center justify-center min-w-[44px] min-h-[44px] px-3 py-2 rounded-sm transition-colors duration-200 ${
                isActive(item.href)
                  ? "text-gold-600"
                  : "text-warm-600 hover:text-warm-900"
              }`}
              aria-label={item.label}
            >
              <div className="relative">
                {item.icon}
                {item.badge && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.2 }}
                    className="absolute -top-2 -right-2 bg-gold-500 text-warm-900 text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center"
                  >
                    {item.badge > 9 ? "9+" : item.badge}
                  </motion.span>
                )}
              </div>
              <span className="text-xs mt-1 font-light tracking-wide">
                {item.label}
              </span>
              {isActive(item.href) && (
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold-600"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
