import type { PostPage } from './types';

export const posts: PostPage[] = [
  {
    title: 'WoW Forever Could Be a Really Good Thing',
    slug: 'wow-forever-first-impressions',
    excerpt: "Playing WoW Forever got me thinking about harder gathering, crafting, and whether those free-access tests could lead to something bigger.",
    metaDescription: "My thoughts after the WoW Forever beta stream: tougher gathering, crafting, RuneScape, and what Blizzard's limited free-access windows could mean.",
    publishedAt: '2026-10-16',
    updatedAt: '2026-10-16',
    youtubeVideoId: 'p9V-rA_rDLc',
    videoUploadedAt: '2026-10-10',
    intro: [
      "I had a good time playing WoW Forever on stream. Starting fresh in the beta has me interested in what this version of WoW could become, especially for gathering and crafting.",
      "The October 10 stream is above if you want to watch us play. These are my thoughts after spending some time in the beta.",
    ],
    sections: [
      {
        heading: 'Free access is already part of the plan',
        paragraphs: [
          {
            text: "Blizzard has announced an October 19 stress test that anyone can join without a subscription, game time, an invitation, or beta access.",
            source: {
              label: "Blizzard's stress test announcement",
              href: 'https://news.blizzard.com/en-gb/article/24302072/join-the-world-of-warcraft-forever-stress-test',
            },
          },
          {
            text: "There are also Invite-A-Friend codes for eligible players to try the game without a subscription from November 4 through November 11. Ongoing play is still listed as requiring a WoW subscription or game time.",
            source: {
              label: "Blizzard's launch access details",
              href: 'https://news.blizzard.com/en-us/article/24301508/pre-purchase-world-of-warcraft-forever-upgrades-and-begin-your-next-journey-in-azeroth',
            },
          },
          {
            text: "My prediction is that they could eventually take free access further. Low-key, I could see it happening. If it brings more people into the world and gives them a reason to stay, I think that could be a good thing.",
          },
        ],
      },
      {
        heading: "Could this be WoW's RuneScape moment?",
        paragraphs: [
          {
            text: "RuneScape is the comparison I keep coming back to: a game where gathering, crafting, and trading can be the reason you log in. I think WoW could fit that kind of long-term game really well.",
          },
          {
            text: "I'd like to see professions give people something worth getting good at. If knowing where to find materials matters, then knowing a route and putting time into a profession has a purpose.",
          },
        ],
      },
      {
        heading: 'Getting materials should take some knowledge',
        paragraphs: [
          {
            text: "From what I've played so far, herbalism and skinning don't feel as easy as I'm used to. That's one of the things I find interesting about Forever. It feels like you'll need to learn how to get materials efficiently instead of expecting every farm to be straightforward.",
          },
          {
            text: "If mats take more effort to get and crafters still need them, I think that could open up some good farms. That's my read on it from the beta. I'll want to see what happens once more people are gathering and selling.",
          },
        ],
      },
      {
        heading: 'What I want to test next',
        paragraphs: [
          {
            text: "I want to see how long it actually takes to bring back useful materials, what crafters are using, and what sells. A material being harder to get doesn't automatically mean it's worth farming.",
          },
          {
            text: "I had fun playing, and this is the part I'm excited to keep figuring out. If Forever makes gathering and crafting worth learning properly, I think we're going to have some cool stuff to work with.",
          },
        ],
      },
    ],
  },
];
