import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Accessories | Fashion Jewelry, Handbags & More",
  description:
    "Shop Lola Drip accessories: handbags, purses, earrings, necklaces, bracelets, sunglasses, scarves & belts. Complete your look with our stunning collection.",
  openGraph: {
    title: "Accessories | Lola Drip - Fashion Jewelry & Handbags",
    description: "Complete your look with handbags, jewelry, sunglasses and more.",
    type: "website",
  },
};

export default function AccessoriesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
