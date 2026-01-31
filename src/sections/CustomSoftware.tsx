import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function CustomSoftware() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const arcRef = useRef<SVGPathElement>(null);
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

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-pinned bg-bizbrew-charcoal z-30"
    >
      {/* Left Headline */}
      <div
        ref={headlineRef}
        className="absolute left-[6vw] top-[14vh] w-[44vw]"
      >
        <h2 className="font-display font-bold text-[clamp(44px,6vw,84px)] leading-[1.05] text-bizbrew-offwhite">
          <span className="headline-line block">Custom</span>
          <span className="headline-line block text-bizbrew-amber">Software</span>
        </h2>
      </div>

      {/* Body Copy */}
      <div
        ref={bodyRef}
        className="absolute left-[6vw] top-[52vh] w-[34vw]"
      >
        <p className="text-lg text-bizbrew-text-secondary leading-relaxed mb-6">
          Web apps, internal tools, and API platforms—designed for your workflows, built to last.
        </p>
        <a
          href="#work"
          className="inline-flex items-center gap-2 text-bizbrew-amber font-medium hover:gap-3 transition-all"
        >
          See examples
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>

      {/* Right Image */}
      <div
        ref={imageRef}
        className="absolute right-[6vw] top-[14vh] w-[46vw] h-[72vh] rounded-frame overflow-hidden"
      >
        <img
          src="/custom_rosetta.jpg"
          alt="Latte art"
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
  );
}
