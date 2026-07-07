import type { HubKey } from '@/lib/site';

export type RiskLevel = 'Low' | 'Medium' | 'High';
export type SaleSpeed = 'Fast' | 'Medium' | 'Slow';
export type MethodType =
  | 'Gathering Route'
  | 'Mob Farm'
  | 'Dungeon Farm'
  | 'Transmog Farm'
  | 'Auction House'
  | 'Crafting'
  | 'Event Economy';

export interface FaqItem {
  question: string;
  answer: string;
}

export interface GuideStep {
  title: string;
  detail: string;
}

export interface GuideRef {
  slug: string;
  title: string;
}

export interface VideoRef {
  slug: string;
  title: string;
}

/** Strongly-typed guide money-page model. */
export interface GuidePage {
  title: string;
  slug: string;
  excerpt: string;
  seoTitle: string;
  metaDescription: string;
  heroImage: string;
  youtubeVideoId: string;
  publishedAt: string;
  updatedAt: string;
  hub: HubKey;
  category: string;
  subcategory: string;
  expansion: string;
  methodType: MethodType;
  goldPerHourLow: number;
  goldPerHourHigh: number;
  setupCost: string;
  saleSpeed: SaleSpeed;
  riskLevel: RiskLevel;
  requirements: string[];
  whoFor: string[];
  tldr: string;
  bestTimeToFarm: string;
  bestTimeToSell: string;
  ahNotes: string;
  realmCaveats: string;
  steps: GuideStep[];
  analystTakeaway: string;
  faq: FaqItem[];
  relatedGuides: string[];
  relatedVideos: string[];
  featured: boolean;
  canonicalUrl: string;
  schemaType: 'Article';
  /** When set, the detailed method body is rendered from this MDX file. */
  mdxSlug?: string;
}

export interface VideoPage {
  title: string;
  slug: string;
  youtubeVideoId: string;
  excerpt: string;
  summary: string;
  publishedAt: string;
  duration: string;
  hub: HubKey;
  topic: string;
  promise: string;
  keyTakeaways: string[];
  timestamps: { time: string; label: string }[];
  mentioned: string[];
  relatedGuideSlug?: string;
  relatedVideos: string[];
  featured: boolean;
}

export interface DataBrief {
  title: string;
  slug: string;
  excerpt: string;
  publishedAt: string;
  category: 'Market Timing' | 'Patch Impact' | 'Competition' | 'Event Economics';
  signal: 'Rising' | 'Falling' | 'Watch';
  body: string[];
  takeaway: string;
}

export interface ToolPage {
  title: string;
  slug: string;
  tagline: string;
  description: string;
  icon: string;
}

export interface AuthorProfile {
  name: string;
  slug: string;
  role: string;
  headline: string;
  bio: string[];
  angle: string;
  topics: string[];
  youtube: string;
  featuredGuides: string[];
  featuredVideos: string[];
}

export interface BeginnerPath {
  title: string;
  description: string;
  href: string;
  icon: string;
}
