import { useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

import SEO from '@/components/SEO';
import AnimatedCounter from '@/components/AnimatedCounter';
import FadeIn from '@/components/FadeIn';
import { SITE_URL } from '@/lib/seo';
import {
  aboutHero,
  aboutStory,
  aboutValues,
  aboutStats,
  aboutTechPhilosophy,
} from '@/data/about';

const aboutJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'BizBrew',
  url: SITE_URL,
  description:
    'BizBrew is a software development company that builds custom software, SaaS products, and web applications. Small team, deep expertise, direct communication.',
  foundingDate: '2020',
  sameAs: [],
};

export default function AboutPage() {
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
  }, []);

  return (
    <div className="min-h-screen bg-bizbrew-charcoal">
      <SEO
        title="About Us"
        description="BizBrew is a software development company that builds custom software, SaaS products, and web applications. Small team, deep expertise, direct communication."
        path="/about"
        jsonLd={aboutJsonLd}
      />

      {/* Hero */}
      <FadeIn as="section" className="relative pt-28 pb-16 md:pt-36 md:pb-24 px-[6vw]">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          <div>
            <p className="font-mono text-sm text-bizbrew-amber tracking-wider uppercase mb-4">
              About BizBrew
            </p>
            <h1 className="font-display font-bold text-[clamp(36px,5vw,64px)] leading-[1.1] text-bizbrew-offwhite mb-6">
              {aboutHero.headline}
            </h1>
            <p className="text-lg text-bizbrew-text-secondary leading-relaxed max-w-lg">
              {aboutHero.subheadline}
            </p>
          </div>

          <div className="w-full aspect-[4/3] rounded-frame overflow-hidden">
            <picture>
              <source srcSet="/process_architecture.webp" type="image/webp" />
              <img
                src="/process_architecture.jpg"
                alt="Software architecture"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </picture>
          </div>
        </div>

        <div className="absolute right-[6vw] bottom-12 md:bottom-16 w-12 h-1 amber-pill" />
      </FadeIn>

      {/* Story */}
      <FadeIn as="section" className="px-[6vw] py-16 md:py-24 border-t border-white/5">
        <div className="max-w-3xl">
          <h2 className="font-display font-bold text-3xl md:text-4xl text-bizbrew-offwhite mb-10">
            {aboutStory.title}
          </h2>
          <div className="space-y-6">
            {aboutStory.paragraphs.map((paragraph, i) => (
              <p
                key={i}
                className="text-bizbrew-text-secondary leading-relaxed text-lg"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </FadeIn>

      {/* Values */}
      <FadeIn as="section" className="px-[6vw] py-16 md:py-24 border-t border-white/5">
        <h2 className="font-display font-bold text-3xl md:text-4xl text-bizbrew-offwhite mb-12">
          What we stand for
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {aboutValues.map((value, i) => (
            <FadeIn key={i} delay={i * 80}>
              <div className="p-6 md:p-8 rounded-frame bg-white/[0.03] border border-white/5 hover:border-bizbrew-amber/20 transition-colors duration-300">
                <h3 className="font-display font-semibold text-xl text-bizbrew-amber mb-3">
                  {value.title}
                </h3>
                <p className="text-bizbrew-offwhite leading-relaxed mb-4">
                  {value.description}
                </p>
                <p className="text-bizbrew-text-secondary leading-relaxed text-sm">
                  {value.detail}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </FadeIn>

      {/* Numbers */}
      <FadeIn as="section" className="px-[6vw] py-16 md:py-24 border-t border-white/5">
        <h2 className="font-display font-bold text-3xl md:text-4xl text-bizbrew-offwhite mb-12">
          By the numbers
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {aboutStats.map((stat, i) => (
            <div
              key={i}
              className="p-6 md:p-8 rounded-frame bg-white/[0.03] border border-white/5 text-center"
            >
              <AnimatedCounter
                end={stat.value}
                suffix={stat.suffix}
                className="font-display font-bold text-[clamp(32px,4vw,56px)] text-bizbrew-amber block mb-2"
              />
              <p className="font-mono text-sm text-bizbrew-text-secondary">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </FadeIn>

      {/* Tech Philosophy */}
      <FadeIn as="section" className="px-[6vw] py-16 md:py-24 border-t border-white/5">
        <div className="max-w-3xl">
          <h2 className="font-display font-bold text-3xl md:text-4xl text-bizbrew-offwhite mb-10">
            {aboutTechPhilosophy.title}
          </h2>
          <div className="space-y-6">
            {aboutTechPhilosophy.paragraphs.map((paragraph, i) => (
              <p
                key={i}
                className="text-bizbrew-text-secondary leading-relaxed text-lg"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </FadeIn>

      {/* CTA */}
      <FadeIn as="section" className="px-[6vw] py-16 md:py-24 border-t border-white/5">
        <h2 className="font-display font-bold text-3xl md:text-4xl text-bizbrew-offwhite mb-4">
          Let's talk about your project
        </h2>
        <p className="text-bizbrew-text-secondary mb-8 max-w-xl text-lg">
          We're a small team that moves fast and communicates directly. Tell us
          what you're building and we'll figure out if we're a good fit.
        </p>
        <Link
          to="/#contact"
          className="cta-button inline-flex items-center gap-2"
        >
          Get in touch
          <ArrowRight className="w-4 h-4" />
        </Link>
      </FadeIn>
    </div>
  );
}
