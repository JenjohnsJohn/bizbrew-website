import { faqCategories } from '@/data/faq';
import SEO from '@/components/SEO';
import FadeIn from '@/components/FadeIn';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqCategories.flatMap((cat) =>
    cat.questions.map((q) => ({
      '@type': 'Question',
      name: q.question,
      acceptedAnswer: { '@type': 'Answer', text: q.answer },
    }))
  ),
};

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-bizbrew-charcoal">
      <SEO
        title="Frequently Asked Questions"
        description="Answers to common questions about BizBrew's services, process, technical approach, and pricing."
        path="/faq"
        jsonLd={faqJsonLd}
      />

      {/* Hero */}
      <section className="pt-28 md:pt-36 pb-12 px-[6vw]">
        <FadeIn>
          <h1 className="font-display font-bold text-[clamp(36px,5vw,64px)] leading-[1.1] text-bizbrew-offwhite mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-bizbrew-text-secondary max-w-2xl leading-relaxed">
            Everything you need to know about working with us. If your question
            is not here, reach out and we will be happy to help.
          </p>
        </FadeIn>
      </section>

      {/* FAQ Categories */}
      <section className="pt-4 pb-24 px-[6vw]">
        <div className="max-w-3xl space-y-12">
          {faqCategories.map((category) => (
            <FadeIn key={category.slug}>
              <h3 className="font-display font-bold text-xl text-bizbrew-amber mb-4">
                {category.name}
              </h3>
              <Accordion type="single" collapsible className="w-full">
                {category.questions.map((item, qIndex) => (
                  <AccordionItem
                    key={qIndex}
                    value={`${category.slug}-${qIndex}`}
                    className="border-white/10"
                  >
                    <AccordionTrigger className="text-bizbrew-offwhite hover:no-underline hover:text-bizbrew-amber transition-colors text-left">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-bizbrew-text-secondary leading-relaxed">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* CTA */}
      <FadeIn as="section" className="px-[6vw] pb-24 border-t border-white/5 pt-16">
        <p className="text-bizbrew-text-secondary mb-4 text-lg">
          Still have questions?
        </p>
        <p className="text-bizbrew-text-secondary mb-8 max-w-xl">
          We are happy to talk through your specific situation. Reach out and
          we will get back to you within one business day.
        </p>
        <Link
          to="/#contact"
          className="inline-flex items-center gap-2 text-bizbrew-amber font-medium hover:gap-3 transition-all font-display"
        >
          Get in touch
          <ArrowRight className="w-4 h-4" />
        </Link>
      </FadeIn>
    </div>
  );
}
