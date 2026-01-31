import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface KineticTextProps {
  children: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  delay?: number;
  stagger?: number;
  triggerOnScroll?: boolean;
}

export default function KineticText({
  children,
  className = '',
  as: Component = 'span',
  delay = 0,
  stagger = 0.03,
  triggerOnScroll = true,
}: KineticTextProps) {
  const containerRef = useRef<HTMLElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const chars = container.querySelectorAll('.kinetic-char');
    if (chars.length === 0) return;

    // Set initial state
    gsap.set(chars, {
      y: 60,
      opacity: 0,
      rotateX: -90,
    });

    const animate = () => {
      if (hasAnimated.current) return;
      hasAnimated.current = true;

      gsap.to(chars, {
        y: 0,
        opacity: 1,
        rotateX: 0,
        duration: 0.8,
        stagger: stagger,
        delay: delay,
        ease: 'power3.out',
      });
    };

    if (triggerOnScroll) {
      ScrollTrigger.create({
        trigger: container,
        start: 'top 80%',
        onEnter: animate,
        once: true,
      });
    } else {
      animate();
    }

    return () => {
      ScrollTrigger.getAll().forEach(st => {
        if (st.vars.trigger === container) st.kill();
      });
    };
  }, [delay, stagger, triggerOnScroll]);

  // Split text into characters
  const characters = children.split('').map((char, index) => (
    <span
      key={index}
      className="kinetic-char inline-block"
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1000px',
      }}
    >
      {char === ' ' ? '\u00A0' : char}
    </span>
  ));

  return (
    <Component
      ref={containerRef as any}
      className={`inline-block ${className}`}
      style={{ perspective: '1000px' }}
    >
      {characters}
    </Component>
  );
}
