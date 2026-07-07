import { siteConfig } from './site';

type Json = Record<string, unknown>;

const org = {
  '@type': 'Organization',
  '@id': `${siteConfig.domain}/#organization`,
  name: siteConfig.fullName,
  url: siteConfig.domain,
  sameAs: [siteConfig.youtube],
};

export function organizationSchema(): Json {
  return {
    '@context': 'https://schema.org',
    ...org,
    description: siteConfig.description,
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${siteConfig.domain}${item.url}`,
    })),
  };
}

export function articleSchema(opts: {
  title: string;
  description: string;
  slug: string;
  image?: string;
  publishedAt?: string;
  updatedAt?: string;
}): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: opts.title,
    description: opts.description,
    image: opts.image ? `${siteConfig.domain}${opts.image}` : undefined,
    datePublished: opts.publishedAt,
    dateModified: opts.updatedAt ?? opts.publishedAt,
    mainEntityOfPage: `${siteConfig.domain}${opts.slug}`,
    author: {
      '@type': 'Person',
      name: siteConfig.name,
      url: `${siteConfig.domain}/authors/${siteConfig.authorSlug}`,
    },
    publisher: org,
  };
}

export function videoObjectSchema(opts: {
  name: string;
  description: string;
  youtubeVideoId: string;
  uploadDate?: string;
  thumbnail?: string;
}): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: opts.name,
    description: opts.description,
    thumbnailUrl:
      opts.thumbnail ?? `https://i.ytimg.com/vi/${opts.youtubeVideoId}/hqdefault.jpg`,
    uploadDate: opts.uploadDate,
    contentUrl: `https://www.youtube.com/watch?v=${opts.youtubeVideoId}`,
    embedUrl: `https://www.youtube.com/embed/${opts.youtubeVideoId}`,
  };
}

export function faqSchema(items: { question: string; answer: string }[]): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };
}

export function profilePageSchema(opts: {
  name: string;
  description: string;
  slug: string;
}): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    mainEntity: {
      '@type': 'Person',
      name: opts.name,
      description: opts.description,
      url: `${siteConfig.domain}${opts.slug}`,
      sameAs: [siteConfig.youtube],
      worksFor: org,
    },
  };
}
