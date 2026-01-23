"use client";

import Link from "next/link";
import Image from "next/image";

interface LogoProps {
  variant?: "default" | "white";
  className?: string;
  showLink?: boolean;
}

export default function Logo({ variant = "default", className = "", showLink = true }: LogoProps) {
  const logoSrc = variant === "white" ? "/logo-white.svg" : "/logo.svg";
  const logoAlt = "Lola Drip - Luxury Fashion Brand";

  const logoElement = (
    <div className={`flex flex-col items-center group ${className}`}>
      <Image
        src={logoSrc}
        alt={logoAlt}
        width={200}
        height={80}
        className="transition-all duration-500 group-hover:scale-105 group-hover:opacity-90"
        priority
      />
    </div>
  );

  if (showLink) {
    return (
      <Link
        href="/"
        className="focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-2 focus:ring-offset-warm-50 rounded-sm"
        aria-label="Lola Drip - Home"
      >
        {logoElement}
      </Link>
    );
  }

  return logoElement;
}
