#!/usr/bin/env node
/**
 * process-images.mjs
 * Downloads images from Unsplash, applies warm amber/charcoal brand tint,
 * adds Unsplash credit, and outputs WebP + JPEG to public/.
 *
 * Usage: node scripts/process-images.mjs
 */

import sharp from 'sharp';
import { writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import https from 'https';
import http from 'http';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = path.resolve(__dirname, '..', 'public');

// Target dimensions
const WIDTH = 1200;
const HEIGHT = 800;

// Image definitions: filename → Unsplash URL
// Using images.unsplash.com direct URLs (no API key required)
const images = [
  {
    name: 'hero_barista',
    url: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1200&h=800&fit=crop&q=80',
    credit: 'Nathan Dumlao',
  },
  {
    name: 'contact_roaster',
    url: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefda?w=1200&h=800&fit=crop&q=80',
    credit: 'Mike Kenneally',
  },
  {
    name: 'custom_rosetta',
    url: 'https://images.unsplash.com/photo-1534778101976-62847782c213?w=1200&h=800&fit=crop&q=80',
    credit: 'Tyler Nix',
  },
  {
    name: 'saas_prepare',
    url: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=1200&h=800&fit=crop&q=80',
    credit: 'Nathan Dumlao',
  },
  {
    name: 'services_pour',
    url: 'https://images.unsplash.com/photo-1498804103079-a6351b050096?w=1200&h=800&fit=crop&q=80',
    credit: 'Tyler Nix',
  },
  {
    name: 'work_machine',
    url: 'https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=1200&h=800&fit=crop&q=80',
    credit: 'Taisiia Shestopal',
  },
  {
    name: 'cloud_glass',
    url: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=1200&h=800&fit=crop&q=80',
    credit: 'Fahmi Fakhrudin',
  },
  {
    name: 'process_architecture',
    url: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200&h=800&fit=crop&q=80',
    credit: 'Daniel McCullough',
  },
  {
    name: 'process_production',
    url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&h=800&fit=crop&q=80',
    credit: 'ThisisEngineering',
  },
  {
    name: 'process_security',
    url: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=1200&h=800&fit=crop&q=80',
    credit: 'FLY:D',
  },
  {
    name: 'testimonial_01',
    url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1200&h=800&fit=crop&q=80',
    credit: 'Christina @ wocintechchat.com',
  },
  {
    name: 'testimonial_02',
    url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&h=800&fit=crop&q=80',
    credit: 'Joseph Gonzalez',
  },
  {
    name: 'principles_cup',
    url: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=1200&h=800&fit=crop&q=80',
    credit: 'Janko Ferlic',
  },
  {
    name: 'stack_tools',
    url: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&h=800&fit=crop&q=80',
    credit: 'Ilya Pavlov',
  },
  {
    name: 'case_tenanthub',
    url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=800&fit=crop&q=80',
    credit: 'Sean Pollock',
  },
  {
    name: 'case_fieldflow',
    url: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=1200&h=800&fit=crop&q=80',
    credit: 'ThisisEngineering',
  },
  {
    name: 'case_databridge',
    url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&h=800&fit=crop&q=80',
    credit: 'Jordan Harrison',
  },
  {
    name: 'blog_architecture',
    url: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=1200&h=800&fit=crop&q=80',
    credit: 'Alvaro Reyes',
  },
  {
    name: 'blog_billing',
    url: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&h=800&fit=crop&q=80',
    credit: 'rupixen.com',
  },
  {
    name: 'blog_stack',
    url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&h=800&fit=crop&q=80',
    credit: 'Safar Safarov',
  },
  {
    name: 'blog_cloud',
    url: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1200&h=800&fit=crop&q=80',
    credit: 'Taylor Vick',
  },
  {
    name: 'blog_build_buy',
    url: 'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=1200&h=800&fit=crop&q=80',
    credit: 'Barn Images',
  },
  // Project category images
  {
    name: 'project_ecommerce',
    url: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&h=800&fit=crop&q=80',
    credit: 'rupixen.com',
  },
  {
    name: 'project_hr',
    url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=800&fit=crop&q=80',
    credit: 'Nastuh Abootalebi',
  },
  {
    name: 'project_education',
    url: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1200&h=800&fit=crop&q=80',
    credit: 'MChe Lee',
  },
  {
    name: 'project_healthcare',
    url: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=1200&h=800&fit=crop&q=80',
    credit: 'Hush Naidoo Jade Photography',
  },
  {
    name: 'project_sports',
    url: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=1200&h=800&fit=crop&q=80',
    credit: 'Braden Collum',
  },
  {
    name: 'project_booking',
    url: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=1200&h=800&fit=crop&q=80',
    credit: 'Eric Rothermel',
  },
  {
    name: 'project_transport',
    url: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=1200&h=800&fit=crop&q=80',
    credit: 'why kei',
  },
  {
    name: 'project_fintech',
    url: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&h=800&fit=crop&q=80',
    credit: 'Carlos Muza',
  },
  {
    name: 'project_realestate',
    url: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&h=800&fit=crop&q=80',
    credit: 'Tierra Mallorca',
  },
  {
    name: 'project_auction',
    url: 'https://images.unsplash.com/photo-1589652717521-10c0d092dea9?w=1200&h=800&fit=crop&q=80',
    credit: 'Markus Spiske',
  },
  {
    name: 'project_classifieds',
    url: 'https://images.unsplash.com/photo-1555421689-d68471e189f2?w=1200&h=800&fit=crop&q=80',
    credit: 'Bench Accounting',
  },
  {
    name: 'project_inventory',
    url: 'https://images.unsplash.com/photo-1553413077-190dd305871c?w=1200&h=800&fit=crop&q=80',
    credit: 'Ruchindra Gunasekara',
  },
  {
    name: 'project_jobs',
    url: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1200&h=800&fit=crop&q=80',
    credit: 'Hunters Race',
  },
  {
    name: 'project_website',
    url: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=1200&h=800&fit=crop&q=80',
    credit: 'Eftakher Alam',
  },
  {
    name: 'project_management',
    url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop&q=80',
    credit: 'Carlos Muza',
  },
  {
    name: 'project_restaurant',
    url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&h=800&fit=crop&q=80',
    credit: 'Jason Leung',
  },
];

/**
 * Download a URL and return the Buffer
 */
function download(url, maxRedirects = 5) {
  return new Promise((resolve, reject) => {
    if (maxRedirects <= 0) return reject(new Error('Too many redirects'));

    const client = url.startsWith('https') ? https : http;
    client
      .get(url, { headers: { 'User-Agent': 'BizBrew-ImageProcessor/1.0' } }, (res) => {
        // Follow redirects
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          return resolve(download(res.headers.location, maxRedirects - 1));
        }
        if (res.statusCode !== 200) {
          return reject(new Error(`HTTP ${res.statusCode} for ${url}`));
        }
        const chunks = [];
        res.on('data', (chunk) => chunks.push(chunk));
        res.on('end', () => resolve(Buffer.concat(chunks)));
        res.on('error', reject);
      })
      .on('error', reject);
  });
}

/**
 * Create the warm amber/charcoal tint overlay as an SVG
 */
function createTintOverlay(width, height) {
  return Buffer.from(`
    <svg width="${width}" height="${height}">
      <rect width="${width}" height="${height}" fill="#1B1B1B" opacity="0.25" />
      <rect width="${width}" height="${height}" fill="#D99A4D" opacity="0.10" />
    </svg>
  `);
}

/**
 * Create the Unsplash credit text overlay as an SVG
 */
function createCreditOverlay(width, height, photographer) {
  const text = `Photo: ${photographer} / Unsplash`;
  return Buffer.from(`
    <svg width="${width}" height="${height}">
      <rect x="${width - 300}" y="${height - 28}" width="290" height="22" rx="4" fill="rgba(0,0,0,0.5)" />
      <text x="${width - 155}" y="${height - 13}" font-family="sans-serif" font-size="11"
            fill="rgba(255,255,255,0.8)" text-anchor="middle">${text}</text>
    </svg>
  `);
}

/**
 * Process a single image: download, tint, credit, save WebP + JPEG
 */
async function processImage({ name, url, credit }) {
  const webpPath = path.join(PUBLIC_DIR, `${name}.webp`);
  const jpegPath = path.join(PUBLIC_DIR, `${name}.jpg`);

  console.log(`  Downloading ${name}...`);
  let buffer;
  try {
    buffer = await download(url);
  } catch (err) {
    console.error(`  ✗ Failed to download ${name}: ${err.message}`);
    // If existing JPG exists, convert it instead
    const existingJpg = path.join(PUBLIC_DIR, `${name}.jpg`);
    if (existsSync(existingJpg)) {
      console.log(`  → Using existing ${name}.jpg as fallback`);
      buffer = await sharp(existingJpg).toBuffer();
    } else {
      return false;
    }
  }

  // Resize to target dimensions
  const resized = sharp(buffer).resize(WIDTH, HEIGHT, {
    fit: 'cover',
    position: 'center',
  });

  // Get the resized buffer for compositing
  const resizedBuffer = await resized.toBuffer();

  // Create overlays
  const tintOverlay = createTintOverlay(WIDTH, HEIGHT);
  const creditOverlay = createCreditOverlay(WIDTH, HEIGHT, credit);

  // Composite: original + tint + credit
  const processed = sharp(resizedBuffer).composite([
    { input: tintOverlay, blend: 'over' },
    { input: creditOverlay, blend: 'over' },
  ]);

  // Output WebP
  await processed
    .clone()
    .webp({ quality: 80 })
    .toFile(webpPath);

  // Output JPEG
  await processed
    .clone()
    .jpeg({ quality: 80, mozjpeg: true })
    .toFile(jpegPath);

  const webpStats = await sharp(webpPath).metadata();
  const jpegStats = await sharp(jpegPath).metadata();
  console.log(
    `  ✓ ${name}: WebP ${Math.round((await sharp(webpPath).toBuffer()).length / 1024)}KB, JPEG ${Math.round((await sharp(jpegPath).toBuffer()).length / 1024)}KB`
  );
  return true;
}

// Main
async function main() {
  console.log('BizBrew Image Processor');
  console.log('='.repeat(50));
  console.log(`Processing ${images.length} images...\n`);

  let success = 0;
  let failed = 0;

  // Process sequentially to avoid overwhelming Unsplash
  for (const img of images) {
    const ok = await processImage(img);
    if (ok) success++;
    else failed++;
  }

  console.log(`\nDone! ${success} succeeded, ${failed} failed.`);
  if (failed > 0) process.exit(1);
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
