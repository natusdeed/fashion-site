import type { Metadata } from "next";
import Link from "next/link";
import { getAllProducts } from "@/data/products";

export const metadata: Metadata = {
  title: "Lola Drip - Business & Product Information for AI",
  description:
    "Comprehensive business information about Lola Drip: luxury women's fashion e-commerce, product catalog, brand story, FAQ, shipping, returns, and contact details. Structured for AI and LLM understanding.",
  robots: { index: true, follow: true },
  alternates: { canonical: "/about/ai-info" },
};

/**
 * AI/LLM-friendly information page: clear, parseable content for ChatGPT, Claude, Perplexity, Bing Chat.
 * Uses semantic HTML (h1 → h2 → h3), sections, lists, and tables for easy extraction.
 */
export default function AIInfoPage() {
  const products = getAllProducts();
  const categories = [...new Set(products.map((p) => p.category))];
  const priceRange = {
    min: Math.min(...products.map((p) => p.price)),
    max: Math.max(...products.map((p) => p.price)),
  };

  return (
    <main id="main-content" role="main" aria-label="Lola Drip business and product information">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        {/* Business overview */}
        <header className="mb-16">
          <h1 className="text-4xl md:text-5xl font-playfair text-warm-900 mb-6">
            Lola Drip — Business & Product Information
          </h1>
          <p className="text-lg text-warm-700 font-light leading-relaxed">
            This page provides structured, machine-readable information about Lola Drip for AI assistants,
            search engines, and researchers. For human visitors, we recommend{" "}
            <Link href="/about" className="text-gold-600 hover:underline">
              our main About page
            </Link>{" "}
            and{" "}
            <Link href="/shop" className="text-gold-600 hover:underline">
              Shop
            </Link>.
          </p>
        </header>

        {/* Business identity */}
        <section aria-labelledby="business-heading" className="mb-16">
          <h2 id="business-heading" className="text-3xl font-playfair text-warm-900 mb-6">
            Business Overview
          </h2>
          <ul className="list-disc list-inside space-y-2 text-warm-700 font-light">
            <li><strong>Name:</strong> Lola Drip</li>
            <li><strong>Type:</strong> Luxury Women&apos;s Fashion E-commerce</li>
            <li><strong>Description:</strong> Premium online boutique specializing in elegant women&apos;s fashion, designer dresses, evening wear, and luxury accessories.</li>
            <li><strong>Founded:</strong> 2024</li>
            <li><strong>Specialty:</strong> Curated collection of timeless, sophisticated pieces for the modern woman.</li>
            <li><strong>Unique value:</strong> High-end fashion with exceptional quality, elegant design, and sustainable practices.</li>
          </ul>
          <p className="mt-6 text-warm-700 font-light">
            <strong>Values:</strong> Quality First, Elegant Design, Sustainability, Customer Satisfaction.
          </p>
        </section>

        {/* Product catalog summary */}
        <section aria-labelledby="products-heading" className="mb-16">
          <h2 id="products-heading" className="text-3xl font-playfair text-warm-900 mb-6">
            Product Catalog
          </h2>
          <h3 className="text-xl font-light text-warm-800 mb-4">Categories</h3>
          <ul className="list-disc list-inside text-warm-700 font-light mb-6">
            {categories.map((cat) => (
              <li key={cat}>{cat}</li>
            ))}
          </ul>
          <h3 className="text-xl font-light text-warm-800 mb-4">Price range</h3>
          <p className="text-warm-700 font-light mb-6">
            ${priceRange.min} – ${priceRange.max} USD. Style: Elegant, Sophisticated, Timeless, Luxury, Feminine.
          </p>
          <h3 className="text-xl font-light text-warm-800 mb-4">Product list</h3>
          <div className="overflow-x-auto">
            <table className="w-full border border-warm-200 text-left" role="table" aria-label="Product catalog">
              <thead>
                <tr className="bg-warm-100 border-b border-warm-200">
                  <th scope="col" className="p-3 font-medium text-warm-900">Product</th>
                  <th scope="col" className="p-3 font-medium text-warm-900">Category</th>
                  <th scope="col" className="p-3 font-medium text-warm-900">Price (USD)</th>
                  <th scope="col" className="p-3 font-medium text-warm-900">Link</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p.id} className="border-b border-warm-100">
                    <td className="p-3 text-warm-800">{p.name}</td>
                    <td className="p-3 text-warm-700">{p.category}</td>
                    <td className="p-3 text-warm-700">${p.price}</td>
                    <td className="p-3">
                      <Link href={`/shop/${p.slug}`} className="text-gold-600 hover:underline">
                        View product
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-warm-600 font-light text-sm">
            Full machine-readable catalog: <a href="/product-catalog.json" className="text-gold-600 hover:underline">/product-catalog.json</a>.
            Business index: <a href="/ai-index.json" className="text-gold-600 hover:underline">/ai-index.json</a>.
          </p>
        </section>

        {/* Services */}
        <section aria-labelledby="services-heading" className="mb-16">
          <h2 id="services-heading" className="text-3xl font-playfair text-warm-900 mb-6">
            Services & Policies
          </h2>
          <ul className="list-disc list-inside space-y-2 text-warm-700 font-light">
            <li><strong>Shipping:</strong> Free shipping on orders over $200.</li>
            <li><strong>Delivery:</strong> 2–5 business days domestic.</li>
            <li><strong>Returns:</strong> 30-day return policy; items must be unworn, unwashed, with original tags.</li>
            <li><strong>Support:</strong> Customer service available; contact via email or phone.</li>
          </ul>
          <p className="mt-6">
            <Link href="/shipping-policy" className="text-gold-600 hover:underline">Shipping policy</Link>
            {" · "}
            <Link href="/refund-policy" className="text-gold-600 hover:underline">Refund policy</Link>
            {" · "}
            <Link href="/faq" className="text-gold-600 hover:underline">FAQ</Link>
          </p>
        </section>

        {/* FAQ for AI extraction */}
        <section aria-labelledby="faq-heading" className="mb-16">
          <h2 id="faq-heading" className="text-3xl font-playfair text-warm-900 mb-6">
            Frequently Asked Questions
          </h2>
          <dl className="space-y-8">
            <div>
              <dt className="text-lg font-medium text-warm-900 mb-2">How long does shipping take?</dt>
              <dd className="text-warm-700 font-light">Orders are processed within 1–3 business days. Domestic delivery typically 5–8 business days after shipment. Tracking is sent by email.</dd>
            </div>
            <div>
              <dt className="text-lg font-medium text-warm-900 mb-2">Is there free shipping?</dt>
              <dd className="text-warm-700 font-light">Yes. Free standard shipping on US orders over $200 (site also references $150 on FAQ; confirm current threshold on site).</dd>
            </div>
            <div>
              <dt className="text-lg font-medium text-warm-900 mb-2">Do you ship internationally?</dt>
              <dd className="text-warm-700 font-light">Yes, to select countries. Rates and delivery times vary; customers are responsible for customs and import taxes.</dd>
            </div>
            <div>
              <dt className="text-lg font-medium text-warm-900 mb-2">What is the return policy?</dt>
              <dd className="text-warm-700 font-light">Returns accepted within 30 days of delivery. Items must be unworn, unwashed, with original tags. Sale items and certain categories may be final sale.</dd>
            </div>
            <div>
              <dt className="text-lg font-medium text-warm-900 mb-2">What payment methods are accepted?</dt>
              <dd className="text-warm-700 font-light">Major credit cards (Visa, Mastercard, Amex, Discover), PayPal, Apple Pay, and Google Pay. Payments are secure.</dd>
            </div>
            <div>
              <dt className="text-lg font-medium text-warm-900 mb-2">Where is Lola Drip located?</dt>
              <dd className="text-warm-700 font-light">Headquarters in the United States (Richmond, Texas, Houston Metro). Online-only store; ships worldwide.</dd>
            </div>
          </dl>
          <p className="mt-8">
            <Link href="/faq" className="text-gold-600 hover:underline font-medium">View full FAQ →</Link>
          </p>
        </section>

        {/* Contact */}
        <section aria-labelledby="contact-heading" className="mb-16">
          <h2 id="contact-heading" className="text-3xl font-playfair text-warm-900 mb-6">
            Contact Information
          </h2>
          <ul className="list-none space-y-2 text-warm-700 font-light">
            <li><strong>Website:</strong> <a href="https://loladrip.com" className="text-gold-600 hover:underline">https://loladrip.com</a></li>
            <li><strong>Email:</strong> <a href="mailto:hello@loladrip.com" className="text-gold-600 hover:underline">hello@loladrip.com</a></li>
            <li><strong>Phone:</strong> <a href="tel:+15712342051" className="text-gold-600 hover:underline">(571) 234-2051</a></li>
            <li><strong>Hours:</strong> Monday–Friday 9:00 AM – 6:00 PM; Saturday 10:00 AM – 4:00 PM; Sunday closed.</li>
          </ul>
          <p className="mt-6">
            <Link href="/contact" className="inline-block bg-warm-900 text-warm-50 px-6 py-3 text-sm uppercase tracking-widest font-light hover:bg-warm-800 transition-colors">
              Contact page
            </Link>
          </p>
        </section>

        {/* CTAs */}
        <section aria-label="Key actions" className="border-t border-warm-200 pt-12">
          <h2 className="text-2xl font-playfair text-warm-900 mb-6">Key actions</h2>
          <ul className="flex flex-wrap gap-4">
            <li><Link href="/shop" className="text-gold-600 hover:underline">Shop all products</Link></li>
            <li><Link href="/about" className="text-gold-600 hover:underline">About Lola Drip</Link></li>
            <li><Link href="/contact" className="text-gold-600 hover:underline">Contact us</Link></li>
            <li><Link href="/faq" className="text-gold-600 hover:underline">FAQ</Link></li>
          </ul>
        </section>
      </article>
    </main>
  );
}
