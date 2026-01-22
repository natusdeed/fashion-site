import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        // Exotic & Elegant Color Palette
        warm: {
          50: '#faf8f5',
          100: '#f5f1eb',
          200: '#eae2d6',
          300: '#d4c4b0',
          400: '#b8a085',
          500: '#9d8464',
          600: '#806b51',
          700: '#5d4f3d',
          800: '#3d3429',
          900: '#251f18',
        },
        gold: {
          50: '#fefbf3',
          100: '#fdf6e3',
          200: '#f9ecc2',
          300: '#f4df96',
          400: '#edcc60',
          500: '#d4af37',
          600: '#b8941f',
          700: '#92701a',
          800: '#6b5214',
          900: '#46350d',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
        playfair: ['var(--font-playfair)', 'Georgia', 'serif'],
      },
      fontWeight: {
        light: '300',
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
        extrabold: '900',
      },
    },
  },
  plugins: [],
};
export default config;
