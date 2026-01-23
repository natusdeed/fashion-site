"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { ReactNode, useState, useEffect } from "react";

interface PageTransitionProps {
  children: ReactNode;
}

export default function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
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
    : 0.4;

  if (prefersReducedMotion) {
    return <>{children}</>;
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{
          duration: animationDuration,
          ease: [0.25, 0.1, 0.25, 1],
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
