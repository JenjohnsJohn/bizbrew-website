import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import KineticText from '../components/KineticText';
import MagneticButton from '../components/MagneticButton';
import ImageReveal from '../components/ImageReveal';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const subheadlineRef = useRef<HTMLParagraphElement>(null);
  const microcopyRef = useRef<HTMLParagraphElement>(null);
  const arcRef = useRef<SVGPathElement>(null);
  const accentPillRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Load animation timeline (auto-play on mount)
      const loadTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Image frame entrance
      loadTl.fromTo(
        imageRef.current,
        { x: '12vw', scale: 0.96, opacity: 0 },
        { x: 0, scale: 1, opacity: 1, duration: 0.9 },
        0.2
      );

      // Arc draw
      if (arcRef.current) {
        const arcLength = arcRef.current.getTotalLength();
        gsap.set(arcRef.current, {
          strokeDasharray: arcLength,
          strokeDashoffset: arcLength,
        });
        loadTl.to(
          arcRef.current,
          { strokeDashoffset: 0, duration: 0.8 },
          0.4
        );
      }

      // Subheadline + CTA + microcopy
      loadTl.fromTo(
        subheadlineRef.current,
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 },
        0.8
      );

      loadTl.fromTo(
        microcopyRef.current,
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 },
        1.0
      );

      // Small amber pill
      loadTl.fromTo(
        accentPillRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 0.4, transformOrigin: 'left center' },
        1.0
      );

      // Scroll-driven exit animation (pinned)
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
          onLeaveBack: () => {
            // Reset all hero elements when scrolling back to top
            gsap.set([imageRef.current, subheadlineRef.current, microcopyRef.current], {
              opacity: 1, x: 0, y: 0, scale: 1
            });
            if (arcRef.current) {
              gsap.set(arcRef.current, { opacity: 1, x: 0 });
            }
          }
        },
      });

      // EXIT phase (70% - 100%)
      scrollTl.fromTo(
        imageRef.current,
        { x: 0, scale: 1, opacity: 1 },
        { x: '10vw', scale: 0.98, opacity: 0, ease: 'power2.in' },
        0.7
      );

      if (arcRef.current) {
        scrollTl.fromTo(
          arcRef.current,
          { x: 0, opacity: 1 },
          { x: '6vw', opacity: 0, ease: 'power2.in' },
          0.7
        );
      }

      scrollTl.fromTo(
        [subheadlineRef.current, microcopyRef.current],
        { y: 0, opacity: 1 },
        { y: '6vh', opacity: 0, ease: 'power2.in', stagger: 0.02 },
        0.75
      );

      scrollTl.fromTo(
        accentPillRef.current,
        { opacity: 1 },
        { opacity: 0, ease: 'power2.in' },
        0.85
      );

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-pinned bg-bizbrew-charcoal z-10"
    >
      {/* Hero Image (Right - Pill Frame) */}
      <div
        ref={imageRef}
        className="absolute right-[-6vw] top-[10vh] w-[56vw] h-[80vh] rounded-pill overflow-hidden"
      >
        <ImageReveal
          src="/hero_barista.jpg"
          alt="Coffee brewing"
          className="w-full h-full"
          direction="right"
          triggerOnScroll={false}
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
        />
      </svg>

      {/* Headline (Left) with Kinetic Text */}
      <div className="absolute left-[8vw] top-[18vh] w-[44vw]">
        <h1 className="font-display font-bold text-[clamp(44px,6vw,84px)] leading-[1.05] text-bizbrew-offwhite">
          <KineticText delay={0.5} stagger={0.04} triggerOnScroll={false}>
            Brewed
          </KineticText>
          <br />
          <KineticText delay={0.7} stagger={0.04} triggerOnScroll={false}>
            for
          </KineticText>{' '}
          <span className="text-bizbrew-amber">
            <KineticText delay={0.8} stagger={0.04} triggerOnScroll={false}>
              Business
            </KineticText>
          </span>
        </h1>
      </div>

      {/* Subheadline */}
      <p
        ref={subheadlineRef}
        className="absolute left-[8vw] top-[52vh] w-[34vw] text-lg md:text-xl text-bizbrew-text-secondary leading-relaxed"
      >
        Scalable SaaS, custom apps, and cloud-native systems—built with care.
      </p>

      {/* CTA Button with Magnetic Effect */}
      <div className="absolute left-[8vw] top-[66vh]">
        <MagneticButton
          className="cta-button"
          strength={0.3}
        >
          Explore services
          <ArrowRight className="w-4 h-4" />
        </MagneticButton>
      </div>

      {/* Microcopy */}
      <p
        ref={microcopyRef}
        className="absolute left-[8vw] top-[76vh] font-mono text-sm text-bizbrew-text-secondary"
      >
        Architecture-first • Security-by-design
      </p>

      {/* Small Amber Pill */}
      <div
        ref={accentPillRef}
        className="absolute left-[6vw] bottom-[10vh] w-[10vw] h-[3.5vh] amber-pill"
      />
    </section>
  );
}
