// GET /api/projects/:slug — single project with computed SEO
// PUT /api/projects/:slug — update project (auth required)
// DELETE /api/projects/:slug — delete project (auth required)

const JSON_FIELDS = ['stack', 'platforms', 'features', 'highlights'];

function parseRow(row: Record<string, unknown>) {
  const parsed = { ...row };
  for (const field of JSON_FIELDS) {
    if (typeof parsed[field] === 'string') {
      try {
        parsed[field] = JSON.parse(parsed[field] as string);
      } catch {
        parsed[field] = [];
      }
    }
  }
  return parsed;
}

function withSEO(project: Record<string, unknown>) {
  return {
    ...project,
    seo: {
      title: project.seo_title || `${project.name} | BizBrew`,
      description: project.seo_description || project.summary,
      image: project.seo_image || project.image,
      keywords: project.seo_keywords || null,
    },
  };
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const slug = context.params.slug as string;

  const row = await context.env.DB.prepare(
    'SELECT * FROM projects WHERE slug = ?'
  ).bind(slug).first();

  if (!row) {
    return new Response(JSON.stringify({ error: 'Project not found' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const project = withSEO(parseRow(row as Record<string, unknown>));

  return new Response(JSON.stringify(project), {
    headers: { 'Content-Type': 'application/json' },
  });
};

export const onRequestPut: PagesFunction<Env> = async (context) => {
  const slug = context.params.slug as string;
  const body = (await context.request.json()) as Record<string, unknown>;

  const existing = await context.env.DB.prepare(
    'SELECT id FROM projects WHERE slug = ?'
  ).bind(slug).first();

  if (!existing) {
    return new Response(JSON.stringify({ error: 'Project not found' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const {
    name, category, year, summary, description, image,
    stack, platforms, features, highlights, client, status,
    seo_title, seo_description, seo_image, seo_keywords,
  } = body;

  // Allow partial updates — use slug from URL, allow changing other fields
  const newSlug = (body.slug as string) || slug;

  const stmt = context.env.DB.prepare(`
    UPDATE projects SET
      slug = ?, name = ?, category = ?, year = ?, summary = ?, description = ?,
      image = ?, stack = ?, platforms = ?, features = ?, highlights = ?,
      client = ?, status = ?,
      seo_title = ?, seo_description = ?, seo_image = ?, seo_keywords = ?,
      updated_at = datetime('now')
    WHERE slug = ?
  `).bind(
    newSlug, name, category, year, summary, description, image,
    JSON.stringify(stack || []),
    JSON.stringify(platforms || []),
    JSON.stringify(features || []),
    JSON.stringify(highlights || []),
    client, status,
    seo_title || null,
    seo_description || null,
    seo_image || null,
    seo_keywords || null,
    slug,
  );

  await stmt.run();

  const updated = await context.env.DB.prepare(
    'SELECT * FROM projects WHERE slug = ?'
  ).bind(newSlug).first();

  return new Response(JSON.stringify(parseRow(updated as Record<string, unknown>)), {
    headers: { 'Content-Type': 'application/json' },
  });
};

export const onRequestDelete: PagesFunction<Env> = async (context) => {
  const slug = context.params.slug as string;

  const existing = await context.env.DB.prepare(
    'SELECT id FROM projects WHERE slug = ?'
  ).bind(slug).first();

  if (!existing) {
    return new Response(JSON.stringify({ error: 'Project not found' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  await context.env.DB.prepare('DELETE FROM projects WHERE slug = ?')
    .bind(slug)
    .run();

  return new Response(JSON.stringify({ success: true }), {
    headers: { 'Content-Type': 'application/json' },
  });
};
