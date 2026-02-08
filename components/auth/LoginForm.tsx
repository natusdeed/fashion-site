"use client";

import { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get("redirect") ?? "/account/dashboard";
  const isCheckoutRedirect = redirectPath.startsWith("/checkout");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  useEffect(() => {
    if (searchParams.get("registered") === "true") {
      setSuccess("Account created! Please sign in.");
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email: formData.email,
        password: formData.password,
      });

      if (result?.error) {
        setError("Invalid email or password");
        return;
      }

      router.push(redirectPath);
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    setGoogleLoading(true);
    setError("");
    signIn("google", { callbackUrl: redirectPath });
  };

  const handleGuestCheckout = () => {
    router.push("/checkout");
    router.refresh();
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-xl rounded-lg px-8 pt-6 pb-8 mb-4"
      >
        <h2 className="text-3xl font-bold text-center text-warm-900 mb-6 font-playfair">
          Sign In
        </h2>

        {success && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded mb-4 text-sm">
            {success}
          </div>
        )}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4 text-sm">
            {error}
          </div>
        )}

        {/* Google Sign In */}
        <button
          type="button"
          onClick={handleGoogleSignIn}
          disabled={googleLoading || loading}
          className="w-full flex items-center justify-center gap-3 py-3 px-4 mb-4 border-2 border-warm-200 rounded-lg hover:bg-warm-50 hover:border-warm-300 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" aria-hidden>
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          <span className="text-warm-700 font-medium">
            {googleLoading ? "Redirecting..." : "Continue with Google"}
          </span>
        </button>

        {/* Guest Checkout - shown when user came from checkout */}
        {isCheckoutRedirect && (
          <>
            <p className="text-sm text-warm-600 mb-3 text-center">
              Your cart is saved. No account needed to complete your purchase.
            </p>
            <button
              type="button"
              onClick={handleGuestCheckout}
              className="w-full py-3 px-4 mb-4 border-2 border-dashed border-gold-400 rounded-lg bg-gold-50/50 text-warm-900 hover:bg-gold-50 hover:border-gold-500 transition-colors duration-200 font-medium"
            >
              Continue as Guest — Checkout without signing in
            </button>
            <p className="text-center mb-4">
              <Link
                href="/shop"
                className="text-sm text-warm-500 hover:text-gold-600 underline"
              >
                Save cart & continue shopping later
              </Link>
            </p>
          </>
        )}

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-warm-200" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-warm-500">or sign in with email</span>
          </div>
        </div>

        <div className="mb-4">
          <label
            className="block text-warm-700 text-sm font-medium mb-2"
            htmlFor="email"
          >
            Email Address
          </label>
          <input
            id="email"
            type="email"
            required
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="shadow appearance-none border border-warm-200 rounded w-full py-2 px-3 text-warm-700 leading-tight focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent"
            placeholder="jane@example.com"
          />
        </div>

        <div className="mb-6">
          <label
            className="block text-warm-700 text-sm font-medium mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            required
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            className="shadow appearance-none border border-warm-200 rounded w-full py-2 px-3 text-warm-700 leading-tight focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent"
            placeholder="Enter your password"
          />
          <div className="text-right mt-2">
            <Link
              href="/auth/forgot-password"
              className="text-sm text-gold-600 hover:text-gold-700"
            >
              Forgot password?
            </Link>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-warm-900 hover:bg-gold-600 text-warm-50 font-medium py-3 px-4 rounded transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-[0.15em]"
        >
          {loading ? "Signing In..." : "Sign In"}
        </button>

        <div className="text-center mt-6 space-y-2">
          <p className="text-warm-600 text-sm">
            Don&apos;t have an account?{" "}
            <Link
              href={isCheckoutRedirect ? `/auth/register?redirect=${encodeURIComponent(redirectPath)}` : "/auth/register"}
              className="text-gold-600 hover:text-gold-700 font-semibold"
            >
              Create Account
            </Link>
          </p>
          {isCheckoutRedirect && (
            <p className="text-xs text-warm-500">
              Create an account to track orders and save your cart for later.
            </p>
          )}
        </div>
      </form>
    </div>
  );
}
