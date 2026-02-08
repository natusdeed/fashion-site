import LoginForm from "@/components/auth/LoginForm";

export const metadata = {
  title: "Sign In | Lola Drip",
  description: "Sign in to your Lola Drip account to manage orders and preferences.",
};

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-warm-50 py-16 px-4">
      <LoginForm />
    </div>
  );
}
