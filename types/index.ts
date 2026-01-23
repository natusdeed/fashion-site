/**
 * Type definitions for Lola Drip e-commerce site
 */

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  slug: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
}

export interface CartItem {
  id: string; // Unique cart item ID
  productId: number;
  name: string;
  price: number;
  image: string;
  size: string;
  color: string;
  colorValue: string; // Hex color value
  quantity: number;
  slug: string;
}