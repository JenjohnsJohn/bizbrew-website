import { caseStudies } from '@/data/caseStudies';
import SEO from '@/components/SEO';
import FadeIn from '@/components/FadeIn';
import ImageWithFallback from '@/components/ImageWithFallback';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function CaseStudiesPage() {
  return (
    <div className="min-h-screen bg-bizbrew-charcoal">
      <SEO
        title="Case Studies"
        description="See how BizBrew builds real solutions for real businesses. Explore our case studies showcasing custom software, SaaS platforms, and integrations."
        path="/case-studies"
      />

      {/* Hero */}
      <section className="pt-28 md:pt-36 pb-24 px-[6vw]">
        <FadeIn>
          <h1 className="font-display font-bold text-[clamp(36px,5vw,64px)] leading-[1.1] text-bizbrew-offwhite mb-6">
            Our Work
          </h1>
          <p className="text-lg text-bizbrew-text-secondary leading-relaxed max-w-2xl">
            We don't build demos — we build real solutions for real businesses.
            Here's a look at how we've helped our clients solve hard problems
            and move faster.
          </p>
        </FadeIn>
      </section>

      {/* Case Study Cards */}
      <section className="px-[6vw] pb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {caseStudies.map((cs, i) => (
            <FadeIn key={cs.slug} delay={i * 100}>
              <Link
                to={`/case-studies/${cs.slug}`}
                className="group bg-white/5 border border-white/10 rounded-[22px] overflow-hidden hover:border-bizbrew-amber/30 transition"
              >
                <div className="aspect-[16/10] overflow-hidden">
                  <ImageWithFallback
                    src={cs.image}
                    alt={cs.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="p-6">
                  <span className="inline-block px-3 py-1 rounded-full bg-white/5 text-bizbrew-text-secondary font-mono text-xs border border-white/10 mb-4">
                    {cs.industry}
                  </span>
                  <h2 className="font-display font-semibold text-xl text-bizbrew-offwhite mb-2">
                    {cs.title}
                  </h2>
                  <p className="text-bizbrew-text-secondary text-sm leading-relaxed mb-6">
                    {cs.summary}
                  </p>
                  <span className="inline-flex items-center gap-2 text-bizbrew-amber font-medium text-sm group-hover:gap-3 transition-all">
                    Read case study
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </section>
    </div>
  );
}
