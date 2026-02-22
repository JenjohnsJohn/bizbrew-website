import { useRef, useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { useIsDesktop } from '../hooks/useIsDesktop';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    name: 'TenantHub',
    description: 'SaaS platform for property operations',
  },
  {
    name: 'FieldFlow',
    description: 'Mobile + web workflow system',
  },
  {
    name: 'DataBridge',
    description: 'API integration layer',
  },
];

export default function SelectedWork() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
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
      className="section-pinned bg-bizbrew-charcoal z-[60]"
    >
      {/* Left Headline */}
      <div
        ref={headlineRef}
        className="absolute left-[6vw] top-[14vh] w-[40vw]"
      >
        <h2 className="font-display font-bold text-[clamp(44px,6vw,84px)] leading-[1.05] text-bizbrew-offwhite">
          Selected
          <br />
          <span className="text-bizbrew-amber">Work</span>
        </h2>
      </div>

      {/* Body Copy */}
      <p
        ref={bodyRef}
        className="absolute left-[6vw] top-[38vh] w-[34vw] text-lg text-bizbrew-text-secondary leading-relaxed"
      >
        A few recent builds—designed for clarity, built to last.
      </p>

      {/* Project List */}
      <ul
        ref={listRef}
        className="absolute left-[6vw] top-[50vh] w-[34vw] space-y-4"
      >
        {projects.map((project, index) => (
          <li
            key={index}
            className="group flex items-center justify-between py-3 border-b border-white/10 hover:border-bizbrew-amber/50 transition-colors cursor-pointer"
          >
            <div>
              <span className="font-display text-xl text-bizbrew-offwhite group-hover:text-bizbrew-amber transition-colors">
                {project.name}
              </span>
              <span className="block text-sm text-bizbrew-text-secondary mt-1">
                {project.description}
              </span>
            </div>
            <ExternalLink className="w-5 h-5 text-bizbrew-text-secondary group-hover:text-bizbrew-amber transition-colors opacity-0 group-hover:opacity-100" />
          </li>
        ))}
      </ul>

      {/* CTA */}
      <Link
        to="/case-studies"
        className="absolute left-[6vw] top-[76vh] inline-flex items-center gap-2 text-bizbrew-amber font-medium hover:gap-3 transition-all"
      >
        View case studies
        <ArrowRight className="w-4 h-4" />
      </Link>

      {/* Right Image */}
      <div
        ref={imageRef}
        className="absolute right-[6vw] top-[14vh] w-[46vw] h-[72vh] rounded-frame overflow-hidden"
      >
        <img
          src="/work_machine.jpg"
          alt="Espresso machine"
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
        Selected <span className="text-bizbrew-amber">Work</span>
      </h2>

      {/* Image */}
      <div className="w-full aspect-[4/3] rounded-[24px] overflow-hidden mb-6">
        <img
          src="/work_machine.jpg"
          alt="Espresso machine"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Body Copy */}
      <p className="text-lg text-bizbrew-text-secondary leading-relaxed mb-6">
        A few recent builds—designed for clarity, built to last.
      </p>

      {/* Project List */}
      <ul className="space-y-4 mb-6">
        {projects.map((project, index) => (
          <li
            key={index}
            className="group flex items-center justify-between py-3 border-b border-white/10"
          >
            <div>
              <span className="font-display text-xl text-bizbrew-offwhite">
                {project.name}
              </span>
              <span className="block text-sm text-bizbrew-text-secondary mt-1">
                {project.description}
              </span>
            </div>
            <ExternalLink className="w-5 h-5 text-bizbrew-text-secondary" />
          </li>
        ))}
      </ul>

      {/* CTA */}
      <Link
        to="/case-studies"
        className="inline-flex items-center gap-2 text-bizbrew-amber font-medium hover:gap-3 transition-all"
      >
        View case studies
        <ArrowRight className="w-4 h-4" />
      </Link>
    </section>
  );
}
