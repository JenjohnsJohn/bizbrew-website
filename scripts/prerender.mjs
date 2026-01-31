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
  '/',
  '/services/custom-software',
  '/services/saas-products',
  '/services/web-applications',
  '/services/mobile-apps',
  '/services/cloud-apis',
  '/services/architecture-consulting',
];

const serviceMeta = {
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
};

function injectMeta(html, route) {
  const meta = serviceMeta[route];
  if (!meta) return html;
  return html
    .replace(/<title>.*?<\/title>/, `<title>${meta.title}</title>`)
    .replace(
      /<meta name="description" content="[^"]*"/,
      `<meta name="description" content="${meta.description.replace(/"/g, '&quot;')}"`
    )
    .replace(
      /<link rel="canonical" href="[^"]*"/,
      `<link rel="canonical" href="${SITE_URL}${route}"`
    )
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
    )
    .replace(
      /<meta property="og:image" content="[^"]*"/,
      `<meta property="og:image" content="${SITE_URL}${meta.image}"`
    );
}

async function main() {
  const { render } = await import(join(distDir, 'entry-server.js'));
  const template = readFileSync(join(distDir, 'index.html'), 'utf-8');

  for (const route of routes) {
    const html = render(route);
    let fullHtml = template.replace(
      '<div id="root"></div>',
      `<div id="root">${html}</div>`
    );

    fullHtml = injectMeta(fullHtml, route);

    const outputPath =
      route === '/'
        ? join(distDir, 'index.html')
        : join(distDir, route, 'index.html');

    mkdirSync(dirname(outputPath), { recursive: true });
    writeFileSync(outputPath, fullHtml);
    console.log(`Prerendered: ${route}`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
