import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Mail, MapPin } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const arcRef = useRef<SVGPathElement>(null);
  const accentPillRef = useRef<HTMLDivElement>(null);
  
  const [dialogOpen, setDialogOpen] = useState(false);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Flowing section animations
      gsap.fromTo(
        [headlineRef.current, bodyRef.current, contactRef.current],
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.1,
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        ctaRef.current,
        { scale: 0.98, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: ctaRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        imageRef.current,
        { x: '8vw', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: imageRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      if (arcRef.current) {
        const arcLength = arcRef.current.getTotalLength();
        gsap.set(arcRef.current, {
          strokeDasharray: arcLength,
          strokeDashoffset: arcLength,
        });
        gsap.to(arcRef.current, {
          strokeDashoffset: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 60%',
            toggleActions: 'play none none reverse',
          },
        });
      }

      gsap.fromTo(
        accentPillRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 0.6,
          ease: 'power3.out',
          transformOrigin: 'left center',
          scrollTrigger: {
            trigger: section,
            start: 'top 50%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-flowing bg-bizbrew-charcoal min-h-screen py-24 md:py-32 relative"
    >
      <div className="px-[6vw]">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          {/* Left Content */}
          <div className="w-full lg:w-[50%]">
            {/* Headline */}
            <div ref={headlineRef}>
              <h2 className="font-display font-bold text-[clamp(44px,6vw,84px)] leading-[1.05] text-bizbrew-offwhite mb-6">
                Ready to
                <br />
                <span className="text-bizbrew-amber">build?</span>
              </h2>
            </div>

            {/* Body */}
            <p
              ref={bodyRef}
              className="text-lg text-bizbrew-text-secondary leading-relaxed mb-10 max-w-md"
            >
              Tell us what you're building. We'll respond within two business days.
            </p>

            {/* Contact Info */}
            <div ref={contactRef} className="space-y-4 mb-10">
              <a
                href="mailto:contact@bizbrew.de"
                className="flex items-center gap-3 text-bizbrew-offwhite hover:text-bizbrew-amber transition-colors group"
              >
                <Mail className="w-5 h-5 text-bizbrew-amber" />
                <span className="font-mono text-sm">contact@bizbrew.de</span>
              </a>
              <div className="flex items-center gap-3 text-bizbrew-text-secondary">
                <MapPin className="w-5 h-5 text-bizbrew-amber" />
                <span className="font-mono text-sm">Germany • Remote & on-site</span>
              </div>
            </div>

            {/* CTA */}
            <button
              ref={ctaRef}
              onClick={() => setDialogOpen(true)}
              className="cta-button"
            >
              Start a project
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Right Image */}
          <div className="w-full lg:w-[50%] relative">
            <div
              ref={imageRef}
              className="w-full aspect-[4/5] lg:aspect-auto lg:h-[72vh] rounded-frame overflow-hidden"
            >
              <img
                src="/contact_roaster.jpg"
                alt="Coffee roasting"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Decorative Arc */}
            <svg
              className="absolute left-[-8vw] top-[15%] w-[18vw] h-[56vh] pointer-events-none hidden lg:block"
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
          </div>
        </div>
      </div>

      {/* Small Amber Pill */}
      <div
        ref={accentPillRef}
        className="absolute left-[6vw] bottom-[10vh] w-[10vw] h-[3.5vh] amber-pill hidden lg:block"
      />

      {/* Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="bg-bizbrew-charcoal border-white/10 text-bizbrew-offwhite max-w-md">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl">Start a Project</DialogTitle>
            <DialogDescription className="text-bizbrew-text-secondary">
              Send us an email at{' '}
              <a href="mailto:contact@bizbrew.de" className="text-bizbrew-amber hover:underline">
                contact@bizbrew.de
              </a>{' '}
              with details about your project.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <p className="text-sm text-bizbrew-text-secondary">
              Include:
            </p>
            <ul className="space-y-2 text-sm text-bizbrew-offwhite">
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-bizbrew-amber" />
                Brief project description
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-bizbrew-amber" />
                Timeline expectations
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-bizbrew-amber" />
                Budget range (optional)
              </li>
            </ul>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
