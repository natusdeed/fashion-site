# Collection Video Banner Specifications

This document outlines the exact video specifications for collection page banners (e.g., "Evening Wear Collection").

## Video Requirements

### Format & Codec
- **Format**: MP4 (H.264)
- **Container**: `.mp4` files only
- **Codec**: H.264 video codec
- **Reason**: Best browser compatibility and performance

### Resolution Options
Choose one based on your design:

1. **Portrait**: 1080x1350 (9:16 aspect ratio)
   - Best for: Vertical/mobile-first designs
   - Aspect ratio: 0.8:1

2. **Landscape**: 1920x1080 (16:9 aspect ratio)
   - Best for: Traditional desktop banners
   - Aspect ratio: 1.78:1

### Duration
- **Range**: 5-10 seconds
- **Recommended**: 7-8 seconds
- **Critical**: Video must loop seamlessly without visible jump
- **Purpose**: Short enough to maintain engagement, long enough to show collection vibe

### File Size
- **Maximum**: < 2MB per video
- **Target**: 1.5-1.8MB
- **Critical**: File size directly impacts page load performance
- **Why**: Fast loading is essential for good user experience

### Frame Rate
- **Fixed**: 30fps
- **Reason**: Consistent frame rate ensures smooth playback across devices
- **Note**: Do not use variable frame rate

### Bitrate
- **Range**: 2-3 Mbps
- **Recommended**: 2.5 Mbps
- **Purpose**: Balance between quality and file size
- **Adjustment**: Lower bitrate if file size exceeds 2MB

### Audio
- **Default**: Muted (required for autoplay)
- **Optional**: Can include audio track, but will be muted by default
- **Note**: No unmute controls shown for banner videos (autoplay requirement)

## Video Encoding Guide

### Using FFmpeg

#### Portrait Video (1080x1350)
```bash
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
```

#### Landscape Video (1920x1080)
```bash
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

### FFmpeg Parameters Explained

- `-c:v libx264`: Use H.264 codec
- `-preset medium`: Encoding speed vs compression balance
- `-crf 23`: Quality setting (lower = higher quality, 18-28 range)
- `-vf scale=...`: Resize and pad to exact dimensions
- `-r 30`: Set frame rate to 30fps
- `-b:v 2.5M`: Target bitrate 2.5 Mbps
- `-maxrate 3M`: Maximum bitrate 3 Mbps
- `-bufsize 5M`: Buffer size for rate control
- `-c:a aac`: Audio codec (if audio included)
- `-b:a 128k`: Audio bitrate
- `-movflags +faststart`: Enable fast start (streaming optimization)
- `-t 8`: Duration in seconds (adjust to 5-10 range)

### Using HandBrake (GUI)

1. **Source**: Select your video file
2. **Preset**: Choose "Fast 1080p30" or similar
3. **Dimensions**:
   - Portrait: 1080x1350
   - Landscape: 1920x1080
4. **Video**:
   - Codec: H.264
   - Framerate: 30 fps
   - Constant Quality: RF 23
   - Encoder Preset: Medium
5. **Audio**: 
   - Codec: AAC
   - Bitrate: 128 kbps
   - Or: Remove audio track entirely
6. **Duration**: Trim to 5-10 seconds
7. **Output**: Check file size is < 2MB

## File Size Optimization

If your video exceeds 2MB, try these steps:

1. **Reduce bitrate**: Lower `-b:v` to 2M or 2.2M
2. **Increase CRF**: Try `-crf 24` or `-crf 25` (slightly lower quality)
3. **Reduce resolution slightly**: 
   - Portrait: 1080x1280
   - Landscape: 1920x960
4. **Remove audio**: If not needed, remove audio track entirely
5. **Shorter duration**: Trim to 5-7 seconds instead of 10

## Quality Checklist

Before using a video, verify:

- [ ] Format is MP4 (H.264)
- [ ] Resolution matches spec (1080x1350 or 1920x1080)
- [ ] Duration is 5-10 seconds
- [ ] File size is < 2MB
- [ ] Frame rate is 30fps
- [ ] Bitrate is 2-3 Mbps
- [ ] Video loops seamlessly
- [ ] Poster image is high quality (1920px width recommended)
- [ ] Video shows collection lifestyle/vibe (not just products)

## Testing

1. **Load Test**: Verify video loads quickly on 3G connection
2. **Loop Test**: Ensure seamless loop without visible jump
3. **Mobile Test**: Verify poster image displays on mobile
4. **Performance Test**: Check Core Web Vitals (LCP, CLS)
5. **Cross-browser**: Test in Chrome, Firefox, Safari, Edge

## Best Practices

1. **Start with high-quality source**: Better source = better output
2. **Focus on atmosphere**: Show collection vibe, not just products
3. **Keep it short**: 5-10 seconds maintains engagement
4. **Optimize poster image**: High-quality poster is critical for mobile
5. **Test file size**: Always verify < 2MB before deployment
6. **Ensure seamless loop**: Last frame should match first frame
7. **Mobile-first**: Remember mobile users see poster image, not video

## Example Use Cases

### Evening Wear Collection
- **Resolution**: 1920x1080 (landscape)
- **Duration**: 8 seconds
- **Content**: Elegant models in evening wear, soft lighting
- **File Size**: 1.7MB

### Ready-to-Wear Collection
- **Resolution**: 1080x1350 (portrait)
- **Duration**: 7 seconds
- **Content**: Lifestyle shots, casual elegance
- **File Size**: 1.5MB

### Accessories Collection
- **Resolution**: 1920x1080 (landscape)
- **Duration**: 6 seconds
- **Content**: Close-up details, elegant styling
- **File Size**: 1.3MB
