"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useState, useEffect, useRef } from "react";

export default function AccountNavLink() {
  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  if (status === "loading") {
    return (
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
    );
  }

  if (session?.user) {
    return (
      <div className="relative" ref={dropdownRef}>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-full transition-transform duration-100 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-2 min-h-[44px] min-w-[44px] flex items-center justify-center hover:text-[#D4AF37] hover:scale-110 active:scale-95 hover:bg-[#D4AF37]/10 text-[#4a4a4a]"
          aria-label="Account menu"
          aria-expanded={isOpen}
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
        </button>
        {isOpen && (
          <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-warm-200 py-2 z-50">
            <div className="px-4 py-2 border-b border-warm-100">
              <p className="text-sm font-medium text-warm-900 truncate">
                {session.user.name ?? "Account"}
              </p>
              <p className="text-xs text-warm-500 truncate">
                {session.user.email}
              </p>
            </div>
            <Link
              href="/account/dashboard"
              onClick={() => setIsOpen(false)}
              className="block px-4 py-2 text-sm text-warm-700 hover:bg-warm-50 hover:text-gold-600 transition-colors"
            >
              My Account
            </Link>
            <Link
              href="/account/orders"
              onClick={() => setIsOpen(false)}
              className="block px-4 py-2 text-sm text-warm-700 hover:bg-warm-50 hover:text-gold-600 transition-colors"
            >
              Order History
            </Link>
            <button
              type="button"
              onClick={() => {
                setIsOpen(false);
                signOut({ callbackUrl: "/" });
              }}
              className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
            >
              Sign Out
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
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
  );
}
