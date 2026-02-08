import Link from "next/link";

export const metadata = {
  title: "Account Settings | Lola Drip",
  description: "Update your account information.",
};

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-warm-50 py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-4xl font-bold text-warm-900 mb-8 font-playfair">
          Account Settings
        </h1>
        <div className="bg-white rounded-xl shadow-md p-8 text-center">
          <p className="text-warm-600 mb-6">
            Update your name, email, or password.
          </p>
          <p className="text-warm-500 text-sm mb-6">
            Settings management coming soon.
          </p>
          <Link
            href="/account/dashboard"
            className="inline-flex items-center justify-center border-2 border-warm-900 text-warm-900 px-8 py-4 hover:bg-warm-900 hover:text-warm-50 transition-colors duration-300 text-sm uppercase tracking-[0.15em] font-light"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
