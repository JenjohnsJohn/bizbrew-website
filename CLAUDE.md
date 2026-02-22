# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Development Commands

```bash
npm run dev          # Start dev server (http://localhost:5173)
npm run build        # Full production build (tsc → client → SSR → prerender)
npm run build:client # Client-only build (skip SSR/prerender)
npm run lint         # ESLint on all .ts/.tsx files
npm run preview      # Preview production build locally
npm run deploy       # Build + deploy to Cloudflare Pages via Wrangler
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

**Routing:** React Router v7 with two route patterns:
- `/` → `HomePage` (landing page composed of section components)
- `/services/:slug` → `ServiceDetail` (6 service pages, slugs defined in `src/data/services.ts`)

Hash anchors (`/#services`, `/#work`, `/#process`, `/#contact`) scroll to homepage sections.

## Key Directories

- `src/pages/` — Route-level page components (HomePage, ServiceDetail)
- `src/sections/` — Homepage section components (Hero, ServicesOverview, Contact, etc.)
- `src/components/` — Shared components; `components/ui/` contains ~55 Radix UI/shadcn-based primitives
- `src/data/services.ts` — Service definitions and content data
- `src/lib/seo.ts` — SEO metadata config (site URL, default descriptions, JSON-LD generators)
- `src/hooks/` — `useSmoothScroll` (Lenis + GSAP), `use-mobile` (responsive detection)
- `scripts/prerender.mjs` — Generates static HTML for all routes with injected meta tags

## Styling

Tailwind CSS with custom brand tokens defined in `tailwind.config.js`:
- Colors: charcoal (`#1B1B1B`), offwhite (`#F5F5F2`), amber (`#D99A4D`)
- Fonts: Sora (display), Inter (body), IBM Plex Mono (mono)
- CSS custom properties for theming in `src/index.css`
- Utility classes: `.section-pinned`, `.section-flowing`, `.grain-overlay`, `.text-gradient`

Uses shadcn/ui (new-york style) configured in `components.json` with `@` path alias.

## Animation

GSAP with ScrollTrigger for scroll-based animations and pinned sections. Lenis provides smooth scrolling integrated via `useSmoothScroll` hook. Custom interactive components: `CustomCursor` (desktop only, auto-disabled on touch), `ImageReveal`, `KineticText`, `TextScramble`, `TiltCard`, `MagneticButton`.

## Path Alias

`@/*` maps to `./src/*` (configured in tsconfig, vite.config.ts, and components.json).

## Deployment

Cloudflare Pages via GitHub Actions on push to main. Requires `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` in GitHub Secrets. Manual deploy: `npm run deploy`.
