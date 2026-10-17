import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllPosts, getPost, getVideo } from '@/lib/content';
import { siteConfig } from '@/lib/site';
import { formatDate } from '@/lib/format';
import { articleSchema, breadcrumbSchema, videoObjectSchema } from '@/lib/schema';
import { JsonLd } from '@/components/JsonLd';
import { Breadcrumbs } from '@/components/guides/Breadcrumbs';
import { YouTubeEmbed } from '@/components/guides/YouTubeEmbed';
import { Tag } from '@/components/ui/kit';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: { absolute: siteConfig.name } };
  return {
    title: { absolute: `${post.title} | King K` },
    description: post.metaDescription,
    alternates: { canonical: `${siteConfig.domain}/posts/${post.slug}` },
    openGraph: {
      url: `${siteConfig.domain}/posts/${post.slug}`,
      title: post.title,
      description: post.metaDescription,
      type: 'article',
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: ['King K'],
      images: [`https://i.ytimg.com/vi/${post.youtubeVideoId}/hqdefault.jpg`],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.metaDescription,
      images: [`https://i.ytimg.com/vi/${post.youtubeVideoId}/hqdefault.jpg`],
    },
  };
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  const sourceVideo = getVideo(post.youtubeVideoId);
  const crumbs = [
    { label: 'Home', href: '/' },
    { label: post.title, href: `/posts/${post.slug}` },
  ];
  return (
    <main className="min-h-screen bg-background">
      <JsonLd data={articleSchema({ title: post.title, description: post.metaDescription, slug: `/posts/${post.slug}`, image: `https://i.ytimg.com/vi/${post.youtubeVideoId}/hqdefault.jpg`, publishedAt: post.publishedAt, updatedAt: post.updatedAt })} />
      <JsonLd data={breadcrumbSchema(crumbs.map((crumb) => ({ name: crumb.label, url: crumb.href })))} />
      <JsonLd data={videoObjectSchema({ name: sourceVideo?.title ?? post.title, description: sourceVideo?.excerpt ?? post.excerpt, youtubeVideoId: post.youtubeVideoId, uploadDate: post.videoUploadedAt })} />
      <article className="mx-auto max-w-3xl px-4 py-10 sm:py-14">
        <Breadcrumbs crumbs={crumbs} />
        <header className="mt-6">
          <Tag tone="gold">Stream recap &amp; opinion</Tag>
          <h1 className="mt-4 text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl">{post.title}</h1>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{post.excerpt}</p>
          <p className="mt-4 text-xs text-muted-foreground">By King K <span aria-hidden="true">·</span> <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time></p>
        </header>
        <div className="mt-8">
          <YouTubeEmbed videoId={post.youtubeVideoId} title={sourceVideo?.title ?? post.title} />
          <p className="-mt-4 mb-8 text-xs text-muted-foreground">Streamed {formatDate(post.videoUploadedAt)}. Full replay.</p>
        </div>
        <div className="prose prose-invert max-w-none">
          {post.intro.map((text) => <p key={text}>{text}</p>)}
          {post.sections.map((section) => (
            <section key={section.heading}>
              <h2>{section.heading}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph.text}>
                  {paragraph.text}
                  {paragraph.source && <> <a href={paragraph.source.href} className="font-medium text-primary">{paragraph.source.label}</a>.</>}
                </p>
              ))}
            </section>
          ))}
        </div>
        <Link href="/" className="mt-12 inline-block text-sm font-semibold text-primary hover:text-primary/80">← Back to the homepage</Link>
      </article>
    </main>
  );
}

