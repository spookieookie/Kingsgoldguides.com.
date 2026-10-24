import { locales, translatedSlugs } from '@/lib/locales';
import { translations } from '@/lib/content/translations';
import type { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/site';
import { getAllGuides, getAllVideos, getAllPosts } from '@/lib/content';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.domain.replace(/\/$/, '');
  const staticRoutes = [
    { path: '', priority: 1 },
    { path: '/guides', priority: 0.9 },
    { path: '/videos', priority: 0.8 },
    { path: '/about', priority: 0.5 },
    { path: '/authors/king-kunta', priority: 0.5 },
    { path: '/contact', priority: 0.4 },
    { path: '/privacy', priority: 0.3 },
    { path: '/terms', priority: 0.3 },
    { path: '/editorial', priority: 0.4 },
  ].map((route) => ({
    url: `${base}${route.path}`,
    changeFrequency: 'weekly' as const,
    priority: route.priority,
  }));
  const guideRoutes = getAllGuides().map((guide) => ({
    url: `${base}/guides/${guide.slug}`,
    lastModified: new Date(guide.updatedAt || guide.publishedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));
  const videoRoutes = getAllVideos().map((video) => ({
    url: `${base}/videos/${video.slug}`,
    lastModified: new Date(video.publishedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));
  const postRoutes = getAllPosts().map((post) => ({
    url: `${base}/posts/${post.slug}`,
    lastModified: new Date(post.updatedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));
  const localizedRoutes = locales.flatMap(locale => [
    { url: `${base}/${locale}`, lastModified: new Date('2026-10-23'), changeFrequency: 'weekly' as const, priority: 0.6 },
    ...translatedSlugs.map(slug => ({ url: `${base}/${locale}/guides/${slug}`, lastModified: new Date(translations[locale][slug].translatedAt), changeFrequency: 'monthly' as const, priority: 0.7 })),
  ]);
  return [...staticRoutes, ...guideRoutes, ...videoRoutes, ...postRoutes, ...localizedRoutes];
}
