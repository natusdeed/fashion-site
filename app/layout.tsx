import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import MobileBottomNav from "@/components/MobileBottomNav";
import { ToastProvider } from "@/lib/toast-context";
import { CartProvider } from "@/lib/cart-context";
import { QuickViewProvider } from "@/lib/quickview-context";
import { WishlistProvider } from "@/lib/wishlist-context";
import PageTransition from "@/components/animations/PageTransition";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import Analytics from "@/components/Analytics";

// Dynamic imports for modals - code splitting for better performance
// These components are loaded only when needed (below the fold or on interaction)
const NewsletterPopup = dynamic(() => import("@/components/NewsletterPopup"), {
  ssr: false, // No SSR needed for popup
  loading: () => null, // No loading state needed
});

const CartDrawer = dynamic(() => import("@/components/CartDrawer"), {
  ssr: false, // No SSR needed for drawer
  loading: () => null, // No loading state needed
});

const QuickViewModal = dynamic(() => import("@/components/QuickViewModal"), {
  ssr: false, // No SSR needed for modal
  loading: () => null, // No loading state needed
});

// Primary font for logo & headings - luxury serif
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap", // Prevents invisible text during font load
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
  preload: true, // Preload critical font
  fallback: ["Georgia", "serif"],
});

// Secondary font for body & navigation - clean sans-serif
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap", // Prevents invisible text during font load
  weight: ["400", "500", "600"],
  preload: true, // Preload critical font
  fallback: ["system-ui", "-apple-system", "sans-serif"],
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
        {/* Preconnect to external domains for faster resource loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        {/* Favicon and App Icons - Add actual icon files to public folder */}
        <link rel="icon" href="/favicon.ico" />
        {/* Preload critical hero image for better LCP (local banner) */}
        <link rel="preload" as="image" href="/images/header-banner.png" />
      </head>
      <body className={`${inter.variable} antialiased font-sans`}>
        <Suspense fallback={null}>
          <Analytics />
        </Suspense>
        <ErrorBoundary>
          <ToastProvider>
            <CartProvider>
              <WishlistProvider>
                <QuickViewProvider>
                  <Navigation />
                  <PageTransition>
                    <main className="min-h-screen pb-16 md:pb-0">{children}</main>
                  </PageTransition>
                  <Footer />
                  <MobileBottomNav />
                  <NewsletterPopup />
                  <CartDrawer />
                  <QuickViewModal />
                </QuickViewProvider>
              </WishlistProvider>
            </CartProvider>
          </ToastProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
