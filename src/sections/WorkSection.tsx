import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import FadeIn from '../components/FadeIn';
import ImageWithFallback from '../components/ImageWithFallback';
import { caseStudies } from '../data/caseStudies';

export default function WorkSection() {
  return (
    <section className="section-flowing py-24 md:py-32 px-[6vw] bg-bizbrew-charcoal">
      <FadeIn>
        <p className="font-mono text-sm text-bizbrew-amber tracking-wider uppercase mb-4">
          Selected Work
        </p>
        <h2 className="font-display font-bold text-[clamp(34px,4vw,58px)] text-bizbrew-offwhite mb-16">
          What we've built
        </h2>
      </FadeIn>

      <div className="grid md:grid-cols-3 gap-8 mb-12">
        {caseStudies.map((cs, i) => (
          <FadeIn key={cs.slug} delay={i * 100}>
            <Link
              to={`/case-studies/${cs.slug}`}
              className="group block bg-white/5 border border-white/10 rounded-[22px] overflow-hidden hover:border-bizbrew-amber/30 transition-all"
            >
              <div className="aspect-[16/10] overflow-hidden">
                <ImageWithFallback
                  src={cs.image}
                  alt={cs.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <span className="inline-block px-3 py-1 rounded-full bg-white/5 text-bizbrew-text-secondary font-mono text-xs border border-white/10 mb-3">
                  {cs.industry}
                </span>
                <h3 className="font-display font-semibold text-xl text-bizbrew-offwhite mb-2 group-hover:text-bizbrew-amber transition-colors">
                  {cs.title}
                </h3>
                <p className="text-bizbrew-text-secondary text-sm leading-relaxed mb-4 line-clamp-2">
                  {cs.summary}
                </p>
                <span className="inline-flex items-center gap-2 text-bizbrew-amber text-sm font-medium group-hover:gap-3 transition-all">
                  Read case study
                  <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>
          </FadeIn>
        ))}
      </div>

      <FadeIn>
        <Link
          to="/case-studies"
          className="inline-flex items-center gap-2 text-bizbrew-amber font-medium hover:gap-3 transition-all font-display"
        >
          View all case studies
          <ArrowRight className="w-4 h-4" />
        </Link>
      </FadeIn>
    </section>
  );
}
