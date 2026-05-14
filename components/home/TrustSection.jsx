import { HiShieldCheck, HiCheckCircle, HiRefresh, HiUserGroup } from 'react-icons/hi';
import { FaStar } from 'react-icons/fa';

const pillars = [
  {
    icon: HiShieldCheck,
    color: 'text-green-500 bg-green-50 dark:bg-green-900/20',
    title: 'Independent & Unbiased',
    description: 'We buy or sign up for every tool we review. No paid placements, no sugar-coating.',
  },
  {
    icon: HiCheckCircle,
    color: 'text-blue-500 bg-blue-50 dark:bg-blue-900/20',
    title: 'Tested for Real',
    description: 'Every review is based on hands-on testing across real-world use cases — not spec sheets.',
  },
  {
    icon: HiRefresh,
    color: 'text-purple-500 bg-purple-50 dark:bg-purple-900/20',
    title: 'Regularly Updated',
    description: 'Tools change fast. We revisit and update every review when software gets major updates.',
  },
  {
    icon: HiUserGroup,
    color: 'text-orange-500 bg-orange-50 dark:bg-orange-900/20',
    title: 'Community Driven',
    description: 'Reader feedback shapes our reviews. Join 50,000+ readers who rely on our recommendations.',
  },
];

const testimonials = [
  {
    quote: "I found the best email marketing tool for my business here. Saved me 3 months of trial and error.",
    name: 'Sarah K.',
    role: 'Content Creator',
    stars: 5,
  },
  {
    quote: "The comparison tables are exactly what I needed. Clear, honest, and no BS. Subscribed instantly.",
    name: 'Marcus T.',
    role: 'Digital Marketer',
    stars: 5,
  },
  {
    quote: "Used their Jasper review to decide. The coupon code alone saved me $120. Love this site.",
    name: 'Priya R.',
    role: 'Freelance Writer',
    stars: 5,
  },
];

export default function TrustSection() {
  return (
    <section className="py-20 bg-gray-50 dark:bg-dark-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Pillars */}
        <div className="text-center mb-14">
          <p className="text-sm font-semibold text-primary-600 dark:text-primary-400 uppercase tracking-wider mb-2">
            Why Trust Us
          </p>
          <h2 className="section-heading">Reviews You Can Actually Trust</h2>
          <p className="section-sub">No paid reviews. No affiliate bias. Just honest takes from real testing.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {pillars.map(({ icon: Icon, color, title, description }) => (
            <div key={title} className="card p-6 text-center">
              <div className={`w-14 h-14 rounded-2xl ${color} flex items-center justify-center mx-auto mb-4`}>
                <Icon className="text-2xl" />
              </div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">{title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{description}</p>
            </div>
          ))}
        </div>

        {/* Social proof / testimonials */}
        <div className="text-center mb-10">
          <h3 className="text-2xl font-extrabold text-gray-900 dark:text-white">
            What Our Readers Say
          </h3>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map(t => (
            <div key={t.name} className="card p-6">
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.stars }).map((_, i) => (
                  <FaStar key={i} className="text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-5 italic">
                "{t.quote}"
              </p>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white text-sm">{t.name}</p>
                <p className="text-xs text-gray-400">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
