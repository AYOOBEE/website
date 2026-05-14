import Head from 'next/head';

const SITE_NAME = 'AffiliatePro';
const SITE_URL  = process.env.NEXT_PUBLIC_SITE_URL || 'https://affiliatepro.com';

// ─── SEO Head Component ───────────────────────────────────────────────────────
// Drop this inside any page to set meta tags, OG, and Twitter cards.
export default function SEOHead({
  title,
  description,
  canonical,
  image,
  type     = 'website',
  noindex  = false,
  schema   = null,   // pass a JSON-LD object for structured data
}) {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;
  const url       = canonical ? `${SITE_URL}${canonical}` : SITE_URL;
  const ogImage   = image || `${SITE_URL}/og-default.png`;

  return (
    <Head>
      {/* Basic */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {noindex && <meta name="robots" content="noindex,nofollow" />}

      {/* Open Graph */}
      <meta property="og:type"        content={type} />
      <meta property="og:title"       content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url"         content={url} />
      <meta property="og:image"       content={ogImage} />
      <meta property="og:site_name"   content={SITE_NAME} />

      {/* Twitter Card */}
      <meta name="twitter:card"        content="summary_large_image" />
      <meta name="twitter:title"       content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image"       content={ogImage} />

      {/* JSON-LD structured data */}
      {schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      )}
    </Head>
  );
}

// ── Schema builders ───────────────────────────────────────────────────────────
export function buildArticleSchema({ article, url }) {
  return {
    '@context':       'https://schema.org',
    '@type':          'Article',
    headline:         article.title,
    description:      article.excerpt,
    image:            article.coverImage,
    datePublished:    article.publishedAt,
    dateModified:     article.updatedAt,
    author: {
      '@type': 'Person',
      name:    article.author.name,
    },
    publisher: {
      '@type': 'Organization',
      name:    SITE_NAME,
      logo:    { '@type': 'ImageObject', url: `${SITE_URL}/logo.png` },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
  };
}

export function buildReviewSchema({ article, url }) {
  return {
    '@context':   'https://schema.org',
    '@type':      'Review',
    name:         article.title,
    reviewBody:   article.excerpt,
    reviewRating: {
      '@type':      'Rating',
      ratingValue:  article.rating,
      bestRating:   5,
      worstRating:  1,
    },
    author:    { '@type': 'Person', name: article.author.name },
    itemReviewed: {
      '@type': 'SoftwareApplication',
      name:    article.affiliateProduct?.name || article.title,
    },
    url,
  };
}

export function buildFAQSchema(faqs) {
  return {
    '@context': 'https://schema.org',
    '@type':    'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type':          'Question',
      name:             faq.question,
      acceptedAnswer:   { '@type': 'Answer', text: faq.answer },
    })),
  };
}

export function buildBreadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type':    'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type':    'ListItem',
      position:   i + 1,
      name:       item.name,
      item:       `${SITE_URL}${item.href}`,
    })),
  };
}
