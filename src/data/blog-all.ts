/**
 * Barrel file that merges hand-written editorial posts with generated local SEO posts.
 * Import from this file instead of blog.ts when you need the full post catalog.
 */
import { blogPosts as editorialPosts, type BlogPost, type ContentBlock } from './blog';
import { localSeoPosts } from './blog-local-seo';

export type { BlogPost, ContentBlock };

/** All blog posts: editorial + generated SEO posts, sorted by date descending */
export const allBlogPosts: BlogPost[] = [
  ...editorialPosts,
  ...localSeoPosts,
].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

/** The 5 hand-written editorial posts */
export const featuredPosts: BlogPost[] = editorialPosts;

/** Only the generated local SEO posts */
export const seoPosts: BlogPost[] = localSeoPosts;

/** Get a post by slug from the full catalog */
export function getPostBySlug(slug: string): BlogPost | undefined {
  return allBlogPosts.find((p) => p.slug === slug);
}

/** Get all slugs from the full catalog */
export function getAllSlugs(): string[] {
  return allBlogPosts.map((p) => p.slug);
}

/** Unique tags across all posts */
export function getAllTags(): string[] {
  const tags = new Set<string>();
  for (const post of allBlogPosts) {
    for (const tag of post.tags) {
      tags.add(tag);
    }
  }
  return Array.from(tags).sort();
}

/** Topic categories for filtering */
export const topicFilters = [
  { label: 'All Topics', value: '' },
  { label: 'Web Development', value: 'webentwicklung' },
  { label: 'Mobile Apps', value: 'app entwicklung' },
  { label: 'E-Commerce', value: 'e-commerce' },
  { label: 'Cloud & DevOps', value: 'cloud' },
  { label: 'AI & Machine Learning', value: 'ki' },
  { label: 'Digital Agency', value: 'digitalagentur' },
] as const;

/** Region categories for filtering */
export const regionFilters = [
  { label: 'All Regions', value: '' },
  { label: 'Germany', value: 'germany' },
  { label: 'Europe', value: 'europe' },
  { label: 'Editorial', value: 'editorial' },
] as const;

/** Filter posts by topic and region */
export function filterPosts(
  posts: BlogPost[],
  topic: string,
  region: string
): BlogPost[] {
  return posts.filter((post) => {
    const matchesTopic = !topic || post.tags.some((t) => t.toLowerCase().includes(topic.toLowerCase()));
    const matchesRegion =
      !region ||
      (region === 'germany' && post.tags.some((t) => ['north', 'south', 'east', 'west', 'central'].includes(t))) ||
      (region === 'europe' && post.tags.includes('europe')) ||
      (region === 'editorial' && !post.tags.includes('europe') && !post.tags.some((t) => ['north', 'south', 'east', 'west', 'central'].includes(t)));
    return matchesTopic && matchesRegion;
  });
}
