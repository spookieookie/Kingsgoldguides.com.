import Link from 'next/link';
import { ArrowRight, Flame, TrendingUp, Calculator, Compass } from 'lucide-react';
import type { GuidePage, VideoPage, DataBrief, ToolPage, BeginnerPath } from '@/lib/content/types';
import { Section, SectionHeader, ArrowLink, Tag, Eyebrow } from '@/components/ui/kit';
import { GuideCard } from '@/components/cards/GuideCard';
import { VideoCard } from '@/components/cards/VideoCard';
import { formatGoldRange, riskTone } from '@/lib/format';
import { getHub } from '@/lib/site';

/* Flagship deep-dive band */
export function FlagshipBand({ guide }: { guide: GuidePage }) {
  return (
    <Section className="bg-grid">
      <div className="grid items-center gap-10 lg:grid-cols-2">
        <div>
          <Eyebrow className="mb-4">
            <Flame className="h-3.5 w-3.5" aria-hidden="true" /> Flagship breakdown
          </Eyebrow>
          <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            {guide.title}
          </h2>
          <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
            {guide.tldr}
          </p>
          <div className="mt-6 flex flex-wrap gap-6">
            <div>
              <div className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                Gold / hour
              </div>
              <div className="text-2xl font-bold text-primary">
                {formatGoldRange(guide.goldPerHourLow, guide.goldPerHourHigh)}
              </div>
            </div>
            <div>
              <div className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                Setup cost
              </div>
              <div className="text-2xl font-bold text-foreground">{guide.setupCost}</div>
            </div>
            <div>
              <div className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                Risk
              </div>
              <div className="text-2xl font-bold text-foreground">{guide.riskLevel}</div>
            </div>
          </div>
          <Link
            href={`/guides/${guide.slug}`}
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Read the full breakdown
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
        <div className="relative overflow-hidden rounded-xl border border-border">
          <div className="relative aspect-video bg-secondary">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`https://i.ytimg.com/vi/${guide.youtubeVideoId}/hqdefault.jpg`}
              alt=""
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </Section>
  );
}

/* Top gold right now — leaderboard table */
export function GoldLeaderboard({ guides }: { guides: GuidePage[] }) {
  return (
    <Section>
      <SectionHeader
        eyebrow="Live board"
        title="Top gold right now"
        description="Ranked by peak gold-per-hour from our latest testing passes."
        action={<ArrowLink href="/guides">All gold guides</ArrowLink>}
      />
      <div className="overflow-hidden rounded-xl border border-border">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-border bg-secondary/60">
            <tr className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
              <th className="p-4">#</th>
              <th className="p-4">Method</th>
              <th className="hidden p-4 md:table-cell">Hub</th>
              <th className="p-4 text-right">Gold/hr</th>
              <th className="hidden p-4 text-right sm:table-cell">Risk</th>
            </tr>
          </thead>
          <tbody>
            {guides.map((guide, i) => (
              <tr
                key={guide.slug}
                className="border-b border-border/50 last:border-0 hover:bg-secondary/40"
              >
                <td className="p-4 font-mono text-muted-foreground">
                  {String(i + 1).padStart(2, '0')}
                </td>
                <td className="p-4">
                  <Link
                    href={`/guides/${guide.slug}`}
                    className="font-semibold text-foreground hover:text-primary"
                  >
                    {guide.title}
                  </Link>
                </td>
                <td className="hidden p-4 text-muted-foreground md:table-cell">
                  {getHub(guide.hub).shortName}
                </td>
                <td className="p-4 text-right font-bold text-primary">
                  {formatGoldRange(guide.goldPerHourLow, guide.goldPerHourHigh)}
                </td>
                <td className="hidden p-4 text-right sm:table-cell">
                  <Tag tone={riskTone[guide.riskLevel]}>{guide.riskLevel}</Tag>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Section>
  );
}

/* Featured guides grid */
export function FeaturedGuides({ guides }: { guides: GuidePage[] }) {
  return (
    <Section>
      <SectionHeader
        eyebrow="Editor's picks"
        title="Featured guides"
        description="The routes and flips we'd run first this patch."
        action={<ArrowLink href="/guides">Browse all</ArrowLink>}
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {guides.map((guide) => (
          <GuideCard key={guide.slug} guide={guide} />
        ))}
      </div>
    </Section>
  );
}

/* Latest videos */
export function LatestVideos({ videos }: { videos: VideoPage[] }) {
  return (
    <Section className="bg-grid">
      <SectionHeader
        eyebrow="From the channel"
        title="Latest video breakdowns"
        description="Every guide is paired with a King Kunta video walkthrough."
        action={<ArrowLink href="/videos">All videos</ArrowLink>}
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {videos.map((video) => (
          <VideoCard key={video.slug} video={video} />
        ))}
      </div>
    </Section>
  );
}

/* Data briefs */
export function DataBriefsBand({ briefs }: { briefs: DataBrief[] }) {
  return (
    <Section>
      <SectionHeader
        eyebrow="Economy desk"
        title="Market briefs"
        description="Short, data-led reads on where the gold is moving."
        action={<ArrowLink href="/economy">Economy hub</ArrowLink>}
      />
      <div className="grid gap-4 md:grid-cols-3">
        {briefs.map((brief) => (
          <Link
            key={brief.slug}
            href={`/economy/${brief.slug}`}
            className="group flex flex-col rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary/40"
          >
            <TrendingUp className="mb-4 h-5 w-5 text-primary" aria-hidden="true" />
            <h3 className="text-pretty text-lg font-bold leading-snug text-foreground group-hover:text-primary">
              {brief.title}
            </h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
              {brief.excerpt}
            </p>
            <span className="mt-4 font-mono text-xs uppercase tracking-wider text-muted-foreground">
              {brief.category}
            </span>
          </Link>
        ))}
      </div>
    </Section>
  );
}

/* Tools teaser */
export function ToolsBand({ tools }: { tools: ToolPage[] }) {
  return (
    <Section className="bg-grid">
      <SectionHeader
        eyebrow="Utilities"
        title="Free gold-making tools"
        description="Quick calculators to price flips and plan farms — no login required."
        action={<ArrowLink href="/tools">All tools</ArrowLink>}
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {tools.map((tool) => (
          <Link
            key={tool.slug}
            href={`/tools/${tool.slug}`}
            className="group flex flex-col rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary/40"
          >
            <Calculator className="mb-3 h-5 w-5 text-primary" aria-hidden="true" />
            <h3 className="text-base font-bold text-foreground group-hover:text-primary">
              {tool.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {tool.tagline}
            </p>
          </Link>
        ))}
      </div>
    </Section>
  );
}

/* Beginner path */
export function BeginnerPathBand({ paths }: { paths: BeginnerPath[] }) {
  return (
    <Section>
      <SectionHeader
        eyebrow="New to gold-making?"
        title="Start here"
        description="A three-step path from broke to comfortable, then rich."
      />
      <ol className="grid gap-4 md:grid-cols-3">
        {paths.map((path, i) => (
          <li
            key={path.title}
            className="relative flex flex-col rounded-xl border border-border bg-card p-6"
          >
            <span className="font-mono text-3xl font-bold text-primary/30">
              {String(i + 1).padStart(2, '0')}
            </span>
            <Compass className="mt-2 h-5 w-5 text-primary" aria-hidden="true" />
            <h3 className="mt-3 text-lg font-bold text-foreground">{path.title}</h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
              {path.description}
            </p>
            <Link
              href={path.href}
              className="mt-4 inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-primary hover:text-primary/80"
            >
              Start here <ArrowRight className="h-3 w-3" aria-hidden="true" />
            </Link>
          </li>
        ))}
      </ol>
    </Section>
  );
}
