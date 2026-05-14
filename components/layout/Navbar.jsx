import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/router';
import { HiMenuAlt3, HiX, HiSearch, HiMoon, HiSun, HiChevronDown } from 'react-icons/hi';
import { FaBolt } from 'react-icons/fa';
import categories from '../../data/categories';

const navLinks = [
  { label: 'Home',     href: '/' },
  { label: 'Blog',     href: '/blog' },
  { label: 'Reviews',  href: '/blog?type=review' },
  { label: 'Best Of',  href: '/blog?type=listicle' },
  { label: 'Compare',  href: '/blog?type=comparison' },
  { label: 'About',    href: '/about' },
];

export default function Navbar() {
  const [menuOpen,    setMenuOpen]    = useState(false);
  const [searchOpen,  setSearchOpen]  = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [scrolled,    setScrolled]    = useState(false);
  const [catOpen,     setCatOpen]     = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => { setMounted(true); }, []);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close menu on route change
  useEffect(() => { setMenuOpen(false); setCatOpen(false); }, [router.asPath]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) router.push(`/blog?q=${encodeURIComponent(searchQuery.trim())}`);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled
        ? 'bg-white/90 dark:bg-dark-bg/90 backdrop-blur-md shadow-md shadow-black/5'
        : 'bg-white dark:bg-dark-bg'
    } border-b border-gray-100 dark:border-dark-border`}>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <span className="bg-gradient-to-br from-primary-600 to-purple-600 p-1.5 rounded-lg">
              <FaBolt className="text-white text-sm" />
            </span>
            <span className="font-extrabold text-xl text-gray-900 dark:text-white tracking-tight">
              Affiliate<span className="gradient-text">Pro</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors duration-150 ${
                  router.asPath === link.href
                    ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}

            {/* Categories dropdown */}
            <div className="relative">
              <button
                onClick={() => setCatOpen(!catOpen)}
                className="flex items-center gap-1 px-3.5 py-2 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                Categories <HiChevronDown className={`transition-transform ${catOpen ? 'rotate-180' : ''}`} />
              </button>
              {catOpen && (
                <div className="absolute top-full left-0 mt-1 w-64 bg-white dark:bg-dark-card border border-gray-100 dark:border-dark-border rounded-2xl shadow-xl p-2 animate-slide-down">
                  {categories.map(cat => (
                    <Link
                      key={cat.slug}
                      href={`/category/${cat.slug}`}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
                    >
                      <span className="text-xl">{cat.icon}</span>
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">{cat.name}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-500">{cat.count} articles</p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            {/* Search */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 rounded-lg text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
              aria-label="Search"
            >
              <HiSearch className="text-xl" />
            </button>

            {/* Dark mode toggle */}
            {mounted && (
              <button
                onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
                className="p-2 rounded-lg text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
                aria-label="Toggle dark mode"
              >
                {resolvedTheme === 'dark' ? <HiSun className="text-xl" /> : <HiMoon className="text-xl" />}
              </button>
            )}

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
              aria-label="Menu"
            >
              {menuOpen ? <HiX className="text-2xl" /> : <HiMenuAlt3 className="text-2xl" />}
            </button>
          </div>
        </div>

        {/* Search bar */}
        {searchOpen && (
          <div className="pb-3 animate-slide-down">
            <form onSubmit={handleSearch} className="flex gap-2">
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search articles, reviews, comparisons..."
                className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 dark:border-dark-border bg-gray-50 dark:bg-dark-card text-gray-900 dark:text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                autoFocus
              />
              <button type="submit" className="btn-primary text-sm px-4 py-2.5">
                Search
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden bg-white dark:bg-dark-bg border-t border-gray-100 dark:border-dark-border animate-slide-down">
          <div className="px-4 py-4 space-y-1">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={`block px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  router.asPath === link.href
                    ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2 border-t border-gray-100 dark:border-dark-border">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-4 mb-2">Categories</p>
              {categories.map(cat => (
                <Link
                  key={cat.slug}
                  href={`/category/${cat.slug}`}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
                >
                  <span>{cat.icon}</span> {cat.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
