import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Our Story | Lola Drip",
  description:
    "Lola Drip: our story, mission & values. Curated luxury women's fashion, timeless elegance & sustainable practices. Learn about our brand and commitment to quality.",
  keywords: [
    "about us",
    "our story",
    "fashion brand",
    "luxury fashion",
    "women's fashion brand",
    "fashion mission",
    "sustainable fashion",
  ],
  openGraph: {
    title: "About Us | Lola Drip - Our Story",
    description: "Discover the story behind Lola Drip. We are dedicated to curating the finest collection of women's fashion.",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "About Lola Drip",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us | Lola Drip",
    description: "Discover the story behind Lola Drip and our commitment to luxury fashion.",
  },
  alternates: {
    canonical: "/about",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
