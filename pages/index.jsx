import SEOHead from '../components/seo/SEOHead';
import Hero from '../components/home/Hero';
import FeaturedArticles from '../components/home/FeaturedArticles';
import TrendingProducts from '../components/home/TrendingProducts';
import Categories from '../components/home/Categories';
import TrustSection from '../components/home/TrustSection';
import Newsletter from '../components/home/Newsletter';
import ArticleCard from '../components/blog/ArticleCard';
import Link from 'next/link';
import { HiArrowRight } from 'react-icons/hi';
import { getFeatured, getTrending, articles } from '../data/articles';
import { getTrendingProducts } from '../data/products';
import categories from '../data/categories';

export default function HomePage({ featuredArticles, trendingProducts, recentArticles, allCategories }) {
  return (
    <>
      <SEOHead
        title="Best AI Tools, Software Reviews & Affiliate Deals"
        description="Honest reviews, in-depth comparisons, and exclusive deals on AI tools, SaaS software, and online courses. Updated weekly by real experts."
        canonical="/"
      />

      {/* Hero */}
      <Hero />

      {/* Featured articles */}
      <FeaturedArticles articles={featuredArticles} />

      {/* Categories */}
      <Categories categories={allCategories} />

      {/* Trending products */}
      <TrendingProducts products={trendingProducts} />

      {/* Recent posts */}
      <section className="py-16 bg-white dark:bg-dark-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <div>
              <p className="text-sm font-semibold text-primary-600 dark:text-primary-400 uppercase tracking-wider mb-1">
                Fresh Content
              </p>
              <h2 className="section-heading">Recent Articles</h2>
            </div>
            <Link href="/blog" className="hidden sm:flex items-center gap-1.5 text-sm font-semibold text-primary-600 dark:text-primary-400 hover:gap-3 transition-all">
              All Articles <HiArrowRight />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {recentArticles.map(article => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </div>
      </section>

      {/* Trust / social proof */}
      <TrustSection />

      {/* Newsletter */}
      <Newsletter />
    </>
  );
}

export async function getStaticProps() {
  return {
    props: {
      featuredArticles:  getFeatured().slice(0, 3),
      trendingProducts:  getTrendingProducts().slice(0, 6),
      recentArticles:    articles.slice(0, 4),
      allCategories:     categories,
    },
  };
}
