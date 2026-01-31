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
  const [isVisible, setIsVisible] = useState(true); // Start visible so products show immediately (fixes shop grid appearing empty)
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold,
        rootMargin: "0px 0px 300px 0px",
      }
    );

    const el = ref.current;
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0 },
    },
  };

  // Normalize children to array (handles single array child from products.map())
  const items = Array.isArray(children) ? children : [children];
  // #region agent log
  const isArr = Array.isArray(children);
  const rawLen = isArr ? (children as React.ReactNode[]).length : 1;
  fetch("http://127.0.0.1:7244/ingest/03c008b9-73dd-4259-8e28-9e129667c391", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      location: "StaggeredGrid.tsx:items",
      message: "Client: StaggeredGrid children",
      data: { isArray: isArr, rawChildrenLength: rawLen, itemsLength: items.length },
      timestamp: Date.now(),
      sessionId: "debug-session",
      hypothesisId: "C",
    }),
  }).catch(() => {});
  // #endregion

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="visible"
      animate={isVisible ? "visible" : "visible"}
      className={className}
    >
      {items.map((child, index) => (
        <motion.div key={index} variants={itemVariants} initial="visible" animate="visible">
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}
