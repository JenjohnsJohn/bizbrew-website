import { getCaseStudyBySlug } from '@/data/caseStudies';
import SEO from '@/components/SEO';
import AnimatedCounter from '@/components/AnimatedCounter';
import FadeIn from '@/components/FadeIn';
import ImageWithFallback from '@/components/ImageWithFallback';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useLayoutEffect } from 'react';
import { SITE_URL } from '@/lib/seo';

export default function CaseStudyDetail() {
  const { slug } = useParams<{ slug: string }>();
  const caseStudy = slug ? getCaseStudyBySlug(slug) : undefined;

  // Reset scroll on mount
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

  if (!caseStudy) {
    return (
      <div className="min-h-screen bg-bizbrew-charcoal flex flex-col items-center justify-center px-6">
        <h1 className="font-display text-3xl text-bizbrew-offwhite mb-4">
          Case study not found
        </h1>
        <p className="text-bizbrew-text-secondary mb-8">
          The case study you're looking for doesn't exist.
        </p>
        <Link
          to="/case-studies"
          className="inline-flex items-center gap-2 text-bizbrew-amber font-medium hover:gap-3 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to case studies
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bizbrew-charcoal">
      <SEO
        title={caseStudy.title}
        description={caseStudy.summary.slice(0, 160)}
        image={caseStudy.image}
        path={`/case-studies/${slug}`}
        type="article"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: caseStudy.title,
          description: caseStudy.summary,
          image: `${SITE_URL}${caseStudy.image}`,
          publisher: {
            '@type': 'Organization',
            name: 'BizBrew',
            url: SITE_URL,
          },
          url: `${SITE_URL}/case-studies/${slug}`,
        }}
      />

      {/* Hero */}
      <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 px-[6vw]">
        <FadeIn>
          <Link
            to="/case-studies"
            className="inline-flex items-center gap-2 text-bizbrew-text-secondary hover:text-bizbrew-amber transition-colors mb-12 font-mono text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            All case studies
          </Link>

          <h1 className="font-display font-bold text-[clamp(36px,5vw,64px)] leading-[1.1] text-bizbrew-offwhite mb-6">
            {caseStudy.title}
          </h1>

          <div className="flex flex-wrap gap-3 mb-10">
            <span className="px-4 py-2 rounded-full bg-white/5 text-bizbrew-text-secondary font-mono text-sm border border-white/10">
              {caseStudy.client}
            </span>
            <span className="px-4 py-2 rounded-full bg-white/5 text-bizbrew-text-secondary font-mono text-sm border border-white/10">
              {caseStudy.industry}
            </span>
          </div>
        </FadeIn>

        <FadeIn>
          <div className="w-full aspect-[16/10] rounded-frame overflow-hidden">
            <ImageWithFallback
              src={caseStudy.image}
              alt={caseStudy.title}
              className="w-full h-full object-cover"
            />
          </div>
        </FadeIn>
      </section>

      {/* Challenge */}
      <FadeIn as="section" className="px-[6vw] py-16 md:py-24 border-t border-white/5">
        <h2 className="font-display font-bold text-2xl text-bizbrew-offwhite mb-8">
          The Challenge
        </h2>
        <div className="max-w-3xl space-y-6">
          {caseStudy.challenge.map((paragraph, i) => (
            <p
              key={i}
              className="text-bizbrew-text-secondary leading-relaxed"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </FadeIn>

      {/* Approach */}
      <FadeIn as="section" className="px-[6vw] py-16 md:py-24 border-t border-white/5">
        <h2 className="font-display font-bold text-2xl text-bizbrew-offwhite mb-8">
          Our Approach
        </h2>
        <div className="max-w-3xl space-y-6">
          {caseStudy.approach.map((paragraph, i) => (
            <p
              key={i}
              className="text-bizbrew-text-secondary leading-relaxed"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </FadeIn>

      {/* Solution */}
      <FadeIn as="section" className="px-[6vw] py-16 md:py-24 border-t border-white/5">
        <h2 className="font-display font-bold text-2xl text-bizbrew-offwhite mb-8">
          The Solution
        </h2>
        <div className="max-w-3xl space-y-6">
          {caseStudy.solution.map((paragraph, i) => (
            <p
              key={i}
              className="text-bizbrew-text-secondary leading-relaxed"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </FadeIn>

      {/* Results */}
      <FadeIn as="section" className="px-[6vw] py-16 md:py-24 border-t border-white/5">
        <h2 className="font-display font-bold text-2xl text-bizbrew-offwhite mb-12">
          Results
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {caseStudy.results.map((result, i) => (
            <FadeIn key={i} delay={i * 80}>
              <div className="bg-white/5 border border-white/10 rounded-[22px] p-6">
                <AnimatedCounter
                  end={result.value}
                  suffix={result.suffix}
                  className="font-display font-bold text-3xl text-bizbrew-amber block mb-2"
                />
                <h3 className="font-display font-semibold text-sm text-bizbrew-offwhite mb-2">
                  {result.metric}
                </h3>
                <p className="text-bizbrew-text-secondary text-sm leading-relaxed">
                  {result.description}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </FadeIn>

      {/* Technologies */}
      <FadeIn as="section" className="px-[6vw] py-16 md:py-24 border-t border-white/5">
        <h2 className="font-display font-bold text-2xl text-bizbrew-offwhite mb-8">
          Technologies
        </h2>
        <div className="flex flex-wrap gap-3">
          {caseStudy.technologies.map((tech, i) => (
            <span
              key={i}
              className="px-4 py-2 rounded-full bg-white/5 text-bizbrew-text-secondary font-mono text-sm border border-white/10"
            >
              {tech}
            </span>
          ))}
        </div>
      </FadeIn>

      {/* Testimonial */}
      <FadeIn as="section" className="px-[6vw] py-16 md:py-24 border-t border-white/5">
        <blockquote className="max-w-3xl border-l-4 border-bizbrew-amber pl-6 md:pl-8">
          <p className="text-lg md:text-xl text-bizbrew-offwhite leading-relaxed italic mb-6">
            &ldquo;{caseStudy.testimonial.quote}&rdquo;
          </p>
          <footer className="text-bizbrew-text-secondary">
            <span className="font-display font-semibold text-bizbrew-offwhite">
              {caseStudy.testimonial.author}
            </span>
            <span className="mx-2">/</span>
            <span>{caseStudy.testimonial.role}</span>
          </footer>
        </blockquote>
      </FadeIn>

      {/* Related Service + CTA */}
      <FadeIn as="section" className="px-[6vw] py-16 md:py-24 border-t border-white/5">
        <p className="text-bizbrew-text-secondary mb-4">
          This project used our{' '}
          <Link
            to={`/services/${caseStudy.relatedServiceSlug}`}
            className="text-bizbrew-amber hover:underline"
          >
            {caseStudy.relatedService}
          </Link>{' '}
          service.
        </p>
        <p className="text-bizbrew-text-secondary mb-6">
          Have a similar challenge? Let's talk about it.
        </p>
        <Link
          to="/#contact"
          className="cta-button inline-flex items-center gap-2"
        >
          Start a conversation
          <ArrowRight className="w-4 h-4" />
        </Link>
      </FadeIn>
    </div>
  );
}
