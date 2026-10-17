# Video publishing format

Build out King K's existing video archive first. Each source video should have one clear written companion aimed at the specific farm, location, and materials people search for. Defer new site features and categories until requested.

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
- Do not invent coordinates, mob names, chapters, drops, durations, current patch testing, or profit rates to fill gaps in the source.

## Dates and numbers

- Record the site's publication date separately from the original video's verified upload date (`videoUploadedAt`).
- Keep homepage and video listings in original YouTube upload order, newest first. Adding an older video or updating its written guide must not move it ahead of newer uploads. `getAllVideos()` uses `videoUploadedAt`, falling back to `publishedAt` for entries that already use the upload date.
- Attribute old loot totals and prices to the original recording. An old "un-nerfed" title is not evidence of current behavior.
- Separate cloth/material sales from slow transmog listings. Auction house value is not a completed sale.
- Keep unsupported gold-per-hour fields at zero; do not add made-up estimates. Keep caveats brief and specific to the source.

## Before publishing

Verify the source ID, title and date, written/video links, related content, existing group, metadata, and sitemap entry. Check the build and rendered guide, then publish through the existing GitHub-to-Vercel workflow.
