'use client';

import { useState } from 'react';
import { useCart } from '@/lib/cart-context';

export default function CheckoutButton() {
  const { cartItems } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleBuy = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: cartItems.map((item) => ({
            name: item.name,
            price: item.price,
            image: item.image,
            quantity: item.quantity,
            size: item.size,
            color: item.color,
          })),
        }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Checkout failed');
      }

      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error('No checkout URL received');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <button
        onClick={handleBuy}
        disabled={loading || cartItems.length === 0}
        className="w-full bg-warm-900 hover:bg-gold-600 disabled:bg-warm-400 disabled:cursor-not-allowed text-warm-50 font-medium py-4 px-6 rounded-lg transition-colors duration-300 uppercase tracking-[0.15em]"
      >
        {loading ? 'Redirecting...' : 'Checkout 💳'}
      </button>
      {error && (
        <p className="text-red-600 text-sm" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}