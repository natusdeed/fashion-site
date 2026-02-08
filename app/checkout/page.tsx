"use client";

import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "@/components/checkout/CheckoutForm";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? ""
);

export default function CheckoutPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login?redirect=/checkout");
    }
  }, [status, router]);

  useEffect(() => {
    if (session) {
      fetch("/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: 99.99,
          items: [{ id: "temp", name: "Sample Item" }],
        }),
      })
        .then((res) => res.json())
        .then((data) => setClientSecret(data.clientSecret ?? ""));
    }
  }, [session]);

  if (status === "loading" || !clientSecret) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-warm-50">
        <div className="text-xl text-warm-600">Loading checkout...</div>
      </div>
    );
  }

  const appearance = {
    theme: "stripe" as const,
    variables: {
      colorPrimary: "#D4AF37",
    },
  };

  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="min-h-screen bg-warm-50 py-12 px-4">
      <div className="container mx-auto max-w-2xl">
        <h1 className="text-4xl font-bold text-center text-warm-900 mb-8 font-playfair">
          Checkout
        </h1>
        {clientSecret && stripePromise && (
          <Elements options={options} stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
        )}
      </div>
    </div>
  );
}
