import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="min-h-screen pt-32 pb-16 md:pb-24 px-[6vw] bg-bizbrew-charcoal relative">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Text */}
        <div>
          <h1 className="font-display font-bold text-[clamp(44px,6vw,84px)] leading-[1.05] text-bizbrew-offwhite mb-6">
            Brewed
            <br />
            for <span className="text-bizbrew-amber">Business</span>
          </h1>

          <p className="text-lg md:text-xl text-bizbrew-text-secondary leading-relaxed mb-8 max-w-lg">
            Scalable SaaS, custom apps, and cloud-native systems — built with care.
          </p>

          <Link to="/#services" className="cta-button mb-6">
            Explore services
            <ArrowRight className="w-4 h-4" />
          </Link>

          <p className="font-mono text-sm text-bizbrew-text-secondary">
            Architecture-first &bull; Security-by-design
          </p>
        </div>

        {/* Image */}
        <div className="w-full aspect-[4/3] rounded-frame overflow-hidden">
          <picture>
            <source srcSet="/hero_barista.webp" type="image/webp" />
            <img
              src="/hero_barista.jpg"
              alt="Coffee brewing — representing the craft behind BizBrew software"
              className="w-full h-full object-cover"
              loading="eager"
              fetchPriority="high"
            />
          </picture>
        </div>
      </div>

      <div className="absolute right-[6vw] bottom-12 md:bottom-16 w-12 h-1 amber-pill" />
    </section>
  );
}
