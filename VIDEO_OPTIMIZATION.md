# Video Optimization Guide

This document outlines the video optimization standards implemented in the codebase.

## ✅ Video Specifications

### Format
- **Format**: MP4 (H.264) - Best browser compatibility
- **Container**: `.mp4` files only
- **Codec**: H.264 video codec

### Quality Guidelines
- **Desktop**: Maximum 1080p (1920x1080) - Balance between quality and loading speed
- **Mobile**: 720p (1280x720) - Lighter versions for better performance
- **Compression**: Use appropriate bitrate to balance quality and file size

### Duration Guidelines
- **Product Videos**: 3-15 seconds (short loops for product showcases)
- **Story Videos**: 30-60 seconds (longer narrative content)
- **Ambient Videos**: Any length (background/atmospheric content)

### Audio
- **Default**: Muted by default
- **User Control**: Always provide unmute button for user control
- **Autoplay**: Only works when muted (browser policy)

### Loading Strategy
- **Lazy Loading**: Videos only load when entering viewport
- **Preload**: `preload="none"` - Don't load until needed
- **Intersection Observer**: Uses 50px margin to start loading slightly before viewport entry

### Fallback
- **Poster Image**: Always required - serves as thumbnail and fallback
- **Image Format**: Use optimized images (WebP with JPEG fallback)
- **Loading**: Poster loads immediately, video loads on demand

### Mobile Optimization
- **Responsive Sources**: Use `videoUrlMobile` prop for 720p mobile versions
- **Auto-detection**: Component automatically detects mobile devices
- **Performance**: Lighter versions reduce data usage and improve performance

### Autoplay Behavior
- **Ambient/Background**: Only use autoplay for ambient/background videos
- **Product Videos**: No autoplay (user-triggered on hover/click)
- **Browser Restrictions**: Gracefully handles autoplay restrictions

### Controls
- **Short Videos (3-15s)**: Hide native controls, show custom play/pause overlay
- **Long Videos (30s+)**: Show native controls for full playback control
- **Auto-detection**: Automatically determines based on duration or type

## Usage Examples

### Product Video (Short Loop)
```tsx
import OptimizedVideo from "@/components/OptimizedVideo";

<OptimizedVideo
  videoUrl="/videos/product-showcase-1080p.mp4"
  videoUrlMobile="/videos/product-showcase-720p.mp4"
  posterUrl="/images/product-thumbnail.jpg"
  alt="Product showcase video"
  type="product"
  autoplay={false}
  loop={true}
  muted={true}
  showControls={false}
  duration={10}
  aspectRatio="3/4"
/>
```

### Story Video (Longer Content)
```tsx
<OptimizedVideo
  videoUrl="/videos/brand-story-1080p.mp4"
  videoUrlMobile="/videos/brand-story-720p.mp4"
  posterUrl="/images/story-thumbnail.jpg"
  alt="Brand story video"
  type="story"
  autoplay={false}
  loop={false}
  muted={true}
  showControls={true}
  duration={45}
  aspectRatio="16/9"
/>
```

### Ambient Background Video
```tsx
<OptimizedVideo
  videoUrl="/videos/ambient-background-1080p.mp4"
  videoUrlMobile="/videos/ambient-background-720p.mp4"
  posterUrl="/images/ambient-thumbnail.jpg"
  alt="Ambient background video"
  type="ambient"
  autoplay={true}
  loop={true}
  muted={true}
  showControls={false}
  aspectRatio="16/9"
/>
```

## Component Props

### OptimizedVideo Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `videoUrl` | `string` | **required** | Main video URL (1080p for desktop) |
| `videoUrlMobile` | `string` | `undefined` | Optional 720p version for mobile |
| `posterUrl` | `string` | **required** | Poster/thumbnail image URL |
| `alt` | `string` | **required** | Alt text for accessibility |
| `autoplay` | `boolean` | `false` | Autoplay video (only for ambient) |
| `loop` | `boolean` | `false` | Loop video playback |
| `muted` | `boolean` | `true` | Mute video by default |
| `showControls` | `boolean` | `auto` | Show native controls (auto: based on duration) |
| `duration` | `number` | `undefined` | Video duration in seconds |
| `type` | `"product" \| "story" \| "ambient"` | `"product"` | Video type for auto-configuration |
| `className` | `string` | `""` | Additional CSS classes |
| `aspectRatio` | `string` | `"16/9"` | Aspect ratio (e.g., "16/9", "3/4", "1/1") |
| `onPlay` | `() => void` | `undefined` | Callback when video plays |
| `onPause` | `() => void` | `undefined` | Callback when video pauses |
| `onEnded` | `() => void` | `undefined` | Callback when video ends |

## Features

### ✅ Implemented Features

1. **Format**: MP4 (H.264) - Best compatibility
2. **Quality**: 1080p max (desktop), 720p (mobile)
3. **Length**: Supports 3-15s (products) and 30-60s (stories)
4. **Sound**: Muted by default with unmute button
5. **Loading**: Lazy load (only when in viewport)
6. **Fallback**: Always has poster image (thumbnail)
7. **Mobile**: Uses lighter versions (720p) automatically
8. **Autoplay**: Only for ambient/background videos
9. **Controls**: Auto-shows for long videos (30s+), hides for short loops

### Performance Optimizations

- **Intersection Observer**: Only loads videos when visible
- **Preload None**: Doesn't download video until needed
- **Mobile Detection**: Automatically serves lighter versions
- **Poster Priority**: Poster image loads immediately for better UX
- **Smooth Transitions**: Fade transitions between poster and video

### Accessibility

- **Alt Text**: Required for all videos
- **ARIA Labels**: Proper labels for play/pause/mute buttons
- **Keyboard Navigation**: All controls are keyboard accessible
- **Focus States**: Visible focus indicators

## Best Practices

1. **Always provide poster images** - Essential for loading performance
2. **Use mobile versions** - Reduces data usage on mobile devices
3. **Keep product videos short** - 3-15 seconds for quick engagement
4. **Optimize file sizes** - Balance quality and loading speed
5. **Test autoplay restrictions** - Browsers may block autoplay
6. **Provide unmute option** - Always allow users to enable sound
7. **Use appropriate aspect ratios** - Match your design layout
8. **Monitor performance** - Check Core Web Vitals impact

## Collection Banner Video Specifications

### CollectionVideoBanner Video Requirements

For collection page video banners (e.g., "Evening Wear Collection"):

#### Format & Codec
- **Format**: MP4 (H.264) - Best browser compatibility
- **Container**: `.mp4` files only
- **Codec**: H.264 video codec

#### Resolution
- **Portrait**: 1080x1350 (9:16 aspect ratio)
- **Landscape**: 1920x1080 (16:9 aspect ratio)
- Choose based on your design preference

#### Duration
- **Range**: 5-10 seconds
- **Recommended**: 7-8 seconds for optimal engagement
- Videos should loop seamlessly

#### File Size
- **Maximum**: < 2MB per video
- **Target**: 1.5-1.8MB for best performance
- Critical for fast loading and good user experience

#### Frame Rate
- **Fixed**: 30fps
- Consistent frame rate ensures smooth playback

#### Bitrate
- **Range**: 2-3 Mbps
- **Recommended**: 2.5 Mbps for balance of quality and file size
- Adjust based on content complexity

#### Audio
- **Default**: Muted (required for autoplay)
- **Optional**: Can include audio track, but muted by default
- Users cannot unmute (no controls shown for banner videos)

### 2. Cinematic Banner Videos (Long)
For hero sections and main landing page banners:

#### Format & Codec
- **Format**: MP4 (H.264) - Best browser compatibility
- **Container**: `.mp4` files only
- **Codec**: H.264 video codec

#### Resolution
- **Fixed**: 1920x1080 (16:9 aspect ratio)
- **Landscape only**: Optimized for full-width banners

#### Duration
- **Range**: 20-30 seconds
- **Recommended**: 25 seconds
- Videos should loop seamlessly

#### File Size
- **Maximum**: < 5MB per video
- **Target**: 4-4.5MB for best performance
- Longer duration allows for larger file size

#### Frame Rate
- **Fixed**: 24fps (cinematic)
- Provides film-like quality and feel

#### Bitrate
- **Range**: 1.5-2 Mbps
- **Recommended**: 1.75 Mbps
- Lower bitrate for longer videos to keep file size manageable

#### Audio
- **Required**: None (remove audio track entirely)
- Reduces file size, no audio needed for autoplay banners

See `docs/CINEMATIC_VIDEO_SPECS.md` for full encoding details.

### Collection Banner Video Best Practices

1. **Keep it short** - 5-10 seconds loops perfectly
2. **Optimize file size** - Stay under 2MB for fast loading
3. **Use appropriate resolution** - Match your banner aspect ratio
4. **Test loop seamlessly** - Ensure video loops without visible jump
5. **Focus on lifestyle/vibe** - Show collection atmosphere, not just products
6. **Mobile fallback** - Always provide high-quality poster image
7. **Connection-aware** - Component automatically uses image on slow connections

### Cinematic Banner Video Best Practices

1. **Cinematic feel** - 24fps provides film-like quality
2. **Longer duration** - 20-30 seconds for storytelling
3. **Remove audio** - No audio track needed (saves file size)
4. **Optimize file size** - Stay under 5MB for acceptable loading
5. **Test loop seamlessly** - Ensure video loops without visible jump
6. **Focus on narrative** - Use for brand stories and hero sections
7. **Mobile fallback** - Always provide high-quality poster image

### Example Video Encoding Settings

#### Collection Banner Videos (Short, 5-10s)

```bash
# Portrait (1080x1350)
ffmpeg -i input.mp4 \
  -c:v libx264 \
  -preset medium \
  -crf 23 \
  -vf "scale=1080:1350:force_original_aspect_ratio=decrease,pad=1080:1350:(ow-iw)/2:(oh-ih)/2" \
  -r 30 \
  -b:v 2.5M \
  -maxrate 3M \
  -bufsize 5M \
  -c:a aac \
  -b:a 128k \
  -movflags +faststart \
  -t 8 \
  output.mp4

# Landscape (1920x1080)
ffmpeg -i input.mp4 \
  -c:v libx264 \
  -preset medium \
  -crf 23 \
  -vf "scale=1920:1080:force_original_aspect_ratio=decrease,pad=1920:1080:(ow-iw)/2:(oh-ih)/2" \
  -r 30 \
  -b:v 2.5M \
  -maxrate 3M \
  -bufsize 5M \
  -c:a aac \
  -b:a 128k \
  -movflags +faststart \
  -t 8 \
  output.mp4
```

#### Cinematic Banner Videos (Long, 20-30s)

```bash
# Cinematic (1920x1080, 24fps, no audio)
ffmpeg -i input.mp4 \
  -c:v libx264 \
  -preset medium \
  -crf 24 \
  -vf "scale=1920:1080:force_original_aspect_ratio=decrease,pad=1920:1080:(ow-iw)/2:(oh-ih)/2" \
  -r 24 \
  -b:v 1.75M \
  -maxrate 2M \
  -bufsize 4M \
  -an \
  -movflags +faststart \
  -t 25 \
  output.mp4
```

### File Size Optimization Tips

1. **Use appropriate bitrate** - 2-3 Mbps is sufficient for banner videos
2. **Reduce resolution if needed** - If file size exceeds 2MB, slightly reduce resolution
3. **Optimize source material** - Start with well-compressed source files
4. **Test compression** - Try different CRF values (22-24) to balance quality/size
5. **Remove unnecessary audio** - If muted, consider removing audio track entirely

## Integration

The `OptimizedVideo` component is already integrated into:
- `ProductVideoCard` - Product showcase cards with hover-to-play

The `CollectionVideoBanner` component uses optimized video loading for:
- Collection page banners (e.g., Evening Wear Collection)
- Full-width video headers above product grids

You can use it anywhere in your application for optimized video playback.
