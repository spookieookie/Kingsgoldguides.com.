import type { Metadata } from 'next';
import { notFound, permanentRedirect } from 'next/navigation';
import Link from 'next/link';
import { getGuide, getAllGuides, getRelatedGuides, getRelatedVideos } from '@/lib/content';
import { getGuideBySlug } from '@/lib/mdx';
import { siteConfig } from '@/lib/site';
import {
  articleSchema,
  breadcrumbSchema,
  faqSchema,
  videoObjectSchema,
} from '@/lib/schema';
import { JsonLd } from '@/components/JsonLd';
import { Breadcrumbs } from '@/components/guides/Breadcrumbs';
import { YouTubeEmbed } from '@/components/guides/YouTubeEmbed';
import { FAQAccordion } from '@/components/guides/FAQAccordion';
import { GuideBody } from '@/components/guide/GuideBody';
import { GuideCard } from '@/components/cards/GuideCard';
import { VideoCard } from '@/components/cards/VideoCard';
import { Eyebrow, Tag } from '@/components/ui/kit';
import { formatDate } from '@/lib/format';
import { getGuideGroup } from '@/lib/guide-groups';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllGuides().map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return { title: { absolute: siteConfig.name } };

  return {
    title: { absolute: guide.seoTitle },
    description: guide.metaDescription,
    alternates: { canonical: guide.canonicalUrl },
    openGraph: {
      url: `${siteConfig.domain}/guides/${guide.slug}`,
      title: guide.seoTitle,
      description: guide.metaDescription,
      type: 'article',
      publishedTime: guide.publishedAt,
      modifiedTime: guide.updatedAt,
      authors: [siteConfig.name],
      images: guide.heroImage ? [guide.heroImage] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: guide.seoTitle,
      description: guide.metaDescription,
      images: guide.heroImage ? [guide.heroImage] : undefined,
    },
  };
}

export default async function GuidePage({ params }: PageProps) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide && ['wow-auction-house-flipping-safe-niches', 'wow-crafting-arbitrage-materials', 'wow-economy-best-time-to-sell-mats', 'wow-professions-alchemy-flasks'].includes(slug)) permanentRedirect('/guides#auction-house');
  if (!guide) notFound();

  // Real guides carry an mdxSlug -> render the full written route from MDX.
  const mdx = guide.mdxSlug ? await getGuideBySlug(guide.mdxSlug) : null;

  const related = getRelatedGuides(slug, 3);
  const relatedVideos = getRelatedVideos(guide.relatedVideos, 2);
  const group = getGuideGroup(guide);

  const crumbs = [
    { label: 'Home', href: '/' },
    { label: 'Gold Guides', href: '/guides' },
    { label: group.name, href: `/guides#${group.key}` },
    { label: guide.title, href: `/guides/${guide.slug}` },
  ];

  return (
    <main className="min-h-screen bg-background">
      <JsonLd
        data={articleSchema({
          title: guide.seoTitle,
          description: guide.metaDescription,
          slug: `/guides/${guide.slug}`,
          image: guide.heroImage,
          publishedAt: guide.publishedAt,
          updatedAt: guide.updatedAt,
        })}
      />
      <JsonLd data={breadcrumbSchema(crumbs.map((c) => ({ name: c.label, url: c.href })))} />
      {guide.faq.length > 0 && <JsonLd data={faqSchema(guide.faq)} />}
      {guide.youtubeVideoId && (
        <JsonLd
          data={videoObjectSchema({
            name: guide.title,
            description: guide.metaDescription,
            youtubeVideoId: guide.youtubeVideoId,
            uploadDate: guide.videoUploadedAt ?? guide.publishedAt,
          })}
        />
      )}

      <article className="mx-auto max-w-3xl px-4 py-10 sm:py-14">
        <Breadcrumbs crumbs={crumbs} />

        <header className="mt-6">
          <div className="flex flex-wrap items-center gap-2">
            <Tag tone="gold">{group.shortName}</Tag>
            <Tag tone="muted">{guide.expansion}</Tag>
            <Tag tone="muted">{guide.methodType}</Tag>
          </div>
          <h1 className="mt-4 text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            {guide.title}
          </h1>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
            {guide.excerpt}
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-xs uppercase tracking-wider text-muted-foreground">
            <span>By King K</span>
            <span aria-hidden="true">/</span>
            <span>Updated {formatDate(guide.updatedAt)}</span>
          </div>
        </header>

        {guide.youtubeVideoId && (
          <div className="mt-8">
            <YouTubeEmbed videoId={guide.youtubeVideoId} title={guide.title} />
          </div>
        )}


        <div className="mt-8">
          <GuideBody guide={guide} mdxContent={mdx?.content} />
        </div>

        {guide.faq.length > 0 && (
          <section className="mt-12">
            <Eyebrow className="mb-4">FAQ</Eyebrow>
            <h2 className="mb-6 text-2xl font-bold text-foreground">Frequently asked questions</h2>
            <FAQAccordion items={guide.faq} />
          </section>
        )}


        {relatedVideos.length > 0 && (
          <section className="mt-14">
            <Eyebrow className="mb-4">Watch</Eyebrow>
            <h2 className="mb-6 text-2xl font-bold text-foreground">Related videos</h2>
            <div className="grid gap-5 sm:grid-cols-2">
              {relatedVideos.map((v) => (
                <VideoCard key={v.slug} video={v} />
              ))}
            </div>
          </section>
        )}

        {related.length > 0 && (
          <section className="mt-14 border-t border-border pt-10">
            <Eyebrow className="mb-4">Keep going</Eyebrow>
            <h2 className="mb-6 text-2xl font-bold text-foreground">Related guides</h2>
            <div className="grid gap-5 sm:grid-cols-3">
              {related.map((g) => (
                <GuideCard key={g.slug} guide={g} />
              ))}
            </div>
          </section>
        )}

        <div className="mt-12">
          <Link
            href="/guides"
            className="font-mono text-xs uppercase tracking-[0.15em] text-primary hover:text-primary/80"
          >
            ← All gold guides
          </Link>
        </div>
      </article>
    </main>
  );
}


