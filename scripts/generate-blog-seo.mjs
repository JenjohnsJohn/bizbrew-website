#!/usr/bin/env node
/**
 * Generates ~780 local SEO blog posts from templates + location data.
 * Outputs:
 *   - src/data/blog-local-seo.ts  (TypeScript array of BlogPost objects)
 *   - src/data/blog-seo-routes.json (route manifest for prerender)
 *
 * Usage: node scripts/generate-blog-seo.mjs
 */
import { readFileSync, writeFileSync, unlinkSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { execSync } from 'child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, '..');
const srcDir = join(rootDir, 'src', 'data');

// ---------- Step 1: Build a temporary ESM bundle so we can import TS modules ----------
// We use Vite/esbuild to bundle the templates + locations into a temp JS file.

console.log('Bundling templates and location data...');

// Create a temp entry that exports everything we need
const tempEntry = join(rootDir, '_gen_entry.ts');
writeFileSync(tempEntry, `
export { germanCities } from './src/data/locations/german-cities';
export { euCountries } from './src/data/locations/eu-countries';
export { webentwicklungCityA, webentwicklungCityB, webDevelopmentCountryA, webDevelopmentCountryB } from './src/data/templates/webentwicklung';
export { appEntwicklungCityA, appEntwicklungCityB, mobileAppCountryA, mobileAppCountryB } from './src/data/templates/app-entwicklung';
export { eCommerceCityA, eCommerceCityB, eCommerceCountryA, eCommerceCountryB } from './src/data/templates/e-commerce';
export { cloudDevopsCityA, cloudDevopsCityB, cloudDevopsCountryA, cloudDevopsCountryB } from './src/data/templates/cloud-devops';
export { kiAgenturCityA, kiAgenturCityB, aiAgencyCountryA, aiAgencyCountryB } from './src/data/templates/ki-agentur';
export { digitalagenturCityA, digitalagenturCityB, digitalAgencyCountryA, digitalAgencyCountryB } from './src/data/templates/digitalagentur';
`);

const tempOut = join(rootDir, '_gen_bundle.mjs');

try {
  execSync(
    `npx esbuild ${tempEntry} --bundle --format=esm --outfile=${tempOut} --platform=node --target=es2022 --tsconfig=tsconfig.json`,
    { cwd: rootDir, stdio: 'inherit' }
  );
} catch (e) {
  console.error('esbuild failed:', e.message);
  cleanup();
  process.exit(1);
}

// ---------- Step 2: Import the bundle ----------
const mod = await import(tempOut);

const {
  germanCities, euCountries,
  webentwicklungCityA, webentwicklungCityB, webDevelopmentCountryA, webDevelopmentCountryB,
  appEntwicklungCityA, appEntwicklungCityB, mobileAppCountryA, mobileAppCountryB,
  eCommerceCityA, eCommerceCityB, eCommerceCountryA, eCommerceCountryB,
  cloudDevopsCityA, cloudDevopsCityB, cloudDevopsCountryA, cloudDevopsCountryB,
  kiAgenturCityA, kiAgenturCityB, aiAgencyCountryA, aiAgencyCountryB,
  digitalagenturCityA, digitalagenturCityB, digitalAgencyCountryA, digitalAgencyCountryB,
} = mod;

// ---------- Step 3: Date generation ----------
// Deterministic hash of slug → date in 2024-09-01 to 2026-02-15 window, avoiding weekends

const DATE_START = new Date('2024-09-01');
const DATE_END = new Date('2026-02-15');

function hashString(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const chr = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + chr;
    hash |= 0;
  }
  return Math.abs(hash);
}

// Pre-compute all weekdays in the window
const weekdays = [];
for (let d = new Date(DATE_START); d <= DATE_END; d.setDate(d.getDate() + 1)) {
  const day = d.getDay();
  if (day !== 0 && day !== 6) {
    weekdays.push(new Date(d).toISOString().split('T')[0]);
  }
}

function dateFromSlug(slug) {
  const idx = hashString(slug) % weekdays.length;
  return weekdays[idx];
}

// ---------- Step 4: Generate all posts ----------
const templateSets = [
  { cityA: webentwicklungCityA, cityB: webentwicklungCityB, countryA: webDevelopmentCountryA, countryB: webDevelopmentCountryB },
  { cityA: appEntwicklungCityA, cityB: appEntwicklungCityB, countryA: mobileAppCountryA, countryB: mobileAppCountryB },
  { cityA: eCommerceCityA, cityB: eCommerceCityB, countryA: eCommerceCountryA, countryB: eCommerceCountryB },
  { cityA: cloudDevopsCityA, cityB: cloudDevopsCityB, countryA: cloudDevopsCountryA, countryB: cloudDevopsCountryB },
  { cityA: kiAgenturCityA, cityB: kiAgenturCityB, countryA: aiAgencyCountryA, countryB: aiAgencyCountryB },
  { cityA: digitalagenturCityA, cityB: digitalagenturCityB, countryA: digitalAgencyCountryA, countryB: digitalAgencyCountryB },
];

const posts = [];

for (const ts of templateSets) {
  // German city posts
  for (const city of germanCities) {
    const postA = ts.cityA(city);
    postA.date = dateFromSlug(postA.slug);
    posts.push(postA);

    const postB = ts.cityB(city);
    postB.date = dateFromSlug(postB.slug);
    posts.push(postB);
  }

  // EU country posts
  for (const country of euCountries) {
    const postA = ts.countryA(country);
    postA.date = dateFromSlug(postA.slug);
    posts.push(postA);

    const postB = ts.countryB(country);
    postB.date = dateFromSlug(postB.slug);
    posts.push(postB);
  }
}

console.log(`Generated ${posts.length} blog posts`);

// ---------- Step 5: Write blog-local-seo.ts ----------
// We write this as a TypeScript file with the BlogPost type

function escapeForTS(str) {
  if (str == null) return '';
  return String(str)
    .replace(/\\/g, '\\\\')
    .replace(/'/g, "\\'")
    .replace(/`/g, '\\`')
    .replace(/\$/g, '\\$')
    .replace(/\n/g, '\\n')
    .replace(/\r/g, '');
}

function contentBlockToTS(block, indent = '      ') {
  switch (block.type) {
    case 'heading':
      return `${indent}{ type: 'heading', text: '${escapeForTS(block.text)}', level: ${block.level} }`;
    case 'paragraph':
      return `${indent}{ type: 'paragraph', text: '${escapeForTS(block.text)}' }`;
    case 'list': {
      const items = (block.items || []).map(item => `'${escapeForTS(item)}'`).join(', ');
      return `${indent}{ type: 'list', items: [${items}] }`;
    }
    case 'quote':
      const authorPart = block.author ? `, author: '${escapeForTS(block.author)}'` : '';
      return `${indent}{ type: 'quote', text: '${escapeForTS(block.text)}'${authorPart} }`;
    case 'code':
      return `${indent}{ type: 'code', language: '${escapeForTS(block.language)}', code: '${escapeForTS(block.code)}' }`;
    default:
      return `${indent}{ type: 'paragraph', text: '' }`;
  }
}

function postToTS(post) {
  const tags = post.tags.map(t => `'${escapeForTS(t)}'`).join(', ');
  const relatedService = post.relatedService ? `\n    relatedService: '${escapeForTS(post.relatedService)}',` : '';
  const relatedServiceSlug = post.relatedServiceSlug ? `\n    relatedServiceSlug: '${escapeForTS(post.relatedServiceSlug)}',` : '';
  const contentBlocks = post.content.map(b => contentBlockToTS(b)).join(',\n');

  return `  {
    slug: '${escapeForTS(post.slug)}',
    title: '${escapeForTS(post.title)}',
    excerpt: '${escapeForTS(post.excerpt)}',
    date: '${post.date}',
    readingTime: '${escapeForTS(post.readingTime)}',
    author: '${escapeForTS(post.author)}',
    tags: [${tags}],
    image: '${escapeForTS(post.image)}',${relatedService}${relatedServiceSlug}
    content: [
${contentBlocks},
    ],
  }`;
}

const tsContent = `/**
 * AUTO-GENERATED FILE — DO NOT EDIT MANUALLY
 * Generated by: node scripts/generate-blog-seo.mjs
 * Total posts: ${posts.length}
 */
import type { BlogPost } from './blog';

export const localSeoPosts: BlogPost[] = [
${posts.map(p => postToTS(p)).join(',\n')},
];
`;

writeFileSync(join(srcDir, 'blog-local-seo.ts'), tsContent);
console.log(`Wrote: src/data/blog-local-seo.ts (${posts.length} posts)`);

// ---------- Step 6: Write blog-seo-routes.json ----------
const routes = posts.map(p => ({
  path: `/blog/${p.slug}`,
  title: `${p.title} | BizBrew`,
  description: p.excerpt,
  priority: 0.6,
  changefreq: 'monthly',
}));

writeFileSync(join(srcDir, 'blog-seo-routes.json'), JSON.stringify(routes, null, 2));
console.log(`Wrote: src/data/blog-seo-routes.json (${routes.length} routes)`);

// ---------- Cleanup ----------
try { unlinkSync(tempEntry); } catch { /* ignore */ }
try { unlinkSync(tempOut); } catch { /* ignore */ }

console.log('Done!');
