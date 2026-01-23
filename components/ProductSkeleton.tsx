"use client";

export default function ProductSkeleton() {
  return (
    <div className="group relative animate-pulse">
      {/* Image Skeleton */}
      <div className="relative aspect-[3/4] bg-gradient-to-br from-warm-100 to-warm-200 overflow-hidden mb-4 rounded-sm" />

      {/* Content Skeleton */}
      <div className="space-y-2">
        <div className="h-3 bg-warm-200 rounded w-1/3" />
        <div className="h-5 bg-warm-300 rounded w-2/3" />
        <div className="h-4 bg-warm-200 rounded w-1/4" />
      </div>
    </div>
  );
}

export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-10 lg:gap-12">
      {Array.from({ length: count }).map((_, index) => (
        <ProductSkeleton key={index} />
      ))}
    </div>
  );
}
