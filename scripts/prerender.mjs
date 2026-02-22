/**
 * Prerenders all routes to static HTML for SEO.
 * Run after: npm run build && vite build --config vite.ssr.config.ts
 */
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = join(__dirname, '..', 'dist');
const SITE_URL = 'https://bizbrew.com';

const routes = [
  { path: '/', priority: 1.0, changefreq: 'weekly' },
  { path: '/services/custom-software', priority: 0.9, changefreq: 'monthly' },
  { path: '/services/saas-products', priority: 0.9, changefreq: 'monthly' },
  { path: '/services/web-applications', priority: 0.9, changefreq: 'monthly' },
  { path: '/services/mobile-apps', priority: 0.9, changefreq: 'monthly' },
  { path: '/services/cloud-apis', priority: 0.9, changefreq: 'monthly' },
  { path: '/services/architecture-consulting', priority: 0.9, changefreq: 'monthly' },
  { path: '/about', priority: 0.8, changefreq: 'monthly' },
  { path: '/case-studies', priority: 0.8, changefreq: 'monthly' },
  { path: '/case-studies/tenanthub', priority: 0.8, changefreq: 'monthly' },
  { path: '/case-studies/fieldflow', priority: 0.8, changefreq: 'monthly' },
  { path: '/case-studies/databridge', priority: 0.8, changefreq: 'monthly' },
  { path: '/faq', priority: 0.7, changefreq: 'monthly' },
  { path: '/blog', priority: 0.8, changefreq: 'weekly' },
  { path: '/blog/architecture-first-development', priority: 0.7, changefreq: 'monthly' },
  { path: '/blog/saas-billing-playbook', priority: 0.7, changefreq: 'monthly' },
  { path: '/blog/choosing-the-right-stack', priority: 0.7, changefreq: 'monthly' },
  { path: '/blog/cloud-migration-checklist', priority: 0.7, changefreq: 'monthly' },
  { path: '/blog/build-vs-buy', priority: 0.7, changefreq: 'monthly' },
  { path: '/privacy', priority: 0.3, changefreq: 'yearly' },
  { path: '/terms', priority: 0.3, changefreq: 'yearly' },
];

const routeMeta = {
  '/services/custom-software': {
    title: 'Custom Software | BizBrew',
    description: 'Built for your workflows, made to last. Web apps, internal tools, and API platforms designed around how your team actually works.',
    image: '/custom_rosetta.jpg',
  },
  '/services/saas-products': {
    title: 'SaaS Products | BizBrew',
    description: 'From idea to production, built to scale. Multi-tenant systems, billing, roles, and admin dashboards—the full SaaS stack.',
    image: '/saas_prepare.jpg',
  },
  '/services/web-applications': {
    title: 'Web Applications | BizBrew',
    description: 'Fast, responsive, and built for real users. Modern web apps that feel instant and work everywhere.',
    image: '/services_pour.jpg',
  },
  '/services/mobile-apps': {
    title: 'Mobile Apps | BizBrew',
    description: 'Native feel, cross-platform reach. iOS and Android apps that users love.',
    image: '/work_machine.jpg',
  },
  '/services/cloud-apis': {
    title: 'Cloud & APIs | BizBrew',
    description: 'Infrastructure and integrations that scale. Cloud architecture, API design, and DevOps.',
    image: '/cloud_glass.jpg',
  },
  '/services/architecture-consulting': {
    title: 'Architecture & Consulting | BizBrew',
    description: 'Strategic guidance when stakes are high. Technical audits, architecture reviews, and advisory.',
    image: '/process_architecture.jpg',
  },
  '/about': {
    title: 'About Us | BizBrew',
    description: 'BizBrew is a software development company that builds custom software, SaaS products, and web applications. Small team, deep expertise, direct communication.',
  },
  '/case-studies': {
    title: 'Case Studies | BizBrew',
    description: 'Real projects, real results. See how BizBrew has helped companies build software that works.',
  },
  '/case-studies/tenanthub': {
    title: 'TenantHub Case Study | BizBrew',
    description: 'How BizBrew built a multi-tenant SaaS platform that cut admin time by 60% and onboarded properties 3x faster.',
  },
  '/case-studies/fieldflow': {
    title: 'FieldFlow Case Study | BizBrew',
    description: 'How BizBrew built an offline-first mobile platform that reduced missed inspections by 40% and enabled same-day reporting.',
  },
  '/case-studies/databridge': {
    title: 'DataBridge Case Study | BizBrew',
    description: 'How BizBrew built an API integration layer that reduced manual data entry by 90% and cut sync times from 24 hours to 15 minutes.',
  },
  '/faq': {
    title: 'FAQ | BizBrew',
    description: 'Frequently asked questions about BizBrew services, process, technology, and pricing.',
  },
  '/blog': {
    title: 'Blog | BizBrew',
    description: 'Insights on software development, architecture, and technology decisions from the BizBrew team.',
  },
  '/blog/architecture-first-development': {
    title: 'Why Architecture-First Development Saves You Money | BizBrew',
    description: 'How upfront architecture investment prevents costly rework and technical debt.',
  },
  '/blog/saas-billing-playbook': {
    title: 'The SaaS Billing Playbook: 5 Patterns That Scale | BizBrew',
    description: 'Usage-based, seat-based, tiered, hybrid, and freemium billing patterns for SaaS products.',
  },
  '/blog/choosing-the-right-stack': {
    title: 'Choosing the Right Stack for Your Business App | BizBrew',
    description: 'A practical framework for evaluating frontend frameworks, backend choices, and database selection.',
  },
  '/blog/cloud-migration-checklist': {
    title: 'Cloud Migration Checklist for Growing Startups | BizBrew',
    description: 'Step-by-step guide to cloud migration: audit, containerize, migrate, and optimize.',
  },
  '/blog/build-vs-buy': {
    title: 'When to Build Custom vs Buy Off-the-Shelf | BizBrew',
    description: 'A decision framework covering total cost of ownership, customization needs, and vendor risk.',
  },
  '/privacy': {
    title: 'Privacy Policy | BizBrew',
    description: 'BizBrew privacy policy. How we collect, use, and protect your personal information.',
  },
  '/terms': {
    title: 'Terms of Service | BizBrew',
    description: 'BizBrew terms of service. Terms and conditions governing the use of our website and services.',
  },
};

function injectMeta(html, route) {
  const meta = routeMeta[route];
  if (!meta) return html;

  let result = html
    .replace(/<title>.*?<\/title>/, `<title>${meta.title}</title>`)
    .replace(
      /<meta name="description" content="[^"]*"/,
      `<meta name="description" content="${meta.description.replace(/"/g, '&quot;')}"`
    )
    .replace(
      /<link rel="canonical" href="[^"]*"/,
      `<link rel="canonical" href="${SITE_URL}${route}"`
    );

  // Only replace OG tags if they exist in the template
  if (html.includes('og:title')) {
    result = result
      .replace(
        /<meta property="og:title" content="[^"]*"/,
        `<meta property="og:title" content="${meta.title}"`
      )
      .replace(
        /<meta property="og:description" content="[^"]*"/,
        `<meta property="og:description" content="${meta.description.replace(/"/g, '&quot;')}"`
      )
      .replace(
        /<meta property="og:url" content="[^"]*"/,
        `<meta property="og:url" content="${SITE_URL}${route}"`
      );
    if (meta.image) {
      result = result.replace(
        /<meta property="og:image" content="[^"]*"/,
        `<meta property="og:image" content="${SITE_URL}${meta.image}"`
      );
    }
  }

  return result;
}

function generateSitemap() {
  const today = new Date().toISOString().split('T')[0];
  const urls = routes.map(
    (r) => `  <url>
    <loc>${SITE_URL}${r.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`
  );

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>`;
}

async function main() {
  const { render } = await import(join(distDir, 'entry-server.js'));
  const template = readFileSync(join(distDir, 'index.html'), 'utf-8');

  for (const route of routes) {
    const html = render(route.path);
    let fullHtml = template.replace(
      '<div id="root"></div>',
      `<div id="root">${html}</div>`
    );

    fullHtml = injectMeta(fullHtml, route.path);

    const outputPath =
      route.path === '/'
        ? join(distDir, 'index.html')
        : join(distDir, route.path, 'index.html');

    mkdirSync(dirname(outputPath), { recursive: true });
    writeFileSync(outputPath, fullHtml);
    console.log(`Prerendered: ${route.path}`);
  }

  // Generate sitemap
  const sitemap = generateSitemap();
  writeFileSync(join(distDir, 'sitemap.xml'), sitemap);
  console.log('Generated: sitemap.xml');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
