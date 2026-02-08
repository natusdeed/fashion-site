"use client";

import { useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setIsLoading(true);
    setMessage(null);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/checkout/success`,
      },
    });

    if (error?.type === "card_error" || error?.type === "validation_error") {
      setMessage(error.message ?? "An error occurred");
    } else if (error) {
      setMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-xl rounded-lg p-8"
    >
      <PaymentElement className="mb-6" />

      <button
        disabled={isLoading || !stripe || !elements}
        className="w-full bg-warm-900 hover:bg-gold-600 text-warm-50 font-medium py-4 px-4 rounded transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-[0.15em]"
      >
        <span>{isLoading ? "Processing..." : "Pay Now"}</span>
      </button>

      {message && (
        <div className="mt-4 text-red-600 text-center text-sm">{message}</div>
      )}
    </form>
  );
}
