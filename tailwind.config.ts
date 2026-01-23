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
        // Lola Drip Color Palette
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
