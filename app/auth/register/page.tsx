import RegisterForm from "@/components/auth/RegisterForm";

export const metadata = {
  title: "Create Account | Lola Drip",
  description: "Create your Lola Drip account to shop, track orders, and save your favorites.",
};

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-warm-50 py-16 px-4">
      <RegisterForm />
    </div>
  );
}
