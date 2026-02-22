/**
 * Prerenders all routes to static HTML for SEO.
 * Run after: npm run build && vite build --config vite.ssr.config.ts
 */
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = join(__dirname, '..', 'dist');
const SITE_URL = 'https://bizbrew.de';

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
  { path: '/projects', priority: 0.8, changefreq: 'monthly' },
  { path: '/projects/wayvida', priority: 0.6, changefreq: 'monthly' },
  { path: '/projects/neyyar-production', priority: 0.6, changefreq: 'monthly' },
  { path: '/projects/neyyar-hr', priority: 0.6, changefreq: 'monthly' },
  { path: '/projects/diq-ecommerce', priority: 0.6, changefreq: 'monthly' },
  { path: '/projects/school-management-system', priority: 0.6, changefreq: 'monthly' },
  { path: '/projects/hospital-management-system', priority: 0.6, changefreq: 'monthly' },
  { path: '/projects/billing-pos-system', priority: 0.6, changefreq: 'monthly' },
  { path: '/projects/car-rental-system', priority: 0.6, changefreq: 'monthly' },
  { path: '/projects/gym-fitness-management', priority: 0.6, changefreq: 'monthly' },
  { path: '/projects/connect-app-emplog', priority: 0.6, changefreq: 'monthly' },
  { path: '/projects/qtamween', priority: 0.6, changefreq: 'monthly' },
  { path: '/projects/qvender', priority: 0.6, changefreq: 'monthly' },
  { path: '/projects/mazad-qatar', priority: 0.6, changefreq: 'monthly' },
  { path: '/projects/flower-markets', priority: 0.6, changefreq: 'monthly' },
  { path: '/projects/bab-al-rayyan', priority: 0.6, changefreq: 'monthly' },
  { path: '/projects/360-furnitures', priority: 0.6, changefreq: 'monthly' },
  { path: '/projects/stores-in-qatar', priority: 0.6, changefreq: 'monthly' },
  { path: '/projects/gold-market', priority: 0.6, changefreq: 'monthly' },
  { path: '/projects/aada-kada', priority: 0.6, changefreq: 'monthly' },
  { path: '/projects/hayak', priority: 0.6, changefreq: 'monthly' },
  { path: '/projects/qasports', priority: 0.6, changefreq: 'monthly' },
  { path: '/projects/au-sports', priority: 0.6, changefreq: 'monthly' },
  { path: '/projects/evo-sports', priority: 0.6, changefreq: 'monthly' },
  { path: '/projects/limitless', priority: 0.6, changefreq: 'monthly' },
  { path: '/projects/turismo', priority: 0.6, changefreq: 'monthly' },
  { path: '/projects/q-tables', priority: 0.6, changefreq: 'monthly' },
  { path: '/projects/salwa-beach-hilton', priority: 0.6, changefreq: 'monthly' },
  { path: '/projects/secc-employee', priority: 0.6, changefreq: 'monthly' },
  { path: '/projects/al-khor-sports-club', priority: 0.6, changefreq: 'monthly' },
  { path: '/projects/clubsys', priority: 0.6, changefreq: 'monthly' },
  { path: '/projects/alnoor', priority: 0.6, changefreq: 'monthly' },
  { path: '/projects/smdc-elearning', priority: 0.6, changefreq: 'monthly' },
  { path: '/projects/wondered', priority: 0.6, changefreq: 'monthly' },
  { path: '/projects/educate', priority: 0.6, changefreq: 'monthly' },
  { path: '/projects/qgmd-stock', priority: 0.6, changefreq: 'monthly' },
  { path: '/projects/moder-recycling', priority: 0.6, changefreq: 'monthly' },
  { path: '/projects/elite-recycling', priority: 0.6, changefreq: 'monthly' },
  { path: '/projects/qbc-booking', priority: 0.6, changefreq: 'monthly' },
  { path: '/projects/smaricar', priority: 0.6, changefreq: 'monthly' },
  { path: '/projects/fintech-app', priority: 0.6, changefreq: 'monthly' },
  { path: '/projects/thahab', priority: 0.6, changefreq: 'monthly' },
  { path: '/projects/analyzer', priority: 0.6, changefreq: 'monthly' },
  { path: '/projects/gulf-psychology', priority: 0.6, changefreq: 'monthly' },
  { path: '/projects/tylos-pharmacy', priority: 0.6, changefreq: 'monthly' },
  { path: '/projects/qhr-job-portal', priority: 0.6, changefreq: 'monthly' },
  { path: '/projects/top-jobs-in', priority: 0.6, changefreq: 'monthly' },
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
  '/projects': {
    title: 'Projects | BizBrew',
    description: 'Explore 46 production projects spanning e-commerce, healthcare, education, fintech, and more. Real software built for real businesses.',
  },
  '/projects/wayvida': {
    title: 'Wayvida — E-Learning Platform | BizBrew',
    description: 'Comprehensive e-learning platform with live classes, video lessons, mock tests, and study plans — built for scale with a microservice backend.',
    image: '/project_education.jpg',
  },
  '/projects/neyyar-production': {
    title: 'Neyyar Production — OTT Streaming | BizBrew',
    description: 'Over-the-top streaming platform for movies and series, powered by a microservice architecture for high-availability content delivery.',
    image: '/project_management.jpg',
  },
  '/projects/neyyar-hr': {
    title: 'Neyyar HR — HR & Project Management | BizBrew',
    description: 'End-to-end HR and project management platform covering employee lifecycle, attendance, payroll, and task tracking.',
    image: '/project_hr.jpg',
  },
  '/projects/diq-ecommerce': {
    title: 'DIQ E-Commerce Platform | BizBrew',
    description: 'White-label e-commerce product powering multiple brands across Qatar and the Middle East — mobile apps and responsive web storefronts.',
    image: '/project_ecommerce.jpg',
  },
  '/projects/school-management-system': {
    title: 'School Management System | BizBrew',
    description: 'White-label school management product handling students, teachers, attendance, exams, fees, and parent communications.',
    image: '/project_education.jpg',
  },
  '/projects/hospital-management-system': {
    title: 'Hospital Management System | BizBrew',
    description: 'Product for hospital and clinic management including patient records, appointments, doctor schedules, and billing integration.',
    image: '/project_healthcare.jpg',
  },
  '/projects/billing-pos-system': {
    title: 'Billing & POS System | BizBrew',
    description: 'Point-of-sale and billing product for retail and service businesses — invoices, receipts, sales analytics, and tax configuration.',
    image: '/project_restaurant.jpg',
  },
  '/projects/car-rental-system': {
    title: 'Car Rental System | BizBrew',
    description: 'Car rental platform for fleet management, booking, scheduling, and rental contract generation.',
    image: '/project_transport.jpg',
  },
  '/projects/gym-fitness-management': {
    title: 'Gym & Fitness Management | BizBrew',
    description: 'Management system for gyms and fitness centers — member profiles, subscription plans, attendance tracking, and payment processing.',
    image: '/project_sports.jpg',
  },
  '/projects/connect-app-emplog': {
    title: 'Connect App / EmpLog — Attendance Suite | BizBrew',
    description: 'Enterprise attendance and time-logging suite with geolocation, biometric/QR check-in, and project-wise timesheets.',
    image: '/project_hr.jpg',
  },
  '/projects/qtamween': {
    title: 'QTamween — E-Commerce | BizBrew',
    description: 'E-commerce app for product ordering with delivery tracking and order management — serving the Qatar market.',
    image: '/project_ecommerce.jpg',
  },
  '/projects/qvender': {
    title: 'QVender — Vendor Marketplace | BizBrew',
    description: 'Vendor-driven e-commerce platform connecting buyers with local sellers in Qatar.',
    image: '/project_ecommerce.jpg',
  },
  '/projects/mazad-qatar': {
    title: 'Mazad Qatar — Classifieds | BizBrew',
    description: 'Classified marketplace app for listing and browsing items in Qatar — with search, filters, favorites, and direct messaging.',
    image: '/project_classifieds.jpg',
  },
  '/projects/flower-markets': {
    title: 'Flower Markets — E-Commerce | BizBrew',
    description: 'Flower and gift ordering app with custom arrangements, delivery scheduling, and occasion-based browsing.',
    image: '/project_ecommerce.jpg',
  },
  '/projects/bab-al-rayyan': {
    title: 'Bab Al Rayyan Group | BizBrew',
    description: 'Combined management, e-commerce, and restaurant ordering platform for a multi-brand business group in Qatar.',
    image: '/project_ecommerce.jpg',
  },
  '/projects/360-furnitures': {
    title: '360 Furnitures — E-Commerce | BizBrew',
    description: 'Furniture e-commerce app with detailed product pages, high-resolution imagery, and a streamlined purchase flow.',
    image: '/project_ecommerce.jpg',
  },
  '/projects/stores-in-qatar': {
    title: 'Stores in Qatar — Marketplace | BizBrew',
    description: 'Multi-vendor e-commerce app aggregating multiple stores and their product catalogs into a single shopping experience.',
    image: '/project_ecommerce.jpg',
  },
  '/projects/gold-market': {
    title: 'Gold Market — Jewellery E-Commerce | BizBrew',
    description: 'Jewellery and gold product e-commerce app with detailed product listings and a secure checkout flow.',
    image: '/project_ecommerce.jpg',
  },
  '/projects/aada-kada': {
    title: 'Aada Kada — E-Commerce | BizBrew',
    description: 'General-purpose e-commerce app for the Qatar market with product browsing, cart, and order management.',
    image: '/project_ecommerce.jpg',
  },
  '/projects/hayak': {
    title: 'Hayak — E-Commerce | BizBrew',
    description: 'E-commerce app tailored for local customers in Qatar — browse products, place orders, and track delivery.',
    image: '/project_ecommerce.jpg',
  },
  '/projects/qasports': {
    title: 'QASports — Sports Booking | BizBrew',
    description: 'Sports booking platform for managing events, facility reservations, and user profiles in Qatar.',
    image: '/project_sports.jpg',
  },
  '/projects/au-sports': {
    title: 'AU Sports — Events & Booking | BizBrew',
    description: 'Sports events and booking app for managing sports activities, registrations, and notifications.',
    image: '/project_sports.jpg',
  },
  '/projects/evo-sports': {
    title: 'Evo Sports — Coaching Booking | BizBrew',
    description: 'Coaching booking app for sports training — browse coaches, book sessions, and track progress.',
    image: '/project_sports.jpg',
  },
  '/projects/limitless': {
    title: 'Limitless — Sports & Events | BizBrew',
    description: 'Sports and events booking app for discovering activities, reserving spots, and managing bookings.',
    image: '/project_sports.jpg',
  },
  '/projects/turismo': {
    title: 'Turismo — Travel & Tourism | BizBrew',
    description: 'Tours and events booking app for tourism experiences — browse packages, book trips, and view itineraries.',
    image: '/project_booking.jpg',
  },
  '/projects/q-tables': {
    title: 'Q Tables — Restaurant Reservations | BizBrew',
    description: 'Restaurant table reservation app — browse venues, select time slots, and manage bookings in Qatar.',
    image: '/project_booking.jpg',
  },
  '/projects/salwa-beach-hilton': {
    title: 'Salwa Beach Hilton — Restaurant App | BizBrew',
    description: 'Restaurant app for Salwa Beach Hilton resort — menu browsing, table booking, and in-venue ordering.',
    image: '/project_restaurant.jpg',
  },
  '/projects/secc-employee': {
    title: 'SECC Employee App | BizBrew',
    description: 'Employee management app for SECC — profiles, attendance tracking, and core HR workflows.',
    image: '/project_hr.jpg',
  },
  '/projects/al-khor-sports-club': {
    title: 'Al Khor Sports Club — Employee App | BizBrew',
    description: 'Employee management app for Al Khor Sports Club — staff records, attendance, and basic HR workflows.',
    image: '/project_hr.jpg',
  },
  '/projects/clubsys': {
    title: 'ClubSys — Employee Management | BizBrew',
    description: 'Employee management solution for clubs and organizations — profiles, attendance, and role-based access.',
    image: '/project_hr.jpg',
  },
  '/projects/alnoor': {
    title: 'Alnoor Management | BizBrew',
    description: 'Operations and staff management app for Alnoor — handling staff records, HR flows, and daily operations.',
    image: '/project_management.jpg',
  },
  '/projects/smdc-elearning': {
    title: 'SMDC E-Learning | BizBrew',
    description: 'E-learning app with structured content delivery, quizzes, and student progress tracking.',
    image: '/project_education.jpg',
  },
  '/projects/wondered': {
    title: 'WonderEd — Kids E-Learning | BizBrew',
    description: 'Interactive e-learning app for children — lessons, quizzes, and progress tracking with an engaging, kid-friendly interface.',
    image: '/project_education.jpg',
  },
  '/projects/educate': {
    title: 'Educate — Education App | BizBrew',
    description: 'Education app providing learning content, user management, and basic assessment capabilities.',
    image: '/project_education.jpg',
  },
  '/projects/qgmd-stock': {
    title: 'QGMD Stock Management | BizBrew',
    description: 'Stock and inventory management app for QGMD — tracking stock levels, movements, and generating reports.',
    image: '/project_inventory.jpg',
  },
  '/projects/moder-recycling': {
    title: 'Moder Recycling Factory — Booking | BizBrew',
    description: 'Appointment booking app for Moder Recycling Factory — schedule visits, select time slots, and receive confirmations.',
    image: '/project_booking.jpg',
  },
  '/projects/elite-recycling': {
    title: 'Elite Recycling — Booking | BizBrew',
    description: 'Appointment booking app for Elite Recycling — manage bookings, time slots, and customer communications.',
    image: '/project_booking.jpg',
  },
  '/projects/qbc-booking': {
    title: 'QBC Appointments | BizBrew',
    description: 'Appointment booking solution for QBC — schedule visits, manage time slots, and receive notifications.',
    image: '/project_booking.jpg',
  },
  '/projects/smaricar': {
    title: 'Smaricar — Community Transport | BizBrew',
    description: 'Community transport app for church taxi booking — ride requests, pickup/drop locations, and status tracking.',
    image: '/project_transport.jpg',
  },
  '/projects/fintech-app': {
    title: 'Fintech Dashboard | BizBrew',
    description: 'Financial application for managing accounts, viewing transactions, and accessing financial dashboards.',
    image: '/project_fintech.jpg',
  },
  '/projects/thahab': {
    title: 'Thahab — Live Auction | BizBrew',
    description: 'Live auction app with real-time bidding — join auctions, place bids, and track bid history.',
    image: '/project_auction.jpg',
  },
  '/projects/analyzer': {
    title: 'Analyzer — Real Estate | BizBrew',
    description: 'Real estate app for listing, browsing, and analyzing properties with map integration and advanced filters.',
    image: '/project_realestate.jpg',
  },
  '/projects/gulf-psychology': {
    title: 'Gulf Psychology | BizBrew',
    description: 'App for Gulf Psychology providing service information, practitioner profiles, and appointment booking.',
    image: '/project_healthcare.jpg',
  },
  '/projects/tylos-pharmacy': {
    title: 'Tylos Pharmacy Group | BizBrew',
    description: 'Pharmacy app for browsing products, searching medications, and placing orders or inquiries.',
    image: '/project_healthcare.jpg',
  },
  '/projects/qhr-job-portal': {
    title: 'QHR Job Portal | BizBrew',
    description: 'Job portal app connecting employers and job seekers — post vacancies, search jobs, and manage applications.',
    image: '/project_jobs.jpg',
  },
  '/projects/top-jobs-in': {
    title: 'Top Jobs In | BizBrew',
    description: 'Job portal app for browsing vacancies, submitting applications, and tracking hiring progress.',
    image: '/project_jobs.jpg',
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
