import Link from "next/link";
import type { Metadata } from "next";
// #region agent log
if (typeof window === 'undefined') { fetch('http://127.0.0.1:7244/ingest/03c008b9-73dd-4259-8e28-9e129667c391',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'app/page.tsx:3',message:'Page module loading',data:{timestamp:Date.now()},sessionId:'debug-session',runId:'startup',hypothesisId:'B'})}).catch(()=>{}); }
// #endregion
import Hero from "@/components/Hero";
// #region agent log
if (typeof window === 'undefined') { fetch('http://127.0.0.1:7244/ingest/03c008b9-73dd-4259-8e28-9e129667c391',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'app/page.tsx:5',message:'Hero component imported',data:{heroImported:!!Hero,timestamp:Date.now()},sessionId:'debug-session',runId:'startup',hypothesisId:'C'})}).catch(()=>{}); }
// #endregion

export const metadata: Metadata = {
  title: "Luxury Women's Fashion | Designer Collections & Premium Clothing",
  description: "Welcome to Luxe Couture - your destination for exclusive luxury women's fashion. Explore our curated collection of designer evening gowns, sophisticated ready-to-wear pieces, and premium accessories. Handcrafted elegance, exceptional quality, and timeless style for the modern woman.",
  keywords: [
    "luxury fashion",
    "designer women's clothing",
    "evening wear",
    "luxury dresses",
    "premium fashion boutique",
    "high-end women's fashion",
    "designer collections"
  ],
  openGraph: {
    title: "Luxe Couture | Luxury Women's Fashion & Designer Collections",
    description: "Discover exclusive luxury women's fashion with handcrafted elegance and exceptional quality. Shop designer evening gowns, sophisticated ready-to-wear, and premium accessories.",
    url: "/",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Luxe Couture - Luxury Women's Fashion Collection",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Luxe Couture | Luxury Women's Fashion & Designer Collections",
    description: "Discover exclusive luxury women's fashion with handcrafted elegance and exceptional quality.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  // #region agent log
  if (typeof window === 'undefined') { fetch('http://127.0.0.1:7244/ingest/03c008b9-73dd-4259-8e28-9e129667c391',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'app/page.tsx:42',message:'Home component rendering',data:{timestamp:Date.now()},sessionId:'debug-session',runId:'startup',hypothesisId:'B'})}).catch(()=>{}); }
  // #endregion
  return (
    <div className="pt-24">
      <Hero />
      
      {/* Featured Collections Section */}
      <section className="py-40 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-32">
            <h2 
              className="text-4xl md:text-5xl lg:text-6xl font-playfair mb-8 font-normal tracking-[0.05em] relative inline-block text-white"
              style={{
                textShadow: '0 0 20px rgba(255, 255, 255, 0.16), 0 0 40px rgba(255, 255, 255, 0.12), 0 0 60px rgba(255, 255, 255, 0.08), 0 0 80px rgba(255, 255, 255, 0.06)',
                filter: 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.1)) drop-shadow(0 0 20px rgba(255, 255, 255, 0.08)) drop-shadow(0 0 30px rgba(255, 255, 255, 0.06))',
                animation: 'whiteGlow 2s ease-in-out infinite alternate',
              }}
            >
              Discover Our Collections
            </h2>
            <p className="text-warm-600 max-w-2xl mx-auto font-light text-sm tracking-[0.1em] uppercase">
              Curated pieces that celebrate elegance and sophistication
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
            {[
              { 
                title: "Evening Wear", 
                description: "Timeless elegance for special occasions",
                image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80"
              },
              { 
                title: "Ready to Wear", 
                description: "Effortless sophistication for everyday",
                image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80"
              },
              { 
                title: "Accessories", 
                description: "The perfect finishing touches",
                image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=80"
              },
            ].map((item, index) => (
              <div
                key={index}
                className="group relative overflow-hidden aspect-[3/4] transition-all duration-500 ease-out hover:scale-[1.02] hover:shadow-xl rounded-sm"
              >
                <div 
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                  style={{
                    backgroundImage: `url('${item.image}')`,
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-warm-900/80 via-warm-900/40 to-transparent" />
                <div className="absolute inset-0 bg-warm-900/0 group-hover:bg-warm-900/10 transition-all duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-10 lg:p-12 transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="text-2xl font-playfair text-warm-50 mb-4 font-normal tracking-[0.05em] group-hover:text-gold-300 transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-warm-100 text-sm mb-8 font-light leading-relaxed">
                    {item.description}
                  </p>
                  <Link
                    href="/shop"
                    aria-label={`Explore ${item.title} collection`}
                    className="group/link inline-flex items-center text-warm-50 border-b border-warm-200 pb-1 hover:border-gold-400 transition-all duration-300 text-xs uppercase tracking-[0.2em] font-light hover:scale-105"
                  >
                    Explore
                    <svg
                      className="ml-2 w-4 h-4 transform group-hover/link:translate-x-1 transition-transform duration-300"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-40 px-6 lg:px-8 bg-warm-50 border-t border-warm-200/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-playfair text-warm-900 mb-12 font-normal tracking-[0.05em]">
            Experience Luxury Fashion
          </h2>
          <p className="text-warm-600 mb-16 text-sm font-light tracking-[0.1em] uppercase max-w-2xl mx-auto leading-relaxed">
            Join our exclusive community and be the first to discover new collections
          </p>
          <Link
            href="/shop"
            aria-label="Explore our complete luxury fashion collection"
            className="group inline-flex items-center text-warm-900 border border-warm-900 px-10 py-4 hover:bg-warm-900 hover:text-warm-50 transition-all duration-300 text-xs uppercase tracking-[0.2em] font-light hover:scale-105 hover:shadow-lg rounded-sm hover:border-gold-500/30"
          >
            Explore Collection
            <svg
              className="ml-3 w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
}
