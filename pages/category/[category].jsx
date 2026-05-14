import SEOHead from '../../components/seo/SEOHead';
import ArticleCard from '../../components/blog/ArticleCard';
import Link from 'next/link';
import { HiChevronRight } from 'react-icons/hi';
import { articles, getByCategory } from '../../data/articles';
import categories from '../../data/categories';

export default function CategoryPage({ category, categoryArticles }) {
  return (
    <>
      <SEOHead
        title={`${category.name} Reviews & Guides`}
        description={category.description}
        canonical={`/category/${category.slug}`}
      />

      {/* Header */}
      <div className={`bg-gradient-to-br ${category.color} py-16 text-white`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-xs text-white/70 mb-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <HiChevronRight />
            <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
            <HiChevronRight />
            <span className="text-white">{category.name}</span>
          </nav>

          <div className="flex items-center gap-4 mb-4">
            <span className="text-5xl">{category.icon}</span>
            <div>
              <h1 className="text-4xl md:text-5xl font-black">{category.name}</h1>
              <p className="text-white/80 text-lg mt-1 max-w-2xl">{category.description}</p>
            </div>
          </div>

          <p className="text-white/60 text-sm mt-4">{categoryArticles.length} articles</p>
        </div>
      </div>

      {/* Articles grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {categoryArticles.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoryArticles.map(article => (
              <ArticleCard key={article.slug} article={article} featured />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-5xl mb-4">{category.icon}</p>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No articles yet</h3>
            <p className="text-gray-400">We're working on content for this category. Check back soon!</p>
            <Link href="/blog" className="btn-primary mt-6 inline-flex">Browse All Articles</Link>
          </div>
        )}
      </div>
    </>
  );
}

export async function getStaticPaths() {
  return {
    paths:    categories.map(c => ({ params: { category: c.slug } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const category = categories.find(c => c.slug === params.category);
  if (!category) return { notFound: true };

  return {
    props: {
      category,
      categoryArticles: getByCategory(params.category),
    },
  };
}
