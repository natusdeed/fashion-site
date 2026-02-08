import Link from "next/link";

export const metadata = {
  title: "Forgot Password | Lola Drip",
  description: "Reset your password.",
};

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen bg-warm-50 py-16 px-4">
      <div className="max-w-md mx-auto text-center">
        <h1 className="text-3xl font-bold text-warm-900 mb-4 font-playfair">
          Forgot Password
        </h1>
        <p className="text-warm-600 mb-6">
          Password reset functionality coming soon. Please contact support for
          assistance.
        </p>
        <Link
          href="/auth/login"
          className="text-gold-600 hover:text-gold-700 font-semibold"
        >
          Back to Sign In
        </Link>
      </div>
    </div>
  );
}
