import Link from "next/link";
import CheckoutSuccessClearCart from "@/components/CheckoutSuccessClearCart";

export const metadata = {
  title: "Order Confirmed | Lola Drip",
  description: "Your order has been placed successfully.",
};

export default function CheckoutSuccessPage() {
  return (
    <div className="min-h-screen bg-warm-50 py-16 px-4 flex items-center justify-center">
      <CheckoutSuccessClearCart />
      <div className="max-w-md text-center">
        <div className="text-6xl mb-6">✓</div>
        <h1 className="text-3xl font-bold text-warm-900 mb-4 font-playfair">
          Thank You for Your Order!
        </h1>
        <p className="text-warm-600 mb-8">
          Your payment was successful. You will receive an order confirmation
          email shortly.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/account/orders"
            className="inline-flex items-center justify-center bg-warm-900 text-warm-50 px-8 py-4 hover:bg-gold-600 transition-colors duration-300 text-sm uppercase tracking-[0.15em] font-light min-h-[44px]"
          >
            View Orders
          </Link>
          <Link
            href="/shop"
            className="inline-flex items-center justify-center border-2 border-warm-900 text-warm-900 px-8 py-4 hover:bg-warm-900 hover:text-warm-50 transition-colors duration-300 text-sm uppercase tracking-[0.15em] font-light min-h-[44px]"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
