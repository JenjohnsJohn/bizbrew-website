import { useState, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Services', href: '/#services' },
  { label: 'Work', href: '/case-studies' },
  { label: 'Projects', href: '/projects' },
  { label: 'About', href: '/about' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/#contact' },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 50);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const closeMenu = useCallback(() => setIsMobileMenuOpen(false), []);

  // Close mobile menu on any navigation by listening to popstate
  useEffect(() => {
    window.addEventListener('popstate', closeMenu);
    return () => window.removeEventListener('popstate', closeMenu);
  }, [closeMenu]);

  const handleNavClick = () => setIsMobileMenuOpen(false);

  // Derive a key from location to reset menu state when route changes
  const locationKey = location.pathname + location.hash;

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] transition-colors duration-300">
      <div
        className={`${
          scrolled
            ? 'bg-bizbrew-charcoal/95 backdrop-blur-md border-b border-white/5'
            : 'bg-transparent'
        } transition-all duration-300`}
      >
        <div className="px-[6vw] py-4 flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="font-display font-bold text-xl text-bizbrew-offwhite"
            onClick={handleNavClick}
          >
            BizBrew
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className="nav-link"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-bizbrew-offwhite"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        key={locationKey}
        className={`md:hidden bg-bizbrew-charcoal/95 backdrop-blur-md border-b border-white/5 transition-all duration-300 overflow-hidden ${
          isMobileMenuOpen ? 'opacity-100 max-h-64' : 'opacity-0 max-h-0'
        }`}
      >
        <div className="px-[6vw] py-4 space-y-4">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.href}
              onClick={handleNavClick}
              className="block text-bizbrew-offwhite hover:text-bizbrew-amber transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
