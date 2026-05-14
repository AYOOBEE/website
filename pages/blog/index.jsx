import { useState, useMemo } from 'react';
import { useRouter } from 'next/router';
import SEOHead from '../../components/seo/SEOHead';
import ArticleCard from '../../components/blog/ArticleCard';
import { HiSearch, HiFilter } from 'react-icons/hi';
import articles from '../../data/articles';
import categories from '../../data/categories';

const types = [
  { value: '',               label: 'All Types' },
  { value: 'review',         label: '⭐ Reviews' },
  { value: 'listicle',       label: '📋 Best Of' },
  { value: 'comparison',     label: '⚖️ Comparisons' },
  { value: 'launch-jacking', label: '🚀 Launches' },
];

export default function BlogIndex({ allArticles, allCategories }) {
  const router = useRouter();
  const [search, setSearch]     = useState(router.query.q || '');
  const [typeFilter, setType]   = useState(router.query.type || '');
  const [catFilter, setCat]     = useState('');

  const filtered = useMemo(() => {
    let list = allArticles;
    if (search)     list = list.filter(a =>
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.excerpt.toLowerCase().includes(search.toLowerCase())
    );
    if (typeFilter) list = list.filter(a => a.type === typeFilter);
    if (catFilter)  list = list.filter(a => a.category === catFilter);
    return list;
  }, [search, typeFilter, catFilter, allArticles]);

  return (
    <>
      <SEOHead
        title="All Articles — Reviews, Comparisons & Guides"
        description="Browse all our product reviews, tool comparisons, best-of lists, and launch coverage. Updated weekly."
        canonical="/blog"
      />

      {/* Page header */}
      <div className="bg-gradient-to-br from-primary-950 via-primary-900 to-purple-950 py-16 text-white text-center">
        <p className="text-primary-400 text-sm font-semibold uppercase tracking-wider mb-2">The Blog</p>
        <h1 className="text-4xl md:text-5xl font-black mb-4">All Articles</h1>
        <p className="text-primary-300 text-lg max-w-xl mx-auto">
          Reviews, comparisons, best-of lists, and launch coverage — all in one place.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-10">
          {/* Search */}
          <div className="relative flex-1">
            <HiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search articles..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-dark-border bg-white dark:bg-dark-card text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          {/* Type filter */}
          <div className="flex items-center gap-2 flex-wrap">
            <HiFilter className="text-gray-400 flex-shrink-0" />
            {types.map(t => (
              <button
                key={t.value}
                onClick={() => setType(t.value)}
                className={`text-xs font-semibold px-4 py-2.5 rounded-full border transition-colors ${
                  typeFilter === t.value
                    ? 'bg-primary-600 text-white border-primary-600'
                    : 'border-gray-200 dark:border-dark-border text-gray-600 dark:text-gray-400 hover:border-primary-400 hover:text-primary-600'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-10">
          <button
            onClick={() => setCat('')}
            className={`text-xs font-semibold px-3 py-1.5 rounded-full transition-colors ${
              catFilter === ''
                ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900'
                : 'bg-gray-100 dark:bg-dark-card text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-dark-border'
            }`}
          >
            All Categories
          </button>
          {allCategories.map(cat => (
            <button
              key={cat.slug}
              onClick={() => setCat(cat.slug)}
              className={`text-xs font-semibold px-3 py-1.5 rounded-full transition-colors ${
                catFilter === cat.slug
                  ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900'
                  : 'bg-gray-100 dark:bg-dark-card text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-dark-border'
              }`}
            >
              {cat.icon} {cat.name}
            </button>
          ))}
        </div>

        {/* Results count */}
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
          {filtered.length} article{filtered.length !== 1 ? 's' : ''} found
        </p>

        {/* Article grid */}
        {filtered.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(article => (
              <ArticleCard key={article.slug} article={article} featured />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-5xl mb-4">🔍</p>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No articles found</h3>
            <p className="text-gray-400">Try a different search term or filter.</p>
          </div>
        )}
      </div>
    </>
  );
}

export async function getStaticProps() {
  return {
    props: {
      allArticles:    articles,
      allCategories:  categories,
    },
  };
}
