# Lola Drip – Luxury Women's Fashion E-commerce

A modern, elegant fashion e-commerce website built with Next.js 14 (App Router) and Tailwind CSS. Features advanced SEO, performant UX, and production-ready deployment configuration.

## Features

- **Modern stack:** Next.js 14 App Router, React 18, TypeScript, Tailwind CSS
- **SEO optimized:** Structured data, breadcrumbs, sitemap, meta tags, pagination SEO
- **Performance:** Image optimization, code splitting, lazy loading, Core Web Vitals focus
- **UX:** Cart drawer, quick view modal, wishlist, search, mobile navigation
- **CI/CD:** GitHub Actions (build, lint, Lighthouse), Vercel deployments

## Tech Stack

| Category       | Technology                           |
|----------------|--------------------------------------|
| Framework      | Next.js 14 (App Router)              |
| Language       | TypeScript                           |
| Styling        | Tailwind CSS                         |
| Fonts          | Inter, Playfair Display              |
| Deployment     | Vercel                               |

## Quick Start

### Prerequisites

- Node.js 18+
- npm 9+

### Setup

```bash
# Clone the repository
git clone https://github.com/your-org/lola-drip.git
cd lola-drip

# Install dependencies
npm install

# Copy environment template
cp .env.example .env.local

# Run development server (port 3001)
npm run dev
```

Open [http://localhost:3001](http://localhost:3001).

### Build & Lint

```bash
npm run build      # Production build
npm run start      # Run production server
npm run lint       # ESLint
npm run clean      # Clear .next and cache
npm run fresh      # Clean install + dev
```

## Environment Variables

Create `.env.local` for local development. **Never commit secrets.**

| Variable               | Required | Description                              |
|------------------------|----------|------------------------------------------|
| `NEXT_PUBLIC_SITE_URL` | Yes      | Full site URL (e.g. `https://loladrip.com`) |
| `NEXT_PUBLIC_GA_ID`    | No       | Google Analytics 4 measurement ID (e.g. `G-XXXXXXXXXX`) |
| `NEXT_PUBLIC_API_URL`  | No       | API base URL (if using external API)     |

See `.env.example` for a template.

## Project Structure

```
├── app/
│   ├── about/           # About page
│   ├── contact/         # Contact page
│   ├── shop/            # Shop, categories, products
│   │   ├── [slug]/      # Category or product page
│   │   └── all/         # View-all products
│   ├── product/[id]/    # Product by ID (legacy)
│   ├── search/          # Search results
│   ├── faq/             # FAQ page
│   ├── layout.tsx       # Root layout
│   ├── page.tsx         # Homepage
│   ├── sitemap.ts       # Dynamic sitemap
│   └── robots.ts        # robots.txt
├── components/
├── data/                # Products, categories
├── lib/                 # Utilities, context
└── public/
```

## Deployment

### Vercel (Recommended)

1. **Connect repository:** Import from GitHub in [Vercel](https://vercel.com)
2. **Configure project:** Framework preset = Next.js (auto-detected)
3. **Environment variables:** Add in Vercel dashboard → Settings → Environment Variables

   | Variable               | Production value        |
   |------------------------|-------------------------|
   | `NEXT_PUBLIC_SITE_URL` | `https://loladrip.com`  |
   | `NEXT_PUBLIC_GA_ID`    | Your GA4 ID             |

4. **Deploy:** Pushes to `main` deploy to production automatically

### Branch Strategy

| Branch   | Vercel deployment   |
|----------|---------------------|
| `main`   | Production (loladrip.com) |
| `feature/*` | Preview URL          |
| Pull requests | Preview URL       |

### Manual Deploy (CLI)

```bash
npm i -g vercel
vercel          # Preview
vercel --prod   # Production
```

## CI/CD (GitHub Actions)

The repository includes a CI/CD pipeline (`.github/workflows/ci.yml`):

- **On push/PR to `main`:**
  - Checkout, setup Node 18
  - `npm ci` – install deps
  - `npm run build` – build
  - `npm run lint` – lint
  - **Lighthouse** – runs against production URL (main branch)

## Branch Protection & Deployment Safety

Configure in **GitHub → Repository → Settings → Branches**:

1. Add rule for `main`:
   - ✅ Require pull request before merging
   - ✅ Require status checks (e.g. `build`, `lint`)
   - ✅ Require branch to be up to date
   - ✅ (Optional) Require reviews

2. Protected branches ensure CI must pass before merge.

## Documentation

- [Advanced SEO Implementation](./docs/ADVANCED_TECHNICAL_SEO_IMPLEMENTATION_PLAN.md)
- [Deployment Guide](./README_DEPLOYMENT.md)

## License

Private – Lola Drip.
