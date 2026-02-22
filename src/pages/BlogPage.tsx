import { blogPosts } from '@/data/blog';
import SEO from '@/components/SEO';
import FadeIn from '@/components/FadeIn';
import ImageWithFallback from '@/components/ImageWithFallback';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, Calendar } from 'lucide-react';

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-bizbrew-charcoal">
      <SEO
        title="Blog"
        description="Insights on software development, architecture, and technology decisions from the BizBrew team."
        path="/blog"
      />

      {/* Hero */}
      <section className="pt-28 md:pt-36 pb-12 px-[6vw]">
        <FadeIn>
          <h1 className="font-display font-bold text-[clamp(36px,5vw,64px)] leading-[1.1] text-bizbrew-offwhite mb-4">
            Blog
          </h1>
          <p className="text-lg text-bizbrew-text-secondary max-w-2xl leading-relaxed">
            Insights on software development, architecture, and technology
            decisions.
          </p>
        </FadeIn>
      </section>

      {/* Blog Grid */}
      <section className="px-[6vw] pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, i) => (
            <FadeIn key={post.slug} delay={i * 80}>
              <Link
                to={`/blog/${post.slug}`}
                className="group bg-white/5 border border-white/10 rounded-[22px] overflow-hidden hover:border-bizbrew-amber/30 transition-all"
              >
                {/* Image */}
                <div className="aspect-[16/10] overflow-hidden">
                  <ImageWithFallback
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-bizbrew-amber/10 text-bizbrew-amber rounded-full px-3 py-1 text-xs font-mono"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Title */}
                  <h2 className="font-display font-bold text-lg text-bizbrew-offwhite mb-2 group-hover:text-bizbrew-amber transition-colors line-clamp-2">
                    {post.title}
                  </h2>

                  {/* Excerpt */}
                  <p className="text-bizbrew-text-secondary text-sm leading-relaxed mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>

                  {/* Meta */}
                  <div className="flex items-center gap-4 text-bizbrew-text-secondary text-xs font-mono">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      {new Date(post.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      {post.readingTime}
                    </span>
                  </div>

                  {/* Read more */}
                  <div className="mt-4 pt-4 border-t border-white/5 flex items-center gap-2 text-bizbrew-amber text-sm font-medium group-hover:gap-3 transition-all">
                    Read article
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </section>
    </div>
  );
}
