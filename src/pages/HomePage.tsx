import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import SEO from '../components/SEO';
import { SITE_URL } from '../lib/seo';

import HeroSection from '../sections/HeroSection';
import ServicesSection from '../sections/ServicesSection';
import ProcessSection from '../sections/ProcessSection';
import WorkSection from '../sections/WorkSection';
import TestimonialsSection from '../sections/TestimonialsSection';
import StatsSection from '../sections/StatsSection';
import ContactSection from '../sections/ContactSection';

const homeJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'BizBrew',
  url: SITE_URL,
  description:
    'Custom software, SaaS products, web and mobile apps. We build solutions that fit your workflows and scale with your business.',
  sameAs: [],
};

export default function HomePage() {
  const location = useLocation();

  // Scroll to hash when navigating from a link (e.g. /#services)
  useEffect(() => {
    const hash = location.hash?.replace('#', '');
    if (hash) {
      // Small delay to let the page render
      const timeout = setTimeout(() => {
        const el = document.getElementById(hash);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
      return () => clearTimeout(timeout);
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
        <HeroSection />
      </div>
      <div id="services" className="scroll-mt-20">
        <ServicesSection />
      </div>
      <div id="process" className="scroll-mt-20">
        <ProcessSection />
      </div>
      <div id="work" className="scroll-mt-20">
        <WorkSection />
      </div>
      <TestimonialsSection />
      <StatsSection />
      <div id="contact" className="scroll-mt-20">
        <ContactSection />
      </div>
    </main>
  );
}
