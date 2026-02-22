import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { useSmoothScroll } from '../hooks/useSmoothScroll';
import SEO from '../components/SEO';
import { SITE_URL } from '../lib/seo';

import Hero from '../sections/Hero';
import ServicesOverview from '../sections/ServicesOverview';
import CustomSoftware from '../sections/CustomSoftware';
import SaaSProducts from '../sections/SaaSProducts';
import CloudScale from '../sections/CloudScale';
import HowWeWork from '../sections/HowWeWork';
import SelectedWork from '../sections/SelectedWork';
import TechStack from '../sections/TechStack';
import Principles from '../sections/Principles';
import Testimonials from '../sections/Testimonials';
import Contact from '../sections/Contact';

gsap.registerPlugin(ScrollTrigger);

const homeJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'BizBrew',
  url: SITE_URL,
  description: 'Custom software, SaaS products, web and mobile apps. We build solutions that fit your workflows and scale with your business.',
  sameAs: [],
};

export default function HomePage() {
  const location = useLocation();
  useSmoothScroll();

  useEffect(() => {
    if (window.innerWidth < 1024) return;

    const timeout = setTimeout(() => {
      const pinned = ScrollTrigger.getAll()
        .filter((st) => (st.vars as { pin?: boolean }).pin)
        .sort((a, b) => a.start - b.start);

      const maxScroll = ScrollTrigger.maxScroll(window);

      if (!maxScroll || pinned.length === 0) return;

      const pinnedRanges = pinned.map((st) => ({
        start: st.start / maxScroll,
        end: ((st.end ?? st.start) as number) / maxScroll,
        center: (st.start + (((st.end ?? st.start) as number) - st.start) * 0.5) / maxScroll,
      }));

      ScrollTrigger.create({
        snap: {
          snapTo: (value: number) => {
            const inPinned = pinnedRanges.some(
              (r) => value >= r.start - 0.02 && value <= r.end + 0.02
            );
            if (!inPinned) return value;
            const target = pinnedRanges.reduce(
              (closest, r) =>
                Math.abs(r.center - value) < Math.abs(closest - value) ? r.center : closest,
              pinnedRanges[0]?.center ?? 0
            );
            return target;
          },
          duration: { min: 0.15, max: 0.35 },
          delay: 0,
          ease: 'power2.out',
        },
      });
    }, 100);

    return () => clearTimeout(timeout);
  }, []);

  // Scroll to hash when navigating from a link (e.g. /#services)
  useEffect(() => {
    const hash = location.hash?.replace('#', '');
    if (hash) {
      const el = document.getElementById(hash);
      if (el) {
        requestAnimationFrame(() => {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
      }
    }
  }, [location.hash]);

  return (
    <main className="relative">
      <SEO
        title="Custom Software, SaaS & Web Development"
        description="BizBrew builds custom software, SaaS products, web and mobile apps. We create solutions that fit your workflows, scale with your business, and integrate with your stack."
        path="/"
        jsonLd={homeJsonLd}
      />
      <div id="hero">
        <Hero />
      </div>
      <div id="services">
        <ServicesOverview />
      </div>
      <CustomSoftware />
      <SaaSProducts />
      <CloudScale />
      <div id="process">
        <HowWeWork />
      </div>
      <div id="work">
        <SelectedWork />
      </div>
      <TechStack />
      <Principles />
      <Testimonials />
      <div id="contact">
        <Contact />
      </div>
    </main>
  );
}
