import { getBlogPostBySlug, blogPosts, type ContentBlock } from '@/data/blog';
import SEO from '@/components/SEO';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Clock, Calendar, User } from 'lucide-react';
import { useLayoutEffect } from 'react';
import { SITE_URL } from '@/lib/seo';

function ContentRenderer({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <div className="space-y-6 max-w-3xl">
      {blocks.map((block, i) => {
        switch (block.type) {
          case 'heading':
            if (block.level === 3) {
              return (
                <h3
                  key={i}
                  className="font-display font-bold text-lg text-bizbrew-offwhite mt-8"
                >
                  {block.text}
                </h3>
              );
            }
            return (
              <h2
                key={i}
                className="font-display font-bold text-2xl text-bizbrew-offwhite mt-10"
              >
                {block.text}
              </h2>
            );

          case 'paragraph':
            return (
              <p
                key={i}
                className="text-bizbrew-text-secondary leading-relaxed"
              >
                {block.text}
              </p>
            );

          case 'list':
            return (
              <ul key={i} className="space-y-2 pl-1">
                {block.items.map((item, j) => (
                  <li
                    key={j}
                    className="flex items-start gap-3 text-bizbrew-text-secondary leading-relaxed"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-bizbrew-amber flex-shrink-0 mt-2.5" />
                    {item}
                  </li>
                ))}
              </ul>
            );

          case 'quote':
            return (
              <blockquote
                key={i}
                className="border-l-2 border-bizbrew-amber pl-6 italic text-bizbrew-text-secondary leading-relaxed my-8"
              >
                <p>{block.text}</p>
                {block.author && (
                  <footer className="mt-2 text-sm text-bizbrew-text-secondary/70 not-italic">
                    &mdash; {block.author}
                  </footer>
                )}
              </blockquote>
            );

          case 'code':
            return (
              <div
                key={i}
                className="bg-white/5 rounded-lg p-4 font-mono text-sm overflow-x-auto border border-white/5"
              >
                {block.language && (
                  <div className="text-bizbrew-amber/60 text-xs mb-2 uppercase tracking-wider">
                    {block.language}
                  </div>
                )}
                <pre className="text-bizbrew-text-secondary whitespace-pre">
                  <code>{block.code}</code>
                </pre>
              </div>
            );

          default:
            return null;
        }
      })}
    </div>
  );
}

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getBlogPostBySlug(slug) : undefined;

  // Reset scroll on mount
  useLayoutEffect(() => {
    const prevRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    return () => {
      window.history.scrollRestoration = prevRestoration;
    };
  }, [slug]);

  if (!post) {
    return (
      <div className="min-h-screen bg-bizbrew-charcoal flex flex-col items-center justify-center px-6">
        <h1 className="font-display text-3xl text-bizbrew-offwhite mb-4">
          Post not found
        </h1>
        <p className="text-bizbrew-text-secondary mb-8">
          The blog post you are looking for does not exist.
        </p>
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-bizbrew-amber font-medium hover:gap-3 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to blog
        </Link>
      </div>
    );
  }

  const relatedPosts = blogPosts
    .filter((p) => p.slug !== post.slug)
    .slice(0, 2);

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: { '@type': 'Organization', name: post.author },
    publisher: { '@type': 'Organization', name: 'BizBrew', url: SITE_URL },
    url: `${SITE_URL}/blog/${post.slug}`,
    image: post.image ? `${SITE_URL}${post.image}` : undefined,
  };

  return (
    <div className="min-h-screen bg-bizbrew-charcoal">
      <SEO
        title={post.title}
        description={post.excerpt}
        image={post.image}
        path={`/blog/${post.slug}`}
        type="article"
        jsonLd={articleJsonLd}
      />

      {/* Hero */}
      <section className="pt-28 md:pt-36 pb-12 px-[6vw]">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-bizbrew-text-secondary hover:text-bizbrew-amber transition-colors mb-10 font-mono text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to blog
        </Link>

        <h1 className="font-display font-bold text-[clamp(28px,4vw,48px)] leading-[1.15] text-bizbrew-offwhite mb-6 max-w-4xl">
          {post.title}
        </h1>

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-4 text-bizbrew-text-secondary text-sm font-mono mb-6">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4" />
            {new Date(post.date).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-4 h-4" />
            {post.readingTime}
          </span>
          <span className="flex items-center gap-1.5">
            <User className="w-4 h-4" />
            {post.author}
          </span>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="bg-bizbrew-amber/10 text-bizbrew-amber rounded-full px-3 py-1 text-xs font-mono"
            >
              {tag}
            </span>
          ))}
        </div>
      </section>

      {/* Content */}
      <section className="px-[6vw] pb-16 md:pb-24">
        <ContentRenderer blocks={post.content} />
      </section>

      {/* Tags (bottom) */}
      <section className="px-[6vw] pb-12 border-t border-white/5 pt-8">
        <p className="text-bizbrew-text-secondary text-sm font-mono mb-3">
          Tagged:
        </p>
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="bg-bizbrew-amber/10 text-bizbrew-amber rounded-full px-3 py-1 text-xs font-mono"
            >
              {tag}
            </span>
          ))}
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="px-[6vw] pb-16 md:pb-24 border-t border-white/5 pt-12">
          <h2 className="font-display font-bold text-2xl text-bizbrew-offwhite mb-8">
            More from the blog
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {relatedPosts.map((related) => (
              <Link
                key={related.slug}
                to={`/blog/${related.slug}`}
                className="group bg-white/5 border border-white/10 rounded-[22px] overflow-hidden hover:border-bizbrew-amber/30 transition-all"
              >
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={related.image}
                    alt={related.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {related.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-bizbrew-amber/10 text-bizbrew-amber rounded-full px-3 py-1 text-xs font-mono"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="font-display font-bold text-lg text-bizbrew-offwhite mb-2 group-hover:text-bizbrew-amber transition-colors line-clamp-2">
                    {related.title}
                  </h3>
                  <p className="text-bizbrew-text-secondary text-sm leading-relaxed line-clamp-2">
                    {related.excerpt}
                  </p>
                  <div className="mt-4 flex items-center gap-2 text-bizbrew-amber text-sm font-medium group-hover:gap-3 transition-all">
                    Read article
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="px-[6vw] pb-24 border-t border-white/5 pt-16">
        <p className="text-bizbrew-text-secondary mb-4 text-lg">
          Want to discuss these ideas for your project?
        </p>
        <Link
          to="/#contact"
          className="inline-flex items-center gap-2 text-bizbrew-amber font-medium hover:gap-3 transition-all font-display"
        >
          Get in touch
          <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </div>
  );
}
