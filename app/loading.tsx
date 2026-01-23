import LoadingSpinner from "@/components/LoadingSpinner";

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-warm-50">
      <div className="text-center">
        <LoadingSpinner size="lg" className="mb-4" />
        <p className="text-warm-600 font-light text-sm uppercase tracking-[0.1em]">
          Loading...
        </p>
      </div>
    </div>
  );
}
