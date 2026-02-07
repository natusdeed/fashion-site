"use client";

import dynamic from "next/dynamic";

// Load Navigation client-only to avoid hydration mismatch from browser extensions (e.g. Foxified)
const Navigation = dynamic(() => import("@/components/Navigation"), {
  ssr: false,
  loading: () => (
    <nav className="sticky top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 h-24" />
  ),
});

export default function NavigationWrapper() {
  return <Navigation />;
}
