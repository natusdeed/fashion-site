import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about Luxe Couture - where fashion meets artistry and sophistication. Discover our mission to empower women through luxury fashion, quality craftsmanship, and timeless elegance. Committed to ethical and sustainable fashion practices.",
  openGraph: {
    title: "About Luxe Couture | Our Story & Values",
    description: "Learn about Luxe Couture - where fashion meets artistry and sophistication. Discover our mission, values, and commitment to luxury fashion.",
    url: "/about",
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
  return <>{children}</>;
}
