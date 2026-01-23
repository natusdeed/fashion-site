# Video Compliance Checklist

Use this checklist before adding any video to the site.

## ✅ Pre-Deployment Checklist

### File Size
- [ ] Video file size is **< 5MB**
  - Product videos (3-15s): Target < 2MB
  - Collection banners (5-10s): Target < 2MB
  - Cinematic banners (20-30s): Target < 5MB
- [ ] File size verified before upload
- [ ] If over limit, video has been optimized

### Audio & Autoplay
- [ ] If `autoplay={true}`, then `muted={true}` (REQUIRED)
- [ ] No autoplay with sound (browser policy violation)
- [ ] User can unmute after interaction if desired

### Quality Standards
- [ ] Resolution is at least 720p (preferred 1080p)
- [ ] No visible compression artifacts
- [ ] No pixelation or blur
- [ ] Smooth playback (no stuttering)
- [ ] Professional appearance (matches luxury brand)
- [ ] Proper color grading and lighting

### Fallback Images
- [ ] `posterUrl` or `imageUrl` is provided (REQUIRED)
- [ ] Fallback image is high quality
- [ ] Image displays when video is loading
- [ ] Image displays when video fails to load
- [ ] Image displays on mobile devices

### Mobile Performance
- [ ] Mobile version created (720p) if needed
- [ ] `videoUrlMobile` prop used for mobile optimization
- [ ] Connection speed detection implemented
- [ ] Video disabled or optimized for mobile
- [ ] Touch-friendly controls (if applicable)

### Selective Usage
- [ ] Video is NOT on every product
- [ ] Only featured/premium products have videos
- [ ] Videos used for hero products, new arrivals, or special collections
- [ ] Most products use static images only

### Technical Requirements
- [ ] Format is MP4 (H.264 codec)
- [ ] No external video libraries used
- [ ] Uses native HTML5 video elements
- [ ] Lazy loading implemented (viewport-based)
- [ ] Preload set to "none" for performance

### Testing
- [ ] Tested on mobile devices
- [ ] Tested on slow connections (3G throttled)
- [ ] Tested with JavaScript disabled (fallback works)
- [ ] Tested in Chrome, Safari, Firefox, Edge
- [ ] Core Web Vitals checked (LCP, CLS, FID)
- [ ] Autoplay behavior verified (muted when autoplay)
- [ ] Fallback image displays correctly

## Component-Specific Checks

### OptimizedVideo Component
- [ ] `posterUrl` provided (required)
- [ ] `videoUrlMobile` provided for mobile optimization
- [ ] `muted={true}` if `autoplay={true}`
- [ ] Appropriate `type` prop set ("product", "story", or "ambient")
- [ ] `duration` prop set for auto-controls logic

### ProductCard Component
- [ ] `videoUrl` is optional (not on every product)
- [ ] `imageUrl` provided as fallback
- [ ] Video only plays on hover (desktop) or tap (mobile)
- [ ] Video is muted

### CollectionVideoBanner Component
- [ ] `imageUrl` provided (required, even with video)
- [ ] `videoUrl` is optional
- [ ] Video autoplay is muted
- [ ] Mobile uses image only (no video)

### AmbientVideoBackground Component
- [ ] `fallbackImageUrl` provided (required)
- [ ] Video autoplay is muted
- [ ] Mobile uses image only (no video)
- [ ] Connection-aware loading

### VideoPlayer Component
- [ ] `poster` provided (required)
- [ ] If `autoplay={true}`, component enforces `muted={true}`
- [ ] Custom controls work correctly
- [ ] Keyboard controls work

## Quick Validation

Use the validation utility in development:

```typescript
import { validateVideoConfig, logValidationResults } from '@/lib/video-validation';

const result = validateVideoConfig({
  videoUrl: '/videos/product.mp4',
  autoplay: true,
  muted: true, // Required if autoplay
  posterUrl: '/images/poster.jpg',
  fileSizeBytes: 2 * 1024 * 1024, // 2MB
});

logValidationResults(result, 'Product Video');
```

## Common Violations to Avoid

❌ **Autoplay with sound** - Always mute autoplay videos
❌ **Videos > 5MB** - Optimize or shorten videos
❌ **No fallback image** - Always provide poster/image
❌ **Low quality** - Minimum 720p, no artifacts
❌ **Videos on every product** - Use selectively
❌ **Ignoring mobile** - Optimize for mobile devices
❌ **External libraries** - Use native HTML5 video

## Resources

- [Video Rules Documentation](./VIDEO_RULES.md)
- [Video Optimization Guide](../VIDEO_OPTIMIZATION.md)
- [Cinematic Video Specs](./CINEMATIC_VIDEO_SPECS.md)
- [Collection Video Specs](./COLLECTION_VIDEO_SPECS.md)
