import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getVideo, getAllVideos, getGuide, getRelatedVideos } from '@/lib/content';
import { siteConfig, getHub } from '@/lib/site';
import { breadcrumbSchema, videoObjectSchema } from '@/lib/schema';
import { JsonLd } from '@/components/JsonLd';
import { Breadcrumbs } from '@/components/guides/Breadcrumbs';
import { YouTubeEmbed } from '@/components/guides/YouTubeEmbed';
import { EmailCaptureForm } from '@/components/guides/EmailCaptureForm';
import { VideoCard } from '@/components/cards/VideoCard';
import { Eyebrow, Panel, Tag } from '@/components/ui/kit';
import { formatDate } from '@/lib/format';
import { CheckCircle2, Clock, ArrowRight } from 'lucide-react';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllVideos().map((v) => ({ slug: v.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const video = getVideo(slug);
  if (!video) return { title: 'Video Not Found' };

  return {
    title: `${video.title} | ${siteConfig.name}`,
    description: video.excerpt,
    alternates: { canonical: `${siteConfig.domain}/videos/${video.slug}` },
    openGraph: {
      title: video.title,
      description: video.excerpt,
      type: 'video.other',
      images: [`https://i.ytimg.com/vi/${video.youtubeVideoId}/hqdefault.jpg`],
    },
  };
}

export default async function VideoPage({ params }: PageProps) {
  const { slug } = await params;
  const video = getVideo(slug);
  if (!video) notFound();

  const hub = getHub(video.hub);
  const companion = video.relatedGuideSlug ? getGuide(video.relatedGuideSlug) : undefined;
  const related = getRelatedVideos(video.relatedVideos, 3).filter((v) => v.slug !== slug);

  const crumbs = [
    { label: 'Home', href: '/' },
    { label: 'Videos', href: '/videos' },
    { label: video.title, href: `/videos/${video.slug}` },
  ];

  return (
    <main className="min-h-screen bg-background">
      <JsonLd data={breadcrumbSchema(crumbs.map((c) => ({ name: c.label, url: c.href })))} />
      <JsonLd
        data={videoObjectSchema({
          name: video.title,
          description: video.excerpt,
          youtubeVideoId: video.youtubeVideoId,
          uploadDate: video.publishedAt,
        })}
      />

      <article className="mx-auto max-w-3xl px-4 py-10 sm:py-14">
        <Breadcrumbs crumbs={crumbs} />

        <header className="mt-6">
          <div className="flex flex-wrap items-center gap-2">
            <Tag tone="gold">{hub.shortName}</Tag>
            <Tag tone="muted">{video.topic}</Tag>
            <Tag tone="muted">{video.duration}</Tag>
          </div>
          <h1 className="mt-4 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {video.title}
          </h1>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
            {video.promise}
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-xs uppercase tracking-wider text-muted-foreground">
            <span>By {siteConfig.name}</span>
            <span aria-hidden="true">/</span>
            <span>{formatDate(video.publishedAt)}</span>
          </div>
        </header>

        <div className="mt-8">
          <YouTubeEmbed videoId={video.youtubeVideoId} title={video.title} />
        </div>

        <div className="mt-8 text-pretty leading-relaxed text-muted-foreground">
          <p>{video.summary}</p>
        </div>

        {/* Companion guide CTA */}
        {companion && (
          <Panel className="mt-8 border-primary/25 bg-primary/5">
            <span className="font-mono text-xs uppercase tracking-[0.15em] text-primary">
              Written companion guide
            </span>
            <h2 className="mt-2 text-lg font-bold text-foreground">{companion.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{companion.excerpt}</p>
            <Link
              href={`/guides/${companion.slug}`}
              className="mt-4 inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-primary hover:text-primary/80"
            >
              Read the full guide <ArrowRight className="h-3 w-3" aria-hidden="true" />
            </Link>
          </Panel>
        )}

        {/* Key takeaways */}
        {video.keyTakeaways.length > 0 && (
          <section className="mt-10">
            <h2 className="text-xl font-bold text-foreground">Key takeaways</h2>
            <ul className="mt-4 space-y-2">
              {video.keyTakeaways.map((t) => (
                <li key={t} className="flex items-start gap-2 text-foreground">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" aria-hidden="true" />
                  <span className="leading-relaxed">{t}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Timestamps */}
        {video.timestamps.length > 0 && (
          <section className="mt-10">
            <h2 className="flex items-center gap-2 text-xl font-bold text-foreground">
              <Clock className="h-5 w-5 text-primary" aria-hidden="true" />
              Chapters
            </h2>
            <ul className="mt-4 divide-y divide-border/60 overflow-hidden rounded-lg border border-border">
              {video.timestamps.map((ts) => (
                <li key={ts.time} className="flex items-center gap-4 bg-card px-4 py-3">
                  <span className="font-mono text-sm font-semibold text-primary">{ts.time}</span>
                  <span className="text-sm text-foreground">{ts.label}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        <div className="mt-12">
          <EmailCaptureForm />
        </div>

        {related.length > 0 && (
          <section className="mt-14 border-t border-border pt-10">
            <Eyebrow className="mb-4">Keep watching</Eyebrow>
            <h2 className="mb-6 text-2xl font-bold text-foreground">Related videos</h2>
            <div className="grid gap-5 sm:grid-cols-3">
              {related.map((v) => (
                <VideoCard key={v.slug} video={v} />
              ))}
            </div>
          </section>
        )}

        <div className="mt-12">
          <Link
            href="/videos"
            className="font-mono text-xs uppercase tracking-[0.15em] text-primary hover:text-primary/80"
          >
            ← All videos
          </Link>
        </div>
      </article>
    </main>
  );
}
