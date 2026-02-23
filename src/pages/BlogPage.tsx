import { useState, useMemo } from 'react';
import { allBlogPosts, featuredPosts, filterPosts, topicFilters, regionFilters } from '@/data/blog-all';
import SEO from '@/components/SEO';
import FadeIn from '@/components/FadeIn';
import ImageWithFallback from '@/components/ImageWithFallback';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowRight, Clock, Calendar, Filter } from 'lucide-react';

const POSTS_PER_PAGE = 24;

export default function BlogPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const topic = searchParams.get('topic') || '';
  const region = searchParams.get('region') || '';
  const [visibleCount, setVisibleCount] = useState(POSTS_PER_PAGE);

  const filteredPosts = useMemo(() => {
    const nonFeaturedSlugs = new Set(featuredPosts.map((p) => p.slug));
    const postsToFilter = topic || region
      ? allBlogPosts
      : allBlogPosts.filter((p) => !nonFeaturedSlugs.has(p.slug));
    return filterPosts(postsToFilter, topic, region);
  }, [topic, region]);

  const visiblePosts = filteredPosts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredPosts.length;
  const showFeatured = !topic && !region;

  function updateFilter(key: string, value: string) {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    setSearchParams(params, { replace: true });
    setVisibleCount(POSTS_PER_PAGE);
  }

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

      {/* Featured Posts */}
      {showFeatured && (
        <section className="px-[6vw] pb-16">
          <FadeIn>
            <h2 className="font-display font-bold text-xl text-bizbrew-offwhite mb-6">
              Featured Articles
            </h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredPosts.map((post, i) => (
              <FadeIn key={post.slug} delay={i * 80}>
                <Link
                  to={`/blog/${post.slug}`}
                  className="group bg-white/5 border border-bizbrew-amber/20 rounded-[22px] overflow-hidden hover:border-bizbrew-amber/40 transition-all"
                >
                  <div className="aspect-[16/10] overflow-hidden">
                    <ImageWithFallback
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
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
                    <h3 className="font-display font-bold text-lg text-bizbrew-offwhite mb-2 group-hover:text-bizbrew-amber transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-bizbrew-text-secondary text-sm leading-relaxed mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
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
      )}

      {/* Filters */}
      <section className="px-[6vw] pb-8">
        <FadeIn>
          <div className="flex flex-wrap items-center gap-4">
            <Filter className="w-4 h-4 text-bizbrew-text-secondary" />

            <select
              value={topic}
              onChange={(e) => updateFilter('topic', e.target.value)}
              className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm text-bizbrew-offwhite font-mono appearance-none cursor-pointer hover:border-bizbrew-amber/30 transition-colors"
            >
              {topicFilters.map((f) => (
                <option key={f.value} value={f.value} className="bg-bizbrew-charcoal">
                  {f.label}
                </option>
              ))}
            </select>

            <select
              value={region}
              onChange={(e) => updateFilter('region', e.target.value)}
              className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm text-bizbrew-offwhite font-mono appearance-none cursor-pointer hover:border-bizbrew-amber/30 transition-colors"
            >
              {regionFilters.map((f) => (
                <option key={f.value} value={f.value} className="bg-bizbrew-charcoal">
                  {f.label}
                </option>
              ))}
            </select>

            {(topic || region) && (
              <button
                onClick={() => {
                  setSearchParams({}, { replace: true });
                  setVisibleCount(POSTS_PER_PAGE);
                }}
                className="text-bizbrew-amber text-sm font-mono hover:underline"
              >
                Clear filters
              </button>
            )}

            <span className="text-bizbrew-text-secondary text-xs font-mono ml-auto">
              {filteredPosts.length} articles
            </span>
          </div>
        </FadeIn>
      </section>

      {/* Blog Grid */}
      <section className="px-[6vw] pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {visiblePosts.map((post, i) => (
            <FadeIn key={post.slug} delay={Math.min(i, 8) * 60}>
              <Link
                to={`/blog/${post.slug}`}
                className="group bg-white/5 border border-white/10 rounded-[22px] overflow-hidden hover:border-bizbrew-amber/30 transition-all"
              >
                <div className="aspect-[16/10] overflow-hidden">
                  <ImageWithFallback
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="bg-bizbrew-amber/10 text-bizbrew-amber rounded-full px-3 py-1 text-xs font-mono"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h2 className="font-display font-bold text-lg text-bizbrew-offwhite mb-2 group-hover:text-bizbrew-amber transition-colors line-clamp-2">
                    {post.title}
                  </h2>
                  <p className="text-bizbrew-text-secondary text-sm leading-relaxed mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
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
                  <div className="mt-4 pt-4 border-t border-white/5 flex items-center gap-2 text-bizbrew-amber text-sm font-medium group-hover:gap-3 transition-all">
                    Read article
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>

        {/* Load More */}
        {hasMore && (
          <div className="mt-12 text-center">
            <button
              onClick={() => setVisibleCount((c) => c + POSTS_PER_PAGE)}
              className="inline-flex items-center gap-2 bg-bizbrew-amber/10 hover:bg-bizbrew-amber/20 text-bizbrew-amber rounded-full px-8 py-3 font-display font-medium transition-colors"
            >
              Load more articles
              <ArrowRight className="w-4 h-4" />
            </button>
            <p className="text-bizbrew-text-secondary text-xs font-mono mt-3">
              Showing {visiblePosts.length} of {filteredPosts.length}
            </p>
          </div>
        )}

        {filteredPosts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-bizbrew-text-secondary text-lg">
              No articles match your filters.
            </p>
            <button
              onClick={() => {
                setSearchParams({}, { replace: true });
                setVisibleCount(POSTS_PER_PAGE);
              }}
              className="mt-4 text-bizbrew-amber font-mono text-sm hover:underline"
            >
              Clear filters
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
