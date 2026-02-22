interface Env {
  DB: D1Database;
  R2: R2Bucket;
  ADMIN_TOKEN: string;
}

type ApiContext = EventContext<Env, string, Record<string, unknown>>;
