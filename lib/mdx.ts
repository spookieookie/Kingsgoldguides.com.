import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { compileMDX } from 'next-mdx-remote/rsc';
import { YouTubeEmbed } from '@/components/guides/YouTubeEmbed';
import { QuickAnswerBox } from '@/components/guides/QuickAnswerBox';
import { GoldBreakdownTable } from '@/components/guides/GoldBreakdownTable';
import { FAQAccordion } from '@/components/guides/FAQAccordion';
import { DownloadCard } from '@/components/guides/DownloadCard';
import { EmailCaptureForm } from '@/components/guides/EmailCaptureForm';
import { RouteMapImage } from '@/components/guides/RouteMapImage';

const contentDir = path.join(process.cwd(), 'content/guides');

// Components made available to MDX content. next-mdx-remote strips `import`
// statements from MDX, so any component used inside a guide must be provided here.
const mdxComponents = {
  YouTubeEmbed,
  QuickAnswerBox,
  GoldBreakdownTable,
  FAQAccordion,
  DownloadCard,
  EmailCaptureForm,
  RouteMapImage,
};

export interface GuideFrontmatter {
  title: string;
  slug: string;
  youtubeVideoId: string;
  publishDate: string;
  duration: string;
  zone: string;
  expansion: string;
  professions: string[];
  goldClaimHeadline: string;
  quickAnswer: string;
  routeMapImage?: string;
  downloadableSpreadsheet?: string;
  transcript?: string;
  faq?: Array<{ question: string; answer: string }>;
}

export async function getGuides() {
  const files = fs.readdirSync(contentDir);
  const guides = await Promise.all(
    files
      .filter((file) => file.endsWith('.mdx'))
      .map(async (file) => {
        const filePath = path.join(contentDir, file);
        const content = fs.readFileSync(filePath, 'utf-8');
        const { data } = matter(content);
        return data as GuideFrontmatter;
      })
  );

  return guides.sort(
    (a, b) =>
      new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
  );
}

export async function getGuideBySlug(slug: string) {
  const filePath = path.join(contentDir, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const content = fs.readFileSync(filePath, 'utf-8');
  const { data, content: mdxContent } = matter(content);

  const mdxSource = await compileMDX({
    source: mdxContent,
    components: mdxComponents,
    options: {
      parseFrontmatter: false,
    },
  });

  return {
    frontmatter: data as GuideFrontmatter,
    content: mdxSource.content,
  };
}

export async function getAllGuideSlugs() {
  const files = fs.readdirSync(contentDir);
  return files
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => file.replace('.mdx', ''));
}
