import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';
import { HiClock, HiArrowRight } from 'react-icons/hi';
import { FaFire } from 'react-icons/fa';
import StarRating from '../ui/StarRating';
import Badge from '../ui/Badge';

const typeLabels = {
  review:         { label: 'Review',      variant: 'primary' },
  listicle:       { label: 'Best Of',     variant: 'green' },
  comparison:     { label: 'Comparison',  variant: 'purple' },
  'launch-jacking':{ label: '🚀 Launch', variant: 'accent' },
  tutorial:       { label: 'Tutorial',    variant: 'gray' },
};

export default function ArticleCard({ article, featured = false, horizontal = false }) {
  const meta = typeLabels[article.type] || typeLabels.tutorial;

  if (horizontal) {
    return (
      <article className="card flex gap-4 overflow-hidden group">
        <div className="article-img-wrap flex-shrink-0 w-32 h-28 md:w-44 md:h-36 relative">
          <Image
            src={article.coverImage}
            alt={article.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 128px, 176px"
          />
        </div>
        <div className="flex flex-col justify-between py-3 pr-4 flex-1 min-w-0">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant={meta.variant}>{meta.label}</Badge>
              {article.trending && (
                <Badge variant="accent"><FaFire className="text-xs" /> Trending</Badge>
              )}
            </div>
            <Link href={`/blog/${article.slug}`}>
              <h3 className={`font-bold text-gray-900 dark:text-white leading-snug line-clamp-2 hover:text-primary-600 dark:hover:text-primary-400 transition-colors ${
                featured ? 'text-base md:text-lg' : 'text-sm md:text-base'
              }`}>
                {article.title}
              </h3>
            </Link>
          </div>
          <div className="flex items-center gap-3 text-xs text-gray-400">
            {article.rating && <StarRating rating={article.rating} size="sm" />}
            <span className="flex items-center gap-1"><HiClock /> {article.readingTime} min</span>
            <span>{format(new Date(article.publishedAt), 'MMM d, yyyy')}</span>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="card overflow-hidden group flex flex-col h-full">
      {/* Image */}
      <div className="article-img-wrap relative h-48 md:h-52">
        <Image
          src={article.coverImage}
          alt={article.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {/* Type badge overlay */}
        <div className="absolute top-3 left-3 flex gap-2">
          <Badge variant={meta.variant}>{meta.label}</Badge>
          {article.trending && (
            <Badge variant="accent"><FaFire className="text-xs" /></Badge>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        {/* Category */}
        <Link
          href={`/category/${article.category}`}
          className="text-xs font-semibold text-primary-600 dark:text-primary-400 uppercase tracking-wider mb-2 hover:underline"
        >
          {article.category.replace(/-/g, ' ')}
        </Link>

        {/* Title */}
        <Link href={`/blog/${article.slug}`} className="flex-1">
          <h3 className={`font-extrabold text-gray-900 dark:text-white leading-snug mb-2 hover:text-primary-600 dark:hover:text-primary-400 transition-colors ${
            featured ? 'text-xl' : 'text-base md:text-lg'
          }`}>
            {article.title}
          </h3>
        </Link>

        {/* Excerpt */}
        {featured && (
          <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-4 flex-1">
            {article.excerpt}
          </p>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100 dark:border-dark-border">
          <div className="flex items-center gap-3 text-xs text-gray-400">
            {article.rating && <StarRating rating={article.rating} size="sm" />}
            <span className="flex items-center gap-1"><HiClock className="text-xs" /> {article.readingTime} min</span>
          </div>
          <Link
            href={`/blog/${article.slug}`}
            className="flex items-center gap-1 text-xs font-semibold text-primary-600 dark:text-primary-400 hover:gap-2 transition-all"
          >
            Read <HiArrowRight />
          </Link>
        </div>
      </div>
    </article>
  );
}
