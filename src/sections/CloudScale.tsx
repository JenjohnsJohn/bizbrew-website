import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import { useIsDesktop } from '../hooks/useIsDesktop';

gsap.registerPlugin(ScrollTrigger);

export default function CloudScale() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const arcRef = useRef<SVGPathElement>(null);
  const accentPillRef = useRef<HTMLDivElement>(null);
  const isDesktop = useIsDesktop();

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      if (isDesktop) {
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
        const headlineLines = headlineRef.current?.querySelectorAll('.headline-line');
        if (headlineLines) {
          scrollTl.fromTo(
            headlineLines,
            { x: '-50vw', opacity: 0 },
            { x: 0, opacity: 1, ease: 'none', stagger: 0.04 },
            0
          );
        }

        scrollTl.fromTo(
          bodyRef.current,
          { y: '8vh', opacity: 0 },
          { y: 0, opacity: 1, ease: 'none' },
          0.1
        );

        scrollTl.fromTo(
          imageRef.current,
          { x: '60vw', opacity: 0 },
          { x: 0, opacity: 1, ease: 'none' },
          0.05
        );

        if (arcRef.current) {
          const arcLength = arcRef.current.getTotalLength();
          gsap.set(arcRef.current, {
            strokeDasharray: arcLength,
            strokeDashoffset: arcLength,
          });
          scrollTl.to(
            arcRef.current,
            { strokeDashoffset: 0, opacity: 1, ease: 'none' },
            0.1
          );
        }

        scrollTl.fromTo(
          accentPillRef.current,
          { scaleX: 0 },
          { scaleX: 1, ease: 'none', transformOrigin: 'left center' },
          0.15
        );

        // SETTLE (30% - 70%) - static

        // EXIT (70% - 100%)
        if (headlineLines) {
          scrollTl.fromTo(
            headlineLines,
            { x: 0, opacity: 1 },
            { x: '-10vw', opacity: 0, ease: 'power2.in', stagger: 0.02 },
            0.7
          );
        }

        scrollTl.fromTo(
          bodyRef.current,
          { opacity: 1 },
          { opacity: 0, ease: 'power2.in' },
          0.72
        );

        scrollTl.fromTo(
          imageRef.current,
          { x: 0, opacity: 1 },
          { x: '10vw', opacity: 0, ease: 'power2.in' },
          0.7
        );

        if (arcRef.current) {
          scrollTl.fromTo(
            arcRef.current,
            { x: 0, opacity: 1 },
            { x: '6vw', opacity: 0, ease: 'power2.in' },
            0.72
          );
        }

        scrollTl.fromTo(
          accentPillRef.current,
          { opacity: 1 },
          { opacity: 0, ease: 'power2.in' },
          0.8
        );
      } else {
        // Simple mobile fade-up
        gsap.fromTo(
          section,
          { y: 30, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
            scrollTrigger: { trigger: section, start: 'top 80%', toggleActions: 'play none none reverse' }
          }
        );
      }
    }, section);

    return () => ctx.revert();
  }, [isDesktop]);

  return isDesktop ? (
    <section
      ref={sectionRef}
      className="section-pinned bg-bizbrew-charcoal z-50"
    >
      {/* Left Headline */}
      <div
        ref={headlineRef}
        className="absolute left-[6vw] top-[14vh] w-[44vw]"
      >
        <h2 className="font-display font-bold text-[clamp(44px,6vw,84px)] leading-[1.05] text-bizbrew-offwhite">
          <span className="headline-line block">Cloud</span>
          <span className="headline-line block text-bizbrew-amber">& Scale</span>
        </h2>
      </div>

      {/* Body Copy */}
      <div
        ref={bodyRef}
        className="absolute left-[6vw] top-[52vh] w-[34vw]"
      >
        <p className="text-lg text-bizbrew-text-secondary leading-relaxed mb-6">
          Serverless backends, secure APIs, and modern infrastructure—fast, reliable, and easy to operate.
        </p>
        <a
          href="#principles"
          className="inline-flex items-center gap-2 text-bizbrew-amber font-medium hover:gap-3 transition-all"
        >
          Review our architecture principles
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>

      {/* Right Image */}
      <div
        ref={imageRef}
        className="absolute right-[6vw] top-[14vh] w-[46vw] h-[72vh] rounded-frame overflow-hidden"
      >
        <img
          src="/cloud_glass.jpg"
          alt="Glass coffee carafe"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Decorative Arc */}
      <svg
        className="absolute left-[46vw] top-[22vh] w-[18vw] h-[56vh] pointer-events-none"
        viewBox="0 0 200 400"
        fill="none"
      >
        <path
          ref={arcRef}
          d="M 10 0 Q 180 100 180 200 Q 180 300 10 400"
          stroke="#D99A4D"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          opacity="0"
        />
      </svg>

      {/* Small Amber Pill */}
      <div
        ref={accentPillRef}
        className="absolute left-[6vw] bottom-[10vh] w-[10vw] h-[3.5vh] amber-pill"
      />
    </section>
  ) : (
    <section
      ref={sectionRef}
      className="section-flowing bg-bizbrew-charcoal px-6 py-16"
    >
      {/* Headline */}
      <h2 className="font-display font-bold text-[clamp(36px,8vw,56px)] leading-[1.05] text-bizbrew-offwhite mb-6">
        Cloud <span className="text-bizbrew-amber">& Scale</span>
      </h2>

      {/* Image */}
      <div className="w-full aspect-[4/3] rounded-[24px] overflow-hidden mb-6">
        <img
          src="/cloud_glass.jpg"
          alt="Glass coffee carafe"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Body Copy + CTA */}
      <p className="text-lg text-bizbrew-text-secondary leading-relaxed mb-6">
        Serverless backends, secure APIs, and modern infrastructure—fast, reliable, and easy to operate.
      </p>
      <a
        href="#principles"
        className="inline-flex items-center gap-2 text-bizbrew-amber font-medium hover:gap-3 transition-all"
      >
        Review our architecture principles
        <ArrowRight className="w-4 h-4" />
      </a>
    </section>
  );
}
