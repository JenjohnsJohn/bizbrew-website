import { useEffect } from 'react';
import { setSEO, type SEOProps } from '../lib/seo';

export default function SEO(props: SEOProps) {
  const { path, title, description, image, type, jsonLd } = props;
  useEffect(() => {
    setSEO({ path, title, description, image, type, jsonLd });
  }, [path, title, description, image, type, jsonLd]);

  return null;
}
