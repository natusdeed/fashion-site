# Cinematic Video Specifications

This document outlines the specifications for cinematic/longer video banners (20-30 seconds, 24fps).

## Video Requirements

### Format & Codec
- **Format**: MP4 (H.264)
- **Container**: `.mp4` files only
- **Codec**: H.264 video codec
- **Reason**: Best browser compatibility and performance

### Resolution
- **Fixed**: 1920x1080 (16:9 aspect ratio)
- **Landscape only**: Optimized for full-width banners
- **Aspect ratio**: 1.78:1

### Duration
- **Range**: 20-30 seconds
- **Recommended**: 25 seconds
- **Critical**: Video must loop seamlessly without visible jump
- **Purpose**: Longer cinematic experience for hero/banner sections

### File Size
- **Maximum**: < 5MB per video
- **Target**: 4-4.5MB
- **Critical**: File size directly impacts page load performance
- **Why**: Longer duration allows for larger file size while maintaining performance

### Frame Rate
- **Fixed**: 24fps (cinematic)
- **Reason**: 24fps provides cinematic feel, standard for film content
- **Note**: Do not use variable frame rate

### Bitrate
- **Range**: 1.5-2 Mbps
- **Recommended**: 1.75 Mbps
- **Purpose**: Lower bitrate for longer videos to keep file size manageable
- **Adjustment**: Increase bitrate if quality suffers, but stay under 2 Mbps

### Audio
- **Required**: None (remove audio track entirely)
- **Reason**: Reduces file size, no audio needed for autoplay banners
- **Note**: Audio track should be completely removed, not just muted

## Video Encoding Guide

### Using FFmpeg

#### Cinematic Banner Video (1920x1080, 24fps, 20-30s)
```bash
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

### FFmpeg Parameters Explained

- `-c:v libx264`: Use H.264 codec
- `-preset medium`: Encoding speed vs compression balance
- `-crf 24`: Quality setting (slightly higher than short videos for file size)
- `-vf scale=...`: Resize and pad to exact dimensions
- `-r 24`: Set frame rate to 24fps (cinematic)
- `-b:v 1.75M`: Target bitrate 1.75 Mbps
- `-maxrate 2M`: Maximum bitrate 2 Mbps
- `-bufsize 4M`: Buffer size for rate control
- `-an`: Remove audio track entirely (no audio)
- `-movflags +faststart`: Enable fast start (streaming optimization)
- `-t 25`: Duration in seconds (adjust to 20-30 range)

### Alternative: Higher Quality (if file size allows)
```bash
ffmpeg -i input.mp4 \
  -c:v libx264 \
  -preset slow \
  -crf 23 \
  -vf "scale=1920:1080:force_original_aspect_ratio=decrease,pad=1920:1080:(ow-iw)/2:(oh-ih)/2" \
  -r 24 \
  -b:v 1.8M \
  -maxrate 2M \
  -bufsize 4M \
  -an \
  -movflags +faststart \
  -t 25 \
  output.mp4
```

## File Size Optimization

If your video exceeds 5MB, try these steps:

1. **Reduce bitrate**: Lower `-b:v` to 1.5M
2. **Increase CRF**: Try `-crf 25` or `-crf 26` (slightly lower quality)
3. **Shorter duration**: Trim to 20-22 seconds instead of 30
4. **Use slower preset**: `-preset slow` for better compression (takes longer to encode)
5. **Verify audio removed**: Ensure `-an` flag is present

## Quality Checklist

Before using a video, verify:

- [ ] Format is MP4 (H.264)
- [ ] Resolution is exactly 1920x1080
- [ ] Duration is 20-30 seconds
- [ ] File size is < 5MB
- [ ] Frame rate is 24fps
- [ ] Bitrate is 1.5-2 Mbps
- [ ] Audio track is completely removed (not just muted)
- [ ] Video loops seamlessly
- [ ] Poster image is high quality (1920px width recommended)
- [ ] Video has cinematic feel (24fps)

## Comparison: Short vs Cinematic Videos

| Specification | Short Banner (5-10s) | Cinematic Banner (20-30s) |
|--------------|---------------------|---------------------------|
| **Resolution** | 1080x1350 or 1920x1080 | 1920x1080 only |
| **Duration** | 5-10 seconds | 20-30 seconds |
| **File Size** | < 2MB | < 5MB |
| **Frame Rate** | 30fps | 24fps (cinematic) |
| **Bitrate** | 2-3 Mbps | 1.5-2 Mbps |
| **Audio** | Optional (muted) | None (removed) |
| **Use Case** | Collection pages | Hero sections, main banners |

## When to Use Each Format

### Use Short Banner (5-10s, 30fps) when:
- Collection page banners
- Quick product showcases
- Need fast loading (< 2MB)
- Mobile-first approach
- Quick engagement needed

### Use Cinematic Banner (20-30s, 24fps) when:
- Hero sections
- Main landing page banners
- Storytelling content
- Cinematic brand experience
- Desktop-focused experiences
- Longer engagement desired

## Testing

1. **Load Test**: Verify video loads within 2-3 seconds on 4G connection
2. **Loop Test**: Ensure seamless loop without visible jump
3. **Mobile Test**: Verify poster image displays on mobile (video may not play)
4. **Performance Test**: Check Core Web Vitals (LCP, CLS)
5. **Cross-browser**: Test in Chrome, Firefox, Safari, Edge
6. **File Size**: Confirm < 5MB before deployment

## Best Practices

1. **Start with high-quality source**: Better source = better output
2. **Focus on storytelling**: Use longer duration for narrative content
3. **24fps for cinematic feel**: Standard film frame rate
4. **Remove audio completely**: Saves file size, no need for muted audio
5. **Optimize poster image**: Critical for mobile and initial load
6. **Test file size**: Always verify < 5MB before deployment
7. **Ensure seamless loop**: Last frame should match first frame
8. **Consider connection speed**: Longer videos need good connection

## Example Use Cases

### Hero Banner Video
- **Resolution**: 1920x1080
- **Duration**: 25 seconds
- **Content**: Brand story, lifestyle, atmosphere
- **File Size**: 4.2MB
- **Frame Rate**: 24fps

### Main Landing Banner
- **Resolution**: 1920x1080
- **Duration**: 30 seconds
- **Content**: Seasonal collection, campaign launch
- **File Size**: 4.8MB
- **Frame Rate**: 24fps

### Story Banner
- **Resolution**: 1920x1080
- **Duration**: 20 seconds
- **Content**: Behind-the-scenes, brand values
- **File Size**: 3.5MB
- **Frame Rate**: 24fps
