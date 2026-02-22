import { Quote } from 'lucide-react';
import FadeIn from '../components/FadeIn';

const testimonials = [
  {
    quote:
      "BizBrew turned a messy prototype into a production-ready platform in months. Their attention to detail and systematic approach saved us countless hours of technical debt.",
    author: 'Sarah Chen',
    role: 'Product Lead, FinTech Startup',
    image: '/testimonial_01.jpg',
  },
  {
    quote:
      "They think in systems — so we spend less time fixing and more time shipping. The architecture they designed has scaled seamlessly as we've grown.",
    author: 'Marcus Weber',
    role: 'CTO, Logistics SaaS',
    image: '/testimonial_02.jpg',
  },
];

export default function TestimonialsSection() {
  return (
    <section className="section-flowing bg-bizbrew-offwhite py-24 md:py-32">
      <div className="px-[6vw]">
        <FadeIn>
          <h2 className="font-display font-bold text-[clamp(34px,4vw,58px)] text-bizbrew-charcoal mb-16 md:mb-24">
            What clients say
          </h2>
        </FadeIn>

        <div className="space-y-12 md:space-y-16">
          {testimonials.map((testimonial, index) => (
            <FadeIn key={index}>
              <div className="bg-white rounded-[28px] p-8 md:p-12 shadow-sm">
                <div
                  className={`flex flex-col ${
                    index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'
                  } gap-8 lg:gap-12 items-center`}
                >
                  {/* Quote Content */}
                  <div className="w-full lg:w-[60%]">
                    <Quote className="w-10 h-10 text-bizbrew-amber mb-6" />
                    <blockquote className="text-xl md:text-2xl text-bizbrew-charcoal leading-relaxed mb-8">
                      &ldquo;{testimonial.quote}&rdquo;
                    </blockquote>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full overflow-hidden bg-bizbrew-offwhite">
                        <picture>
                          <source srcSet={testimonial.image.replace(/\.jpg$/, '.webp')} type="image/webp" />
                          <img
                            src={testimonial.image}
                            alt={testimonial.author}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        </picture>
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
                    <picture>
                      <source srcSet={testimonial.image.replace(/\.jpg$/, '.webp')} type="image/webp" />
                      <img
                        src={testimonial.image}
                        alt={testimonial.author}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </picture>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
