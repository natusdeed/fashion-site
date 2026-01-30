import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Product Video Showcase - Demo | Lola Drip",
  description: "Explore different video implementations for product displays on Lola Drip. See how videos enhance the shopping experience with hover effects, galleries, and background videos.",
};

export default function VideoDemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
