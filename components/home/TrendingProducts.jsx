import Link from 'next/link';
import Image from 'next/image';
import { HiArrowRight, HiExternalLink } from 'react-icons/hi';
import { FaFire } from 'react-icons/fa';
import StarRating from '../ui/StarRating';
import Badge from '../ui/Badge';

function ProductCard({ product }) {
  return (
    <div className="card p-5 flex flex-col gap-4 group hover:-translate-y-1 transition-transform duration-200">
      <div className="flex items-start gap-4">
        {/* Product image */}
        <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100 dark:bg-dark-border relative">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            sizes="56px"
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className="font-bold text-gray-900 dark:text-white text-sm leading-snug">{product.name}</h3>
            <span className={`text-xs font-bold text-white px-2 py-0.5 rounded-full flex-shrink-0 ${product.badgeColor}`}>
              {product.badge}
            </span>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">{product.tagline}</p>
        </div>
      </div>

      {/* Rating + price */}
      <div className="flex items-center justify-between">
        <StarRating rating={product.rating} size="sm" />
        <div className="flex items-center gap-1.5">
          <span className="font-bold text-gray-900 dark:text-white text-sm">{product.price}</span>
          {product.originalPrice && (
            <span className="line-through text-gray-400 text-xs">{product.originalPrice}</span>
          )}
          {product.discount && (
            <Badge variant="red">{product.discount}</Badge>
          )}
        </div>
      </div>

      {/* CTA */}
      <a
        href={product.affiliateUrl}
        target="_blank"
        rel="noopener noreferrer nofollow"
        className="btn-affiliate w-full text-xs py-2.5"
      >
        Get {product.name} <HiExternalLink />
      </a>
    </div>
  );
}

export default function TrendingProducts({ products }) {
  if (!products || products.length === 0) return null;

  return (
    <section className="py-16 bg-gray-50 dark:bg-dark-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-10">
          <div>
            <p className="text-sm font-semibold text-accent-500 uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <FaFire /> Hot Right Now
            </p>
            <h2 className="section-heading">Trending Products</h2>
            <p className="section-sub text-left mt-2">
              Top-performing tools our readers are buying this week
            </p>
          </div>
          <Link
            href="/blog?type=review"
            className="hidden sm:flex items-center gap-1.5 text-sm font-semibold text-primary-600 dark:text-primary-400 hover:gap-3 transition-all"
          >
            All Reviews <HiArrowRight />
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
