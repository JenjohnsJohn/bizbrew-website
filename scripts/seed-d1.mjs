/**
 * Generates seed.sql from the static projects data and existing routeMeta.
 * Run: node scripts/seed-d1.mjs
 * Then: npx wrangler d1 execute bizbrew-db --file=scripts/seed.sql
 */
import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Read projects.ts as text and extract the data
const projectsFile = readFileSync(
  join(__dirname, '..', 'src', 'data', 'projects.ts'),
  'utf-8'
);

// Read prerender.mjs to extract routeMeta SEO data
const prerenderFile = readFileSync(join(__dirname, 'prerender.mjs'), 'utf-8');

// Extract routeMeta object from prerender.mjs
function extractRouteMeta(content) {
  const routeMetaMatch = content.match(/const routeMeta\s*=\s*(\{[\s\S]*?\n\};)/);
  if (!routeMetaMatch) return {};

  // We'll parse the routeMeta by evaluating a sanitized version
  // Instead, let's parse it manually for project routes
  const meta = {};
  const regex =
    /'\/projects\/([^']+)':\s*\{\s*title:\s*'([^']*)',\s*description:\s*'([^']*)'(?:,\s*image:\s*'([^']*)')?\s*,?\s*\}/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    meta[match[1]] = {
      title: match[1] === 'projects' ? undefined : match[2],
      description: match[3],
      image: match[4] || undefined,
    };
  }
  return meta;
}

const routeMeta = extractRouteMeta(prerenderFile);

// Parse projects from the TS file
// We need to extract each project object. Let's use a regex approach.
function extractProjects(content) {
  const projects = [];

  // Find the array start
  const arrayStart = content.indexOf('export const projects: Project[] = [');
  if (arrayStart === -1) return projects;

  const arrayContent = content.slice(arrayStart);

  // Match each project object block
  const projectRegex = /\{\s*slug:\s*'([^']*)'/g;
  let match;
  const slugs = [];
  while ((match = projectRegex.exec(arrayContent)) !== null) {
    slugs.push(match[1]);
  }

  // For each slug, extract the full object
  for (const slug of slugs) {
    const project = extractProject(arrayContent, slug);
    if (project) projects.push(project);
  }

  return projects;
}

function extractProject(content, slug) {
  const startPattern = `slug: '${slug}'`;
  const startIdx = content.indexOf(startPattern);
  if (startIdx === -1) return null;

  // Find the opening brace before this slug
  let braceIdx = startIdx;
  while (braceIdx > 0 && content[braceIdx] !== '{') braceIdx--;

  // Find the matching closing brace
  let depth = 1;
  let i = braceIdx + 1;
  while (i < content.length && depth > 0) {
    if (content[i] === '{') depth++;
    if (content[i] === '}') depth--;
    i++;
  }

  const objStr = content.slice(braceIdx, i);

  // Extract fields
  const getString = (field) => {
    // Handle multi-line strings and escaped quotes
    const re = new RegExp(`${field}:\\s*'([\\s\\S]*?)'(?:,|\\s*\\n)`, 'm');
    const m = objStr.match(re);
    return m ? m[1].replace(/\\'/g, "'") : '';
  };

  const getArray = (field) => {
    const re = new RegExp(`${field}:\\s*\\[([\\s\\S]*?)\\]`);
    const m = objStr.match(re);
    if (!m) return [];
    // Extract quoted strings
    const items = [];
    const itemRe = /'([^']*)'/g;
    let im;
    while ((im = itemRe.exec(m[1])) !== null) {
      items.push(im[1]);
    }
    return items;
  };

  return {
    slug,
    name: getString('name'),
    category: getString('category'),
    year: getString('year'),
    summary: getString('summary'),
    description: getString('description'),
    image: getString('image'),
    stack: getArray('stack'),
    platforms: getArray('platforms'),
    features: getArray('features'),
    highlights: getArray('highlights'),
    client: getString('client'),
    status: getString('status'),
  };
}

// We need to resolve image since it uses getCategoryImage()
const categoryImageMap = {
  'E-Commerce': '/project_ecommerce.jpg',
  'E-Commerce & Management': '/project_ecommerce.jpg',
  'Healthcare & E-Commerce': '/project_healthcare.jpg',
  'HR & Project Management': '/project_hr.jpg',
  'HR & Employee Management': '/project_hr.jpg',
  'HR & Attendance': '/project_hr.jpg',
  'E-Learning': '/project_education.jpg',
  'Education': '/project_education.jpg',
  'Education Management': '/project_education.jpg',
  'Healthcare': '/project_healthcare.jpg',
  'Sports & Booking': '/project_sports.jpg',
  'Sports': '/project_sports.jpg',
  'Sports & Coaching': '/project_sports.jpg',
  'Sports & Events': '/project_sports.jpg',
  'Fitness Management': '/project_sports.jpg',
  'Booking': '/project_booking.jpg',
  'Travel & Booking': '/project_booking.jpg',
  'Car Rental / Transport': '/project_transport.jpg',
  'Transport': '/project_transport.jpg',
  'Fintech': '/project_fintech.jpg',
  'Real Estate': '/project_realestate.jpg',
  'Auction': '/project_auction.jpg',
  'Classifieds': '/project_classifieds.jpg',
  'Inventory & Logistics': '/project_inventory.jpg',
  'Job Portal': '/project_jobs.jpg',
  'Website': '/project_website.jpg',
  'Management': '/project_management.jpg',
  'OTT': '/project_management.jpg',
  'Hospitality': '/project_restaurant.jpg',
  'Billing & POS': '/project_restaurant.jpg',
};

function getCategoryImage(category) {
  return categoryImageMap[category] || '/project_management.jpg';
}

function escapeSQL(str) {
  if (str === null || str === undefined) return 'NULL';
  return "'" + String(str).replace(/'/g, "''") + "'";
}

const projects = extractProjects(projectsFile);
console.log(`Found ${projects.length} projects`);

const statements = ['DELETE FROM projects;', ''];

for (const p of projects) {
  // Resolve image from category if it looks like a function call
  const image =
    p.image && p.image.startsWith('/') ? p.image : getCategoryImage(p.category);

  // Get SEO data from routeMeta
  const seo = routeMeta[p.slug] || {};

  const sql = `INSERT INTO projects (slug, name, category, year, summary, description, image, stack, platforms, features, highlights, client, status, seo_title, seo_description, seo_image, seo_keywords) VALUES (
  ${escapeSQL(p.slug)},
  ${escapeSQL(p.name)},
  ${escapeSQL(p.category)},
  ${escapeSQL(p.year)},
  ${escapeSQL(p.summary)},
  ${escapeSQL(p.description)},
  ${escapeSQL(image)},
  ${escapeSQL(JSON.stringify(p.stack))},
  ${escapeSQL(JSON.stringify(p.platforms))},
  ${escapeSQL(JSON.stringify(p.features))},
  ${escapeSQL(JSON.stringify(p.highlights))},
  ${escapeSQL(p.client)},
  ${escapeSQL(p.status)},
  ${seo.title ? escapeSQL(seo.title) : 'NULL'},
  ${seo.description ? escapeSQL(seo.description) : 'NULL'},
  ${seo.image ? escapeSQL(seo.image) : 'NULL'},
  NULL
);`;

  statements.push(sql);
  statements.push('');
}

const outputPath = join(__dirname, 'seed.sql');
writeFileSync(outputPath, statements.join('\n'));
console.log(`Generated ${outputPath} with ${projects.length} INSERT statements`);
