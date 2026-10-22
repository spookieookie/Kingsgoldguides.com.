# Kings Gold Guides: established workflow

Use this setup directly. Do not rediscover projects, repositories, accounts, or publishing tools for routine posts.

- GitHub repository: `spookieookie/Kingsgoldguides.com.` (the trailing period is part of the repository name).
- Production branch: `main`.
- Vercel project: `kings-gold`, ID `prj_Hiw9BKvqHjIjvLaZRJgPAt3wwGkY`.
- Vercel team: `team_6bdQ09L8CPYnBLa88p9UyBoz`.
- Live site: `https://kingsgoldguides.com`.
- YouTube channel: `https://www.youtube.com/@KingKonYoutube`. Use `siteConfig.youtube` for channel links; the old `@KingKunta` handle is incorrect.
- Search Console property: `https://kingsgoldguides.com/` (URL-prefix property).
- Google tag: `G-9D2KRKSGEH`; one loader in `app/layout.tsx`, existing consent controls in `lib/analytics.ts`.

Read `CONTENT_GUIDE.md` for the established voice and format. Use the existing Firelands and Burning Steppes guides as the writing references the owner selected. A caption file and YouTube link mean: create the companion guide and finish publishing it through the existing workflow. Preserve supplied facts; ask one concise question only if a required fact is still missing after one focused lookup.

## Default guide and video format

The owner selected the current farm-guide and companion-video format as the default for all future creation and setup. Apply it without asking the owner to select a format again. Use the ordered format and file checklist in `CONTENT_GUIDE.md`, starting new farm bodies from `templates/video-guide.mdx`.

Every farm video gets a written guide, matching video record, and farm-facts record. Use the shared page templates for the summary, player, section navigation, reader questions, related content, authorship, metadata, and structured data. Keep factual source review and the original King K voice part of the default. Optional maps and chapters require actual source material; do not fill gaps with generated images or invented details. Stream commentary continues to use the existing post template.

## Routine video publishing

1. Read the supplied captions and extract the actual farm, materials, instructions, and supported results.
2. Match the current guide format and first-person voice. Use the original YouTube thumbnail. Do not invent profit claims, locations, chapters, or personal experiences.
3. Add one MDX guide in `content/guides/` and its matching entries in `lib/content/guides.ts`, `lib/content/videos.ts`, and `lib/content/farm-facts.ts`. Include the concise answer, farm-specific FAQ records, source-supported facts, and relevant related routes. Set the video's `relatedGuideSlug` to the written guide and use the same YouTube ID in all three source records. Reuse the existing broad group and companion links.
4. Preserve the original upload metadata separately from the site's publication metadata. The shared schema formatter handles Google formatting; do not reopen already supplied facts as a separate investigation. Homepage video order stays newest on YouTube first.
5. Run `npm test`, publish through `main` and the existing Vercel Git integration, verify that exact commit is READY, and check the live guide/video links and sitemap.
6. Return the published link with a short status. Keep narration brief.

Do not redesign pages, change writing style, add infrastructure, query unrelated services, or broaden a routine publishing task unless the owner asks or a concrete failure requires it. A partial local checkout is not a reason to restart discovery: read the known files through the GitHub connector. Do not retry a blocked Git clone.

## Search requirements

- Every indexed page needs a specific, distinct search title, description, self-canonical URL, and one descriptive H1.
- All video JSON-LD must use `videoObjectSchema` in `lib/schema.ts`; all article dates use the same formatter. Never use an HTML YouTube watch page as a raw `contentUrl`.
- Dedicated `/videos/` pages must render the actual iframe in the initial HTML, without autoplay, so crawlers can discover the player. Use `YouTubeEmbed` with `loadPlayer`. Written guides and posts keep the existing click-to-load behavior.
- `npm run build` runs the regression tests before Next.js builds. Do not remove the checks to make a release pass.
- `python3 scripts/check_search.py` audits every sitemap URL. In restricted environments, fetch the rendered responses through the Vercel connector and use `--snapshot PATH` instead of repeatedly retrying blocked network requests.
- A valid Rich Results Test and a submitted sitemap are evidence of technical readiness, not a promise of rankings or immediate indexing.
