import Link from 'next/link';
import { HiArrowRight } from 'react-icons/hi';

export default function Categories({ categories }) {
  return (
    <section className="py-16 bg-white dark:bg-dark-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <p className="text-sm font-semibold text-primary-600 dark:text-primary-400 uppercase tracking-wider mb-2">
            Browse by Topic
          </p>
          <h2 className="section-heading">Explore Categories</h2>
          <p className="section-sub">Find the exact type of tool or review you're looking for</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map(cat => (
            <Link
              key={cat.slug}
              href={`/category/${cat.slug}`}
              className="group flex flex-col items-center text-center p-5 rounded-2xl border border-gray-100 dark:border-dark-border bg-white dark:bg-dark-card hover:border-primary-300 dark:hover:border-primary-700 hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
            >
              <div className={`text-3xl mb-3 p-3 rounded-xl bg-gradient-to-br ${cat.color} text-white`}>
                {cat.icon}
              </div>
              <h3 className="font-bold text-sm text-gray-900 dark:text-white mb-1 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                {cat.name}
              </h3>
              <p className="text-xs text-gray-400">{cat.count} articles</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
