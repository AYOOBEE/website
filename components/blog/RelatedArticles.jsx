import ArticleCard from './ArticleCard';

export default function RelatedArticles({ articles }) {
  if (!articles || articles.length === 0) return null;

  return (
    <section className="mt-14 pt-10 border-t border-gray-200 dark:border-dark-border">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Related Articles
      </h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map(article => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </div>
    </section>
  );
}
