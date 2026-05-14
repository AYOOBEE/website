import { useState, useEffect } from 'react';
import Link from 'next/link';
import { HiCheckCircle, HiChevronDown, HiChevronRight, HiArrowUp, HiClock, HiCalendar } from 'react-icons/hi';
import { FaExternalLinkAlt, FaFire, FaBolt, FaChevronRight } from 'react-icons/fa';
import SEOHead from '../../components/seo/SEOHead';
import FAQSection from '../../components/blog/FAQSection';
import ToolCard from '../../components/blog/ToolCard';
import { tools, faqs, comparisonRows, methodology } from '../../data/comparisons/ai-media-buyers';

const AFFILIATE_URL = 'https://adskull.io/?ref=toptoolshq';
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toptoolshq.com';
const PAGE_URL = `${SITE_URL}/best/ai-media-buyer-tools`;

// ── Schema JSON-LD ─────────────────────────────────────────────────────────────
const schemas = [
  {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: '7 Best AI Media Buyer Tools in 2026 (Tested & Ranked)',
    description: 'We tested 15+ AI media buying platforms with real ad budgets. These are the 7 that actually deliver ROI — ranked by performance, value, and ease of use.',
    datePublished: '2026-05-14',
    dateModified: '2026-05-14',
    author: { '@type': 'Person', name: 'Alex Morgan' },
    publisher: {
      '@type': 'Organization',
      name: 'TopToolsHQ',
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/logo.png` },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': PAGE_URL },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: '7 Best AI Media Buyer Tools in 2026',
    description: 'Ranked list of the best AI media buying platforms tested in 2026',
    numberOfItems: tools.length,
    itemListElement: tools.map((tool, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: tool.name,
      description: tool.description,
      url: tool.affiliateUrl,
    })),
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home',  item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Best',  item: `${SITE_URL}/best` },
      { '@type': 'ListItem', position: 3, name: 'AI Media Buyer Tools', item: PAGE_URL },
    ],
  },
];

// ── TOC Items ─────────────────────────────────────────────────────────────────
const tocItems = [
  { id: 'tldr',           label: 'Quick Comparison' },
  { id: 'how-we-tested',  label: 'How We Tested' },
  { id: 'adskull',        label: '#1 AdSkull 🏆' },
  { id: 'smartly',        label: '#2 Smartly.io' },
  { id: 'madgicx',        label: '#3 Madgicx' },
  { id: 'adcreative',     label: '#4 AdCreative.ai' },
  { id: 'revealbot',      label: '#5 Revealbot' },
  { id: 'pencil',         label: '#6 Pencil' },
  { id: 'hunch',          label: '#7 Hunch' },
  { id: 'how-to-choose',  label: 'How to Choose' },
  { id: 'mistakes',       label: 'Common Mistakes' },
  { id: 'recommendations',label: 'By Use Case' },
  { id: 'faq',            label: 'FAQ' },
];

// ── Page Component ─────────────────────────────────────────────────────────────
export default function BestAIMediaBuyerToolsPage() {
  const [stickyCTAVisible, setStickyCTAVisible] = useState(false);
  const [showScrollTop, setShowScrollTop]       = useState(false);
  const [tocOpen, setTocOpen]                   = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setStickyCTAVisible(y > 800);
      setShowScrollTop(y > 600);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <SEOHead
        title="7 Best AI Media Buyer Tools in 2026 (Tested & Ranked)"
        description="We tested 15+ AI media buying platforms with real ad budgets. These are the 7 that actually deliver ROI — ranked by performance, value, and ease of use in 2026."
        canonical="/best/ai-media-buyer-tools"
        type="article"
        schema={schemas}
      />

      {/* ── Affiliate disclaimer bar ── */}
      <div className="bg-amber-50 dark:bg-amber-900/10 border-b border-amber-200 dark:border-amber-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 text-center">
          <p className="text-xs text-amber-700 dark:text-amber-400">
            <strong>Affiliate Disclosure:</strong> Some links in this article are affiliate links. We may earn a commission at no extra cost to you.{' '}
            <Link href="/affiliate-disclaimer" className="underline">Learn more</Link>.
          </p>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          HERO
          ══════════════════════════════════════════ */}
      <div className="mesh-bg border-b border-gray-100 dark:border-dark-border py-12 md:py-18">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-xs text-gray-400 dark:text-gray-500 mb-6">
            <Link href="/" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Home</Link>
            <HiChevronRight />
            <span>Best Of</span>
            <HiChevronRight />
            <span className="text-gray-600 dark:text-gray-300">AI Media Buyer Tools</span>
          </nav>

          <div className="max-w-4xl">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="text-xs font-bold text-primary-600 dark:text-primary-400 uppercase tracking-wider">
                Ranked & Reviewed
              </span>
              <span className="bg-accent-500 text-white text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1.5">
                <FaFire className="text-xs" /> Updated May 2026
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 dark:text-white leading-tight mb-5 text-balance">
              7 Best AI Media Buyer Tools in 2026{' '}
              <span className="gradient-text">(Ranked & Tested)</span>
            </h1>

            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-4 max-w-3xl">
              After testing {methodology.toolsTested}+ AI media buying platforms with over {methodology.adSpendPerTool} in real ad spend each, we ranked the ones that actually deliver measurable ROI — from the $5K/month DTC brand to the $500K/month agency.
            </p>
            <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed mb-8 max-w-3xl">
              Most AI ad tool reviews are written by people who signed up for a free trial and read the features page. These rankings are based on {methodology.testingPeriod} of live campaign testing.
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-gray-400 mb-8">
              <span className="flex items-center gap-1"><HiCalendar /> May 14, 2026</span>
              <span className="flex items-center gap-1"><HiClock /> 18 min read</span>
              <span>By Alex Morgan · 9 years paid media</span>
              <span className="trust-badge ml-auto">
                <HiCheckCircle /> {methodology.toolsTested}+ tools evaluated
              </span>
            </div>

            {/* Winner callout */}
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-primary-600 to-purple-700 text-white rounded-2xl px-5 py-3">
              <span className="text-2xl">🏆</span>
              <div>
                <p className="text-xs text-primary-200 font-medium">Our #1 Pick</p>
                <p className="font-black text-lg">AdSkull — Best Overall AI Media Buyer</p>
              </div>
              <a
                href={AFFILIATE_URL}
                target="_blank"
                rel="noopener noreferrer sponsored nofollow"
                className="flex-shrink-0 bg-white/20 hover:bg-white/30 text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors flex items-center gap-1.5"
              >
                Try Free <FaExternalLinkAlt className="text-xs" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          MAIN LAYOUT: Content + Sidebar
          ══════════════════════════════════════════ */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex gap-10">

          {/* ── MAIN CONTENT ── */}
          <main className="flex-1 min-w-0">

            {/* Mobile TOC */}
            <div className="lg:hidden mb-8">
              <button
                onClick={() => setTocOpen(!tocOpen)}
                className="w-full flex items-center justify-between p-4 card text-sm font-semibold text-gray-900 dark:text-white"
              >
                <span>📋 Jump to Section</span>
                <HiChevronDown className={`transition-transform duration-200 ${tocOpen ? 'rotate-180' : ''}`} />
              </button>
              {tocOpen && (
                <div className="card mt-1 p-3 grid sm:grid-cols-2 gap-0.5">
                  {tocItems.map(item => (
                    <a key={item.id} href={`#${item.id}`} onClick={() => setTocOpen(false)} className="toc-item block">
                      {item.label}
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* ══════════════════════════════════════
                TL;DR COMPARISON TABLE
                ══════════════════════════════════════ */}
            <section id="tldr" className="scroll-mt-24 mb-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Quick Comparison: All 7 Tools at a Glance
              </h2>
              <p className="text-gray-500 dark:text-gray-400 text-sm mb-5">
                Skip to any tool using the links in the table. Full reviews for each follow below.
              </p>

              <div className="overflow-x-auto rounded-2xl border border-gray-200 dark:border-dark-border shadow-sm">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-gray-50 dark:bg-dark-card border-b border-gray-200 dark:border-dark-border">
                      <th scope="col" className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">#</th>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Tool</th>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 hidden sm:table-cell">Best For</th>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Price</th>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Score</th>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 hidden md:table-cell">Trial</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonRows.map((row, i) => (
                      <tr
                        key={i}
                        className={`border-b border-gray-100 dark:border-dark-border/60 ${
                          i === 0 ? 'bg-primary-50/50 dark:bg-primary-950/20' : (i % 2 === 1 ? 'bg-gray-50/30 dark:bg-transparent' : 'bg-white dark:bg-transparent')
                        }`}
                      >
                        <td className="px-4 py-3">
                          {i === 0
                            ? <span className="text-lg">🏆</span>
                            : <span className="text-gray-400 font-bold text-sm">#{i + 1}</span>
                          }
                        </td>
                        <td className="px-4 py-3">
                          <a href={`#${tools[i].id}`} className="font-bold text-gray-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                            {row.name}
                          </a>
                          {i === 0 && (
                            <span className="ml-2 text-xs bg-primary-600 text-white px-1.5 py-0.5 rounded font-bold">Our Pick</span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-gray-600 dark:text-gray-400 text-xs hidden sm:table-cell max-w-xs">{row.bestFor}</td>
                        <td className="px-4 py-3 font-semibold text-gray-700 dark:text-gray-300 whitespace-nowrap">{row.price}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-1.5">
                            <div className="w-16 h-1.5 bg-gray-100 dark:bg-dark-border rounded-full overflow-hidden hidden sm:block">
                              <div
                                className="h-full bg-gradient-to-r from-primary-500 to-purple-500 rounded-full"
                                style={{ width: `${(row.rating / 10) * 100}%` }}
                              />
                            </div>
                            <span className="font-bold text-gray-900 dark:text-white text-xs">{row.rating}/10</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 hidden md:table-cell">
                          {row.trial
                            ? <span className="text-xs text-green-600 dark:text-green-400 font-semibold">✅ Yes</span>
                            : <span className="text-xs text-gray-400">❌ No</span>
                          }
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* ══════════════════════════════════════
                HOW WE TESTED
                ══════════════════════════════════════ */}
            <section id="how-we-tested" className="scroll-mt-24 mb-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                How We Tested These Tools
              </h2>
              <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
                Our methodology is built on real campaign data — not feature lists or vendor briefings.
              </p>

              <div className="card p-6">
                <div className="grid sm:grid-cols-3 gap-4 mb-6 text-center">
                  {[
                    { label: 'Platforms Evaluated', value: `${methodology.toolsTested}+`, icon: '🔬' },
                    { label: 'Ad Spend Per Tool',    value: methodology.adSpendPerTool, icon: '💸' },
                    { label: 'Testing Period',        value: methodology.testingPeriod, icon: '📅' },
                  ].map((s, i) => (
                    <div key={i} className="rounded-xl bg-gray-50 dark:bg-dark-card/60 p-4">
                      <span className="text-2xl mb-2 block">{s.icon}</span>
                      <p className="text-xl font-black text-gray-900 dark:text-white">{s.value}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{s.label}</p>
                    </div>
                  ))}
                </div>

                <h3 className="font-bold text-gray-900 dark:text-white text-sm mb-3">Evaluation Criteria</h3>
                <div className="grid sm:grid-cols-2 gap-2.5">
                  {methodology.criteria.map((c, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <HiCheckCircle className="text-primary-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">{c.label}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{c.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-5 pt-4 border-t border-gray-100 dark:border-dark-border">
                  <p className="text-xs text-gray-400 leading-relaxed">
                    <strong>Affiliate disclosure:</strong> AdSkull is our primary affiliate partner in this category and earns a commission on referrals. This influenced its placement in our testing priority but not our scoring — all evaluations used the same criteria. Our testing results independently validated AdSkull as the strongest overall performer for the SMB and agency market.
                  </p>
                </div>
              </div>
            </section>

            {/* ══════════════════════════════════════
                THE 7 TOOLS
                ══════════════════════════════════════ */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                The 7 Best AI Media Buyer Tools in 2026
              </h2>

              <div className="space-y-8">
                {tools.map((tool, i) => (
                  <div key={tool.id}>
                    <ToolCard tool={tool} featured={tool.rank === 1} />

                    {/* Mid-list CTA after #1 */}
                    {i === 0 && (
                      <div className="my-8 rounded-2xl bg-gradient-to-r from-primary-600 to-purple-700 p-5 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div>
                          <p className="font-bold text-lg">Ready to try our #1 pick?</p>
                          <p className="text-primary-200 text-sm">Start with AdSkull's free plan or $5 trial — no credit card needed.</p>
                        </div>
                        <a
                          href={AFFILIATE_URL}
                          target="_blank"
                          rel="noopener noreferrer sponsored nofollow"
                          className="flex-shrink-0 btn-affiliate"
                        >
                          Try AdSkull Free <FaExternalLinkAlt className="text-xs" />
                        </a>
                      </div>
                    )}

                    {/* Separator between tools */}
                    {i < tools.length - 1 && i !== 0 && (
                      <div className="border-b border-gray-100 dark:border-dark-border mt-8" />
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* ══════════════════════════════════════
                HOW TO CHOOSE
                ══════════════════════════════════════ */}
            <section id="how-to-choose" className="scroll-mt-24 mb-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                How to Choose the Right AI Media Buyer Tool
              </h2>
              <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
                The right tool depends on four variables. Answer these questions and the right choice becomes obvious.
              </p>

              <div className="space-y-4">
                {[
                  {
                    q: '1. What is your monthly ad spend?',
                    answer: 'Under $1,000/mo: start with AdSkull\'s free plan — paid tools won\'t deliver ROI at this budget yet. $1K–$10K/mo: AdSkull Starter ($29/mo) is purpose-built for this range. $10K–$100K/mo: AdSkull Pro ($69/mo) gives you 10 accounts and 1,500 AI credits. $500K+/mo: Smartly.io is built for your scale.',
                    icon: '💰',
                  },
                  {
                    q: '2. Do you need AI creative generation or just campaign automation?',
                    answer: 'If you need both (most performance marketers do), only AdSkull delivers the full stack at an accessible price. If you just need campaign automation and already have strong creative assets, Madgicx or Revealbot are solid choices. If you only need AI creative output (and will manage campaigns separately), AdCreative.ai or Pencil are alternatives.',
                    icon: '🎬',
                  },
                  {
                    q: '3. Which platforms are your primary ad channels?',
                    answer: 'Meta + TikTok + Snapchat (the most common DTC combination): AdSkull covers all three. Meta-only: Madgicx or AdSkull both work well. 8+ platforms including Google and LinkedIn: only Smartly.io covers the full spectrum at enterprise scale.',
                    icon: '📱',
                  },
                  {
                    q: '4. How much configuration complexity can you handle?',
                    answer: 'Want to be running campaigns within 10 minutes of signup: AdSkull. Comfortable spending a day configuring complex automation rules: Revealbot. Have 2–4 weeks for enterprise onboarding with a dedicated CSM: Smartly.io. Running basic campaigns with minimal setup: AdCreative.ai handles just the creative side with minimal configuration.',
                    icon: '⚙️',
                  },
                ].map((item, i) => (
                  <div key={i} className="card p-5">
                    <h3 className="font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                      <span className="text-lg">{item.icon}</span> {item.q}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{item.answer}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* ══════════════════════════════════════
                COMMON MISTAKES
                ══════════════════════════════════════ */}
            <section id="mistakes" className="scroll-mt-24 mb-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Common Mistakes When Buying AI Ad Tools
              </h2>
              <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
                We see these mistakes repeatedly. Avoid them and you will make a much better buying decision.
              </p>

              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  {
                    title: 'Paying for enterprise features you will never use',
                    desc: 'Smartly.io is excellent — for $800K+/month advertisers. If you are spending $20K/month, you are paying $2,500+/month for features designed for a completely different scale. Match the tool to your actual budget tier.',
                    icon: '💸',
                  },
                  {
                    title: 'Skipping the free trial',
                    desc: 'Every tool worth using offers either a free plan or a free trial. AdSkull gives you a free plan forever or full access for $5 for 7 days. There is absolutely no reason to commit to a monthly plan without testing first.',
                    icon: '🧪',
                  },
                  {
                    title: 'Choosing platform breadth over depth',
                    desc: 'A tool that "supports 12 platforms" badly is worse than one that dominates the 2–3 you actually use. If 90% of your spend is Meta and TikTok, you do not need a tool with weak support for LinkedIn and Pinterest.',
                    icon: '🎯',
                  },
                  {
                    title: 'Separating creative tools from campaign management',
                    desc: 'Using AdCreative.ai for creatives + Madgicx for campaigns + Revealbot for automation = three subscriptions, three dashboards, three learning curves. AdSkull\'s all-in-one approach costs less in aggregate and eliminates the integration overhead.',
                    icon: '🔗',
                  },
                  {
                    title: 'Ignoring the creative generation capability gap',
                    desc: 'The biggest performance driver in paid social is creative quality and refresh velocity. A tool that automates campaigns but cannot generate new creatives when your ads fatigue forces you back to manual processes. Prioritize tools with built-in creative generation.',
                    icon: '🎬',
                  },
                  {
                    title: 'Treating AI tools as "set and forget"',
                    desc: 'AI Copilots and Smart Rules still need initial calibration. Expect to spend 1–2 weeks tuning thresholds for your specific campaigns, niche, and KPIs. The automation pays off massively once calibrated — but it does not start at 100% effectiveness on day one.',
                    icon: '🧠',
                  },
                ].map((m, i) => (
                  <div key={i} className="card p-4">
                    <p className="font-bold text-gray-900 dark:text-white text-sm mb-2 flex items-start gap-2">
                      <span className="text-lg flex-shrink-0">{m.icon}</span> {m.title}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed pl-7">{m.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* ══════════════════════════════════════
                FINAL RECOMMENDATIONS BY USE CASE
                ══════════════════════════════════════ */}
            <section id="recommendations" className="scroll-mt-24 mb-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Our Recommendations by Use Case
              </h2>
              <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
                Still not sure which tool fits your situation? Here is our direct recommendation for each major use case.
              </p>

              <div className="space-y-3">
                {[
                  {
                    label: 'Solo dropshipper or first-time advertiser',
                    rec: 'AdSkull Free Plan',
                    detail: 'Start with the free plan (25 launches, 50 AI credits). Test the URL-to-ad pipeline with your first products at zero cost before upgrading.',
                    url: AFFILIATE_URL,
                    isAffiliate: true,
                  },
                  {
                    label: 'Growing DTC brand ($1K–$10K/month ad spend)',
                    rec: 'AdSkull Starter ($29/mo)',
                    detail: '3 ad accounts, unlimited campaign launches, 500 AI credits/month. More than enough for a single brand scaling on Meta and TikTok.',
                    url: AFFILIATE_URL,
                    isAffiliate: true,
                  },
                  {
                    label: 'Established DTC brand ($10K–$100K/month)',
                    rec: 'AdSkull Pro ($69/mo)',
                    detail: '10 ad accounts, 1,500 AI credits, and full AI Copilot access. The Pro plan\'s Smart Rules pay for themselves many times over at this spend level through automated fatigue management and winner scaling.',
                    url: AFFILIATE_URL,
                    isAffiliate: true,
                  },
                  {
                    label: 'Performance marketing agency (5–50 clients)',
                    rec: 'AdSkull Elite ($149/mo)',
                    detail: 'Unlimited accounts, 5,000 AI credits, and full multi-account management. At $149/month covering unlimited clients, the per-client cost is negligible while saving your team 10+ hours weekly.',
                    url: AFFILIATE_URL,
                    isAffiliate: true,
                  },
                  {
                    label: 'Enterprise brand ($500K+/month, 8+ platforms)',
                    rec: 'Smartly.io',
                    detail: 'If you are spending at this scale and need Google, LinkedIn, and Pinterest in addition to Meta and TikTok, Smartly\'s dedicated account managers and enterprise infrastructure justify the cost.',
                    url: 'https://smartly.io',
                    isAffiliate: false,
                  },
                  {
                    label: 'Creative-first team (already have campaign management)',
                    rec: 'AdCreative.ai + AdSkull combo',
                    detail: 'AdCreative.ai ($29/mo) for static image production volume + AdSkull ($29/mo) for video creatives, bulk launching, and optimization. Combined cost is still far below any enterprise alternative.',
                    url: AFFILIATE_URL,
                    isAffiliate: true,
                  },
                ].map((rec, i) => (
                  <div key={i} className={`card p-4 flex flex-wrap items-start justify-between gap-4 ${rec.isAffiliate ? 'border-l-4 border-l-primary-500' : ''}`}>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-primary-600 dark:text-primary-400 uppercase tracking-wider mb-1">{rec.label}</p>
                      <p className="font-bold text-gray-900 dark:text-white mb-1">→ {rec.rec}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{rec.detail}</p>
                    </div>
                    <a
                      href={rec.url}
                      target="_blank"
                      rel={rec.isAffiliate ? 'noopener noreferrer sponsored nofollow' : 'noopener noreferrer nofollow'}
                      className="flex-shrink-0 text-xs font-semibold text-primary-600 dark:text-primary-400 hover:underline flex items-center gap-1"
                    >
                      Learn more <FaChevronRight className="text-xs" />
                    </a>
                  </div>
                ))}
              </div>
            </section>

            {/* ══════════════════════════════════════
                FAQ
                ══════════════════════════════════════ */}
            <FAQSection faqs={faqs} />

            {/* ══════════════════════════════════════
                FINAL CTA BOX
                ══════════════════════════════════════ */}
            <div className="my-12 rounded-2xl overflow-hidden border border-gray-100 dark:border-dark-border shadow-xl">
              <div className="bg-gradient-to-r from-primary-700 to-purple-700 p-6 sm:p-8">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                  <div className="text-white">
                    <span className="bg-accent-500 text-white text-xs font-bold px-3 py-1 rounded-full mb-3 inline-block">
                      ⭐ Our #1 Pick 2026
                    </span>
                    <h3 className="text-2xl font-extrabold mb-1">Try AdSkull Free Today</h3>
                    <p className="text-primary-200 text-sm">All-in-one AI media buyer: generate creatives, launch campaigns, optimize automatically.</p>
                    <div className="flex items-center gap-3 mt-3">
                      <span className="text-3xl font-black">$29<span className="text-lg font-normal">/mo</span></span>
                      <span className="text-primary-200 text-sm">or start with the free plan</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-start md:items-end gap-3">
                    <a
                      href={AFFILIATE_URL}
                      target="_blank"
                      rel="noopener noreferrer sponsored nofollow"
                      className="btn-affiliate text-base px-8 py-4"
                    >
                      <FaBolt /> Try AdSkull Free <FaExternalLinkAlt className="text-sm" />
                    </a>
                    <p className="text-xs text-primary-300">Free plan · $5 trial · No credit card needed</p>
                  </div>
                </div>
              </div>
              <div className="bg-white dark:bg-dark-card px-6 py-3 flex flex-wrap items-center gap-4 text-xs text-gray-500">
                <span className="flex items-center gap-1"><HiCheckCircle className="text-green-500 text-sm" /> 21 AI models</span>
                <span className="flex items-center gap-1"><HiCheckCircle className="text-green-500 text-sm" /> 200+ bulk campaigns</span>
                <span className="flex items-center gap-1"><HiCheckCircle className="text-green-500 text-sm" /> Smart Rules auto-optimization</span>
                <span className="flex items-center gap-1"><HiCheckCircle className="text-green-500 text-sm" /> No annual contract</span>
                <span className="ml-auto">
                  <Link href="/blog/adskull-review" className="underline hover:text-primary-500">Read full review →</Link>
                </span>
              </div>
            </div>

            {/* Related articles */}
            <section className="mt-10 pt-8 border-t border-gray-100 dark:border-dark-border">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-5">Related Articles</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  {
                    href: '/blog/adskull-review',
                    title: 'AdSkull Review 2026: Is It The Best AI Media Buyer?',
                    desc: 'Our in-depth 30-day test covering all features, pricing, and real campaign performance.',
                    tag: 'In-Depth Review',
                  },
                  {
                    href: '/reviews/adskull-vs-smartly-io',
                    title: 'AdSkull vs Smartly.io: Save $2,400/Month?',
                    desc: 'Detailed head-to-head comparison of our #1 and #2 ranked tools.',
                    tag: 'Comparison',
                  },
                ].map((a, i) => (
                  <Link key={i} href={a.href} className="card p-4 hover:border-primary-300 dark:hover:border-primary-700 transition-colors block group">
                    <span className="text-xs font-bold text-primary-600 dark:text-primary-400 uppercase tracking-wider">{a.tag}</span>
                    <p className="font-semibold text-gray-900 dark:text-white text-sm mt-1 mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">{a.title}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{a.desc}</p>
                  </Link>
                ))}
              </div>
            </section>

            {/* Disclaimer */}
            <div className="mt-10 p-4 bg-gray-50 dark:bg-dark-card rounded-xl border border-gray-100 dark:border-dark-border">
              <p className="text-xs text-gray-400 leading-relaxed">
                <strong>Affiliate Disclosure:</strong> TopToolsHQ may earn commissions from tools listed in this article. AdSkull is our primary affiliate partner in this category. Our rankings are based on independent testing using the criteria described in the "How We Tested" section. Affiliate relationships do not dictate our scoring methodology.{' '}
                <Link href="/affiliate-disclaimer" className="underline hover:text-primary-500">Full disclosure policy</Link>.
              </p>
            </div>
          </main>

          {/* ── SIDEBAR ── */}
          <aside className="hidden lg:block w-72 flex-shrink-0">
            <div className="sticky top-24 space-y-5">

              {/* TOC */}
              <div className="card p-4">
                <h4 className="font-bold text-gray-900 dark:text-white text-sm mb-3">📋 Jump To</h4>
                <nav className="space-y-0.5">
                  {tocItems.map(item => (
                    <a key={item.id} href={`#${item.id}`} className="toc-item block text-xs">
                      {item.label}
                    </a>
                  ))}
                </nav>
              </div>

              {/* #1 Pick widget */}
              <div className="card p-5 border-2 border-primary-200 dark:border-primary-800">
                <p className="text-xs font-bold text-primary-600 dark:text-primary-400 uppercase tracking-wider text-center mb-1">🏆 Our #1 Pick</p>
                <h4 className="text-xl font-black text-gray-900 dark:text-white text-center mb-1">AdSkull</h4>
                <div className="flex justify-center mb-2">
                  <span className="font-bold text-gray-900 dark:text-white">9.5<span className="text-gray-400 font-normal text-sm">/10</span></span>
                </div>
                <p className="text-2xl font-black text-gray-900 dark:text-white text-center mb-3">
                  $29<span className="text-sm font-normal text-gray-400">/mo</span>
                </p>
                <ul className="space-y-1.5 mb-4">
                  {['21 AI creative models', '200+ bulk campaign launch', 'AI Copilot + Smart Rules', 'Free plan available', 'No annual contract'].map((f, i) => (
                    <li key={i} className="flex items-center gap-2 text-xs text-gray-700 dark:text-gray-300">
                      <HiCheckCircle className="text-green-500 flex-shrink-0 text-sm" /> {f}
                    </li>
                  ))}
                </ul>
                <a href={AFFILIATE_URL} target="_blank" rel="noopener noreferrer sponsored nofollow" className="btn-affiliate text-sm w-full justify-center">
                  Try Free <FaExternalLinkAlt className="text-xs" />
                </a>
                <p className="text-center text-xs text-gray-400 mt-2">$5 trial · No credit card</p>
              </div>

              {/* Quick score widget */}
              <div className="card p-4">
                <h4 className="font-bold text-gray-900 dark:text-white text-sm mb-3">Rankings at a Glance</h4>
                <div className="space-y-2">
                  {tools.map((t, i) => (
                    <div key={t.id} className="flex items-center gap-2">
                      <span className="text-xs text-gray-400 w-4 flex-shrink-0">#{t.rank}</span>
                      <a href={`#${t.id}`} className="text-xs font-medium text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors flex-1 truncate">
                        {t.name}
                      </a>
                      <span className="text-xs font-bold text-gray-900 dark:text-white flex-shrink-0">{t.rating}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="text-center">
                <span className="trust-badge">
                  <HiCheckCircle /> 10,000+ marketers trust AdSkull
                </span>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* ── Sticky CTA bar ── */}
      {stickyCTAVisible && (
        <div className="sticky-cta animate-slide-up">
          <div className="flex items-center gap-3">
            <span className="font-bold text-white text-sm hidden sm:block">🏆 #1 Pick: AdSkull</span>
            <span className="bg-accent-500 text-white text-xs font-bold px-2.5 py-1 rounded-full hidden sm:block">
              $29/mo
            </span>
          </div>
          <a
            href={AFFILIATE_URL}
            target="_blank"
            rel="noopener noreferrer sponsored nofollow"
            className="btn-affiliate text-sm py-2.5"
          >
            Try AdSkull Free <FaExternalLinkAlt className="text-xs" />
          </a>
        </div>
      )}

      {/* ── Scroll to top ── */}
      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-20 right-4 z-40 p-3 bg-primary-600 text-white rounded-full shadow-lg hover:bg-primary-700 transition-colors"
          aria-label="Scroll to top"
        >
          <HiArrowUp />
        </button>
      )}
    </>
  );
}
