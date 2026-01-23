import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Lola Drip Terms of Service - Review our terms and conditions for using our website and purchasing products. Understand your rights and obligations when shopping with us.",
  openGraph: {
    title: "Terms of Service | Lola Drip",
    description: "Lola Drip Terms of Service - Review our terms and conditions for using our website and purchasing products.",
    url: "/terms-of-service",
  },
  alternates: {
    canonical: "/terms-of-service",
  },
};

export default function TermsOfServiceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
