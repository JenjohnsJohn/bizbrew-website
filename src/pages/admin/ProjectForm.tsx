import { useState, useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '@/lib/auth-context';
import {
  fetchProject,
  createProject,
  updateProject,
  uploadImage,
} from '@/lib/api';
import type { ProjectInput } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Checkbox } from '@/components/ui/checkbox';
import { ChevronDown, X, Plus, Upload, Save, Eye } from 'lucide-react';

const PLATFORM_OPTIONS = ['iOS', 'Android', 'Web'];

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export default function ProjectForm() {
  const { slug } = useParams<{ slug: string }>();
  const isEditing = !!slug;
  const navigate = useNavigate();
  const { token } = useAuth();

  const [loading, setLoading] = useState(isEditing);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [seoOpen, setSeoOpen] = useState(false);
  const [uploading, setUploading] = useState(false);

  // Form fields
  const [name, setName] = useState('');
  const [formSlug, setFormSlug] = useState('');
  const [slugManual, setSlugManual] = useState(false);
  const [category, setCategory] = useState('');
  const [year, setYear] = useState('');
  const [client, setClient] = useState('');
  const [status, setStatus] = useState('');
  const [summary, setSummary] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [stack, setStack] = useState<string[]>([]);
  const [stackInput, setStackInput] = useState('');
  const [platforms, setPlatforms] = useState<string[]>([]);
  const [features, setFeatures] = useState<string[]>(['']);
  const [highlights, setHighlights] = useState<string[]>(['']);

  // SEO fields
  const [seoTitle, setSeoTitle] = useState('');
  const [seoDescription, setSeoDescription] = useState('');
  const [seoImage, setSeoImage] = useState('');
  const [seoKeywords, setSeoKeywords] = useState('');

  // Auto-generate slug from name
  useEffect(() => {
    if (!slugManual && !isEditing) {
      setFormSlug(slugify(name));
    }
  }, [name, slugManual, isEditing]);

  // Load existing project for editing
  useEffect(() => {
    if (!isEditing) return;

    async function load() {
      try {
        const project = await fetchProject(slug!);
        if (!project) {
          navigate('/admin/projects');
          return;
        }
        setName(project.name);
        setFormSlug(project.slug);
        setSlugManual(true);
        setCategory(project.category);
        setYear(project.year);
        setClient(project.client);
        setStatus(project.status);
        setSummary(project.summary);
        setDescription(project.description);
        setImage(project.image);
        setStack(project.stack);
        setPlatforms(project.platforms);
        setFeatures(project.features.length > 0 ? project.features : ['']);
        setHighlights(project.highlights.length > 0 ? project.highlights : ['']);
        setSeoTitle(project.seo_title || '');
        setSeoDescription(project.seo_description || '');
        setSeoImage(project.seo_image || '');
        setSeoKeywords(project.seo_keywords || '');
        if (project.seo_title || project.seo_description || project.seo_image || project.seo_keywords) {
          setSeoOpen(true);
        }
      } catch {
        navigate('/admin/projects');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [slug, isEditing, navigate]);

  // Computed SEO preview
  const seoPreview = useMemo(() => ({
    title: seoTitle || `${name || 'Project Name'} | BizBrew`,
    description: seoDescription || summary || 'Project description will appear here...',
    url: `bizbrew.de/projects/${formSlug || 'project-slug'}`,
  }), [seoTitle, name, seoDescription, summary, formSlug]);

  function addStackTag() {
    const tag = stackInput.trim();
    if (tag && !stack.includes(tag)) {
      setStack([...stack, tag]);
    }
    setStackInput('');
  }

  function removeStackTag(tag: string) {
    setStack(stack.filter((t) => t !== tag));
  }

  function togglePlatform(platform: string) {
    setPlatforms((prev) =>
      prev.includes(platform) ? prev.filter((p) => p !== platform) : [...prev, platform]
    );
  }

  function updateListItem(
    list: string[],
    setList: (v: string[]) => void,
    index: number,
    value: string
  ) {
    const updated = [...list];
    updated[index] = value;
    setList(updated);
  }

  function addListItem(list: string[], setList: (v: string[]) => void) {
    setList([...list, '']);
  }

  function removeListItem(list: string[], setList: (v: string[]) => void, index: number) {
    if (list.length <= 1) return;
    setList(list.filter((_, i) => i !== index));
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>, target: 'main' | 'seo') {
    const file = e.target.files?.[0];
    if (!file || !token) return;

    setUploading(true);
    try {
      const { url } = await uploadImage(token, file);
      if (target === 'main') {
        setImage(url);
      } else {
        setSeoImage(url);
      }
    } catch {
      setError('Failed to upload image');
    } finally {
      setUploading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!token) return;
    setError('');
    setSaving(true);

    const data: ProjectInput = {
      slug: formSlug,
      name,
      category,
      year,
      summary,
      description,
      image,
      stack,
      platforms,
      features: features.filter(Boolean),
      highlights: highlights.filter(Boolean),
      client,
      status,
      seo_title: seoTitle || null,
      seo_description: seoDescription || null,
      seo_image: seoImage || null,
      seo_keywords: seoKeywords || null,
    };

    try {
      if (isEditing) {
        await updateProject(token, slug!, data);
      } else {
        await createProject(token, data);
      }
      navigate('/admin/projects');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save project');
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-8 bg-white/5 rounded w-48" />
        <div className="h-64 bg-white/5 rounded" />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl">
      <div>
        <h1 className="font-display font-bold text-2xl text-bizbrew-offwhite mb-1">
          {isEditing ? 'Edit Project' : 'New Project'}
        </h1>
        <p className="text-bizbrew-text-secondary text-sm">
          {isEditing ? `Editing: ${name}` : 'Create a new project entry.'}
        </p>
      </div>

      {error && (
        <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
          {error}
        </div>
      )}

      {/* Basic Info */}
      <Card className="bg-white/5 border-white/10">
        <CardHeader>
          <CardTitle className="text-bizbrew-offwhite text-lg font-display">
            Basic Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-bizbrew-text-secondary">Project Name *</Label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="My Project"
                className="bg-white/5 border-white/10 text-bizbrew-offwhite"
                required
              />
            </div>
            <div className="space-y-2">
              <Label className="text-bizbrew-text-secondary">
                Slug *
                {!isEditing && (
                  <button
                    type="button"
                    onClick={() => setSlugManual(!slugManual)}
                    className="ml-2 text-xs text-bizbrew-amber hover:underline"
                  >
                    {slugManual ? 'Auto-generate' : 'Edit manually'}
                  </button>
                )}
              </Label>
              <Input
                value={formSlug}
                onChange={(e) => {
                  setSlugManual(true);
                  setFormSlug(e.target.value);
                }}
                placeholder="my-project"
                className="bg-white/5 border-white/10 text-bizbrew-offwhite font-mono text-sm"
                readOnly={!slugManual && !isEditing}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-bizbrew-text-secondary">Category *</Label>
              <Input
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="E-Commerce"
                className="bg-white/5 border-white/10 text-bizbrew-offwhite"
                required
              />
            </div>
            <div className="space-y-2">
              <Label className="text-bizbrew-text-secondary">Year *</Label>
              <Input
                value={year}
                onChange={(e) => setYear(e.target.value)}
                placeholder="2024-2025"
                className="bg-white/5 border-white/10 text-bizbrew-offwhite"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-bizbrew-text-secondary">Client *</Label>
              <Input
                value={client}
                onChange={(e) => setClient(e.target.value)}
                placeholder="Client name"
                className="bg-white/5 border-white/10 text-bizbrew-offwhite"
                required
              />
            </div>
            <div className="space-y-2">
              <Label className="text-bizbrew-text-secondary">Status *</Label>
              <Input
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                placeholder="Completed / In Development / Production"
                className="bg-white/5 border-white/10 text-bizbrew-offwhite"
                required
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Content */}
      <Card className="bg-white/5 border-white/10">
        <CardHeader>
          <CardTitle className="text-bizbrew-offwhite text-lg font-display">
            Content
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label className="text-bizbrew-text-secondary">Summary *</Label>
            <Textarea
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="A brief summary of the project..."
              className="bg-white/5 border-white/10 text-bizbrew-offwhite min-h-[80px]"
              required
            />
          </div>

          <div className="space-y-2">
            <Label className="text-bizbrew-text-secondary">Description *</Label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Detailed project description..."
              className="bg-white/5 border-white/10 text-bizbrew-offwhite min-h-[160px]"
              required
            />
          </div>

          {/* Image */}
          <div className="space-y-2">
            <Label className="text-bizbrew-text-secondary">Project Image *</Label>
            <div className="flex items-center gap-3">
              <Input
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="/project_ecommerce.jpg"
                className="bg-white/5 border-white/10 text-bizbrew-offwhite flex-1"
                required
              />
              <label className="cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, 'main')}
                  className="hidden"
                />
                <span className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-white/5 border border-white/10 text-bizbrew-text-secondary text-sm hover:bg-white/10 transition-colors">
                  <Upload className="w-4 h-4" />
                  {uploading ? 'Uploading...' : 'Upload'}
                </span>
              </label>
            </div>
            {image && (
              <img
                src={image}
                alt="Preview"
                className="w-32 h-20 object-cover rounded mt-2"
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
              />
            )}
          </div>
        </CardContent>
      </Card>

      {/* Tech & Platforms */}
      <Card className="bg-white/5 border-white/10">
        <CardHeader>
          <CardTitle className="text-bizbrew-offwhite text-lg font-display">
            Tech Stack & Platforms
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Stack tags */}
          <div className="space-y-2">
            <Label className="text-bizbrew-text-secondary">Tech Stack</Label>
            <div className="flex items-center gap-2">
              <Input
                value={stackInput}
                onChange={(e) => setStackInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addStackTag();
                  }
                }}
                placeholder="Add technology (press Enter)"
                className="bg-white/5 border-white/10 text-bizbrew-offwhite flex-1"
              />
              <Button
                type="button"
                onClick={addStackTag}
                variant="outline"
                size="sm"
                className="border-white/10 text-bizbrew-text-secondary hover:text-bizbrew-offwhite"
              >
                Add
              </Button>
            </div>
            {stack.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {stack.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/5 text-bizbrew-text-secondary text-sm border border-white/10"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeStackTag(tag)}
                      className="hover:text-red-400"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Platforms */}
          <div className="space-y-2">
            <Label className="text-bizbrew-text-secondary">Platforms</Label>
            <div className="flex gap-4">
              {PLATFORM_OPTIONS.map((p) => (
                <label key={p} className="flex items-center gap-2 cursor-pointer">
                  <Checkbox
                    checked={platforms.includes(p)}
                    onCheckedChange={() => togglePlatform(p)}
                  />
                  <span className="text-bizbrew-text-secondary text-sm">{p}</span>
                </label>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Features & Highlights */}
      <Card className="bg-white/5 border-white/10">
        <CardHeader>
          <CardTitle className="text-bizbrew-offwhite text-lg font-display">
            Features & Key Highlights
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Features */}
          <div className="space-y-2">
            <Label className="text-bizbrew-text-secondary">Features</Label>
            {features.map((f, i) => (
              <div key={i} className="flex items-center gap-2">
                <Input
                  value={f}
                  onChange={(e) => updateListItem(features, setFeatures, i, e.target.value)}
                  placeholder="Feature description"
                  className="bg-white/5 border-white/10 text-bizbrew-offwhite"
                />
                {features.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeListItem(features, setFeatures, i)}
                    className="p-2 text-bizbrew-text-secondary hover:text-red-400"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
            <Button
              type="button"
              onClick={() => addListItem(features, setFeatures)}
              variant="ghost"
              size="sm"
              className="text-bizbrew-amber hover:text-bizbrew-amber/80"
            >
              <Plus className="w-4 h-4 mr-1" />
              Add feature
            </Button>
          </div>

          {/* Highlights */}
          <div className="space-y-2">
            <Label className="text-bizbrew-text-secondary">Key Highlights</Label>
            {highlights.map((h, i) => (
              <div key={i} className="flex items-center gap-2">
                <Input
                  value={h}
                  onChange={(e) => updateListItem(highlights, setHighlights, i, e.target.value)}
                  placeholder="Key highlight"
                  className="bg-white/5 border-white/10 text-bizbrew-offwhite"
                />
                {highlights.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeListItem(highlights, setHighlights, i)}
                    className="p-2 text-bizbrew-text-secondary hover:text-red-400"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
            <Button
              type="button"
              onClick={() => addListItem(highlights, setHighlights)}
              variant="ghost"
              size="sm"
              className="text-bizbrew-amber hover:text-bizbrew-amber/80"
            >
              <Plus className="w-4 h-4 mr-1" />
              Add highlight
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* SEO Settings */}
      <Collapsible open={seoOpen} onOpenChange={setSeoOpen}>
        <Card className="bg-white/5 border-white/10">
          <CollapsibleTrigger asChild>
            <CardHeader className="cursor-pointer hover:bg-white/[0.02] transition-colors">
              <CardTitle className="text-bizbrew-offwhite text-lg font-display flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Eye className="w-5 h-5" />
                  SEO Settings
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-bizbrew-text-secondary transition-transform ${
                    seoOpen ? 'rotate-180' : ''
                  }`}
                />
              </CardTitle>
            </CardHeader>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CardContent className="space-y-4 pt-0">
              <p className="text-bizbrew-text-secondary text-sm">
                Customize how this project appears in search results. Leave blank to use defaults.
              </p>

              <div className="space-y-2">
                <Label className="text-bizbrew-text-secondary">SEO Title</Label>
                <Input
                  value={seoTitle}
                  onChange={(e) => setSeoTitle(e.target.value)}
                  placeholder={`${name || 'Project Name'} | BizBrew`}
                  className="bg-white/5 border-white/10 text-bizbrew-offwhite"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-bizbrew-text-secondary">SEO Description</Label>
                <Textarea
                  value={seoDescription}
                  onChange={(e) => setSeoDescription(e.target.value)}
                  placeholder={summary || 'Uses project summary by default'}
                  className="bg-white/5 border-white/10 text-bizbrew-offwhite min-h-[80px]"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-bizbrew-text-secondary">SEO Image</Label>
                <div className="flex items-center gap-3">
                  <Input
                    value={seoImage}
                    onChange={(e) => setSeoImage(e.target.value)}
                    placeholder={image || 'Uses project image by default'}
                    className="bg-white/5 border-white/10 text-bizbrew-offwhite flex-1"
                  />
                  <label className="cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, 'seo')}
                      className="hidden"
                    />
                    <span className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-white/5 border border-white/10 text-bizbrew-text-secondary text-sm hover:bg-white/10 transition-colors">
                      <Upload className="w-4 h-4" />
                      Upload
                    </span>
                  </label>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-bizbrew-text-secondary">SEO Keywords</Label>
                <Input
                  value={seoKeywords}
                  onChange={(e) => setSeoKeywords(e.target.value)}
                  placeholder="keyword1, keyword2, keyword3"
                  className="bg-white/5 border-white/10 text-bizbrew-offwhite"
                />
              </div>

              {/* Google Preview */}
              <div className="mt-6 p-4 rounded-lg bg-white/[0.02] border border-white/5">
                <p className="text-bizbrew-text-secondary text-xs font-mono mb-3">
                  Search result preview
                </p>
                <div className="space-y-1">
                  <p className="text-[#8ab4f8] text-lg leading-tight truncate">
                    {seoPreview.title}
                  </p>
                  <p className="text-[#bdc1c6] text-xs font-mono">
                    {seoPreview.url}
                  </p>
                  <p className="text-[#9aa0a6] text-sm leading-relaxed line-clamp-2">
                    {seoPreview.description}
                  </p>
                </div>
              </div>
            </CardContent>
          </CollapsibleContent>
        </Card>
      </Collapsible>

      {/* Submit */}
      <div className="flex items-center gap-3">
        <Button
          type="submit"
          disabled={saving}
          className="bg-bizbrew-amber text-bizbrew-charcoal hover:bg-bizbrew-amber/90"
        >
          <Save className="w-4 h-4 mr-2" />
          {saving ? 'Saving...' : isEditing ? 'Update Project' : 'Create Project'}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => navigate('/admin/projects')}
          className="border-white/10 text-bizbrew-text-secondary hover:text-bizbrew-offwhite"
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
