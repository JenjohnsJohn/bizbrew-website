import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Menu, X } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const navLinks = [
  { label: 'Services', href: '/#services' },
  { label: 'Work', href: '/#work' },
  { label: 'Process', href: '/#process' },
  { label: 'Contact', href: '/#contact' },
];

export default function Navigation() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!isHome) {
      setIsVisible(true);
      return;
    }
    // Show navigation after scrolling past hero (home page only)
    const st = ScrollTrigger.create({
      trigger: document.body,
      start: '100vh top',
      onEnter: () => setIsVisible(true),
      onLeaveBack: () => setIsVisible(false),
    });
    return () => st.kill();
  }, [isHome]);

  const handleNavClick = () => setIsMobileMenuOpen(false);

  return (
    <>
      {/* Desktop Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
          isVisible
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 -translate-y-full pointer-events-none'
        }`}
      >
        <div className="bg-bizbrew-charcoal/90 backdrop-blur-md border-b border-white/5">
          <div className="px-[6vw] py-4 flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="font-display font-bold text-xl text-bizbrew-offwhite">
              BizBrew
            </Link>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  onClick={handleNavClick}
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
          className={`md:hidden bg-bizbrew-charcoal/95 backdrop-blur-md border-b border-white/5 transition-all duration-300 ${
            isMobileMenuOpen
              ? 'opacity-100 max-h-64'
              : 'opacity-0 max-h-0 overflow-hidden'
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

      {/* Static Logo (visible on hero) */}
      <div
        className={`fixed top-6 left-[6vw] z-[90] transition-opacity duration-500 ${
          isVisible ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        <Link to="/" className="font-display font-bold text-xl text-bizbrew-offwhite">
          BizBrew
        </Link>
      </div>

      {/* Static Nav Links (visible on hero) */}
      <div
        className={`fixed top-6 right-[6vw] z-[90] hidden md:flex items-center gap-8 transition-opacity duration-500 ${
          isVisible ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        {navLinks.map((link) => (
          <Link
            key={link.label}
            to={link.href}
            onClick={handleNavClick}
            className="nav-link"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </>
  );
}
