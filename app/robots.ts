import type { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/site';

const baseUrl = siteConfig.domain;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      // Includes Googlebot, Bingbot, and OAI-SearchBot; search access is intentional.
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/admin/'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}

