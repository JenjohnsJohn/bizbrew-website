import FadeIn from '../components/FadeIn';
import AnimatedCounter from '../components/AnimatedCounter';
import { aboutStats } from '../data/about';

export default function StatsSection() {
  return (
    <section className="section-flowing py-24 md:py-32 px-[6vw] bg-bizbrew-charcoal">
      <FadeIn>
        <h2 className="font-display font-bold text-[clamp(34px,4vw,58px)] text-bizbrew-offwhite mb-12">
          By the numbers
        </h2>
      </FadeIn>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
        {aboutStats.map((stat, i) => (
          <FadeIn key={i} delay={i * 100}>
            <div className="p-6 md:p-8 rounded-[22px] bg-white/[0.03] border border-white/5 text-center">
              <AnimatedCounter
                end={stat.value}
                suffix={stat.suffix}
                className="font-display font-bold text-[clamp(32px,4vw,56px)] text-bizbrew-amber block mb-2"
              />
              <p className="font-mono text-sm text-bizbrew-text-secondary">
                {stat.label}
              </p>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
