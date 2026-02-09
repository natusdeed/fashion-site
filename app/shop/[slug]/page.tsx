"use client";

import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { use, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  getProductBySlug,
  getCategoryBySlug,
  getProductsByCategory,
  getRelatedProducts,
} from "@/data/products";
import {
  getAccessoryCategoryBySlug,
  getAccessoryBySlug,
  getAccessoriesByCategory,
  getFeaturedAccessories,
  getAllAccessories,
  accessoryCategories,
  getAccessorySlug,
  getAccessoryNumericId,
  accessories,
} from "@/data/accessories";
import ProductCard from "@/components/ProductCard";
import AccessoryCard from "@/components/AccessoryCard";
import ImageLightbox from "@/components/ImageLightbox";

// Product gallery loaded on interaction - saves ~15-20KB on initial product page load
const SwipeableImageGallery = dynamic(
  () => import("@/components/SwipeableImageGallery"),
  {
    ssr: false,
    loading: () => (
      <div className="relative aspect-[4/5] bg-gradient-to-br from-warm-100 to-warm-200 animate-pulse rounded-sm" />
    ),
  }
);
import { useCart } from "@/lib/cart-context";
import { useToast } from "@/lib/toast-context";

const SITE_URL = "https://loladrip.com";

// BreadcrumbList schema for product or category (SEO)
function breadcrumbSchemaProduct(slug: string, productName: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Shop", item: `${SITE_URL}/shop` },
      { "@type": "ListItem", position: 3, name: productName, item: `${SITE_URL}/shop/${slug}` },
    ],
  };
}
function breadcrumbSchemaCategory(slug: string, categoryName: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Shop", item: `${SITE_URL}/shop` },
      { "@type": "ListItem", position: 3, name: categoryName, item: `${SITE_URL}/shop/${slug}` },
    ],
  };
}

// Product schema for rich snippets (Google Shopping, product carousels)
function generateProductSchema(product: {
  name: string;
  description: string;
  price: number;
  slug: string;
  id: number;
  category: string;
  imageUrl?: string;
  images?: string[];
}) {
  const image = product.images?.[0] || product.imageUrl;
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: image ? [image] : undefined,
    sku: product.slug,
    category: product.category,
    brand: { "@type": "Brand", name: "Lola Drip" },
    offers: {
      "@type": "Offer",
      url: `${SITE_URL}/shop/${product.slug}`,
      priceCurrency: "USD",
      price: product.price,
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
    },
    // Optional: add AggregateRating when you have reviews
    // aggregateRating: { "@type": "AggregateRating", ratingValue: "4.8", reviewCount: "124" },
  };
}

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export default function ShopSlugPage({ params }: ProductPageProps) {
  const { slug } = use(params);
  const searchParams = useSearchParams();
  const categoryFromUrl = searchParams.get("category");
  const accessoryCategory = getAccessoryCategoryBySlug(slug);
  const accessory = getAccessoryBySlug(slug);
  const category = getCategoryBySlug(slug);
  const product = getProductBySlug(slug);

  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(
    product?.colors?.[0]?.name || null
  );
  const [selectedImage, setSelectedImage] = useState(0);
  const [isFullImageOpen, setIsFullImageOpen] = useState(false);
  const { addToCart, setIsCartOpen } = useCart();
  const { showToast } = useToast();

  // 1. Accessory category page (handbags, purses, earrings, etc.) or "accessories" = all
  const isAllAccessories = slug === "accessories";
  const hasCategoryFilter = isAllAccessories && categoryFromUrl && accessoryCategories.some((c) => c.id === categoryFromUrl);
  const effectiveCategory = hasCategoryFilter ? categoryFromUrl! : slug;
  const accessoryCategoryOrAll =
    accessoryCategory ||
    (isAllAccessories ? { slug: "accessories", name: "Accessories" } : null);
  if (accessoryCategoryOrAll) {
    const categoryAccessories =
      isAllAccessories && !hasCategoryFilter
        ? getAllAccessories()
        : getAccessoriesByCategory(effectiveCategory);
    const displayName = hasCategoryFilter
      ? accessoryCategories.find((c) => c.id === categoryFromUrl)?.name ?? "Accessories"
      : accessoryCategoryOrAll.name;
    const categoryBreadcrumbSchema = breadcrumbSchemaCategory(slug, displayName);
    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(categoryBreadcrumbSchema) }}
        />
        <div className="pt-40 pb-40 px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <nav className="mb-16" aria-label="Breadcrumb">
              <ol className="flex items-center space-x-3 text-warm-600 text-xs uppercase tracking-[0.15em] font-light">
                <li>
                  <Link href="/" className="hover:text-warm-900 transition-colors duration-100">Home</Link>
                </li>
                <li aria-hidden="true">/</li>
                <li>
                  <Link href="/shop" className="hover:text-warm-900 transition-colors duration-100">Shop</Link>
                </li>
                <li aria-hidden="true">/</li>
                <li className="text-warm-900" aria-current="page">{displayName}</li>
              </ol>
            </nav>
            <h1 className="text-4xl md:text-5xl font-playfair text-warm-900 mb-8 font-normal tracking-[0.02em]">
              {displayName}
            </h1>
            {/* Category filter - for all accessory pages */}
            <div className="flex flex-wrap gap-3 mb-12">
              <Link
                href="/shop/accessories"
                className={`px-4 py-2 text-sm uppercase tracking-[0.15em] font-light border transition-colors ${
                  isAllAccessories && !hasCategoryFilter
                    ? "border-warm-900 text-warm-900 bg-warm-50"
                    : "border-warm-300 text-warm-600 hover:border-gold-500 hover:text-gold-600"
                }`}
              >
                All
              </Link>
              {accessoryCategories.map((cat) => (
                <Link
                  key={cat.id}
                  href={isAllAccessories ? `/shop/accessories?category=${cat.id}` : `/shop/${cat.id}`}
                  className={`px-4 py-2 text-sm uppercase tracking-[0.15em] font-light border transition-colors ${
                    effectiveCategory === cat.id
                      ? "border-warm-900 text-warm-900 bg-warm-50"
                      : "border-warm-300 text-warm-600 hover:border-gold-500 hover:text-gold-600"
                  }`}
                >
                  {cat.icon} {cat.name}
                </Link>
              ))}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 md:gap-10">
              {categoryAccessories.map((a) => (
                <AccessoryCard key={a.id} accessory={a} />
              ))}
            </div>
          </div>
        </div>
      </>
    );
  }

  // 2. Accessory product detail page
  if (accessory) {
    const accessoryImage = accessory.image.startsWith("http")
      ? accessory.image
      : "/images/placeholder-product.svg";
    const relatedAccessories = getFeaturedAccessories(4).filter((a) => a.id !== accessory.id);
    const accessorySlug = getAccessoryBySlug(slug) ? slug : getAccessorySlug(accessory);
    const breadcrumbSchema = breadcrumbSchemaProduct(accessorySlug, accessory.name);
    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
        <div className="pt-40 pb-40 px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <nav className="mb-16" aria-label="Breadcrumb">
              <ol className="flex items-center space-x-3 text-warm-600 text-xs uppercase tracking-[0.15em] font-light">
                <li>
                  <Link href="/" className="hover:text-warm-900 transition-colors duration-100">Home</Link>
                </li>
                <li aria-hidden="true">/</li>
                <li>
                  <Link href="/shop" className="hover:text-warm-900 transition-colors duration-100">Shop</Link>
                </li>
                <li aria-hidden="true">/</li>
                <li className="text-warm-900" aria-current="page">{accessory.name}</li>
              </ol>
            </nav>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-32 mb-40">
              <div
                className="relative aspect-[4/5] lg:aspect-[3/4] bg-gradient-to-br from-warm-50 to-warm-100 overflow-hidden rounded-sm cursor-pointer group"
                onClick={() => setIsFullImageOpen(true)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && setIsFullImageOpen(true)}
                aria-label="View full image"
              >
                <Image
                  src={accessoryImage}
                  alt={accessory.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-200"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  quality={90}
                />
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <div className="bg-warm-50/90 backdrop-blur-sm px-3 py-2 rounded-sm border border-gold-300/20">
                    <svg className="w-4 h-4 text-warm-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                    </svg>
                  </div>
                </div>
              </div>
              <ImageLightbox
                isOpen={isFullImageOpen}
                onClose={() => setIsFullImageOpen(false)}
                src={accessoryImage}
                alt={accessory.name}
              />
              <div className="flex flex-col">
                <p className="text-warm-500 text-xs uppercase tracking-[0.2em] font-light mb-4">
                  {accessory.category}
                </p>
                <h1 className="text-4xl md:text-5xl font-playfair text-warm-900 mb-8 font-normal tracking-[0.02em]">
                  {accessory.name}
                </h1>
                <div className="flex items-center gap-2 mb-8">
                  <span className="text-2xl text-warm-700 font-light">${accessory.price.toFixed(2)}</span>
                  {accessory.originalPrice && (
                    <span className="text-lg text-warm-500 line-through">
                      ${accessory.originalPrice.toFixed(2)}
                    </span>
                  )}
                </div>
                <p className="text-warm-700 leading-relaxed mb-12 font-light">{accessory.description}</p>
                {accessory.inStock && (
                  <button
                    onClick={() => {
                      const accessoryIndex = accessories.findIndex((a) => a.id === accessory.id) ?? 0;
                      addToCart({
                        productId: getAccessoryNumericId(accessory, accessoryIndex >= 0 ? accessoryIndex : 0),
                        name: accessory.name,
                        price: accessory.price,
                        image: accessoryImage,
                        size: "One Size",
                        color: "Default",
                        colorValue: "#000000",
                        slug: getAccessorySlug(accessory),
                      });
                      showToast(`${accessory.name} added to cart`, "success");
                      setIsCartOpen(true);
                    }}
                    className="w-full bg-warm-900 text-warm-50 px-10 py-5 md:py-6 hover:bg-warm-800 text-sm uppercase tracking-[0.3em] font-light rounded-sm border border-gold-500/20 min-h-[56px] flex items-center justify-center"
                  >
                    Add to Bag
                  </button>
                )}
              </div>
            </div>
            {relatedAccessories.length > 0 && (
              <div className="mt-24 pt-16 border-t border-warm-200">
                <h2 className="text-2xl md:text-3xl font-playfair text-warm-900 mb-10 font-normal tracking-[0.02em]">
                  You May Also Like
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                  {relatedAccessories.map((a) => (
                    <AccessoryCard key={a.id} accessory={a} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </>
    );
  }

  // 3. Product category page (dresses, outerwear, etc.)
  if (category) {
    const categoryProducts = getProductsByCategory(category.name);
    const categoryBreadcrumbSchema = breadcrumbSchemaCategory(slug, category.name);
    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(categoryBreadcrumbSchema) }}
        />
        <div className="pt-40 pb-40 px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <nav className="mb-16" aria-label="Breadcrumb">
              <ol className="flex items-center space-x-3 text-warm-600 text-xs uppercase tracking-[0.15em] font-light">
                <li>
                  <Link href="/" className="hover:text-warm-900 transition-colors duration-100">Home</Link>
                </li>
                <li aria-hidden="true">/</li>
                <li>
                  <Link href="/shop" className="hover:text-warm-900 transition-colors duration-100">Shop</Link>
                </li>
                <li aria-hidden="true">/</li>
                <li className="text-warm-900" aria-current="page">{category.name}</li>
              </ol>
            </nav>
            <h1 className="text-4xl md:text-5xl font-playfair text-warm-900 mb-12 font-normal tracking-[0.02em]">
              {category.name}
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 md:gap-10">
              {categoryProducts.map((p) => (
                <ProductCard
                  key={p.id}
                  id={p.id}
                  slug={p.slug}
                  name={p.name}
                  price={p.price}
                  originalPrice={p.originalPrice}
                  isOnSale={p.isOnSale}
                  category={p.category}
                  imageUrl={p.imageUrl}
                  imageAlt={p.imageAlt}
                  videoUrl={p.videoUrl}
                />
              ))}
            </div>
          </div>
        </div>
      </>
    );
  }

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

  const breadcrumbSchema = breadcrumbSchemaProduct(slug, product.name);
  const productSchema = generateProductSchema(product);
  const relatedProducts = getRelatedProducts(product, 4);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
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
                className="hover:text-warm-900 transition-colors duration-100"
              >
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link
                href="/shop"
                aria-label="Go to shop page"
                className="hover:text-warm-900 transition-colors duration-100"
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
                alt={product.imageAlt || `${product.name} - ${product.category} - Lola Drip`}
              />
            </div>
            
            {/* Desktop: Original Gallery */}
            <div className="hidden md:block">
              {/* Main Image - Click to view full 100% (no cropping) */}
              <div
                className="relative aspect-[4/5] lg:aspect-[3/4] bg-gradient-to-br from-warm-50 to-warm-100 mb-10 overflow-hidden group cursor-pointer"
                onClick={() => setIsFullImageOpen(true)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && setIsFullImageOpen(true)}
                aria-label="View full image"
              >
                {productImages[selectedImage] ? (
                  <Image
                    src={productImages[selectedImage]}
                    alt={product.imageAlt || `${product.name} - ${product.category} - Lola Drip - View ${selectedImage + 1}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-200 ease-out"
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 100vw, 50vw"
                    quality={90}
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-warm-200 via-warm-100 to-warm-200" />
                )}
                {/* Click hint: View full image */}
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

              {/* Full image lightbox - 100% visible, no cropping */}
              <ImageLightbox
                isOpen={isFullImageOpen}
                onClose={() => setIsFullImageOpen(false)}
                src={productImages[selectedImage] || product.imageUrl || ""}
                alt={product.imageAlt || `${product.name} - ${product.category} - Lola Drip`}
                images={productImages}
                currentIndex={selectedImage}
                onIndexChange={setSelectedImage}
              />

              {/* Thumbnail Gallery - Click to select or open lightbox */}
              {productImages.length > 1 && (
                <div className="grid grid-cols-4 gap-4">
                  {productImages.map((image: string, index: number) => (
                    <button
                      key={index}
                      onClick={() => {
                        setSelectedImage(index);
                        setIsFullImageOpen(true);
                      }}
                      className={`relative aspect-square bg-warm-100 overflow-hidden border-2 transition-transform duration-100 rounded-sm min-h-[44px] cursor-pointer ${
                        selectedImage === index
                          ? "border-gold-600 shadow-md scale-105"
                          : "border-transparent hover:border-warm-300 hover:scale-105 hover:shadow-md"
                      }`}
                      aria-label={`View image ${index + 1} in full screen`}
                    >
                      <Image
                        src={image}
                        alt={`${product.name} - ${product.category} - Lola Drip - Thumbnail ${index + 1}`}
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
                    className={`px-6 py-3.5 border transition-colors duration-100 text-xs uppercase tracking-[0.2em] font-light min-w-[60px] min-h-[44px] rounded-sm flex items-center justify-center active:scale-95 ${
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
                      className={`relative w-12 h-12 rounded-full border-2 transition-transform duration-100 ${
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
                className="w-full bg-warm-900 text-warm-50 px-10 py-5 md:py-6 hover:bg-warm-800 hover:text-gold-100 disabled:bg-warm-300 disabled:cursor-not-allowed transition-transform duration-150 text-sm uppercase tracking-[0.3em] font-light group relative overflow-hidden hover:scale-[1.02] active:scale-95 hover:shadow-xl disabled:hover:scale-100 disabled:hover:shadow-none rounded-sm border border-gold-500/20 min-h-[44px] md:min-h-[56px] flex items-center justify-center"
              >
                <span className="relative z-10 flex items-center justify-center">
                  Add to Bag
                  <svg
                    className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform duration-150"
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
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-gold-400/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-200" />
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

        {/* Related Products - internal linking & SEO */}
        {relatedProducts.length > 0 && (
          <div className="mt-24 pt-16 border-t border-warm-200">
            <h2 className="text-2xl md:text-3xl font-playfair text-warm-900 mb-10 font-normal tracking-[0.02em]">
              You May Also Like
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
              {relatedProducts.map((p) => (
                <ProductCard
                  key={p.id}
                  id={p.id}
                  slug={p.slug}
                  name={p.name}
                  price={p.price}
                  originalPrice={p.originalPrice}
                  isOnSale={p.isOnSale}
                  category={p.category}
                  imageUrl={p.imageUrl}
                  imageAlt={p.imageAlt}
                  videoUrl={p.videoUrl}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
    </>
  );
}
