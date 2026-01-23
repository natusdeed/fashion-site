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
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://loladrip.com'),
  title: {
    default: "Lola Drip | Modern Women's Fashion & Premium Collections",
    template: "%s | Lola Drip",
  },
  description: "Discover modern women's fashion with Lola Drip. Curated collection of designer pieces, elegant styles, and premium quality clothing. Timeless elegance meets contemporary style.",
  keywords: [
    "women's fashion",
    "modern fashion",
    "premium clothing",
    "designer dresses",
    "women's clothing",
    "fashion boutique",
    "contemporary fashion",
    "style",
    "fashion collections",
    "women's wear"
  ],
  authors: [{ name: "Lola Drip" }],
  creator: "Lola Drip",
  publisher: "Lola Drip",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Lola Drip",
    title: "Lola Drip | Modern Women's Fashion & Premium Collections",
    description: "Discover modern women's fashion with Lola Drip. Curated collection of designer pieces and premium quality clothing.",
    images: [
      {
        url: "/og-image.jpg", // You should add this image to your public folder
        width: 1200,
        height: 630,
        alt: "Lola Drip - Modern Women's Fashion",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lola Drip | Modern Women's Fashion & Premium Collections",
    description: "Discover modern women's fashion with Lola Drip. Curated collection of designer pieces and premium quality clothing.",
    images: ["/og-image.jpg"], // You should add this image to your public folder
    creator: "@loladrip", // Update with your actual Twitter handle
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
