import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Search Products | Find Your Style | Lola Drip",
  description: "Search our premium fashion collection. Find the perfect piece that matches your style. Filter by category, price, and availability.",
  keywords: [
    "search fashion",
    "find products",
    "fashion search",
    "product search",
  ],
  alternates: {
    canonical: "/search",
  },
  robots: {
    index: false, // Don't index search result pages to avoid duplicate content
    follow: true,
  },
};

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
