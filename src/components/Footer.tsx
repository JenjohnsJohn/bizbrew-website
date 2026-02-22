import { Link } from 'react-router-dom';

const footerLinks = [
  { label: 'Services', href: '/#services' },
  { label: 'Work', href: '/case-studies' },
  { label: 'About', href: '/about' },
  { label: 'Blog', href: '/blog' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contact', href: '/#contact' },
];

const legalLinks = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms of Service', href: '/terms' },
];

export default function Footer() {
  return (
    <footer className="bg-bizbrew-charcoal border-t border-white/10">
      <div className="px-[6vw] py-12">
        <div className="flex flex-col md:flex-row justify-between gap-8 mb-10">
          {/* Brand */}
          <div>
            <Link to="/" className="font-display font-bold text-xl text-bizbrew-offwhite">
              BizBrew
            </Link>
            <p className="font-mono text-sm text-bizbrew-text-secondary mt-2 max-w-xs">
              Custom software, SaaS products, and web applications built to last.
            </p>
          </div>

          {/* Navigation */}
          <div className="flex gap-12">
            <div>
              <p className="font-mono text-xs text-bizbrew-amber uppercase tracking-wider mb-3">
                Navigate
              </p>
              <ul className="space-y-2">
                {footerLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="font-mono text-sm text-bizbrew-text-secondary hover:text-bizbrew-offwhite transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-mono text-xs text-bizbrew-amber uppercase tracking-wider mb-3">
                Legal
              </p>
              <ul className="space-y-2">
                {legalLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="font-mono text-sm text-bizbrew-text-secondary hover:text-bizbrew-offwhite transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-white/10">
          <p className="font-display font-bold text-xl text-bizbrew-offwhite">
            BizBrew
          </p>
          <p className="font-mono text-sm text-bizbrew-text-secondary">
            &copy; 2026 BizBrew. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
