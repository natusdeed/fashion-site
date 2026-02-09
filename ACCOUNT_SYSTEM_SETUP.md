# Lola Drip – Account System Setup Guide

This guide covers the customer account system with authentication, user dashboard, and Stripe payment integration.

## What Was Implemented

### 1. Authentication (NextAuth.js v5 / Auth.js)
- **Register** – `/auth/register` – Create account with email/password
- **Login** – `/auth/login` – Sign in with credentials
- **Session** – JWT-based sessions (30 days)
- **Security** – bcrypt password hashing, protected routes

### 2. User Dashboard (`/account/dashboard`)
- Order history
- Address management
- Account settings
- Wishlist
- Payment methods
- Support links

### 3. Stripe Payment Integration
- Checkout at `/checkout`
- Payment Intent API for secure card processing
- Success page at `/checkout/success`
- Test card: `4242 4242 4242 4242`

### 4. Protected Routes (Middleware)
- `/account/dashboard`, `/account/orders`, `/account/addresses`, `/account/settings`, `/account/payment-methods`, `/checkout`
- Unauthenticated users are redirected to login with `?redirect=` param

---

## Setup Steps

### 1. Install Dependencies

Dependencies are already in `package.json`. Run:

```bash
npm install
```

### 2. Environment Variables

Copy `.env.example` to `.env.local` and fill in:

```env
# Database (PostgreSQL)
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"

# Auth – generate with: npx auth secret  OR  openssl rand -base64 32
AUTH_SECRET=your-super-secret-key-change-this-in-production
NEXTAUTH_URL=http://localhost:3002

# Stripe (https://dashboard.stripe.com/apikeys)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...  # For webhooks (optional)
```

**Database options:**
- [Vercel Postgres](https://vercel.com/storage/postgres) – free tier
- [Railway](https://railway.app) – free tier
- [Supabase](https://supabase.com) – free tier

**Google Sign-In (optional):**
1. Go to [Google Cloud Console → Credentials](https://console.cloud.google.com/apis/credentials)
2. Create project (or select existing) → **Create Credentials** → **OAuth client ID**
3. Application type: **Web application**
4. Add Authorized redirect URI: `http://localhost:3002/api/auth/callback/google` (for dev) or `https://yoursite.com/api/auth/callback/google` (for production)
5. Copy the **Client ID** and **Client Secret** into `.env.local`:
   ```env
   AUTH_GOOGLE_ID=your-client-id.apps.googleusercontent.com
   AUTH_GOOGLE_SECRET=your-client-secret
   ```
6. Restart the dev server. The "Continue with Google" button will appear when configured.

### 3. Database Setup

```bash
# Generate Prisma client
npx prisma generate

# Create and run migrations
npx prisma migrate dev --name init

# Optional: open Prisma Studio to view data
npx prisma studio
```

### 4. Run the App

```bash
npm run dev
```

App runs at **http://localhost:3002**.

---

## Quick Test Flow

1. Go to `/auth/register` and create an account.
2. Sign in at `/auth/login`.
3. Open `/account/dashboard`.
4. Visit `/checkout` (Stripe test mode).
5. Use test card: `4242 4242 4242 4242`.

---

## File Structure

```
├── auth.ts                          # NextAuth config
├── middleware.ts                    # Protected routes
├── prisma/
│   └── schema.prisma                # Database schema
├── lib/
│   ├── prisma.ts                    # Prisma client singleton
│   └── stripe.ts                    # Stripe server SDK
├── app/
│   ├── api/auth/
│   │   ├── [...nextauth]/route.ts   # Auth API routes
│   │   └── register/route.ts        # Registration API
│   ├── api/create-payment-intent/route.ts
│   ├── auth/
│   │   ├── login/page.tsx
│   │   ├── register/page.tsx
│   │   └── forgot-password/page.tsx
│   ├── account/
│   │   ├── dashboard/page.tsx
│   │   ├── orders/page.tsx
│   │   ├── addresses/page.tsx
│   │   ├── settings/page.tsx
│   │   └── payment-methods/page.tsx
│   └── checkout/
│       ├── page.tsx
│       └── success/page.tsx
├── components/
│   ├── auth/RegisterForm.tsx
│   ├── auth/LoginForm.tsx
│   ├── checkout/CheckoutForm.tsx
│   ├── providers/SessionProvider.tsx
│   └── AccountNavLink.tsx           # User dropdown in nav
└── types/next-auth.d.ts             # Session type extensions
```

---

## Next Steps (Optional)

1. **Connect checkout to cart** – Replace the sample amount and items in `/checkout` with cart data from `CartContext`.
2. **Order creation** – Add an API route to create orders after successful Stripe payment.
3. **Stripe webhooks** – Add `/api/webhooks/stripe` for payment confirmation and order updates.
4. **Address CRUD** – Implement full address add/edit/delete.
5. **Password reset** – Finish the forgot-password flow with email verification.

---

## Security Notes

- Passwords are hashed with bcrypt (12 rounds).
- JWT sessions are used instead of database sessions for speed.
- Protected routes are enforced by middleware.
- Stripe keys are server-side only; never expose the secret key.
- Use `AUTH_SECRET` in production and keep it random (32+ chars).
