import { type ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import CustomCursor from './CustomCursor';
import ScrollProgress from './ScrollProgress';
import Navigation from './Navigation';
import Footer from './Footer';
import PageTransition from './PageTransition';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <div className="relative">
      <CustomCursor />
      {isHome && <ScrollProgress />}
      <div className="grain-overlay" />
      <Navigation />
      <PageTransition>
        {children}
      </PageTransition>
      <Footer />
    </div>
  );
}
