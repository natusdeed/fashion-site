import Link from "next/link";
import { auth } from "@/auth";

export default async function AccountPage() {
  const session = await auth();

  if (session?.user) {
    return (
      <div className="pt-32 pb-40 px-6 lg:px-8 bg-warm-50 min-h-screen">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-playfair text-warm-900 mb-6 font-normal">
            My Account
          </h1>
          <p className="text-warm-600 mb-10 font-light leading-relaxed text-lg">
            Welcome back, {session.user.name ?? "there"}! Manage your orders,
            addresses, and preferences.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/account/dashboard"
              className="inline-flex items-center justify-center bg-warm-900 text-warm-50 px-8 py-4 hover:bg-gold-600 transition-colors duration-300 text-sm uppercase tracking-[0.15em] font-light min-h-[44px]"
            >
              Go to Dashboard
            </Link>
            <Link
              href="/shop"
              className="inline-flex items-center justify-center border-2 border-warm-900 text-warm-900 px-8 py-4 hover:bg-warm-900 hover:text-warm-50 transition-colors duration-300 text-sm uppercase tracking-[0.15em] font-light min-h-[44px]"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-40 px-6 lg:px-8 bg-warm-50 min-h-screen">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-playfair text-warm-900 mb-6 font-normal">
          My Account
        </h1>
        <p className="text-warm-600 mb-10 font-light leading-relaxed text-lg">
          Sign in to your account to view orders, manage addresses, and access
          your wishlist.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/auth/login"
            className="inline-flex items-center justify-center bg-warm-900 text-warm-50 px-8 py-4 hover:bg-gold-600 transition-colors duration-300 text-sm uppercase tracking-[0.15em] font-light min-h-[44px]"
          >
            Sign In
          </Link>
          <Link
            href="/auth/register"
            className="inline-flex items-center justify-center border-2 border-warm-900 text-warm-900 px-8 py-4 hover:bg-warm-900 hover:text-warm-50 transition-colors duration-300 text-sm uppercase tracking-[0.15em] font-light min-h-[44px]"
          >
            Create Account
          </Link>
          <Link
            href="/shop"
            className="inline-flex items-center justify-center border border-warm-300 text-warm-700 px-8 py-4 hover:bg-warm-100 transition-colors duration-300 text-sm uppercase tracking-[0.15em] font-light min-h-[44px]"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
