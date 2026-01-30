# Video Files Directory

This directory contains all video files used throughout the Lola Drip website.

## Directory Structure

```
/public/videos/
  ├── products/          # Product hover videos (3-15s, < 2MB)
  ├── collections/       # Collection banner videos (5-10s, < 2MB)
  └── hero/              # Hero background videos (20-30s, < 5MB)
```

## File Naming Convention

- **Product videos**: Match product slug (e.g., `elegant-silk-dress.mp4`)
- **Collection videos**: Use collection name (e.g., `evening-wear.mp4`)
- **Hero videos**: Use descriptive names (e.g., `hero-background.mp4`)

## Video Specifications

### Product Videos (`/products/`)
- **Resolution**: 1080x1350 (portrait) or 1080p
- **Duration**: 3-15 seconds
- **File Size**: < 2MB
- **Frame Rate**: 30fps
- **Bitrate**: 2-3 Mbps
- **Format**: MP4 (H.264)
- **Audio**: None (removed)

### Collection Videos (`/collections/`)
- **Resolution**: 1920x1080 (landscape)
- **Duration**: 5-10 seconds
- **File Size**: < 2MB
- **Frame Rate**: 30fps
- **Bitrate**: 2-3 Mbps
- **Format**: MP4 (H.264)
- **Audio**: None (removed)

### Hero Videos (`/hero/`)
- **Resolution**: 1920x1080 (landscape)
- **Duration**: 20-30 seconds
- **File Size**: < 5MB
- **Frame Rate**: 24fps (cinematic)
- **Bitrate**: 1.5-2 Mbps
- **Format**: MP4 (H.264)
- **Audio**: None (removed)

## FFmpeg Encoding

See the [Video Demo Page](/video-demo) for complete FFmpeg commands.

## Usage in Code

### Product Videos
```tsx
// In data/products.ts
{
  videoUrl: "/videos/products/elegant-silk-dress.mp4",
  // ... other fields
}
```

### Collection Videos
```tsx
// In collection components
<CollectionVideoBanner
  videoUrl="/videos/collections/evening-wear.mp4"
/>
```

### Hero Videos
```tsx
// In hero components
<AmbientVideoBackground
  videoUrl="/videos/hero/hero-background.mp4"
/>
```

## Important Notes

1. **Videos are optional** - Only add to featured/premium products
2. **Always provide fallback images** - Videos may not load on slow connections
3. **Test file sizes** - Verify before deployment
4. **Use descriptive filenames** - Match product slugs for easy management

## Resources

- [Video Rules Documentation](../../docs/VIDEO_RULES.md)
- [Cinematic Video Specs](../../docs/CINEMATIC_VIDEO_SPECS.md)
- [Video Demo Page](/video-demo)
