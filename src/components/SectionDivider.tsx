import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SectionDividerProps {
  className?: string;
  color?: string;
}

export default function SectionDivider({
  className = '',
  color = '#D99A4D',
}: SectionDividerProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    const path = pathRef.current;
    if (!svg || !path) return;

    const isDesktop = window.innerWidth >= 1024;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!isDesktop || prefersReducedMotion) {
      path.style.strokeDasharray = 'none';
      path.style.strokeDashoffset = '0';
      return;
    }

    const length = path.getTotalLength();
    path.style.strokeDasharray = `${length}`;
    path.style.strokeDashoffset = `${length}`;

    const ctx = gsap.context(() => {
      gsap.to(path, {
        strokeDashoffset: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: svg,
          start: 'top 80%',
          end: 'bottom 20%',
          scrub: true,
        },
      });
    }, svg);

    return () => ctx.revert();
  }, []);

  return (
    <div className={`hidden lg:block w-full py-4 ${className}`}>
      <svg
        ref={svgRef}
        viewBox="0 0 1200 40"
        fill="none"
        className="w-full h-10"
        preserveAspectRatio="none"
      >
        <path
          ref={pathRef}
          d="M0 20 Q300 5 600 20 T1200 20"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
          opacity="0.4"
        />
      </svg>
    </div>
  );
}
