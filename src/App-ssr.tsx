/**
 * SSR version of App - uses direct imports instead of lazy() so content
 * renders during prerender. StaticRouter is provided by entry-server.
 */
import { Routes, Route } from 'react-router-dom';

import CustomCursor from './components/CustomCursor';
import Navigation from './components/Navigation';

import HomePage from './pages/HomePage';
import ServiceDetail from './pages/ServiceDetail';

export function AppRoutesSSR() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="relative">
            <CustomCursor />
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
  );
}
