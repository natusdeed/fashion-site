import type { Metadata } from "next";
import { getProductBySlug, getCategoryBySlug } from "@/data/products";

const SITE_URL = "https://loladrip.com";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const category = getCategoryBySlug(params.slug);
  if (category) {
    return {
      title: `${category.name} | Shop | Lola Drip`,
      description: `Shop ${category.name} at Lola Drip. Premium luxury fashion with exceptional craftsmanship and timeless elegance.`,
      openGraph: {
        title: `${category.name} | Lola Drip`,
        description: `Shop ${category.name} – luxury women's fashion.`,
        url: `${SITE_URL}/shop/${params.slug}`,
        siteName: "Lola Drip",
      },
      alternates: { canonical: `/shop/${params.slug}` },
    };
  }

  const product = getProductBySlug(params.slug);

  if (!product) {
    return {
      title: "Product Not Found",
      description: "The product you're looking for doesn't exist.",
    };
  }

  const productImage = product.images?.[0] || product.imageUrl || "/images/shop.header.png";
  const productDescription =
    product.description ||
    product.longDescription ||
    `Discover ${product.name} - ${product.category} at Lola Drip. Premium luxury fashion with exceptional craftsmanship and timeless elegance.`;
  const priceFormatted = `$${product.price.toLocaleString()}`;

  return {
    title: `${product.name} | ${product.category}`,
    description: productDescription,
    keywords: [
      product.name.toLowerCase(),
      product.category.toLowerCase(),
      "luxury fashion",
      "designer clothing",
      "premium quality",
      "Lola Drip",
      priceFormatted,
    ],
    openGraph: {
      title: `${product.name} | Lola Drip`,
      description: productDescription,
      type: "website",
      url: `${SITE_URL}/shop/${params.slug}`,
      images: [
        {
          url: productImage,
          width: 1200,
          height: 1200,
          alt: `${product.name} - ${product.category} - Lola Drip`,
        },
      ],
      siteName: "Lola Drip",
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} | ${priceFormatted} | Lola Drip`,
      description: productDescription,
      images: [productImage],
    },
    alternates: {
      canonical: `/shop/${params.slug}`,
    },
    other: {
      "product:price:amount": product.price.toString(),
      "product:price:currency": "USD",
      "product:availability": "in stock",
      "product:category": product.category,
    },
  };
}

export default function ProductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
