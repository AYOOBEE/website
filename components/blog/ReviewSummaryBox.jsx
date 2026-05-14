import { FaExternalLinkAlt } from 'react-icons/fa';
import { HiCheckCircle } from 'react-icons/hi';
import StarRating from '../ui/StarRating';

// ─── Review Score Box ─────────────────────────────────────────────────────────
// Shown at the top of review articles — mimics high-converting affiliate review boxes
export default function ReviewSummaryBox({ article }) {
  if (!article.rating || !article.affiliateProduct) return null;
  const { affiliateProduct: prod } = article;

  const criteria = [
    { label: 'Ease of Use',    score: 4.5 },
    { label: 'Features',       score: article.rating },
    { label: 'Value for Money',score: 4.0 },
    { label: 'Support',        score: 4.2 },
  ];

  return (
    <div className="my-8 rounded-2xl border-2 border-primary-200 dark:border-primary-800 overflow-hidden shadow-lg">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-600 to-purple-700 px-6 py-4 flex items-center justify-between">
        <div>
          <p className="text-primary-200 text-sm">Our Rating</p>
          <h3 className="text-2xl font-black text-white">{prod.name} Review</h3>
        </div>
        <div className="text-right">
          <div className="text-5xl font-black text-white leading-none">{article.rating}</div>
          <div className="text-primary-200 text-xs mt-1">out of 5.0</div>
        </div>
      </div>

      <div className="bg-white dark:bg-dark-card p-6">
        {/* Star breakdown */}
        <div className="grid sm:grid-cols-2 gap-3 mb-6">
          {criteria.map(c => (
            <div key={c.label} className="flex items-center justify-between gap-3">
              <span className="text-sm text-gray-600 dark:text-gray-400 w-36">{c.label}</span>
              <div className="flex items-center gap-2 flex-1">
                <div className="flex-1 h-2 bg-gray-100 dark:bg-dark-border rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary-500 to-purple-500 rounded-full"
                    style={{ width: `${(c.score / 5) * 100}%` }}
                  />
                </div>
                <span className="text-xs font-bold text-gray-700 dark:text-gray-300 w-7 text-right">
                  {c.score}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Top pros */}
        {article.pros && (
          <ul className="space-y-1.5 mb-6">
            {article.pros.slice(0, 3).map((pro, i) => (
              <li key={i} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                <HiCheckCircle className="text-green-500 flex-shrink-0" /> {pro}
              </li>
            ))}
          </ul>
        )}

        {/* Pricing + CTA */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-gray-100 dark:border-dark-border">
          <div>
            <p className="text-xs text-gray-400 mb-0.5">Starting at</p>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-black text-gray-900 dark:text-white">{prod.price}</span>
              {prod.originalPrice && (
                <span className="line-through text-gray-400 text-sm">{prod.originalPrice}</span>
              )}
              {prod.discount && (
                <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  {prod.discount}
                </span>
              )}
            </div>
          </div>
          <a
            href={prod.affiliateUrl}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="btn-affiliate text-sm"
          >
            Try {prod.name} Free <FaExternalLinkAlt className="text-xs" />
          </a>
        </div>
      </div>
    </div>
  );
}
