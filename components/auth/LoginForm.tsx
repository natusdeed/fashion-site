"use client";

import { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

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

      const redirect = searchParams.get("redirect") ?? "/account/dashboard";
      router.push(redirect);
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
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

        <div className="text-center mt-6">
          <p className="text-warm-600 text-sm">
            Don&apos;t have an account?{" "}
            <Link
              href="/auth/register"
              className="text-gold-600 hover:text-gold-700 font-semibold"
            >
              Create Account
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
