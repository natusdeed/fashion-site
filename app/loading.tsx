/**
 * Lightweight loading UI for faster perceived navigation.
 * Hero-like skeleton gives instant feedback instead of a blocking spinner.
 */
export default function Loading() {
  return (
    <div className="min-h-screen bg-warm-50">
      {/* Hero skeleton - matches home page structure for seamless transition */}
      <div className="relative h-screen bg-gradient-to-br from-warm-200 to-warm-100 animate-pulse" />
      {/* Content skeleton */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="h-8 bg-warm-200/60 rounded w-1/3 mx-auto mb-8 animate-pulse" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="aspect-[3/4] bg-warm-200/60 rounded-sm mb-4" />
              <div className="h-3 bg-warm-200/60 rounded w-1/3 mb-2" />
              <div className="h-5 bg-warm-200/60 rounded w-2/3" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
