# Collection Video Validation Checklist

Use this checklist to verify your collection banner videos meet all specifications before uploading.

## ✅ Pre-Upload Validation

### Format & Codec
- [ ] File extension is `.mp4`
- [ ] Codec is H.264 (check with `ffprobe -v error -select_streams v:0 -show_entries stream=codec_name -of default=noprint_wrappers=1:nokey=1 video.mp4`)
- [ ] Container format is MP4

### Resolution
- [ ] **Portrait**: Exactly 1080x1350 pixels
- [ ] **OR Landscape**: Exactly 1920x1080 pixels
- [ ] No letterboxing or pillarboxing (video fills entire frame)
- [ ] Aspect ratio matches chosen format (9:16 for portrait, 16:9 for landscape)

### Duration
- [ ] Video length is between 5-10 seconds
- [ ] Video loops seamlessly (last frame matches first frame)
- [ ] No visible jump or cut when looping

### File Size
- [ ] File size is **less than 2MB** (check with `ls -lh video.mp4`)
- [ ] Target size: 1.5-1.8MB for optimal performance
- [ ] If over 2MB, re-encode with lower bitrate or shorter duration

### Frame Rate
- [ ] Frame rate is exactly 30fps (check with `ffprobe -v error -select_streams v:0 -show_entries stream=r_frame_rate -of default=noprint_wrappers=1:nokey=1 video.mp4`)
- [ ] No variable frame rate (VFR)
- [ ] Consistent frame rate throughout

### Bitrate
- [ ] Video bitrate is between 2-3 Mbps
- [ ] Recommended: 2.5 Mbps
- [ ] Check with: `ffprobe -v error -select_streams v:0 -show_entries stream=bit_rate -of default=noprint_wrappers=1:nokey=1 video.mp4`

### Audio
- [ ] Audio is muted OR audio track is removed
- [ ] If audio exists, it's muted by default (component handles this)
- [ ] Audio codec is AAC (if present)

## Quick Validation Commands

### Check Video Info
```bash
# Get all video information
ffprobe -v error -show_entries \
  stream=codec_name,width,height,r_frame_rate,bit_rate \
  -of default=noprint_wrappers=1 video.mp4
```

### Check File Size
```bash
# Get file size in MB
ls -lh video.mp4 | awk '{print $5}'
```

### Check Duration
```bash
# Get duration in seconds
ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 video.mp4
```

### Check Frame Rate
```bash
# Get frame rate
ffprobe -v error -select_streams v:0 -show_entries stream=r_frame_rate -of default=noprint_wrappers=1:nokey=1 video.mp4
```

### Check Bitrate
```bash
# Get video bitrate in bps (divide by 1,000,000 for Mbps)
ffprobe -v error -select_streams v:0 -show_entries stream=bit_rate -of default=noprint_wrappers=1:nokey=1 video.mp4
```

## Validation Script

Save this as `validate-video.sh`:

```bash
#!/bin/bash

VIDEO=$1

if [ -z "$VIDEO" ]; then
  echo "Usage: ./validate-video.sh video.mp4"
  exit 1
fi

echo "Validating: $VIDEO"
echo "================================"

# File size
SIZE=$(stat -f%z "$VIDEO" 2>/dev/null || stat -c%s "$VIDEO" 2>/dev/null)
SIZE_MB=$(echo "scale=2; $SIZE / 1024 / 1024" | bc)
echo "File Size: ${SIZE_MB}MB"
if (( $(echo "$SIZE_MB < 2" | bc -l) )); then
  echo "✅ File size OK (< 2MB)"
else
  echo "❌ File size too large (>= 2MB)"
fi

# Codec
CODEC=$(ffprobe -v error -select_streams v:0 -show_entries stream=codec_name -of default=noprint_wrappers=1:nokey=1 "$VIDEO")
echo "Codec: $CODEC"
if [ "$CODEC" = "h264" ]; then
  echo "✅ Codec OK (H.264)"
else
  echo "❌ Wrong codec (must be H.264)"
fi

# Resolution
WIDTH=$(ffprobe -v error -select_streams v:0 -show_entries stream=width -of default=noprint_wrappers=1:nokey=1 "$VIDEO")
HEIGHT=$(ffprobe -v error -select_streams v:0 -show_entries stream=height -of default=noprint_wrappers=1:nokey=1 "$VIDEO")
echo "Resolution: ${WIDTH}x${HEIGHT}"
if [ "$WIDTH" = "1080" ] && [ "$HEIGHT" = "1350" ]; then
  echo "✅ Resolution OK (Portrait: 1080x1350)"
elif [ "$WIDTH" = "1920" ] && [ "$HEIGHT" = "1080" ]; then
  echo "✅ Resolution OK (Landscape: 1920x1080)"
else
  echo "❌ Wrong resolution (must be 1080x1350 or 1920x1080)"
fi

# Duration
DURATION=$(ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "$VIDEO")
DURATION_INT=$(echo "$DURATION" | cut -d. -f1)
echo "Duration: ${DURATION}s"
if [ "$DURATION_INT" -ge 5 ] && [ "$DURATION_INT" -le 10 ]; then
  echo "✅ Duration OK (5-10 seconds)"
else
  echo "❌ Duration out of range (must be 5-10 seconds)"
fi

# Frame rate
FPS=$(ffprobe -v error -select_streams v:0 -show_entries stream=r_frame_rate -of default=noprint_wrappers=1:nokey=1 "$VIDEO")
echo "Frame Rate: $FPS"
if [ "$FPS" = "30/1" ]; then
  echo "✅ Frame rate OK (30fps)"
else
  echo "❌ Wrong frame rate (must be 30fps)"
fi

# Bitrate
BITRATE=$(ffprobe -v error -select_streams v:0 -show_entries stream=bit_rate -of default=noprint_wrappers=1:nokey=1 "$VIDEO")
BITRATE_MBPS=$(echo "scale=2; $BITRATE / 1000000" | bc)
echo "Bitrate: ${BITRATE_MBPS}Mbps"
if (( $(echo "$BITRATE_MBPS >= 2 && $BITRATE_MBPS <= 3" | bc -l) )); then
  echo "✅ Bitrate OK (2-3 Mbps)"
else
  echo "❌ Bitrate out of range (must be 2-3 Mbps)"
fi

echo "================================"
echo "Validation complete!"
```

Make it executable:
```bash
chmod +x validate-video.sh
```

Usage:
```bash
./validate-video.sh your-video.mp4
```

## Common Issues & Solutions

### Issue: File size > 2MB
**Solution**: 
- Reduce bitrate to 2M or 2.2M
- Increase CRF value (try 24 or 25)
- Shorten duration to 5-7 seconds
- Remove audio track if not needed

### Issue: Wrong resolution
**Solution**: 
- Use FFmpeg scale filter with padding
- Ensure exact dimensions (1080x1350 or 1920x1080)
- Check aspect ratio matches

### Issue: Duration too long/short
**Solution**: 
- Trim video using `-t 8` in FFmpeg
- Or use `-ss` to start at specific time
- Example: `-ss 00:00:02 -t 8` (start at 2s, duration 8s)

### Issue: Frame rate not 30fps
**Solution**: 
- Force frame rate: `-r 30` in FFmpeg
- Ensure source video is 30fps or convert it first

### Issue: Bitrate out of range
**Solution**: 
- Set target bitrate: `-b:v 2.5M`
- Set max bitrate: `-maxrate 3M`
- Set buffer: `-bufsize 5M`

## Final Checklist Before Deployment

- [ ] All validation checks pass
- [ ] Video loops seamlessly
- [ ] Poster image is high quality (1920px width)
- [ ] Tested on mobile (should show poster image)
- [ ] Tested on desktop (should show video)
- [ ] File size confirmed < 2MB
- [ ] Video loads quickly on 3G connection
- [ ] No visible compression artifacts
- [ ] Content shows collection lifestyle/vibe

## Quick Reference

| Spec | Value |
|------|-------|
| Format | MP4 (H.264) |
| Resolution | 1080x1350 (portrait) or 1920x1080 (landscape) |
| Duration | 5-10 seconds |
| File Size | < 2MB |
| Frame Rate | 30fps |
| Bitrate | 2-3 Mbps |
| Audio | Optional (muted by default) |
