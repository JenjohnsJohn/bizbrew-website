// POST /api/upload — upload image to R2, return public URL (auth required)

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const formData = await context.request.formData();
  const file = formData.get('file') as File | null;

  if (!file) {
    return new Response(JSON.stringify({ error: 'No file provided' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Generate a unique key with timestamp prefix
  const ext = file.name.split('.').pop() || 'bin';
  const key = `uploads/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, '_')}.${ext}`;

  await context.env.R2.put(key, file.stream(), {
    httpMetadata: {
      contentType: file.type,
    },
  });

  const url = `/api/images/${key}`;

  return new Response(JSON.stringify({ url, key }), {
    status: 201,
    headers: { 'Content-Type': 'application/json' },
  });
};
