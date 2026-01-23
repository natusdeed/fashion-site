import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Get in Touch with Lola Drip",
  description: "Get in touch with Lola Drip. We're here to help with any questions about our fashion collection, orders, or styling advice. Reach out to our team today.",
  keywords: [
    "contact",
    "customer service",
    "fashion support",
    "style advice",
    "order help",
  ],
  openGraph: {
    title: "Contact Us | Lola Drip",
    description: "Get in touch with Lola Drip. We're here to help with any questions about our fashion collection.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Contact Us | Lola Drip",
    description: "Get in touch with Lola Drip for fashion inquiries and support.",
  },
  alternates: {
    canonical: "/contact",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
