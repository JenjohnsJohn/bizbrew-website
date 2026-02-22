import { useLayoutEffect } from 'react';
import SEO from '@/components/SEO';

export default function PrivacyPolicy() {
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-bizbrew-charcoal">
      <SEO
        title="Privacy Policy"
        description="BizBrew privacy policy. How we collect, use, and protect your personal information."
        path="/privacy"
      />

      <div className="pt-28 md:pt-36 pb-24 px-[6vw]">
        <h1 className="font-display font-bold text-[clamp(36px,5vw,56px)] leading-[1.1] text-bizbrew-offwhite mb-4">
          Privacy Policy
        </h1>
        <p className="font-mono text-sm text-bizbrew-text-secondary mb-12">
          Last updated: February 2026
        </p>

        <div className="max-w-3xl space-y-10">
          <section>
            <h2 className="font-display font-bold text-xl text-bizbrew-offwhite mb-4">
              1. Introduction
            </h2>
            <p className="text-bizbrew-text-secondary leading-relaxed mb-4">
              BizBrew (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) respects your privacy and is committed to protecting your personal data. This privacy policy explains how we collect, use, and safeguard information when you visit our website or engage with our services.
            </p>
            <p className="text-bizbrew-text-secondary leading-relaxed">
              We are based in Germany and comply with the General Data Protection Regulation (GDPR) and applicable German data protection laws.
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-xl text-bizbrew-offwhite mb-4">
              2. Information We Collect
            </h2>
            <p className="text-bizbrew-text-secondary leading-relaxed mb-4">
              We collect information that you voluntarily provide to us when you contact us via email, fill out forms, or engage our services. This may include:
            </p>
            <ul className="space-y-2 text-bizbrew-text-secondary">
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-bizbrew-amber flex-shrink-0 mt-2" />
                <span>Contact information (name, email address, phone number)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-bizbrew-amber flex-shrink-0 mt-2" />
                <span>Company information (company name, role, industry)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-bizbrew-amber flex-shrink-0 mt-2" />
                <span>Project details and requirements you share with us</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-bizbrew-amber flex-shrink-0 mt-2" />
                <span>Technical information automatically collected by our hosting provider (IP address, browser type, device information, pages visited)</span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-display font-bold text-xl text-bizbrew-offwhite mb-4">
              3. How We Use Your Information
            </h2>
            <p className="text-bizbrew-text-secondary leading-relaxed mb-4">
              We use the information we collect to:
            </p>
            <ul className="space-y-2 text-bizbrew-text-secondary">
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-bizbrew-amber flex-shrink-0 mt-2" />
                <span>Respond to your inquiries and communicate about potential or ongoing projects</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-bizbrew-amber flex-shrink-0 mt-2" />
                <span>Provide, maintain, and improve our services</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-bizbrew-amber flex-shrink-0 mt-2" />
                <span>Send relevant information about our services when you have opted in</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-bizbrew-amber flex-shrink-0 mt-2" />
                <span>Comply with legal obligations</span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-display font-bold text-xl text-bizbrew-offwhite mb-4">
              4. Legal Basis for Processing
            </h2>
            <p className="text-bizbrew-text-secondary leading-relaxed">
              Under the GDPR, we process your personal data based on: your consent (Article 6(1)(a)), performance of a contract or pre-contractual measures (Article 6(1)(b)), and our legitimate interests in operating and improving our business (Article 6(1)(f)). You may withdraw consent at any time by contacting us.
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-xl text-bizbrew-offwhite mb-4">
              5. Data Sharing and Third Parties
            </h2>
            <p className="text-bizbrew-text-secondary leading-relaxed mb-4">
              We do not sell your personal data. We may share information with:
            </p>
            <ul className="space-y-2 text-bizbrew-text-secondary">
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-bizbrew-amber flex-shrink-0 mt-2" />
                <span>Hosting providers (Cloudflare) for website delivery and security</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-bizbrew-amber flex-shrink-0 mt-2" />
                <span>Email service providers for communication</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-bizbrew-amber flex-shrink-0 mt-2" />
                <span>Legal or regulatory authorities when required by law</span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-display font-bold text-xl text-bizbrew-offwhite mb-4">
              6. Data Retention
            </h2>
            <p className="text-bizbrew-text-secondary leading-relaxed">
              We retain personal data only as long as necessary for the purposes outlined in this policy or as required by law. Project-related data is retained for the duration of the business relationship and for a reasonable period afterward to address any follow-up questions. You may request deletion of your data at any time.
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-xl text-bizbrew-offwhite mb-4">
              7. Your Rights
            </h2>
            <p className="text-bizbrew-text-secondary leading-relaxed mb-4">
              Under the GDPR, you have the right to:
            </p>
            <ul className="space-y-2 text-bizbrew-text-secondary">
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-bizbrew-amber flex-shrink-0 mt-2" />
                <span>Access your personal data and receive a copy</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-bizbrew-amber flex-shrink-0 mt-2" />
                <span>Rectify inaccurate or incomplete data</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-bizbrew-amber flex-shrink-0 mt-2" />
                <span>Request erasure of your data (&quot;right to be forgotten&quot;)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-bizbrew-amber flex-shrink-0 mt-2" />
                <span>Restrict or object to processing</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-bizbrew-amber flex-shrink-0 mt-2" />
                <span>Data portability</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-bizbrew-amber flex-shrink-0 mt-2" />
                <span>Lodge a complaint with a supervisory authority</span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-display font-bold text-xl text-bizbrew-offwhite mb-4">
              8. Cookies and Tracking
            </h2>
            <p className="text-bizbrew-text-secondary leading-relaxed">
              Our website does not use tracking cookies or third-party analytics services. We may use essential cookies required for the website to function properly. No personal data is collected through cookies on this site.
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-xl text-bizbrew-offwhite mb-4">
              9. Security
            </h2>
            <p className="text-bizbrew-text-secondary leading-relaxed">
              We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction. Our website is served over HTTPS, and we follow industry best practices for data security.
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-xl text-bizbrew-offwhite mb-4">
              10. Contact
            </h2>
            <p className="text-bizbrew-text-secondary leading-relaxed">
              For questions about this privacy policy or to exercise your rights, contact us at{' '}
              <a href="mailto:contact@bizbrew.de" className="text-bizbrew-amber hover:underline">
                contact@bizbrew.de
              </a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
