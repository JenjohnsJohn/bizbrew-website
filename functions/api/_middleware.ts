export const onRequest: PagesFunction<Env>[] = [
  async (context) => {
    const { request } = context;
    const url = new URL(request.url);
    const method = request.method;

    // Public endpoints: GET requests to project/category listing
    const isPublicGet =
      method === 'GET' &&
      (url.pathname.startsWith('/api/projects') ||
        url.pathname.startsWith('/api/categories') ||
        url.pathname.startsWith('/api/images'));

    if (isPublicGet) {
      return context.next();
    }

    // All other requests require auth
    const authHeader = request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const token = authHeader.slice(7);
    if (token !== context.env.ADMIN_TOKEN) {
      return new Response(JSON.stringify({ error: 'Invalid token' }), {
        status: 403,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return context.next();
  },
];
