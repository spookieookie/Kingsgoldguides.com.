import type { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/site';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || siteConfig.domain;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/admin/'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
