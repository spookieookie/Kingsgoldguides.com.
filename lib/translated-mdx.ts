import fs from 'fs';
import path from 'path';
import { compileMDX } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import { guideHeadingPlugin, type GuideHeading } from '@/lib/guide-headings';
import { hasTranslation, type Locale } from '@/lib/locales';

export async function getTranslatedGuide(locale: Locale, slug: string) {
 if (!hasTranslation(slug)) return null;
 const source = fs.readFileSync(path.join(process.cwd(), 'content/translations', locale, `${slug}.mdx`), 'utf8');
 const headings: GuideHeading[] = [];
 const result = await compileMDX({ source, options: { mdxOptions: { remarkPlugins: [remarkGfm, guideHeadingPlugin(headings)] } } });
 return { content: result.content, headings };
}
