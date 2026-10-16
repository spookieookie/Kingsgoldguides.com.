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
  name: 'King K',
  slug: 'king-kunta',
  role: 'WoW gold farming creator',
  headline: 'I make WoW gold farming videos and keep the written routes here.',
  bio: [
    'I make World of Warcraft gold farming videos. This site keeps the farms and written routes in one place.',
    'I like checking old spots, looking at the drops, and deciding whether a farm is worth the time.',
    'Some videos are from older expansions. Check your game version and auction house before committing to a farm.',
  ],
  angle: 'Watch the farm, check the items, and decide whether you want to try it.',
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
    'data-analyst-darkmoon-firewater-gold-flip-wow-gold-making',
    '120000-gold-per-hour-skettis-blackwind-lake-primal-water-farm',
  ],
  featuredVideos: ['600k-ghostlands-chest-farm', 'top-5-instant-respawn-farms', 'iron-docks-200k'],
};

