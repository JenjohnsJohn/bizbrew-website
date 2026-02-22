import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface AnimatedCounterProps {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

export default function AnimatedCounter({
  end,
  duration = 2,
  prefix = '',
  suffix = '',
  className = '',
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const countRef = useRef({ value: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      el.textContent = `${prefix}${end}${suffix}`;
      return;
    }

    countRef.current.value = 0;
    el.textContent = `${prefix}0${suffix}`;

    const tween = gsap.to(countRef.current, {
      value: end,
      duration,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
      onUpdate: () => {
        const v = countRef.current.value;
        const display = Number.isInteger(end) ? Math.round(v) : v.toFixed(1);
        el.textContent = `${prefix}${display}${suffix}`;
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [end, duration, prefix, suffix]);

  return (
    <span ref={ref} className={className}>
      {prefix}0{suffix}
    </span>
  );
}
