'use client';

import { useState } from 'react';

export default function CheckoutButton() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleBuy = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/checkout', { method: 'POST' });
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
        disabled={loading}
        className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-lg transition-all"
      >
        {loading ? 'Redirecting...' : 'Buy Now 💳'}
      </button>
      {error && (
        <p className="text-red-600 text-sm" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}