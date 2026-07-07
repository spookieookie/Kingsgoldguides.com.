import type { Metadata } from 'next';
import { Hero } from '@/components/home/Hero';
import { HubGrid } from '@/components/home/HubGrid';
import {
  FlagshipBand,
  GoldLeaderboard,
  FeaturedGuides,
  LatestVideos,
  DataBriefsBand,
  ToolsBand,
  BeginnerPathBand,
} from '@/components/home/Sections';
import { NewsletterBand } from '@/components/home/NewsletterBand';
import {
  getAllGuides,
  getAllVideos,
  getFeaturedGuides,
  getFeaturedVideos,
  getTopGoldGuides,
  getGuide,
  dataBriefs,
  tools,
  beginnerPaths,
} from '@/lib/content';
import { hubs, siteConfig, type HubKey } from '@/lib/site';
import { formatGoldRange } from '@/lib/format';

export const metadata: Metadata = {
  title: `${siteConfig.name} — The WoW Gold Command Center`,
  description: siteConfig.description,
  openGraph: {
    title: `${siteConfig.name} — The WoW Gold Command Center`,
    description: siteConfig.description,
    type: 'website',
  },
};

export default function HomePage() {
  const allGuides = getAllGuides();
  const allVideos = getAllVideos();
  const topGold = getTopGoldGuides(6);
  const featuredGuides = getFeaturedGuides(6);
  const featuredVideos = getFeaturedVideos(4);
  const flagship = getGuide('darkmoon-firewater-farm') ?? topGold[0];

  const counts = hubs.reduce(
    (acc, hub) => {
      acc[hub.key] = allGuides.filter((g) => g.hub === hub.key).length;
      return acc;
    },
    {} as Record<HubKey, number>,
  );

  const topRoute = topGold[0];
  const topGoldPerHour = topRoute
    ? formatGoldRange(topRoute.goldPerHourLow, topRoute.goldPerHourHigh)
    : '—';

  return (
    <>
      <Hero
        guideCount={allGuides.length}
        videoCount={allVideos.length}
        topGoldPerHour={topGoldPerHour}
      />
      <HubGrid counts={counts} />
      {flagship && <FlagshipBand guide={flagship} />}
      <GoldLeaderboard guides={topGold} />
      <FeaturedGuides guides={featuredGuides} />
      <LatestVideos videos={featuredVideos.length ? featuredVideos : allVideos.slice(0, 4)} />
      <DataBriefsBand briefs={dataBriefs.slice(0, 3)} />
      <ToolsBand tools={tools} />
      <BeginnerPathBand paths={beginnerPaths} />
      <NewsletterBand />
    </>
  );
}
