"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { Product } from "@/data/products";

interface QuickViewContextType {
  isOpen: boolean;
  product: Product | null;
  openQuickView: (product: Product) => void;
  closeQuickView: () => void;
}

const QuickViewContext = createContext<QuickViewContextType | undefined>(
  undefined
);

export function QuickViewProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [product, setProduct] = useState<Product | null>(null);

  const openQuickView = useCallback((product: Product) => {
    setProduct(product);
    setIsOpen(true);
  }, []);

  const closeQuickView = useCallback(() => {
    setIsOpen(false);
    // Small delay before clearing product to allow exit animation
    setTimeout(() => setProduct(null), 300);
  }, []);

  return (
    <QuickViewContext.Provider
      value={{
        isOpen,
        product,
        openQuickView,
        closeQuickView,
      }}
    >
      {children}
    </QuickViewContext.Provider>
  );
}

export function useQuickView() {
  const context = useContext(QuickViewContext);
  if (context === undefined) {
    throw new Error("useQuickView must be used within a QuickViewProvider");
  }
  return context;
}
