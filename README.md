# Srushti Farm House

A React + Vite website for [Srushti Farm House](https://srushtifarmhouse.in) — a luxury eco retreat near Sinhgad, Pune. Hosted on GitHub Pages with custom domain `srushtifarmhouse.in`.

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to preview locally.

## Edit content

**Translations (English, Hindi, Marathi):**

- [`src/i18n/locales/en.ts`](src/i18n/locales/en.ts) — English
- [`src/i18n/locales/hi.ts`](src/i18n/locales/hi.ts) — Hindi
- [`src/i18n/locales/mr.ts`](src/i18n/locales/mr.ts) — Marathi

**Non-translatable data:**

- [`src/data/siteContent.ts`](src/data/siteContent.ts) — phone numbers, URLs, geo, site URL
- [`src/data/gallery.ts`](src/data/gallery.ts) — gallery items (photos + videos)
- [`scripts/gallery-source.config.mjs`](scripts/gallery-source.config.mjs) — source file → category mapping

## Gallery media

Drop raw photos and videos into the repo-root [`images/`](images/) folder (gitignored). Then:

1. Edit [`scripts/gallery-source.config.mjs`](scripts/gallery-source.config.mjs) — add each file with `slug`, `category`, and `alt` text.
2. Run:

```bash
npm run prepare-gallery
```

This converts HEIC → JPEG, resizes photos, compresses videos to web-friendly MP4 (under 15 MB), generates poster thumbnails, and writes [`src/data/gallery-manifest.json`](src/data/gallery-manifest.json).

Optimized assets are saved under `public/assets/gallery/photos`, `videos`, and `posters`. Commit those folders and the manifest — not the raw `images/` source folder.

**Categories:** `pool`, `rooms`, `nature`, `activities`, `food`, `events` (photos) and `videos` (video clips only).

- [`src/data/experiences.ts`](src/data/experiences.ts) — activity icons

## Languages

The site supports **English**, **Hindi**, and **Marathi**.

**Auto-detection:** On first visit, the browser language is checked (`navigator.languages`). Marathi (`mr`) and Hindi (`hi`) are detected automatically; everything else defaults to English.

**URL parameter:** Share language-specific links:
- English: `https://srushtifarmhouse.in/`
- Hindi: `https://srushtifarmhouse.in/?lang=hi`
- Marathi: `https://srushtifarmhouse.in/?lang=mr`

**Manual switch:** Use the **EN | हिंदी | मराठी** toggle in the navbar. Your choice is saved in `localStorage` (`srushti-lang`) and synced to the URL.

To add a new language later:

1. Add a locale code to `Locale` in [`src/i18n/types.ts`](src/i18n/types.ts)
2. Create `src/i18n/locales/xx.ts` matching the `Translations` interface
3. Register it in [`src/i18n/index.ts`](src/i18n/index.ts)
4. Add a button in [`src/components/LanguageSwitcher.tsx`](src/components/LanguageSwitcher.tsx)
5. Update [`src/seo/useSeo.ts`](src/seo/useSeo.ts) hreflang tags and [`scripts/generate-sitemap.mjs`](scripts/generate-sitemap.mjs)

## Assets

Images are stored in `public/assets/images/`. To re-download from the original CDN:

```bash
npm run download-assets
```

> Note: Some assets from `customer-assets.emergentagent.com` may require manual download if the CDN blocks automated requests. The hero video URL is referenced externally in `siteContent.ts`.

## Build

```bash
npm run build
node scripts/generate-sitemap.mjs
npm run preview
```

## Deploy to GitHub Pages

### First-time setup

```bash
# Create the repo on GitHub (via github.com or GitHub CLI)
gh repo create srushtiffarmhouse.github.io --public --source=. --remote=origin --push

# Or manually:
git remote add origin https://github.com/YOUR_USERNAME/srushtiffarmhouse.github.io.git
git push -u origin main
```

### Enable GitHub Pages

1. Push this repo to GitHub (e.g. `piyushkanadje/srushtifarmhouse`)
2. Go to **Settings → Pages → Build and deployment**
3. Set **Source** to **GitHub Actions** (not “Deploy from a branch”)
4. Re-run the failed workflow or push to `main`

If deploy fails with `Failed to create deployment (status: 404)`, Pages is not enabled or Source is still set to a branch — fix step 3 above.

Every push to `main` triggers the deploy workflow in [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml).

**Production URL:** `https://srushtifarmhouse.in`

## Custom domain

`public/CNAME` contains `srushtifarmhouse.in`. To finish setup:

1. In GitHub **Settings → Pages → Custom domain**, enter `srushtifarmhouse.in`
2. At your registrar, add DNS records:
   - **A records** → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - **CNAME** for `www` → `piyushkanadje.github.io` (optional)
3. Enable **Enforce HTTPS** once DNS propagates
4. Confirm deploy uses `VITE_BASE_URL=/` and `VITE_SITE_URL=https://srushtifarmhouse.in` (set in deploy workflow)

## SEO checklist (off-page — do after deploy)

These steps are required to rank for brand + local queries like “farmhouse near Sinhgad”:

### Google Search Console

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Add property `srushtifarmhouse.in` (domain or URL prefix)
3. Verify via DNS TXT record or HTML file
4. Submit sitemap: `https://srushtifarmhouse.in/sitemap.xml`
5. Monitor queries: `Srushti Farm House`, `farmhouse sinhgad`, `farmhouse near pune`

### Google Business Profile

1. Claim or verify **Srushti Farm House** on [Google Business](https://business.google.com)
2. Use exact NAP matching the site:
   - **Name:** Srushti Farm House
   - **Address:** Survey No. 412, Panshet Road, Opposite Surajya Apt., Donje, Sinhgad, Pune 411025
   - **Phone (Booking/Reservation/Inquiries):** +91 7767994666 / +91 9404953555 / +91 7058863476
3. Add 20+ photos (pool, rooms, food, activities)
4. Enable messaging; post weekly updates
5. Ask every guest for a review; respond to all reviews

### Listings & NAP consistency

Update phone/address on all directories to match the website:

- [Justdial listing](https://www.justdial.com/Pune/Srushti-Farm-House-Sinhgad-Donje-Pune-Opposite-Surajya-Donje/020PXX20-XX20-181127203410-L5I5_BZDET)
- TripAdvisor, Airbnb (if applicable), Pune tourism directories
- Instagram bio → link to `https://srushtifarmhouse.in`

### Validate structured data

After deploy, test rich results:

1. [Google Rich Results Test](https://search.google.com/test/rich-results) — paste `https://srushtifarmhouse.in`
2. Expect: **LodgingBusiness**, **FAQPage**, **WebSite** schemas
3. Run Lighthouse SEO audit — target score 95+

### What’s built into the site

| Feature | Location |
|---------|----------|
| `robots.txt` | `public/robots.txt` |
| `sitemap.xml` | Generated at build via `scripts/generate-sitemap.mjs` |
| Canonical + hreflang | `src/seo/useSeo.ts` |
| JSON-LD (LodgingBusiness, FAQ, Offers) | `src/components/SeoSchema.tsx` |
| Keyword meta (EN/HI/MR) | `src/i18n/locales/*.ts` |
| Image SEO alts | `src/data/gallery.ts` |

## Tech stack

- React 19 + TypeScript
- Vite 8
- Tailwind CSS 4
- Lucide React icons
- GitHub Actions for CI/CD
# house
