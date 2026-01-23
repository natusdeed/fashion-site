"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { Product } from "@/data/products";

export interface WishlistItem {
  productId: number;
  slug: string;
  name: string;
  price: number;
  originalPrice?: number;
  isOnSale?: boolean;
  category: string;
  imageUrl?: string;
  imageAlt?: string;
  addedAt: number; // Timestamp
}

interface WishlistContextType {
  wishlistItems: WishlistItem[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: number) => void;
  isInWishlist: (productId: number) => boolean;
  getWishlistCount: () => number;
  clearWishlist: () => void;
  shareWishlist: () => Promise<void>;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

const WISHLIST_STORAGE_KEY = "lola-drip-wishlist";

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load wishlist from localStorage on mount
  useEffect(() => {
    try {
      const storedWishlist = localStorage.getItem(WISHLIST_STORAGE_KEY);
      if (storedWishlist) {
        setWishlistItems(JSON.parse(storedWishlist));
      }
    } catch (error) {
      console.error("Error loading wishlist from localStorage:", error);
    } finally {
      setIsHydrated(true);
    }
  }, []);

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    if (isHydrated) {
      try {
        localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlistItems));
      } catch (error) {
        console.error("Error saving wishlist to localStorage:", error);
      }
    }
  }, [wishlistItems, isHydrated]);

  const addToWishlist = useCallback((product: Product) => {
    setWishlistItems((prevItems) => {
      // Check if product already exists in wishlist
      if (prevItems.some((item) => item.productId === product.id)) {
        return prevItems;
      }

      // Add new item
      const newItem: WishlistItem = {
        productId: product.id,
        slug: product.slug,
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice,
        isOnSale: product.isOnSale,
        category: product.category,
        imageUrl: product.imageUrl,
        imageAlt: product.imageAlt,
        addedAt: Date.now(),
      };
      return [...prevItems, newItem];
    });
  }, []);

  const removeFromWishlist = useCallback((productId: number) => {
    setWishlistItems((prevItems) =>
      prevItems.filter((item) => item.productId !== productId)
    );
  }, []);

  const isInWishlist = useCallback(
    (productId: number) => {
      return wishlistItems.some((item) => item.productId === productId);
    },
    [wishlistItems]
  );

  const getWishlistCount = useCallback(() => {
    return wishlistItems.length;
  }, [wishlistItems]);

  const clearWishlist = useCallback(() => {
    setWishlistItems([]);
  }, []);

  const shareWishlist = useCallback(async () => {
    try {
      const wishlistUrl = `${window.location.origin}/wishlist?shared=true`;
      const productNames = wishlistItems.map((item) => item.name).join(", ");
      const shareText = `Check out my wishlist from Lola Drip: ${productNames}`;
      const shareData = {
        title: "My Lola Drip Wishlist",
        text: shareText,
        url: wishlistUrl,
      };

      if (navigator.share && navigator.canShare(shareData)) {
        await navigator.share(shareData);
      } else {
        // Fallback: copy to clipboard
        await navigator.clipboard.writeText(`${shareText}\n${wishlistUrl}`);
        // You might want to show a toast here
      }
    } catch (error) {
      // User cancelled or error occurred
      console.error("Error sharing wishlist:", error);
    }
  }, [wishlistItems]);

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        getWishlistCount,
        clearWishlist,
        shareWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
}
