import Link from 'next/link';
import { FaBolt, FaTwitter, FaYoutube, FaInstagram, FaTiktok } from 'react-icons/fa';
import { HiMail } from 'react-icons/hi';
import categories from '../../data/categories';

const footerLinks = {
  'Content': [
    { label: 'Latest Reviews',   href: '/blog?type=review' },
    { label: 'Best Of Lists',    href: '/blog?type=listicle' },
    { label: 'Comparisons',      href: '/blog?type=comparison' },
    { label: 'Launch Reviews',   href: '/blog?type=launch-jacking' },
    { label: 'All Articles',     href: '/blog' },
  ],
  'Company': [
    { label: 'About Us',         href: '/about' },
    { label: 'Contact',          href: '/contact' },
    { label: 'Privacy Policy',   href: '/privacy-policy' },
    { label: 'Affiliate Disclaimer', href: '/affiliate-disclaimer' },
  ],
};

const socials = [
  { icon: FaTwitter,  href: '#', label: 'Twitter'   },
  { icon: FaYoutube,  href: '#', label: 'YouTube'   },
  { icon: FaInstagram,href: '#', label: 'Instagram' },
  { icon: FaTiktok,   href: '#', label: 'TikTok'    },
];

export default function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-dark-card border-t border-gray-200 dark:border-dark-border mt-20">

      {/* Newsletter strip */}
      <div className="bg-gradient-to-r from-primary-700 via-primary-600 to-purple-700 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <HiMail className="text-4xl text-white/80 mx-auto mb-3" />
          <h3 className="text-2xl font-bold text-white mb-2">
            Get the Best Deals in Your Inbox
          </h3>
          <p className="text-primary-200 mb-6 text-sm">
            Join 12,000+ subscribers getting weekly tool reviews, discount codes, and affiliate tips.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={e => e.preventDefault()}>
            <input
              type="email"
              placeholder="Enter your email..."
              className="flex-1 px-4 py-3 rounded-xl text-gray-900 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-white/40"
            />
            <button type="submit" className="bg-accent-500 hover:bg-accent-600 text-white font-bold px-6 py-3 rounded-xl transition-colors whitespace-nowrap text-sm">
              Subscribe Free →
            </button>
          </form>
          <p className="text-primary-300 text-xs mt-3">No spam. Unsubscribe any time.</p>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">

          {/* Brand */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <span className="bg-gradient-to-br from-primary-600 to-purple-600 p-1.5 rounded-lg">
                <FaBolt className="text-white text-sm" />
              </span>
              <span className="font-extrabold text-xl text-gray-900 dark:text-white">
                Affiliate<span className="gradient-text">Pro</span>
              </span>
            </Link>
            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-5">
              Honest reviews, in-depth comparisons, and the best deals on AI tools, software, and online courses.
            </p>
            <div className="flex items-center gap-2">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="p-2.5 rounded-xl bg-gray-100 dark:bg-dark-border text-gray-500 dark:text-gray-400 hover:bg-primary-100 dark:hover:bg-primary-900/30 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                >
                  <Icon className="text-base" />
                </a>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white text-sm mb-4">Categories</h4>
            <ul className="space-y-2.5">
              {categories.slice(0, 5).map(cat => (
                <li key={cat.slug}>
                  <Link
                    href={`/category/${cat.slug}`}
                    className="text-sm text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors flex items-center gap-2"
                  >
                    <span>{cat.icon}</span> {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Other link columns */}
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <h4 className="font-semibold text-gray-900 dark:text-white text-sm mb-4">{heading}</h4>
              <ul className="space-y-2.5">
                {links.map(link => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-gray-200 dark:border-dark-border flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-400 dark:text-gray-500">
          <p>© {new Date().getFullYear()} AffiliatePro. All rights reserved.</p>
          <p className="text-center">
            This site contains affiliate links. We may earn a commission at no extra cost to you.{' '}
            <Link href="/affiliate-disclaimer" className="underline hover:text-primary-500">Learn more</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
