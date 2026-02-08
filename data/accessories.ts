/**
 * Accessories data and types for Lola Drip fashion site.
 * Accessories use a simpler structure than clothing (no sizes/colors).
 */

export interface Accessory {
  id: string;
  name: string;
  category: 'handbags' | 'purses' | 'earrings' | 'necklaces' | 'bracelets' | 'sunglasses' | 'scarves' | 'belts';
  price: number;
  originalPrice?: number;
  image: string;
  description: string;
  inStock: boolean;
  featured?: boolean;
}

export const accessoryCategories = [
  { id: 'handbags', name: 'Handbags', icon: '👜' },
  { id: 'purses', name: 'Purses', icon: '👛' },
  { id: 'earrings', name: 'Earrings', icon: '💎' },
  { id: 'necklaces', name: 'Necklaces', icon: '📿' },
  { id: 'bracelets', name: 'Bracelets', icon: '⌚' },
  { id: 'sunglasses', name: 'Sunglasses', icon: '🕶️' },
  { id: 'scarves', name: 'Scarves', icon: '🧣' },
  { id: 'belts', name: 'Belts', icon: '👔' }
];

/** Unsplash image URLs — w=600&h=800 for crisp product display, fit=crop for consistent framing */
const UNSPLASH = (id: string) =>
  `https://images.unsplash.com/photo-${id}?w=600&h=800&fit=crop&auto=format&q=80`;

export const accessories: Accessory[] = [
  // Handbags
  {
    id: 'hb001',
    name: 'Classic Leather Tote',
    category: 'handbags',
    price: 89.99,
    originalPrice: 129.99,
    image: UNSPLASH('1598099947145-e85739e7ca28'),
    description: 'Spacious leather tote perfect for everyday use',
    inStock: true,
    featured: true
  },
  {
    id: 'hb002',
    name: 'Structured Shoulder Bag',
    category: 'handbags',
    price: 74.99,
    image: UNSPLASH('1548036328-c9fa89d128fa'),
    description: 'Elegant structured bag with adjustable strap',
    inStock: true,
    featured: true
  },
  // Purses
  {
    id: 'pr001',
    name: 'Evening Clutch',
    category: 'purses',
    price: 45.99,
    originalPrice: 69.99,
    image: UNSPLASH('1575295912464-fcfd1186d11d'),
    description: 'Sophisticated clutch for special occasions',
    inStock: true,
    featured: true
  },
  {
    id: 'pr002',
    name: 'Crossbody Wallet',
    category: 'purses',
    price: 39.99,
    image: UNSPLASH('1570431118100-c24a54fdeab0'),
    description: 'Compact crossbody with multiple card slots',
    inStock: true
  },
  // Earrings
  {
    id: 'er001',
    name: 'Gold Hoop Earrings',
    category: 'earrings',
    price: 24.99,
    image: UNSPLASH('1535632066927-ab7edaed5bae'),
    description: 'Classic gold-plated hoops',
    inStock: true,
    featured: true
  },
  {
    id: 'er002',
    name: 'Crystal Drop Earrings',
    category: 'earrings',
    price: 29.99,
    originalPrice: 44.99,
    image: UNSPLASH('1515562141207-7a88fb7ce338'),
    description: 'Elegant crystal drops for evening wear',
    inStock: true
  },
  // Necklaces
  {
    id: 'nc001',
    name: 'Delicate Gold Chain',
    category: 'necklaces',
    price: 34.99,
    image: UNSPLASH('1515562141207-7a88fb7ce338'),
    description: 'Minimalist gold chain for everyday elegance',
    inStock: true,
    featured: true
  },
  {
    id: 'br001',
    name: 'Silver Charm Bracelet',
    category: 'bracelets',
    price: 42.99,
    image: UNSPLASH('1611591437281-460bfbe1220a'),
    description: 'Customizable charm bracelet in sterling silver',
    inStock: true
  },
  {
    id: 'sg001',
    name: 'Cat Eye Sunglasses',
    category: 'sunglasses',
    price: 54.99,
    image: UNSPLASH('1572635196237-14b3f281503f'),
    description: 'Retro-inspired cat eye frames with UV protection',
    inStock: true,
    featured: true
  },
  {
    id: 'sc001',
    name: 'Silk Floral Scarf',
    category: 'scarves',
    price: 38.99,
    image: UNSPLASH('1599643478518-a784e5dc4c8f'),
    description: 'Luxurious silk scarf with floral print',
    inStock: true
  }
];

/** Map category id to display name for URLs */
export const ACCESSORY_SLUG_TO_NAME: Record<string, string> = Object.fromEntries(
  accessoryCategories.map((c) => [c.id, c.name])
);

/** Get accessory category by slug; undefined if not found */
export function getAccessoryCategoryBySlug(slug: string): { slug: string; name: string } | undefined {
  const name = ACCESSORY_SLUG_TO_NAME[slug];
  return name ? { slug, name } : undefined;
}

/** Check if slug is an accessory category */
export function isAccessoryCategorySlug(slug: string): boolean {
  return slug in ACCESSORY_SLUG_TO_NAME;
}

/** Generate URL slug from accessory name (e.g. "Classic Leather Tote" -> "classic-leather-tote") */
function slugify(name: string): string {
  return name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}

/** Get accessory slug for URL routing (derived from name) */
export function getAccessorySlug(accessory: Accessory): string {
  return slugify(accessory.name);
}

/** Get accessory numericId for cart (100000+ to avoid conflicts with product ids) */
export function getAccessoryNumericId(accessory: Accessory, index: number): number {
  return 100000 + index;
}

/** Get accessory by slug (matches slug from name or explicit slug) */
export function getAccessoryBySlug(slug: string): Accessory | undefined {
  return accessories.find((a, i) => getAccessorySlug(a) === slug);
}

/** Get accessories by category id */
export function getAccessoriesByCategory(categoryId: string): Accessory[] {
  return accessories.filter((a) => a.category === categoryId);
}

/** Get all accessories */
export function getAllAccessories(): Accessory[] {
  return accessories;
}

/** Get featured accessories */
export function getFeaturedAccessories(limit = 8): Accessory[] {
  return accessories.filter((a) => a.featured).slice(0, limit);
}
