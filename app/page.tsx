import type { Metadata } from 'next';
import { Hero } from '@/components/home/Hero';
import { HubGrid } from '@/components/home/HubGrid';
import { FeaturedGuides, LatestVideos } from '@/components/home/Sections';
import { getAllGuides, getAllVideos } from '@/lib/content';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: { absolute: siteConfig.name },
  description: siteConfig.description,
  alternates: { canonical: siteConfig.domain },
  openGraph: { title: siteConfig.name, description: siteConfig.description, type: 'website' },
};

export default function HomePage() {
  const guides = getAllGuides();
  const videos = getAllVideos();
  return (
    <main>
      <Hero guideCount={guides.length} videoCount={videos.length} />
      <HubGrid guides={guides} />
      <FeaturedGuides guides={guides.slice(0, 6)} />
      <LatestVideos videos={videos.slice(0, 4)} />
    </main>
  );
}
