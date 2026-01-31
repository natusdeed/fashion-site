# Instant Interaction Optimization Audit

**Target:** Zero perceived lag on buttons and menus. TTI < 3 seconds.

---

## Components Requiring Optimization

### 1. **Navigation.tsx** (High Impact)
| Issue | Current | Target | Line |
|-------|---------|--------|------|
| Scroll listener | No throttle, no passive | Throttle 16ms (60fps), `{ passive: true }` | 59-61 |
| Nav shadow | `duration-300` | `duration-150` | 130 |
| Logo hover | `duration-300` | `duration-100` + `active:scale-95` | 143 |
| Nav links | `duration-300` | `duration-100` | 160, 173, 177 |
| Mega menu dropdown | `duration-300`, opacity/translate | `duration-200`, transform-only (GPU) | 184, 207 |
| Icon buttons | `duration-300` | `duration-100` + `active:scale-95` | 226, 245, 274, 293 |
| Search expand | `duration-500` | `duration-200` | 350 |
| Mobile menu items | `duration-200` | OK (already fast) | 429, 455, 479, 502, 520 |

### 2. **SearchBar.tsx** (High Impact)
| Issue | Current | Target | Line |
|-------|---------|--------|------|
| Debounce | 300ms | 150ms | 71-76 |
| Input focus ring | `duration-300` | `duration-100` | 258 |
| Submit/close buttons | `duration-300` | `duration-100` | 262, 281, 301 |
| Result items hover | `duration-200` | OK | 421, 453 |
| Filter panel | AnimatePresence | Keep (smooth) | - |

### 3. **Hero.tsx**
| Issue | Current | Target | Line |
|-------|---------|--------|------|
| CTA button | `duration-300` | `duration-150` + `active:scale-95` | 109 |
| Scroll indicator | `duration-300` | `duration-100` | 134 |
| Scroll listener | Already `{ passive: true }` | ✓ | 40 |

### 4. **app/shop/[slug]/page.tsx**
| Issue | Current | Target | Line |
|-------|---------|--------|------|
| Breadcrumb links | `duration-300` | `duration-100` | 117, 127 |
| Product image hover | `duration-500` | `duration-200` | 157 |
| Thumbnail buttons | `duration-200` | `duration-100` | 192, 291, 314 |
| Add to bag button | `duration-200 md:duration-500` | `duration-150` + `active:scale-95` | 370 |
| Gradient overlay | `duration-500 md:duration-1000` | `duration-200` | 386 |

### 5. **app/page.tsx**
| Issue | Current | Target | Line |
|-------|---------|--------|------|
| CTA button | `duration-300` | `duration-150` + `active:scale-95` | 83 |

### 6. **app/shop/page.tsx**
| Issue | Current | Target | Line |
|-------|---------|--------|------|
| Load More button | `duration-300` | `duration-150` + `active:scale-95` | 58 |

### 7. **ProductCard.tsx**
| Issue | Current | Target |
|-------|---------|--------|
| Wishlist/cart/quick view | Various | `transition-transform duration-100 active:scale-95` |
| Hover states | Framer Motion | Add `will-change: transform` where animated |

### 8. **QuickViewModal.tsx**
| Issue | Current | Target |
|-------|---------|--------|
| Backdrop/modal | AnimatePresence ~300ms | Keep (smooth open), reduce close |
| Buttons | Various | `duration-100` + `active:scale-95` |

### 9. **CartDrawer.tsx**
| Issue | Current | Target |
|-------|---------|--------|
| Backdrop | `duration: 0.3` | `duration: 0.2` |
| Remove item delay | 200ms | 150ms (or instant + optimistic) |
| Close button | `duration-300` | `duration-100` |
| Quantity buttons | - | `active:scale-95` |

### 10. **CollectionVideoBanner.tsx**
| Issue | Current | Target |
|-------|---------|--------|
| CTA button | `duration-300` | `duration-150` + `active:scale-95` |
| Scroll listener | Already `{ passive: true }` | ✓ |

### 11. **MobileBottomNav.tsx**
| Issue | Current | Target |
|-------|---------|--------|
| Nav items | `duration-200` | `duration-100` + `active:scale-95` |

### 12. **globals.css**
| Issue | Current | Target |
|-------|---------|--------|
| Global `*` transition | `transition-colors duration-300` | Remove or reduce to `duration-150` |
| Mobile override | `200ms !important` on all | Keep 200ms for menus, 100ms for buttons |

---

## Optimistic UI Status

| Component | Status | Notes |
|-----------|--------|-------|
| **Cart** | ✅ Already optimistic | State updates immediately, localStorage syncs in background |
| **Wishlist** | ✅ Already optimistic | State updates immediately, localStorage syncs in background |
| **QuickView** | ✅ Instant | Modal opens on state change |
| **Form submissions** | N/A | No API-backed forms yet |

---

## Hardware Acceleration Checklist

- [ ] Use `transform` and `opacity` only (GPU-accelerated)
- [ ] Add `will-change: transform` to frequently animated elements (dropdowns, modals)
- [ ] Prefer `translate3d(0,0,0)` over `translate()` for forced compositing
- [ ] Dropdowns: use `transform: translateY()` not `height`/`display`
- [ ] Mobile menu: Framer Motion already uses transform ✓

---

## Implementation Summary

1. **Navigation**: Throttle scroll, passive listener, reduce all durations to 100-200ms
2. **SearchBar**: Debounce 150ms, reduce input/button transitions
3. **globals.css**: Remove aggressive `* { transition-colors duration-300 }`, add `.btn-instant` utility
4. **All buttons**: Add `transition-transform duration-100 active:scale-95 hover:scale-105`
5. **Menus**: `transition-all duration-200 ease-out`, use transform for dropdowns
