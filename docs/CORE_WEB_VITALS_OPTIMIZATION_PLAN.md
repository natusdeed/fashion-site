# Core Web Vitals Optimization Plan

**Target Metrics:**
| Metric | Target | Description |
|--------|--------|-------------|
| LCP | < 2.5s | Largest Contentful Paint – main content visible |
| FID/INP | < 100ms | First Input Delay / Interaction to Next Paint |
| CLS | < 0.1 | Cumulative Layout Shift – visual stability |

---

## Current State Analysis

### ✅ Already Implemented (Good Baseline)

1. **Fonts (layout.tsx)**
   - `next/font/google` with Playfair_Display & Inter
   - `display: "swap"` – prevents FOIT (Flash of Invisible Text)
   - `preload: true` – critical fonts preloaded
   - `subsets: ["latin"]` – reduced character set
   - CSS variables: `--font-playfair`, `--font-inter`

2. **Preconnect Links (layout.tsx)**
   - `preconnect` to fonts.googleapis.com
   - `preconnect` to fonts.gstatic.com (crossOrigin)
   - `preconnect` to images.unsplash.com

3. **Hero Image Preload**
   - `<link rel="preload" as="image" href="/images/header.banner.png" />`

4. **Image Optimization**
   - Next.js `Image` component with `fill`, `sizes`, `priority` on hero
   - LazyImage component for below-fold content

5. **Analytics**
   - `strategy="lazyOnload"` on Google Analytics scripts

---

## Implementation Plan

### 1. Font Loading Optimization (Priority: High)

**Current:** Font config is good. Minor improvements:

| Action | File | Details |
|--------|------|---------|
| Add `adjustFontFallback` | layout.tsx | Reduces CLS during font swap – `adjustFontFallback: true` (default) matches fallback metrics |
| Consider variable fonts | layout.tsx | Inter has `Inter_Variable` – reduces weight variants, smaller bundle |
| Remove `style: ["normal", "italic"]` if italic unused | layout.tsx | Playfair_Display – only load used styles |

**Recommended config (optimized):**
```tsx
const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '600', '700'],
  variable: '--font-playfair',
  preload: true,
  fallback: ['Georgia', 'serif'],
  adjustFontFallback: true, // Match fallback metrics (default)
});

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600'],
  variable: '--font-inter',
  preload: true,
  fallback: ['system-ui', '-apple-system', 'sans-serif'],
  adjustFontFallback: true,
});
```

### 2. Fix Hero Image Path (Priority: Critical)

**Issue:** Hero references `/images/header.banner.png.png` (double extension) but file is `header.banner.png`.

| Action | File | Change |
|--------|------|--------|
| Fix hero image path | components/Hero.tsx | `heroBackgroundImage = "/images/header.banner.png"` |
| Verify preload matches | app/layout.tsx | Already correct: `/images/header.banner.png` |

### 3. Minimize Layout Shifts – CLS (Priority: High)

| Action | Location | Implementation |
|--------|----------|----------------|
| Reserve hero space | Hero.tsx | Section has `h-screen` – good. Ensure container has `min-height` before image loads |
| Add aspect-ratio to image containers | All Image usages | Use `aspect-[4/5]` or explicit `min-h` on wrappers |
| Fix globals.css | globals.css | Remove `aspect-ratio: attr(width) / attr(height)` – poor support. Use `content-visibility: auto` selectively |
| Reserve space for dynamic content | NewsletterPopup, CartDrawer | Modals overlay – low CLS impact. Ensure no layout push |
| Logo dimensions | Logo.tsx | Already has `width={200} height={80}` ✓ |
| Product cards | ProductCard, LazyImage | Add `aspect-[3/4]` to image wrapper divs |

**CSS containment (for product grids):**
```css
.product-grid-item {
  contain: layout style paint;
}
```

### 4. Optimize LCP (Priority: High)

| Action | Details |
|--------|---------|
| Preload hero image | ✅ Already in layout – ensure path matches Hero |
| Inline critical CSS | Next.js handles this – ensure no render-blocking external CSS |
| Defer non-critical | Analytics ✅ lazyOnload. Check for other scripts |
| Hero image quality | Consider `quality={80}` for faster decode (trade quality/size) |
| Fetchpriority | Add `fetchPriority="high"` to hero Image (Next.js 14+) |
| Reduce hero image dimensions | Serve appropriate size – Next.js Image optimizes |

**Hero Image enhancement:**
```tsx
<Image
  src={heroBackgroundImage}
  alt="Luxury fashion collection"
  fill
  priority
  fetchPriority="high"
  quality={85}
  sizes="100vw"
  placeholder="blur"
  blurDataURL="..." // Low-res placeholder
  className="object-cover object-[center_35%]"
/>
```

### 5. INP / FID Optimization (Priority: Medium)

| Action | Details |
|--------|---------|
| Reduce main thread work | Code splitting ✅ (dynamic imports for modals) |
| Defer heavy JS | Framer Motion – consider `LazyMotion` with `domAnimation` subset |
| Avoid layout thrashing | Scroll handlers use `requestAnimationFrame` ✅ |
| Break up long tasks | Use `scheduler.yield()` or chunked rendering for long lists |

### 6. Additional Recommendations

| Item | Action |
|------|--------|
| Web Vitals reporting | Add `@next/web-vitals` or Vercel Analytics for real-user monitoring |
| Lighthouse CI | Add to CI pipeline for regression detection |
| Image formats | next.config already has AVIF, WebP ✓ |
| Font subsetting | `subsets: ['latin']` – consider `latin-ext` only if needed |

---

## Measurement Commands

### Lighthouse (Lab Data)

```powershell
# 1. Start production server (in one terminal)
npm run build
npm run start

# 2. In another terminal, run Lighthouse
npx lighthouse http://localhost:3001 --preset=perf --view --output=html --output-path=./lighthouse-report.html
```

**Chrome DevTools (Easiest):**
1. Open http://localhost:3001 in Chrome
2. F12 → Lighthouse tab
3. Select "Performance" + "Mobile"
4. Click "Analyze page load"

### Real User Monitoring (Field Data)

Add `@next/web-vitals` for real-user Core Web Vitals:

```tsx
// app/layout.tsx or app/web-vitals.tsx
import { sendToAnalytics } from '@/lib/analytics';

export function reportWebVitals(metric) {
  sendToAnalytics(metric);
}
```

### Expected Baseline (Estimated)

| Metric | Good | Needs Improvement | Poor |
|--------|------|-------------------|------|
| **Performance** | 90-100 | 50-89 | 0-49 |
| **LCP** | < 2.5s | 2.5-4s | > 4s |
| **INP/FID** | < 100ms | 100-300ms | > 300ms |
| **CLS** | < 0.1 | 0.1-0.25 | > 0.25 |

*Run Lighthouse to get your actual scores.*

---

## Checklist Summary

- [ ] Fix Hero image path (`header.banner.png.png` → `header.banner.png`)
- [ ] Add `fetchPriority="high"` to hero Image
- [ ] Add `placeholder="blur"` + blurDataURL to hero Image
- [ ] Add `aspect-ratio` or `min-height` to product card image wrappers
- [ ] Review globals.css `aspect-ratio` rule (consider removal)
- [ ] Add `@next/web-vitals` for real-user Core Web Vitals tracking
- [ ] Run Lighthouse and document baseline scores
- [ ] Consider `LazyMotion` for Framer Motion if bundle size is high
