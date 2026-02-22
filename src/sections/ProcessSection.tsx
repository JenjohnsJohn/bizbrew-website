import { Compass, Shield, Rocket, Check } from 'lucide-react';
import FadeIn from '../components/FadeIn';

const steps = [
  {
    icon: Compass,
    title: 'Architecture First',
    description:
      'We design before we build — so your system stays fast, safe, and easy to extend.',
    image: '/process_architecture.jpg',
  },
  {
    icon: Shield,
    title: 'Security by Design',
    description:
      'Auth, access control, and data protection are built in from day one.',
    image: '/process_security.jpg',
  },
  {
    icon: Rocket,
    title: 'Production-Ready',
    description:
      'Clean code, real tests, and observable systems — ready for real users and real scale.',
    image: '/process_production.jpg',
  },
];

const principles = [
  'Clean, maintainable code',
  'Scalable system design',
  'Transparent communication',
  'Long-term support mindset',
];

export default function ProcessSection() {
  return (
    <section className="section-flowing bg-bizbrew-offwhite py-24 md:py-32">
      <div className="px-[6vw]">
        {/* Heading */}
        <FadeIn>
          <h2 className="font-display font-bold text-[clamp(34px,4vw,58px)] text-bizbrew-charcoal mb-16 md:mb-24">
            How we work
          </h2>
        </FadeIn>

        {/* Process Steps */}
        <div className="space-y-16 md:space-y-24 mb-24">
          {steps.map((step, index) => (
            <FadeIn key={index}>
              <div
                className={`flex flex-col ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'
                } gap-8 lg:gap-16 items-center`}
              >
                {/* Image */}
                <div className="w-full lg:w-[55%] aspect-[16/10] rounded-[22px] overflow-hidden bg-white shadow-sm">
                  <img
                    src={step.image}
                    alt={step.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Content */}
                <div className="w-full lg:w-[45%] lg:px-8">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-bizbrew-charcoal flex items-center justify-center">
                      <step.icon className="w-6 h-6 text-bizbrew-amber" />
                    </div>
                    <span className="font-mono text-sm text-bizbrew-text-light-secondary">
                      0{index + 1}
                    </span>
                  </div>
                  <h3 className="font-display font-bold text-2xl md:text-3xl text-bizbrew-charcoal mb-4">
                    {step.title}
                  </h3>
                  <p className="text-lg text-bizbrew-text-light-secondary leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Principles */}
        <FadeIn>
          <h3 className="font-display font-bold text-2xl md:text-3xl text-bizbrew-charcoal mb-8">
            Our <span className="text-bizbrew-amber">Principles</span>
          </h3>
          <p className="text-lg text-bizbrew-text-light-secondary leading-relaxed mb-8 max-w-2xl">
            We don't just ship features — we help you build a reliable software
            business.
          </p>
        </FadeIn>
        <div className="grid sm:grid-cols-2 gap-4">
          {principles.map((principle, i) => (
            <FadeIn key={i} delay={i * 80}>
              <div className="flex items-center gap-4 p-4 rounded-xl bg-white shadow-sm">
                <div className="w-6 h-6 rounded-full bg-bizbrew-amber/20 flex items-center justify-center shrink-0">
                  <Check className="w-4 h-4 text-bizbrew-amber" />
                </div>
                <span className="text-bizbrew-charcoal text-lg">
                  {principle}
                </span>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
