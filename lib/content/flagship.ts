import type { FaqItem } from './types';

/**
 * Darkmoon Firewater flagship entity page data (/economy/darkmoon-firewater).
 * This is a topic/entity cluster page — it sits at the intersection of event
 * economics, item intent, and market timing, and links out to related farming
 * and economy content.
 */
export const darkmoonFirewater = {
  slug: 'darkmoon-firewater',
  itemName: 'Darkmoon Firewater',
  title: 'Darkmoon Firewater: Best Uses, Buy Timing & Sell Strategy',
  seoTitle: 'Darkmoon Firewater Gold Guide: Best Uses, Buy Timing & Sell Strategy',
  metaDescription:
    'When Darkmoon Firewater actually improves your gold per hour, when the market is too saturated to bother, and exactly how to time buys and sells around the Darkmoon Faire.',
  updatedAt: '2024-08-06',
  publishedAt: '2024-07-01',
  youtubeVideoId: 'KvrQ1LJACWI',
  heroImage: '/placeholder.svg?height=480&width=854',

  tagline: 'Event economics / speed consumable / market-timed flip',

  heroSummary:
    'Darkmoon Firewater is a movement-speed consumable sold during the Darkmoon Faire. For gold-makers it is two things at once: a farming-efficiency buff that quietly raises your gold per hour on gathering and mob routes, and a time-boxed flip that only pays when you buy and sell on the right side of the Faire cycle.',

  whyItMatters: [
    {
      title: 'For gatherers',
      body: 'The out-of-combat speed increase shortens the dead time between nodes on herb and ore routes. On a long gathering loop that compounds into meaningfully more nodes per hour — the buff pays for itself when node density is high and travel time dominates.',
    },
    {
      title: 'For gold-makers',
      body: 'Firewater is only available for the ~week the Faire is up, but demand persists between Faires. That supply gap is the entire opportunity: buy cheap while the Faire is live, sell into the drought once it closes.',
    },
  ],

  useCases: [
    'Speeding up open-world gathering routes where travel time between nodes is the bottleneck.',
    'Cutting run-back time on mob and transmog farms that involve a lot of movement.',
    'Stocking a personal supply cheaply during the Faire to use on future farming sessions.',
    'Flipping: buying volume while the Faire is live and reselling after it closes.',
  ],

  timing: {
    buy: 'While the Darkmoon Faire is active (roughly the first week of each month). Supply is highest and prices are lowest mid-Faire once early hype fades.',
    farm: 'Use it on your longest, most movement-heavy routes — the buff value scales with how much time you spend traveling rather than gathering or fighting.',
    sell: 'In the two to three weeks after the Faire closes, when no new supply is entering the market but farmers still want the buff. Meter your listings rather than dumping all at once.',
  },

  eventAngle:
    'The Faire runs about one week per month, which creates a predictable supply-and-demand sawtooth. Price bottoms during the Faire and climbs as the closed period drags on. The flip is not about a big margin per unit — it is about buying enough volume at the bottom and selling patiently into the gap.',

  analystNotes: [
    'This is a low-margin, volume-and-timing play, not a get-rich farm. Treat it like inventory management: your edge is cycle discipline, not the item itself.',
    'On low-population realms the post-Faire price climb is steeper but liquidity is thinner — expect slower sell-through and list in smaller batches.',
    'If several creators feature Firewater in the same cycle, expect the buy-side to get crowded and the margin to compress. Watch competition, not just the raw spread.',
    'Firewater is a bonus to efficiency, never a requirement. If a route only works with the buff, the route is too marginal to run.',
  ],

  faq: [
    {
      question: 'Is Darkmoon Firewater required or just a bonus?',
      answer:
        'It is always a bonus. It improves gold per hour on movement-heavy routes but no farm should depend on it. If a route is only profitable with Firewater active, the underlying method is too thin.',
    },
    {
      question: 'When is the best time to buy Darkmoon Firewater?',
      answer:
        'Mid-Faire, once the opening-day rush fades and supply is at its highest. That is when prices are typically at their weekly floor.',
    },
    {
      question: 'When should I sell it?',
      answer:
        'In the weeks after the Faire closes. No new supply enters the market during that window, so demand from farmers pushes prices up. Meter your listings instead of dumping everything at once.',
    },
    {
      question: 'What sale rate should I expect?',
      answer:
        'On healthy realms, steady but not instant — this is a niche consumable. Expect to move inventory in batches over the closed period rather than in a single day. On low-pop realms, plan for slower turnover.',
    },
  ] as FaqItem[],

  relatedGuides: [
    'data-analyst-darkmoon-firewater-gold-flip-wow-gold-making',
    'wow-gold-farm-1000000-tiragarde-sound-mining-herbalism-route',
    'wow-economy-best-time-to-sell-mats',
    'wow-gold-farm-best-way-200k-iron-docks',
  ],
  relatedVideos: ['tiragarde-gathering-route', 'iron-docks-200k'],
};
