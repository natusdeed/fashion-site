import type { Metadata } from "next";
import { getProductBySlug, getCategoryBySlug } from "@/data/products";
import { getAccessoryBySlug, getAccessoryCategoryBySlug } from "@/data/accessories";

const SITE_URL = "https://loladrip.com";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  // Accessory category (handbags, purses, etc.) or "accessories" = all
  const accessoryCategory = getAccessoryCategoryBySlug(slug) || (slug === "accessories" ? { slug: "accessories", name: "Accessories" } : null);
  if (accessoryCategory) {
    return {
      title: `${accessoryCategory.name} | Shop | Lola Drip`,
      description: `Shop ${accessoryCategory.name} at Lola Drip. Premium luxury accessories with exceptional craftsmanship and timeless elegance.`,
      openGraph: {
        title: `${accessoryCategory.name} | Lola Drip`,
        description: `Shop ${accessoryCategory.name} – luxury accessories.`,
        url: `${SITE_URL}/shop/${slug}`,
        siteName: "Lola Drip",
      },
      alternates: { canonical: `/shop/${slug}` },
    };
  }

  // Accessory product
  const accessory = getAccessoryBySlug(slug);
  if (accessory) {
    const imageUrl = accessory.image.startsWith("http")
      ? accessory.image
      : `${SITE_URL}/images/placeholder-product.svg`;
    return {
      title: `${accessory.name} | ${accessory.category} | Lola Drip`,
      description: accessory.description,
      openGraph: {
        title: `${accessory.name} | Lola Drip`,
        description: accessory.description,
        type: "website",
        url: `${SITE_URL}/shop/${slug}`,
        images: [{ url: imageUrl, width: 1200, height: 1200, alt: accessory.name }],
        siteName: "Lola Drip",
      },
      alternates: { canonical: `/shop/${slug}` },
    };
  }

  const category = getCategoryBySlug(slug);
  if (category) {
    return {
      title: `${category.name} | Shop | Lola Drip`,
      description: `Shop ${category.name} at Lola Drip. Premium luxury fashion with exceptional craftsmanship and timeless elegance.`,
      openGraph: {
        title: `${category.name} | Lola Drip`,
        description: `Shop ${category.name} – luxury women's fashion.`,
        url: `${SITE_URL}/shop/${slug}`,
        siteName: "Lola Drip",
      },
      alternates: { canonical: `/shop/${slug}` },
    };
  }

  const product = getProductBySlug(slug);

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
      url: `${SITE_URL}/shop/${slug}`,
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
      canonical: `/shop/${slug}`,
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
