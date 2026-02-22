CREATE TABLE IF NOT EXISTS projects (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  year TEXT NOT NULL,
  summary TEXT NOT NULL,
  description TEXT NOT NULL,
  image TEXT NOT NULL,
  stack TEXT NOT NULL,           -- JSON array
  platforms TEXT NOT NULL,       -- JSON array
  features TEXT NOT NULL,        -- JSON array
  highlights TEXT NOT NULL,      -- JSON array
  client TEXT NOT NULL,
  status TEXT NOT NULL,
  -- SEO metadata fields
  seo_title TEXT,               -- Custom SEO title (fallback: "{name} | BizBrew")
  seo_description TEXT,         -- Custom meta description (fallback: summary)
  seo_image TEXT,               -- Custom OG image (fallback: image)
  seo_keywords TEXT,            -- Comma-separated keywords for meta tag
  -- Timestamps
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

CREATE INDEX idx_projects_category ON projects(category);
CREATE INDEX idx_projects_slug ON projects(slug);
