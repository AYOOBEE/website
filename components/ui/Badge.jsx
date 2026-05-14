import clsx from 'clsx';

const variants = {
  primary:  'bg-primary-100 dark:bg-primary-900/40 text-primary-700 dark:text-primary-300 border-primary-200 dark:border-primary-800',
  accent:   'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 border-orange-200 dark:border-orange-800',
  green:    'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800',
  red:      'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800',
  gray:     'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700',
  purple:   'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 border-purple-200 dark:border-purple-800',
};

export default function Badge({ children, variant = 'primary', className = '' }) {
  return (
    <span className={clsx(
      'inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full border',
      variants[variant],
      className,
    )}>
      {children}
    </span>
  );
}
