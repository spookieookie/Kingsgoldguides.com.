export const siteConfig = {
  name: 'King Kunta',
  fullName: 'King Kunta WoW Gold',
  domain: 'https://kingsgoldguides.com',
  tagline: 'Data-backed WoW gold-making guides from King Kunta',
  description:
    'Farming routes, auction house strategy, market timing, and gold-per-hour analysis for World of Warcraft — powered by real gameplay and YouTube breakdowns.',
  youtube: 'https://www.youtube.com/@KingKunta',
  twitter: '@kingkuntawow',
  authorSlug: 'king-kunta',
} as const;

export type HubKey =
  | 'gold-guides'
  | 'farming'
  | 'auction-house'
  | 'economy'
  | 'professions'
  | 'rare-farms';

export interface HubDef {
  key: HubKey;
  href: string;
  /** Full hub name, used in headings and hub cards. */
  name: string;
  /** Short label for compact tags/badges on guide & video cards. */
  shortName: string;
  label: string;
  navLabel: string;
  tagline: string;
  description: string;
  subcategories: string[];
}

export const hubs: HubDef[] = [
  {
    key: 'gold-guides',
    href: '/guides',
    name: 'Gold Guides',
    shortName: 'Gold',
    label: 'Gold Guides',
    navLabel: 'Gold Guides',
    tagline: 'The complete money-page library',
    description:
      'Every tested gold-making method broken down with gold-per-hour, setup cost, sale speed, and risk. The master index that links into every other silo.',
    subcategories: ['Beginner', 'High Gold/Hour', 'Low Competition', 'Solo Friendly', 'Alt Farms'],
  },
  {
    key: 'farming',
    href: '/farming',
    name: 'Farming Guides',
    shortName: 'Farming',
    label: 'Farming Guides',
    navLabel: 'Farming',
    tagline: 'Routes, respawns, and raw gold/hour',
    description:
      'Open-world gathering and mob-farm routes with mapped paths, respawn timing, and realistic gold-per-hour ranges tested across realms.',
    subcategories: ['Herbalism', 'Mining', 'Skinning', 'Mob Farms', 'Old Raid Runs'],
  },
  {
    key: 'auction-house',
    href: '/auction-house',
    name: 'Auction House Flipping',
    shortName: 'AH',
    label: 'Auction House Flipping',
    navLabel: 'Auction House',
    tagline: 'Flip niches, margins, and sale rate',
    description:
      'Auction house flipping strategy focused on safe niches, capital requirements, real sale-rate, and the risk signals that tell you when a market turns.',
    subcategories: ['Flipping', 'Crafting Arbitrage', 'Reset Sniping', 'Materials', 'Sale Rate'],
  },
  {
    key: 'economy',
    href: '/economy',
    name: 'Economy Analysis',
    shortName: 'Economy',
    label: 'WoW Economy Analysis',
    navLabel: 'Economy',
    tagline: 'Market timing and patch impact',
    description:
      'Data-analyst breakdowns of the WoW economy: patch impact, event demand, price cycles, and the market conditions that make a method profitable or dead.',
    subcategories: ['Market Timing', 'Patch Impact', 'Event Economics', 'Price Cycles', 'Data Briefs'],
  },
  {
    key: 'professions',
    href: '/professions',
    name: 'Professions for Gold',
    shortName: 'Professions',
    label: 'Professions for Gold',
    navLabel: 'Professions',
    tagline: 'Craft, sell, and specialize for profit',
    description:
      'Which professions actually make gold, what to craft, specialization priorities, and how to price against the crafting competition on your realm.',
    subcategories: ['Alchemy', 'Enchanting', 'Blacksmithing', 'Tailoring', 'Jewelcrafting'],
  },
  {
    key: 'rare-farms',
    href: '/rare-farms',
    name: 'Rare & Transmog Farms',
    shortName: 'Rare',
    label: 'Rare Item & Transmog Farms',
    navLabel: 'Rare Farms',
    tagline: 'High-value drops and collector demand',
    description:
      'Farms for rare BoEs, transmog appearances, mounts, and collector items — where drop value beats raw gold/hour and demand stays steady.',
    subcategories: ['Transmog', 'BoE Farming', 'Mounts', 'Pets', 'Recipes'],
  },
];

export const mainNav = [
  { href: '/', label: 'Home' },
  { href: '/videos', label: 'Videos' },
  { href: '/guides', label: 'Gold Guides' },
  { href: '/farming', label: 'Farming' },
  { href: '/auction-house', label: 'Auction House' },
  { href: '/economy', label: 'Economy' },
  { href: '/professions', label: 'Professions' },
  { href: '/rare-farms', label: 'Rare Farms' },
  { href: '/tools', label: 'Tools' },
  { href: '/about', label: 'About' },
];

export function getHub(key: HubKey): HubDef {
  const hub = hubs.find((h) => h.key === key);
  if (!hub) throw new Error(`Unknown hub: ${key}`);
  return hub;
}
