import Link from "next/link";

export const metadata = {
  title: "Order History | Lola Drip",
  description: "View your order history and track shipments.",
};

export default function OrdersPage() {
  return (
    <div className="min-h-screen bg-warm-50 py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-4xl font-bold text-warm-900 mb-8 font-playfair">
          Order History
        </h1>
        <div className="bg-white rounded-xl shadow-md p-8 text-center">
          <p className="text-warm-600 mb-6">
            You haven&apos;t placed any orders yet.
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center justify-center bg-warm-900 text-warm-50 px-8 py-4 hover:bg-gold-600 transition-colors duration-300 text-sm uppercase tracking-[0.15em] font-light"
          >
            Start Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
