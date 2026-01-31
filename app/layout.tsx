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
import DebugErrorHandler from "@/components/DebugErrorHandler";

// Dynamic imports for modals - code splitting for better performance.
// No custom loading component in root layout (Server Component) to avoid "e[o] is not a function" during RSC serialization.
const NewsletterPopup = dynamic(
  () => import("@/components/NewsletterPopup"),
  { ssr: false }
);
const CartDrawer = dynamic(() => import("@/components/CartDrawer"), { ssr: false });
const QuickViewModal = dynamic(() => import("@/components/QuickViewModal"), { ssr: false });

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
  metadataBase: new URL("https://loladrip.com"),
  title: {
    default: "Lola Drip - Luxury Women's Fashion | Designer Dresses & Elegant Clothing",
    template: "%s | Lola Drip",
  },
  description:
    "Lola Drip: luxury women's fashion e-commerce. Shop designer dresses, elegant clothing, evening wear & accessories. Free shipping on orders over $200. Premium quality, timeless style.",
  keywords: [
    "luxury fashion",
    "women's clothing",
    "designer dresses",
    "elegant fashion",
    "premium clothing",
    "evening wear",
    "cocktail dresses",
    "luxury accessories",
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
    url: "https://loladrip.com",
    title: "Lola Drip - Luxury Women's Fashion",
    description: "Lola Drip: premium women's fashion, designer dresses, evening wear & luxury accessories. Free shipping on orders over $200. Elegant, timeless pieces.",
    siteName: "Lola Drip",
    images: [
      {
        url: "/images/header.banner.png",
        width: 1200,
        height: 630,
        alt: "Lola Drip Luxury Fashion",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lola Drip - Luxury Women's Fashion",
    description: "Premium women's fashion and elegant clothing",
    images: ["/images/header.banner.png"],
    creator: "@loladrip",
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
  ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ||
  process.env.NEXT_PUBLIC_YANDEX_VERIFICATION
    ? {
        verification: {
          ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION && {
            google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
          }),
          ...(process.env.NEXT_PUBLIC_YANDEX_VERIFICATION && {
            yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION,
          }),
        },
      }
    : {}),
  alternates: {
    canonical: "/",
    // hreflang for international SEO: x-default + current locale; add more when you have multiple languages
    languages: {
      "x-default": "https://loladrip.com",
      en: "https://loladrip.com",
    },
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
        {/* Favicon: add your own icon to public/ and uncomment: <link rel="icon" href="/favicon.ico" /> */}
        {/* Preload critical hero image for better LCP (local banner) */}
        <link rel="preload" as="image" href="/images/header.banner.png" />
        {/* LLM-specific meta tags for AI search (ChatGPT, Claude, Perplexity, Bing Chat) */}
        <meta name="ai-content" content="luxury-fashion-ecommerce" />
        <meta name="ai-description" content="Lola Drip offers premium women's fashion: designer dresses, evening wear, luxury accessories. Free shipping on orders over $200. Elegant, timeless pieces for the modern woman." />
        <meta name="ai-keywords" content="luxury, fashion, women, elegant, designer, dresses, evening wear, accessories, Lola Drip" />
        {/* Structured data (JSON-LD) for rich snippets - Organization & WebSite with Search */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Lola Drip",
              url: "https://loladrip.com",
              logo: "https://loladrip.com/logo.svg",
              description:
                "Luxury women's fashion - designer dresses, elegant clothing, and premium accessories. Free shipping on orders over $200.",
              sameAs: [
                "https://twitter.com/loladrip",
                "https://www.instagram.com/loladrip",
                "https://www.facebook.com/loladrip",
              ],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Lola Drip",
              url: "https://loladrip.com",
              description:
                "Shop premium women's fashion at Lola Drip. Discover elegant dresses, sophisticated evening wear, and luxury accessories.",
              publisher: {
                "@type": "Organization",
                name: "Lola Drip",
                url: "https://loladrip.com",
              },
              potentialAction: {
                "@type": "SearchAction",
                target: {
                  "@type": "EntryPoint",
                  urlTemplate: "https://loladrip.com/search?q={search_term_string}",
                },
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
      </head>
      <body className={`${inter.variable} antialiased font-sans`}>
        <DebugErrorHandler />
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
