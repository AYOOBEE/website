import Link from 'next/link';
import { HiCheckCircle, HiXCircle } from 'react-icons/hi';
import { FaExternalLinkAlt, FaBolt } from 'react-icons/fa';

// ─── Badge colour map ─────────────────────────────────────────────────────────
const BADGE_STYLES = {
  primary: 'bg-primary-100 dark:bg-primary-900/40 text-primary-700 dark:text-primary-300 border border-primary-200 dark:border-primary-800',
  gray:    'bg-gray-100 dark:bg-dark-border text-gray-600 dark:text-gray-300',
  blue:    'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300',
  purple:  'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300',
  green:   'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300',
  orange:  'bg-orange-100 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300',
  accent:  'bg-amber-100 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300',
};

// ─── Rating bar (out of 10) ───────────────────────────────────────────────────
function RatingBar({ rating, size = 'md' }) {
  const pct = `${(rating / 10) * 100}%`;
  return (
    <div className="flex items-center gap-2">
      <div className={`bg-gray-100 dark:bg-dark-border rounded-full overflow-hidden flex-shrink-0 ${size === 'lg' ? 'h-2.5 w-32' : 'h-2 w-24'}`}>
        <div
          className="h-full bg-gradient-to-r from-primary-500 to-purple-500 rounded-full"
          style={{ width: pct }}
        />
      </div>
      <span className={`font-bold text-gray-900 dark:text-white ${size === 'lg' ? 'text-base' : 'text-sm'}`}>
        {rating}<span className="text-gray-400 font-normal">/10</span>
      </span>
    </div>
  );
}

// ─── Featured Tool Card (#1 — full layout) ───────────────────────────────────
function FeaturedCard({ tool }) {
  const rel = tool.isAffiliate
    ? 'noopener noreferrer sponsored nofollow'
    : 'noopener noreferrer nofollow';

  return (
    <div id={tool.id} className="rounded-3xl overflow-hidden border-2 border-primary-500 shadow-2xl shadow-primary-500/10 scroll-mt-24">

      {/* Header gradient */}
      <div className="bg-gradient-to-r from-primary-600 to-purple-700 px-6 py-5 sm:px-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="bg-accent-500 text-white text-xs font-black px-3 py-1 rounded-full">
                #1 BEST OVERALL
              </span>
              <span className="bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full">
                {tool.badge}
              </span>
            </div>
            <h3 className="text-3xl font-black text-white">{tool.name}</h3>
            <p className="text-primary-200 text-sm mt-1">{tool.tagline}</p>
          </div>
          <div className="text-right">
            <RatingBar rating={tool.rating} size="lg" />
            <p className="text-primary-200 text-xs mt-1">Our Score</p>
          </div>
        </div>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-y sm:divide-y-0 divide-gray-100 dark:divide-dark-border bg-primary-50/60 dark:bg-primary-950/20">
        {[
          { label: 'Starting Price', value: tool.paidFrom },
          { label: 'Setup Time',     value: tool.setupTime },
          { label: 'AI Models',      value: '21 built-in' },
          { label: 'Trial',          value: '$5 / 7 days' },
        ].map((s, i) => (
          <div key={i} className="px-4 py-3 text-center">
            <p className="text-xs text-gray-400 mb-0.5">{s.label}</p>
            <p className="font-bold text-gray-900 dark:text-white text-sm">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-dark-card p-6 sm:p-8 space-y-7">

        {/* Why it's #1 */}
        <div>
          <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
            <FaBolt className="text-primary-500" /> Why AdSkull Is Our #1 Pick
          </h4>
          <div className="space-y-3">
            {tool.whyTopPick.map((para, i) => (
              <p key={i} className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">{para}</p>
            ))}
          </div>
        </div>

        {/* Key features grid */}
        <div>
          <h4 className="text-base font-bold text-gray-900 dark:text-white mb-3">Key Features</h4>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {tool.features.map((feat, i) => (
              <div key={i} className="rounded-xl bg-gray-50 dark:bg-dark-card/60 border border-gray-100 dark:border-dark-border p-3">
                <p className="font-semibold text-gray-900 dark:text-white text-sm mb-1">
                  {feat.icon} {feat.title}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing table */}
        {tool.pricing && (
          <div>
            <h4 className="text-base font-bold text-gray-900 dark:text-white mb-3">Pricing Plans</h4>
            <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-dark-border">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-gray-50 dark:bg-dark-card border-b border-gray-200 dark:border-dark-border">
                    <th className="text-left px-3 py-2.5 font-semibold text-primary-700 dark:text-primary-300 text-xs uppercase tracking-wide">Plan</th>
                    <th className="text-left px-3 py-2.5 font-semibold text-primary-700 dark:text-primary-300 text-xs uppercase tracking-wide">Price</th>
                    <th className="text-left px-3 py-2.5 font-semibold text-primary-700 dark:text-primary-300 text-xs uppercase tracking-wide">Accounts</th>
                    <th className="text-left px-3 py-2.5 font-semibold text-primary-700 dark:text-primary-300 text-xs uppercase tracking-wide">AI Credits</th>
                  </tr>
                </thead>
                <tbody>
                  {tool.pricing.map((row, i) => (
                    <tr
                      key={i}
                      className={`border-b border-gray-100 dark:border-dark-border/60 ${row.popular ? 'bg-primary-50/60 dark:bg-primary-950/20' : ''}`}
                    >
                      <td className="px-3 py-2.5 font-medium text-gray-900 dark:text-white">
                        {row.popular && (
                          <span className="text-xs bg-primary-600 text-white px-1.5 py-0.5 rounded mr-1.5 font-bold">POPULAR</span>
                        )}
                        {row.plan}
                      </td>
                      <td className="px-3 py-2.5 font-semibold text-gray-700 dark:text-gray-300">{row.price}</td>
                      <td className="px-3 py-2.5 text-gray-600 dark:text-gray-400">{row.accounts}</td>
                      <td className="px-3 py-2.5 text-gray-600 dark:text-gray-400">{row.credits}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-400 mt-2">20% savings on annual billing · {tool.priceNote}</p>
          </div>
        )}

        {/* Pros / Cons */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="rounded-2xl border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950/30 p-4">
            <h4 className="flex items-center gap-2 font-bold text-green-700 dark:text-green-400 text-sm uppercase tracking-wide mb-3">
              <HiCheckCircle className="text-lg" /> Pros
            </h4>
            <ul className="space-y-1.5">
              {tool.pros.map((pro, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                  <HiCheckCircle className="text-green-500 flex-shrink-0 mt-0.5 text-sm" />{pro}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/30 p-4">
            <h4 className="flex items-center gap-2 font-bold text-red-600 dark:text-red-400 text-sm uppercase tracking-wide mb-3">
              <HiXCircle className="text-lg" /> Cons
            </h4>
            <ul className="space-y-1.5">
              {tool.cons.map((con, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                  <HiXCircle className="text-red-400 flex-shrink-0 mt-0.5 text-sm" />{con}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Best for */}
        <div className="bg-primary-50 dark:bg-primary-950/30 rounded-xl border border-primary-100 dark:border-primary-900 p-4">
          <p className="text-xs font-bold text-primary-600 dark:text-primary-400 uppercase tracking-wider mb-1">Best For</p>
          <p className="text-sm text-gray-700 dark:text-gray-300">{tool.bestFor}</p>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3 pt-1">
          <a
            href={tool.affiliateUrl}
            target="_blank"
            rel={rel}
            className="btn-affiliate flex-1 justify-center"
          >
            Try {tool.name} Free <FaExternalLinkAlt className="text-xs" />
          </a>
          {tool.internalReview && (
            <Link href={tool.internalReview} className="btn-ghost text-sm flex-1 justify-center">
              Read Full Review →
            </Link>
          )}
        </div>
        <p className="text-xs text-gray-400 text-center -mt-4">
          Free plan available · {tool.priceNote}
        </p>
      </div>
    </div>
  );
}

// ─── Standard Tool Card (#2–#7) ───────────────────────────────────────────────
function StandardCard({ tool }) {
  const rel = tool.isAffiliate
    ? 'noopener noreferrer sponsored nofollow'
    : 'noopener noreferrer nofollow';

  return (
    <div id={tool.id} className="card overflow-hidden scroll-mt-24">

      {/* Header row */}
      <div className="flex flex-wrap items-start justify-between gap-4 p-5 pb-4 border-b border-gray-100 dark:border-dark-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-dark-border flex items-center justify-center flex-shrink-0">
            <span className="font-black text-gray-500 dark:text-gray-400 text-lg">#{tool.rank}</span>
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-0.5">
              <h3 className="font-black text-gray-900 dark:text-white text-lg">{tool.name}</h3>
              <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${BADGE_STYLES[tool.badgeColor] || BADGE_STYLES.gray}`}>
                {tool.badge}
              </span>
            </div>
            <RatingBar rating={tool.rating} />
          </div>
        </div>
        <div className="text-right">
          <p className="text-lg font-black text-gray-900 dark:text-white">{tool.paidFrom}</p>
          <p className="text-xs text-gray-400">{tool.priceNote}</p>
        </div>
      </div>

      <div className="p-5 space-y-4">

        {/* Platform badges + setup time */}
        <div className="flex flex-wrap items-center gap-2">
          {tool.platforms.map((p, i) => (
            <span key={i} className="text-xs bg-gray-100 dark:bg-dark-border text-gray-600 dark:text-gray-400 px-2 py-0.5 rounded-full font-medium">
              {p}
            </span>
          ))}
          <span className="text-xs text-gray-400 ml-auto">Setup: {tool.setupTime}</span>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{tool.description}</p>

        {/* Key highlights */}
        {tool.keyHighlights && (
          <ul className="space-y-1.5">
            {tool.keyHighlights.map((h, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                <HiCheckCircle className="text-primary-500 flex-shrink-0 mt-0.5 text-sm" />{h}
              </li>
            ))}
          </ul>
        )}

        {/* Compact pros / cons */}
        <div className="grid sm:grid-cols-2 gap-3">
          <div className="rounded-xl bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900 p-3">
            <p className="text-xs font-bold text-green-700 dark:text-green-400 mb-2">✅ Pros</p>
            <ul className="space-y-1">
              {tool.pros.slice(0, 4).map((pro, i) => (
                <li key={i} className="text-xs text-gray-700 dark:text-gray-300 leading-snug">· {pro}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900 p-3">
            <p className="text-xs font-bold text-red-600 dark:text-red-400 mb-2">❌ Cons</p>
            <ul className="space-y-1">
              {tool.cons.slice(0, 4).map((con, i) => (
                <li key={i} className="text-xs text-gray-700 dark:text-gray-300 leading-snug">· {con}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* CTA */}
        <a
          href={tool.affiliateUrl}
          target="_blank"
          rel={rel}
          className={`inline-flex items-center justify-center gap-2 text-sm font-semibold rounded-xl px-5 py-2.5 w-full transition-all duration-200 ${
            tool.isAffiliate
              ? 'btn-affiliate'
              : 'btn-ghost'
          }`}
        >
          Visit {tool.name} <FaExternalLinkAlt className="text-xs" />
        </a>
      </div>
    </div>
  );
}

// ─── Public API ───────────────────────────────────────────────────────────────
export default function ToolCard({ tool, featured = false }) {
  if (featured) return <FeaturedCard tool={tool} />;
  return <StandardCard tool={tool} />;
}
