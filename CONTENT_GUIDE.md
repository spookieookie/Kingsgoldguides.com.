# Video publishing format

Build out King K's existing video archive first. Each source video should have one clear written companion aimed at the specific farm, location, and materials people search for. Defer new site features and categories until requested.

## Default for every new farm video

This is the owner's standing default for guide/video creation and setup. Use it automatically for future farm videos, without asking for a new format. Start the body from `templates/video-guide.mdx`; use Firelands and Burning Steppes for the voice. Stream opinions still use the existing post template.

The shared guide page supplies this reading order:

1. Descriptive title, short introduction, King K byline, and the actual content update date.
2. **The farm at a glance:** concise answer, location, target loot, how it pays, preparation, version/market context, and original source link.
3. Original YouTube video and thumbnail, followed by automatic **Jump to a section** navigation.
4. Source-based walkthrough: preparation, getting there, route or kill method, what to keep, resets where relevant, and selling. Rename or remove body sections to fit the actual farm.
5. Farm-specific reader questions and answers, using the native disclosures. Three useful questions is a starting point, not a quota; omit unsupported questions.
6. Relevant related videos and guides, plus contextual body links where they help a reader choose another route.

The matching video page supplies the title and specific viewing promise, original player, source-based summary, link to the written guide, useful takeaways, verified chapters when available, and related videos. Do not paste the full written guide into the video summary.

### Required setup files

| File | Set up for each farm video |
| --- | --- |
| `content/guides/<slug>.mdx` | Source ID and metadata, practical first-person body, descriptive H2/H3 headings, and relevant contextual links. |
| `lib/content/guides.ts` | Complete `GuidePage` entry, distinct search title/description, concise `tldr`, version/market context, source-based FAQ, related slugs, and `mdxSlug`. |
| `lib/content/videos.ts` | Matching `VideoPage` entry with the same YouTube ID, summary, promise, takeaways, duration, and `relatedGuideSlug`. Add only chapters verified in the source. |
| `lib/content/farm-facts.ts` | Record keyed by the guide slug with `location`, `targets`, `valueType`, and `beforeYouGo`. This drives both the summary and comparison table. |

The source ID must match across MDX, the guide record, and its companion video record. Reuse an existing video entry when that source is already present; do not create duplicates. Use the original YouTube thumbnail or the owner's supplied thumbnail asset. The default thumbnail URL is `https://i.ytimg.com/vi/<VIDEO_ID>/hqdefault.jpg`.

The shared templates own the H1, summary, player, contents navigation, FAQs, related cards, and schema. Do not duplicate those components inside MDX. Heading anchors are automatic. Route images are optional: use actual gameplay or original video captures, add a useful caption/source timestamp, and distinguish recorded footage from a new test. Never use AI-generated images.

Leave unsupported hourly fields at zero. Empty chapters are better than invented timestamps. Keep supported source upload metadata separate from the site's dates, and preserve stable URLs when updating an existing guide.

## Voice

- Write in first person as King K. Use the supplied captions and his own notes as the source for his experience and opinions.
- Keep the voice consistent with `content/guides/firelands-volatile-farm.mdx`: direct, conversational, short paragraphs, practical instructions.
- Keep useful phrases from the captions, such as "I'm using," "bring," "keep moving," and "what we're keeping." Correct caption spelling and remove speech fillers.
- Do not turn each post into a different editorial style. Avoid corporate language, generic introductions, inflated promises, and invented experiences.
- Match the kind of content: farming videos use the existing guide template; stream opinions use the existing post template.

## Search and structure

- Use the actual location, material, item, or method in the title, short stable slug, description, and relevant headings. Write natural sentences instead of repeating keywords.
- Start with the farm and the main drops, then explain preparation, the route, loot, and selling when the source supports them. Use only the sections the video needs.
- Reuse the current guide/video pages, metadata, schema, sitemap, and companion links. Add the content to an existing broad group.
- Use the original YouTube thumbnail and exact video ID. Do not generate replacement artwork.
- Add source-supported location, target items, value type, and setup notes to `lib/content/farm-facts.ts`. These facts power the guide summary and comparison table. Keep a concise `tldr` or MDX `quickAnswer` so readers can assess the farm before watching.
- Keep the guide's source video, author link, and version/market context visible. Never label a route tested on a current patch unless an actual test supports it.
- Answer the specific location, loot, setup, or reset questions a reader needs for that farm in the guide's `faq` records. The native disclosures render every answer in the initial HTML. Keep the wording consistent with the source; never add generic questions just to reach a count.
- Markdown H2 and H3 headings receive stable section anchors and populate the page navigation automatically. Use descriptive headings and relevant contextual links to other existing routes.
- Do not invent coordinates, mob names, chapters, drops, durations, current patch testing, or profit rates to fill gaps in the source.

## Dates and numbers

- Record the site's publication date separately from the original video's verified upload date (`videoUploadedAt`).
- Keep homepage and video listings in original YouTube upload order, newest first. Adding an older video or updating its written guide must not move it ahead of newer uploads. `getAllVideos()` uses `videoUploadedAt`, falling back to `publishedAt` for entries that already use the upload date.
- Attribute old loot totals and prices to the original recording. An old "un-nerfed" title is not evidence of current behavior.
- Separate cloth/material sales from slow transmog listings. Auction house value is not a completed sale.
- Keep unsupported gold-per-hour fields at zero; do not add made-up estimates. Keep caveats brief and specific to the source.
- Distinguish bound consumables, character currencies, cageable pets, and auctionable equipment. Check an item's binding and exact identity before describing it as saleable loot. A prior generated guide is not primary evidence for an item or rate.

## Before publishing

Verify the source ID, title and supplied metadata, written/video links, related content, existing group, metadata, and sitemap entry. Run `npm test` and the build through the established workflow. The checks require farm facts, reader answers, source/companion consistency, valid related routes, and search metadata. Check the rendered guide and video, including section links, FAQ expansion, source images when used, and mobile layout. Publish through the existing GitHub-to-Vercel workflow, verify the exact production commit is READY, and check the live pages with `scripts/check_search.py` (or a connector-fetched response snapshot). Return the published links and a short status.
