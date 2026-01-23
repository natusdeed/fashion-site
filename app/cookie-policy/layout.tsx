import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "Lola Drip Cookie Policy - Learn how we use cookies and similar technologies on our website, and how you can control them.",
  openGraph: {
    title: "Cookie Policy | Lola Drip",
    description: "Lola Drip Cookie Policy - Learn how we use cookies and similar technologies on our website.",
    url: "/cookie-policy",
  },
  alternates: {
    canonical: "/cookie-policy",
  },
};

export default function CookiePolicyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
