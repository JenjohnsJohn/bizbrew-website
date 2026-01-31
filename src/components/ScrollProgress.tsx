import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ScrollProgress() {
  const progressRef = useRef<HTMLDivElement>(null);
  const { pathname } = useLocation();
  const isServiceDetail = pathname.startsWith('/services/');

  useEffect(() => {
    if (isServiceDetail) return;
    const progress = progressRef.current;
    if (!progress) return;

    gsap.to(progress, {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.3,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach(st => {
        if (st.vars.trigger === document.body) st.kill();
      });
    };
  }, [isServiceDetail]);

  if (isServiceDetail) return null;

  return (
    <div className="fixed top-0 left-0 right-0 h-1 bg-white/5 z-[100]">
      <div
        ref={progressRef}
        className="h-full bg-bizbrew-amber origin-left"
        style={{ transform: 'scaleX(0)' }}
      />
    </div>
  );
}
