import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

// Renders 1–5 star icons based on a numeric rating (supports half stars)
export default function StarRating({ rating, max = 5, size = 'md', showNumber = true }) {
  const sizes = { sm: 'text-xs', md: 'text-sm', lg: 'text-lg', xl: 'text-2xl' };

  const stars = Array.from({ length: max }, (_, i) => {
    const val = i + 1;
    if (rating >= val)           return 'full';
    if (rating >= val - 0.5)     return 'half';
    return 'empty';
  });

  return (
    <span className={`inline-flex items-center gap-1 ${sizes[size]}`}>
      {stars.map((type, i) => (
        <span key={i} className="text-yellow-400">
          {type === 'full'  && <FaStar />}
          {type === 'half'  && <FaStarHalfAlt />}
          {type === 'empty' && <FaRegStar className="text-gray-300 dark:text-gray-600" />}
        </span>
      ))}
      {showNumber && (
        <span className="text-gray-600 dark:text-gray-400 font-medium ml-0.5">
          {rating.toFixed(1)}
        </span>
      )}
    </span>
  );
}
