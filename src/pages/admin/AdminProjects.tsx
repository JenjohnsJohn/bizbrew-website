import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/lib/auth-context';
import { fetchProjects, deleteProject } from '@/lib/api';
import type { ProjectWithSEO } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Pencil, Trash2, Plus, Search, ExternalLink } from 'lucide-react';

export default function AdminProjects() {
  const { token } = useAuth();
  const [projects, setProjects] = useState<ProjectWithSEO[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [deleteSlug, setDeleteSlug] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  async function loadProjects() {
    try {
      const data = await fetchProjects();
      setProjects(data);
    } catch {
      // Silently fail
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { loadProjects(); }, []);

  const categories = ['All', ...new Set(projects.map((p) => p.category))];

  const filtered = projects.filter((p) => {
    const matchesSearch =
      !search ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.slug.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || p.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  async function handleDelete() {
    if (!deleteSlug || !token) return;
    setDeleting(true);
    try {
      await deleteProject(token, deleteSlug);
      setProjects((prev) => prev.filter((p) => p.slug !== deleteSlug));
    } catch {
      // Silently fail
    } finally {
      setDeleting(false);
      setDeleteSlug(null);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display font-bold text-2xl text-bizbrew-offwhite mb-1">
            Projects
          </h1>
          <p className="text-bizbrew-text-secondary text-sm">
            {projects.length} projects total
          </p>
        </div>
        <Link to="/admin/projects/new">
          <Button className="bg-bizbrew-amber text-bizbrew-charcoal hover:bg-bizbrew-amber/90">
            <Plus className="w-4 h-4 mr-2" />
            Add Project
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-bizbrew-text-secondary" />
          <Input
            placeholder="Search projects..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 bg-white/5 border-white/10 text-bizbrew-offwhite placeholder:text-bizbrew-text-secondary/50"
          />
        </div>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="px-3 py-2 rounded-md bg-white/5 border border-white/10 text-bizbrew-offwhite text-sm"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* Table */}
      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-16 bg-white/5 rounded animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="border border-white/10 rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="border-white/10 hover:bg-transparent">
                <TableHead className="text-bizbrew-text-secondary">Name</TableHead>
                <TableHead className="text-bizbrew-text-secondary hidden md:table-cell">Category</TableHead>
                <TableHead className="text-bizbrew-text-secondary hidden lg:table-cell">Year</TableHead>
                <TableHead className="text-bizbrew-text-secondary hidden lg:table-cell">Status</TableHead>
                <TableHead className="text-bizbrew-text-secondary text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((project) => (
                <TableRow key={project.slug} className="border-white/10 hover:bg-white/[0.02]">
                  <TableCell>
                    <div>
                      <p className="text-bizbrew-offwhite font-medium">{project.name}</p>
                      <p className="text-bizbrew-text-secondary text-xs font-mono">{project.slug}</p>
                    </div>
                  </TableCell>
                  <TableCell className="text-bizbrew-text-secondary text-sm hidden md:table-cell">
                    {project.category}
                  </TableCell>
                  <TableCell className="text-bizbrew-text-secondary text-sm hidden lg:table-cell">
                    {project.year}
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    <span
                      className={`inline-block px-2 py-1 rounded text-xs font-mono ${
                        project.status === 'Completed' || project.status === 'Production'
                          ? 'bg-green-500/10 text-green-400'
                          : 'bg-bizbrew-amber/10 text-bizbrew-amber'
                      }`}
                    >
                      {project.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Link
                        to={`/projects/${project.slug}`}
                        target="_blank"
                        className="p-2 text-bizbrew-text-secondary hover:text-bizbrew-offwhite transition-colors"
                        title="View on site"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Link>
                      <Link
                        to={`/admin/projects/${project.slug}/edit`}
                        className="p-2 text-bizbrew-text-secondary hover:text-bizbrew-amber transition-colors"
                        title="Edit"
                      >
                        <Pencil className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => setDeleteSlug(project.slug)}
                        className="p-2 text-bizbrew-text-secondary hover:text-red-400 transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {filtered.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-bizbrew-text-secondary py-12">
                    No projects found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Delete confirmation */}
      <AlertDialog open={!!deleteSlug} onOpenChange={() => setDeleteSlug(null)}>
        <AlertDialogContent className="bg-bizbrew-charcoal border-white/10">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-bizbrew-offwhite">Delete project?</AlertDialogTitle>
            <AlertDialogDescription className="text-bizbrew-text-secondary">
              This will permanently delete the project "{deleteSlug}". This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-white/5 border-white/10 text-bizbrew-text-secondary hover:bg-white/10 hover:text-bizbrew-offwhite">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={deleting}
              className="bg-red-600 text-white hover:bg-red-700"
            >
              {deleting ? 'Deleting...' : 'Delete'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
