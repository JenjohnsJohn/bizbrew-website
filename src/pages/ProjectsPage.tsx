import { useState, useEffect } from 'react';
import { projects as staticProjects, getProjectCategories } from '@/data/projects';
import type { Project } from '@/data/projects';
import { fetchProjects, fetchCategories } from '@/lib/api';
import SEO from '@/components/SEO';
import FadeIn from '@/components/FadeIn';
import ImageWithFallback from '@/components/ImageWithFallback';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [projectList, setProjectList] = useState<Project[]>(staticProjects);
  const [categories, setCategories] = useState<string[]>(['All', ...getProjectCategories()]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const [apiProjects, apiCategories] = await Promise.all([
          fetchProjects(),
          fetchCategories(),
        ]);
        if (!cancelled) {
          setProjectList(apiProjects);
          setCategories(['All', ...apiCategories]);
        }
      } catch {
        // Fallback to static data (already set)
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => { cancelled = true; };
  }, []);

  const filtered =
    activeCategory === 'All'
      ? projectList
      : projectList.filter((p) => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-bizbrew-charcoal">
      <SEO
        title="Projects"
        description="Explore 46 production projects spanning e-commerce, healthcare, education, fintech, and more. Real software built for real businesses."
        path="/projects"
      />

      {/* Hero */}
      <section className="pt-28 md:pt-36 pb-16 px-[6vw]">
        <FadeIn>
          <h1 className="font-display font-bold text-[clamp(36px,5vw,64px)] leading-[1.1] text-bizbrew-offwhite mb-6">
            Projects
          </h1>
          <p className="text-lg text-bizbrew-text-secondary leading-relaxed max-w-2xl">
            Over 46 production applications across e-commerce, healthcare,
            education, fintech, and more. Each one built to solve a real
            business problem.
          </p>
        </FadeIn>
      </section>

      {/* Category Filters */}
      <section className="px-[6vw] pb-12">
        <FadeIn>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full font-mono text-sm border transition-colors ${
                  activeCategory === cat
                    ? 'bg-bizbrew-amber text-bizbrew-charcoal border-bizbrew-amber'
                    : 'bg-white/5 text-bizbrew-text-secondary border-white/10 hover:border-bizbrew-amber/30'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </FadeIn>
      </section>

      {/* Project Cards */}
      <section className="px-[6vw] pb-24">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="bg-white/5 border border-white/10 rounded-[22px] overflow-hidden animate-pulse"
              >
                <div className="aspect-[16/10] bg-white/5" />
                <div className="p-6 space-y-3">
                  <div className="h-4 bg-white/5 rounded w-1/3" />
                  <div className="h-6 bg-white/5 rounded w-2/3" />
                  <div className="h-4 bg-white/5 rounded w-full" />
                  <div className="h-4 bg-white/5 rounded w-4/5" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((project, i) => (
              <FadeIn key={project.slug} delay={Math.min(i * 60, 300)}>
                <Link
                  to={`/projects/${project.slug}`}
                  className="group bg-white/5 border border-white/10 rounded-[22px] overflow-hidden hover:border-bizbrew-amber/30 transition flex flex-col h-full"
                >
                  <div className="aspect-[16/10] overflow-hidden">
                    <ImageWithFallback
                      src={project.image}
                      alt={project.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="inline-block px-3 py-1 rounded-full bg-white/5 text-bizbrew-text-secondary font-mono text-xs border border-white/10">
                        {project.category}
                      </span>
                      <span className="text-bizbrew-text-secondary font-mono text-xs">
                        {project.year}
                      </span>
                    </div>

                    <h2 className="font-display font-semibold text-xl text-bizbrew-offwhite mb-2">
                      {project.name}
                    </h2>

                    <p className="text-bizbrew-text-secondary text-sm leading-relaxed mb-4 line-clamp-3 flex-1">
                      {project.summary}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {project.stack.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 rounded bg-white/5 text-bizbrew-text-secondary font-mono text-[11px]"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.stack.length > 4 && (
                        <span className="px-2 py-0.5 rounded bg-white/5 text-bizbrew-text-secondary font-mono text-[11px]">
                          +{project.stack.length - 4}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex gap-1.5">
                        {project.platforms.map((p) => (
                          <span
                            key={p}
                            className="text-bizbrew-text-secondary font-mono text-[11px]"
                          >
                            {p}
                          </span>
                        ))}
                      </div>
                      <span className="inline-flex items-center gap-2 text-bizbrew-amber font-medium text-sm group-hover:gap-3 transition-all">
                        View project
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        )}

        {!loading && filtered.length === 0 && (
          <p className="text-bizbrew-text-secondary text-center py-12">
            No projects in this category.
          </p>
        )}
      </section>
    </div>
  );
}
