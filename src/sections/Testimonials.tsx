import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Quote } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    quote: "BizBrew turned a messy prototype into a production-ready platform in months. Their attention to detail and systematic approach saved us countless hours of technical debt.",
    author: 'Sarah Chen',
    role: 'Product Lead, FinTech Startup',
    image: '/testimonial_01.jpg',
  },
  {
    quote: "They think in systems—so we spend less time fixing and more time shipping. The architecture they designed has scaled seamlessly as we've grown.",
    author: 'Marcus Weber',
    role: 'CTO, Logistics SaaS',
    image: '/testimonial_02.jpg',
  },
];

export default function Testimonials() {
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
            { y: -10 },
            {
              y: 10,
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
          What clients say
        </h2>

        {/* Testimonial Cards */}
        <div className="space-y-12 md:space-y-16">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              ref={(el) => { cardsRef.current[index] = el; }}
              className="bg-white rounded-[28px] p-8 md:p-12 shadow-sm"
            >
              <div className={`flex flex-col ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-8 lg:gap-12 items-center`}>
                {/* Quote Content */}
                <div className="w-full lg:w-[60%]">
                  <Quote className="w-10 h-10 text-bizbrew-amber mb-6" />
                  <blockquote className="text-xl md:text-2xl text-bizbrew-charcoal leading-relaxed mb-8">
                    "{testimonial.quote}"
                  </blockquote>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-bizbrew-offwhite">
                      <img
                        src={testimonial.image}
                        alt={testimonial.author}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-medium text-bizbrew-charcoal">
                        {testimonial.author}
                      </p>
                      <p className="text-sm text-bizbrew-text-light-secondary">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Image */}
                <div className="w-full lg:w-[40%] aspect-[4/5] rounded-[22px] overflow-hidden">
                  <img
                    src={testimonial.image}
                    alt={testimonial.author}
                    className="card-image w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
