export interface Product {
  id: number;
  slug: string;
  name: string;
  price: number;
  originalPrice?: number; // For sale items
  isOnSale?: boolean; // Flag to indicate if product is on sale
  category: string;
  imageUrl?: string;
  imageAlt?: string;
  videoUrl?: string; // Optional video URL for product hover preview
  description: string;
  longDescription?: string;
  sizes: string[];
  colors: Array<{ name: string; value: string }>;
  images?: string[];
}

export const products: Product[] = [
  {
    id: 1,
    slug: "elegant-silk-dress",
    name: "Elegant Silk Dress",
    price: 499,
    originalPrice: 599,
    isOnSale: true,
    category: "Dresses",
    imageUrl: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&q=80",
    imageAlt: "Elegant Silk Dress - Dresses - Lola Drip",
    videoUrl: "https://videos.pexels.com/video-files/3045163/3045163-hd_1920_1080_25fps.mp4",
    description:
      "An exquisite silk dress that embodies timeless elegance. Crafted from the finest Italian silk, this piece features delicate draping and sophisticated tailoring.",
    longDescription:
      "This stunning dress is a masterpiece of luxury fashion. The flowing silhouette is designed to flatter every figure, while the premium silk fabric feels luxurious against the skin.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Midnight Black", value: "#1a1a1a" },
      { name: "Navy", value: "#1e3a5f" },
      { name: "Burgundy", value: "#722f37" },
    ],
    images: [
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&q=80",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80",
    ],
  },
  {
    id: 2,
    slug: "luxury-trench-coat",
    name: "Luxury Trench Coat",
    price: 549,
    category: "Outerwear",
    imageUrl: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800&q=80",
    imageAlt: "Luxury Trench Coat - Outerwear - Lola Drip",
    videoUrl: "https://videos.pexels.com/video-files/3045163/3045163-hd_1920_1080_25fps.mp4",
    description:
      "A luxurious trench coat that combines classic sophistication with modern elegance. This timeless piece is perfect for any season.",
    longDescription:
      "Crafted from premium materials, this trench coat features a tailored silhouette that flatters every figure. The double-breasted design and belted waist create a refined, structured look.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Camel", value: "#c19a6b" },
      { name: "Black", value: "#1a1a1a" },
      { name: "Navy", value: "#1e3a5f" },
    ],
    images: ["https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800&q=80"],
  },
  {
    id: 3,
    slug: "lace-cocktail-dress",
    name: "Lace Cocktail Dress",
    price: 399,
    originalPrice: 499,
    isOnSale: true,
    category: "Dresses",
    imageUrl: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80",
    imageAlt: "Lace Cocktail Dress - Dresses - Lola Drip",
    description:
      "An elegant lace cocktail dress that perfectly balances femininity and sophistication. The intricate lace detailing makes this a standout piece.",
    longDescription:
      "This beautiful cocktail dress features delicate hand-crafted lace overlays that create a romantic, ethereal aesthetic. The fitted bodice and flowing skirt create a timeless silhouette.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Ivory", value: "#faf8f3" },
      { name: "Black", value: "#1a1a1a" },
      { name: "Dusty Rose", value: "#c49a9a" },
    ],
    images: ["https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80"],
  },
  {
    id: 4,
    slug: "velvet-blazer",
    name: "Velvet Blazer",
    price: 449,
    category: "Tops",
    imageUrl: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80",
    imageAlt: "Velvet Blazer - Tops - Lola Drip",
    videoUrl: "https://videos.pexels.com/video-files/3044083/3044083-hd_1920_1080_25fps.mp4",
    description:
      "A luxurious velvet blazer that adds a touch of opulence to any ensemble. The rich texture and structured cut make this piece perfect for formal occasions.",
    longDescription:
      "This sophisticated blazer features premium velvet fabric that catches the light beautifully. The tailored fit and sharp lapels give it a modern, professional edge.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Emerald Green", value: "#064e3b" },
      { name: "Burgundy", value: "#722f37" },
      { name: "Navy", value: "#1e3a5f" },
    ],
    images: ["https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80"],
  },
  {
    id: 5,
    slug: "satin-maxi-dress",
    name: "Satin Maxi Dress",
    price: 479,
    originalPrice: 599,
    isOnSale: true,
    category: "Dresses",
    imageUrl: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800&q=80",
    imageAlt: "Satin Maxi Dress - Dresses - Lola Drip",
    description:
      "A flowing satin maxi dress that embodies effortless elegance. The luxurious fabric and graceful silhouette create a stunning, feminine look.",
    longDescription:
      "This beautiful maxi dress features premium satin fabric that drapes beautifully and moves with you. The V-neckline and flowing skirt create a flattering, romantic silhouette.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Midnight Blue", value: "#1e293b" },
      { name: "Sage Green", value: "#6b9080" },
      { name: "Dusty Rose", value: "#c49a9a" },
    ],
    images: ["https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800&q=80"],
  },
  {
    id: 6,
    slug: "wool-tailored-pants",
    name: "Wool Tailored Pants",
    price: 349,
    category: "Bottoms",
    imageUrl: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80",
    imageAlt: "Wool Tailored Pants - Bottoms - Lola Drip",
    description:
      "Classic wool tailored pants that combine comfort with sophisticated style. Perfect for the modern professional wardrobe.",
    longDescription:
      "Crafted from premium wool blend, these tailored pants feature a straight-leg silhouette that's both contemporary and classic.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Charcoal", value: "#374151" },
      { name: "Navy", value: "#1e3a5f" },
      { name: "Black", value: "#1a1a1a" },
    ],
    images: ["https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80"],
  },
  {
    id: 7,
    slug: "chiffon-blouse",
    name: "Chiffon Blouse",
    price: 299,
    originalPrice: 399,
    isOnSale: true,
    category: "Tops",
    imageUrl: "https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=800&q=80",
    imageAlt: "Chiffon Blouse - Tops - Lola Drip",
    description:
      "An elegant chiffon blouse with delicate details that adds sophistication to any outfit. The lightweight fabric makes it perfect for any setting.",
    longDescription:
      "This beautiful blouse features soft, flowing chiffon that moves gracefully. The classic design with subtle details makes it versatile enough to pair with anything.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Ivory", value: "#faf8f3" },
      { name: "Blush Pink", value: "#f4d5d5" },
      { name: "Navy", value: "#1e3a5f" },
    ],
    images: ["https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=800&q=80"],
  },
  {
    id: 8,
    slug: "leather-midi-skirt",
    name: "Leather Midi Skirt",
    price: 429,
    category: "Bottoms",
    imageUrl: "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=800&q=80",
    imageAlt: "Leather Midi Skirt - Bottoms - Lola Drip",
    description:
      "A stylish leather midi skirt that adds edge to any outfit. The high-quality leather and flattering midi length create a sophisticated look.",
    longDescription:
      "This contemporary midi skirt features premium genuine leather with a subtle sheen. The A-line silhouette and midi length create a flattering, modern look.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Black", value: "#1a1a1a" },
      { name: "Cognac", value: "#8b4513" },
    ],
    images: ["https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=800&q=80"],
  },
  {
    id: 9,
    slug: "embroidered-jacket",
    name: "Embroidered Jacket",
    price: 579,
    category: "Outerwear",
    imageUrl: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=800&q=80",
    imageAlt: "Embroidered Jacket - Outerwear - Lola Drip",
    description:
      "A stunning embroidered jacket featuring intricate hand-stitched details. This statement piece combines traditional craftsmanship with contemporary design.",
    longDescription:
      "This exquisite jacket features hand-embroidered floral motifs that showcase traditional craftsmanship. The structured silhouette and premium fabric create a luxurious piece.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Ivory", value: "#faf8f3" },
      { name: "Navy", value: "#1e3a5f" },
    ],
    images: ["https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=800&q=80"],
  },
  {
    id: 10,
    slug: "silk-wrap-dress",
    name: "Silk Wrap Dress",
    price: 459,
    originalPrice: 549,
    isOnSale: true,
    category: "Dresses",
    imageUrl: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&q=80",
    imageAlt: "Silk Wrap Dress - Dresses - Lola Drip",
    description:
      "A flattering silk wrap dress that adapts to your figure perfectly. The timeless wrap design and luxurious silk fabric create an effortlessly elegant look.",
    longDescription:
      "This classic wrap dress features premium silk fabric that feels luxurious against the skin. The wrap design creates a flattering V-neckline and adjustable fit.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Floral Print", value: "#f4d5d5" },
      { name: "Navy", value: "#1e3a5f" },
      { name: "Black", value: "#1a1a1a" },
    ],
    images: ["https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&q=80"],
  },
  {
    id: 11,
    slug: "tweed-blazer",
    name: "Tweed Blazer",
    price: 519,
    category: "Tops",
    imageUrl: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80",
    imageAlt: "Tweed Blazer - Tops - Lola Drip",
    description:
      "A classic tweed blazer that embodies timeless sophistication. The textured fabric and structured silhouette make this a versatile wardrobe staple.",
    longDescription:
      "This elegant blazer features premium tweed fabric with a subtle texture that adds depth and interest. The tailored fit and classic design make it perfect for any occasion.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Herringbone Gray", value: "#6b7280" },
      { name: "Camel", value: "#c19a6b" },
      { name: "Navy", value: "#1e3a5f" },
    ],
    images: ["https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80"],
  },
  {
    id: 12,
    slug: "organza-evening-gown",
    name: "Organza Evening Gown",
    price: 589,
    originalPrice: 699,
    isOnSale: true,
    category: "Evening Wear",
    imageUrl: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80",
    imageAlt: "Organza Evening Gown - Evening Wear - Lola Drip",
    description:
      "A breathtaking organza evening gown that captures the essence of luxury and romance. The layered fabric and elegant design create a truly special piece.",
    longDescription:
      "This stunning evening gown features layers of delicate organza that create movement and dimension. The elegant design with its flowing silhouette makes this gown perfect for special occasions.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Ivory", value: "#faf8f3" },
      { name: "Midnight Black", value: "#1a1a1a" },
      { name: "Dusty Rose", value: "#c49a9a" },
    ],
    images: ["https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80"],
  },
  {
    id: 13,
    slug: "premium-cashmere-t-shirt",
    name: "Premium Cashmere T-Shirt",
    price: 299,
    category: "Tops",
    imageUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80",
    imageAlt: "Premium Cashmere T-Shirt - Tops - Lola Drip",
    description:
      "A luxurious cashmere-blend t-shirt that combines comfort with sophistication. The soft fabric and relaxed fit make it perfect for everyday elegance.",
    longDescription:
      "This premium t-shirt features a blend of cashmere and silk that feels incredibly soft against the skin. The classic design with subtle details makes it versatile enough for any occasion.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "White", value: "#ffffff" },
      { name: "Black", value: "#1a1a1a" },
      { name: "Navy", value: "#1e3a5f" },
      { name: "Cream", value: "#f5f1e8" },
    ],
    images: ["https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80"],
  },
  {
    id: 14,
    slug: "designer-leather-jacket",
    name: "Designer Leather Jacket",
    price: 1299,
    category: "Outerwear",
    imageUrl: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80",
    imageAlt: "Designer Leather Jacket - Outerwear - Lola Drip",
    description:
      "A sophisticated leather jacket that combines timeless style with modern elegance. Crafted from premium Italian leather with impeccable attention to detail.",
    longDescription:
      "This exquisite jacket features premium Italian leather that ages beautifully. The tailored fit and classic design make it a timeless investment piece that will last for years.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Black", value: "#1a1a1a" },
      { name: "Brown", value: "#6b4423" },
      { name: "Navy", value: "#1e3a5f" },
    ],
    images: ["https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80"],
  },
];

// Category slugs used in URLs (must match Navigation /shop/dresses etc.)
export const CATEGORY_SLUG_TO_NAME: Record<string, string> = {
  dresses: "Dresses",
  outerwear: "Outerwear",
  tops: "Tops",
  bottoms: "Bottoms",
  "evening-wear": "Evening Wear",
};

export type CategoryInfo = { slug: string; name: string };

/** All categories for sitemap, nav, and internal linking */
export function getCategories(): CategoryInfo[] {
  return Object.entries(CATEGORY_SLUG_TO_NAME).map(([slug, name]) => ({ slug, name }));
}

/** Resolve category by URL slug; undefined if not a category */
export function getCategoryBySlug(slug: string): CategoryInfo | undefined {
  const name = CATEGORY_SLUG_TO_NAME[slug];
  return name ? { slug, name } : undefined;
}

/** Check if a slug is a category (not a product slug) */
export function isCategorySlug(slug: string): boolean {
  return slug in CATEGORY_SLUG_TO_NAME;
}

// Helper function to get product by slug
export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

// Helper function to get all products
export function getAllProducts(): Product[] {
  return products;
}

/** Products in a category (by display name e.g. "Dresses") */
export function getProductsByCategory(categoryName: string): Product[] {
  return products.filter((p) => p.category === categoryName);
}

/** Related products: same category, exclude current, limit count (for internal linking & SEO) */
export function getRelatedProducts(product: Product, limit: number = 4): Product[] {
  return products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, limit);
}
