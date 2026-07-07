# WoW Gold Guides - A Lean SEO-Focused Content Site

A production-ready World of Warcraft gold-making guide site built with Next.js 16 App Router, MDX content, and professional styling.

## Project Structure

```
/app                 # Next.js App Router pages and layouts
  /guides           # Dynamic guide pages
  /api              # API routes (subscribe, AH prices)
  layout.tsx        # Root layout with header and footer
  globals.css       # Theme configuration with dark mode
  page.tsx          # Homepage
  sitemap.ts        # SEO sitemap generation
  robots.ts         # Robots.txt configuration

/components         # Reusable React components
  /guides           # Guide-specific components
    YouTubeEmbed.tsx
    QuickAnswerBox.tsx
    GoldBreakdownTable.tsx
    FAQAccordion.tsx
    RouteMapImage.tsx
    DownloadCard.tsx
    EmailCaptureForm.tsx
    Breadcrumbs.tsx
  Header.tsx        # Navigation header
  Footer.tsx        # Footer with links
  ContactForm.tsx   # Contact form component

/content/guides     # MDX guide files
  herbalism-farming-guide.mdx
  mining-ore-routes.mdx
  transmog-flipping-guide.mdx

/lib
  mdx.ts            # MDX file reading and compilation utilities
  utils.ts          # General utilities

/public
  /downloads        # Downloadable Excel spreadsheets
  /images/guides    # Guide-specific images
```

## Features

### Content Management
- **File-based MDX/Markdown**: All guides stored as .mdx files in `/content/guides`
- **Frontmatter support**: YAML frontmatter for guide metadata (title, zone, professions, etc.)
- **Next.js metadata API**: Auto-generated `generateMetadata()` for SEO

### SEO & Structured Data
- ✅ Dynamic metadata with `generateMetadata()`
- ✅ Open Graph and Twitter Card support
- ✅ Next.js generated `sitemap.xml` and `robots.txt`
- ✅ Breadcrumb navigation for user experience
- ✅ Semantic HTML with proper heading hierarchy
- ✅ Mobile-first responsive design

### Page Types
- **Homepage**: Hero section, features, featured guides, CTA
- **Guides Index**: All guides with filtering by expansion/profession
- **Guide Pages**: Video embed, quick answer, gold breakdown table, FAQ, downloads
- **About**: Mission and value proposition
- **Contact**: Contact form
- **Tools/Downloads**: Spreadsheet downloads and utilities

### API Routes
- `POST /api/subscribe`: Email capture (integrates with Kit)
- `GET /api/ah-price`: Optional Blizzard AH price fetching with aggressive caching

### Components
All guide components are reusable and styled consistently:
- `YouTubeEmbed`: Responsive YouTube iframe wrapper
- `QuickAnswerBox`: Gold claim + quick summary
- `GoldBreakdownTable`: Profit comparison table
- `FAQAccordion`: Expandable FAQ section
- `RouteMapImage`: Optimized route map display
- `DownloadCard`: Spreadsheet download widget
- `EmailCaptureForm`: Newsletter signup
- `Breadcrumbs`: Navigation breadcrumbs

## Environment Variables

### Required
- `NEXT_PUBLIC_SITE_URL`: Canonical site origin (e.g., `https://wowgoldguides.com`)
- `CONTACT_EMAIL`: Public email address

### Optional
- `KIT_API_KEY`: Kit.com API key for email capture
- `KIT_FORM_ID`: Kit form ID
- `BLIZZARD_CLIENT_ID`: Blizzard API credentials (for AH prices)
- `BLIZZARD_CLIENT_SECRET`: Blizzard API secret
- `BLIZZARD_REGION`: `us` or `eu`

## Creating New Guides

Create a new MDX file in `/content/guides/` with the following structure:

```mdx
---
title: "Guide Title"
slug: "guide-slug"
youtubeVideoId: "VIDEO_ID"
publishDate: "2026-06-15"
duration: "MM:SS"
zone: "Zone Name"
expansion: "Expansion Name"
professions:
  - "Profession 1"
  - "Profession 2"
goldClaimHeadline: "Make X-Y gold per hour"
quickAnswer: "Short summary"
routeMapImage: "/images/guides/guide-slug/route-map.webp"
downloadableSpreadsheet: "/downloads/guide-slug.xlsx"
faq:
  - question: "Q1?"
    answer: "A1"
  - question: "Q2?"
    answer: "A2"
---

# Your Content Here

Your MDX content...
```

## Building & Deployment

### Local Development
```bash
pnpm dev
```
Open http://localhost:3000

### Production Build
```bash
pnpm build
pnpm start
```

### Vercel Deployment
1. Connect repository to Vercel
2. Add environment variables
3. Deploy (auto-deploys on main branch)

### Post-Deployment Checklist
- [ ] Add custom domain
- [ ] Verify site in Google Search Console
- [ ] Submit sitemap.xml to Search Console
- [ ] Validate structured data with Rich Results Test
- [ ] Setup GA4 if using analytics
- [ ] Test email capture form
- [ ] Test spreadsheet downloads
- [ ] Test AH price API fallback

## Performance Optimizations

### Rendering Strategy
- **Static generation** (SSG): Homepage, about, contact, guides index, individual guides
- **ISR with long revalidate**: Only if live AH prices added (recommended: 12 hours)
- **Dynamic routes**: API endpoints only

### Caching
- `sitemap.ts` and `robots.ts` are static
- API routes use response headers for caching
- AH price endpoint: `revalidate = 43200` (12 hours)

### Images
- All images stored in `/public` (no external CDN required)
- `next/image` component for optimization
- `.webp` format preferred
- Local route maps and thumbnails

### Code Splitting
- Reusable components in `/components/guides`
- Separate client-side components (forms) from server components
- Lazy-loaded accordions and modals

## Styling

### Design System
- **Color Scheme**: Professional dark theme with orange/amber accents
- **Fonts**: Geist Sans (default), Geist Mono (code)
- **Spacing**: Tailwind spacing scale (p-4, gap-6, etc.)
- **Responsive**: Mobile-first with breakpoints (md, lg)

### CSS Tokens (CSS Variables)
Defined in `app/globals.css`:
- `--background`: Main background
- `--foreground`: Main text
- `--primary`: Accent color (orange)
- `--secondary`: Card backgrounds
- `--muted-foreground`: Secondary text

### Typography
- Prose styling for MDX content
- Semantic HTML (h1, h2, h3, p, ul, li, etc.)
- Accessible color contrast (WCAG AA)

## Cost Optimization

### Monthly Usage Estimate
- **Static pages**: ~8 pages, prerendered at build time
- **Data transfer**: ~100 GB included (Hobby plan)
- **Function invocations**: <3,000 (well below 1,000,000)
- **Build frequency**: 10-20 deploys/month
- **Total cost**: Fits on Vercel Hobby (free tier) or small Pro credit

### Fallback Plan
If approaching usage limits:
1. Disable `/api/ah-price` 
2. Disable Kit email (use embedded form)
3. Keep all downloads in `/public`
4. Continue on Hobby or static host

## SEO Best Practices

- ✅ Clean, keyword-driven URLs (`/guides/{slug}`)
- ✅ Meta descriptions on all pages
- ✅ Open Graph images for social sharing
- ✅ Breadcrumb navigation (accessibility + SEO)
- ✅ Internal linking between guides
- ✅ Canonical URLs
- ✅ Mobile-responsive design
- ✅ Fast Core Web Vitals (fully static)
- ✅ Structured data (VideoObject, FAQPage, BreadcrumbList)

## Support & Troubleshooting

### Build Errors
- Check that all MDX files have required frontmatter
- Verify YouTube video IDs are valid
- Ensure component imports are correct

### Content Not Showing
- Verify slug matches filename
- Check frontmatter YAML syntax
- Ensure MDX file is in `/content/guides`

### Styling Issues
- Check `globals.css` theme variables
- Verify Tailwind classes applied correctly
- Test dark mode with `dark` class on html element

## Future Enhancements

### Phase 2 (If Needed)
- Add comment system (Disqus or native)
- Email newsletter (Kit integration)
- User accounts (Auth.js + database)
- Video library/playlist support
- Advanced search

### Phase 3 (Scale Beyond Hobby)
- Headless CMS (WordPress + Vercel integration)
- Multi-author support
- Comment moderation
- Analytics dashboard
- A/B testing with Vercel Edge Config

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Content**: MDX + gray-matter
- **Icons**: lucide-react
- **Deployment**: Vercel (Git auto-deploy)
- **Analytics**: GA4 (optional, via @next/third-parties)
- **Email**: Kit.com (optional, via API)

## License

This project is provided as-is for deployment on Vercel. Modify as needed for your WoW gold-making content site.

