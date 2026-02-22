// GET /api/auth/verify — verify admin token (auth required via middleware)

export const onRequestGet: PagesFunction<Env> = async () => {
  // If we reach here, the middleware already verified the token
  return new Response(JSON.stringify({ valid: true }), {
    headers: { 'Content-Type': 'application/json' },
  });
};
