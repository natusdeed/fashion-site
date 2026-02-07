import type { MetadataRoute } from "next";
import { getAllProducts, getCategories } from "@/data/products";
import { getAllAccessories, getAccessorySlug } from "@/data/accessories";

const BASE_URL = "https://loladrip.com";

// Revalidate sitemap weekly so new products appear automatically
export const revalidate = 604800; // 7 days in seconds

/**
 * Dynamic sitemap for Lola Drip - included in SEO for all major search engines.
 * Priorities: Home 1.0, Category 0.8, Product 0.6, Static 0.4.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const products = getAllProducts();
  const categories = getCategories();

  // Homepage: priority 1.0
  const homePage: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
  ];

  // Shop index + view-all
  const shopIndex: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/shop`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/shop/all`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.5,
    },
  ];

  // Category pages: priority 0.8
  const categoryPages: MetadataRoute.Sitemap = categories.map((cat) => ({
    url: `${BASE_URL}/shop/${cat.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // Product pages: priority 0.6
  const productPages: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${BASE_URL}/shop/${product.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  // Accessory pages: priority 0.6
  const accessories = getAllAccessories();
  const accessoryPages: MetadataRoute.Sitemap = accessories.map((accessory) => ({
    url: `${BASE_URL}/shop/${getAccessorySlug(accessory)}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  // Static pages: priority 0.4
  const staticPages: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.4 },
    { url: `${BASE_URL}/about/ai-info`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.4 },
    { url: `${BASE_URL}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.4 },
    { url: `${BASE_URL}/search`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.4 },
    { url: `${BASE_URL}/accessories`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/faq`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.4 },
    { url: `${BASE_URL}/wishlist`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.4 },
    { url: `${BASE_URL}/video-demo`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.4 },
    { url: `${BASE_URL}/privacy-policy`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.4 },
    { url: `${BASE_URL}/cookie-policy`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.4 },
    { url: `${BASE_URL}/refund-policy`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.4 },
    { url: `${BASE_URL}/shipping-policy`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.4 },
    { url: `${BASE_URL}/terms-of-service`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.4 },
  ];

  return [...homePage, ...shopIndex, ...categoryPages, ...productPages, ...accessoryPages, ...staticPages];
}
