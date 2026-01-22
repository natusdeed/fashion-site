import type { Metadata } from "next";
import { getProductBySlug } from "@/data/products";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const product = getProductBySlug(params.slug);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://yourbrand.com";

  if (!product) {
    return {
      title: "Product Not Found",
      description: "The product you're looking for doesn't exist.",
    };
  }

  const productImage = product.images?.[0] || product.imageUrl || "/product-placeholder.jpg";
  const productDescription = product.description || product.longDescription || `Discover ${product.name} - ${product.category} from Luxe Couture. Premium luxury fashion with exceptional craftsmanship and timeless elegance.`;
  const priceFormatted = `$${product.price.toLocaleString()}`;

  return {
    title: `${product.name} | ${product.category} | Luxe Couture`,
    description: productDescription,
    keywords: [
      product.name.toLowerCase(),
      product.category.toLowerCase(),
      "luxury fashion",
      "designer clothing",
      "premium quality",
      "luxe couture",
      priceFormatted,
    ],
    openGraph: {
      title: `${product.name} | Luxe Couture`,
      description: productDescription,
      type: "website",
      url: `${siteUrl}/shop/${params.slug}`,
      images: [
        {
          url: productImage,
          width: 1200,
          height: 1200,
          alt: product.name,
        },
      ],
      siteName: "Luxe Couture",
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} | ${priceFormatted} | Luxe Couture`,
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
