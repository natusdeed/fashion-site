import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Lola Drip Privacy Policy - Learn how we collect, use, disclose, and safeguard your personal information when you visit our website or make a purchase.",
  openGraph: {
    title: "Privacy Policy | Lola Drip",
    description: "Lola Drip Privacy Policy - Learn how we collect, use, disclose, and safeguard your personal information.",
    url: "/privacy-policy",
  },
  alternates: {
    canonical: "/privacy-policy",
  },
};

export default function PrivacyPolicyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
