# Kings Gold Guides search growth

## Goal

Earn search visibility and cited links for specific World of Warcraft gold farms, then expand visibility for broader gold-farming questions. Technical eligibility does not establish a ranking or guarantee an AI citation.

## Baseline: October 21, 2026

- Production source: `24465241441c438ed2f0b4c0f132bc6a1196464b`.
- 20 published written guides; existing Home / Videos / Gold Guides navigation.
- The live `robots.txt` returns 200 and allows public crawling under `User-Agent: *`, including OAI-SearchBot. `/api/` and `/admin/` remain excluded. There was no search-bot block to remove.
- Public search retrieval returned the Burning Steppes guide for a cloth-farming query, and The Glazer guide plus video for an item-farm query. Home and the guide library were also discoverable. These are underlying search retrieval observations, not measured positions or proof of citation in ChatGPT, Google AI Mode, or Perplexity answers.
- Useful short answers existed in source records but were absent from many rendered guide pages.

## Implemented foundation

- Every guide has a server-rendered summary: location, targets, how the value becomes gold, setup, source video, and version/market context.
- The `/guides` library compares all published routes and answers concrete questions about Volatile Air, cloth, rogue farming, and auction values.
- Stable author, publisher, website, article, and source-video identities connect visible authorship with structured data. Collection markup lists the actual published guide links.
- Search snippets and rich media previews are allowed. No special AI-only page, hidden text, invented rating, or unverified current-patch claim is needed.
- Static sitemap routes no longer receive a false new modification date at every build. Guide and post entries retain their content dates.
- Regression checks require a complete facts record and short answer for future guides. The rendered-page audit checks the visible summaries and their source relationships.

## Next content work, in order

### Content and retrieval improvements, second pass

- Added 60 farm-specific answers across the 20 existing guides. Native HTML disclosures keep all answers in the initial response; this does not imply eligibility for Google's restricted FAQ rich results.
- Added heading anchors and section navigation generated from the same Markdown syntax tree, plus contextual links in 13 previously sparse guides and a curated related-route graph.
- Corrected the Timeless Isle write-up's item mix-up: Condensed Jademist is a bound consumable, while Jademist Dancer is a distinct battle pet. Corrected the matching title, description, summary, video companion text, and comparison entry without changing indexed addresses.
- Narrowed Goblin Power Shovel's target description to miners supported by the item record and first-hand reports; removed the unsupported Geologist attribution.
- Removed unsupported hourly rates from 11 older source records and two MDX records. No current rate is published without a documented measurement.
- Added original video map captures to The Glazer and Timeless Isle guides. These are source-recording images, not new in-game tests or generated artwork.
- Evidence: https://www.wowhead.com/item=104288/condensed-jademist ; https://www.wowhead.com/mop-classic/npc=73355/jademist-dancer ; https://www.wowhead.com/item=1991/goblin-power-shovel . Source map views: https://www.youtube.com/watch?v=Bqf2dytbJN0&t=157s and https://www.youtube.com/watch?v=NBBtTfUi-Ng&t=63s .

1. Retest the Volatile Air routes, Burning Steppes cloth loop, and a rare-item route during actual gameplay. Prioritize evidence rather than unsupported hourly forecasts.
2. Add original route screenshots or maps from those runs, with source-supported landmarks. Record coordinates only when checked in-game.
3. Record the game edition, patch, region, character setup, date, duration, route, kills/runs, and item quantities for each test. Separate vendor gold, auction asking prices, realized sales, and costs. Use multiple sessions before calling a result typical.
4. Update the corresponding existing guide, summary, and companion video links. Keep stable URLs and the established voice. Mark a guide retested only after the test exists.
5. Continue turning the existing video archive into complete farm-specific guides. Each guide should answer one identifiable location/item/method question and link to relevant existing routes.
6. Link new videos to their matching written guides in YouTube descriptions when separately authorized. Do not manufacture outside mentions or post promotional replies to communities.

## Measurement

Keep a dated record of the exact question, engine, locale, cited URL, and answer evidence when checking native AI search. An underlying web-search result is a separate observation; do not report it as an AI citation. Track actual referral sessions and video starts in the existing consent-aware Analytics setup, alongside Search Console impressions, clicks, queries, and indexed pages. A single answer or a one-day fluctuation is not a trend.

Start with these query groups:

| Intent | Existing destination |
| --- | --- |
| World of Warcraft gold farms / WoW gold farming guides | `/guides` |
| Where to farm Volatile Air / Vortex Pinnacle farm resets | `/guides/vortex-pinnacle-volatile-air-farm` |
| Firelands Potion of Treasure Finding volatile farm | `/guides/firelands-volatile-farm` |
| Burning Steppes Mageweave and Runecloth farm | `/guides/burning-steppes-mageweave-runecloth-farm` |
| Skettis Primal Water / Mote of Water farm | `/guides/120000-gold-per-hour-skettis-blackwind-lake-primal-water-farm` |
| The Glazer drop location / Mildenhall Meadery farm | `/guides/the-glazer-farm` |
| Loaded Gnomish Dice rogue pickpocket farm | `/guides/uldum-loaded-gnomish-dice-farm` |
| Destiny sword Dreadmaul Ambusher farm | `/guides/destiny-sword-farm` |

## Primary references

- Google AI features and website requirements: https://developers.google.com/search/docs/appearance/ai-features
- OpenAI search crawler controls: https://developers.openai.com/api/docs/bots
- Schema.org Article and CollectionPage: https://schema.org/Article and https://schema.org/CollectionPage
