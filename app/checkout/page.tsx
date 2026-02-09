'use client';

import CheckoutButton from '@/components/CheckoutButton';
import { useCart } from '@/lib/cart-context';
import Image from 'next/image';
import Link from 'next/link';

export default function CheckoutPage() {
  const { cartItems, getCartTotal } = useCart();
  const subtotal = getCartTotal();

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] bg-warm-50 px-4">
        <h1 className="text-3xl font-playfair font-normal text-warm-900 mb-4">
          Your cart is empty
        </h1>
        <p className="text-warm-600 mb-8 max-w-md text-center">
          Add items to your cart to checkout. Visit our shop to find your next favorite piece.
        </p>
        <Link
          href="/shop"
          className="inline-block bg-warm-900 text-warm-50 px-8 py-3 text-sm uppercase tracking-[0.15em] font-light hover:bg-gold-600 transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] bg-warm-50 px-4 py-12">
      <h1 className="text-3xl font-playfair font-normal text-warm-900 mb-8">Checkout</h1>

      <div className="w-full max-w-lg p-6 bg-white rounded-xl shadow-lg border border-warm-200">
        {/* Cart items */}
        <div className="space-y-4 mb-6">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex gap-4 p-4 bg-warm-50 rounded-lg border border-warm-200"
            >
              <div className="relative w-20 h-20 flex-shrink-0 bg-warm-100 rounded-lg overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="font-playfair text-warm-900 text-lg mb-1">{item.name}</h2>
                <p className="text-sm text-warm-600">
                  Size: {item.size} • Color: {item.color}
                </p>
                <p className="text-warm-900 font-medium mt-1">
                  ${(item.price * item.quantity).toLocaleString('en-US', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}{' '}
                  {item.quantity > 1 && (
                    <span className="text-warm-600 font-normal text-sm">
                      (${item.price.toFixed(2)} × {item.quantity})
                    </span>
                  )}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Order total */}
        <div className="flex justify-between items-center mb-6 pt-4 border-t border-warm-200">
          <span className="text-warm-700 font-light uppercase tracking-[0.1em] text-sm">
            Order total
          </span>
          <span className="font-playfair text-warm-900 text-xl">
            ${subtotal.toLocaleString('en-US', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </span>
        </div>

        <CheckoutButton />
      </div>
    </div>
  );
}
