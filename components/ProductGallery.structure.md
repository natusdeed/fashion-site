# ProductGallery Component Structure

## Component Overview
A video-enabled product gallery that displays both images and videos with thumbnail navigation, swipeable on mobile, and optimized video playback.

## Props Interface
```typescript
interface ProductGalleryProps {
  media: MediaItem[];      // Array of images and videos
  productName: string;     // For alt text and accessibility
  className?: string;       // Optional additional classes
  initialIndex?: number;   // Optional starting media index (default: 0)
}

interface MediaItem {
  type: 'image' | 'video';
  url: string;             // Image URL or video URL (MP4)
  webmUrl?: string;        // Optional WebM fallback for video
  thumbnail?: string;      // Optional custom thumbnail (for videos)
  poster?: string;         // Video poster image (required for videos)
  alt: string;             // Alt text for accessibility
  videoUrlMobile?: string; // Optional 720p mobile video
}
```

## Component Structure

```
ProductGallery
├── Container (responsive: 60% desktop, 100% mobile)
│   │
│   ├── Main Display Area
│   │   ├── Image Display (when current media is image)
│   │   │   ├── Next.js Image (optimized)
│   │   │   ├── Pinch-to-zoom Container (mobile)
│   │   │   └── Zoom Controls (mobile)
│   │   │
│   │   └── Video Display (when current media is video)
│   │       ├── HTML5 <video> element
│   │       │   ├── MP4 source (primary)
│   │       │   └── WebM source (fallback, optional)
│   │       ├── Poster Image Overlay (when paused)
│   │       ├── Custom Controls Overlay
│   │       │   ├── Play/Pause Button (center)
│   │       │   ├── Mute/Unmute Button (bottom-right)
│   │       │   └── Progress Bar (optional, bottom)
│   │       └── Loading Indicator
│   │
│   └── Thumbnail Strip
│       ├── Scrollable Container
│       │   ├── Image Thumbnails
│       │   │   ├── Next.js Image (optimized)
│   │   │   └── Active Indicator (gold border)
│   │   │
│       │   └── Video Thumbnails
│       │       ├── Next.js Image (poster/thumbnail)
│       │       ├── Play Icon Overlay (gold)
│       │       └── Active Indicator (gold border)
│       │
│       └── Navigation Arrows (if many thumbnails, optional)
```

## State Management

```typescript
const [currentIndex, setCurrentIndex] = useState(initialIndex || 0);
const [isVideoPlaying, setIsVideoPlaying] = useState(false);
const [isMuted, setIsMuted] = useState(true);
const [loadedVideos, setLoadedVideos] = useState<Set<number>>(new Set());
const [isVideoLoading, setIsVideoLoading] = useState(false);

// Mobile swipe/touch
const [touchStart, setTouchStart] = useState(0);
const [touchEnd, setTouchEnd] = useState(0);
const [isSwiping, setIsSwiping] = useState(false);

// Image zoom (mobile)
const [imageZoom, setImageZoom] = useState(false);
const [imageScale, setImageScale] = useState(1);
const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 });
const [lastTouchDistance, setLastTouchDistance] = useState(0);

// Refs
const videoRef = useRef<HTMLVideoElement>(null);
const containerRef = useRef<HTMLDivElement>(null);
const thumbnailContainerRef = useRef<HTMLDivElement>(null);
```

## Key Features Implementation

### 1. Main Display Area
- **Conditional Rendering**: Switches between Image and Video based on `media[currentIndex].type`
- **Smooth Transitions**: Fade transition (400ms) when switching between media
- **Responsive Sizing**: 
  - Desktop: `w-[60%]` or `max-w-[60%]`
  - Mobile: `w-full`
- **Aspect Ratio**: Maintains aspect ratio for both images and videos

### 2. Video Player
- **Custom Controls**: 
  - Play/Pause button (center overlay, elegant design)
  - Mute/Unmute button (bottom-right, always visible)
  - Gold accent (#D4AF37) for active states
- **Lazy Loading**: 
  - Only loads video when thumbnail is clicked
  - Uses Intersection Observer to detect when video enters viewport
- **preload="metadata"**: Loads only metadata, not full video
- **Poster Image**: Always shown as fallback when video is paused
- **Loop**: Enabled by default
- **Format Support**: MP4 primary, WebM fallback
- **Mobile Optimization**: Uses mobile video URL if provided

### 3. Thumbnail Strip
- **Horizontal Scrollable**: Smooth scrolling with snap points
- **Mix of Media**: Displays both image and video thumbnails
- **Video Thumbnails**: 
  - Shows poster/thumbnail image
  - Gold play icon overlay (small, bottom-center or center)
  - Indicates video content
- **Active Indicator**: 
  - Gold border (#D4AF37) around active thumbnail
  - Smooth transition when switching
- **Click to Switch**: Clicking thumbnail switches main display
- **Responsive**: Scrollable on mobile, visible on desktop

### 4. Mobile Features
- **Swipeable Gallery**: 
  - Left swipe: Next media
  - Right swipe: Previous media
  - Smooth animation with momentum
  - Prevents default scroll when swiping
- **Pinch-to-Zoom for Images**: 
  - Two-finger pinch gesture
  - Zoom in/out on images
  - Pan when zoomed
  - Reset on double-tap
- **Touch-Friendly Controls**: 
  - Larger touch targets (min 44x44px)
  - Visual feedback on touch

### 5. Video Optimization
- **Lazy Loading Strategy**:
  - Videos only load when their thumbnail is clicked
  - Uses `loadedVideos` Set to track which videos have been loaded
  - Intersection Observer for viewport detection
- **Poster Image**: 
  - Always required for videos
  - Shows when video is paused or not loaded
  - Serves as thumbnail in thumbnail strip
- **Muted by Default**: 
  - Videos start muted
  - Unmute button always available
- **preload="metadata"**: 
  - Only loads video metadata (duration, dimensions)
  - Full video loads on play
- **Performance**: 
  - Stops video when switching to different media
  - Cleans up video resources when not in use

### 6. Styling Approach
- **Tailwind CSS**: All styling with Tailwind
- **Gold Accent**: #D4AF37 for:
  - Active thumbnail border
  - Play icon overlays
  - Control button active states
  - Hover states
- **Smooth Transitions**: 
  - `transition-all duration-300` for most interactions
  - `duration-[400ms]` for image/video fade
- **Custom Video Controls**: 
  - Backdrop blur effects
  - Rounded buttons
  - Elegant play button overlay (large, centered)
  - Subtle shadows and borders
- **Active State Indicators**: 
  - Gold border on active thumbnail
  - Visual feedback on all interactive elements

## Accessibility
- **ARIA Labels**: All interactive elements have proper labels
- **Keyboard Navigation**: 
  - Arrow keys to navigate thumbnails
  - Space/Enter to play/pause video
  - Escape to close zoom (mobile)
- **Alt Text**: Required for all images
- **Focus States**: Visible focus indicators
- **Screen Reader Friendly**: Proper semantic HTML

## Performance Optimizations
- **Lazy Loading**: Videos only load when needed
- **Image Optimization**: Next.js Image component for all images
- **Intersection Observer**: Efficient viewport detection
- **Event Cleanup**: Proper cleanup of event listeners
- **Memory Management**: Unload videos when not in use

## Mobile-Specific Features
- **Swipe Detection**: 
  - Minimum swipe distance: 50px
  - Prevents accidental swipes
  - Smooth momentum scrolling
- **Pinch-to-Zoom**: 
  - Two-finger gesture detection
  - Scale limits: 1x to 3x
  - Pan when zoomed
  - Reset functionality
- **Touch Events**: 
  - `touchstart`, `touchmove`, `touchend`
  - Prevents default browser behavior
  - Handles multi-touch gestures

## Component Structure (Detailed)

### Main Display Container
```tsx
<div className="w-full md:w-[60%] mx-auto">
  {/* Image Display */}
  {currentMedia.type === 'image' && (
    <div className="relative aspect-[3/4]">
      <Image />
      {/* Pinch-to-zoom container (mobile) */}
    </div>
  )}
  
  {/* Video Display */}
  {currentMedia.type === 'video' && (
    <div className="relative aspect-[3/4]">
      <video>
        <source src={mp4Url} type="video/mp4" />
        {webmUrl && <source src={webmUrl} type="video/webm" />}
      </video>
      {/* Custom controls overlay */}
      {/* Poster image overlay */}
    </div>
  )}
</div>
```

### Thumbnail Strip
```tsx
<div className="mt-4 overflow-x-auto">
  <div className="flex gap-2">
    {media.map((item, index) => (
      <button onClick={() => setCurrentIndex(index)}>
        {item.type === 'image' ? (
          <Image thumbnail />
        ) : (
          <>
            <Image poster />
            <PlayIcon overlay />
          </>
        )}
        {index === currentIndex && <ActiveBorder />}
      </button>
    ))}
  </div>
</div>
```

## Event Handlers

### Desktop
- `onClick` on thumbnails: Switch media
- `onMouseEnter/Leave` on video: Show/hide controls
- `onClick` on play button: Toggle play/pause
- `onClick` on mute button: Toggle mute

### Mobile
- `onTouchStart/Move/End`: Swipe detection
- `onTouchStart/Move/End`: Pinch-to-zoom (images only)
- `onClick` on thumbnails: Switch media
- `onClick` on video area: Toggle play/pause
- `onClick` on mute button: Toggle mute

## Styling Details

### Video Controls
- Play button: Large (64x64px), centered, gold accent, backdrop blur
- Mute button: Small (44x44px), bottom-right, always visible
- Controls overlay: Semi-transparent background, smooth fade in/out

### Thumbnails
- Size: 80x80px (desktop), 60x60px (mobile)
- Border: 2px gold when active
- Spacing: 8px gap between thumbnails
- Scroll: Smooth horizontal scroll with snap

### Transitions
- Media switch: 400ms fade
- Thumbnail selection: 300ms border transition
- Control visibility: 200ms fade
- Zoom: Smooth scale transform
