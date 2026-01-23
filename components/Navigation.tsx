"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/shop", label: "Shop" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

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

  const isActive = (href: string) => pathname === href;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-warm-50/80 backdrop-blur-md border-b border-warm-200/50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-center h-24 relative">
          {/* Desktop Navigation - Left */}
          <div className="hidden lg:flex items-center absolute left-0 space-x-10">
            {navLinks.slice(0, 2).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-label={`Navigate to ${link.label} page`}
                aria-current={isActive(link.href) ? "page" : undefined}
                className="group relative text-warm-600 hover:text-warm-900 font-light text-sm tracking-[0.15em] uppercase transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-2 focus:ring-offset-warm-50 rounded-sm px-2 py-1 -mx-2"
              >
                <span className="relative inline-block">
                  {link.label}
                  {/* Active indicator line */}
                  <span
                    className={`absolute bottom-0 left-0 h-px bg-gold-600 transition-all duration-500 ease-out ${
                      isActive(link.href) ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                    style={{ transform: "translateY(2px)" }}
                  />
                  {/* Hover background effect */}
                  <span className="absolute inset-0 bg-warm-100 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
                </span>
                {/* Active page indicator */}
                {isActive(link.href) && (
                  <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-gold-600 rounded-full" />
                )}
              </Link>
            ))}
          </div>

          {/* Centered Logo */}
          <Link
            href="/"
            className="flex items-center group focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-2 focus:ring-offset-warm-50 rounded-sm p-1 -m-1"
            aria-label="ÉLÉGANCE - Home"
          >
            <span className="text-3xl font-playfair font-normal text-warm-900 tracking-[0.2em] transition-all duration-300 group-hover:text-gold-600 group-hover:scale-105">
              ÉLÉGANCE
            </span>
          </Link>

          {/* Desktop Navigation - Right */}
          <div className="hidden lg:flex items-center absolute right-0 space-x-10">
            {navLinks.slice(2).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-label={`Navigate to ${link.label} page`}
                aria-current={isActive(link.href) ? "page" : undefined}
                className="group relative text-warm-600 hover:text-warm-900 font-light text-sm tracking-[0.15em] uppercase transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-2 focus:ring-offset-warm-50 rounded-sm px-2 py-1 -mx-2"
              >
                <span className="relative inline-block">
                  {link.label}
                  {/* Active indicator line */}
                  <span
                    className={`absolute bottom-0 left-0 h-px bg-gold-600 transition-all duration-500 ease-out ${
                      isActive(link.href) ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                    style={{ transform: "translateY(2px)" }}
                  />
                  {/* Hover background effect */}
                  <span className="absolute inset-0 bg-warm-100 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
                </span>
                {/* Active page indicator */}
                {isActive(link.href) && (
                  <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-gold-600 rounded-full" />
                )}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button - Optimized */}
          <button
            className="lg:hidden absolute right-0 p-3 -mr-3 text-warm-600 hover:text-warm-900 active:text-gold-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-2 focus:ring-offset-warm-50 rounded-sm"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            <svg
              className="w-6 h-6 transform transition-transform duration-300"
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

        {/* Mobile Navigation - Improved with smooth animation */}
        <div
          id="mobile-menu"
          className={`lg:hidden overflow-hidden transition-all duration-500 ease-in-out ${
            isMenuOpen
              ? "max-h-96 opacity-100 border-t border-warm-200/50"
              : "max-h-0 opacity-0 border-t-0"
          }`}
        >
          <div className="py-6">
            <nav className="flex flex-col items-center space-y-4" aria-label="Mobile navigation">
              {navLinks.map((link, index) => (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-label={`Navigate to ${link.label} page`}
                  aria-current={isActive(link.href) ? "page" : undefined}
                  onClick={() => setIsMenuOpen(false)}
                  className={`relative group w-full text-center px-6 py-3 rounded-sm font-light text-sm tracking-[0.15em] uppercase transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-2 focus:ring-offset-warm-50 ${
                    isActive(link.href)
                      ? "text-warm-900 bg-warm-100"
                      : "text-warm-600 hover:text-warm-900 hover:bg-warm-50"
                  } ${isMenuOpen ? "animate-fade-in-up" : ""}`}
                  style={{
                    animationDelay: isMenuOpen ? `${index * 50}ms` : "0ms",
                  }}
                >
                  <span className="relative inline-block">
                    {link.label}
                    {/* Active indicator for mobile */}
                    {isActive(link.href) && (
                      <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-8 h-px bg-gold-600" />
                    )}
                  </span>
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </nav>
  );
}
