import type { Metadata } from "next";
import { getAllProducts, getFallbackProducts } from "@/data/products";
import ShopGrid, { PER_PAGE } from "@/components/ShopGrid";

const BASE_URL = "https://loladrip.com";

type Props = { searchParams: Promise<{ page?: string }> };

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const params = await searchParams;
  const page = Math.max(1, parseInt(params?.page || "1", 10) || 1);
  const allProducts = getAllProducts();
  const sourceProducts = allProducts.length > 0 ? allProducts : getFallbackProducts();
  const totalPages = Math.max(1, Math.ceil(sourceProducts.length / PER_PAGE));

  const canonical = page === 1 ? "/shop" : `/shop?page=${page}`;
  const prev = page > 1 ? (page === 2 ? "/shop" : `/shop?page=${page - 1}`) : undefined;
  const next = page < totalPages ? `/shop?page=${page + 1}` : undefined;

  // Next.js alternates doesn't emit rel prev/next; use links array for pagination SEO
  const links: Array<{ rel: string; href: string }> = [];
  if (prev) links.push({ rel: "prev", href: `${BASE_URL}${prev}` });
  if (next) links.push({ rel: "next", href: `${BASE_URL}${next}` });

  return {
    alternates: { canonical },
    ...(links.length > 0 && { links }),
  };
}

export default async function ShopPage({ searchParams }: Props) {
  const params = await searchParams;
  const page = Math.max(1, parseInt(params?.page || "1", 10) || 1);
  const allProducts = getAllProducts();
  const fallback = getFallbackProducts();
  const sourceProducts = allProducts.length > 0 ? allProducts : fallback;
  const totalPages = Math.max(1, Math.ceil(sourceProducts.length / PER_PAGE));
  const start = (page - 1) * PER_PAGE;
  let products = sourceProducts.slice(start, start + PER_PAGE);
  if (products.length === 0) {
    products = fallback.slice(0, PER_PAGE);
  }
  const totalPagesToShow = products.length > 0 ? totalPages : Math.max(1, Math.ceil(fallback.length / PER_PAGE));

  return (
    <ShopGrid
      products={products}
      currentPage={page}
      totalPages={totalPagesToShow}
    />
  );
}
