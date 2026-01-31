"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useCart } from "@/lib/cart-context";
import { useWishlist } from "@/lib/wishlist-context";
import { useToast } from "@/lib/toast-context";
import type { Product } from "@/data/products";

interface ProductPageContentProps {
  product: Product;
}

export default function ProductPageContent({ product }: ProductPageContentProps) {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string>(product.colors?.[0]?.name ?? "");
  const { addToCart, setIsCartOpen } = useCart();
  const { addToWishlist, isInWishlist, removeFromWishlist } = useWishlist();
  const { showToast } = useToast();

  const productImage = product.images?.[0] || product.imageUrl || "/images/shop.header.png";
  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = () => {
    const size = selectedSize ?? product.sizes?.[0];
    if (!size) {
      showToast("Please select a size", "error");
      return;
    }
    const colorObj = product.colors?.find((c) => c.name === selectedColor) ?? product.colors?.[0] ?? { name: "Default", value: "#000000" };
    addToCart({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: productImage,
      size,
      color: colorObj.name,
      colorValue: colorObj.value,
      slug: product.slug,
    });
    showToast(`${product.name} added to cart`, "success");
    setIsCartOpen(true);
  };

  const handleWishlist = () => {
    if (inWishlist) {
      removeFromWishlist(product.id);
      showToast("Removed from wishlist", "success");
    } else {
      addToWishlist(product);
      showToast("Added to wishlist", "success");
    }
  };

  return (
    <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <nav className="mb-8 text-sm" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2 text-gray-600">
            <li>
              <Link href="/" className="hover:text-gray-900 transition-colors" aria-label="Go to home page">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href="/shop" className="hover:text-gray-900 transition-colors" aria-label="Go to shop page">
                Shop
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-gray-900" aria-current="page">{product.name}</li>
          </ol>
        </nav>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="relative aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg overflow-hidden">
            {product.imageUrl || product.images?.[0] ? (
              <Image
                src={productImage}
                alt={product.imageAlt || `${product.name} - ${product.category} - Lola Drip`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
                quality={90}
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
              />
            ) : (
              <div className="w-full h-full bg-gray-200" />
            )}
          </div>

          <div>
            <div className="mb-4">
              <span className="text-sm text-gray-600 uppercase tracking-wider">{product.category}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-serif text-gray-900 mb-6">{product.name}</h1>
            <p className="text-3xl font-light text-gray-900 mb-8">${product.price}</p>

            <div className="mb-8">
              <p className="text-gray-700 leading-relaxed mb-6">{product.description}</p>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-900 mb-3 uppercase tracking-wider">Size</label>
              <div className="flex flex-wrap gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    className={`px-6 py-3.5 border transition-colors duration-200 text-sm uppercase tracking-wider min-h-[44px] min-w-[44px] flex items-center justify-center ${
                      selectedSize === size
                        ? "border-gray-900 bg-gray-900 text-white"
                        : "border-gray-300 hover:border-gray-900 hover:bg-gray-900 hover:text-white"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-900 mb-3 uppercase tracking-wider">Color</label>
              <div className="flex gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    type="button"
                    onClick={() => setSelectedColor(color.name)}
                    className={`px-6 py-3.5 border transition-colors duration-200 text-sm uppercase tracking-wider min-h-[44px] min-w-[44px] flex items-center justify-center ${
                      selectedColor === color.name ? "border-gray-900 bg-gray-900 text-white" : "border-gray-300 hover:border-gray-900"
                    }`}
                  >
                    {color.name}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={handleAddToCart}
              className="w-full bg-gray-900 text-white px-8 py-4 hover:bg-gray-800 transition-colors duration-200 text-sm uppercase tracking-wider font-medium mb-4 min-h-[44px]"
            >
              Add to Cart
            </button>

            <button
              type="button"
              onClick={handleWishlist}
              className="w-full border-2 border-gray-900 text-gray-900 px-8 py-4 hover:bg-gray-900 hover:text-white transition-colors duration-200 text-sm uppercase tracking-wider font-medium min-h-[44px]"
            >
              {inWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
            </button>

            <div className="mt-12 pt-8 border-t border-gray-200">
              <h3 className="text-lg font-serif text-gray-900 mb-4">Product Details</h3>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li>• Premium quality materials</li>
                <li>• Handcrafted with attention to detail</li>
                <li>• Free shipping on orders over $200</li>
                <li>• 30-day return policy</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
