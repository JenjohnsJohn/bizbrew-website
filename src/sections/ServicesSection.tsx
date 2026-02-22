import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import FadeIn from '../components/FadeIn';
import { services } from '../data/services';

export default function ServicesSection() {
  return (
    <section className="section-flowing py-24 md:py-32 px-[6vw] bg-bizbrew-charcoal">
      <FadeIn>
        <p className="font-mono text-sm text-bizbrew-amber tracking-wider uppercase mb-4">
          What we build
        </p>
        <h2 className="font-display font-bold text-[clamp(34px,4vw,58px)] text-bizbrew-offwhite mb-16">
          Services
        </h2>
      </FadeIn>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, i) => (
          <FadeIn key={service.slug} delay={i * 80}>
            <Link
              to={`/services/${service.slug}`}
              className="group block p-6 md:p-8 rounded-[22px] bg-white/[0.03] border border-white/5 hover:border-bizbrew-amber/30 transition-all duration-300"
            >
              <h3 className="font-display font-semibold text-xl text-bizbrew-offwhite mb-2 group-hover:text-bizbrew-amber transition-colors">
                {service.title}
              </h3>
              <p className="text-bizbrew-text-secondary text-sm leading-relaxed mb-6">
                {service.tagline}
              </p>
              <span className="inline-flex items-center gap-2 text-bizbrew-amber text-sm font-medium group-hover:gap-3 transition-all">
                Learn more
                <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
