"use client";

import { useState, useEffect } from "react";

// Cookie utility functions
const setCookie = (name: string, value: string, days: number) => {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = `expires=${date.toUTCString()}`;
  document.cookie = `${name}=${value};${expires};path=/`;
};

const getCookie = (name: string): string | null => {
  const nameEQ = `${name}=`;
  const ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};

export default function NewsletterPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    setIsMounted(true);
    
    // Check if popup was already shown (cookie exists)
    const newsletterShown = getCookie("newsletter_popup_shown");
    
    if (!newsletterShown) {
      // Show popup after 5 seconds
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    // Set cookie to prevent showing again for 7 days
    setCookie("newsletter_popup_shown", "true", 7);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription logic here
    // Close popup and set cookie
    handleClose();
    setEmail("");
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  if (!isMounted || !isVisible) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      {/* Backdrop with blur effect */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-fade-in" />
      
      {/* Modal */}
      <div className="relative bg-cream-100 w-full max-w-lg rounded-sm shadow-2xl animate-slide-up">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 p-2 text-warm-700 hover:text-warm-900 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-2 focus:ring-offset-cream-100 rounded-sm"
          aria-label="Close newsletter popup"
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

        {/* Content */}
        <div className="p-8 md:p-12">
          {/* Heading */}
          <h2 className="text-4xl md:text-5xl font-playfair text-warm-900 mb-4 font-normal tracking-wide text-center">
            Experience Luxury Fashion
          </h2>

          {/* Subtitle */}
          <p className="text-warm-700 text-sm md:text-base font-light tracking-[0.1em] uppercase text-center mb-8 leading-relaxed max-w-md mx-auto">
            SUBSCRIBE AND GET 15% OFF YOUR FIRST ORDER. DISCOVER NEW COLLECTIONS AND EXCLUSIVE DEALS
          </p>

          {/* Newsletter Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                className="w-full px-4 py-4 bg-white border-2 border-warm-300 text-warm-900 placeholder-warm-500 focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 transition-all duration-300 font-light text-sm"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gold-500 hover:bg-gold-600 text-warm-900 px-8 py-4 text-sm font-light tracking-[0.15em] uppercase transition-all duration-300 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-2 focus:ring-offset-cream-100"
            >
              SUBSCRIBE NOW
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
