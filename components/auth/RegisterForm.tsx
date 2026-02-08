"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

export default function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get("redirect") ?? "/account/dashboard";
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.error || "Registration failed");
      }

      router.push(`/auth/login?registered=true&redirect=${encodeURIComponent(redirectPath)}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
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
          Create Account
        </h2>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4 text-sm">
            {error}
          </div>
        )}

        <div className="mb-4">
          <label
            className="block text-warm-700 text-sm font-medium mb-2"
            htmlFor="name"
          >
            Full Name
          </label>
          <input
            id="name"
            type="text"
            required
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
            className="shadow appearance-none border border-warm-200 rounded w-full py-2 px-3 text-warm-700 leading-tight focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent"
            placeholder="Jane Doe"
          />
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

        <div className="mb-4">
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
            placeholder="Min. 8 characters"
          />
        </div>

        <div className="mb-6">
          <label
            className="block text-warm-700 text-sm font-medium mb-2"
            htmlFor="confirmPassword"
          >
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            type="password"
            required
            value={formData.confirmPassword}
            onChange={(e) =>
              setFormData({ ...formData, confirmPassword: e.target.value })
            }
            className="shadow appearance-none border border-warm-200 rounded w-full py-2 px-3 text-warm-700 leading-tight focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent"
            placeholder="Re-enter password"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-warm-900 hover:bg-gold-600 text-warm-50 font-medium py-3 px-4 rounded transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-[0.15em]"
        >
          {loading ? "Creating Account..." : "Create Account"}
        </button>

        <div className="text-center mt-6">
          <p className="text-warm-600 text-sm">
            Already have an account?{" "}
            <Link
              href={redirectPath ? `/auth/login?redirect=${encodeURIComponent(redirectPath)}` : "/auth/login"}
              className="text-gold-600 hover:text-gold-700 font-semibold"
            >
              Sign In
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
