import type { AuthorProfile, BeginnerPath, DataBrief, ToolPage } from './types';

export const dataBriefs: DataBrief[] = [
  {
    title: 'Best time to sell gathering mats this week',
    slug: 'sell-gathering-mats-this-week',
    excerpt:
      'Material prices are bottoming into the weekend glut. Hold ore and herbs for the post-reset demand spike.',
    publishedAt: '2024-08-05',
    category: 'Market Timing',
    signal: 'Watch',
    body: [
      'Gathering material supply is peaking as weekend farmers flood the auction house. Prices on common ore and herbs are near their weekly floor.',
      'Demand historically rebounds within 24-48 hours of the weekly reset as raiders and crafters restock consumables.',
    ],
    takeaway:
      'Do not sell into the weekend glut. Stockpile now and meter listings into the early-week reset spike.',
  },
  {
    title: 'What changed in the market after the patch',
    slug: 'market-changes-after-patch',
    excerpt:
      'The latest patch reset consumable demand. Flask and potion margins are widening as raiders re-gear.',
    publishedAt: '2024-08-02',
    category: 'Patch Impact',
    signal: 'Rising',
    body: [
      'New content pulled a wave of players back into raiding, spiking demand for flasks, potions, and enchanting materials.',
      'Crafters who stockpiled herbs before the patch are seeing the widest margins as supply lags demand.',
    ],
    takeaway:
      'Prioritize consumable crafting this week. The demand spike fades once supply catches up, so move volume early.',
  },
  {
    title: 'Where current competition is crushing margins',
    slug: 'competition-crushing-margins',
    excerpt:
      'Popular instant-respawn transmog farms are overcrowded. Rotate to lower-traffic routes for better yield.',
    publishedAt: '2024-07-28',
    category: 'Competition',
    signal: 'Falling',
    body: [
      'The most-shared transmog farms are drawing heavy competition, thinning drops per player and depressing appearance prices.',
      'Less-publicized routes with similar drop tables are yielding materially better gold-per-hour right now.',
    ],
    takeaway:
      'Avoid the farms everyone is running this month. Competition, not drop rate, is the binding constraint on your yield.',
  },
];

export const tools: ToolPage[] = [
  {
    title: 'Gold-Per-Hour Calculator',
    slug: 'gold-per-hour-calculator',
    tagline: 'Measure any farm honestly',
    description:
      'Enter gold earned and time spent to get a clean gold-per-hour number you can compare across farms.',
    icon: 'Calculator',
  },
  {
    title: 'Sale-Rate & Risk Estimator',
    slug: 'sale-rate-risk-estimator',
    tagline: 'Know before you buy',
    description:
      'Estimate how fast inventory clears and how much capital is at risk before committing to a flip.',
    icon: 'Target',
  },
  {
    title: 'Farm Comparison Tool',
    slug: 'farm-comparison',
    tagline: 'Rank farms side by side',
    description:
      'Compare gold-per-hour, setup cost, sale speed, and risk across two or more farms at a glance.',
    icon: 'BarChart3',
  },
  {
    title: 'Darkmoon Event Timer',
    slug: 'darkmoon-event-timer',
    tagline: 'Never miss the Faire',
    description:
      'Track the days until the Darkmoon Faire opens and closes so you can time buys and sells around it.',
    icon: 'Calendar',
  },
];

export const beginnerPaths: BeginnerPath[] = [
  {
    title: 'Start here if you are broke',
    description: 'Zero-capital farms that turn time into your first stack of gold.',
    href: '/farming',
    icon: 'Coins',
  },
  {
    title: 'Start here if you want safe farms',
    description: 'Low-variance routes with predictable raw gold and minimal market risk.',
    href: '/guides/wow-gold-farm-best-way-200k-iron-docks',
    icon: 'Shield',
  },
  {
    title: 'Start here if you want AH / flipping',
    description: 'Turn capital into more capital with sale-rate-driven auction house strategy.',
    href: '/auction-house',
    icon: 'TrendingUp',
  },
  {
    title: 'Start here if you have one character',
    description: 'Single-character routines that do not require alts or a profession army.',
    href: '/professions',
    icon: 'Users',
  },
];

export const author: AuthorProfile = {
  name: 'King Kunta',
  slug: 'king-kunta',
  role: 'Data Analyst / SAP Systems Analyst',
  headline: 'A data analyst who teaches WoW players how to actually make gold.',
  bio: [
    'King Kunta is a data analyst and SAP systems analyst who applies a professional analytics mindset to the World of Warcraft economy.',
    'Every method on this site is tested in-game and filmed for the King Kunta YouTube channel. The focus is not hype numbers — it is sell-through, timing, and risk: why a margin exists, what market condition keeps it alive, and the signal that tells you to stop.',
    'The result is gold-making content built for players who want to understand the economy, not just copy a route.',
  ],
  angle:
    'Most gold guides explain how to farm. The differentiator here is explaining why margins rise or collapse — the analyst view of the market behind the method.',
  topics: [
    'Farming routes and gold-per-hour',
    'Auction house flipping and sale rate',
    'WoW economy and market timing',
    'Professions and crafting arbitrage',
    'Rare item and transmog farming',
    'Event economics (Darkmoon Faire)',
  ],
  youtube: 'https://www.youtube.com/@KingKunta',
  featuredGuides: [
    'wow-gold-farm-best-way-200k-iron-docks',
    'wow-auction-house-flipping-safe-niches',
    'wow-economy-best-time-to-sell-mats',
  ],
  featuredVideos: ['600k-ghostlands-chest-farm', 'top-5-instant-respawn-farms', 'iron-docks-200k'],
};
