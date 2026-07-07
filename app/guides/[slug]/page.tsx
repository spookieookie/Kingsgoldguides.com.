import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getGuideBySlug, getAllGuideSlugs, getGuides } from '@/lib/mdx';
import { YouTubeEmbed } from '@/components/guides/YouTubeEmbed';
import { QuickAnswerBox } from '@/components/guides/QuickAnswerBox';
import { GoldBreakdownTable } from '@/components/guides/GoldBreakdownTable';
import { FAQAccordion } from '@/components/guides/FAQAccordion';
import { DownloadCard } from '@/components/guides/DownloadCard';
import { EmailCaptureForm } from '@/components/guides/EmailCaptureForm';
import { Breadcrumbs } from '@/components/guides/Breadcrumbs';
import { Clock, TrendingUp } from 'lucide-react';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = await getGuideBySlug(slug);

  if (!guide) {
    return {
      title: 'Guide Not Found',
    };
  }

  const { frontmatter } = guide;
  const description = frontmatter.quickAnswer || frontmatter.goldClaimHeadline;

  return {
    title: `${frontmatter.title} | WoW Gold Guides`,
    description,
    openGraph: {
      title: frontmatter.title,
      description,
      type: 'article',
      publishedTime: frontmatter.publishDate,
      authors: ['WoW Gold Guides'],
    },
  };
}

export async function generateStaticParams() {
  const slugs = await getAllGuideSlugs();
  return slugs.map((slug) => ({ slug }));
}

// Sample gold breakdown data (will be extended with real data from frontmatter)
const SAMPLE_GOLD_BREAKDOWN = [
  {
    activity: 'Herbalism - Dense Nodes',
    goldPerHour: 3200,
    requirements: 'Flying Required',
    difficulty: 'Easy' as const,
  },
  {
    activity: 'Herbalism - Ground Routes',
    goldPerHour: 2500,
    requirements: 'No Requirements',
    difficulty: 'Easy' as const,
  },
  {
    activity: 'Multi-gathering Hybrid',
    goldPerHour: 3800,
    requirements: 'Flying, Multiple Professions',
    difficulty: 'Medium' as const,
  },
];

export default async function GuidePage({ params }: PageProps) {
  const { slug } = await params;
  const guide = await getGuideBySlug(slug);

  if (!guide) {
    notFound();
  }

  const { frontmatter, content } = guide;

  // Get related guides
  const allGuides = await getGuides();
  const relatedGuides = allGuides
    .filter((g) => g.slug !== slug)
    .slice(0, 3);

  return (
    <main className="min-h-screen bg-background">
      <article className="max-w-3xl mx-auto px-4 py-8 sm:py-12">
        {/* Breadcrumbs */}
        <Breadcrumbs
          crumbs={[
            { label: 'Home', href: '/' },
            { label: 'Guides', href: '/guides' },
            { label: frontmatter.title, href: `/guides/${slug}` },
          ]}
        />

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <span className="px-3 py-1 bg-primary/20 text-primary text-sm font-semibold rounded-full">
              {frontmatter.expansion}
            </span>
            <span className="px-3 py-1 bg-secondary text-foreground text-sm rounded">
              {frontmatter.zone}
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            {frontmatter.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Clock size={16} />
              <span>{frontmatter.duration}</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp size={16} />
              <span>{frontmatter.goldClaimHeadline}</span>
            </div>
            <span>
              {new Date(frontmatter.publishDate).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
          </div>
        </div>

        {/* YouTube Video */}
        {frontmatter.youtubeVideoId && (
          <YouTubeEmbed
            videoId={frontmatter.youtubeVideoId}
            title={frontmatter.title}
          />
        )}

        {/* Quick Answer Box */}
        <QuickAnswerBox
          answer={frontmatter.quickAnswer}
          goldClaim={frontmatter.goldClaimHeadline}
        />

        {/* Main Content */}
        <div className="prose mb-8">{content}</div>

        {/* Gold Breakdown Table */}
        <GoldBreakdownTable rows={SAMPLE_GOLD_BREAKDOWN} />

        {/* FAQ Section */}
        {frontmatter.faq && frontmatter.faq.length > 0 && (
          <FAQAccordion items={frontmatter.faq} />
        )}

        {/* Downloads Section */}
        {frontmatter.downloadableSpreadsheet && (
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-foreground mb-4">Downloads</h3>
            <DownloadCard
              href={frontmatter.downloadableSpreadsheet}
              fileName="Guide Data Spreadsheet"
              description="Complete routing data and profit calculations"
            />
          </div>
        )}

        {/* Email Signup */}
        <EmailCaptureForm />

        {/* Related Guides */}
        {relatedGuides.length > 0 && (
          <div className="mt-12 pt-8 border-t border-border">
            <h3 className="text-2xl font-bold text-foreground mb-6">
              Related Guides
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {relatedGuides.map((relGuide) => (
                <a
                  key={relGuide.slug}
                  href={`/guides/${relGuide.slug}`}
                  className="p-4 bg-secondary border border-border rounded hover:border-primary transition-colors"
                >
                  <h4 className="font-semibold text-foreground hover:text-primary mb-2 line-clamp-2">
                    {relGuide.title}
                  </h4>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {relGuide.goldClaimHeadline}
                  </p>
                </a>
              ))}
            </div>
          </div>
        )}
      </article>
    </main>
  );
}
