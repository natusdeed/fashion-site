"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface StaggeredGridProps {
  children: React.ReactNode[];
  className?: string;
  staggerDelay?: number; // Delay in milliseconds between each item
  threshold?: number;
}

export default function StaggeredGrid({
  children,
  className = "",
  staggerDelay = 50,
  threshold = 0.1,
}: StaggeredGridProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay / 1000, // Convert ms to seconds
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      className={className}
    >
      {children.map((child, index) => (
        <motion.div key={index} variants={itemVariants}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}
