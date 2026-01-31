import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ImageRevealProps {
  src: string;
  alt: string;
  className?: string;
  direction?: 'left' | 'right' | 'up' | 'down';
  delay?: number;
  triggerOnScroll?: boolean;
}

export default function ImageReveal({
  src,
  alt,
  className = '',
  direction = 'left',
  delay = 0,
  triggerOnScroll = true,
}: ImageRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const maskRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const image = imageRef.current;
    const mask = maskRef.current;
    if (!container || !image || !mask) return;

    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set(image, { scale: 1.3 });
      
      const maskTransforms: Record<string, { from: string; to: string }> = {
        left: { from: 'scaleX(1)', to: 'scaleX(0)' },
        right: { from: 'scaleX(1)', to: 'scaleX(0)' },
        up: { from: 'scaleY(1)', to: 'scaleY(0)' },
        down: { from: 'scaleY(1)', to: 'scaleY(0)' },
      };

      const transform = maskTransforms[direction];
      gsap.set(mask, { 
        transform: transform.from,
        transformOrigin: direction === 'left' ? 'right center' : 
                        direction === 'right' ? 'left center' :
                        direction === 'up' ? 'center bottom' : 'center top'
      });

      const scrollTl = gsap.timeline(
        triggerOnScroll ? {
          scrollTrigger: {
            trigger: container,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        } : {}
      );

      // Reveal mask
      scrollTl.to(mask, {
        transform: transform.to,
        duration: 1.2,
        delay: delay,
        ease: 'power3.inOut',
      });

      // Scale down image
      scrollTl.to(image, {
        scale: 1,
        duration: 1.4,
        delay: delay,
        ease: 'power3.out',
      }, 0);

    }, container);

    return () => ctx.revert();
  }, [direction, delay, triggerOnScroll]);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
    >
      <img
        ref={imageRef}
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
      />
      <div
        ref={maskRef}
        className="absolute inset-0 bg-bizbrew-charcoal"
      />
    </div>
  );
}
