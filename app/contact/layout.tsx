import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with Luxe Couture. Have questions about our luxury fashion collections? Contact us via email, phone, or visit our store. We're here to help you find the perfect piece.",
  openGraph: {
    title: "Contact Luxe Couture | Get in Touch",
    description: "Get in touch with Luxe Couture. Have questions about our luxury fashion collections? Contact us today.",
    url: "/contact",
  },
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
