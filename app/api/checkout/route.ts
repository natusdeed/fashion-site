import { NextResponse } from 'next/server';
import Stripe from 'stripe';

// Base URL for Stripe redirects (must be absolute)
// Uses NEXT_PUBLIC_SITE_URL in prod, localhost:3002 for local dev (matches package.json dev script)
const getBaseUrl = () => {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return 'http://localhost:3002';
};

export async function POST() {
  const secretKey = process.env.STRIPE_SECRET_KEY?.trim();
  if (!secretKey) {
    return NextResponse.json(
      { error: 'Stripe is not configured. Add STRIPE_SECRET_KEY to .env.local' },
      { status: 500 }
    );
  }

  const stripe = new Stripe(secretKey);
  const baseUrl = getBaseUrl();

  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Super Cool T-Shirt',
              description: 'A stylish fashion piece from Lola Drip',
              images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400'],
            },
            unit_amount: 2000, // $20.00 in cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${baseUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/checkout`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error('Stripe checkout error:', err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Error creating checkout session' },
      { status: 500 }
    );
  }
}
