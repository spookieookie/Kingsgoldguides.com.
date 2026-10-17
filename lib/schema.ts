import { siteConfig } from './site';

type Json = Record<string, unknown>;

/** Date-only archive records use the start of that day in UTC for JSON-LD. */
export function schemaDateTime(value?: string): string | undefined {
  if (!value) return undefined;
  const dateOnly = /^\d{4}-\d{2}-\d{2}$/.test(value);
  const timestamp = dateOnly ? `${value}T00:00:00Z` : value;
  if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})$/.test(timestamp)) {
    throw new Error(`Structured data requires an ISO 8601 date with a timezone: ${value}`);
  }
  const date = new Date(timestamp);
  const day = new Date(`${value.slice(0, 10)}T00:00:00Z`);
  if (!Number.isFinite(date.getTime()) || !Number.isFinite(day.getTime()) || day.toISOString().slice(0, 10) !== value.slice(0, 10)) {
    throw new Error(`Invalid structured data date: ${value}`);
  }
  return date.toISOString();
}

const org = {
  '@type': 'Organization',
  '@id': `${siteConfig.domain}/#organization`,
  name: siteConfig.fullName,
  url: siteConfig.domain,
  logo: `${siteConfig.domain}/king-k-logo.png`,
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
    image: opts.image ? new URL(opts.image, siteConfig.domain).href : undefined,
    datePublished: schemaDateTime(opts.publishedAt),
    dateModified: schemaDateTime(opts.updatedAt ?? opts.publishedAt),
    mainEntityOfPage: `${siteConfig.domain}${opts.slug}`,
    author: {
      '@type': 'Person',
      name: 'King K',
      url: `${siteConfig.domain}/authors/${siteConfig.authorSlug}`,
    },
    publisher: org,
  };
}

export function videoObjectSchema(opts: {
  name: string;
  description: string;
  youtubeVideoId: string;
  uploadDate: string;
  thumbnail?: string;
}): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: opts.name,
    description: opts.description,
    thumbnailUrl:
      opts.thumbnail ?? `https://i.ytimg.com/vi/${opts.youtubeVideoId}/hqdefault.jpg`,
    uploadDate: schemaDateTime(opts.uploadDate),
    embedUrl: `https://www.youtube-nocookie.com/embed/${opts.youtubeVideoId}`,
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


