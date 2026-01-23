# Favicon and App Icons Setup Guide

## Required Icons

To complete the setup, you need to add the following icons to the `public` folder:

### Favicon
- `favicon.ico` - 32x32px (or 16x16px) - Main favicon
- `favicon-16x16.png` - 16x16px
- `favicon-32x32.png` - 32x32px

### Apple Touch Icons
- `apple-touch-icon.png` - 180x180px (for iOS devices)
- `apple-touch-icon-57x57.png` - 57x57px
- `apple-touch-icon-60x60.png` - 60x60px
- `apple-touch-icon-72x72.png` - 72x72px
- `apple-touch-icon-76x76.png` - 76x76px
- `apple-touch-icon-114x114.png` - 114x114px
- `apple-touch-icon-120x120.png` - 120x120px
- `apple-touch-icon-144x144.png` - 144x144px
- `apple-touch-icon-152x152.png` - 152x152px

### Android Icons
- `android-chrome-192x192.png` - 192x192px
- `android-chrome-512x512.png` - 512x512px

### Web Manifest
- `site.webmanifest` - Web app manifest file

## How to Generate Icons

### Option 1: Online Tools
1. Visit [Favicon Generator](https://realfavicongenerator.net/)
2. Upload your logo (at least 260x260px recommended)
3. Configure settings for different platforms
4. Download the generated package
5. Extract files to the `public` folder

### Option 2: Design Tools
1. Create icons in Figma, Adobe Illustrator, or similar
2. Export at required sizes
3. Use [ImageOptim](https://imageoptim.com/) or similar to compress
4. Place files in `public` folder

## Recommended Icon Specifications

- **Format**: PNG for most, ICO for favicon.ico
- **Background**: Transparent or brand color
- **Size**: Square (1:1 aspect ratio)
- **Design**: Simple, recognizable at small sizes
- **Colors**: Match your brand palette

## Next Steps

After adding icons to the `public` folder, update `app/layout.tsx` to include icon links in the `<head>` section. The icons will be automatically served from the `public` folder.

## Testing

1. Test favicon in different browsers:
   - Chrome
   - Firefox
   - Safari
   - Edge
2. Test on mobile devices:
   - iOS (check home screen icon)
   - Android (check app icon)
3. Use browser dev tools to verify icons are loading
