import { useState } from 'react';
import { ArrowRight, Mail, MapPin } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import FadeIn from '../components/FadeIn';

export default function ContactSection() {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <section className="section-flowing bg-bizbrew-charcoal py-24 md:py-32">
      <div className="px-[6vw]">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          {/* Left Content */}
          <div className="w-full lg:w-[50%]">
            <FadeIn>
              <h2 className="font-display font-bold text-[clamp(44px,6vw,84px)] leading-[1.05] text-bizbrew-offwhite mb-6">
                Ready to
                <br />
                <span className="text-bizbrew-amber">build?</span>
              </h2>

              <p className="text-lg text-bizbrew-text-secondary leading-relaxed mb-10 max-w-md">
                Tell us what you're building. We'll respond within two business
                days.
              </p>

              <div className="space-y-4 mb-10">
                <a
                  href="mailto:contact@bizbrew.de"
                  className="flex items-center gap-3 text-bizbrew-offwhite hover:text-bizbrew-amber transition-colors group"
                >
                  <Mail className="w-5 h-5 text-bizbrew-amber" />
                  <span className="font-mono text-sm">contact@bizbrew.de</span>
                </a>
                <div className="flex items-center gap-3 text-bizbrew-text-secondary">
                  <MapPin className="w-5 h-5 text-bizbrew-amber" />
                  <span className="font-mono text-sm">
                    Germany &bull; Remote &amp; on-site
                  </span>
                </div>
              </div>

              <button
                onClick={() => setDialogOpen(true)}
                className="cta-button"
              >
                Start a project
                <ArrowRight className="w-4 h-4" />
              </button>
            </FadeIn>
          </div>

          {/* Right Image */}
          <div className="w-full lg:w-[50%]">
            <FadeIn direction="right">
              <div className="w-full aspect-[4/5] lg:aspect-auto lg:h-[72vh] rounded-frame overflow-hidden">
                <img
                  src="/contact_roaster.jpg"
                  alt="Coffee roasting"
                  className="w-full h-full object-cover"
                />
              </div>
            </FadeIn>
          </div>
        </div>
      </div>

      {/* Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="bg-bizbrew-charcoal border-white/10 text-bizbrew-offwhite max-w-md">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl">
              Start a Project
            </DialogTitle>
            <DialogDescription className="text-bizbrew-text-secondary">
              Send us an email at{' '}
              <a
                href="mailto:contact@bizbrew.de"
                className="text-bizbrew-amber hover:underline"
              >
                contact@bizbrew.de
              </a>{' '}
              with details about your project.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <p className="text-sm text-bizbrew-text-secondary">Include:</p>
            <ul className="space-y-2 text-sm text-bizbrew-offwhite">
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-bizbrew-amber" />
                Brief project description
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-bizbrew-amber" />
                Timeline expectations
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-bizbrew-amber" />
                Budget range (optional)
              </li>
            </ul>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
