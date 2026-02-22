import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';

const HomePage = lazy(() => import('./pages/HomePage'));
const ServiceDetail = lazy(() => import('./pages/ServiceDetail'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const CaseStudiesPage = lazy(() => import('./pages/CaseStudiesPage'));
const CaseStudyDetail = lazy(() => import('./pages/CaseStudyDetail'));
const FAQPage = lazy(() => import('./pages/FAQPage'));
const BlogPage = lazy(() => import('./pages/BlogPage'));
const BlogPost = lazy(() => import('./pages/BlogPost'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const TermsOfService = lazy(() => import('./pages/TermsOfService'));

function LoadingSkeleton() {
  return (
    <div className="min-h-screen bg-bizbrew-charcoal flex items-center justify-center">
      <div className="space-y-4 w-full max-w-md px-6">
        <div className="h-8 bg-white/5 rounded-lg animate-pulse" />
        <div className="h-4 bg-white/5 rounded-lg animate-pulse w-3/4" />
        <div className="h-4 bg-white/5 rounded-lg animate-pulse w-1/2" />
        <div className="h-32 bg-white/5 rounded-[22px] animate-pulse mt-8" />
      </div>
    </div>
  );
}

export function AppRoutes() {
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <Layout>
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
      </Layout>
    </Suspense>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
