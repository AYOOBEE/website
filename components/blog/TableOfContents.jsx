import { useState, useEffect } from 'react';
import { HiChevronDown, HiMenuAlt3 } from 'react-icons/hi';

export default function TableOfContents({ items }) {
  const [activeId, setActiveId] = useState('');
  const [open, setOpen] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter(e => e.isIntersecting);
        if (visible.length > 0) setActiveId(visible[0].target.id);
      },
      { rootMargin: '-80px 0px -60% 0px', threshold: 0 }
    );

    items.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items]);

  return (
    <nav className="rounded-2xl border border-gray-200 dark:border-dark-border bg-gray-50 dark:bg-dark-card overflow-hidden mb-8">
      {/* Header */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 font-semibold text-gray-900 dark:text-white text-sm hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
      >
        <span className="flex items-center gap-2">
          <HiMenuAlt3 className="text-primary-500" /> Table of Contents
        </span>
        <HiChevronDown className={`text-gray-400 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <ol className="px-4 pb-4 space-y-0.5">
          {items.map((item, i) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={`toc-item flex items-center gap-2.5 ${
                  activeId === item.id
                    ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 font-semibold'
                    : ''
                }`}
              >
                <span className={`w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold border ${
                  activeId === item.id
                    ? 'bg-primary-600 border-primary-600 text-white'
                    : 'border-gray-300 dark:border-gray-600 text-gray-400'
                }`}>
                  {i + 1}
                </span>
                {item.label}
              </a>
            </li>
          ))}
        </ol>
      )}
    </nav>
  );
}
