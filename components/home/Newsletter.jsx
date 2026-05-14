import { useState } from 'react';
import { HiMail, HiCheckCircle } from 'react-icons/hi';
import { FaBolt } from 'react-icons/fa';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    // Replace with your email provider API call (ConvertKit, Mailchimp, etc.)
    setTimeout(() => {
      setSubmitted(true);
      setLoading(false);
    }, 800);
  };

  const perks = [
    'Weekly tool reviews before they go live',
    'Exclusive coupon codes for subscribers',
    'Early access to comparison guides',
    'No spam — unsubscribe any time',
  ];

  return (
    <section className="py-20 bg-white dark:bg-dark-bg relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50 to-purple-50 dark:from-primary-950/20 dark:to-purple-950/20 pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="card p-8 md:p-12 text-center shadow-2xl border-primary-100 dark:border-primary-900">

          <div className="w-16 h-16 bg-gradient-to-br from-primary-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <HiMail className="text-white text-3xl" />
          </div>

          <h2 className="section-heading mb-3">
            Get the <span className="gradient-text">Best Deals</span> First
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-lg mx-auto">
            Join 12,000+ marketers and creators getting weekly tool reviews, comparison guides, and exclusive discount codes.
          </p>

          {submitted ? (
            <div className="flex flex-col items-center gap-3 py-4">
              <HiCheckCircle className="text-green-500 text-5xl" />
              <p className="text-xl font-bold text-gray-900 dark:text-white">You're in!</p>
              <p className="text-gray-500 text-sm">Check your inbox for a confirmation email.</p>
            </div>
          ) : (
            <>
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-6">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Enter your email address..."
                  className="flex-1 px-4 py-3.5 rounded-xl border border-gray-200 dark:border-dark-border bg-white dark:bg-dark-bg text-gray-900 dark:text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-affiliate whitespace-nowrap"
                >
                  {loading ? (
                    <span className="animate-spin inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                  ) : (
                    <><FaBolt /> Subscribe Free</>
                  )}
                </button>
              </form>

              {/* Perks */}
              <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
                {perks.map(perk => (
                  <span key={perk} className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
                    <HiCheckCircle className="text-green-500 flex-shrink-0" /> {perk}
                  </span>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
