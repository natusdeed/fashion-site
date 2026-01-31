import type { Metadata } from "next";
import Link from "next/link";
import { getAllProducts } from "@/data/products";
import ProductCard from "@/components/ProductCard";

export const metadata: Metadata = {
  title: "All Products | Shop | Lola Drip",
  description:
    "View all Lola Drip products in one place. Designer dresses, evening wear, tops, bottoms & outerwear. Premium women's fashion.",
  robots: { index: true, follow: true },
  alternates: { canonical: "/shop/all" },
};

/**
 * View-all page: lists every product in one page for crawlers and users who prefer a single list.
 * Linked from shop pagination or footer for SEO (rel next/prev + single-page option).
 */
export default function ShopAllPage() {
  const products = getAllProducts();

  return (
    <div className="pt-40 pb-40 px-6 lg:px-8 bg-warm-50">
      <div className="max-w-7xl mx-auto">
        <nav className="mb-8 text-sm" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2 text-warm-600">
            <li>
              <Link href="/" className="hover:text-warm-900 transition-colors">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href="/shop" className="hover:text-warm-900 transition-colors">
                Shop
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-warm-900" aria-current="page">
              All products
            </li>
          </ol>
        </nav>
        <h1 className="text-4xl font-playfair text-warm-900 mb-4 font-normal">
          All Products
        </h1>
        <p className="text-warm-600 mb-12">
          Browse our complete collection ({products.length} pieces).
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 md:gap-10">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              slug={product.slug}
              name={product.name}
              price={product.price}
              originalPrice={product.originalPrice}
              isOnSale={product.isOnSale}
              category={product.category}
              imageUrl={product.imageUrl}
              imageAlt={product.imageAlt}
              videoUrl={product.videoUrl}
            />
          ))}
        </div>
        <p className="mt-16 text-center">
          <Link
            href="/shop"
            className="text-warm-600 hover:text-gold-600 text-sm uppercase tracking-wider border-b border-warm-300 hover:border-gold-600"
          >
            Back to Shop
          </Link>
        </p>
      </div>
    </div>
  );
}
