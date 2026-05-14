import { FaExternalLinkAlt, FaTag, FaBolt } from 'react-icons/fa';
import { HiShieldCheck } from 'react-icons/hi';

// ─── Main affiliate CTA block ─────────────────────────────────────────────────
export default function AffiliateCTA({ product, variant = 'default' }) {
  if (!product) return null;

  if (variant === 'inline') {
    return (
      <div className="my-8 rounded-2xl bg-gradient-to-r from-primary-600 to-purple-700 p-6 text-white">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="text-primary-200 text-sm font-medium mb-1">Editor's Pick</p>
            <h3 className="text-xl font-extrabold">{product.name}</h3>
            <div className="flex items-center gap-3 mt-1">
              <span className="text-2xl font-black">{product.price}</span>
              {product.originalPrice && (
                <span className="line-through text-primary-300 text-lg">{product.originalPrice}</span>
              )}
              {product.discount && (
                <span className="bg-accent-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                  {product.discount}
                </span>
              )}
            </div>
          </div>
          <a
            href={product.affiliateUrl}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="flex-shrink-0 btn-affiliate"
          >
            Get {product.name} <FaExternalLinkAlt className="text-sm" />
          </a>
        </div>
        {product.coupon && (
          <div className="mt-4 pt-4 border-t border-white/20 flex items-center gap-2 text-sm">
            <FaTag className="text-accent-300" />
            <span className="text-primary-200">Use code</span>
            <code className="bg-white/20 px-2 py-0.5 rounded font-mono font-bold">{product.coupon}</code>
            <span className="text-primary-200">for extra savings</span>
          </div>
        )}
        <p className="text-xs text-primary-300 mt-3 flex items-center gap-1">
          <HiShieldCheck /> Affiliate link — we earn a small commission at no extra cost to you.
        </p>
      </div>
    );
  }

  if (variant === 'sidebar') {
    return (
      <div className="rounded-2xl border-2 border-primary-200 dark:border-primary-800 overflow-hidden">
        <div className="bg-gradient-to-br from-primary-600 to-purple-700 p-4 text-white text-center">
          {product.badge && (
            <span className="bg-accent-500 text-white text-xs font-bold px-3 py-1 rounded-full mb-2 inline-block">
              {product.badge}
            </span>
          )}
          <h4 className="font-extrabold text-lg">{product.name}</h4>
        </div>
        <div className="p-4 bg-white dark:bg-dark-card text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="text-2xl font-black text-gray-900 dark:text-white">{product.price}</span>
            {product.originalPrice && (
              <span className="line-through text-gray-400">{product.originalPrice}</span>
            )}
          </div>
          {product.discount && (
            <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm font-semibold px-3 py-1.5 rounded-lg mb-4 flex items-center justify-center gap-1">
              <FaBolt /> {product.discount} — Limited Time!
            </div>
          )}
          {product.coupon && (
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-2.5 mb-4">
              <p className="text-xs text-gray-500 mb-1">Coupon Code</p>
              <code className="font-mono font-bold text-sm text-yellow-700 dark:text-yellow-400">
                {product.coupon}
              </code>
            </div>
          )}
          <a
            href={product.affiliateUrl}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="btn-affiliate w-full text-sm"
          >
            Get {product.name} <FaExternalLinkAlt className="text-xs" />
          </a>
          <p className="text-xs text-gray-400 mt-3 flex items-center justify-center gap-1">
            <HiShieldCheck className="text-green-500" /> Secure affiliate link
          </p>
        </div>
      </div>
    );
  }

  // Default / large CTA box
  return (
    <div className="my-10 rounded-2xl overflow-hidden border border-gray-100 dark:border-dark-border shadow-xl">
      <div className="bg-gradient-to-r from-primary-700 to-purple-700 p-6 sm:p-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="text-white">
            {product.badge && (
              <span className="bg-accent-500 text-white text-xs font-bold px-3 py-1 rounded-full mb-3 inline-block">
                ⭐ {product.badge}
              </span>
            )}
            <h3 className="text-2xl font-extrabold mb-1">{product.name}</h3>
            <p className="text-primary-200 text-sm">Our top-recommended tool in this category</p>

            <div className="flex items-center gap-3 mt-3">
              <span className="text-3xl font-black">{product.price}</span>
              {product.originalPrice && (
                <span className="line-through text-primary-300 text-xl">{product.originalPrice}</span>
              )}
              {product.discount && (
                <span className="bg-accent-500 text-white font-bold text-sm px-3 py-1 rounded-full animate-pulse-slow">
                  {product.discount}
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col items-start md:items-end gap-3">
            <a
              href={product.affiliateUrl}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="btn-affiliate text-base px-8 py-4"
            >
              <FaBolt /> Try {product.name} Free <FaExternalLinkAlt className="text-sm" />
            </a>
            {product.coupon && (
              <div className="flex items-center gap-2 text-sm text-primary-200">
                <FaTag />
                <span>Code: <strong className="text-white font-mono">{product.coupon}</strong></span>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="bg-white dark:bg-dark-card px-6 py-3 flex flex-wrap items-center gap-4 text-xs text-gray-500">
        <span className="flex items-center gap-1"><HiShieldCheck className="text-green-500 text-sm" /> No spam. Cancel any time.</span>
        <span className="flex items-center gap-1">🔒 Secure checkout</span>
        <span className="flex items-center gap-1">💳 No credit card for trial</span>
        <span className="ml-auto">Affiliate link — <a href="/affiliate-disclaimer" className="underline hover:text-primary-500">learn more</a></span>
      </div>
    </div>
  );
}
