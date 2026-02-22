import { useLayoutEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { getServiceBySlug } from '../data/services';
import { caseStudies } from '../data/caseStudies';
import SEO from '../components/SEO';
import FadeIn from '../components/FadeIn';
import { SITE_URL } from '../lib/seo';

export default function ServiceDetail() {
  const { slug } = useParams<{ slug: string }>();
  const service = slug ? getServiceBySlug(slug) : undefined;

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

  // Find related case studies
  const relatedCaseStudies = caseStudies.filter(
    (cs) => cs.relatedServiceSlug === slug
  );

  if (!service) {
    return (
      <div className="min-h-screen bg-bizbrew-charcoal flex flex-col items-center justify-center px-6">
        <h1 className="font-display text-3xl text-bizbrew-offwhite mb-4">
          Service not found
        </h1>
        <p className="text-bizbrew-text-secondary mb-8">
          The page you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link
          to="/#services"
          className="inline-flex items-center gap-2 text-bizbrew-amber font-medium hover:gap-3 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to services
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bizbrew-charcoal">
      <SEO
        title={service.title}
        description={`${service.tagline} ${service.description}`.slice(0, 160)}
        image={service.image}
        path={`/services/${service.slug}`}
        type="article"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: service.title,
          description: service.description,
          provider: {
            '@type': 'Organization',
            name: 'BizBrew',
            url: SITE_URL,
          },
          url: `${SITE_URL}/services/${service.slug}`,
        }}
      />

      {/* Hero */}
      <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 px-[6vw]">
        <FadeIn>
          <Link
            to="/#services"
            className="inline-flex items-center gap-2 text-bizbrew-text-secondary hover:text-bizbrew-amber transition-colors mb-12 font-mono text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            What we do
          </Link>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-start">
          <FadeIn>
            <h1 className="font-display font-bold text-[clamp(36px,5vw,64px)] leading-[1.1] text-bizbrew-offwhite mb-4">
              {service.title}
            </h1>
            <p className="font-display text-xl text-bizbrew-amber mb-8">
              {service.tagline}
            </p>
            <p className="text-lg text-bizbrew-text-secondary leading-relaxed mb-6">
              {service.description}
            </p>
            {service.longDescription && (
              <p className="text-bizbrew-text-secondary leading-relaxed opacity-90">
                {service.longDescription}
              </p>
            )}
          </FadeIn>

          <FadeIn direction="right">
            <div className="w-full aspect-[4/3] md:aspect-[16/10] rounded-frame overflow-hidden">
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-full object-cover"
              />
            </div>
          </FadeIn>
        </div>

        <div className="absolute right-[6vw] bottom-12 md:bottom-16 w-12 h-1 amber-pill" />
      </section>

      {/* Highlights */}
      <FadeIn as="section" className="px-[6vw] py-16 md:py-24 border-t border-white/5">
        <h2 className="font-display font-bold text-2xl text-bizbrew-offwhite mb-8">
          What we deliver
        </h2>
        <ul className="grid sm:grid-cols-2 gap-4">
          {service.highlights.map((item, i) => (
            <li
              key={i}
              className="flex items-center gap-3 text-bizbrew-text-secondary"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-bizbrew-amber flex-shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </FadeIn>

      {/* Benefits */}
      <FadeIn as="section" className="px-[6vw] py-16 md:py-24 border-t border-white/5">
        <h2 className="font-display font-bold text-2xl text-bizbrew-offwhite mb-12">
          Why it matters
        </h2>
        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          {service.benefits.map((benefit, i) => (
            <div key={i} className="space-y-3">
              <h3 className="font-display font-semibold text-lg text-bizbrew-amber">
                {benefit.title}
              </h3>
              <p className="text-bizbrew-text-secondary leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </FadeIn>

      {/* Use Cases */}
      {service.useCases && service.useCases.length > 0 && (
        <FadeIn as="section" className="px-[6vw] py-16 md:py-24 border-t border-white/5">
          <h2 className="font-display font-bold text-2xl text-bizbrew-offwhite mb-8">
            When it fits
          </h2>
          <p className="text-bizbrew-text-secondary mb-8 max-w-2xl">
            This service works well for:
          </p>
          <ul className="space-y-4">
            {service.useCases.map((item, i) => (
              <li
                key={i}
                className="flex items-start gap-4 text-bizbrew-text-secondary"
              >
                <span className="font-mono text-bizbrew-amber mt-0.5">
                  &rarr;
                </span>
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </FadeIn>
      )}

      {/* Process */}
      {service.process && service.process.length > 0 && (
        <FadeIn as="section" className="px-[6vw] py-16 md:py-24 border-t border-white/5">
          <h2 className="font-display font-bold text-2xl text-bizbrew-offwhite mb-12">
            How we approach it
          </h2>
          <div className="space-y-8">
            {service.process.map((phase) => (
              <div key={phase.step} className="flex gap-6 md:gap-10">
                <span className="flex-shrink-0 w-10 h-10 rounded-full bg-bizbrew-amber/20 text-bizbrew-amber font-display font-bold flex items-center justify-center">
                  {phase.step}
                </span>
                <div>
                  <h3 className="font-display font-semibold text-lg text-bizbrew-offwhite mb-2">
                    {phase.title}
                  </h3>
                  <p className="text-bizbrew-text-secondary leading-relaxed">
                    {phase.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </FadeIn>
      )}

      {/* Technologies */}
      {service.technologies && service.technologies.length > 0 && (
        <FadeIn as="section" className="px-[6vw] py-16 md:py-24 border-t border-white/5">
          <h2 className="font-display font-bold text-2xl text-bizbrew-offwhite mb-8">
            Technologies we use
          </h2>
          <div className="flex flex-wrap gap-3">
            {service.technologies.map((tech, i) => (
              <span
                key={i}
                className="px-4 py-2 rounded-full bg-white/5 text-bizbrew-text-secondary font-mono text-sm border border-white/10"
              >
                {tech}
              </span>
            ))}
          </div>
        </FadeIn>
      )}

      {/* Related Case Studies */}
      {relatedCaseStudies.length > 0 && (
        <FadeIn as="section" className="px-[6vw] py-16 md:py-24 border-t border-white/5">
          <h2 className="font-display font-bold text-2xl text-bizbrew-offwhite mb-8">
            See this in action
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {relatedCaseStudies.map((cs) => (
              <Link
                key={cs.slug}
                to={`/case-studies/${cs.slug}`}
                className="group p-6 rounded-[22px] bg-white/5 border border-white/10 hover:border-bizbrew-amber/30 transition-all"
              >
                <p className="font-mono text-xs text-bizbrew-amber mb-2">
                  {cs.industry}
                </p>
                <h3 className="font-display font-bold text-xl text-bizbrew-offwhite group-hover:text-bizbrew-amber transition-colors mb-2">
                  {cs.title}
                </h3>
                <p className="text-bizbrew-text-secondary text-sm leading-relaxed">
                  {cs.summary}
                </p>
              </Link>
            ))}
          </div>
        </FadeIn>
      )}

      {/* CTA */}
      <FadeIn as="section" className="px-[6vw] py-16 md:py-24 border-t border-white/5">
        <p className="text-bizbrew-text-secondary mb-6">Ready to get started?</p>
        <Link to="/#contact" className="cta-button inline-flex items-center gap-2">
          {service.ctaText}
          <ArrowRight className="w-4 h-4" />
        </Link>
      </FadeIn>
    </div>
  );
}
