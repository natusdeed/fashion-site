import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // Lola Drip Design System - Primary Colors
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        // Primary Color Palette
        cream: {
          DEFAULT: '#F5F1E8',
          50: '#FBF9F6',
          100: '#F5F1E8',
          200: '#E8E0D0',
          300: '#D9CFB8',
        },
        black: {
          DEFAULT: '#2C2C2C',
          soft: '#2C2C2C',
          900: '#1A1A1A',
          800: '#2C2C2C',
          700: '#3A3A3A',
        },
        gold: {
          DEFAULT: '#D4AF37',
          accent: '#D4AF37',
          50: '#FEFBF3',
          100: '#FDF6E3',
          200: '#F9ECC2',
          300: '#F4DF96',
          400: '#EDCC60',
          500: '#D4AF37',
          600: '#B8941F',
          700: '#92701A',
        },
      },
      // Typography System
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
        playfair: ['var(--font-playfair)', 'Georgia', 'serif'],
        inter: ['var(--font-inter)', 'system-ui', '-apple-system', 'sans-serif'],
      },
      fontWeight: {
        light: '300',
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
        extrabold: '900',
      },
      // Spacing Scale - 4px base unit (Tailwind default)
      // Already configured: 1 = 4px, 2 = 8px, 3 = 12px, etc.
      spacing: {
        // Custom spacing if needed beyond default 4px scale
      },
      // Border Radius System
      borderRadius: {
        'button': '4px',      // 4px for buttons
        'standard': '8px',    // 8px standard
        'card': '8px',        // Cards use standard
        'lg': '12px',         // Large radius
        'xl': '16px',         // Extra large
      },
      // Shadow System - Subtle elevation with warm tones
      boxShadow: {
        'sm': '0 1px 2px 0 rgba(44, 44, 44, 0.05)',
        'DEFAULT': '0 1px 3px 0 rgba(44, 44, 44, 0.1), 0 1px 2px -1px rgba(44, 44, 44, 0.1)',
        'md': '0 4px 6px -1px rgba(44, 44, 44, 0.1), 0 2px 4px -2px rgba(44, 44, 44, 0.1)',
        'lg': '0 10px 15px -3px rgba(44, 44, 44, 0.1), 0 4px 6px -4px rgba(44, 44, 44, 0.1)',
        'xl': '0 20px 25px -5px rgba(44, 44, 44, 0.1), 0 8px 10px -6px rgba(44, 44, 44, 0.1)',
        '2xl': '0 25px 50px -12px rgba(44, 44, 44, 0.25)',
        // Warm-toned shadows with gold accents
        'warm-sm': '0 1px 2px 0 rgba(212, 175, 55, 0.05)',
        'warm-md': '0 4px 6px -1px rgba(212, 175, 55, 0.08), 0 2px 4px -2px rgba(44, 44, 44, 0.1)',
        'warm-lg': '0 10px 15px -3px rgba(212, 175, 55, 0.1), 0 4px 6px -4px rgba(44, 44, 44, 0.1)',
        'warm-xl': '0 20px 25px -5px rgba(212, 175, 55, 0.12), 0 8px 10px -6px rgba(44, 44, 44, 0.1)',
        // Inner shadows
        'inner-warm': 'inset 0 2px 4px 0 rgba(212, 175, 55, 0.06)',
      },
      // Transition System - 300ms ease-in-out standard
      transitionDuration: {
        'DEFAULT': '300ms',
        'fast': '150ms',
        'slow': '500ms',
      },
      transitionTimingFunction: {
        'DEFAULT': 'ease-in-out',
      },
      // Extended transition properties
      transitionProperty: {
        'all': 'all',
        'colors': 'color, background-color, border-color, text-decoration-color, fill, stroke',
        'opacity': 'opacity',
        'transform': 'transform',
      },
    },
  },
  plugins: [],
};
export default config;
