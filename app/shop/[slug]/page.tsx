"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { getProductBySlug } from "@/data/products";
import SwipeableImageGallery from "@/components/SwipeableImageGallery";
import { useCart } from "@/lib/cart-context";
import { useToast } from "@/lib/toast-context";

// Structured data for breadcrumbs (SEO)
function generateBreadcrumbSchema(slug: string, productName: string) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://yourbrand.com";
  
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": `${siteUrl}/`
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Shop",
        "item": `${siteUrl}/shop`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": productName,
        "item": `${siteUrl}/shop/${slug}`
      }
    ]
  };
}

interface ProductPageProps {
  params: {
    slug: string;
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = getProductBySlug(params.slug);

  // React Hooks must be called before any conditional returns
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(
    product?.colors?.[0]?.name || null
  );
  const [selectedImage, setSelectedImage] = useState(0);
  const { addToCart, setIsCartOpen } = useCart();
  const { showToast } = useToast();

  if (!product) {
    return (
      <div className="pt-32 pb-32 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl font-playfair text-warm-900 mb-4">
            Product Not Found
          </h1>
          <p className="text-warm-600 mb-8">
            The product you&apos;re looking for doesn&apos;t exist.
          </p>
          <Link
            href="/shop"
            aria-label="Return to shop page"
            className="text-warm-900 border-b border-warm-900 hover:text-gold-600 hover:border-gold-600 transition-colors"
          >
            Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  // Use images array if available, otherwise fallback to imageUrl
  const productImages = product.images && product.images.length > 0
    ? product.images
    : product.imageUrl
    ? [product.imageUrl]
    : [];

  const breadcrumbSchema = generateBreadcrumbSchema(params.slug, product.name);

  return (
    <>
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    <div className="pt-40 pb-40 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <nav className="mb-16" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-3 text-warm-600 text-xs uppercase tracking-[0.15em] font-light">
            <li>
              <Link
                href="/"
                aria-label="Go to home page"
                className="hover:text-warm-900 transition-colors duration-300"
              >
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link
                href="/shop"
                aria-label="Go to shop page"
                className="hover:text-warm-900 transition-colors duration-300"
              >
                Shop
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-warm-900" aria-current="page">{product.name}</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-32 mb-40">
          {/* Product Images - Swipeable on Mobile */}
          <div className="lg:sticky lg:top-40 lg:self-start">
            {/* Mobile: Swipeable Gallery, Desktop: Original Gallery */}
            <div className="md:hidden">
              <SwipeableImageGallery
                images={productImages}
                alt={product.imageAlt || product.name}
              />
            </div>
            
            {/* Desktop: Original Gallery */}
            <div className="hidden md:block">
              {/* Main Image - Bigger */}
              <div className="relative aspect-[4/5] lg:aspect-[3/4] bg-gradient-to-br from-warm-50 to-warm-100 mb-10 overflow-hidden group">
                {productImages[selectedImage] ? (
                  <Image
                    src={productImages[selectedImage]}
                    alt={product.imageAlt || `${product.name} - ${selectedImage + 1}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 100vw, 50vw"
                    quality={90}
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-warm-200 via-warm-100 to-warm-200" />
                )}
                {/* Zoom indicator */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <div className="bg-warm-50/90 backdrop-blur-sm px-3 py-2 rounded-sm border border-gold-300/20">
                    <svg
                      className="w-4 h-4 text-warm-700"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Thumbnail Gallery */}
              {productImages.length > 1 && (
                <div className="grid grid-cols-4 gap-4">
                  {productImages.map((image: string, index: number) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`relative aspect-square bg-warm-100 overflow-hidden border-2 transition-all duration-200 rounded-sm min-h-[44px] ${
                        selectedImage === index
                          ? "border-gold-600 shadow-md scale-105"
                          : "border-transparent hover:border-warm-300 hover:scale-105 hover:shadow-md"
                      }`}
                    >
                      <Image
                        src={image}
                        alt={`${product.name} - View ${index + 1}`}
                        fill
                        className="object-cover"
                        sizes="128px"
                        loading="lazy"
                        quality={75}
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Product Details */}
          <div className="flex flex-col">
            {/* Category & Name */}
            <div className="mb-10">
              <p className="text-warm-500 text-xs uppercase tracking-[0.2em] font-light mb-4">
                {product.category}
              </p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-playfair text-warm-900 mb-8 font-normal tracking-[0.02em] leading-tight">
                {product.name}
              </h1>
              <p className="text-2xl md:text-3xl text-warm-700 font-light tracking-[0.05em]">
                ${product.price.toLocaleString()}
              </p>
            </div>

            {/* Description - Enhanced */}
            <div className="mb-16 space-y-8">
              <div>
                <p className="text-warm-700 leading-relaxed text-base mb-4 font-light">
                  {product.description}
                </p>
                {product.longDescription && (
                  <p className="text-warm-600 leading-relaxed text-sm font-light">
                    {product.longDescription}
                  </p>
                )}
              </div>
              
              {/* Brand Trust Elements */}
              <div className="pt-8 border-t border-warm-200">
                <div className="grid grid-cols-2 gap-8 text-xs">
                  <div>
                    <p className="text-warm-500 uppercase tracking-[0.15em] font-light mb-2">
                      Free Shipping
                    </p>
                    <p className="text-warm-600 font-light">
                      On orders over $500
                    </p>
                  </div>
                  <div>
                    <p className="text-warm-500 uppercase tracking-[0.15em] font-light mb-2">
                      Returns
                    </p>
                    <p className="text-warm-600 font-light">
                      30-day guarantee
                    </p>
                  </div>
                  <div>
                    <p className="text-warm-500 uppercase tracking-[0.15em] font-light mb-2">
                      Care
                    </p>
                    <p className="text-warm-600 font-light">
                      Dry clean only
                    </p>
                  </div>
                  <div>
                    <p className="text-warm-500 uppercase tracking-[0.15em] font-light mb-2">
                      Made In
                    </p>
                    <p className="text-warm-600 font-light">
                      Italy
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Size Selection */}
            <div className="mb-12">
              <label className="block text-warm-700 text-xs uppercase tracking-[0.2em] font-light mb-6">
                Size
              </label>
              <div className="flex flex-wrap gap-3 md:gap-4">
                {product.sizes?.map((size: string) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-6 py-3.5 border transition-all duration-200 text-xs uppercase tracking-[0.2em] font-light min-w-[60px] min-h-[44px] rounded-sm flex items-center justify-center ${
                      selectedSize === size
                        ? "border-warm-900 bg-warm-900 text-warm-50 shadow-md scale-105"
                        : "border-warm-300 text-warm-700 hover:border-warm-900 hover:scale-105 hover:shadow-sm"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            {product.colors && product.colors.length > 1 && (
              <div className="mb-12">
                <label className="block text-warm-700 text-xs uppercase tracking-[0.2em] font-light mb-6">
                  Color
                </label>
                <div className="flex gap-5">
                  {product.colors.map((color: { name: string; value: string }) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color.name)}
                      className={`relative w-12 h-12 rounded-full border-2 transition-all duration-300 ${
                        selectedColor === color.name
                          ? "border-gold-600 scale-110 shadow-md"
                          : "border-warm-300 hover:border-warm-600 hover:scale-110 hover:shadow-sm"
                      }`}
                      style={{ backgroundColor: color.value }}
                      aria-label={color.name}
                    >
                      {selectedColor === color.name && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <svg
                            className="w-5 h-5 text-white"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
                <p className="text-warm-600 text-xs mt-4 font-light">
                  {selectedColor}
                </p>
              </div>
            )}

            {/* Add to Bag Button - Primary CTA */}
            <div className="mb-12">
              <button
                onClick={() => {
                  if (!selectedSize) return;
                  const selectedColorObj = product.colors?.find(
                    (c) => c.name === selectedColor
                  ) || product.colors?.[0] || { name: "Default", value: "#000000" };
                  
                  addToCart({
                    productId: product.id,
                    name: product.name,
                    price: product.price,
                    image: productImages[selectedImage] || product.imageUrl || "",
                    size: selectedSize,
                    color: selectedColorObj.name,
                    colorValue: selectedColorObj.value,
                    slug: product.slug,
                  });
                  
                  showToast(`${product.name} added to cart`, "success");
                  setIsCartOpen(true);
                }}
                disabled={!selectedSize}
                className="w-full bg-warm-900 text-warm-50 px-10 py-5 md:py-6 hover:bg-warm-800 hover:text-gold-100 disabled:bg-warm-300 disabled:cursor-not-allowed transition-all duration-200 md:duration-500 text-sm uppercase tracking-[0.3em] font-light group relative overflow-hidden hover:scale-[1.02] hover:shadow-xl disabled:hover:scale-100 disabled:hover:shadow-none rounded-sm border border-gold-500/20 min-h-[44px] md:min-h-[56px] flex items-center justify-center"
              >
                <span className="relative z-10 flex items-center justify-center">
                  Add to Bag
                  <svg
                    className="ml-3 w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-200 md:duration-500"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-gold-400/10 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-500 md:duration-1000" />
              </button>
              {!selectedSize && (
                <p className="text-warm-500 text-xs text-center mt-4 font-light">
                  Please select a size
                </p>
              )}
            </div>

            {/* Product Details Section - Enhanced */}
            <div className="mt-20 pt-12 border-t border-warm-200">
              <h3 className="text-warm-900 font-playfair text-2xl mb-10 font-normal tracking-[0.02em]">
                Product Details
              </h3>
              
              <div className="space-y-8">
                <div>
                  <h4 className="text-warm-700 text-sm uppercase tracking-[0.15em] font-light mb-4">
                    Materials
                  </h4>
                  <p className="text-warm-600 text-sm font-light leading-relaxed">
                    Premium quality materials sourced from the finest suppliers. Each piece is carefully selected for its exceptional quality and luxurious feel.
                  </p>
                </div>
                
                <div>
                  <h4 className="text-warm-700 text-sm uppercase tracking-[0.15em] font-light mb-4">
                    Craftsmanship
                  </h4>
                  <p className="text-warm-600 text-sm font-light leading-relaxed">
                    Handcrafted with meticulous attention to detail by skilled artisans. Every stitch and seam is carefully executed to ensure lasting quality and perfect fit.
                  </p>
                </div>
                
                <div>
                  <h4 className="text-warm-700 text-sm uppercase tracking-[0.15em] font-light mb-4">
                    Care Instructions
                  </h4>
                  <p className="text-warm-600 text-sm font-light leading-relaxed">
                    Dry clean only. Store in a garment bag to protect from dust and maintain its pristine condition. Avoid direct sunlight and moisture.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
