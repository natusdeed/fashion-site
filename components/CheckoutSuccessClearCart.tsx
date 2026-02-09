'use client';

import { useEffect } from 'react';
import { useCart } from '@/lib/cart-context';

/**
 * Clears the cart when the user lands on the checkout success page.
 * Renders nothing; used as a side-effect component.
 */
export default function CheckoutSuccessClearCart() {
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return null;
}
