import { useState, useEffect, useLayoutEffect } from 'react';
import { getProjectBySlug } from '@/data/projects';
import { fetchProject } from '@/lib/api';
import type { ProjectWithSEO } from '@/lib/api';
import type { Project } from '@/data/projects';
import SEO from '@/components/SEO';
import FadeIn from '@/components/FadeIn';
import ImageWithFallback from '@/components/ImageWithFallback';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { SITE_URL } from '@/lib/seo';

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();

  // Start with static data as fallback
  const staticProject = slug ? getProjectBySlug(slug) : undefined;
  const [project, setProject] = useState<Project | ProjectWithSEO | undefined>(staticProject);
  const [loading, setLoading] = useState(true);

  useLayoutEffect(() => {
    const prevRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    return () => {
      window.history.scrollRestoration = prevRestoration;
    };
  }, [slug]);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      if (!slug) return;
      try {
        const apiProject = await fetchProject(slug);
        if (!cancelled && apiProject) {
          setProject(apiProject);
        }
      } catch {
        // Keep static fallback
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => { cancelled = true; };
  }, [slug]);

  if (!project && !loading) {
    return (
      <div className="min-h-screen bg-bizbrew-charcoal flex flex-col items-center justify-center px-6">
        <h1 className="font-display text-3xl text-bizbrew-offwhite mb-4">
          Project not found
        </h1>
        <p className="text-bizbrew-text-secondary mb-8">
          The project you're looking for doesn't exist.
        </p>
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 text-bizbrew-amber font-medium hover:gap-3 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to projects
        </Link>
      </div>
    );
  }

  if (!project) {
    // Loading skeleton
    return (
      <div className="min-h-screen bg-bizbrew-charcoal animate-pulse">
        <section className="pt-28 pb-16 md:pt-36 md:pb-24 px-[6vw]">
          <div className="h-4 bg-white/5 rounded w-24 mb-12" />
          <div className="h-12 bg-white/5 rounded w-1/2 mb-6" />
          <div className="flex gap-3 mb-10">
            <div className="h-10 bg-white/5 rounded-full w-28" />
            <div className="h-10 bg-white/5 rounded-full w-28" />
            <div className="h-10 bg-white/5 rounded-full w-28" />
          </div>
        </section>
      </div>
    );
  }

  // Use SEO fields from API if available, otherwise fall back to project fields
  const seo = 'seo' in project
    ? (project as ProjectWithSEO).seo
    : { title: `${project.name} | BizBrew`, description: project.summary, image: project.image, keywords: null };

  // For the SEO component, use the raw title from seo (it already has "| BizBrew" appended)
  // But the SEO component also appends "| BizBrew", so we need to handle this
  const seoTitle = 'seo' in project && (project as ProjectWithSEO).seo_title
    ? (project as ProjectWithSEO).seo_title!
    : project.name;
  const seoDescription = seo.description;
  const seoImage = seo.image;

  return (
    <div className="min-h-screen bg-bizbrew-charcoal">
      <SEO
        title={seoTitle}
        description={seoDescription}
        image={seoImage}
        path={`/projects/${slug}`}
        type="article"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'CreativeWork',
          name: project.name,
          description: seo.description,
          image: `${SITE_URL}${seo.image}`,
          url: `${SITE_URL}/projects/${slug}`,
          creator: {
            '@type': 'Organization',
            name: 'BizBrew',
            url: SITE_URL,
          },
          dateCreated: project.year.split('–')[0],
          genre: project.category,
          keywords: seo.keywords || project.stack.join(', '),
        }}
      />

      {/* Hero */}
      <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 px-[6vw]">
        <FadeIn>
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-bizbrew-text-secondary hover:text-bizbrew-amber transition-colors mb-12 font-mono text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            All projects
          </Link>

          <h1 className="font-display font-bold text-[clamp(36px,5vw,64px)] leading-[1.1] text-bizbrew-offwhite mb-6">
            {project.name}
          </h1>

          <div className="flex flex-wrap gap-3 mb-10">
            <span className="px-4 py-2 rounded-full bg-white/5 text-bizbrew-text-secondary font-mono text-sm border border-white/10">
              {project.category}
            </span>
            <span className="px-4 py-2 rounded-full bg-white/5 text-bizbrew-text-secondary font-mono text-sm border border-white/10">
              {project.year}
            </span>
            <span className="px-4 py-2 rounded-full bg-white/5 text-bizbrew-text-secondary font-mono text-sm border border-white/10">
              {project.client}
            </span>
            <span className={`px-4 py-2 rounded-full font-mono text-sm border ${
              project.status === 'Completed' || project.status === 'Production'
                ? 'bg-green-500/10 text-green-400 border-green-500/20'
                : 'bg-bizbrew-amber/10 text-bizbrew-amber border-bizbrew-amber/20'
            }`}>
              {project.status}
            </span>
          </div>
        </FadeIn>
      </section>

      {/* About + Image side by side */}
      <FadeIn as="section" className="px-[6vw] py-16 md:py-24 border-t border-white/5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start">
          <div>
            <h2 className="font-display font-bold text-2xl text-bizbrew-offwhite mb-8">
              About This Project
            </h2>
            <p className="text-bizbrew-text-secondary leading-relaxed">
              {project.description}
            </p>
          </div>
          <div className="aspect-[4/3] rounded-frame overflow-hidden">
            <ImageWithFallback
              src={project.image}
              alt={project.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </FadeIn>

      {/* Key Features */}
      <FadeIn as="section" className="px-[6vw] py-16 md:py-24 border-t border-white/5">
        <h2 className="font-display font-bold text-2xl text-bizbrew-offwhite mb-8">
          Key Features
        </h2>
        <div className="max-w-3xl">
          <ul className="space-y-4">
            {project.highlights.map((highlight, i) => (
              <li
                key={i}
                className="flex items-start gap-3 text-bizbrew-text-secondary leading-relaxed"
              >
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-bizbrew-amber mt-2.5 flex-shrink-0" />
                {highlight}
              </li>
            ))}
          </ul>
        </div>
      </FadeIn>

      {/* Tech Stack */}
      <FadeIn as="section" className="px-[6vw] py-16 md:py-24 border-t border-white/5">
        <h2 className="font-display font-bold text-2xl text-bizbrew-offwhite mb-8">
          Tech Stack
        </h2>
        <div className="flex flex-wrap gap-3">
          {project.stack.map((tech, i) => (
            <span
              key={i}
              className="px-4 py-2 rounded-full bg-white/5 text-bizbrew-text-secondary font-mono text-sm border border-white/10"
            >
              {tech}
            </span>
          ))}
        </div>
      </FadeIn>

      {/* Platforms */}
      <FadeIn as="section" className="px-[6vw] py-16 md:py-24 border-t border-white/5">
        <h2 className="font-display font-bold text-2xl text-bizbrew-offwhite mb-8">
          Platforms
        </h2>
        <div className="flex flex-wrap gap-3">
          {project.platforms.map((platform, i) => (
            <span
              key={i}
              className="px-5 py-2.5 rounded-full bg-bizbrew-amber/10 text-bizbrew-amber font-mono text-sm border border-bizbrew-amber/20"
            >
              {platform}
            </span>
          ))}
        </div>
      </FadeIn>

      {/* Features */}
      <FadeIn as="section" className="px-[6vw] py-16 md:py-24 border-t border-white/5">
        <h2 className="font-display font-bold text-2xl text-bizbrew-offwhite mb-8">
          Features
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl">
          {project.features.map((feature, i) => (
            <div
              key={i}
              className="flex items-start gap-3 text-bizbrew-text-secondary"
            >
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-bizbrew-amber mt-2 flex-shrink-0" />
              <span className="text-sm leading-relaxed">{feature}</span>
            </div>
          ))}
        </div>
      </FadeIn>

      {/* CTA */}
      <FadeIn as="section" className="px-[6vw] py-16 md:py-24 border-t border-white/5">
        <p className="text-bizbrew-text-secondary mb-6">
          Need something similar? Let's talk about your project.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link
            to="/#contact"
            className="cta-button inline-flex items-center gap-2"
          >
            Start a conversation
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/10 text-bizbrew-text-secondary hover:border-bizbrew-amber/30 hover:text-bizbrew-offwhite transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            All projects
          </Link>
        </div>
      </FadeIn>
    </div>
  );
}
