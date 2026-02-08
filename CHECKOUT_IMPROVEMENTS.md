# Checkout & Login Improvements

## What Was Added

### 1. **Google Sign-In** ⭐ Best for conversion
- One-click sign-in with Google OAuth
- No password to remember; faster checkout for returning users
- Add to `.env.local`:
  ```
  AUTH_GOOGLE_ID=your-google-client-id
  AUTH_GOOGLE_SECRET=your-google-client-secret
  ```
- **Setup:** [Google Cloud Console](https://console.cloud.google.com/apis/credentials) → Create OAuth 2.0 Client ID (Web application) → Add redirect URI: `https://yoursite.com/api/auth/callback/google`

### 2. **Guest Checkout** ⭐ Reduces abandoned carts
- Checkout no longer requires login
- Middleware allows `/checkout` for unauthenticated users
- On the login page (when redirected from checkout): "Continue as Guest" button
- Stripe collects email at checkout — no account needed

### 3. **Abandoned Cart Solutions**
- **Cart persistence:** Cart is saved in `localStorage` (already existed)
- **"Save cart & continue shopping later"** — Link on login page when coming from checkout
- **"Create account to track orders"** — Encourages registration while preserving checkout flow

### 4. **Database Migration**
The `User.password` field is now optional (for OAuth users like Google).

**Run when DATABASE_URL is set:**
```bash
npx prisma migrate dev --name make_password_optional_for_oauth
```

Or for production:
```bash
npx prisma migrate deploy
```

## Files Changed

- `auth.ts` — Added Google provider
- `prisma/schema.prisma` — `password` is now optional
- `components/auth/LoginForm.tsx` — Google button, guest checkout, improved UX
- `components/auth/RegisterForm.tsx` — Preserves redirect param
- `middleware.ts` — Allows guest checkout at `/checkout`
- `.env.example` — Google OAuth env vars documented
