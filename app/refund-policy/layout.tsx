import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Refund and Return Policy",
  description: "Lola Drip Refund and Return Policy - Learn about our 30-day return policy, eligibility requirements, and how to initiate a return or exchange.",
  openGraph: {
    title: "Refund and Return Policy | Lola Drip",
    description: "Lola Drip Refund and Return Policy - Learn about our 30-day return policy and how to initiate a return or exchange.",
    url: "/refund-policy",
  },
  alternates: {
    canonical: "/refund-policy",
  },
};

export default function RefundPolicyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
