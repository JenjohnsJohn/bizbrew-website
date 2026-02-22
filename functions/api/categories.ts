// GET /api/categories — distinct category list

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const { results } = await context.env.DB.prepare(
    'SELECT DISTINCT category FROM projects ORDER BY category'
  ).all();

  const categories = (results || []).map(
    (r: Record<string, unknown>) => r.category as string
  );

  return new Response(JSON.stringify(categories), {
    headers: { 'Content-Type': 'application/json' },
  });
};
