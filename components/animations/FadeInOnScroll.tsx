"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface FadeInOnScrollProps {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  className?: string;
  threshold?: number;
}

export default function FadeInOnScroll({
  children,
  delay = 0,
  direction = "up",
  className = "",
  threshold = 0.1,
}: FadeInOnScrollProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Optionally disconnect after first trigger for performance
          observer.disconnect();
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [threshold]);

  const directionMap = {
    up: { y: 30, x: 0 },
    down: { y: -30, x: 0 },
    left: { x: 30, y: 0 },
    right: { x: -30, y: 0 },
  };

  const initial = directionMap[direction];

  // Detect mobile and reduced motion preference
  const [isMobile, setIsMobile] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    const checkReducedMotion = () => {
      setPrefersReducedMotion(
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      );
    };
    
    checkMobile();
    checkReducedMotion();
    window.addEventListener("resize", checkMobile);
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    mediaQuery.addEventListener("change", checkReducedMotion);
    
    return () => {
      window.removeEventListener("resize", checkMobile);
      mediaQuery.removeEventListener("change", checkReducedMotion);
    };
  }, []);

  const animationDuration = prefersReducedMotion 
    ? 0.01 
    : isMobile 
    ? 0.2 
    : 0.6;

  return (
    <motion.div
      ref={ref}
      initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, ...initial }}
      animate={isVisible || prefersReducedMotion ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, ...initial }}
      transition={{
        duration: animationDuration,
        delay: prefersReducedMotion ? 0 : delay / 1000, // Convert ms to seconds
        ease: [0.25, 0.1, 0.25, 1], // Custom easing for smooth animation
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
