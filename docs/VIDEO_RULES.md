# Video Implementation Rules

**CRITICAL: These rules must be followed for all video implementations**

## ❌ Don't Use Autoplay with Sound

- **Rule**: Videos that autoplay MUST be muted
- **Why**: Browser policies prevent autoplay with sound; it's also poor UX
- **Implementation**: 
  - When `autoplay={true}`, always set `muted={true}`
  - Never allow unmuted autoplay
  - User can unmute after interaction if desired

**Current Status**: ✅ All components enforce muted autoplay

## ❌ Don't Use Videos Larger Than 5MB

- **Rule**: Maximum file size is 5MB per video
- **Why**: Large files hurt page load performance and user experience
- **Implementation**:
  - Validate file size before deployment
  - Use compression tools (FFmpeg) to optimize
  - Consider shorter durations or lower bitrates if needed
  - Monitor Core Web Vitals (LCP, FID)

**Target Sizes**:
- Product videos (3-15s): < 2MB
- Collection banners (5-10s): < 2MB  
- Cinematic banners (20-30s): < 5MB
- Ambient backgrounds (20-30s): < 5MB

**Current Status**: ⚠️ No automatic validation - manual checks required

## ❌ Don't Show Video on Every Product (Selective is Premium)

- **Rule**: Videos should be selective, not on every product
- **Why**: Premium feel, better performance, highlights special items
- **Implementation**:
  - Only add `videoUrl` to featured/premium products
  - Use videos for hero products, new arrivals, or special collections
  - Most products should use static images only

**Current Status**: ✅ Videos are optional in product data structure

## ❌ Don't Use Low-Quality Videos (Damages Luxury Brand)

- **Rule**: Maintain high quality standards for all videos
- **Why**: Low quality damages brand perception and user trust
- **Quality Standards**:
  - **Resolution**: Minimum 720p, preferred 1080p
  - **Bitrate**: 1.5-3 Mbps (depending on duration)
  - **Frame Rate**: 24fps (cinematic) or 30fps (standard)
  - **Codec**: H.264 (MP4) for best compatibility
  - **No pixelation, blur, or compression artifacts**

**Quality Checklist**:
- [ ] Resolution is at least 720p
- [ ] No visible compression artifacts
- [ ] Smooth playback (no stuttering)
- [ ] Proper color grading
- [ ] Professional lighting and composition
- [ ] Matches brand aesthetic

**Current Status**: ⚠️ No automatic validation - manual quality review required

## ❌ Don't Forget Fallback Images

- **Rule**: Every video MUST have a fallback image (poster/thumbnail)
- **Why**: 
  - Shows immediately while video loads
  - Required for mobile performance
  - Essential for accessibility
  - Works when video fails to load

**Implementation**:
- Always provide `posterUrl` or `imageUrl` prop
- Fallback image should be high quality (same resolution as video)
- Image loads immediately, video loads on demand
- Image displays when video is paused or not loaded

**Current Status**: ✅ All components require fallback images

## ❌ Don't Ignore Mobile Performance

- **Rule**: Optimize videos specifically for mobile devices
- **Why**: Mobile users have slower connections and limited data
- **Implementation**:
  - Use `videoUrlMobile` prop for 720p mobile versions
  - Detect mobile devices and serve lighter versions
  - Consider disabling video on mobile for some use cases
  - Use connection speed detection
  - Lazy load videos (only when in viewport)

**Mobile Optimizations**:
- Lower resolution (720p vs 1080p)
- Smaller file sizes
- Connection-aware loading
- Touch-friendly controls
- Reduced autoplay (or none)

**Current Status**: ✅ Mobile optimizations implemented

## ❌ Don't Use External Video Libraries Initially (Bloat)

- **Rule**: Use native HTML5 video elements, not external libraries
- **Why**: 
  - Smaller bundle size
  - Better performance
  - No external dependencies
  - Full control over behavior

**Current Status**: ✅ No external video libraries used

## Implementation Checklist

Before adding any video to the site:

- [ ] Video file size is < 5MB (verify before upload)
- [ ] Video is muted if autoplay is enabled
- [ ] High-quality video (720p minimum, no artifacts)
- [ ] Fallback image provided and tested
- [ ] Mobile version created (720p) if needed
- [ ] Video is selective (not on every product)
- [ ] No external video libraries used
- [ ] Tested on mobile devices
- [ ] Tested on slow connections
- [ ] Core Web Vitals checked (LCP, CLS)

## Video Component Usage

### OptimizedVideo (Recommended)
```tsx
<OptimizedVideo
  videoUrl="/videos/product-1080p.mp4"
  videoUrlMobile="/videos/product-720p.mp4" // Optional
  posterUrl="/images/product-poster.jpg" // Required
  alt="Product showcase"
  type="product"
  autoplay={false} // Never true with sound
  muted={true} // Always true if autoplay
  loop={true}
/>
```

### ProductCard (For product grids)
- Videos are optional (`videoUrl` prop)
- Only add to featured products
- Hover to play (desktop)
- Tap to play (mobile)
- Always has image fallback

### CollectionVideoBanner (For collection pages)
- Video is optional
- Autoplay muted on desktop only
- Falls back to image on mobile
- Connection-aware loading

### AmbientVideoBackground (For hero sections)
- Autoplay muted
- Desktop only (image on mobile)
- Connection-aware
- Pauses when tab hidden

## File Size Optimization

If video exceeds 5MB:

1. **Reduce bitrate**: Lower to 1.5-2 Mbps
2. **Shorten duration**: Trim unnecessary frames
3. **Lower resolution**: Use 720p instead of 1080p (if acceptable)
4. **Increase compression**: Use slower FFmpeg preset
5. **Remove audio**: Ensure audio track is removed (not just muted)

## Quality Standards

### Minimum Requirements
- Resolution: 720p (1280x720)
- Bitrate: 1.5 Mbps
- Frame Rate: 24fps or 30fps
- Format: MP4 (H.264)

### Recommended (Luxury Brand)
- Resolution: 1080p (1920x1080)
- Bitrate: 2-3 Mbps
- Frame Rate: 24fps (cinematic) or 30fps (standard)
- Format: MP4 (H.264)
- Professional color grading
- Smooth, artifact-free playback

## Testing Requirements

Before deploying any video:

1. **File Size Check**: Verify < 5MB
2. **Quality Review**: Check for artifacts, blur, pixelation
3. **Mobile Test**: Test on actual mobile device
4. **Slow Connection**: Test on throttled 3G connection
5. **Fallback Test**: Disable JavaScript, verify image shows
6. **Performance**: Check Core Web Vitals
7. **Browser Test**: Test in Chrome, Safari, Firefox, Edge
8. **Autoplay Test**: Verify muted when autoplay enabled

## Enforcement

These rules are enforced through:
- Code review process
- Pre-deployment checks
- Performance monitoring
- User feedback

**Violations should be caught before production deployment.**
