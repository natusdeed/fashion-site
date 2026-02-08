"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login?redirect=/account/dashboard");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-warm-50">
        <div className="text-xl text-warm-600">Loading...</div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  const dashboardLinks = [
    {
      href: "/account/orders",
      icon: "📦",
      title: "My Orders",
      desc: "View order history and track shipments",
      color: "text-gold-600",
    },
    {
      href: "/account/addresses",
      icon: "📍",
      title: "Addresses",
      desc: "Manage shipping addresses",
      color: "text-gold-600",
    },
    {
      href: "/account/settings",
      icon: "⚙️",
      title: "Settings",
      desc: "Update your account information",
      color: "text-gold-600",
    },
    {
      href: "/wishlist",
      icon: "❤️",
      title: "Wishlist",
      desc: "View your saved items",
      color: "text-gold-600",
    },
    {
      href: "/account/payment-methods",
      icon: "💳",
      title: "Payment Methods",
      desc: "Manage your payment options",
      color: "text-gold-600",
    },
    {
      href: "/contact",
      icon: "💬",
      title: "Support",
      desc: "Get help with your orders",
      color: "text-gold-600",
    },
  ];

  return (
    <div className="min-h-screen bg-warm-50 py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Welcome Header */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-4xl font-bold text-warm-900 mb-2 font-playfair">
                Welcome back, {session.user?.name ?? "there"}!
              </h1>
              <p className="text-warm-600">{session.user?.email}</p>
            </div>
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="bg-warm-900 hover:bg-gold-600 text-warm-50 px-6 py-3 rounded transition-colors duration-300 text-sm uppercase tracking-[0.15em] font-light"
            >
              Sign Out
            </button>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dashboardLinks.map((link) => (
            <Link href={link.href} key={link.href} className="group">
              <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-all h-full border border-warm-100 hover:border-gold-200">
                <div className={`text-4xl mb-4 ${link.color}`}>{link.icon}</div>
                <h3 className="text-xl font-bold text-warm-800 mb-2 group-hover:text-gold-600 transition-colors">
                  {link.title}
                </h3>
                <p className="text-warm-600 text-sm">{link.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
