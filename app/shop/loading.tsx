import LoadingSpinner from "@/components/LoadingSpinner";

export default function Loading() {
  return (
    <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <LoadingSpinner size="lg" className="mb-4" />
            <p className="text-warm-600 font-light text-sm uppercase tracking-[0.1em]">
              Loading products...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
