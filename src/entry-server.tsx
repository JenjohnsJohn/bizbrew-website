import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';

import { AppRoutesSSR } from './App-ssr';

/**
 * Renders the app for a given URL. Used for prerendering static HTML.
 */
export function render(url: string): string {
  return renderToString(
    <StaticRouter location={url}>
      <AppRoutesSSR />
    </StaticRouter>
  );
}
