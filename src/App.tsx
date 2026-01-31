import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import CustomCursor from './components/CustomCursor';
import ScrollProgress from './components/ScrollProgress';
import Navigation from './components/Navigation';

const HomePage = lazy(() => import('./pages/HomePage'));
const ServiceDetail = lazy(() => import('./pages/ServiceDetail'));

export function AppRoutes() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-bizbrew-charcoal" />}>
      <Routes>
        <Route
          path="/"
          element={
            <div className="relative">
              <CustomCursor />
              <ScrollProgress />
              <div className="grain-overlay" />
              <Navigation />
              <HomePage />
            </div>
          }
        />
        <Route
          path="/services/:slug"
          element={
            <div className="relative">
              <CustomCursor />
              <div className="grain-overlay" />
              <Navigation />
              <ServiceDetail />
            </div>
          }
        />
      </Routes>
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
