import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const principles = [
  'Clean, maintainable code',
  'Scalable system design',
  'Transparent communication',
  'Long-term support mindset',
];

export default function Principles() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
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
      scrollTl.fromTo(
        headlineRef.current,
        { x: '-50vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0
      );

      scrollTl.fromTo(
        bodyRef.current,
        { y: '6vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.08
      );

      const listItems = listRef.current?.querySelectorAll('li');
      if (listItems) {
        scrollTl.fromTo(
          listItems,
          { y: '8vh', opacity: 0 },
          { y: 0, opacity: 1, ease: 'none', stagger: 0.02 },
          0.1
        );
      }

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
      scrollTl.fromTo(
        headlineRef.current,
        { x: 0, opacity: 1 },
        { x: '-10vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        [bodyRef.current, listRef.current],
        { opacity: 1 },
        { opacity: 0, ease: 'power2.in', stagger: 0.02 },
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
      className="section-pinned bg-bizbrew-charcoal z-[80]"
    >
      {/* Left Headline */}
      <div
        ref={headlineRef}
        className="absolute left-[6vw] top-[14vh] w-[40vw]"
      >
        <h2 className="font-display font-bold text-[clamp(44px,6vw,84px)] leading-[1.05] text-bizbrew-offwhite">
          Our
          <br />
          <span className="text-bizbrew-amber">Principles</span>
        </h2>
      </div>

      {/* Body Copy */}
      <p
        ref={bodyRef}
        className="absolute left-[6vw] top-[38vh] w-[34vw] text-lg text-bizbrew-text-secondary leading-relaxed"
      >
        We don't just ship features—we help you build a reliable software business.
      </p>

      {/* Principles List */}
      <ul
        ref={listRef}
        className="absolute left-[6vw] top-[52vh] w-[34vw] space-y-4"
      >
        {principles.map((principle, index) => (
          <li
            key={index}
            className="flex items-center gap-4"
          >
            <div className="w-6 h-6 rounded-full bg-bizbrew-amber/20 flex items-center justify-center shrink-0">
              <Check className="w-4 h-4 text-bizbrew-amber" />
            </div>
            <span className="text-bizbrew-offwhite text-lg">
              {principle}
            </span>
          </li>
        ))}
      </ul>

      {/* Right Image */}
      <div
        ref={imageRef}
        className="absolute right-[6vw] top-[14vh] w-[46vw] h-[72vh] rounded-frame overflow-hidden"
      >
        <img
          src="/principles_cup.jpg"
          alt="Coffee cup"
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
