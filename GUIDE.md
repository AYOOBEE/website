# AffiliatePro — Complete Guide

## Table of Contents
1. [Initial Setup](#1-initial-setup)
2. [Deploy to Netlify](#2-deploy-to-netlify)
3. [Deploy to Vercel](#3-deploy-to-vercel)
4. [Adding New Articles](#4-adding-new-articles)
5. [Editing Affiliate Links](#5-editing-affiliate-links)
6. [Uploading Images](#6-uploading-images)
7. [Scaling to 100+ Articles](#7-scaling-to-100-articles)
8. [Project File Map](#8-project-file-map)

---

## 1. Initial Setup

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

Visit http://localhost:3000 in your browser.

---

## 2. Deploy to Netlify

**Option A — Drag & Drop (fastest):**
1. Run `npm run build` locally
2. Go to app.netlify.com → "Add new site" → "Deploy manually"
3. Drag the `.next` folder into the upload zone
4. Done — live in 60 seconds

**Option B — Git + Auto Deploy (recommended):**
1. Push this project to a GitHub repo
2. Go to app.netlify.com → "Add new site" → "Import from Git"
3. Connect your GitHub repo
4. Set build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
5. Add environment variables (Site settings → Environment variables):
   - `NEXT_PUBLIC_SITE_URL` = `https://yourdomain.com`
6. Click "Deploy site"
7. Every time you push to GitHub, Netlify auto-deploys

**Custom domain:**
- Netlify Dashboard → Domain settings → Add custom domain
- Update DNS with your registrar

---

## 3. Deploy to Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in the project folder
3. Follow the prompts — Vercel auto-detects Next.js
4. Or: Import from GitHub at vercel.com (zero-config for Next.js)

Add env vars: Vercel Dashboard → Project → Settings → Environment Variables

---

## 4. Adding New Articles

Open `data/articles.js` and add a new object to the `articles` array.

### Article types available:
- `review` — Product review with rating, pros/cons
- `listicle` — "Best X" list article
- `comparison` — Side-by-side comparison
- `launch-jacking` — New product launch review (shows urgency banner)
- `tutorial` — How-to guide

### Minimal example (copy, paste, fill in):

```js
{
  slug: 'my-tool-review',           // URL: /blog/my-tool-review
  type: 'review',
  title: 'My Tool Review 2025',
  excerpt: 'Short description for Google snippets and cards (150-160 chars).',
  coverImage: 'https://picsum.photos/seed/mytool/1200/630',  // or /images/my-image.jpg
  category: 'ai-tools',             // must match a slug in data/categories.js
  tags: ['Tag1', 'Tag2'],
  author: {
    name: 'Your Name',
    avatar: 'https://picsum.photos/seed/you/80/80',
    bio: 'Your short bio here',
  },
  publishedAt: '2025-05-10',        // YYYY-MM-DD
  updatedAt:   '2025-05-10',
  readingTime: 8,                    // estimated minutes
  rating: 4.5,                       // null for non-review articles
  featured: false,                   // true = shows on homepage
  trending: false,                   // true = shows trending badge
  affiliateProduct: {
    name: 'Tool Name',
    price: '$29/mo',
    originalPrice: '$49/mo',         // null if no discount
    discount: '40% OFF',             // null if no discount
    affiliateUrl: 'https://...',     // YOUR affiliate tracking URL
    badge: 'Best Value',
    coupon: 'CODE20',                // null if no coupon
  },
  pros: ['Pro 1', 'Pro 2', 'Pro 3'],
  cons: ['Con 1', 'Con 2'],
  tableOfContents: [
    { id: 'section-id', label: 'Section Label' },
  ],
  faqs: [
    { question: 'Q?', answer: 'A.' },
  ],
  content: `
    <h2 id="section-id">Section Heading</h2>
    <p>Your article content in HTML format.</p>
  `,
}
```

After saving, the article is live at `/blog/my-tool-review`.

---

## 5. Editing Affiliate Links

**All affiliate links are in one place:** `data/articles.js` and `data/products.js`

### In articles.js:
```js
affiliateProduct: {
  affiliateUrl: 'https://YOUR-AFFILIATE-LINK-HERE',  // ← change this
}
```

### In products.js:
```js
{
  affiliateUrl: 'https://YOUR-AFFILIATE-LINK-HERE',  // ← change this
}
```

Find all affiliate URLs at once:
```bash
grep -n "affiliateUrl" data/articles.js data/products.js
```

---

## 6. Uploading Images

### Option A — Use public/images/ folder (local):
1. Add your image to `public/images/your-image.jpg`
2. Reference it as: `coverImage: '/images/your-image.jpg'`
3. Images in `/public` are served at the root URL

### Option B — CDN (recommended for production):
Upload images to Cloudinary, S3, or imgix and use the full URL.

Then add the domain to `next.config.js`:
```js
images: {
  domains: ['your-cdn-domain.com'],
}
```

### Image dimensions:
- Cover images: 1200×630px (OG image size)
- Product thumbnails: 400×300px
- Author avatars: 80×80px or 200×200px

---

## 7. Scaling to 100+ Articles

### Keep articles organized:
The `data/articles.js` file can hold hundreds of articles. For very large sites (500+ articles), consider splitting into multiple files:

```
data/
  articles/
    ai-tools.js
    software.js
    marketing.js
  index.js          ← combines and exports all
```

### Add new categories:
Edit `data/categories.js` — add a new object with `slug`, `name`, `icon`, `description`, `color`, `count`.

### Speed tips for large article counts:
- All pages are statically generated at build time (getStaticProps) — scales infinitely
- Images are automatically optimized by Next.js
- Add ISR (Incremental Static Regeneration) to auto-update without full rebuilds:

```js
export async function getStaticProps() {
  return {
    props: { ... },
    revalidate: 3600,  // regenerate every hour
  };
}
```

### Add a CMS (optional, for a team):
When you have a team writing content, consider:
- **Sanity.io** — free tier, great for blogs
- **Contentful** — enterprise-grade
- **Notion + Notion API** — simple and free

The data structure in `data/articles.js` maps 1:1 with what a CMS would return, so migration is straightforward.

---

## 8. Project File Map

```
affiliate-website/
├── components/
│   ├── layout/
│   │   ├── Navbar.jsx       ← Navigation, dark mode, search, mobile menu
│   │   ├── Footer.jsx       ← Footer links, newsletter, social
│   │   └── Layout.jsx       ← Wraps all pages, reading progress bar
│   ├── ui/
│   │   ├── StarRating.jsx   ← Reusable star rating (1-5, half stars)
│   │   └── Badge.jsx        ← Color-coded label badges
│   ├── blog/
│   │   ├── ArticleCard.jsx  ← Card shown in grids (vertical + horizontal)
│   │   ├── AffiliateCTA.jsx ← 3 CTA styles: default, inline, sidebar
│   │   ├── ProsConsBox.jsx  ← Green/red pros & cons grid
│   │   ├── ReviewSummaryBox.jsx ← Score box with star breakdown
│   │   ├── TableOfContents.jsx  ← Sticky TOC with active link tracking
│   │   ├── ComparisonTable.jsx  ← Feature comparison table with winner badge
│   │   ├── FAQSection.jsx   ← Accordion FAQ (schema-ready)
│   │   └── RelatedArticles.jsx ← Grid of related posts
│   ├── home/
│   │   ├── Hero.jsx         ← Homepage hero with stats
│   │   ├── FeaturedArticles.jsx ← Featured article grid
│   │   ├── TrendingProducts.jsx ← Product card grid with affiliate CTAs
│   │   ├── Categories.jsx   ← Category icon grid
│   │   ├── TrustSection.jsx ← Trust pillars + testimonials
│   │   └── Newsletter.jsx   ← Email capture form
│   └── seo/
│       └── SEOHead.jsx      ← Meta tags, OG, schema builders
│
├── pages/
│   ├── index.jsx            ← Homepage
│   ├── about.jsx            ← About page
│   ├── contact.jsx          ← Contact form
│   ├── privacy-policy.jsx   ← Privacy policy
│   ├── affiliate-disclaimer.jsx
│   ├── sitemap.xml.js       ← Auto-generated sitemap
│   ├── blog/
│   │   ├── index.jsx        ← Blog listing with filters/search
│   │   └── [slug].jsx       ← Article page (all types)
│   ├── category/
│   │   └── [category].jsx   ← Category listing page
│   ├── _app.jsx             ← Theme provider, global layout
│   └── _document.jsx        ← HTML document, fonts
│
├── data/
│   ├── articles.js          ← ALL article content + helpers
│   ├── products.js          ← All affiliate products
│   └── categories.js        ← Site categories
│
├── styles/
│   └── globals.css          ← Tailwind + custom classes
│
├── public/
│   ├── robots.txt
│   └── images/              ← Upload your images here
│
├── next.config.js
├── tailwind.config.js
├── netlify.toml             ← Netlify deployment config
└── .env.example             ← Copy to .env.local for dev
```
