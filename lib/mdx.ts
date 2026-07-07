import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { compileMDX } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';

const contentDir = path.join(process.cwd(), 'content/guides');

// The guide page shell (app/guides/[slug]/page.tsx) already renders the video,
// quick answer, FAQ, downloads, and email capture from frontmatter for every
// guide. Older MDX files also embedded those components inline, which produced
// duplicated sections (and broke, since next-mdx-remote does not pass MDX
// expression props like `items={[...]}`). We suppress the inline structured
// components here so frontmatter stays the single source of truth, and let the
// prose + GitHub-flavored markdown tables render normally.
const Noop = () => null;
const mdxComponents = {
  YouTubeEmbed: Noop,
  QuickAnswerBox: Noop,
  GoldBreakdownTable: Noop,
  FAQAccordion: Noop,
  DownloadCard: Noop,
  EmailCaptureForm: Noop,
  RouteMapImage: Noop,
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
      mdxOptions: {
        remarkPlugins: [remarkGfm],
      },
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
