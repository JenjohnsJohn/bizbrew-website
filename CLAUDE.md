# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Development Commands

```bash
npm run dev              # Start dev server (http://localhost:5173)
npm run build            # Full production build (tsc → client → SSR → prerender)
npm run build:client     # Client-only build (skip SSR/prerender)
npm run lint             # ESLint on all .ts/.tsx files
npm run preview          # Preview production build locally
npm run generate:blog-seo # Generate ~780 local SEO blog posts from templates
npm run deploy           # Build + deploy to Cloudflare Pages via Wrangler
```

The full build is a three-stage pipeline: TypeScript type-check (`tsc -b`) → Vite client build → Vite SSR build (`vite.ssr.config.ts`) → static prerendering (`scripts/prerender.mjs`).

## Architecture

**Stack:** React 19 + TypeScript + Vite + Tailwind CSS, deployed to Cloudflare Pages.

**Dual rendering setup:** The app has two entry points to support static prerendering for SEO:
- `src/App.tsx` — Client app using `BrowserRouter` with lazy-loaded routes via `React.lazy()`
- `src/App-ssr.tsx` — SSR app using `StaticRouter` with direct imports (no lazy loading)
- `src/main.tsx` — Client entry (hydrates into DOM)
- `src/entry-server.tsx` — SSR entry (exports `renderToString` for prerendering)

**When adding/changing routes**, you must update three places:
1. `src/App.tsx` (client routing)
2. `src/App-ssr.tsx` (SSR routing)
3. `scripts/prerender.mjs` (routes array + meta tags for static HTML generation)

**Routing:** React Router v7 with route patterns:
- `/` → `HomePage` (landing page composed of 7 section components)
- `/services/:slug` → `ServiceDetail` (6 service pages, slugs defined in `src/data/services.ts`)
- `/blog` → `BlogPage` (featured editorial posts + filterable/paginated grid of ~785 posts)
- `/blog/:slug` → `BlogPost` (individual blog post — editorial or generated SEO)

Hash anchors (`/#services`, `/#work`, `/#process`, `/#contact`) scroll to homepage sections.

## Key Directories

- `src/pages/` — Route-level page components (HomePage, ServiceDetail, AboutPage, etc.)
- `src/sections/` — Homepage section components (HeroSection, ServicesSection, ProcessSection, WorkSection, TestimonialsSection, StatsSection, ContactSection)
- `src/components/` — Shared components; `components/ui/` contains ~55 Radix UI/shadcn-based primitives
- `src/data/services.ts` — Service definitions and content data
- `src/data/blog.ts` — 5 hand-written editorial blog posts (keep unchanged)
- `src/data/blog-local-seo.ts` — ~780 auto-generated local SEO blog posts (do not edit manually)
- `src/data/blog-all.ts` — Barrel file merging editorial + SEO posts, exports filters and helpers
- `src/data/blog-seo-routes.json` — Route manifest for prerender (auto-generated)
- `src/data/locations/` — Location data: `german-cities.ts` (39 cities), `eu-countries.ts` (26 countries), `types.ts`
- `src/data/templates/` — 6 template files (webentwicklung, app-entwicklung, e-commerce, cloud-devops, ki-agentur, digitalagentur) with 2 variants each (A: problem/solution, B: guide/checklist) for both German cities and EU countries
- `src/lib/seo.ts` — SEO metadata config (site URL, default descriptions, JSON-LD generators)
- `src/hooks/` — `useInView` (Intersection Observer), `use-mobile` (responsive detection)
- `scripts/prerender.mjs` — Generates static HTML for all ~848 routes with injected meta tags, parallel batched rendering, sitemap index
- `scripts/generate-blog-seo.mjs` — Generator script: bundles templates via esbuild, produces `blog-local-seo.ts` + `blog-seo-routes.json`

## Styling

Tailwind CSS with custom brand tokens defined in `tailwind.config.js`:
- Colors: charcoal (`#1B1B1B`), offwhite (`#F5F5F2`), amber (`#D99A4D`)
- Fonts: Sora (display), Inter (body), IBM Plex Mono (mono)
- CSS custom properties for theming in `src/index.css`
- Utility classes: `.section-flowing`, `.text-gradient`, `.cta-button`, `.nav-link`, `.rounded-frame`, `.image-placeholder`

Uses shadcn/ui (new-york style) configured in `components.json` with `@` path alias.

## Animation

Lightweight CSS-based animations using a custom `useInView` hook (Intersection Observer API) and a `FadeIn` wrapper component. No external animation libraries. The `FadeIn` component supports directional reveals (up/down/left/right), staggered delays, and respects `prefers-reduced-motion`. The `AnimatedCounter` component uses `requestAnimationFrame` for number counting animations. `ImageWithFallback` provides graceful fallback for missing images.

## Path Alias

`@/*` maps to `./src/*` (configured in tsconfig, vite.config.ts, and components.json).

## Blog & Local SEO System

**Editorial posts** (5 hand-written) live in `src/data/blog.ts`. Do not modify their structure.

**Local SEO posts** (~780 generated) are produced by `scripts/generate-blog-seo.mjs`. The pipeline:
1. Location data (`src/data/locations/`) defines 39 German cities and 26 EU countries with industries, tech scenes, companies, etc.
2. Template functions (`src/data/templates/`) generate ContentBlock[] arrays for 6 keywords × 2 variants (A: problem/solution, B: guide/checklist) × city + country = 24 template functions total.
3. The generator bundles templates via esbuild, executes them against all locations, assigns deterministic dates, and writes `src/data/blog-local-seo.ts` + `src/data/blog-seo-routes.json`.
4. `src/data/blog-all.ts` merges editorial + SEO posts and exports filtering/pagination helpers.

**To regenerate SEO posts** (after editing templates or locations): `npm run generate:blog-seo`

**Blog page features:** Featured editorial section at top, topic filter (6 keywords), region filter (Germany/Europe/Editorial), "Load more" pagination (24 posts per page), client-side filtering via URL query params.

**Slug conventions:**
- German cities: `{keyword}-{city-slug}` / `{keyword}-{city-slug}-leitfaden` (e.g., `webentwicklung-berlin`, `webentwicklung-berlin-leitfaden`)
- EU countries: `{keyword}-{country-slug}` / `{keyword}-{country-slug}-guide` (e.g., `web-development-france`, `web-development-france-guide`)

**Prerendering:** `scripts/prerender.mjs` loads blog SEO routes from `blog-seo-routes.json` and renders all ~848 routes in parallel batches. Generates a sitemap index (`sitemap.xml`) pointing to `sitemap-main.xml` (68 core URLs) and `sitemap-blog-seo.xml` (780 SEO URLs).

## Deployment

Cloudflare Pages via GitHub Actions on push to main. Requires `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` in GitHub Secrets. Manual deploy: `npm run deploy`.
