# Advanced Technical SEO – Implementation Plan

> **Status Overview:** Most items are already implemented. This plan documents current state, gaps, and optional enhancements for maximum search visibility.

---

## 1. Security & SEO Headers (`next.config.js`)

| Status | Details |
|--------|---------|
| ✅ **DONE** | Headers are already configured in `next.config.js` |

**Implemented headers:**
- **X-DNS-Prefetch-Control:** `on` – encourages browsers to prefetch DNS
- **Strict-Transport-Security (HSTS):** `max-age=63072000; includeSubDomains; preload` – enforces HTTPS for 2 years
- **X-Frame-Options:** `SAMEORIGIN` – reduces clickjacking risk
- **X-Content-Type-Options:** `nosniff` – prevents MIME sniffing
- **Referrer-Policy:** `origin-when-cross-origin` – controls referrer on cross-origin requests
- **Cache-Control** – separate rules for static assets and `_next/static` for performance

**Action:** None required.

---

## 2. Breadcrumb Navigation & BreadcrumbList Schema

| Status | Details |
|--------|---------|
| ✅ **DONE** | Breadcrumbs and schema on product and category pages |

**Implemented:**
- **Product pages** (`/shop/[slug]`): Visible breadcrumb (Home → Shop → Product) + `BreadcrumbList` JSON-LD
- **Category pages** (`/shop/[slug]`): Breadcrumb (Home → Shop → Category) + `BreadcrumbList` schema
- **View-all page** (`/shop/all`): Breadcrumb (Home → Shop → All products)
- **Product by ID** (`/product/[id]`): Breadcrumb + schema (legacy route; primary URLs use `/shop/slug`)

**Schema example:**
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://loladrip.com/" },
    { "@type": "ListItem", "position": 2, "name": "Shop", "item": "https://loladrip.com/shop" },
    { "@type": "ListItem", "position": 3, "name": "Product Name", "item": "https://loladrip.com/shop/product-slug" }
  ]
}
```

**Optional enhancement:** Add breadcrumb to shop index (`/shop`) for consistency (Home → Shop).

---

## 3. Internal Linking Structure

| Status | Details |
|--------|---------|
| ✅ **DONE** | Related products and category navigation in place |

**Implemented:**
- **Related products:** “You May Also Like” on product pages (same category, up to 4 products) – `app/shop/[slug]/page.tsx`
- **Category navigation:** Nav links to `/shop/dresses`, `/shop/outerwear`, `/shop/tops`, `/shop/bottoms`, `/shop/evening-wear`
- **Category pages:** Product grid linking to individual product pages via `ProductCard` → `/shop/{slug}`
- **404 page:** Links to popular categories and main sections
- **Blog/content:** Not in scope; when added, link from homepage, footer, and relevant product/category pages

**Action:** None required. Add content-to-product links when a blog is introduced.

---

## 4. XML Sitemap with Priorities

| Status | Details |
|--------|---------|
| ✅ **DONE** | Dynamic sitemap in `app/sitemap.ts` with priorities |

**Implemented priorities:**

| Page Type | Priority | Change Frequency | Example |
|-----------|----------|------------------|---------|
| Homepage | 1.0 | weekly | `/` |
| Shop index | 0.9 | weekly | `/shop` |
| Category pages | 0.8 | weekly | `/shop/dresses`, `/shop/outerwear` |
| Product pages | 0.6 | weekly | `/shop/elegant-silk-dress` |
| Static pages | 0.4 | monthly/yearly | `/about`, `/contact`, `/faq` |
| View-all | 0.5 | weekly | `/shop/all` |

**Included static pages:** about, about/ai-info, contact, search, faq, wishlist, video-demo, privacy-policy, cookie-policy, refund-policy, shipping-policy, terms-of-service.

**Revalidation:** `revalidate = 604800` (7 days) so new products appear in the sitemap.

**Reference:** `robots.txt` points to `https://loladrip.com/sitemap.xml`.

---

## 5. Pagination & Infinite Scroll SEO

| Status | Details |
|--------|---------|
| ✅ **DONE** | Pagination with rel next/prev and view-all page |

**Implemented:**
- **URL structure:** `/shop?page=2`, `/shop?page=3` (page 1 canonical is `/shop`)
- **rel="prev" / rel="next":** Set in `generateMetadata` in `app/shop/page.tsx` via `alternates.prev` and `alternates.next`
- **View-all page:** `/shop/all` lists all products; linked from pagination (“View all”)
- **Pagination UI:** `components/ShopGrid.tsx` – Previous / Next / View all

**Pagination logic:**
- Page 1: canonical `/shop`, next → `/shop?page=2`
- Page 2+: canonical `/shop?page=N`, prev and next as applicable
- Last page: prev only, no next

**Important:** Next.js 14 `alternates` does **not** natively support `prev`/`next`. Use the `metadata.links` array instead:

```ts
// In generateMetadata for shop page:
export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const page = /* ... */;
  const prev = page > 1 ? (page === 2 ? "/shop" : `/shop?page=${page - 1}`) : undefined;
  const next = page < totalPages ? `/shop?page=${page + 1}` : undefined;

  const links: Array<{ rel: string; href: string }> = [];
  if (prev) links.push({ rel: "prev", href: `${BASE_URL}${prev}` });
  if (next) links.push({ rel: "next", href: `${BASE_URL}${next}` });

  return {
    alternates: { canonical: page === 1 ? "/shop" : `/shop?page=${page}` },
    ...(links.length > 0 && { links }),
  };
}
```

**Current status:** Shop page uses `alternates.prev` and `alternates.next`, which may not emit link tags. Switch to `metadata.links` as above and verify in page source.

---

## 6. hreflang Tags (International SEO)

| Status | Details |
|--------|---------|
| ✅ **PARTIAL** | x-default and `en` configured; single locale only |

**Implemented in `app/layout.tsx`:**
```ts
alternates: {
  languages: {
    "x-default": "https://loladrip.com",
    en: "https://loladrip.com",
  },
}
```

**Current scope:** Single language (en-US). Both `x-default` and `en` point to the same URL, which is correct for a single-locale site.

**When adding locales (e.g. en-GB, fr):**
1. Add Next.js i18n routing or locale-specific paths
2. Extend `alternates.languages` for each locale
3. Keep `x-default` as the primary/fallback URL
4. Ensure each version has self-referencing hreflang
5. Add locale-specific sitemaps if needed

**Example for multi-language:**
```ts
languages: {
  "x-default": "https://loladrip.com",
  "en": "https://loladrip.com",
  "en-GB": "https://loladrip.com/en-gb",
  "fr": "https://loladrip.com/fr",
}
```

---

## 7. Comprehensive 404 Page

| Status | Details |
|--------|---------|
| ✅ **DONE** | Search, categories, navigation, and tracking |

**Implemented in `app/not-found.tsx`:**
- **Search:** Form posting to `/search` with `q` parameter
- **Popular categories:** Links to `/shop/{slug}` for Dresses, Outerwear, Tops, Bottoms, Evening Wear
- **Helpful navigation:** Home, Shop, About, Contact, FAQ
- **Primary CTAs:** “Go Home” and “Browse Shop”
- **404 tracking:** `NotFoundTracker` sends `page_not_found` event to GA (when `NEXT_PUBLIC_GA_ID` is set)

**Metadata:**
- `robots: { index: false, follow: true }` – no index, links followed

**Action:** Ensure `NEXT_PUBLIC_GA_ID` is set in production so 404 events are tracked.

---

## Implementation Checklist

| Item | File(s) | Status |
|------|---------|--------|
| Security/SEO headers | `next.config.js` | ✅ |
| Sitemap with priorities | `app/sitemap.ts` | ✅ |
| Category helpers | `data/products.ts` | ✅ |
| Breadcrumbs + BreadcrumbList (product) | `app/shop/[slug]/page.tsx` | ✅ |
| Breadcrumbs + BreadcrumbList (category) | `app/shop/[slug]/page.tsx` | ✅ |
| Related products | `app/shop/[slug]/page.tsx` | ✅ |
| Pagination | `app/shop/page.tsx`, `ShopGrid.tsx` | ✅ |
| rel prev/next | `app/shop/page.tsx` `generateMetadata` | ✅ (verify in HTML) |
| View-all page | `app/shop/all/page.tsx` | ✅ |
| hreflang (x-default, en) | `app/layout.tsx` | ✅ |
| 404 page (search, categories, nav) | `app/not-found.tsx` | ✅ |
| 404 tracking | `components/NotFoundTracker.tsx` | ✅ |
| robots.txt | `app/robots.ts` | ✅ |

---

## Recommended Next Steps

### High priority (verify)
1. **Rel prev/next:** Inspect shop pagination pages and confirm `<link rel="prev">` and `<link rel="next">` appear in the HTML.
2. **Google Search Console:** Submit sitemap, check coverage, and monitor 404 reports.
3. **Rich Results Test:** Validate BreadcrumbList and Product schema at [Google Rich Results Test](https://search.google.com/test/rich-results).

### Medium priority
4. **Shop breadcrumb:** Add breadcrumb (Home → Shop) to `/shop` for consistency.
5. **404 analytics:** Confirm `NEXT_PUBLIC_GA_ID` is set and `page_not_found` events show in GA.
6. **Canonical URLs:** Confirm canonical tags are correct on product, category, and paginated shop pages.

### When expanding
7. **hreflang:** Add more locales in `alternates.languages` when launching new regions/languages.
8. **Blog/content:** Create content sections and link to products and categories for stronger internal linking and topical authority.
9. **Sitemap index:** If the sitemap grows very large, split into multiple sitemaps and add a sitemap index.

---

## Testing Commands & Tools

```bash
# Verify sitemap locally
curl http://localhost:3000/sitemap.xml

# Verify robots.txt
curl http://localhost:3000/robots.txt
```

**External tools:**
- [Google Search Console](https://search.google.com/search-console)
- [Google Rich Results Test](https://search.google.com/test/rich-results)
- [Screaming Frog SEO Spider](https://www.screamingfrog.co.uk/seo-spider/) (optional, for site audits)
