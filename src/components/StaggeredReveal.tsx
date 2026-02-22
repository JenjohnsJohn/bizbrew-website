import { useRef, useEffect, type ReactNode } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface StaggeredRevealProps {
  children: ReactNode;
  stagger?: number;
  direction?: 'up' | 'left' | 'right' | 'fade';
  className?: string;
}

export default function StaggeredReveal({
  children,
  stagger = 0.08,
  direction = 'up',
  className = '',
}: StaggeredRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const items = container.children;
    if (items.length === 0) return;

    const fromVars: gsap.TweenVars = { opacity: 0 };
    switch (direction) {
      case 'up':
        fromVars.y = 30;
        break;
      case 'left':
        fromVars.x = -30;
        break;
      case 'right':
        fromVars.x = 30;
        break;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        items,
        fromVars,
        {
          opacity: 1,
          x: 0,
          y: 0,
          duration: 0.6,
          stagger,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: container,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, container);

    return () => ctx.revert();
  }, [stagger, direction]);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}
