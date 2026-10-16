import type { GuidePage } from '@/lib/content/types';
import type { HubKey } from '@/lib/site';

// Keep these broad. New videos join an existing group instead of creating a category.
export const guideGroups = [
  {
    key: 'farming',
    name: 'Farming',
    shortName: 'Farming',
    description: 'Gathering routes, material farms, mob spots, and dungeon or raid runs.',
  },
  {
    key: 'rare-drops',
    name: 'Transmog & Rare Drops',
    shortName: 'Rare Drops',
    description: 'Transmog, rare items, and chest farms for the auction house.',
  },
  {
    key: 'auction-house',
    name: 'Auction House & Crafting',
    shortName: 'Auction House',
    description: 'Flips, crafting margins, and when to buy or sell.',
  },
] as const;

export type GuideGroupKey = (typeof guideGroups)[number]['key'];

export function getGroupForHub(hub: HubKey) {
  if (hub === 'rare-farms') return guideGroups[1];
  if (hub === 'auction-house' || hub === 'economy' || hub === 'professions') {
    return guideGroups[2];
  }
  return guideGroups[0];
}

export function getGuideGroup(guide: GuidePage) {
  if (guide.methodType === 'Transmog Farm') return guideGroups[1];
  return getGroupForHub(guide.hub);
}
