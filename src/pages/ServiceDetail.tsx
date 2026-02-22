import { useRef, useEffect, useLayoutEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowLeft } from 'lucide-react';
import { getServiceBySlug } from '../data/services';
import { caseStudies } from '../data/caseStudies';
import SEO from '../components/SEO';
import MagneticButton from '../components/MagneticButton';
import { SITE_URL } from '../lib/seo';

gsap.registerPlugin(ScrollTrigger);

export default function ServiceDetail() {
  const { slug } = useParams<{ slug: string }>();
  const service = slug ? getServiceBySlug(slug) : undefined;

  const heroRef = useRef<HTMLElement>(null);
  const backRef = useRef<HTMLAnchorElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const highlightsSectionRef = useRef<HTMLElement>(null);
  const benefitsSectionRef = useRef<HTMLElement>(null);
  const useCasesSectionRef = useRef<HTMLElement>(null);
  const processSectionRef = useRef<HTMLElement>(null);
  const techSectionRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);

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
    if (!service) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Hero entrance animations
      gsap.fromTo(backRef.current, { x: -12, opacity: 0 }, { x: 0, opacity: 1, duration: 0.5, ease: 'power2.out' });
      gsap.fromTo(titleRef.current, { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, delay: 0.1, ease: 'power2.out' });
      gsap.fromTo(taglineRef.current, { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, delay: 0.2, ease: 'power2.out' });
      gsap.fromTo(imageRef.current, { x: 40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.7, delay: 0.15, ease: 'power2.out' });
      gsap.fromTo(descRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, delay: 0.3, ease: 'power2.out' });

      // Highlights: items stagger in from left
      if (highlightsSectionRef.current) {
        const items = highlightsSectionRef.current.querySelectorAll('li');
        gsap.fromTo(
          items,
          { x: -16, opacity: 0 },
          {
            x: 0, opacity: 1, duration: 0.4, stagger: 0.05, ease: 'power2.out',
            scrollTrigger: { trigger: highlightsSectionRef.current, start: 'top 80%', toggleActions: 'play none none reverse' },
          }
        );
      }

      // Benefits: cards fade up with stagger
      if (benefitsSectionRef.current) {
        const cards = benefitsSectionRef.current.querySelectorAll('[data-benefit]');
        gsap.fromTo(
          cards,
          { y: 30, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'power2.out',
            scrollTrigger: { trigger: benefitsSectionRef.current, start: 'top 80%', toggleActions: 'play none none reverse' },
          }
        );
      }

      // Use Cases: items slide in from right
      if (useCasesSectionRef.current) {
        const items = useCasesSectionRef.current.querySelectorAll('li');
        gsap.fromTo(
          items,
          { x: 20, opacity: 0 },
          {
            x: 0, opacity: 1, duration: 0.4, stagger: 0.06, ease: 'power2.out',
            scrollTrigger: { trigger: useCasesSectionRef.current, start: 'top 80%', toggleActions: 'play none none reverse' },
          }
        );
      }

      // Process: step numbers scale up, then text slides in
      if (processSectionRef.current) {
        const steps = processSectionRef.current.querySelectorAll('[data-process-step]');
        steps.forEach((step) => {
          const number = step.querySelector('[data-step-number]');
          const text = step.querySelector('[data-step-text]');
          if (number) {
            gsap.fromTo(number, { scale: 0, opacity: 0 }, {
              scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(1.7)',
              scrollTrigger: { trigger: step, start: 'top 85%', toggleActions: 'play none none reverse' },
            });
          }
          if (text) {
            gsap.fromTo(text, { x: 20, opacity: 0 }, {
              x: 0, opacity: 1, duration: 0.5, delay: 0.15, ease: 'power2.out',
              scrollTrigger: { trigger: step, start: 'top 85%', toggleActions: 'play none none reverse' },
            });
          }
        });
      }

      // Technologies: tags pop in with scale bounce
      if (techSectionRef.current) {
        const tags = techSectionRef.current.querySelectorAll('[data-tech-tag]');
        gsap.fromTo(
          tags,
          { scale: 0, opacity: 0 },
          {
            scale: 1, opacity: 1, duration: 0.3, stagger: 0.03, ease: 'back.out(1.7)',
            scrollTrigger: { trigger: techSectionRef.current, start: 'top 80%', toggleActions: 'play none none reverse' },
          }
        );
      }

      // CTA fade up
      gsap.fromTo(
        ctaRef.current,
        { y: 12, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.5, ease: 'power2.out',
          scrollTrigger: { trigger: ctaRef.current, start: 'top 90%', toggleActions: 'play none none reverse' },
        }
      );
    });

    return () => ctx.revert();
  }, [service]);

  // Find related case studies
  const relatedCaseStudies = caseStudies.filter(
    (cs) => cs.relatedServiceSlug === slug
  );

  if (!service) {
    return (
      <div className="min-h-screen bg-bizbrew-charcoal flex flex-col items-center justify-center px-6">
        <h1 className="font-display text-3xl text-bizbrew-offwhite mb-4">Service not found</h1>
        <p className="text-bizbrew-text-secondary mb-8">The page you&apos;re looking for doesn&apos;t exist.</p>
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
          provider: { '@type': 'Organization', name: 'BizBrew', url: SITE_URL },
          url: `${SITE_URL}/services/${service.slug}`,
        }}
      />
      {/* Hero */}
      <section
        ref={heroRef}
        className="relative pt-28 pb-16 md:pt-36 md:pb-24 px-[6vw]"
      >
        <Link
          ref={backRef}
          to="/#services"
          className="inline-flex items-center gap-2 text-bizbrew-text-secondary hover:text-bizbrew-amber transition-colors mb-12 font-mono text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          What we do
        </Link>

        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-start">
          <div>
            <h1
              ref={titleRef}
              className="font-display font-bold text-[clamp(36px,5vw,64px)] leading-[1.1] text-bizbrew-offwhite mb-4"
            >
              {service.title}
            </h1>
            <p
              ref={taglineRef}
              className="font-display text-xl text-bizbrew-amber mb-8"
            >
              {service.tagline}
            </p>
            <p
              ref={descRef}
              className="text-lg text-bizbrew-text-secondary leading-relaxed mb-6"
            >
              {service.description}
            </p>
            {service.longDescription && (
              <p className="text-bizbrew-text-secondary leading-relaxed opacity-90">
                {service.longDescription}
              </p>
            )}
          </div>

          <div
            ref={imageRef}
            className="w-full aspect-[4/3] md:aspect-[16/10] rounded-frame overflow-hidden"
          >
            <img
              src={service.image}
              alt={service.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="absolute right-[6vw] bottom-12 md:bottom-16 w-12 h-1 amber-pill" />
      </section>

      {/* Highlights */}
      <section ref={highlightsSectionRef} className="px-[6vw] py-16 md:py-24 border-t border-white/5">
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
      </section>

      {/* Benefits */}
      <section ref={benefitsSectionRef} className="px-[6vw] py-16 md:py-24 border-t border-white/5">
        <h2 className="font-display font-bold text-2xl text-bizbrew-offwhite mb-12">
          Why it matters
        </h2>
        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          {service.benefits.map((benefit, i) => (
            <div key={i} data-benefit className="space-y-3">
              <h3 className="font-display font-semibold text-lg text-bizbrew-amber">
                {benefit.title}
              </h3>
              <p className="text-bizbrew-text-secondary leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Use Cases */}
      {service.useCases && service.useCases.length > 0 && (
        <section ref={useCasesSectionRef} className="px-[6vw] py-16 md:py-24 border-t border-white/5">
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
                <span className="font-mono text-bizbrew-amber mt-0.5">&rarr;</span>
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Process */}
      {service.process && service.process.length > 0 && (
        <section ref={processSectionRef} className="px-[6vw] py-16 md:py-24 border-t border-white/5">
          <h2 className="font-display font-bold text-2xl text-bizbrew-offwhite mb-12">
            How we approach it
          </h2>
          <div className="space-y-8">
            {service.process.map((phase) => (
              <div
                key={phase.step}
                data-process-step
                className="flex gap-6 md:gap-10"
              >
                <span
                  data-step-number
                  className="flex-shrink-0 w-10 h-10 rounded-full bg-bizbrew-amber/20 text-bizbrew-amber font-display font-bold flex items-center justify-center"
                >
                  {phase.step}
                </span>
                <div data-step-text>
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
        </section>
      )}

      {/* Technologies */}
      {service.technologies && service.technologies.length > 0 && (
        <section ref={techSectionRef} className="px-[6vw] py-16 md:py-24 border-t border-white/5">
          <h2 className="font-display font-bold text-2xl text-bizbrew-offwhite mb-8">
            Technologies we use
          </h2>
          <div className="flex flex-wrap gap-3">
            {service.technologies.map((tech, i) => (
              <span
                key={i}
                data-tech-tag
                className="px-4 py-2 rounded-full bg-white/5 text-bizbrew-text-secondary font-mono text-sm border border-white/10"
              >
                {tech}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Related Case Studies */}
      {relatedCaseStudies.length > 0 && (
        <section className="px-[6vw] py-16 md:py-24 border-t border-white/5">
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
                <p className="font-mono text-xs text-bizbrew-amber mb-2">{cs.industry}</p>
                <h3 className="font-display font-bold text-xl text-bizbrew-offwhite group-hover:text-bizbrew-amber transition-colors mb-2">
                  {cs.title}
                </h3>
                <p className="text-bizbrew-text-secondary text-sm leading-relaxed">{cs.summary}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="px-[6vw] py-16 md:py-24 border-t border-white/5">
        <p className="text-bizbrew-text-secondary mb-6">
          Ready to get started?
        </p>
        <Link
          ref={ctaRef}
          to="/#contact"
          className="inline-block"
        >
          <MagneticButton className="cta-button" strength={0.3}>
            {service.ctaText}
            <ArrowLeft className="w-4 h-4 rotate-180" />
          </MagneticButton>
        </Link>
      </section>
    </div>
  );
}
