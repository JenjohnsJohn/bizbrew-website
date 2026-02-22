/**
 * SSR version of App - uses direct imports instead of lazy() so content
 * renders during prerender. StaticRouter is provided by entry-server.
 */
import { Routes, Route } from 'react-router-dom';

import CustomCursor from './components/CustomCursor';
import Navigation from './components/Navigation';
import Footer from './components/Footer';

import HomePage from './pages/HomePage';
import ServiceDetail from './pages/ServiceDetail';
import AboutPage from './pages/AboutPage';
import CaseStudiesPage from './pages/CaseStudiesPage';
import CaseStudyDetail from './pages/CaseStudyDetail';
import FAQPage from './pages/FAQPage';
import BlogPage from './pages/BlogPage';
import BlogPost from './pages/BlogPost';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';

function SSRLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      <CustomCursor />
      <div className="grain-overlay" />
      <Navigation />
      {children}
      <Footer />
    </div>
  );
}

export function AppRoutesSSR() {
  return (
    <SSRLayout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/services/:slug" element={<ServiceDetail />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/case-studies" element={<CaseStudiesPage />} />
        <Route path="/case-studies/:slug" element={<CaseStudyDetail />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsOfService />} />
      </Routes>
    </SSRLayout>
  );
}
