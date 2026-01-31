/**
 * SEO configuration and utilities.
 * Update SITE_URL when deploying to your production domain.
 */
export const SITE_URL = 'https://bizbrew.com';
export const SITE_NAME = 'BizBrew';
export const DEFAULT_DESCRIPTION =
  'Custom software, SaaS products, web and mobile apps. We build solutions that fit your workflows and scale with your business.';

export interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  path?: string;
  type?: 'website' | 'article';
  jsonLd?: Record<string, unknown>;
}

function getAbsoluteUrl(path: string): string {
  const base = SITE_URL.replace(/\/$/, '');
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${base}${normalizedPath}`;
}

function setMeta(name: string, content: string, property = false) {
  const attribute = property ? 'property' : 'name';
  let el = document.querySelector(`meta[${attribute}="${name}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attribute, name);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

export function setSEO({ title, description, image, path = '/', type = 'website', jsonLd }: SEOProps) {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;
  const fullDescription = description || DEFAULT_DESCRIPTION;
  const url = getAbsoluteUrl(path);
  const imageUrl = image ? getAbsoluteUrl(image) : getAbsoluteUrl('/hero_barista.jpg');

  document.title = fullTitle;

  setMeta('description', fullDescription);
  setMeta('og:title', fullTitle, true);
  setMeta('og:description', fullDescription, true);
  setMeta('og:url', url, true);
  setMeta('og:image', imageUrl, true);
  setMeta('og:type', type, true);
  setMeta('og:site_name', SITE_NAME, true);
  setMeta('og:image:width', '1200', true);
  setMeta('og:image:height', '630', true);
  setMeta('twitter:card', 'summary_large_image', true);
  setMeta('twitter:title', fullTitle, true);
  setMeta('twitter:description', fullDescription, true);
  setMeta('twitter:image', imageUrl, true);

  let canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    document.head.appendChild(canonical);
  }
  canonical.setAttribute('href', url);

  if (jsonLd) {
    injectJsonLd(jsonLd);
  }
}

export function injectJsonLd(data: Record<string, unknown>) {
  const id = 'bizbrew-jsonld';
  let script = document.getElementById(id) as HTMLScriptElement | null;
  if (!script) {
    script = document.createElement('script');
    script.id = id;
    script.type = 'application/ld+json';
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify(data);
}
