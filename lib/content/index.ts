import { guides } from './guides';
import { videos } from './videos';
import { dataBriefs, tools, beginnerPaths, author } from './meta';
import type { GuidePage, VideoPage } from './types';
import type { HubKey } from '@/lib/site';

export { guides, videos, dataBriefs, tools, beginnerPaths, author };
export * from './types';

/* ---------- Guides ---------- */

export function getAllGuides(): GuidePage[] {
  return [...guides].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
}

export function getGuide(slug: string): GuidePage | undefined {
  return guides.find((g) => g.slug === slug);
}

export function getGuidesByHub(hub: HubKey): GuidePage[] {
  return getAllGuides().filter((g) => g.hub === hub);
}

export function getFeaturedGuides(limit?: number): GuidePage[] {
  const featured = getAllGuides().filter((g) => g.featured);
  return typeof limit === 'number' ? featured.slice(0, limit) : featured;
}

export function getRelatedGuides(slug: string, limit = 3): GuidePage[] {
  const guide = getGuide(slug);
  if (!guide) return [];
  const explicit = guide.relatedGuides
    .map((s) => getGuide(s))
    .filter((g): g is GuidePage => Boolean(g));
  if (explicit.length >= limit) return explicit.slice(0, limit);
  const sameHub = getGuidesByHub(guide.hub).filter(
    (g) => g.slug !== slug && !explicit.includes(g),
  );
  return [...explicit, ...sameHub].slice(0, limit);
}

export function getTopGoldGuides(limit = 6): GuidePage[] {
  return [...guides]
    .sort((a, b) => b.goldPerHourHigh - a.goldPerHourHigh)
    .slice(0, limit);
}

/* ---------- Videos ---------- */

export function getAllVideos(): VideoPage[] {
  return [...videos].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
}

export function getVideo(slug: string): VideoPage | undefined {
  return videos.find((v) => v.slug === slug);
}

export function getVideosByHub(hub: HubKey): VideoPage[] {
  return getAllVideos().filter((v) => v.hub === hub);
}

export function getFeaturedVideos(limit?: number): VideoPage[] {
  const featured = getAllVideos().filter((v) => v.featured);
  return typeof limit === 'number' ? featured.slice(0, limit) : featured;
}

export function getRelatedVideos(slugs: string[], limit = 3): VideoPage[] {
  return slugs
    .map((s) => getVideo(s))
    .filter((v): v is VideoPage => Boolean(v))
    .slice(0, limit);
}

/* ---------- Tools & briefs ---------- */

export function getTool(slug: string) {
  return tools.find((t) => t.slug === slug);
}

export function getBrief(slug: string) {
  return dataBriefs.find((b) => b.slug === slug);
}
