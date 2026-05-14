import articles from '../data/articles';
import categories from '../data/categories';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://affiliatepro.com';

function generateSitemap() {
  const staticPages = [
    { url: '/',                   changefreq: 'daily',   priority: 1.0 },
    { url: '/blog',               changefreq: 'daily',   priority: 0.9 },
    { url: '/about',              changefreq: 'monthly', priority: 0.5 },
    { url: '/contact',            changefreq: 'monthly', priority: 0.5 },
    { url: '/privacy-policy',     changefreq: 'yearly',  priority: 0.3 },
    { url: '/affiliate-disclaimer',changefreq: 'yearly', priority: 0.3 },
  ];

  const articlePages = articles.map(a => ({
    url:       `/blog/${a.slug}`,
    lastmod:    a.updatedAt,
    changefreq: 'weekly',
    priority:   0.8,
  }));

  const categoryPages = categories.map(c => ({
    url:       `/category/${c.slug}`,
    changefreq: 'weekly',
    priority:   0.7,
  }));

  const reviewPages = [
    { url: '/reviews/adskull-vs-smartly-io',  lastmod: '2026-05-14', changefreq: 'weekly', priority: 0.8 },
    { url: '/best/ai-media-buyer-tools',       lastmod: '2026-05-14', changefreq: 'weekly', priority: 0.9 },
  ];

  const allPages = [...staticPages, ...articlePages, ...categoryPages, ...reviewPages];

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages.map(page => `  <url>
    <loc>${SITE_URL}${page.url}</loc>
    ${page.lastmod ? `<lastmod>${page.lastmod}</lastmod>` : ''}
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;
}

export default function SitemapXML() { return null; }

export async function getServerSideProps({ res }) {
  res.setHeader('Content-Type', 'text/xml');
  res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate');
  res.write(generateSitemap());
  res.end();
  return { props: {} };
}
