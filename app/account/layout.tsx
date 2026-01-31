import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Account | Lola Drip",
  description:
    "Your Lola Drip account. Manage orders, wishlist, and preferences. Contact us for support.",
  openGraph: {
    title: "Account | Lola Drip",
    description: "Your Lola Drip account and preferences.",
    type: "website",
  },
  alternates: {
    canonical: "/account",
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
