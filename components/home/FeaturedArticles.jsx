import Link from 'next/link';
import { HiArrowRight } from 'react-icons/hi';
import ArticleCard from '../blog/ArticleCard';

export default function FeaturedArticles({ articles }) {
  if (!articles || articles.length === 0) return null;
  const [main, ...rest] = articles;

  return (
    <section className="py-16 bg-white dark:bg-dark-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <p className="text-sm font-semibold text-primary-600 dark:text-primary-400 uppercase tracking-wider mb-1">
              Editor's Picks
            </p>
            <h2 className="section-heading">Featured Articles</h2>
          </div>
          <Link
            href="/blog"
            className="hidden sm:flex items-center gap-1.5 text-sm font-semibold text-primary-600 dark:text-primary-400 hover:gap-3 transition-all"
          >
            View all <HiArrowRight />
          </Link>
        </div>

        {/* Grid: 1 large + 2 medium */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main feature */}
          <div className="lg:col-span-2">
            <ArticleCard article={main} featured />
          </div>

          {/* Side cards */}
          <div className="flex flex-col gap-6">
            {rest.slice(0, 2).map(article => (
              <ArticleCard key={article.slug} article={article} horizontal />
            ))}
          </div>
        </div>

        {/* Mobile "view all" */}
        <div className="mt-8 text-center sm:hidden">
          <Link href="/blog" className="btn-ghost text-sm">
            View All Articles <HiArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
}
