import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Virtual Try-On | Lola Drip",
  description:
    "See how Lola Drip products look on AI influencers. Upload a model image and product image to generate stunning virtual try-on previews. Powered by AI.",
};

export default function VirtualTryOnLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
