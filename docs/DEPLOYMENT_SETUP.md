# Complete Deployment Setup Guide

This guide covers GitHub repository optimization, Vercel configuration, and deployment protection.

---

## 1. GitHub Repository Cleanup

### .gitignore

The following are ignored (see `.gitignore`):

- `node_modules/`
- `.next/`
- `.env*.local`
- `.vercel`
- `*.log`
- `.DS_Store`
- IDE/editor files
- Build artifacts

### Secrets & API Keys

- **Never commit** `.env`, `.env.local`, or any file containing API keys
- Use `.env.example` as a template (no real values)
- Rotate any keys that may have been exposed
- Store secrets in Vercel Environment Variables or GitHub Secrets

---

## 2. GitHub Actions CI/CD

**File:** `.github/workflows/ci.yml`

### Triggers

- **Push to `main`:** Full build + Lighthouse
- **Pull request to `main`:** Build + lint only

### Jobs

| Job      | Runs on      | Steps                                      |
|----------|--------------|--------------------------------------------|
| `build`  | ubuntu-latest| checkout → setup Node 18 → npm ci → build → lint |
| `lighthouse` | ubuntu-latest | Lighthouse CI against https://loladrip.com (main only) |

### Required Status Checks

Use these in branch protection:

- `Build & Lint` (or `build`)

---

## 3. Vercel Configuration

**File:** `vercel.json`

| Setting        | Value                                  |
|----------------|----------------------------------------|
| Framework      | nextjs                                 |
| Region         | iad1 (US East)                         |
| Build command  | `npm run build`                        |
| Dev command    | `npm run dev`                          |
| Install        | `npm install`                          |

### Headers (vercel.json)

- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `X-XSS-Protection: 1; mode=block`

### Redirects

- `/home` → `/` (301 permanent)

### GitHub Integration

- `enabled: true` – Deploy on push
- `autoAlias: true` – Auto-assign preview URLs
- `silent: true` – Less noisy commit status updates

---

## 4. Automatic Deployments

### Behavior (with Vercel + GitHub)

| Event                    | Result                         |
|--------------------------|--------------------------------|
| Push to `main`           | Production (loladrip.com)      |
| Push to feature branch   | Preview deployment             |
| Pull request opened      | Preview deployment for PR      |

### Setup in Vercel

1. [vercel.com](https://vercel.com) → Add New Project
2. Import from GitHub and select the repository
3. Configure environment variables
4. Deploy

---

## 5. Vercel Environment Variables

Configure in **Vercel Dashboard → Project → Settings → Environment Variables**.

### Recommended Variables

| Variable               | Production          | Preview   | Notes                         |
|------------------------|---------------------|-----------|-------------------------------|
| `NEXT_PUBLIC_SITE_URL` | `https://loladrip.com` | `https://preview-url.vercel.app` or same | Required for canonical URLs, sitemap |
| `NEXT_PUBLIC_GA_ID`    | `G-XXXXXXXXXX`      | (optional)| Google Analytics 4            |
| `NEXT_PUBLIC_API_URL`  | API URL             | (optional)| If using external API         |

### Security

- Do **not** put secrets in `vercel.json`
- Use Vercel’s **Environment Variables** for sensitive values
- For CI (e.g. deploy tokens), use **GitHub Secrets** and pass them into Vercel

---

## 6. Deployment Protection (Branch Protection)

### GitHub Branch Protection

1. **GitHub** → **Repository** → **Settings** → **Branches**
2. **Add rule** for branch name pattern: `main`
3. Configure:

   | Option                               | Recommended |
   |--------------------------------------|-------------|
   | Require a pull request before merging| ✅ Enable   |
   | Require approvals                    | 1 (optional)|
   | Require status checks to pass        | ✅ Enable   |
   | Require branches to be up to date    | ✅ Enable   |
   | Do not allow bypassing               | ✅ Enable (if available) |

4. **Status checks** – add:
   - `Build & Lint` (from GitHub Actions)

5. Save the rule.

### Result

- Direct pushes to `main` are blocked (if “Require pull request” is on)
- Merging requires passing CI
- Reduces risk of broken deployments

---

## 7. Checklist

- [ ] `.gitignore` covers node_modules, .env*.local, .vercel, *.log
- [ ] No secrets committed; `.env.example` has no real values
- [ ] README has setup and deployment instructions
- [ ] CI workflow runs on push/PR to `main`
- [ ] Vercel project linked to GitHub
- [ ] `NEXT_PUBLIC_SITE_URL` and other needed env vars set in Vercel
- [ ] Branch protection enabled for `main`
- [ ] Status checks required: `Build & Lint`

---

## 8. Quick Reference

```bash
# Local development
npm install
cp .env.example .env.local
# Edit .env.local with real values
npm run dev

# Deploy (via Vercel Git integration)
git push origin main
# Or with Vercel CLI:
vercel --prod
```
