import { HiCheckCircle, HiXCircle } from 'react-icons/hi';

export default function ProsConsBox({ pros = [], cons = [] }) {
  return (
    <div className="my-8 grid md:grid-cols-2 gap-4">
      {/* Pros */}
      <div className="rounded-2xl border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950/30 p-5">
        <h4 className="flex items-center gap-2 font-bold text-green-700 dark:text-green-400 mb-4">
          <HiCheckCircle className="text-xl" /> Pros
        </h4>
        <ul className="space-y-2.5">
          {pros.map((pro, i) => (
            <li key={i} className="flex items-start gap-2.5 text-sm text-gray-700 dark:text-gray-300">
              <HiCheckCircle className="text-green-500 flex-shrink-0 mt-0.5" />
              {pro}
            </li>
          ))}
        </ul>
      </div>

      {/* Cons */}
      <div className="rounded-2xl border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/30 p-5">
        <h4 className="flex items-center gap-2 font-bold text-red-600 dark:text-red-400 mb-4">
          <HiXCircle className="text-xl" /> Cons
        </h4>
        <ul className="space-y-2.5">
          {cons.map((con, i) => (
            <li key={i} className="flex items-start gap-2.5 text-sm text-gray-700 dark:text-gray-300">
              <HiXCircle className="text-red-400 flex-shrink-0 mt-0.5" />
              {con}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
