import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns';
import { HiClock, HiCalendar, HiChevronRight, HiArrowUp } from 'react-icons/hi';
import { FaFire, FaExternalLinkAlt } from 'react-icons/fa';

import SEOHead, {
  buildArticleSchema,
  buildReviewSchema,
  buildFAQSchema,
  buildBreadcrumbSchema,
} from '../../components/seo/SEOHead';
import TableOfContents from '../../components/blog/TableOfContents';
import ProsConsBox from '../../components/blog/ProsConsBox';
import ComparisonTable from '../../components/blog/ComparisonTable';
import FAQSection from '../../components/blog/FAQSection';
import ReviewSummaryBox from '../../components/blog/ReviewSummaryBox';
import AffiliateCTA from '../../components/blog/AffiliateCTA';
import RelatedArticles from '../../components/blog/RelatedArticles';
import Badge from '../../components/ui/Badge';
import StarRating from '../../components/ui/StarRating';
import { articles, getBySlug, getRelated } from '../../data/articles';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://affiliatepro.com';

export default function ArticlePage({ article, relatedArticles }) {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [stickyCTAVisible, setStickyCTAVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setShowScrollTop(y > 600);
      setStickyCTAVisible(y > 800);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const pageUrl = `${SITE_URL}/blog/${article.slug}`;

  // Build JSON-LD schemas
  const schemas = [buildArticleSchema({ article, url: pageUrl })];
  if (article.type === 'review' && article.rating) {
    schemas.push(buildReviewSchema({ article, url: pageUrl }));
  }
  if (article.faqs?.length) schemas.push(buildFAQSchema(article.faqs));
  schemas.push(buildBreadcrumbSchema([
    { name: 'Home',  href: '/' },
    { name: 'Blog',  href: '/blog' },
    { name: article.title, href: `/blog/${article.slug}` },
  ]));

  const affiliateLinks = article.affiliateProduct
    ? { [article.affiliateProduct.name]: article.affiliateProduct.affiliateUrl }
    : {};

  return (
    <>
      <SEOHead
        title={article.title}
        description={article.excerpt}
        canonical={`/blog/${article.slug}`}
        image={article.coverImage}
        type="article"
        schema={schemas}
      />

      {/* ── Urgency banner for launch jacking ── */}
      {article.urgency && (
        <div className="scarcity-box mx-4 mt-4 sm:mx-auto sm:max-w-4xl rounded-2xl">
          <FaFire className="text-xl flex-shrink-0" />
          <span className="font-semibold text-sm">
            🚀 <strong>Just Launched:</strong> Prices and features may change — read this review while it's fresh.
          </span>
        </div>
      )}

      {/* ── Article Hero ── */}
      <div className="relative h-64 md:h-96 w-full overflow-hidden">
        <Image
          src={article.coverImage}
          alt={article.title}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* Breadcrumb */}
        <div className="absolute bottom-6 left-4 sm:left-8">
          <nav className="flex items-center gap-1.5 text-xs text-white/70 mb-3">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <HiChevronRight />
            <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
            <HiChevronRight />
            <span className="text-white/90 truncate max-w-xs">{article.title}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex gap-10">

          {/* ── MAIN CONTENT ── */}
          <article className="flex-1 min-w-0 max-w-3xl">

            {/* Article meta */}
            <div className="mb-6">
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <Link
                  href={`/category/${article.category}`}
                  className="text-xs font-bold text-primary-600 dark:text-primary-400 uppercase tracking-wider hover:underline"
                >
                  {article.category.replace(/-/g, ' ')}
                </Link>
                {article.trending && <Badge variant="accent"><FaFire className="text-xs" /> Trending</Badge>}
                {article.urgency  && <Badge variant="red">🔥 Just Launched</Badge>}
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 dark:text-white leading-tight mb-5 text-balance">
                {article.title}
              </h1>

              <p className="text-lg text-gray-500 dark:text-gray-400 leading-relaxed mb-6">
                {article.excerpt}
              </p>

              {/* Author + meta row */}
              <div className="flex flex-wrap items-center gap-4 pb-6 border-b border-gray-200 dark:border-dark-border">
                <div className="flex items-center gap-3">
                  <Image
                    src={article.author.avatar}
                    alt={article.author.name}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">{article.author.name}</p>
                    <p className="text-xs text-gray-400">{article.author.bio}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-xs text-gray-400 ml-auto">
                  <span className="flex items-center gap-1">
                    <HiCalendar /> {format(new Date(article.publishedAt), 'MMM d, yyyy')}
                  </span>
                  <span className="flex items-center gap-1">
                    <HiClock /> {article.readingTime} min read
                  </span>
                  {article.rating && <StarRating rating={article.rating} size="sm" />}
                </div>
              </div>
            </div>

            {/* ── Review summary box (reviews only) ── */}
            {article.type === 'review' && <ReviewSummaryBox article={article} />}

            {/* ── Affiliate CTA (inline, above the fold) ── */}
            {article.affiliateProduct && (
              <AffiliateCTA product={article.affiliateProduct} variant="inline" />
            )}

            {/* ── Table of Contents (mobile — inside article) ── */}
            <div className="lg:hidden">
              <TableOfContents items={article.tableOfContents} />
            </div>

            {/* ── Article body ── */}
            <div
              className="article-body"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />

            {/* ── Pros & Cons ── */}
            {article.pros && article.cons && (
              <ProsConsBox pros={article.pros} cons={article.cons} />
            )}

            {/* ── Comparison table ── */}
            {article.comparisonTable && (
              <>
                <h2 id="comparison" className="scroll-mt-24 text-2xl font-bold text-gray-900 dark:text-white mt-10 mb-2">
                  Side-by-Side Comparison
                </h2>
                <ComparisonTable table={article.comparisonTable} affiliateLinks={affiliateLinks} />
              </>
            )}

            {/* ── Mid-article CTA ── */}
            {article.affiliateProduct && (
              <AffiliateCTA product={article.affiliateProduct} />
            )}

            {/* ── FAQ section ── */}
            <FAQSection faqs={article.faqs} />

            {/* ── Conclusion / final CTA ── */}
            {article.affiliateProduct && (
              <div id="verdict" className="scroll-mt-24">
                <div className="highlight-box my-8">
                  <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-2">
                    🏆 Our Final Verdict
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 text-sm mb-4">
                    Based on our testing, <strong>{article.affiliateProduct.name}</strong> is one of the best tools in its category.
                    {article.rating && ` We give it a ${article.rating}/5 rating.`}
                  </p>
                  <a
                    href={article.affiliateProduct.affiliateUrl}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="btn-affiliate text-sm"
                  >
                    Try {article.affiliateProduct.name} Free <FaExternalLinkAlt className="text-xs" />
                  </a>
                </div>
              </div>
            )}

            {/* ── Disclaimer ── */}
            <div className="mt-10 p-4 bg-gray-50 dark:bg-dark-card rounded-xl border border-gray-100 dark:border-dark-border">
              <p className="text-xs text-gray-400 leading-relaxed">
                <strong>Affiliate Disclosure:</strong> This article may contain affiliate links. If you click and purchase through our link, we may earn a small commission at no extra cost to you. This does not influence our reviews — we only recommend tools we genuinely believe in.{' '}
                <Link href="/affiliate-disclaimer" className="underline hover:text-primary-500">Learn more</Link>.
              </p>
            </div>

            {/* ── Related articles ── */}
            <RelatedArticles articles={relatedArticles} />
          </article>

          {/* ── STICKY SIDEBAR ── */}
          <aside className="hidden lg:block w-72 flex-shrink-0">
            <div className="sticky top-24 space-y-6">
              {/* TOC */}
              <TableOfContents items={article.tableOfContents} />

              {/* Sidebar affiliate widget */}
              {article.affiliateProduct && (
                <AffiliateCTA product={article.affiliateProduct} variant="sidebar" />
              )}

              {/* Newsletter sidebar */}
              <div className="card p-5 text-center">
                <p className="text-2xl mb-3">📬</p>
                <h4 className="font-bold text-gray-900 dark:text-white text-sm mb-2">Get Deals in Your Inbox</h4>
                <p className="text-xs text-gray-400 mb-4">Weekly reviews + coupon codes</p>
                <Link href="/#newsletter" className="btn-primary text-xs w-full">
                  Subscribe Free
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* ── Sticky CTA bar ── */}
      {stickyCTAVisible && article.affiliateProduct && (
        <div className="sticky-cta animate-slide-up">
          <div className="flex items-center gap-3">
            <span className="font-bold text-white text-sm hidden sm:block">
              {article.affiliateProduct.name}
            </span>
            {article.affiliateProduct.discount && (
              <span className="bg-accent-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                {article.affiliateProduct.discount}
              </span>
            )}
          </div>
          <a
            href={article.affiliateProduct.affiliateUrl}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="btn-affiliate text-sm py-2.5"
          >
            Get {article.affiliateProduct.name} <FaExternalLinkAlt className="text-xs" />
          </a>
        </div>
      )}

      {/* ── Scroll to top ── */}
      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-20 right-4 z-40 p-3 bg-primary-600 text-white rounded-full shadow-lg hover:bg-primary-700 transition-colors"
          aria-label="Scroll to top"
        >
          <HiArrowUp />
        </button>
      )}
    </>
  );
}

export async function getStaticPaths() {
  return {
    paths:    articles.map(a => ({ params: { slug: a.slug } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const article = getBySlug(params.slug);
  if (!article) return { notFound: true };

  return {
    props: {
      article,
      relatedArticles: getRelated(article, 3),
    },
  };
}
