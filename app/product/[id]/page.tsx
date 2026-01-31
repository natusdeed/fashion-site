import Link from "next/link";
import type { Metadata } from "next";
import { getAllProducts } from "@/data/products";
import Script from "next/script";
import ProductPageContent from "@/components/ProductPageContent";

// Structured data for breadcrumbs (SEO)
function generateBreadcrumbSchema(id: string, productName: string) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://loladrip.com";
  
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
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://loladrip.com";

  if (!product) {
    return {
      title: "Product Not Found | Lola Drip",
      description: "The product you're looking for doesn't exist in our collection.",
    };
  }

  const productImage = product.images?.[0] || product.imageUrl || "/images/shop.header.png";
  const productDescription = product.description || product.longDescription || `Discover ${product.name} - ${product.category} at Lola Drip. Premium luxury fashion with exceptional craftsmanship and timeless elegance.`;

  return {
    title: `${product.name} | ${product.category} | Lola Drip`,
    description: productDescription,
    keywords: [
      product.name.toLowerCase(),
      product.category.toLowerCase(),
      "luxury fashion",
      "designer clothing",
      "premium quality",
      "Lola Drip"
    ],
    openGraph: {
      title: `${product.name} | Lola Drip`,
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
      title: `${product.name} | Lola Drip`,
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
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <ProductPageContent product={product} />
    </>
  );
}
