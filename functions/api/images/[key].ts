// GET /api/images/:key — serve image from R2 with cache headers

export const onRequestGet: PagesFunction<Env> = async (context) => {
  // The key may include path segments like "uploads/filename.jpg"
  // Cloudflare Pages Functions captures the full remaining path in params.key
  const key = context.params.key as string;

  const object = await context.env.R2.get(key);

  if (!object) {
    return new Response('Not found', { status: 404 });
  }

  const headers = new Headers();
  headers.set('Content-Type', object.httpMetadata?.contentType || 'application/octet-stream');
  headers.set('Cache-Control', 'public, max-age=31536000, immutable');
  headers.set('ETag', object.httpEtag);

  return new Response(object.body, { headers });
};
