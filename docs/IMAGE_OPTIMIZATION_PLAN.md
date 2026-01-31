# Lola Drip – Image Optimization Plan

This document lists **every file that needs changes** and a **step-by-step optimization plan** to meet your requirements (Next.js Image settings, formats, hero/product/thumbnail/background rules, `next.config.js`, and compressing `/public` images).

---

## 1. Files That Need Changes (Summary)

| Category | File | Current state | Changes needed |
|----------|------|---------------|----------------|
| **Config** | `next.config.js` | formats, deviceSizes, imageSizes, TTL already set (different TTL) | Align to required config; consider keeping longer TTL |
| **Hero / above-fold** | `components/Hero.tsx` | Image, priority, quality 85, no placeholder | Add `placeholder="blur"` + `blurDataURL` |
| | `components/CollectionVideoBanner.tsx` | Image, priority, quality 95, placeholder blur | Set quality to 85 |
| | `components/AmbientVideoBackground.tsx` | Image, priority, quality 90, placeholder blur | Set quality to 85 |
| | `app/about/page.tsx` | Hero Image, priority, quality 90, no placeholder | Set quality 85, add placeholder blur |
| **Product / below-fold** | `components/ProductCard.tsx` | Uses `LazyImage` (Next Image inside) | Ensure LazyImage uses quality 85, lazy, blur (already mostly correct) |
| | `components/FeaturedCollection.tsx` | Image, lazy, quality 85, no placeholder | Add placeholder blur |
| | `components/Collections.tsx` | Image, lazy, quality 85, no placeholder | Add placeholder blur |
| | `components/Navigation.tsx` | Image in mega menu, no quality/sizes | Add quality 85, sizes, loading lazy |
| | `components/SwipeableImageGallery.tsx` | Main + thumbs; quality 90/75 | Main: quality 85, placeholder blur; thumbs: keep lazy/sizes |
| | `components/QuickViewModal.tsx` | Main Image priority, no quality; thumbs no loading | Main: quality 85; thumbs: loading lazy, sizes |
| | `components/CartDrawer.tsx` | Image, no quality/sizes | Add quality 85, sizes 80px, loading lazy |
| | `app/product/[id]/page.tsx` | Image priority, quality 90, blur | Set quality to 85 |
| | `app/shop/[slug]/page.tsx` | Main Image priority, quality 90, blur; thumbs lazy 75 | Main quality 85; thumbs keep lazy/sizes |
| **Video posters** | `components/VideoPlayer.tsx` | Image, priority, no quality/placeholder | Add quality 85, placeholder blur, sizes |
| | `components/OptimizedVideo.tsx` | Image, priority, no quality/placeholder | Add quality 85, placeholder blur, sizes |
| **Other** | `components/Logo.tsx` | Image, fixed dimensions, no quality | Add quality 85 (optional for SVG) |
| **Background images** | `app/wishlist/page.tsx` | CSS `backgroundImage` (Unsplash URL) ×2 | Replace with Next Image `fill` in a wrapper for WebP/AVIF |
| | `app/contact/page.tsx` | CSS `backgroundImage` (/images/contact-header.png) | Replace with Next Image `fill` |
| | `app/terms-of-service/page.tsx` | CSS `backgroundImage` (Unsplash) | Replace with Next Image `fill` or optimized asset |
| | `app/shipping-policy/page.tsx` | Same | Same |
| | `app/refund-policy/page.tsx` | Same | Same |
| | `app/privacy-policy/page.tsx` | Same | Same |
| | `app/faq/page.tsx` | Same | Same |
| | `app/cookie-policy/page.tsx` | Same | Same |
| **Public assets** | `public/images/*` | Raw PNG/JPG | Compress 50–70%, strip EXIF (see Section 5) |

---

## 2. Next.js Image Settings (By Type)

Apply these consistently:

| Setting | Hero / above-fold | Product / below-fold | Thumbnails |
|--------|--------------------|----------------------|------------|
| **quality** | 85 | 85 | 75–85 |
| **priority** | true | false | false |
| **loading** | (default eager with priority) | "lazy" | "lazy" |
| **placeholder** | "blur" + blurDataURL | "blur" + blurDataURL | "blur" + blurDataURL (optional) |
| **sizes** | 100vw or (max-width: 768px) 100vw, 100vw | Responsive e.g. (max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw | e.g. 80px, 128px |

Use **fixed width/height** where the layout is fixed (e.g. logos, thumbnails) to prevent layout shift; use **fill** + **sizes** for responsive full-bleed or flexible images.

---

## 3. File-by-File Optimization Plan

### 3.1 `next.config.js`

- Set:
  - `formats: ['image/webp', 'image/avif']`
  - `deviceSizes: [640, 750, 828, 1080, 1200, 1920]`
  - `imageSizes: [16, 32, 48, 64, 96, 128, 256, 384]`
  - `minimumCacheTTL: 60` (only if you explicitly want short TTL; otherwise 86400 or 31536000 is better for performance)
- Keep `remotePatterns` for `images.unsplash.com` and any other external image hosts.
- Next.js will then serve WebP/AVIF and generate responsive `srcSet` automatically.

### 3.2 Hero / above-the-fold images (LCP)

- **Hero.tsx**: Keep `priority`, `quality={85}`, `sizes="100vw"`. Add `placeholder="blur"` and a shared `blurDataURL` constant.
- **CollectionVideoBanner.tsx**: Change `quality={95}` → `quality={85}`; keep `priority`, `sizes="100vw"`, `placeholder="blur"`.
- **AmbientVideoBackground.tsx**: Change `quality={90}` → `quality={85}`; keep `priority`, `sizes="100vw"`, `placeholder="blur"`.
- **app/about/page.tsx**: Hero Image: `quality={85}`, add `placeholder="blur"` and `blurDataURL`.

### 3.3 Product and collection images (below-fold)

- **LazyImage.tsx**: Already uses Next Image with `quality={85}`, `loading={priority ? undefined : "lazy"}`, `placeholder="blur"`. Ensure `sizes` is passed from callers (ProductCard, SearchBar) and is responsive.
- **FeaturedCollection.tsx**: Add `placeholder="blur"` and a small `blurDataURL` (e.g. shared constant).
- **Collections.tsx**: Add `placeholder="blur"` and `blurDataURL`.
- **Navigation.tsx** (mega menu): Add `quality={85}`, `sizes="(max-width: 768px) 50vw, 200px"`, `loading="lazy"`.
- **SwipeableImageGallery.tsx**: Main image: `quality={85}`, `placeholder="blur"`, `priority={currentIndex === 0}`. Thumbnails: keep `loading="lazy"`, `quality={75}`, `sizes="128px"`.
- **QuickViewModal.tsx**: Main image: `quality={85}`; thumbnails: `loading="lazy"`, `sizes="80px"`, optional `quality={85}`.
- **CartDrawer.tsx**: Add `quality={85}`, `sizes="80px"`, `loading="lazy"`.
- **app/product/[id]/page.tsx**: Change `quality={90}` → `quality={85}`; keep `priority`, `placeholder="blur"`.
- **app/shop/[slug]/page.tsx**: Main Image `quality={90}` → `quality={85}`; thumbnails keep `loading="lazy"`, `quality={75}`.

### 3.4 Video poster images

- **VideoPlayer.tsx**: Add `quality={85}`, `placeholder="blur"` + `blurDataURL`, keep `sizes` and `priority` where used for above-fold.
- **OptimizedVideo.tsx**: Add `quality={85}`, `placeholder="blur"` + `blurDataURL`, keep `sizes`.

### 3.5 Background images (policy pages, wishlist, contact)

- Replace CSS `backgroundImage: url(...)` with a full-bleed wrapper:
  - A div with `position: relative` and fixed height (e.g. `min-h-[400px]`).
  - Inside it, `<Image src={...} alt="" fill className="object-cover" sizes="100vw" />` with `priority` for above-fold (e.g. contact, wishlist hero), `loading="lazy"` for below-fold or policy pages.
- Use local optimized assets where possible (e.g. `/images/contact-header.png`); for shared Unsplash hero, consider one local file (e.g. `public/images/policy-header.jpg`) and reference it so Next Image can optimize it (WebP/AVIF, responsive sizes).
- **Files**: `app/wishlist/page.tsx`, `app/contact/page.tsx`, `app/terms-of-service/page.tsx`, `app/shipping-policy/page.tsx`, `app/refund-policy/page.tsx`, `app/privacy-policy/page.tsx`, `app/faq/page.tsx`, `app/cookie-policy/page.tsx`.

### 3.6 Shared blur placeholder

- Add a small base64 blur (e.g. gray or brand color) in a shared constant or `lib/constants.ts` and reuse for all `blurDataURL` to avoid duplication and keep bundles small.

---

## 4. Image Format and Responsive Behavior

- **WebP/AVIF**: Handled by `next.config.js` `formats`. No extra code needed.
- **Width/height**: Use `fill` with a sized container for responsive images; use explicit `width`/`height` for logos and thumbnails to prevent layout shift.
- **srcSet**: Next.js Image generates this from `sizes` and `deviceSizes`/`imageSizes` in config. No manual srcSet needed.

---

## 5. Compress Existing Images in `/public`

**Target**: Reduce file size by 50–70%, keep visual quality, remove EXIF.

**Current assets** (from `public/images/`):

- `about-header.png.jpg`
- `contact-header.png`
- `header.banner.png`
- `shop.header.png`

**Options**:

1. **Node script (recommended)**  
   Use `sharp` to:
   - Resize to max width/height if larger than needed (e.g. max 1920px wide for heroes).
   - Save as WebP (and optionally keep PNG/JPG fallback) with quality ~80–85.
   - Strip EXIF: `sharp(path).rotate()` (normalizes orientation and strips EXIF) or explicit metadata stripping.
   - Run as a one-off or in a `scripts/compress-images.js` (e.g. `node scripts/compress-images.js`).

2. **CLI tools**  
   - **sharp-cli** or **imagemin-cli** with plugins (e.g. imagemin-webp, imagemin-mozjpeg).
   - **squoosh-cli** if available.

3. **Manual**  
   - Squoosh (web), ImageOptim (Mac), or similar: export as WebP, quality 80–85, strip metadata.

**Deliverables**:

- Compressed files in `public/images/` (replace or add WebP versions).
- If you keep both: reference `.webp` in code where you want that format; Next Image can also optimize on the fly if you keep pointing at the original path and use only the Image component.

---

## 6. Implementation Order

1. **next.config.js** – Update `images` (formats, deviceSizes, imageSizes, minimumCacheTTL).
2. **Shared blur** – Add one `blurDataURL` constant and use it everywhere you add `placeholder="blur"`.
3. **Hero / LCP** – Hero, CollectionVideoBanner, AmbientVideoBackground, About hero (quality 85, blur).
4. **Product / below-fold** – LazyImage callers, FeaturedCollection, Collections, Navigation, SwipeableImageGallery, QuickViewModal, CartDrawer, product/[id], shop/[slug].
5. **Video posters** – VideoPlayer, OptimizedVideo.
6. **Backgrounds** – Wishlist, contact, then all policy pages (replace CSS background with Next Image fill).
7. **Public folder** – Run compression script (and optionally replace references to use compressed/WebP assets).

---

## 7. Quick Reference – Props to Add Per Component

| Component / Page | Add or change |
|-----------------|----------------|
| Hero | placeholder, blurDataURL |
| CollectionVideoBanner | quality 85 |
| AmbientVideoBackground | quality 85 |
| About hero | quality 85, placeholder, blurDataURL |
| FeaturedCollection | placeholder, blurDataURL |
| Collections | placeholder, blurDataURL |
| Navigation (menu) | quality 85, sizes, loading lazy |
| LazyImage | (verify quality 85, lazy, blur, sizes) |
| SwipeableImageGallery | main: quality 85, blur; thumbs: keep as-is |
| QuickViewModal | main: quality 85; thumbs: loading lazy, sizes |
| CartDrawer | quality 85, sizes 80px, loading lazy |
| product/[id] | quality 85 |
| shop/[slug] | main quality 85 |
| VideoPlayer | quality 85, placeholder, blurDataURL |
| OptimizedVideo | quality 85, placeholder, blurDataURL |
| Wishlist, Contact, Policy pages | Replace backgroundImage with Next Image fill |

---

If you want, the next step can be implementing these changes in the repo (starting with config and hero components, then product and backgrounds, then the compression script).
