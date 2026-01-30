# Deployment Guide for Lola Drip

This guide will help you deploy your Lola Drip fashion site to Vercel.

## Prerequisites

- A GitHub, GitLab, or Bitbucket account
- A Vercel account (sign up at [vercel.com](https://vercel.com))
- Your custom domain (optional)

## Step 1: Prepare Your Repository

1. Ensure all your code is committed and pushed to your Git repository
2. Verify that `package.json` has the correct build scripts
3. Make sure all environment variables are documented in `.env.example`

## Step 2: Deploy to Vercel

### Option A: Deploy via Vercel Dashboard

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "Add New Project"
3. Import your Git repository
4. Vercel will auto-detect Next.js settings
5. Configure environment variables (see Step 3)
6. Click "Deploy"

### Option B: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# For production deployment
vercel --prod
```

## Step 3: Configure Environment Variables

In your Vercel project settings, add the following environment variables:

### Required Variables

- `NEXT_PUBLIC_SITE_URL` - Your production site URL (e.g., `https://loladrip.com`)
- `NEXT_PUBLIC_GA_ID` - Your Google Analytics ID (e.g., `G-XXXXXXXXXX`)

### Setting Environment Variables in Vercel

1. Go to your project in Vercel dashboard
2. Navigate to Settings → Environment Variables
3. Add each variable:
   - **Name**: `NEXT_PUBLIC_SITE_URL`
   - **Value**: Your production URL
   - **Environment**: Production, Preview, Development (select all)
4. Repeat for all required variables
5. Redeploy your application for changes to take effect

## Step 4: Set Up Custom Domain

1. In Vercel dashboard, go to your project
2. Navigate to Settings → Domains
3. Click "Add Domain"
4. Enter your domain name (e.g., `loladrip.com`)
5. Follow Vercel's DNS configuration instructions:
   - Add an A record pointing to Vercel's IP
   - Or add a CNAME record pointing to your Vercel deployment
6. Wait for DNS propagation (can take up to 48 hours)
7. SSL certificate will be automatically provisioned

### DNS Configuration Example

For `loladrip.com`:
- **Type**: A Record
- **Name**: @ (or leave blank)
- **Value**: `76.76.21.21` (Vercel's IP - check Vercel dashboard for current IP)

For `www.loladrip.com`:
- **Type**: CNAME
- **Name**: www
- **Value**: `cname.vercel-dns.com`

## Step 5: Verify Deployment

1. Visit your deployed site
2. Test all user flows:
   - Browse products
   - Search functionality
   - Add to cart
   - Contact form
   - Navigation
3. Check Google Analytics is tracking (if configured)
4. Test on multiple devices and browsers

## Step 6: Post-Deployment Checklist

- [ ] All pages load correctly
- [ ] Images are optimized and loading
- [ ] Forms are working
- [ ] Cart functionality works
- [ ] Search works
- [ ] Mobile navigation works
- [ ] Analytics is tracking
- [ ] Custom domain is configured
- [ ] SSL certificate is active
- [ ] 404 page displays correctly
- [ ] Error boundaries are working

## Troubleshooting

### "The provided GitHub repository does not contain the requested branch or commit reference"

This happens when **Vercel is looking for a branch (usually `main`) that doesn’t exist on GitHub** or the repo is empty.

**Fix:**

1. **Point Git at your real GitHub repo** (replace with your username and repo name):
   ```bash
   git remote set-url origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   ```

2. **Push the branch Vercel expects (usually `main`)**. Your latest work is on `test-safe-changes`, so either:
   - **Option A – Use `main` (recommended):** Merge into `main` and push:
     ```bash
     git checkout main
     git merge test-safe-changes
     git push -u origin main
     ```
   - **Option B – Use `test-safe-changes`:** Push that branch, then in Vercel: **Project → Settings → Git → Production Branch** set to `test-safe-changes`, and redeploy.

3. **Re-run the import/deploy** in Vercel so it can see the branch and commit.

### Build Errors

- Check build logs in Vercel dashboard
- Verify all dependencies are in `package.json`
- Ensure environment variables are set correctly

### Domain Issues

- Verify DNS records are correct
- Wait for DNS propagation (up to 48 hours)
- Check Vercel domain settings

### Performance Issues

- Check Vercel Analytics for performance metrics
- Verify image optimization is working
- Check Core Web Vitals in Google Search Console

## Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Custom Domain Setup](https://vercel.com/docs/concepts/projects/domains)

## Support

If you encounter issues:
1. Check Vercel deployment logs
2. Review Next.js build output
3. Verify environment variables
4. Check browser console for errors
