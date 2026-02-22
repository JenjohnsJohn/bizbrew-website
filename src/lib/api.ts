import type { Project } from '@/data/projects';

export interface ProjectSEO {
  title: string;
  description: string;
  image: string;
  keywords: string | null;
}

export interface ProjectWithSEO extends Project {
  id: number;
  seo: ProjectSEO;
  seo_title: string | null;
  seo_description: string | null;
  seo_image: string | null;
  seo_keywords: string | null;
  created_at: string;
  updated_at: string;
}

export interface ProjectInput {
  slug: string;
  name: string;
  category: string;
  year: string;
  summary: string;
  description: string;
  image: string;
  stack: string[];
  platforms: string[];
  features: string[];
  highlights: string[];
  client: string;
  status: string;
  seo_title?: string | null;
  seo_description?: string | null;
  seo_image?: string | null;
  seo_keywords?: string | null;
}

const API_BASE = '/api';

async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, options);
  if (!res.ok) {
    const body = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error((body as Record<string, string>).error || res.statusText);
  }
  return res.json() as Promise<T>;
}

function authHeaders(token: string): HeadersInit {
  return {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };
}

// Public endpoints

export async function fetchProjects(category?: string): Promise<ProjectWithSEO[]> {
  const params = category ? `?category=${encodeURIComponent(category)}` : '';
  return apiFetch<ProjectWithSEO[]>(`/projects${params}`);
}

export async function fetchProject(slug: string): Promise<ProjectWithSEO | null> {
  try {
    return await apiFetch<ProjectWithSEO>(`/projects/${encodeURIComponent(slug)}`);
  } catch {
    return null;
  }
}

export async function fetchCategories(): Promise<string[]> {
  return apiFetch<string[]>('/categories');
}

// Auth endpoints

export async function verifyToken(token: string): Promise<boolean> {
  try {
    await apiFetch<{ valid: boolean }>('/auth/verify', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return true;
  } catch {
    return false;
  }
}

// Admin endpoints

export async function createProject(
  token: string,
  data: ProjectInput
): Promise<ProjectWithSEO> {
  return apiFetch<ProjectWithSEO>('/projects', {
    method: 'POST',
    headers: authHeaders(token),
    body: JSON.stringify(data),
  });
}

export async function updateProject(
  token: string,
  slug: string,
  data: ProjectInput
): Promise<ProjectWithSEO> {
  return apiFetch<ProjectWithSEO>(`/projects/${encodeURIComponent(slug)}`, {
    method: 'PUT',
    headers: authHeaders(token),
    body: JSON.stringify(data),
  });
}

export async function deleteProject(
  token: string,
  slug: string
): Promise<void> {
  await apiFetch<{ success: boolean }>(`/projects/${encodeURIComponent(slug)}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });
}

export async function uploadImage(
  token: string,
  file: File
): Promise<{ url: string; key: string }> {
  const formData = new FormData();
  formData.append('file', file);

  const res = await fetch(`${API_BASE}/upload`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error((body as Record<string, string>).error || res.statusText);
  }

  return res.json() as Promise<{ url: string; key: string }>;
}
