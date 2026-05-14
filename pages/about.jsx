import SEOHead from '../components/seo/SEOHead';
import Image from 'next/image';
import Link from 'next/link';
import { HiCheckCircle } from 'react-icons/hi';
import { FaTwitter, FaLinkedin } from 'react-icons/fa';

const team = [
  {
    name: 'Alex Morgan',
    role: 'Founder & Lead Reviewer',
    bio: '8+ years in digital marketing, SEO, and affiliate marketing. Tested 500+ software tools.',
    avatar: 'https://picsum.photos/seed/alex/200/200',
    twitter: '#',
    linkedin: '#',
  },
  {
    name: 'Jordan Lee',
    role: 'AI & SaaS Specialist',
    bio: 'Former product manager at a SaaS startup. Deep expertise in AI tools and automation.',
    avatar: 'https://picsum.photos/seed/jordan/200/200',
    twitter: '#',
    linkedin: '#',
  },
];

const values = [
  'We buy or trial every tool we review — no free passes for positive coverage',
  'If a tool disappoints us, we say so clearly — no sugarcoating',
  'We update reviews when tools change significantly',
  'Affiliate commissions never influence our ratings or recommendations',
];

export default function AboutPage() {
  return (
    <>
      <SEOHead
        title="About AffiliatePro — Honest Software Reviews"
        description="Learn about our mission to provide brutally honest, independent reviews of AI tools, software, and online courses."
        canonical="/about"
      />

      {/* Hero */}
      <div className="bg-gradient-to-br from-primary-900 to-purple-900 py-20 text-white text-center">
        <h1 className="text-4xl md:text-5xl font-black mb-4">About AffiliatePro</h1>
        <p className="text-primary-300 text-xl max-w-2xl mx-auto">
          The internet's most honest resource for AI tools, software reviews, and digital marketing guides.
        </p>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">

        {/* Mission */}
        <section>
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-6">Our Mission</h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed mb-4">
            The internet is drowning in fake reviews written by people who've never actually used the product. We built AffiliatePro to be different — a place where every review is based on real, hands-on experience.
          </p>
          <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
            We independently test every tool we cover. If it's great, we'll say so. If it's overpriced garbage, we'll say that too. Our readers' trust is more valuable than any affiliate commission.
          </p>
        </section>

        {/* Values */}
        <section>
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-6">How We Do Things Differently</h2>
          <ul className="space-y-4">
            {values.map(v => (
              <li key={v} className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                <HiCheckCircle className="text-green-500 text-xl flex-shrink-0 mt-0.5" />
                {v}
              </li>
            ))}
          </ul>
        </section>

        {/* Team */}
        <section>
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-8">Meet the Team</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {team.map(member => (
              <div key={member.name} className="card p-6 flex gap-4">
                <Image
                  src={member.avatar}
                  alt={member.name}
                  width={72}
                  height={72}
                  className="rounded-2xl flex-shrink-0"
                />
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white">{member.name}</h3>
                  <p className="text-primary-600 dark:text-primary-400 text-sm font-medium mb-2">{member.role}</p>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mb-3">{member.bio}</p>
                  <div className="flex gap-2">
                    <a href={member.twitter} className="text-gray-400 hover:text-primary-500 transition-colors">
                      <FaTwitter />
                    </a>
                    <a href={member.linkedin} className="text-gray-400 hover:text-primary-500 transition-colors">
                      <FaLinkedin />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="text-center">
          <h3 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-4">Want to Work Together?</h3>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            We're open to sponsored articles, affiliate partnerships, and guest post opportunities from reputable brands.
          </p>
          <Link href="/contact" className="btn-primary">Get in Touch</Link>
        </section>
      </div>
    </>
  );
}
