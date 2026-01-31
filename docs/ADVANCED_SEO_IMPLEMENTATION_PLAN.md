# Advanced Technical SEO – Implementation Plan

This document outlines the implementation plan for maximum search visibility on Lola Drip.

---

## 1. Security & SEO headers (`next.config.js`)

**Status:** Implemented

- **X-DNS-Prefetch-Control:** `on` – encourages browsers to prefetch DNS for links.
- **Strict-Transport-Security (HSTS):** `max-age=63072000; includeSubDomains; preload` – enforces HTTPS for 2 years; supports preload list.
- **X-Frame-Options:** `SAMEORIGIN` – reduces clickjacking risk.
- **X-Content-Type-Options:** `nosniff` – prevents MIME sniffing.
- **Referrer-Policy:** `origin-when-cross-origin` – controls referrer sent on cross-origin requests.

Existing cache headers for static assets and `_next/static` are unchanged.

---

## 2. Breadcrumb navigation & BreadcrumbList schema

**Status:** Implemented (product pages); extended for category pages

- **Product pages** (`/shop/[slug]`, `/product/[id]`): Already have visible breadcrumbs (Home → Shop → Product) and `BreadcrumbList` JSON-LD.
- **Category pages** (`/shop/[slug]` when slug is a category): Breadcrumb: Home → Shop → Category, with BreadcrumbList schema.
- **Shop index** (`/shop`): Optional breadcrumb (Home → Shop) for consistency.

Breadcrumbs improve UX and help search engines understand site hierarchy.

---

## 3. Internal linking

**Status:** Implemented

- **Related products:** On each product page, a “You may also like” section using `getRelatedProducts(product, 4)` (same category, excluding current product). Links to other product PDPs.
- **Category navigation:** Nav already links to `/shop/dresses`, `/shop/outerwear`, etc. Category pages list products and link back to shop and to each product.
- **Blog/content:** No blog in scope; when added, link from homepage/footer and from relevant product/category pages.

---

## 4. XML sitemap with priorities

**Status:** Implemented in `app/sitemap.ts`

| Page type        | Priority | Change frequency |
|------------------|----------|-------------------|
| Homepage         | 1.0      | weekly            |
| Category pages   | 0.8      | weekly            |
| Product pages    | 0.6      | weekly            |
| Static (about, contact, policies, FAQ, etc.) | 0.4 | monthly/yearly   |

- Static pages: about, contact, search, FAQ, wishlist, video-demo, privacy, cookie, refund, shipping, terms.
- Category URLs: `/shop/dresses`, `/shop/outerwear`, `/shop/tops`, `/shop/bottoms`, `/shop/evening-wear`.
- Product URLs: `/shop/{slug}` for each product.

Sitemap is dynamic; revalidate set (e.g. weekly) so new products/categories appear automatically.

---

## 5. Pagination & infinite scroll SEO

**Status:** Implemented

- **URL structure:** Pagination via query: `/shop?page=2`, `/shop?page=3`. No `page=1` (canonical is `/shop`).
- **rel="next" / rel="prev":** In shop layout/page metadata, set `alternates` with canonical and, when applicable, `prev`/`next` to the previous/next page URL. Only `next` on page 1; only `prev` on last page; both in between.
- **View-all:** Optional route `/shop/all` that lists all products in one page for crawlers that don’t execute JS; linked from footer or from last pagination page (“View all”).

Implementation details:

- Shop page (or layout) reads `searchParams.page`; products sliced per page (e.g. 12 per page).
- `generateMetadata` (or equivalent) sets `alternates.canonical`, `alternates.prev`, `alternates.next` based on current page.

---

## 6. hreflang (international SEO)

**Status:** Prepared for future use

- **Current:** Single language (en-US). No alternate language versions yet.
- **Implementation:** In root `layout.tsx`, add `alternates.languages` with at least `x-default` pointing to the default (e.g. `https://loladrip.com`) and `en` (or `en-US`) to the same. When you add locales (e.g. `en-GB`, `fr`), add corresponding hreflang entries and ensure each version has a self-referencing hreflang and x-default.

Example when multi-language is added:

- `x-default`: main/default URL.
- `en`: English URL.
- `fr`: French URL (when applicable).

Prevents duplicate-content issues and helps geotargeting.

---

## 7. Comprehensive 404 page

**Status:** Implemented

- **Search:** Embedded search (reuse existing `SearchBar` or a lightweight search input that navigates to `/search?q=...`) so users can search from the 404 page.
- **Popular categories:** Links to main categories (e.g. Dresses, Outerwear, Tops, Bottoms, Evening Wear) pointing to `/shop/{category-slug}`.
- **Helpful navigation:** Prominent links to Home, Shop, About, Contact, FAQ.
- **404 tracking:** Client-side reporting (e.g. `gtag('event', 'page_not_found', { page_path: window.location.pathname })` or similar) so you can fix broken links and monitor 404s in analytics.

404 page remains `noindex` so it doesn’t dilute SEO.

---

## File checklist (implemented)

| Item                         | File(s) |
|-----------------------------|---------|
| Security/SEO headers        | `next.config.js` |
| Sitemap priorities + categories | `app/sitemap.ts` |
| Category slug list + helpers| `data/products.ts` (`getCategories`, `getCategoryBySlug`, `getRelatedProducts`, `getProductsByCategory`) |
| Category vs product routing | `app/shop/[slug]/page.tsx` (category slug → category page; else product) |
| Breadcrumbs + BreadcrumbList (category) | `app/shop/[slug]/page.tsx` |
| Related products section    | `app/shop/[slug]/page.tsx` (“You May Also Like”) |
| Pagination (shop)            | `app/shop/page.tsx` (server) + `components/ShopGrid.tsx` (client) |
| rel next/prev                | `app/shop/page.tsx` `generateMetadata` |
| View-all page               | `app/shop/all/page.tsx` |
| hreflang (x-default)         | `app/layout.tsx` `alternates.languages` |
| 404 page                     | `app/not-found.tsx` (search, categories, helpful nav) |
| 404 tracking                 | `components/NotFoundTracker.tsx` (gtag event `page_not_found`) |

---

## Priority and testing

1. **High:** Headers, sitemap, breadcrumbs, internal links (related products + categories).
2. **Medium:** Pagination + rel next/prev, 404 improvements + tracking.
3. **Lower:** hreflang (until you have multiple locales), view-all page (if you want crawler-only safety).

After implementation:

- Validate sitemap at `/sitemap.xml` and in Google Search Console.
- Check breadcrumbs and Product/BreadcrumbList in Rich Results Test.
- Confirm rel next/prev and canonical in view-source or an SEO crawler.
- Verify 404 events in Google Analytics (or your analytics tool).
