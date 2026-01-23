import Link from "next/link";
import type { Metadata } from "next";
import Image from "next/image";
import { getAllProducts } from "@/data/products";
import Script from "next/script";

// Structured data for breadcrumbs (SEO)
function generateBreadcrumbSchema(id: string, productName: string) {
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
        "item": `${siteUrl}/product/${id}`
      }
    ]
  };
}

// Get product by id (can be numeric id or slug)
function getProductById(id: string) {
  const products = getAllProducts();
  // Try to find by numeric id first
  const productById = products.find((p) => p.id.toString() === id);
  if (productById) return productById;
  
  // If not found, try to find by slug
  const productBySlug = products.find((p) => p.slug === id);
  return productBySlug;
}

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const product = getProductById(params.id);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://yourbrand.com";

  if (!product) {
    return {
      title: "Product Not Found | Luxe Couture",
      description: "The product you're looking for doesn't exist in our collection.",
    };
  }

  const productImage = product.images?.[0] || product.imageUrl || "/product-placeholder.jpg";
  const productDescription = product.description || product.longDescription || `Discover ${product.name} - ${product.category} from Luxe Couture. Premium luxury fashion with exceptional craftsmanship and timeless elegance.`;

  return {
    title: `${product.name} | ${product.category} | Luxe Couture`,
    description: productDescription,
    keywords: [
      product.name.toLowerCase(),
      product.category.toLowerCase(),
      "luxury fashion",
      "designer clothing",
      "premium quality",
      "luxe couture"
    ],
    openGraph: {
      title: `${product.name} | Luxe Couture`,
      description: productDescription,
      type: "website",
      url: `${siteUrl}/product/${params.id}`,
      images: [
        {
          url: productImage,
          width: 1200,
          height: 1200,
          alt: product.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} | Luxe Couture`,
      description: productDescription,
      images: [productImage],
    },
    alternates: {
      canonical: `/product/${params.id}`,
    },
  };
}

export default function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  const product = getProductById(params.id);

  if (!product) {
    return (
      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl font-serif text-gray-900 mb-4">
            Product Not Found
          </h1>
          <p className="text-gray-600 mb-8">
            The product you&apos;re looking for doesn&apos;t exist.
          </p>
          <Link
            href="/shop"
            aria-label="Return to shop page"
            className="text-gray-900 border-b border-gray-900 hover:text-gray-600 transition-colors"
          >
            Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  const breadcrumbSchema = generateBreadcrumbSchema(params.id, product.name);

  return (
    <>
      {/* Structured Data for SEO */}
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <nav className="mb-8 text-sm" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2 text-gray-600">
            <li>
              <Link 
                href="/" 
                aria-label="Go to home page"
                className="hover:text-gray-900 transition-colors"
              >
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link 
                href="/shop" 
                aria-label="Go to shop page"
                className="hover:text-gray-900 transition-colors"
              >
                Shop
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-gray-900" aria-current="page">{product.name}</li>
          </ol>
        </nav>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="relative aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg overflow-hidden">
            {product.imageUrl || product.images?.[0] ? (
              <Image
                src={product.images?.[0] || product.imageUrl || "/product-placeholder.jpg"}
                alt={product.name}
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

          {/* Product Details */}
          <div>
            <div className="mb-4">
              <span className="text-sm text-gray-600 uppercase tracking-wider">
                {product.category}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-serif text-gray-900 mb-6">
              {product.name}
            </h1>
            <p className="text-3xl font-light text-gray-900 mb-8">${product.price}</p>

            <div className="mb-8">
              <p className="text-gray-700 leading-relaxed mb-6">
                {product.description}
              </p>
            </div>

            {/* Size Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-900 mb-3 uppercase tracking-wider">
                Size
              </label>
              <div className="flex flex-wrap gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    className="px-6 py-3.5 border border-gray-300 hover:border-gray-900 hover:bg-gray-900 hover:text-white transition-colors duration-200 text-sm uppercase tracking-wider min-h-[44px] min-w-[44px] flex items-center justify-center"
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-900 mb-3 uppercase tracking-wider">
                Color
              </label>
              <div className="flex gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    className="px-6 py-3.5 border border-gray-300 hover:border-gray-900 transition-colors duration-200 text-sm uppercase tracking-wider min-h-[44px] min-w-[44px] flex items-center justify-center"
                  >
                    {color.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Add to Cart Button */}
            <button className="w-full bg-gray-900 text-white px-8 py-4 hover:bg-gray-800 transition-colors duration-200 text-sm uppercase tracking-wider font-medium mb-4 min-h-[44px]">
              Add to Cart
            </button>

            <button className="w-full border-2 border-gray-900 text-gray-900 px-8 py-4 hover:bg-gray-900 hover:text-white transition-colors duration-200 text-sm uppercase tracking-wider font-medium min-h-[44px]">
              Add to Wishlist
            </button>

            {/* Product Details */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <h3 className="text-lg font-serif text-gray-900 mb-4">
                Product Details
              </h3>
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
    </>
  );
}
