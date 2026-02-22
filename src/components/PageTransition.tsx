import { useRef, useEffect, type ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { gsap } from 'gsap';

interface PageTransitionProps {
  children: ReactNode;
}

export default function PageTransition({ children }: PageTransitionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const isFirstRender = useRef(true);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (isFirstRender.current) {
      isFirstRender.current = false;
      if (!prefersReducedMotion) {
        gsap.fromTo(el, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' });
      }
      return;
    }

    if (prefersReducedMotion) {
      window.scrollTo(0, 0);
      return;
    }

    gsap.fromTo(
      el,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out', delay: 0.1 }
    );

    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div ref={containerRef}>
      {children}
    </div>
  );
}
