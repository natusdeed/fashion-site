import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

// Clean sans-serif for body text - optimized for luxury brand
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500", "600"],
});

// High-end serif for headings - luxury fashion brand typography
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "500", "600", "700", "900"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://yourbrand.com'),
  title: {
    default: "Luxe Couture | Luxury Women's Fashion & Designer Collections",
    template: "%s | Luxe Couture",
  },
  description: "Discover exquisite luxury women's fashion with our curated collection of designer dresses, elegant evening wear, and sophisticated ready-to-wear pieces. Premium quality, timeless elegance, and exceptional craftsmanship.",
  keywords: [
    "luxury fashion",
    "women's designer clothing",
    "high-end fashion",
    "luxury dresses",
    "designer women's wear",
    "premium fashion",
    "elegant evening wear",
    "sophisticated fashion",
    "luxury boutique",
    "couture fashion",
    "designer collections",
    "premium women's clothing"
  ],
  authors: [{ name: "Luxe Couture" }],
  creator: "Luxe Couture",
  publisher: "Luxe Couture",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Luxe Couture",
    title: "Luxe Couture | Luxury Women's Fashion & Designer Collections",
    description: "Discover exquisite luxury women's fashion with our curated collection of designer dresses, elegant evening wear, and sophisticated ready-to-wear pieces.",
    images: [
      {
        url: "/og-image.jpg", // You should add this image to your public folder
        width: 1200,
        height: 630,
        alt: "Luxe Couture - Luxury Women's Fashion",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Luxe Couture | Luxury Women's Fashion & Designer Collections",
    description: "Discover exquisite luxury women's fashion with our curated collection of designer dresses and elegant evening wear.",
    images: ["/og-image.jpg"], // You should add this image to your public folder
    creator: "@luxecouture", // Update with your actual Twitter handle
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Add your verification codes when available
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
    // bing: "your-bing-verification-code",
  },
  alternates: {
    canonical: "/",
  },
  category: "fashion",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="theme-color" content="#faf8f5" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${inter.variable} antialiased font-sans`}>
        <Navigation />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
