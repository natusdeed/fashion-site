import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shipping Policy",
  description: "Lola Drip Shipping Policy - Learn about our processing times, shipping rates, delivery estimates, and international shipping options.",
  openGraph: {
    title: "Shipping Policy | Lola Drip",
    description: "Lola Drip Shipping Policy - Learn about our processing times, shipping rates, and delivery estimates.",
    url: "/shipping-policy",
  },
  alternates: {
    canonical: "/shipping-policy",
  },
};

export default function ShippingPolicyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
