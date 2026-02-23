import type { ContentBlock } from '@/data/blog';
import type { GermanCity, EUCountry } from '@/data/locations/types';

export interface BlogPostData {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readingTime: string;
  author: string;
  tags: string[];
  image: string;
  relatedService?: string;
  relatedServiceSlug?: string;
  content: ContentBlock[];
}

export type GermanCityTemplate = (city: GermanCity) => BlogPostData;
export type EUCountryTemplate = (country: EUCountry) => BlogPostData;

export interface TemplateSet {
  keyword: string;
  germanTemplates: GermanCityTemplate[];
  euTemplates: EUCountryTemplate[];
}
