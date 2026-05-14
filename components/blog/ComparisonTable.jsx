import { FaExternalLinkAlt, FaTrophy } from 'react-icons/fa';

// ─── Comparison Table ─────────────────────────────────────────────────────────
export default function ComparisonTable({ table, affiliateLinks = {} }) {
  if (!table) return null;
  const { products, rows } = table;
  const winner = products[0]; // first product is the recommended winner

  return (
    <div className="my-10 overflow-x-auto rounded-2xl border border-gray-200 dark:border-dark-border shadow-sm">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-gray-50 dark:bg-dark-card">
            <th className="text-left px-5 py-4 text-gray-500 dark:text-gray-400 font-semibold w-40">Feature</th>
            {products.map((p, i) => (
              <th key={p} className={`px-5 py-4 text-center font-extrabold ${
                i === 0
                  ? 'text-primary-700 dark:text-primary-400 bg-primary-50/50 dark:bg-primary-900/10'
                  : 'text-gray-700 dark:text-gray-300'
              }`}>
                <div className="flex flex-col items-center gap-1">
                  {i === 0 && (
                    <span className="flex items-center gap-1 text-xs bg-accent-500 text-white px-2.5 py-0.5 rounded-full font-semibold">
                      <FaTrophy className="text-yellow-200 text-xs" /> Winner
                    </span>
                  )}
                  {p}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr
              key={ri}
              className={`border-t border-gray-100 dark:border-dark-border ${
                ri % 2 === 0 ? 'bg-white dark:bg-transparent' : 'bg-gray-50/50 dark:bg-white/2'
              }`}
            >
              <td className="px-5 py-3.5 font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">
                {row.feature}
              </td>
              {row.values.map((val, vi) => (
                <td
                  key={vi}
                  className={`px-5 py-3.5 text-center ${
                    vi === 0 ? 'bg-primary-50/30 dark:bg-primary-900/5 font-semibold' : ''
                  } ${
                    val === '✅' || val.startsWith('✅')
                      ? 'text-green-600 dark:text-green-400'
                      : val === '❌' || val.startsWith('❌')
                      ? 'text-red-400 dark:text-red-500'
                      : 'text-gray-700 dark:text-gray-300'
                  }`}
                >
                  {val}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        {/* CTA row */}
        <tfoot>
          <tr className="border-t-2 border-primary-200 dark:border-primary-800 bg-gray-50 dark:bg-dark-card">
            <td className="px-5 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Get Started</td>
            {products.map((p, i) => (
              <td key={p} className="px-5 py-4 text-center">
                {affiliateLinks[p] ? (
                  <a
                    href={affiliateLinks[p]}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className={i === 0 ? 'btn-affiliate text-xs px-4 py-2' : 'btn-ghost text-xs px-4 py-2'}
                  >
                    Try {p.split(' ')[0]} <FaExternalLinkAlt className="text-xs" />
                  </a>
                ) : (
                  <span className="text-gray-300 dark:text-gray-600 text-xs">—</span>
                )}
              </td>
            ))}
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
