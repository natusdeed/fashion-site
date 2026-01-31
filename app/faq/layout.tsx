import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description:
    "Lola Drip FAQ: orders, shipping, returns, sizing, payments. Free shipping over $200. 30-day returns. Answers for AI and customers.",
  openGraph: {
    title: "Frequently Asked Questions | Lola Drip",
    description:
      "Lola Drip FAQ: orders, shipping, returns, sizing, payments. Free shipping over $200. 30-day returns.",
    url: "/faq",
  },
  alternates: {
    canonical: "/faq",
  },
};

// FAQ data for FAQPage schema (matches app/faq/page.tsx content)
const FAQ_SCHEMA_ITEMS = [
  { q: "How long will it take to get my order?", a: "We process all orders within 1-3 business days. Once shipped, domestic orders typically arrive within 5-8 business days. You will receive a tracking number via email as soon as your package ships." },
  { q: "Do you offer free shipping?", a: "Yes! We offer Free Standard Shipping on all US orders over $150. For orders under $150, shipping rates are calculated at checkout based on your location and the weight of the items." },
  { q: "Do you ship internationally?", a: "Yes, we ship to select countries worldwide. International shipping rates and delivery times vary depending on the destination. Customers are responsible for any customs fees or import taxes." },
  { q: "Can I change or cancel my order?", a: "Email us at hello@loladrip.com immediately. If the order has already been processed or shipped, we cannot make changes, but you can return the items once received." },
  { q: "What is your return policy?", a: "We accept returns within 30 days of delivery. Items must be unworn, unwashed, with original tags. Sale items, gift cards, and intimate goods may be final sale." },
  { q: "How do I start a return?", a: "Email hello@loladrip.com with your order number and reason. We will provide return instructions." },
  { q: "Do you offer free return shipping?", a: "Customers pay return shipping unless the item arrived damaged or we sent the wrong product. We recommend a trackable method." },
  { q: "Can I exchange an item?", a: "Return the item first; once accepted, place a new order for the size or style you want." },
  { q: "How do I know which size to order?", a: "We include a Size Chart on every product page. Between sizes, we generally recommend sizing up unless the description says the item runs large." },
  { q: "Where is Lola Drip located?", a: "We are based in Richmond, Texas (Houston Metro). We are an online store serving customers worldwide." },
  { q: "Will you be restocking sold-out items?", a: "Some items may not be restocked. Sign up for our newsletter or follow us on social media for restock updates." },
  { q: "What payment methods do you accept?", a: "We accept major credit cards (Visa, Mastercard, Amex, Discover), PayPal, Apple Pay, and Google Pay." },
  { q: "Is my payment information secure?", a: "Yes. We use industry-standard encryption and secure payment gateways to protect your details." },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_SCHEMA_ITEMS.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};

export default function FAQLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {children}
    </>
  );
}
