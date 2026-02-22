import { getProjectBySlug } from '@/data/projects';
import SEO from '@/components/SEO';
import FadeIn from '@/components/FadeIn';
import ImageWithFallback from '@/components/ImageWithFallback';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useLayoutEffect } from 'react';
import { SITE_URL } from '@/lib/seo';

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? getProjectBySlug(slug) : undefined;

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

  if (!project) {
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

  return (
    <div className="min-h-screen bg-bizbrew-charcoal">
      <SEO
        title={project.name}
        description={project.summary}
        image={project.image}
        path={`/projects/${slug}`}
        type="article"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'CreativeWork',
          name: project.name,
          description: project.summary,
          image: `${SITE_URL}${project.image}`,
          url: `${SITE_URL}/projects/${slug}`,
          creator: {
            '@type': 'Organization',
            name: 'BizBrew',
            url: SITE_URL,
          },
          dateCreated: project.year.split('–')[0],
          genre: project.category,
          keywords: project.stack.join(', '),
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

        <FadeIn>
          <div className="w-full aspect-[16/10] rounded-frame overflow-hidden">
            <ImageWithFallback
              src={project.image}
              alt={project.name}
              className="w-full h-full object-cover"
            />
          </div>
        </FadeIn>
      </section>

      {/* Description */}
      <FadeIn as="section" className="px-[6vw] py-16 md:py-24 border-t border-white/5">
        <h2 className="font-display font-bold text-2xl text-bizbrew-offwhite mb-8">
          About This Project
        </h2>
        <div className="max-w-3xl">
          <p className="text-bizbrew-text-secondary leading-relaxed">
            {project.description}
          </p>
        </div>
      </FadeIn>

      {/* Highlights */}
      <FadeIn as="section" className="px-[6vw] py-16 md:py-24 border-t border-white/5">
        <h2 className="font-display font-bold text-2xl text-bizbrew-offwhite mb-8">
          Key Contributions
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
