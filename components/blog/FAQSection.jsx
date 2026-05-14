import { useState } from 'react';
import { HiChevronDown } from 'react-icons/hi';

function FAQItem({ faq, open, onToggle }) {
  return (
    <div className={`border border-gray-200 dark:border-dark-border rounded-xl overflow-hidden transition-all duration-200 ${
      open ? 'shadow-md' : ''
    }`}>
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
      >
        <span className="font-semibold text-gray-900 dark:text-white text-sm pr-4">
          {faq.question}
        </span>
        <HiChevronDown className={`flex-shrink-0 text-gray-400 text-lg transition-transform duration-200 ${
          open ? 'rotate-180 text-primary-500' : ''
        }`} />
      </button>
      {open && (
        <div className="px-5 pb-4 text-sm text-gray-600 dark:text-gray-400 leading-relaxed border-t border-gray-100 dark:border-dark-border pt-4">
          {faq.answer}
        </div>
      )}
    </div>
  );
}

export default function FAQSection({ faqs, id = 'faq' }) {
  const [openIndex, setOpenIndex] = useState(0);

  if (!faqs || faqs.length === 0) return null;

  return (
    <section id={id} className="my-10 scroll-mt-24">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Frequently Asked Questions
      </h2>
      <div className="space-y-3">
        {faqs.map((faq, i) => (
          <FAQItem
            key={i}
            faq={faq}
            open={openIndex === i}
            onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
          />
        ))}
      </div>
    </section>
  );
}
