import Link from 'next/link';
import { HiArrowRight, HiStar } from 'react-icons/hi';
import { FaBolt, FaFire } from 'react-icons/fa';

const stats = [
  { value: '500+', label: 'Tools Reviewed' },
  { value: '50K+', label: 'Monthly Readers' },
  { value: '4.9★', label: 'Average Rating' },
];

const trustBadges = [
  '🔒 100% Independent',
  '✅ Honest Reviews',
  '🔄 Updated Weekly',
  '💰 Free to Read',
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-white dark:bg-dark-bg mesh-bg py-20 md:py-28">
      {/* Animated background orbs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-400/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-purple-400/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-accent-400/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

        {/* Trending banner */}
        <div className="inline-flex items-center gap-2 bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800 text-primary-700 dark:text-primary-300 text-sm font-semibold px-4 py-2 rounded-full mb-8 animate-bounce-gentle">
          <FaFire className="text-accent-500" />
          New: ChatGPT-4o Just Launched — Read Our Review
          <HiArrowRight />
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 dark:text-white leading-tight tracking-tight mb-6 text-balance">
          Find the Best{' '}
          <span className="gradient-text">AI Tools & Software</span>
          <br />Before You Buy
        </h1>

        {/* Sub-headline */}
        <p className="text-lg md:text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          Brutally honest reviews, side-by-side comparisons, and exclusive discounts on the tools that actually move the needle for creators and marketers.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <Link href="/blog" className="btn-affiliate text-base px-8 py-4">
            <FaBolt /> Browse All Reviews <HiArrowRight />
          </Link>
          <Link href="/blog?type=comparison" className="btn-ghost text-base px-8 py-4">
            Compare Tools Side-by-Side
          </Link>
        </div>

        {/* Trust badges */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          {trustBadges.map(badge => (
            <span key={badge} className="trust-badge">{badge}</span>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 max-w-sm mx-auto gap-8">
          {stats.map(stat => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white">{stat.value}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
