// GET /api/projects — list all projects (optional ?category= filter)
// POST /api/projects — create a new project (auth required)

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

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const url = new URL(context.request.url);
  const category = url.searchParams.get('category');

  let stmt;
  if (category) {
    stmt = context.env.DB.prepare(
      'SELECT * FROM projects WHERE category = ? ORDER BY id DESC'
    ).bind(category);
  } else {
    stmt = context.env.DB.prepare('SELECT * FROM projects ORDER BY id DESC');
  }

  const { results } = await stmt.all();
  const projects = (results || []).map(parseRow);

  return new Response(JSON.stringify(projects), {
    headers: { 'Content-Type': 'application/json' },
  });
};

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const body = (await context.request.json()) as Record<string, unknown>;

  const {
    slug, name, category, year, summary, description, image,
    stack, platforms, features, highlights, client, status,
    seo_title, seo_description, seo_image, seo_keywords,
  } = body;

  if (!slug || !name || !category || !year || !summary || !description || !image || !client || !status) {
    return new Response(
      JSON.stringify({ error: 'Missing required fields' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  const stmt = context.env.DB.prepare(`
    INSERT INTO projects (slug, name, category, year, summary, description, image, stack, platforms, features, highlights, client, status, seo_title, seo_description, seo_image, seo_keywords)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).bind(
    slug, name, category, year, summary, description, image,
    JSON.stringify(stack || []),
    JSON.stringify(platforms || []),
    JSON.stringify(features || []),
    JSON.stringify(highlights || []),
    client, status,
    seo_title || null,
    seo_description || null,
    seo_image || null,
    seo_keywords || null,
  );

  try {
    await stmt.run();
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    if (message.includes('UNIQUE constraint failed')) {
      return new Response(
        JSON.stringify({ error: 'A project with this slug already exists' }),
        { status: 409, headers: { 'Content-Type': 'application/json' } }
      );
    }
    return new Response(
      JSON.stringify({ error: message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }

  const created = await context.env.DB.prepare(
    'SELECT * FROM projects WHERE slug = ?'
  ).bind(slug).first();

  return new Response(JSON.stringify(parseRow(created as Record<string, unknown>)), {
    status: 201,
    headers: { 'Content-Type': 'application/json' },
  });
};
