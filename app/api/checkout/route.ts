import { NextResponse } from 'next/server';
import Stripe from 'stripe';

// Base URL for Stripe redirects (must be absolute)
// Uses NEXT_PUBLIC_SITE_URL in prod, localhost:3002 for local dev (matches package.json dev script)
const getBaseUrl = () => {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return 'http://localhost:3002';
};

// Ensure image URL is absolute for Stripe
function toAbsoluteImageUrl(image: string, baseUrl: string): string {
  if (!image) return '';
  if (image.startsWith('http://') || image.startsWith('https://')) return image;
  return `${baseUrl.replace(/\/$/, '')}${image.startsWith('/') ? image : `/${image}`}`;
}

interface CheckoutItem {
  name: string;
  price: number;
  image: string;
  quantity: number;
  size?: string;
  color?: string;
}

export async function POST(request: Request) {
  const secretKey = process.env.STRIPE_SECRET_KEY?.trim();
  if (!secretKey) {
    return NextResponse.json(
      { error: 'Stripe is not configured. Add STRIPE_SECRET_KEY to .env.local' },
      { status: 500 }
    );
  }

  const baseUrl = getBaseUrl();
  let items: CheckoutItem[] = [];

  try {
    const body = await request.json();
    items = body?.items ?? [];
  } catch {
    // Empty body or invalid JSON
  }

  if (items.length === 0) {
    return NextResponse.json(
      { error: 'Your cart is empty. Add items to checkout.' },
      { status: 400 }
    );
  }

  const stripe = new Stripe(secretKey);

  try {
    const line_items = items.map((item) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.name,
          description: [item.size && `Size: ${item.size}`, item.color && `Color: ${item.color}`]
            .filter(Boolean)
            .join(' • ') || 'Lola Drip',
          images: (() => {
            const url = item.image ? toAbsoluteImageUrl(item.image, baseUrl) : '';
            return url ? [url] : undefined;
          })(),
        },
        unit_amount: Math.round(item.price * 100), // $ to cents
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: 'payment',
      payment_method_types: ['card'],
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
