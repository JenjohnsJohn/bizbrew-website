# Deploying to Cloudflare Pages

## Prerequisites

- [Cloudflare account](https://dash.cloudflare.com/sign-up) (free)
- Node.js 18+

## Option 1: Deploy from your machine

### First-time setup

1. **Log in to Cloudflare**
   ```bash
   npx wrangler login
   ```
   This opens a browser to authenticate.

2. **Create the Pages project** (first deploy only)
   ```bash
   npx wrangler pages project create bizbrew-website
   ```

### Deploy

```bash
npm run deploy
```

This builds the site and deploys to Cloudflare Pages. Your site will be live at:

**https://bizbrew-website.pages.dev**

### Custom domain (optional)

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com) → Pages → bizbrew-website
2. Click **Custom domains** → **Set up a custom domain**
3. Enter your domain (e.g. `bizbrew.com`) and follow the DNS setup

---

## Option 2: Deploy via GitHub (automatic)

Connect your repo to Cloudflare Pages for automatic deploys on every push to `main`.

### Setup

1. Push your code to a GitHub repository
2. Go to [Cloudflare Dashboard](https://dash.cloudflare.com) → Pages → **Create a project** → **Connect to Git**
3. Select your repository
4. **Build settings:**
   - Framework preset: **None**
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Root directory: `/` (or leave default)
5. Add environment variables (optional): None needed for basic deploy
6. Click **Save and Deploy**

### GitHub Actions (alternative)

The repo includes a GitHub Actions workflow. To use it:

1. Get your **Cloudflare API Token**: Dashboard → My Profile → API Tokens → Create Token → Use "Edit Cloudflare Workers" template
2. Get your **Account ID**: Dashboard → right sidebar
3. In your GitHub repo: **Settings** → **Secrets and variables** → **Actions**
4. Add secrets:
   - `CLOUDFLARE_API_TOKEN`
   - `CLOUDFLARE_ACCOUNT_ID`
5. Push to `main` — the workflow will build and deploy automatically

---

## Update SEO URLs after deploy

If you use a custom domain, update `SITE_URL` in `src/lib/seo.ts` and the URLs in:

- `public/robots.txt`
- `public/sitemap.xml`

Then rebuild and redeploy.
