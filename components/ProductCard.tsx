import Link from "next/link";
import Image from "next/image";

interface ProductCardProps {
  id?: number;
  slug: string;
  name: string;
  price: number;
  category: string;
  imageUrl?: string;
  imageAlt?: string;
}

export default function ProductCard({
  slug,
  name,
  price,
  category,
  imageUrl,
  imageAlt,
}: ProductCardProps) {
  return (
    <Link 
      href={`/shop/${slug}`} 
      className="group block"
      aria-label={`View ${name} product details`}
    >
      <div className="mb-6 transition-all duration-500 ease-out group-hover:scale-[1.02] group-hover:shadow-lg">
        {/* Product Image */}
        <div className="relative aspect-[3/4] bg-gradient-to-br from-warm-50 to-warm-100 overflow-hidden mb-6 rounded-sm">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={imageAlt || name}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              loading="lazy"
              quality={85}
            />
          ) : (
            // Placeholder - Replace with actual image
            <div className="absolute inset-0 bg-warm-200 group-hover:scale-105 transition-transform duration-700 ease-out" />
          )}

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-warm-900/0 group-hover:bg-warm-900/5 transition-all duration-500" />

          {/* Quick view indicator */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <span className="text-xs text-warm-700 uppercase tracking-[0.2em] font-light bg-warm-50/95 px-4 py-2 rounded-sm shadow-sm border border-gold-300/20">
              View Details
            </span>
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-2">
          <p className="text-warm-500 text-xs uppercase tracking-[0.15em] font-light">
            {category}
          </p>
          <h3 className="text-warm-900 font-playfair text-lg font-normal tracking-[0.02em] group-hover:text-gold-600 transition-colors duration-300">
            {name}
          </h3>
          <p className="text-warm-700 text-sm font-light tracking-[0.05em] mt-3">
            ${price.toLocaleString()}
          </p>
        </div>
      </div>
    </Link>
  );
}
