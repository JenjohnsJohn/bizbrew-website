import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchProjects, fetchCategories } from '@/lib/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FolderOpen, Tag, Plus, ExternalLink } from 'lucide-react';

export default function AdminDashboard() {
  const [projectCount, setProjectCount] = useState(0);
  const [categoryBreakdown, setCategoryBreakdown] = useState<{ name: string; count: number }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const [projects, categories] = await Promise.all([
          fetchProjects(),
          fetchCategories(),
        ]);
        setProjectCount(projects.length);

        const breakdown = categories.map((cat) => ({
          name: cat,
          count: projects.filter((p) => p.category === cat).length,
        })).sort((a, b) => b.count - a.count);

        setCategoryBreakdown(breakdown);
      } catch {
        // Silently fail — data will show as 0
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display font-bold text-2xl text-bizbrew-offwhite mb-2">
          Dashboard
        </h1>
        <p className="text-bizbrew-text-secondary text-sm">
          Overview of your project portfolio.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="bg-white/5 border-white/10">
          <CardHeader className="pb-2">
            <CardTitle className="text-bizbrew-text-secondary text-sm font-normal flex items-center gap-2">
              <FolderOpen className="w-4 h-4" />
              Total Projects
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-bizbrew-offwhite">
              {loading ? '...' : projectCount}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10">
          <CardHeader className="pb-2">
            <CardTitle className="text-bizbrew-text-secondary text-sm font-normal flex items-center gap-2">
              <Tag className="w-4 h-4" />
              Categories
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-bizbrew-offwhite">
              {loading ? '...' : categoryBreakdown.length}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10">
          <CardHeader className="pb-2">
            <CardTitle className="text-bizbrew-text-secondary text-sm font-normal">
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Link
              to="/admin/projects/new"
              className="flex items-center gap-2 text-bizbrew-amber text-sm hover:underline"
            >
              <Plus className="w-3 h-3" />
              Add new project
            </Link>
            <Link
              to="/projects"
              target="_blank"
              className="flex items-center gap-2 text-bizbrew-text-secondary text-sm hover:text-bizbrew-offwhite"
            >
              <ExternalLink className="w-3 h-3" />
              View public site
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Category breakdown */}
      {!loading && categoryBreakdown.length > 0 && (
        <Card className="bg-white/5 border-white/10">
          <CardHeader>
            <CardTitle className="text-bizbrew-offwhite text-lg font-display">
              Projects by Category
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {categoryBreakdown.map((cat) => (
                <div key={cat.name} className="flex items-center justify-between">
                  <span className="text-bizbrew-text-secondary text-sm">
                    {cat.name}
                  </span>
                  <div className="flex items-center gap-3">
                    <div className="w-32 h-2 bg-white/5 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-bizbrew-amber/60 rounded-full"
                        style={{ width: `${(cat.count / projectCount) * 100}%` }}
                      />
                    </div>
                    <span className="text-bizbrew-offwhite text-sm font-mono w-6 text-right">
                      {cat.count}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
