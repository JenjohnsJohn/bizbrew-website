import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const categories = [
  {
    name: 'Frontend',
    tools: 'Next.js, React, Flutter',
  },
  {
    name: 'Backend',
    tools: 'Node.js, Cloudflare Workers',
  },
  {
    name: 'Data',
    tools: 'PostgreSQL, MongoDB',
  },
  {
    name: 'Infra',
    tools: 'Cloudflare, Docker, CI/CD',
  },
  {
    name: 'Auth',
    tools: 'JWT, OAuth, RBAC',
  },
];

export default function TechStack() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const categoriesRef = useRef<HTMLUListElement>(null);
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

      // ENTRANCE (0% - 30%) - Image from left, text from right
      scrollTl.fromTo(
        imageRef.current,
        { x: '-60vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0
      );

      scrollTl.fromTo(
        headlineRef.current,
        { x: '50vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0.05
      );

      scrollTl.fromTo(
        bodyRef.current,
        { y: '6vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.1
      );

      const categoryItems = categoriesRef.current?.querySelectorAll('li');
      if (categoryItems) {
        scrollTl.fromTo(
          categoryItems,
          { y: '8vh', opacity: 0 },
          { y: 0, opacity: 1, ease: 'none', stagger: 0.02 },
          0.12
        );
      }

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
        { scaleX: 1, ease: 'none', transformOrigin: 'right center' },
        0.15
      );

      // SETTLE (30% - 70%) - static

      // EXIT (70% - 100%)
      scrollTl.fromTo(
        imageRef.current,
        { x: 0, opacity: 1 },
        { x: '-10vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        [headlineRef.current, bodyRef.current, categoriesRef.current],
        { opacity: 1 },
        { opacity: 0, ease: 'power2.in', stagger: 0.02 },
        0.72
      );

      if (arcRef.current) {
        scrollTl.fromTo(
          arcRef.current,
          { x: 0, opacity: 1 },
          { x: '-6vw', opacity: 0, ease: 'power2.in' },
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
      className="section-pinned bg-bizbrew-charcoal z-[70]"
    >
      {/* Left Image */}
      <div
        ref={imageRef}
        className="absolute left-[6vw] top-[14vh] w-[46vw] h-[72vh] rounded-frame overflow-hidden"
      >
        <img
          src="/stack_tools.jpg"
          alt="Barista tools"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Decorative Arc - Right side of image */}
      <svg
        className="absolute left-[40vw] top-[22vh] w-[18vw] h-[56vh] pointer-events-none"
        viewBox="0 0 200 400"
        fill="none"
      >
        <path
          ref={arcRef}
          d="M 190 0 Q 20 100 20 200 Q 20 300 190 400"
          stroke="#D99A4D"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          opacity="0"
        />
      </svg>

      {/* Right Content */}
      <div
        ref={headlineRef}
        className="absolute left-[56vw] top-[14vh] w-[38vw]"
      >
        <h2 className="font-display font-bold text-[clamp(44px,6vw,84px)] leading-[1.05] text-bizbrew-offwhite">
          Tech
          <br />
          <span className="text-bizbrew-amber">Stack</span>
        </h2>
      </div>

      {/* Body Copy */}
      <p
        ref={bodyRef}
        className="absolute left-[56vw] top-[38vh] w-[34vw] text-lg text-bizbrew-text-secondary leading-relaxed"
      >
        Proven, modern tools—chosen for the problem, not the hype.
      </p>

      {/* Categories List */}
      <ul
        ref={categoriesRef}
        className="absolute left-[56vw] top-[52vh] w-[34vw] space-y-3"
      >
        {categories.map((category, index) => (
          <li
            key={index}
            className="flex items-baseline gap-4 py-2"
          >
            <span className="font-mono text-sm text-bizbrew-amber w-24 shrink-0">
              {category.name}
            </span>
            <span className="text-bizbrew-offwhite">
              {category.tools}
            </span>
          </li>
        ))}
      </ul>

      {/* Small Amber Pill */}
      <div
        ref={accentPillRef}
        className="absolute right-[6vw] bottom-[10vh] w-[10vw] h-[3.5vh] amber-pill"
      />
    </section>
  );
}
