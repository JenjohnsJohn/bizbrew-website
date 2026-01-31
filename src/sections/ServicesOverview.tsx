import { useRef, useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';
import { services } from '../data/services';

gsap.registerPlugin(ScrollTrigger);

export default function ServicesOverview() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const underlineRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const microcopyRef = useRef<HTMLParagraphElement>(null);
  const accentPillRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        },
      });

      // ENTRANCE (0% - 30%)
      scrollTl.fromTo(
        imageRef.current,
        { x: '-60vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0
      );

      scrollTl.fromTo(
        titleRef.current,
        { y: '10vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.05
      );

      scrollTl.fromTo(
        underlineRef.current,
        { scaleX: 0 },
        { scaleX: 1, ease: 'none', transformOrigin: 'left center' },
        0.1
      );

      const listItems = listRef.current?.querySelectorAll('li');
      if (listItems) {
        scrollTl.fromTo(
          listItems,
          { x: '8vw', opacity: 0 },
          { x: 0, opacity: 1, ease: 'none', stagger: 0.02 },
          0.1
        );
      }

      scrollTl.fromTo(
        microcopyRef.current,
        { y: '4vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.2
      );

      scrollTl.fromTo(
        accentPillRef.current,
        { scaleX: 0 },
        { scaleX: 1, ease: 'none', transformOrigin: 'right center' },
        0.15
      );

      // SETTLE (30% - 70%) - static

      // EXIT (70% - 100%)
      scrollTl.fromTo(
        imageRef.current,
        { y: 0, opacity: 1 },
        { y: '-10vh', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        [titleRef.current, listRef.current, microcopyRef.current],
        { x: 0, opacity: 1 },
        { x: '8vw', opacity: 0, ease: 'power2.in', stagger: 0.02 },
        0.7
      );

      scrollTl.fromTo(
        accentPillRef.current,
        { x: 0, opacity: 1 },
        { x: '6vw', opacity: 0, ease: 'power2.in' },
        0.75
      );

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-pinned bg-bizbrew-charcoal z-20"
    >
      {/* Left Image Block */}
      <div
        ref={imageRef}
        className="absolute left-[6vw] top-[18vh] w-[34vw] h-[64vh] rounded-frame overflow-hidden"
      >
        <img
          src="/services_pour.jpg"
          alt="Coffee pouring"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right Content */}
      <div className="absolute left-[46vw] top-[18vh] w-[48vw]">
        {/* Title */}
        <h2
          ref={titleRef}
          className="font-display font-bold text-[clamp(34px,4vw,58px)] text-bizbrew-offwhite mb-4"
        >
          What we do
        </h2>

        {/* Amber Underline */}
        <div
          ref={underlineRef}
          className="w-24 h-1 amber-pill mb-10"
        />

        {/* Services List */}
        <ul ref={listRef} className="space-y-4">
          {services.map((service) => (
            <li key={service.id} className="group">
              <Link
                to={`/services/${service.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between py-3 border-b border-bizbrew-charcoal/30 hover:border-bizbrew-amber/50 transition-colors cursor-pointer"
              >
                <span className="font-display text-2xl md:text-3xl text-bizbrew-offwhite group-hover:text-bizbrew-amber transition-colors">
                  {service.title}
                </span>
                <ArrowUpRight className="w-6 h-6 text-bizbrew-text-secondary group-hover:text-bizbrew-amber transition-colors opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0" />
              </Link>
            </li>
          ))}
        </ul>

        {/* Microcopy */}
        <p
          ref={microcopyRef}
          className="mt-10 font-mono text-sm text-bizbrew-text-secondary"
        >
          Need something else? Let's talk.
        </p>
      </div>

      {/* Small Amber Pill */}
      <div
        ref={accentPillRef}
        className="absolute right-[8vw] bottom-[10vh] w-[10vw] h-[3.5vh] amber-pill"
      />
    </section>
  );
}
