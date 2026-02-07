"use client";

import { useState } from "react";
import Link from "next/link";
import LazyImage from "@/components/LazyImage";
import { useToast } from "@/lib/toast-context";
import { useCart } from "@/lib/cart-context";
import {
  getAccessorySlug,
  getAccessoryNumericId,
  accessories,
} from "@/data/accessories";
import type { Accessory } from "@/data/accessories";

interface AccessoryCardProps {
  accessory: Accessory;
}

/**
 * AccessoryCard - Displays accessory items (handbags, jewelry, etc.)
 * Simpler than ProductCard: no sizes/colors, uses "One Size" for cart.
 */
export default function AccessoryCard({ accessory }: AccessoryCardProps) {
  const { showToast } = useToast();
  const { addToCart, setIsCartOpen } = useCart();
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const imageUrl = accessory.image.startsWith("http")
    ? accessory.image
    : "/images/placeholder-product.svg";
  const isOnSale = Boolean(accessory.originalPrice);
  const slug = getAccessorySlug(accessory);
  const numericId = getAccessoryNumericId(
    accessory,
    accessories.findIndex((a) => a.id === accessory.id) || 0
  );

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isAddingToCart || !accessory.inStock) return;
    setIsAddingToCart(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 300));
      addToCart({
        productId: numericId,
        name: accessory.name,
        price: accessory.price,
        image: imageUrl,
        size: "One Size",
        color: "Default",
        colorValue: "#000000",
        slug,
      });
      showToast(`${accessory.name} added to cart`, "success");
    } catch {
      showToast("Failed to add item to cart", "error");
    } finally {
      setIsAddingToCart(false);
    }
  };

  return (
    <div className="group relative">
      <Link
        href={`/shop/${slug}`}
        className="block"
        aria-label={`View ${accessory.name} details`}
      >
        <div className="relative aspect-[3/4] bg-gradient-to-br from-warm-50 to-warm-100 overflow-hidden mb-4 rounded-sm">
          <LazyImage
            src={imageUrl}
            alt={accessory.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover transition-transform duration-200 ease-out group-hover:scale-105"
            fallbackSrc="/images/placeholder-product.svg"
          />
          {isOnSale && (
            <span className="absolute top-3 left-3 bg-gold-500 text-warm-900 text-xs font-semibold uppercase tracking-wider px-2 py-1 rounded-sm">
              Sale
            </span>
          )}
          {!accessory.inStock && (
            <div className="absolute inset-0 bg-warm-900/50 flex items-center justify-center">
              <span className="text-white text-sm font-medium uppercase tracking-wider">
                Out of Stock
              </span>
            </div>
          )}
        </div>

        <div className="space-y-1">
          <p className="text-xs uppercase tracking-[0.15em] text-warm-500 font-light">
            {accessory.category}
          </p>
          <h3 className="text-base font-light text-warm-900 group-hover:text-gold-600 transition-colors duration-100 line-clamp-2">
            {accessory.name}
          </h3>
          <div className="flex items-center gap-2">
            <span className="text-base font-medium text-warm-900">
              ${accessory.price.toFixed(2)}
            </span>
            {accessory.originalPrice && (
              <span className="text-sm text-warm-500 line-through">
                ${accessory.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
        </div>
      </Link>

      {accessory.inStock && (
        <button
          onClick={handleAddToCart}
          disabled={isAddingToCart}
          className="mt-3 w-full py-3 text-xs uppercase tracking-[0.2em] font-medium border border-warm-300 text-warm-700 hover:border-gold-500 hover:text-gold-600 transition-colors duration-150 disabled:opacity-50"
        >
          {isAddingToCart ? "Adding..." : "Add to Cart"}
        </button>
      )}
    </div>
  );
}
