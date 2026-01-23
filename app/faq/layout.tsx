import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description: "Lola Drip FAQ - Find answers to common questions about orders, shipping, returns, exchanges, products, sizing, and payments.",
  openGraph: {
    title: "Frequently Asked Questions | Lola Drip",
    description: "Lola Drip FAQ - Find answers to common questions about orders, shipping, returns, and more.",
    url: "/faq",
  },
  alternates: {
    canonical: "/faq",
  },
};

export default function FAQLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
