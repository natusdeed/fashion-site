import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop | Premium Women's Fashion Collection",
  description:
    "Shop Lola Drip: designer dresses, evening wear, tops, bottoms & outerwear. Premium women's fashion, $299–$1,299. Free shipping on orders over $200.",
  keywords: [
    "women's fashion",
    "fashion collection",
    "premium clothing",
    "designer dresses",
    "ready-to-wear",
    "fashion boutique",
    "luxury fashion",
    "women's clothing",
  ],
  openGraph: {
    title: "Shop | Lola Drip - Premium Women's Fashion",
    description: "Shop Lola Drip: designer dresses, evening wear, tops, bottoms & outerwear. Premium women's fashion. Free shipping on orders over $200.",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Lola Drip Shop Collection",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shop | Lola Drip",
    description: "Browse our complete collection of premium women's fashion.",
  },
  alternates: {
    canonical: "/shop",
  },
};

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
