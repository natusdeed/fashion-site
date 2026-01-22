export interface Product {
  id: number;
  slug: string;
  name: string;
  price: number;
  category: string;
  imageUrl?: string;
  imageAlt?: string;
  description: string;
  longDescription?: string;
  sizes: string[];
  colors: Array<{ name: string; value: string }>;
  images?: string[];
}

export const products: Product[] = [
  {
    id: 1,
    slug: "silk-evening-gown",
    name: "Silk Evening Gown",
    price: 1299,
    category: "Evening Wear",
    imageUrl: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&q=80",
    imageAlt: "Silk Evening Gown",
    description:
      "An exquisite silk evening gown that embodies timeless elegance. Crafted from the finest Italian silk, this piece features delicate draping and sophisticated tailoring. Perfect for the most special occasions, where you want to make an unforgettable impression.",
    longDescription:
      "This stunning evening gown is a masterpiece of luxury fashion. The flowing silhouette is designed to flatter every figure, while the premium silk fabric feels luxurious against the skin. Each gown is carefully constructed with attention to detail, ensuring a perfect fit and exceptional quality. The elegant design transitions seamlessly from cocktail hour to formal dinner, making it a versatile addition to any sophisticated wardrobe.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Midnight Black", value: "#1a1a1a" },
      { name: "Navy", value: "#1e3a5f" },
      { name: "Burgundy", value: "#722f37" },
    ],
    images: [
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&q=80",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80",
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80",
    ],
  },
  {
    id: 2,
    slug: "cashmere-trench-coat",
    name: "Cashmere Trench Coat",
    price: 899,
    category: "Outerwear",
    imageUrl: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800&q=80",
    imageAlt: "Cashmere Trench Coat",
    description:
      "A luxurious cashmere trench coat that combines classic sophistication with modern elegance. This timeless piece is perfect for any season, offering both warmth and impeccable style.",
    longDescription:
      "Crafted from premium cashmere, this trench coat features a tailored silhouette that flatters every figure. The double-breasted design and belted waist create a refined, structured look, while the soft cashmere fabric provides exceptional comfort and warmth. Perfect for the modern woman who appreciates both function and fashion.",
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
    price: 699,
    category: "Dresses",
    imageUrl: "https://images.unsplash.com/photo-1566479179817-2781c0a0d89a?w=800&q=80",
    imageAlt: "Lace Cocktail Dress",
    description:
      "An elegant lace cocktail dress that perfectly balances femininity and sophistication. The intricate lace detailing and flattering silhouette make this a standout piece for any special occasion.",
    longDescription:
      "This beautiful cocktail dress features delicate hand-crafted lace overlays that create a romantic, ethereal aesthetic. The fitted bodice and flowing skirt create a timeless silhouette that works for weddings, parties, and formal events. The high-quality lace is soft against the skin while maintaining its shape and elegance.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Ivory", value: "#faf8f3" },
      { name: "Black", value: "#1a1a1a" },
      { name: "Dusty Rose", value: "#c49a9a" },
    ],
    images: ["https://images.unsplash.com/photo-1566479179817-2781c0a0d89a?w=800&q=80"],
  },
  {
    id: 4,
    slug: "velvet-blazer",
    name: "Velvet Blazer",
    price: 599,
    category: "Tops",
    imageUrl: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80",
    imageAlt: "Velvet Blazer",
    description:
      "A luxurious velvet blazer that adds a touch of opulence to any ensemble. The rich texture and structured cut make this piece perfect for both formal and semi-formal occasions.",
    longDescription:
      "This sophisticated blazer features premium velvet fabric that catches the light beautifully, creating depth and dimension. The tailored fit and sharp lapels give it a modern, professional edge while the velvet texture adds a luxurious, tactile element. Perfect for elevating any outfit from day to night.",
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
    price: 799,
    category: "Dresses",
    imageUrl: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800&q=80",
    imageAlt: "Satin Maxi Dress",
    description:
      "A flowing satin maxi dress that embodies effortless elegance. The luxurious fabric and graceful silhouette create a stunning, feminine look perfect for any special occasion.",
    longDescription:
      "This beautiful maxi dress features premium satin fabric that drapes beautifully and moves with you. The V-neckline and flowing skirt create a flattering, romantic silhouette. Perfect for summer events, garden parties, or evening occasions where you want to feel both comfortable and elegant.",
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
    price: 449,
    category: "Bottoms",
    imageUrl: "https://images.unsplash.com/photo-1506629905607-1b8c0c4e3b5e?w=800&q=80",
    imageAlt: "Wool Tailored Pants",
    description:
      "Classic wool tailored pants that combine comfort with sophisticated style. Perfect for the modern professional wardrobe, these pants offer a flawless fit and timeless elegance.",
    longDescription:
      "Crafted from premium wool blend, these tailored pants feature a straight-leg silhouette that's both contemporary and classic. The high-quality fabric maintains its shape throughout the day while offering exceptional comfort. Perfect for office wear or dressed-up casual occasions.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Charcoal", value: "#374151" },
      { name: "Navy", value: "#1e3a5f" },
      { name: "Black", value: "#1a1a1a" },
    ],
    images: ["https://images.unsplash.com/photo-1506629905607-1b8c0c4e3b5e?w=800&q=80"],
  },
  {
    id: 7,
    slug: "chiffon-blouse",
    name: "Chiffon Blouse",
    price: 349,
    category: "Tops",
    imageUrl: "https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=800&q=80",
    imageAlt: "Chiffon Blouse",
    description:
      "An elegant chiffon blouse with delicate details that adds sophistication to any outfit. The lightweight fabric and feminine design make it perfect for both professional and casual settings.",
    longDescription:
      "This beautiful blouse features soft, flowing chiffon that moves gracefully. The classic design with subtle details makes it versatile enough to pair with anything from tailored pants to flowing skirts. Perfect for the woman who appreciates refined, feminine style.",
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
    price: 549,
    category: "Bottoms",
    imageUrl: "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=800&q=80",
    imageAlt: "Leather Midi Skirt",
    description:
      "A stylish leather midi skirt that adds edge to any outfit. The high-quality leather and flattering midi length create a sophisticated, modern look.",
    longDescription:
      "This contemporary midi skirt features premium genuine leather with a subtle sheen. The A-line silhouette and midi length create a flattering, modern look that can be dressed up or down. Perfect for adding a touch of sophistication and edge to your wardrobe.",
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
    price: 899,
    category: "Outerwear",
    imageUrl: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=800&q=80",
    imageAlt: "Embroidered Jacket",
    description:
      "A stunning embroidered jacket featuring intricate hand-stitched details. This statement piece combines traditional craftsmanship with contemporary design.",
    longDescription:
      "This exquisite jacket features hand-embroidered floral motifs that showcase traditional craftsmanship. The structured silhouette and premium fabric create a luxurious piece that makes a bold statement. Perfect for special occasions or when you want to elevate a simple outfit.",
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
    price: 649,
    category: "Dresses",
    imageUrl: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&q=80",
    imageAlt: "Silk Wrap Dress",
    description:
      "A flattering silk wrap dress that adapts to your figure perfectly. The timeless wrap design and luxurious silk fabric create an effortlessly elegant look.",
    longDescription:
      "This classic wrap dress features premium silk fabric that feels luxurious against the skin. The wrap design creates a flattering V-neckline and adjustable fit that works for every body type. Perfect for both day and night occasions, this versatile piece is a wardrobe essential.",
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
    price: 749,
    category: "Tops",
    imageUrl: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80",
    imageAlt: "Tweed Blazer",
    description:
      "A classic tweed blazer that embodies timeless sophistication. The textured fabric and structured silhouette make this a versatile wardrobe staple.",
    longDescription:
      "This elegant blazer features premium tweed fabric with a subtle texture that adds depth and interest. The tailored fit and classic design make it perfect for both professional settings and casual elegance. A timeless piece that will remain stylish for years to come.",
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
    price: 1399,
    category: "Evening Wear",
    imageUrl: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80",
    imageAlt: "Organza Evening Gown",
    description:
      "A breathtaking organza evening gown that captures the essence of luxury and romance. The layered fabric and elegant design create a truly special piece for the most important occasions.",
    longDescription:
      "This stunning evening gown features layers of delicate organza that create movement and dimension. The elegant design with its flowing silhouette and sophisticated details makes this gown perfect for galas, formal events, and special celebrations. A true statement piece that will make you feel like royalty.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Ivory", value: "#faf8f3" },
      { name: "Midnight Black", value: "#1a1a1a" },
      { name: "Dusty Rose", value: "#c49a9a" },
    ],
    images: ["https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80"],
  },
];

// Helper function to get product by slug
export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

// Helper function to get all products
export function getAllProducts(): Product[] {
  return products;
}
