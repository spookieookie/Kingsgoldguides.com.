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

const creator = {
  '@type': 'Person',
  '@id': `${siteConfig.domain}/authors/${siteConfig.authorSlug}#person`,
  name: 'King K',
  alternateName: 'King Kunta',
  url: `${siteConfig.domain}/authors/${siteConfig.authorSlug}`,
  sameAs: [siteConfig.youtube],
};

export function websiteSchema(): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteConfig.domain}/#website`,
    name: siteConfig.name,
    url: siteConfig.domain,
    description: siteConfig.description,
    inLanguage: 'en',
    publisher: org,
  };
}

export function guideCollectionSchema(entries: { slug: string; title: string }[]): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${siteConfig.domain}/guides#collection`,
    url: `${siteConfig.domain}/guides`,
    name: 'World of Warcraft Gold Farming Guides',
    isPartOf: { '@id': `${siteConfig.domain}/#website` },
    author: creator,
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: entries.length,
      itemListElement: entries.map((entry, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: entry.title,
        url: `${siteConfig.domain}/guides/${entry.slug}`,
      })),
    },
  };
}

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
  youtubeVideoId?: string;
  language?: string;
  topics?: string[];
  location?: string;
}): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${siteConfig.domain}${opts.slug}#article`,
    headline: opts.title,
    description: opts.description,
    image: opts.image ? new URL(opts.image, siteConfig.domain).href : undefined,
    datePublished: schemaDateTime(opts.publishedAt),
    dateModified: schemaDateTime(opts.updatedAt ?? opts.publishedAt),
    mainEntityOfPage: `${siteConfig.domain}${opts.slug}`,
    isPartOf: { '@id': `${siteConfig.domain}/#website` },
    inLanguage: opts.language ?? 'en',
    author: creator,
    publisher: org,
    about: opts.topics?.map((name) => ({ '@type': 'Thing', name })),
    contentLocation: opts.location ? { '@type': 'Place', name: opts.location } : undefined,
    citation: opts.youtubeVideoId ? `https://www.youtube.com/watch?v=${opts.youtubeVideoId}` : undefined,
    video: opts.youtubeVideoId ? { '@id': `${siteConfig.domain}/#video-${opts.youtubeVideoId}` } : undefined,
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
    '@id': `${siteConfig.domain}/#video-${opts.youtubeVideoId}`,
    name: opts.name,
    description: opts.description,
    thumbnailUrl:
      opts.thumbnail ?? `https://i.ytimg.com/vi/${opts.youtubeVideoId}/hqdefault.jpg`,
    uploadDate: schemaDateTime(opts.uploadDate),
    embedUrl: `https://www.youtube-nocookie.com/embed/${opts.youtubeVideoId}`,
    url: `https://www.youtube.com/watch?v=${opts.youtubeVideoId}`,
    creator,
    publisher: org,
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
    '@id': `${siteConfig.domain}${opts.slug}#profile`,
    mainEntity: {
      ...creator,
      name: opts.name,
      description: opts.description,
      url: `${siteConfig.domain}${opts.slug}`,
      sameAs: [siteConfig.youtube],
      worksFor: org,
    },
  };
}


