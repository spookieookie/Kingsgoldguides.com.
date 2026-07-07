import type { MetadataRoute } from 'next';
import { siteConfig, hubs } from '@/lib/site';
import { getAllGuides, getAllVideos, tools } from '@/lib/content';
import { darkmoonFirewater } from '@/lib/content/flagship';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.domain.replace(/\/$/, '');
  const now = new Date();

  const staticRoutes = [
    { path: '', priority: 1 },
    { path: '/videos', priority: 0.8 },
    { path: '/tools', priority: 0.7 },
    { path: '/about', priority: 0.5 },
    { path: '/authors/king-kunta', priority: 0.5 },
    { path: '/contact', priority: 0.4 },
  ].map((r) => ({
    url: `${base}${r.path}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: r.priority,
  }));

  const hubRoutes = hubs.map((h) => ({
    url: `${base}${h.href}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const guideRoutes = getAllGuides().map((g) => ({
    url: `${base}/guides/${g.slug}`,
    lastModified: new Date(g.updatedAt || g.publishedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const videoRoutes = getAllVideos().map((v) => ({
    url: `${base}/videos/${v.slug}`,
    lastModified: new Date(v.publishedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  const toolRoutes = tools.map((t) => ({
    url: `${base}/tools/${t.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  const flagshipRoute = {
    url: `${base}/economy/${darkmoonFirewater.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  };

  return [
    ...staticRoutes,
    ...hubRoutes,
    flagshipRoute,
    ...guideRoutes,
    ...videoRoutes,
    ...toolRoutes,
  ];
}
