import { useLayoutEffect } from 'react';
import SEO from '@/components/SEO';

export default function TermsOfService() {
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-bizbrew-charcoal">
      <SEO
        title="Terms of Service"
        description="BizBrew terms of service. Terms and conditions governing the use of our website and services."
        path="/terms"
      />

      <div className="pt-28 md:pt-36 pb-24 px-[6vw]">
        <h1 className="font-display font-bold text-[clamp(36px,5vw,56px)] leading-[1.1] text-bizbrew-offwhite mb-4">
          Terms of Service
        </h1>
        <p className="font-mono text-sm text-bizbrew-text-secondary mb-12">
          Last updated: February 2026
        </p>

        <div className="max-w-3xl space-y-10">
          <section>
            <h2 className="font-display font-bold text-xl text-bizbrew-offwhite mb-4">
              1. Agreement to Terms
            </h2>
            <p className="text-bizbrew-text-secondary leading-relaxed">
              By accessing or using the BizBrew website and services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our website or services. These terms apply to all visitors, users, and clients of BizBrew.
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-xl text-bizbrew-offwhite mb-4">
              2. Services
            </h2>
            <p className="text-bizbrew-text-secondary leading-relaxed mb-4">
              BizBrew provides custom software development, SaaS product development, web and mobile application development, cloud and API integration, and architecture consulting services. The specific scope, deliverables, timeline, and pricing for any engagement are defined in a separate project agreement or statement of work between BizBrew and the client.
            </p>
            <p className="text-bizbrew-text-secondary leading-relaxed">
              Information presented on this website is for general informational purposes and does not constitute a binding offer. Project estimates, timelines, and capabilities described on the website are illustrative and may vary based on specific project requirements.
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-xl text-bizbrew-offwhite mb-4">
              3. Intellectual Property
            </h2>
            <p className="text-bizbrew-text-secondary leading-relaxed mb-4">
              The content on this website — including text, graphics, logos, images, and software — is the property of BizBrew and is protected by applicable intellectual property laws. You may not reproduce, distribute, modify, or create derivative works from any content on this website without our prior written consent.
            </p>
            <p className="text-bizbrew-text-secondary leading-relaxed">
              For client projects, intellectual property ownership is defined in the project agreement. Unless otherwise specified, all custom code, designs, and documentation created for a client project are owned by the client upon full payment.
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-xl text-bizbrew-offwhite mb-4">
              4. Client Responsibilities
            </h2>
            <p className="text-bizbrew-text-secondary leading-relaxed">
              Clients are responsible for providing accurate project requirements, timely feedback, access to necessary systems and data, and content or materials needed for project completion. Delays caused by late client input may affect project timelines and costs as outlined in the project agreement.
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-xl text-bizbrew-offwhite mb-4">
              5. Payment Terms
            </h2>
            <p className="text-bizbrew-text-secondary leading-relaxed">
              Payment terms, including milestones, amounts, and due dates, are specified in the project agreement. Invoices are due within the agreed-upon payment period (typically net 14 days). Late payments may incur interest charges as permitted by applicable law. BizBrew reserves the right to pause work on projects with overdue invoices.
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-xl text-bizbrew-offwhite mb-4">
              6. Confidentiality
            </h2>
            <p className="text-bizbrew-text-secondary leading-relaxed">
              Both parties agree to maintain the confidentiality of proprietary information shared during the course of a project. This includes business strategies, technical architectures, source code, user data, and any information marked as confidential. Confidentiality obligations survive the termination of the business relationship.
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-xl text-bizbrew-offwhite mb-4">
              7. Limitation of Liability
            </h2>
            <p className="text-bizbrew-text-secondary leading-relaxed">
              BizBrew provides services &quot;as is&quot; and makes no warranties, express or implied, regarding the suitability, reliability, or accuracy of the website content or services for any particular purpose. To the maximum extent permitted by law, BizBrew shall not be liable for indirect, incidental, special, consequential, or punitive damages arising from the use of our website or services. Our total liability for any claim shall not exceed the fees paid for the specific service giving rise to the claim.
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-xl text-bizbrew-offwhite mb-4">
              8. Termination
            </h2>
            <p className="text-bizbrew-text-secondary leading-relaxed">
              Either party may terminate a project engagement as specified in the project agreement. Upon termination, the client is responsible for payment for all work completed up to the termination date. BizBrew will deliver all completed work product and provide reasonable transition assistance.
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-xl text-bizbrew-offwhite mb-4">
              9. Governing Law
            </h2>
            <p className="text-bizbrew-text-secondary leading-relaxed">
              These terms are governed by and construed in accordance with the laws of Germany. Any disputes arising from these terms or our services shall be resolved in the competent courts of Germany, unless otherwise agreed in the project agreement.
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-xl text-bizbrew-offwhite mb-4">
              10. Changes to These Terms
            </h2>
            <p className="text-bizbrew-text-secondary leading-relaxed">
              We reserve the right to update these terms at any time. Changes will be posted on this page with an updated &quot;Last updated&quot; date. Continued use of our website or services after changes constitutes acceptance of the revised terms.
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-xl text-bizbrew-offwhite mb-4">
              11. Contact
            </h2>
            <p className="text-bizbrew-text-secondary leading-relaxed">
              For questions about these terms, contact us at{' '}
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
