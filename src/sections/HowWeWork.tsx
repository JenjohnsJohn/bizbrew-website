import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Compass, Shield, Rocket } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    icon: Compass,
    title: 'Architecture First',
    description: 'We design before we build—so your system stays fast, safe, and easy to extend.',
    image: '/process_architecture.jpg',
    imagePosition: 'left',
  },
  {
    icon: Shield,
    title: 'Security by Design',
    description: 'Auth, access control, and data protection are built in from day one.',
    image: '/process_security.jpg',
    imagePosition: 'right',
  },
  {
    icon: Rocket,
    title: 'Production-Ready',
    description: 'Clean code, real tests, and observable systems—ready for real users and real scale.',
    image: '/process_production.jpg',
    imagePosition: 'left',
  },
];

export default function HowWeWork() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        headingRef.current,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Cards animation
      cardsRef.current.forEach((card) => {
        if (!card) return;

        const image = card.querySelector('.card-image');

        gsap.fromTo(
          card,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          }
        );

        // Parallax for images
        if (image) {
          gsap.fromTo(
            image,
            { y: -12 },
            {
              y: 12,
              ease: 'none',
              scrollTrigger: {
                trigger: card,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
              },
            }
          );
        }
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-flowing bg-bizbrew-offwhite py-24 md:py-32"
    >
      <div className="px-[6vw]">
        {/* Heading */}
        <h2
          ref={headingRef}
          className="font-display font-bold text-[clamp(34px,4vw,58px)] text-bizbrew-charcoal mb-16 md:mb-24 max-w-[52vw]"
        >
          How we work
        </h2>

        {/* Steps */}
        <div className="space-y-16 md:space-y-24">
          {steps.map((step, index) => (
            <div
              key={index}
              ref={(el) => { cardsRef.current[index] = el; }}
              className={`flex flex-col ${
                step.imagePosition === 'right' ? 'lg:flex-row-reverse' : 'lg:flex-row'
              } gap-8 lg:gap-16 items-center`}
            >
              {/* Image */}
              <div className="w-full lg:w-[55%] aspect-[16/10] rounded-[22px] overflow-hidden bg-white shadow-sm">
                <img
                  src={step.image}
                  alt={step.title}
                  className="card-image w-full h-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="card-content w-full lg:w-[45%] lg:px-8">
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
          ))}
        </div>
      </div>
    </section>
  );
}
