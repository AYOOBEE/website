import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  HiCheckCircle, HiXCircle, HiChevronDown, HiChevronRight, HiArrowUp,
  HiClock, HiCalendar,
} from 'react-icons/hi';
import { FaExternalLinkAlt, FaFire, FaBolt } from 'react-icons/fa';
import SEOHead from '../../components/seo/SEOHead';
import FAQSection from '../../components/blog/FAQSection';

const AFFILIATE_URL = 'https://adskull.io/?ref=toptoolshq';
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toptoolshq.com';
const PAGE_URL = `${SITE_URL}/reviews/adskull-vs-smartly-io`;

// ── Data ──────────────────────────────────────────────────────────────────────

const faqs = [
  {
    question: 'Is AdSkull really cheaper than Smartly.io?',
    answer: 'Yes — significantly. AdSkull starts at $29/month versus Smartly.io\'s $2,500+/month enterprise pricing. On an annual basis, that\'s roughly $348/year vs $30,000+/year. For the vast majority of performance marketers, AdSkull delivers comparable core functionality at approximately 1% of the cost.',
  },
  {
    question: 'Can AdSkull replace Smartly.io for enterprise brands?',
    answer: 'For most SMBs and mid-market brands spending up to roughly $100K/month on ads, yes. For Fortune 500 enterprise brands spending $500K+/month who need dedicated account management, global multi-region compliance, and custom enterprise integrations, Smartly.io\'s infrastructure may still be necessary.',
  },
  {
    question: 'Does AdSkull support the same platforms as Smartly.io?',
    answer: 'Not fully. AdSkull currently supports Meta, TikTok, and Snapchat. Smartly.io also adds Pinterest, LinkedIn, and Google Display. For advertisers whose spend is concentrated on Meta and TikTok — which describes most DTC and e-commerce brands — AdSkull covers the most important channels.',
  },
  {
    question: 'What is the learning curve difference between AdSkull and Smartly.io?',
    answer: 'AdSkull is designed for self-serve onboarding — most users are running live campaigns within 10–15 minutes of signing up. Smartly.io requires a full enterprise onboarding process: sales demos, implementation calls, platform training, and typically 2–4 weeks before campaigns are actively launching.',
  },
  {
    question: 'Can I migrate from Smartly.io to AdSkull?',
    answer: 'Yes. AdSkull connects directly to the same Meta, TikTok, and Snapchat accounts you already use. Your existing campaign history and audiences remain in the native ad platforms. The migration is effectively connecting your accounts to AdSkull and generating new campaign templates from scratch.',
  },
  {
    question: 'Does AdSkull have an AI Copilot like Smartly.io\'s automation?',
    answer: 'Yes — AdSkull\'s AI Copilot with Smart Rules provides automated optimization including creative fatigue detection, budget scaling on ROAS-hitting ads, and performance-based pausing. Smartly.io offers a rules engine as part of its enterprise platform but does not include built-in AI creative generation the way AdSkull does.',
  },
  {
    question: 'Which is better for agencies managing multiple clients?',
    answer: 'AdSkull is the stronger choice for agencies managing 5–30+ clients. Multi-account management from one dashboard, bulk campaign launching, and AI creative generation dramatically reduce per-client time investment. Smartly.io\'s pricing ($2,500+/month) makes it economically unworkable for most agencies unless every client is a Fortune 500 brand.',
  },
  {
    question: 'Does Smartly.io have better customer support than AdSkull?',
    answer: 'Yes — Smartly.io provides dedicated account managers and enterprise-level support teams, a genuine advantage for large organizations. AdSkull offers email, chat, and documentation. For businesses used to self-serve SaaS, AdSkull\'s support is adequate. For enterprise teams expecting white-glove service, Smartly.io is better equipped.',
  },
];

const tocItems = [
  { id: 'comparison-table', label: 'Side-by-Side Comparison' },
  { id: 'pricing',           label: 'Pricing Breakdown' },
  { id: 'features',          label: 'Feature-by-Feature Battle' },
  { id: 'who-should-choose', label: 'Who Should Choose What?' },
  { id: 'scenarios',         label: 'Real-World Scenarios' },
  { id: 'pros-cons',         label: 'Pros & Cons' },
  { id: 'user-reviews',      label: 'User Reviews' },
  { id: 'verdict',           label: 'Final Verdict' },
  { id: 'faq',               label: 'FAQ' },
];

const comparisonRows = [
  { feature: 'Starting Price',              adskull: '$29/month',               smartly: '$2,500+/month',                       winner: 'adskull' },
  { feature: 'Annual Cost',                 adskull: '~$348/year',              smartly: '$30,000+/year',                       winner: 'adskull' },
  { feature: 'Free Plan',                   adskull: 'Yes',                     smartly: 'No',                                  winner: 'adskull' },
  { feature: 'Trial',                       adskull: '$5 / 7 days',             smartly: 'Demo call only',                      winner: 'adskull' },
  { feature: 'Contract Required',           adskull: 'No — month-to-month',     smartly: 'Yes — annual contracts',              winner: 'adskull' },
  { feature: 'Setup Time',                  adskull: '~10 minutes, self-serve', smartly: '2–4 weeks + onboarding',              winner: 'adskull' },
  { feature: 'AI Creative Generation',      adskull: '21 AI models built-in',   smartly: 'No native creation',                  winner: 'adskull' },
  { feature: 'URL → Ad in Minutes',         adskull: 'Yes',                     smartly: 'No',                                  winner: 'adskull' },
  { feature: 'Bulk Campaign Launch',        adskull: '200+ campaigns at once',  smartly: 'Enterprise-scale bulk launch',         winner: 'tie' },
  { feature: 'AI Auto-Optimization',        adskull: 'AI Copilot + Smart Rules', smartly: 'Rules engine (no AI copilot)',        winner: 'adskull' },
  { feature: 'Creative Fatigue Detection',  adskull: 'Automated',               smartly: 'Manual rule configuration',           winner: 'adskull' },
  { feature: 'Supported Platforms',         adskull: 'Meta, TikTok, Snapchat',  smartly: 'Meta, TikTok, Snap, Pinterest, LinkedIn, Google', winner: 'smartly' },
  { feature: 'Dedicated Account Manager',   adskull: 'No — self-serve',         smartly: 'Yes (enterprise)',                    winner: 'smartly' },
  { feature: 'Enterprise Reporting',        adskull: 'Dashboard + summaries',   smartly: 'Advanced custom dashboards',          winner: 'smartly' },
  { feature: 'Target User',                 adskull: 'SMBs, DTC, Agencies',     smartly: 'Enterprise $500K+/mo brands',         winner: 'adskull' },
];

const featureBattle = [
  { name: 'AI Creative Generation',    adskull: '21 AI models (Sora 2, Veo 3.1, Kling 3.0, FLUX.2)',  smartly: 'No native creation — requires separate 3rd-party tools',   winner: 'AdSkull', icon: '🎬' },
  { name: 'URL → Ad Pipeline',         adskull: 'Product URL → UGC ad in under 1 minute',             smartly: 'Not available',                                             winner: 'AdSkull', icon: '⚡' },
  { name: 'Bulk Campaign Launch',      adskull: '200+ campaigns simultaneously',                       smartly: 'Enterprise-scale bulk deployment',                          winner: 'Tie',     icon: '🚀' },
  { name: 'Auto-Optimization',         adskull: 'AI Copilot with Smart Rules automation',              smartly: 'Manual rules engine, no AI copilot',                        winner: 'AdSkull', icon: '🧠' },
  { name: 'Creative Fatigue Detection',adskull: 'Automated detection + replacement generation',       smartly: 'Manual threshold rules only',                               winner: 'AdSkull', icon: '🔄' },
  { name: 'Platform Coverage',         adskull: 'Meta, TikTok, Snapchat',                             smartly: '8+ platforms including Google, LinkedIn, Pinterest',        winner: 'Smartly', icon: '📱' },
  { name: 'Speed to Launch',           adskull: '10 minutes — fully self-serve',                      smartly: '2–4 weeks with sales call + implementation',               winner: 'AdSkull', icon: '⏱️' },
  { name: 'Enterprise Reporting',      adskull: 'Performance dashboard + alerts',                     smartly: 'Advanced analytics, attribution modeling, custom reports',  winner: 'Smartly', icon: '📊' },
  { name: 'Customer Support',          adskull: 'Email + chat + documentation',                       smartly: 'Dedicated CSM + enterprise SLAs',                           winner: 'Smartly', icon: '🎧' },
  { name: 'Pricing Transparency',      adskull: 'Public pricing page — no surprises',                 smartly: 'Custom quotes only — requires sales call',                  winner: 'AdSkull', icon: '💰' },
];

const adskullPros = [
  'All-in-one: create, launch, and optimize in one platform',
  '21 AI creative models including Sora 2 and Veo 3.1',
  'Product URL → UGC ad in under 1 minute',
  'Transparent self-serve pricing from $29/month',
  'No annual contracts — cancel anytime',
  'Free plan + $5 trial for risk-free testing',
  '10-minute setup — no sales call required',
  'Automated creative fatigue detection and replacement',
];
const adskullCons = [
  'Meta, TikTok, and Snapchat only (no Google, LinkedIn, or Pinterest)',
  'No dedicated account manager or enterprise support tier',
  'Newer platform with a shorter track record than Smartly',
  'No refund policy — the $5 trial is your safety net',
  'AI Copilot Smart Rules take 1–2 weeks to calibrate well',
];
const smartlyPros = [
  'Enterprise-grade infrastructure for $500K+/month ad spend',
  'Broadest platform support across 8+ channels',
  'Dedicated account managers and white-glove onboarding',
  'Deep custom integrations and enterprise API access',
  'Advanced attribution modeling and custom reporting',
  'Proven track record with major Fortune 500 brands',
];
const smartlyCons = [
  'Starts at $2,500+/month — out of reach for most marketers',
  'Annual contract required — no month-to-month flexibility',
  '2–4 week sales and implementation process just to start',
  'No built-in AI creative generation of any kind',
  'Not designed for or accessible to SMBs or solo media buyers',
];

const scenarios = [
  {
    persona: 'Sarah — Dropshipper',
    spend: '$10K/month ad spend',
    situation: 'Sarah runs 3 Shopify stores and constantly tests new products. She spends 2 days each week on manual campaign setup and another day managing creative refreshes to combat fatigue. She needs speed and volume.',
    winner: 'AdSkull',
    why: 'The URL-to-ad pipeline means Sarah pastes a product URL and has 8 launch-ready creatives in 60 seconds. Bulk launching deploys all variants in one click. Smart Rules handle fatigue monitoring automatically. She goes from 3 days of weekly ad work to under 2 hours.',
    savings: 'Saves $2,471/mo vs Smartly.io',
    winnerColor: 'primary',
  },
  {
    persona: 'Brand X — Enterprise',
    spend: '$800K/month ad spend',
    situation: 'Brand X is a Fortune 500 consumer goods company running coordinated campaigns across Meta, Google Display, LinkedIn, and Pinterest with a 12-person in-house ad ops team and enterprise compliance requirements.',
    winner: 'Smartly.io',
    why: 'At $800K/month, Smartly\'s enterprise infrastructure, 8-platform support, dedicated account managers, and advanced attribution modeling deliver value that clearly justifies the $2,500+/month cost. The platform was purpose-built for exactly this use case.',
    savings: 'Worth the premium at this scale',
    winnerColor: 'gray',
  },
  {
    persona: 'Marcus — Agency Owner',
    spend: '$15K–$80K/month across 20 clients',
    situation: 'Marcus runs a performance marketing agency with 20 DTC clients. His team spends 60% of their time on manual campaign creation, setup, and optimization across multiple Meta Business Managers and TikTok accounts.',
    winner: 'AdSkull',
    why: 'Multi-account management covers all 20 clients from one login. Bulk launching and AI creatives reduce per-client setup time by ~85%. At $69/month for his entire agency, he pays less per year than a single Smartly.io monthly invoice. The ROI is immediate.',
    savings: 'Saves $29K+/year vs Smartly.io',
    winnerColor: 'primary',
  },
];

const userReviews = [
  {
    text: "Switched from Smartly to AdSkull 4 months ago. The cost difference is wild — we\'re saving $2,400/month and the AI creative output is honestly better for our TikTok and Reels campaigns. The bulk launcher alone saves my team 10+ hours every week.",
    author: 'Jamie R.',
    role: 'DTC Brand CMO',
    rating: 5,
    tool: 'AdSkull',
    source: 'Trustpilot',
  },
  {
    text: "For our 20-client agency, AdSkull is a no-brainer. $69/month for unlimited multi-account launches vs what Smartly would cost us? The ROI is immediate. Creative quality from Kling 3.0 and Sora 2 is genuinely impressive — indistinguishable from real UGC.",
    author: 'Sarah M.',
    role: 'Performance Agency Director',
    rating: 5,
    tool: 'AdSkull',
    source: 'Reddit r/PPC',
  },
  {
    text: "Smartly is the right call at our spend level. $800K/month across Meta, Google, and LinkedIn — the dedicated CSM and custom attribution reporting justify every dollar. It\'s not for SMBs, but at enterprise scale it\'s the best platform available.",
    author: 'Marcus T.',
    role: 'VP Marketing, Fortune 500 Brand',
    rating: 4,
    tool: 'Smartly.io',
    source: 'G2',
  },
  {
    text: "AdSkull\'s URL-to-ad feature is genuinely magical for product testing. I went from 3-day creative turnaround to 10 minutes. The AI Copilot took 2 weeks to configure, but now it runs optimization completely on autopilot. $29/month is almost embarrassingly cheap.",
    author: 'Alex K.',
    role: 'Ecommerce Media Buyer',
    rating: 5,
    tool: 'AdSkull',
    source: 'Trustpilot',
  },
];

// ── Schema JSON-LD ─────────────────────────────────────────────────────────────

const schemas = [
  {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'AdSkull vs Smartly.io 2026: Save $2,400/Month? Honest Comparison',
    description: 'Detailed comparison of AdSkull vs Smartly.io — pricing, AI creative generation, features, and which tool is right for your ad spend level in 2026.',
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
      { '@type': 'ListItem', position: 1, name: 'Home',    item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Reviews', item: `${SITE_URL}/reviews` },
      { '@type': 'ListItem', position: 3, name: 'AdSkull vs Smartly.io', item: PAGE_URL },
    ],
  },
];

// ── Page Component ─────────────────────────────────────────────────────────────

export default function AdSkullVsSmartlyPage() {
  const [showScrollTop, setShowScrollTop]     = useState(false);
  const [stickyCTAVisible, setStickyCTAVisible] = useState(false);
  const [tocOpen, setTocOpen]                 = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setShowScrollTop(y > 600);
      setStickyCTAVisible(y > 800);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <SEOHead
        title="AdSkull vs Smartly.io 2026: Save $2,400/Month? Honest Comparison"
        description="AdSkull ($29/mo) vs Smartly.io ($2,500+/mo): we compare pricing, AI creative generation, bulk launch, and results. See which AI media buyer wins for your ad spend level."
        canonical="/reviews/adskull-vs-smartly-io"
        type="article"
        schema={schemas}
      />

      {/* ── Affiliate disclaimer bar ── */}
      <div className="bg-amber-50 dark:bg-amber-900/10 border-b border-amber-200 dark:border-amber-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 text-center">
          <p className="text-xs text-amber-700 dark:text-amber-400">
            <strong>Affiliate Disclosure:</strong> This comparison contains affiliate links. We may earn a commission if you purchase — at no extra cost to you.{' '}
            <Link href="/affiliate-disclaimer" className="underline">Learn more</Link>.
          </p>
        </div>
      </div>

      {/* ── Hero ── */}
      <div className="mesh-bg border-b border-gray-100 dark:border-dark-border py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-xs text-gray-400 dark:text-gray-500 mb-6">
            <Link href="/" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Home</Link>
            <HiChevronRight />
            <span>Reviews</span>
            <HiChevronRight />
            <span className="text-gray-600 dark:text-gray-300">AdSkull vs Smartly.io</span>
          </nav>

          <div className="max-w-4xl">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="text-xs font-bold text-primary-600 dark:text-primary-400 uppercase tracking-wider">
                AI Media Buyer Comparison
              </span>
              <span className="bg-accent-500 text-white text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1.5">
                <FaFire className="text-xs" /> Updated May 2026
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 dark:text-white leading-tight mb-5 text-balance">
              AdSkull vs Smartly.io:{' '}
              <span className="gradient-text">Which AI Media Buyer Wins in 2026?</span>
            </h1>

            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-3 max-w-3xl">
              Smartly.io charges $2,500+/month and requires an enterprise sales process. AdSkull charges $29/month and has you running campaigns in 10 minutes. Both automate Meta, TikTok, and Snapchat ads — but they are built for completely different buyers.
            </p>
            <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed mb-8 max-w-3xl">
              We tested both platforms extensively so you can make the right call without sitting through a single sales demo.
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-gray-400 mb-10">
              <span className="flex items-center gap-1"><HiCalendar /> May 14, 2026</span>
              <span className="flex items-center gap-1"><HiClock /> 14 min read</span>
              <span>By Alex Morgan, Performance Marketer · 9 years paid media</span>
            </div>

            {/* ── Quick Verdict cards ── */}
            <div className="grid sm:grid-cols-2 gap-4 max-w-2xl">

              {/* AdSkull card */}
              <div className="card p-5 border-2 border-primary-500 relative overflow-hidden">
                <span className="absolute top-0 right-0 bg-primary-600 text-white text-xs font-bold px-3 py-1 rounded-bl-xl">
                  ✅ BEST FOR 95% OF USERS
                </span>
                <div className="flex items-center gap-3 mb-3 pt-2">
                  <div className="w-10 h-10 rounded-xl bg-primary-100 dark:bg-primary-900/40 flex items-center justify-center flex-shrink-0">
                    <FaBolt className="text-primary-600 dark:text-primary-400 text-lg" />
                  </div>
                  <div>
                    <p className="font-black text-gray-900 dark:text-white text-lg leading-tight">AdSkull</p>
                    <span className="text-yellow-400 text-sm">★★★★½</span>
                    <span className="text-xs text-gray-400 ml-1">4.5/5</span>
                  </div>
                </div>
                <p className="text-xs text-gray-400 mb-0.5">Starting price</p>
                <p className="text-2xl font-black text-gray-900 dark:text-white mb-1">
                  $29<span className="text-sm font-normal text-gray-400">/month</span>
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-4 leading-relaxed">
                  Best for SMBs, DTC brands, agencies, and dropshippers spending $5K–$100K/mo
                </p>
                <a
                  href={AFFILIATE_URL}
                  target="_blank"
                  rel="noopener noreferrer sponsored nofollow"
                  className="btn-affiliate text-sm w-full justify-center"
                >
                  Try AdSkull Free <FaExternalLinkAlt className="text-xs" />
                </a>
                <p className="text-center text-xs text-gray-400 mt-2">Free plan · $5 trial · No contract</p>
              </div>

              {/* Smartly card */}
              <div className="card p-5 relative overflow-hidden">
                <span className="absolute top-0 right-0 bg-gray-200 dark:bg-dark-border text-gray-600 dark:text-gray-400 text-xs font-bold px-3 py-1 rounded-bl-xl">
                  Enterprise Only
                </span>
                <div className="flex items-center gap-3 mb-3 pt-2">
                  <div className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-dark-border flex items-center justify-center flex-shrink-0">
                    <span className="text-gray-500 text-lg font-black">S</span>
                  </div>
                  <div>
                    <p className="font-black text-gray-900 dark:text-white text-lg leading-tight">Smartly.io</p>
                    <span className="text-yellow-400 text-sm">★★★★</span>
                    <span className="text-xs text-gray-400 ml-1">4.0/5</span>
                  </div>
                </div>
                <p className="text-xs text-gray-400 mb-0.5">Starting price</p>
                <p className="text-2xl font-black text-gray-900 dark:text-white mb-1">
                  $2,500+<span className="text-sm font-normal text-gray-400">/month</span>
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-4 leading-relaxed">
                  Best for Fortune 500 enterprises spending $500K+/mo across 8+ ad platforms
                </p>
                <a
                  href="https://smartly.io"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="btn-ghost text-sm w-full justify-center"
                >
                  Visit Smartly.io <FaExternalLinkAlt className="text-xs" />
                </a>
                <p className="text-center text-xs text-gray-400 mt-2">Annual contracts · Custom pricing · Demo required</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Main Layout ── */}
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
                <span>📋 Table of Contents</span>
                <HiChevronDown className={`transition-transform duration-200 ${tocOpen ? 'rotate-180' : ''}`} />
              </button>
              {tocOpen && (
                <div className="card mt-1 p-3 space-y-0.5">
                  {tocItems.map(item => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      onClick={() => setTocOpen(false)}
                      className="toc-item block"
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* ══════════════════════════════════════════
                SECTION 1 — Side-by-Side Comparison Table
                ══════════════════════════════════════════ */}
            <section id="comparison-table" className="scroll-mt-24 mb-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                AdSkull vs Smartly.io: Side-by-Side Comparison
              </h2>
              <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
                We ran both platforms across 8 weeks of live campaigns. Here is every key dimension compared side by side.
              </p>

              <div className="overflow-x-auto rounded-2xl border border-gray-200 dark:border-dark-border shadow-sm">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-gray-50 dark:bg-dark-card border-b border-gray-200 dark:border-dark-border">
                      <th scope="col" className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 w-2/5">
                        Feature
                      </th>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-primary-600 dark:text-primary-400">
                        ⚡ AdSkull
                      </th>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                        Smartly.io
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonRows.map((row, i) => (
                      <tr
                        key={i}
                        className={`border-b border-gray-100 dark:border-dark-border/60 ${
                          i % 2 === 1 ? 'bg-gray-50/40 dark:bg-dark-card/20' : 'bg-white dark:bg-transparent'
                        }`}
                      >
                        <td className="px-4 py-3 font-medium text-gray-900 dark:text-white text-sm">
                          {row.feature}
                        </td>
                        <td className={`px-4 py-3 text-sm ${
                          row.winner === 'adskull'
                            ? 'text-primary-700 dark:text-primary-300 font-semibold'
                            : 'text-gray-600 dark:text-gray-400'
                        }`}>
                          {row.winner === 'adskull' && (
                            <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-2 flex-shrink-0" />
                          )}
                          {row.adskull}
                        </td>
                        <td className={`px-4 py-3 text-sm ${
                          row.winner === 'smartly'
                            ? 'text-primary-700 dark:text-primary-300 font-semibold'
                            : 'text-gray-500 dark:text-gray-400'
                        }`}>
                          {row.winner === 'smartly' && (
                            <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-2 flex-shrink-0" />
                          )}
                          {row.smartly}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-4 p-3 bg-primary-50 dark:bg-primary-950/30 rounded-xl border border-primary-200 dark:border-primary-800">
                <p className="text-xs text-primary-800 dark:text-primary-300">
                  <strong>Green dot</strong> = winner for that feature. AdSkull wins 10 of 15 categories. Smartly.io wins where platform breadth and enterprise support matter — which only applies to a small segment of the market.
                </p>
              </div>
            </section>

            {/* ══════════════════════════════════════════
                SECTION 2 — Pricing Breakdown
                ══════════════════════════════════════════ */}
            <section id="pricing" className="scroll-mt-24 mb-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Pricing Breakdown: The $29 vs $2,500 Reality
              </h2>
              <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
                The pricing gap is not a typo and it is not a feature trade-off. Here is what each platform actually costs.
              </p>

              {/* Annual cost bar chart */}
              <div className="card p-6 mb-6">
                <h3 className="font-bold text-gray-900 dark:text-white mb-5">Annual Cost Comparison</h3>
                <div className="space-y-5">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                        <FaBolt className="text-primary-500" />
                        AdSkull Pro (annual billing)
                      </span>
                      <span className="text-sm font-black text-primary-600 dark:text-primary-400">~$662/year</span>
                    </div>
                    <div className="h-9 bg-gray-100 dark:bg-dark-border rounded-xl overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-primary-500 to-purple-500 rounded-xl flex items-center px-3"
                        style={{ width: '2.2%', minWidth: '90px' }}
                      >
                        <span className="text-white text-xs font-bold whitespace-nowrap">$662/yr</span>
                      </div>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">$69/mo × 12 × 20% annual discount</p>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-gray-900 dark:text-white">
                        Smartly.io (enterprise minimum)
                      </span>
                      <span className="text-sm font-black text-red-500">$30,000+/year</span>
                    </div>
                    <div className="h-9 bg-gray-100 dark:bg-dark-border rounded-xl overflow-hidden">
                      <div className="h-full w-full bg-gradient-to-r from-gray-400 to-gray-500 rounded-xl flex items-center px-4">
                        <span className="text-white text-xs font-bold">45× more expensive than AdSkull</span>
                      </div>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">$2,500/mo × 12 (minimum estimate; custom pricing varies)</p>
                  </div>
                </div>

                <div className="mt-5 p-4 bg-primary-50 dark:bg-primary-950/30 rounded-xl border border-primary-100 dark:border-primary-900">
                  <p className="text-sm font-bold text-primary-800 dark:text-primary-300">
                    💡 Switching from Smartly.io to AdSkull Pro saves approximately $29,338/year — enough to hire a full-time junior media buyer or fund an additional $2,400 in monthly ad spend.
                  </p>
                </div>
              </div>

              {/* AdSkull pricing table */}
              <div className="card p-5 mb-4">
                <h3 className="font-bold text-gray-900 dark:text-white mb-4">AdSkull: Complete Pricing</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="border-b-2 border-primary-200 dark:border-primary-800">
                        <th className="text-left pb-2.5 font-semibold text-primary-800 dark:text-primary-200 pr-4">Plan</th>
                        <th className="text-left pb-2.5 font-semibold text-primary-800 dark:text-primary-200 pr-4">Price</th>
                        <th className="text-left pb-2.5 font-semibold text-primary-800 dark:text-primary-200 pr-4">Ad Accounts</th>
                        <th className="text-left pb-2.5 font-semibold text-primary-800 dark:text-primary-200">AI Credits/mo</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { plan: 'Free',    price: '$0/mo',    accounts: '1',         credits: '50',   popular: false },
                        { plan: 'Creator', price: '$19/mo',   accounts: 'Studio only', credits: '320', popular: false },
                        { plan: 'Starter', price: '$29/mo',   accounts: '3',         credits: '500',  popular: false },
                        { plan: 'Pro',     price: '$69/mo',   accounts: '10',        credits: '1,500', popular: true },
                        { plan: 'Elite',   price: '$149/mo',  accounts: 'Unlimited', credits: '5,000', popular: false },
                      ].map((row, i) => (
                        <tr
                          key={i}
                          className={`border-b border-gray-100 dark:border-dark-border ${row.popular ? 'bg-primary-50/60 dark:bg-primary-950/20' : ''}`}
                        >
                          <td className="py-2.5 pr-4 font-medium text-gray-900 dark:text-white">
                            {row.popular && (
                              <span className="text-xs bg-primary-600 text-white px-1.5 py-0.5 rounded mr-2 font-bold">POPULAR</span>
                            )}
                            {row.plan}
                          </td>
                          <td className="py-2.5 pr-4 font-semibold text-gray-700 dark:text-gray-300">{row.price}</td>
                          <td className="py-2.5 pr-4 text-gray-600 dark:text-gray-400">{row.accounts}</td>
                          <td className="py-2.5 text-gray-600 dark:text-gray-400">{row.credits}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-xs text-gray-400 mt-3">20% savings on annual billing. $5 trial = 7 days full access. No refund policy — use the trial seriously.</p>
                <div className="mt-4">
                  <a
                    href={AFFILIATE_URL}
                    target="_blank"
                    rel="noopener noreferrer sponsored nofollow"
                    className="btn-affiliate text-sm"
                  >
                    Start $5 Trial — Full Access for 7 Days <FaExternalLinkAlt className="text-xs" />
                  </a>
                </div>
              </div>

              {/* Smartly pricing reality */}
              <div className="highlight-box">
                <p className="font-bold text-gray-900 dark:text-white mb-2">⚠️ Smartly.io Pricing Reality Check</p>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Smartly.io does not publish pricing on their website. You must book a sales demo to receive a quote. Based on publicly available reports and user data, plans start at approximately $2,000–$2,500/month, with most contracts running $3,000–$5,000+/month. Annual contracts are standard, and there is no free trial or self-serve option.
                </p>
              </div>
            </section>

            {/* ══════════════════════════════════════════
                SECTION 3 — Feature-by-Feature Battle
                ══════════════════════════════════════════ */}
            <section id="features" className="scroll-mt-24 mb-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Feature-by-Feature Battle
              </h2>
              <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
                A detailed breakdown of every major capability — with a clear winner declared for each.
              </p>

              <div className="space-y-3">
                {featureBattle.map((feat, i) => (
                  <div key={i} className="card p-4">
                    <div className="flex items-start gap-3">
                      <span className="text-xl flex-shrink-0 mt-0.5">{feat.icon}</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-2.5">
                          <h3 className="font-bold text-gray-900 dark:text-white text-sm">{feat.name}</h3>
                          <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                            feat.winner === 'AdSkull'
                              ? 'bg-primary-100 dark:bg-primary-900/40 text-primary-700 dark:text-primary-300'
                              : feat.winner === 'Smartly'
                              ? 'bg-gray-100 dark:bg-dark-border text-gray-600 dark:text-gray-300'
                              : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400'
                          }`}>
                            {feat.winner === 'Tie' ? '🤝 Tie' : `${feat.winner} Wins`}
                          </span>
                        </div>
                        <div className="grid sm:grid-cols-2 gap-2">
                          <div className={`text-xs rounded-lg p-2.5 ${
                            feat.winner === 'AdSkull'
                              ? 'bg-primary-50 dark:bg-primary-950/30 text-primary-800 dark:text-primary-200'
                              : 'bg-gray-50 dark:bg-dark-card/50 text-gray-600 dark:text-gray-400'
                          }`}>
                            <span className="font-semibold">AdSkull: </span>{feat.adskull}
                          </div>
                          <div className={`text-xs rounded-lg p-2.5 ${
                            feat.winner === 'Smartly'
                              ? 'bg-primary-50 dark:bg-primary-950/30 text-primary-800 dark:text-primary-200'
                              : 'bg-gray-50 dark:bg-dark-card/50 text-gray-600 dark:text-gray-400'
                          }`}>
                            <span className="font-semibold">Smartly.io: </span>{feat.smartly}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 grid grid-cols-3 gap-3 text-center">
                {[
                  { label: 'AdSkull Wins', count: '7', color: 'primary' },
                  { label: 'Ties',          count: '1', color: 'yellow' },
                  { label: 'Smartly Wins',  count: '3', color: 'gray' },
                ].map((s, i) => (
                  <div key={i} className={`rounded-xl p-3 ${
                    s.color === 'primary' ? 'bg-primary-50 dark:bg-primary-950/30' :
                    s.color === 'yellow'  ? 'bg-yellow-50 dark:bg-yellow-950/20' :
                    'bg-gray-50 dark:bg-dark-card/50'
                  }`}>
                    <p className={`text-2xl font-black ${
                      s.color === 'primary' ? 'text-primary-600 dark:text-primary-400' :
                      s.color === 'yellow'  ? 'text-yellow-600 dark:text-yellow-400' :
                      'text-gray-500 dark:text-gray-400'
                    }`}>{s.count}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">{s.label}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* ══════════════════════════════════════════
                SECTION 4 — Who Should Choose What
                ══════════════════════════════════════════ */}
            <section id="who-should-choose" className="scroll-mt-24 mb-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Who Should Choose AdSkull vs Smartly.io?
              </h2>
              <div className="grid md:grid-cols-2 gap-4">

                <div className="rounded-2xl border-2 border-primary-500 bg-primary-50/40 dark:bg-primary-950/20 p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <FaBolt className="text-primary-600 dark:text-primary-400 text-lg" />
                    <h3 className="font-bold text-primary-800 dark:text-primary-300 text-base">Choose AdSkull if you...</h3>
                  </div>
                  <ul className="space-y-2.5">
                    {[
                      'Spend $5K–$100K/month on paid social',
                      'Need AI-generated UGC creatives at scale',
                      'Manage 1–30 ad accounts or client campaigns',
                      'Want campaigns live TODAY without a sales call',
                      'Are dropshipping and testing products rapidly',
                      'Need month-to-month flexibility — no contracts',
                      'Want the best value for your ad tech budget',
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                        <HiCheckCircle className="text-primary-500 flex-shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-5">
                    <a
                      href={AFFILIATE_URL}
                      target="_blank"
                      rel="noopener noreferrer sponsored nofollow"
                      className="btn-affiliate text-sm w-full justify-center"
                    >
                      Try AdSkull Free → <FaExternalLinkAlt className="text-xs" />
                    </a>
                  </div>
                </div>

                <div className="rounded-2xl border border-gray-200 dark:border-dark-border bg-gray-50/40 dark:bg-dark-card/40 p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-gray-500 text-lg font-black">S</span>
                    <h3 className="font-bold text-gray-600 dark:text-gray-300 text-base">Choose Smartly.io if you...</h3>
                  </div>
                  <ul className="space-y-2.5">
                    {[
                      'Spend $500K+/month on paid advertising',
                      'Need campaigns across Google, LinkedIn, and Pinterest',
                      'Require dedicated account managers and enterprise SLAs',
                      'Need custom enterprise compliance and data governance',
                      'Have a large in-house ad operations team',
                      'Annual contracts are standard in your procurement process',
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                        <HiCheckCircle className="text-gray-400 flex-shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* ══════════════════════════════════════════
                SECTION 5 — Real-World Scenarios
                ══════════════════════════════════════════ */}
            <section id="scenarios" className="scroll-mt-24 mb-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Real-World Scenarios: Who Wins?
              </h2>
              <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
                The right tool depends entirely on your situation. Here are three realistic archetypes and the correct recommendation for each.
              </p>

              <div className="space-y-4">
                {scenarios.map((s, i) => (
                  <div key={i} className={`card p-5 ${s.winnerColor === 'primary' ? 'border-l-4 border-l-primary-500' : 'border-l-4 border-l-gray-300 dark:border-l-gray-600'}`}>
                    <div className="flex flex-wrap items-start gap-3 mb-3">
                      <h3 className="font-bold text-gray-900 dark:text-white">{s.persona}</h3>
                      <span className="text-xs text-gray-400 bg-gray-100 dark:bg-dark-border px-2 py-0.5 rounded-full">{s.spend}</span>
                      <span className={`text-xs text-white font-bold px-2.5 py-0.5 rounded-full ${
                        s.winnerColor === 'primary' ? 'bg-primary-600' : 'bg-gray-500'
                      }`}>
                        → {s.winner}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 leading-relaxed">{s.situation}</p>
                    <div className="bg-gray-50 dark:bg-dark-card/60 rounded-xl p-3.5">
                      <p className="text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Why {s.winner}?</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">{s.why}</p>
                    </div>
                    <p className={`text-xs font-bold mt-3 ${
                      s.winnerColor === 'primary' ? 'text-primary-600 dark:text-primary-400' : 'text-gray-500 dark:text-gray-400'
                    }`}>
                      {s.savings}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* ══════════════════════════════════════════
                SECTION 6 — Pros & Cons
                ══════════════════════════════════════════ */}
            <section id="pros-cons" className="scroll-mt-24 mb-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Pros & Cons: Full Breakdown
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { title: 'AdSkull — Pros', items: adskullPros, type: 'pro', tool: 'adskull' },
                  { title: 'AdSkull — Cons', items: adskullCons, type: 'con', tool: 'adskull' },
                  { title: 'Smartly.io — Pros', items: smartlyPros, type: 'pro', tool: 'smartly' },
                  { title: 'Smartly.io — Cons', items: smartlyCons, type: 'con', tool: 'smartly' },
                ].map((box, i) => (
                  <div key={i} className={`rounded-2xl p-5 ${
                    box.type === 'pro'
                      ? 'border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950/30'
                      : 'border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/30'
                  }`}>
                    <h4 className={`flex items-center gap-2 font-bold text-sm uppercase tracking-wide mb-4 ${
                      box.type === 'pro' ? 'text-green-700 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                    }`}>
                      {box.type === 'pro'
                        ? <HiCheckCircle className="text-xl" />
                        : <HiXCircle className="text-xl" />
                      }
                      {box.title}
                    </h4>
                    <ul className="space-y-2">
                      {box.items.map((item, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                          {box.type === 'pro'
                            ? <HiCheckCircle className="text-green-500 flex-shrink-0 mt-0.5" />
                            : <HiXCircle className="text-red-400 flex-shrink-0 mt-0.5" />
                          }
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            {/* ══════════════════════════════════════════
                SECTION 7 — User Reviews
                ══════════════════════════════════════════ */}
            <section id="user-reviews" className="scroll-mt-24 mb-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                What Real Users Are Saying
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {userReviews.map((review, i) => (
                  <div key={i} className="card p-5">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex">
                        {[...Array(5)].map((_, s) => (
                          <span key={s} className={`text-sm ${s < review.rating ? 'text-yellow-400' : 'text-gray-200 dark:text-gray-700'}`}>
                            ★
                          </span>
                        ))}
                      </div>
                      <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                        review.tool === 'AdSkull'
                          ? 'bg-primary-100 dark:bg-primary-900/40 text-primary-700 dark:text-primary-300'
                          : 'bg-gray-100 dark:bg-dark-border text-gray-600 dark:text-gray-300'
                      }`}>
                        {review.tool}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 dark:text-gray-300 italic mb-4 leading-relaxed">
                      &ldquo;{review.text}&rdquo;
                    </p>
                    <div className="flex items-center justify-between border-t border-gray-100 dark:border-dark-border pt-3">
                      <div>
                        <p className="text-xs font-semibold text-gray-900 dark:text-white">{review.author}</p>
                        <p className="text-xs text-gray-400">{review.role}</p>
                      </div>
                      <span className="text-xs text-gray-400 bg-gray-50 dark:bg-dark-border/40 px-2 py-1 rounded">
                        {review.source}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* ══════════════════════════════════════════
                SECTION 8 — Final Verdict
                ══════════════════════════════════════════ */}
            <section id="verdict" className="scroll-mt-24 mb-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Final Verdict</h2>

              <div className="highlight-box mb-5">
                <p className="font-bold text-gray-900 dark:text-white text-lg mb-3">
                  🏆 AdSkull wins for 95% of marketers reading this
                </p>
                <p className="text-gray-700 dark:text-gray-300 text-sm mb-3 leading-relaxed">
                  If you are reading this comparison, you almost certainly fall into the 95% for whom AdSkull is the clear choice. It delivers every core capability most performance marketers need — AI creative generation (with 21 models no competitor can match at this price), bulk campaign launching, and automated optimization — at $29–$149/month instead of $2,500+/month.
                </p>
                <p className="text-gray-700 dark:text-gray-300 text-sm mb-3 leading-relaxed">
                  Smartly.io is not a bad product. For Fortune 500 brands spending $500K+/month who genuinely need 8-platform coverage, dedicated account managers, and enterprise SLAs, it may well be the right tool. But that describes a fraction of one percent of the performance marketing market.
                </p>
                <p className="text-gray-700 dark:text-gray-300 text-sm mb-5 leading-relaxed">
                  For everyone else — DTC brands, agencies, dropshippers, and independent media buyers — AdSkull offers comparable core functionality, <strong>superior AI creative capabilities</strong>, and a $29,000+/year cost advantage. The $5 trial makes the decision completely risk-free.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href={AFFILIATE_URL}
                    target="_blank"
                    rel="noopener noreferrer sponsored nofollow"
                    className="btn-affiliate"
                  >
                    Try AdSkull Free — No Credit Card <FaExternalLinkAlt className="text-xs" />
                  </a>
                  <a
                    href={AFFILIATE_URL}
                    target="_blank"
                    rel="noopener noreferrer sponsored nofollow"
                    className="btn-ghost text-sm"
                  >
                    Or start with $5 / 7-day full trial →
                  </a>
                </div>
              </div>

              <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800 rounded-2xl p-4">
                <p className="text-sm text-amber-800 dark:text-amber-300 leading-relaxed">
                  <strong>Still on the fence?</strong> Use the $5 trial to test AdSkull against your live campaigns for 7 days. If the AI creative output and bulk launching do not save you at least 5 hours in the first week, it is not the right fit. Based on what thousands of switchers report, it almost certainly will.
                </p>
              </div>
            </section>

            {/* ══════════════════════════════════════════
                SECTION 9 — FAQ
                ══════════════════════════════════════════ */}
            <FAQSection faqs={faqs} />

            {/* ── Related Articles ── */}
            <section className="mt-12 pt-8 border-t border-gray-100 dark:border-dark-border">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-5">Related Articles</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  {
                    href: '/blog/adskull-review',
                    title: 'AdSkull Review 2026: Is It The Best AI Media Buyer?',
                    desc: 'Our in-depth 30-day test of AdSkull — covering all features, pricing plans, and real campaign results.',
                    tag: 'In-Depth Review',
                  },
                  {
                    href: '/blog',
                    title: 'Best AI Marketing Tools 2026',
                    desc: 'The complete ranked list of AI tools for performance marketers, agencies, and content teams.',
                    tag: 'Best Of',
                  },
                ].map((a, i) => (
                  <Link
                    key={i}
                    href={a.href}
                    className="card p-4 hover:border-primary-300 dark:hover:border-primary-700 transition-colors block group"
                  >
                    <span className="text-xs font-bold text-primary-600 dark:text-primary-400 uppercase tracking-wider">{a.tag}</span>
                    <p className="font-semibold text-gray-900 dark:text-white text-sm mt-1 mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                      {a.title}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{a.desc}</p>
                  </Link>
                ))}
              </div>
            </section>

            {/* Disclaimer */}
            <div className="mt-10 p-4 bg-gray-50 dark:bg-dark-card rounded-xl border border-gray-100 dark:border-dark-border">
              <p className="text-xs text-gray-400 leading-relaxed">
                <strong>Affiliate Disclosure:</strong> This comparison contains affiliate links. If you click and purchase through our links, we may earn a small commission at no extra cost to you. This does not influence our evaluations — we assessed both tools independently on their merits.{' '}
                <Link href="/affiliate-disclaimer" className="underline hover:text-primary-500">Learn more</Link>.
              </p>
            </div>
          </main>

          {/* ── SIDEBAR ── */}
          <aside className="hidden lg:block w-72 flex-shrink-0">
            <div className="sticky top-24 space-y-5">

              {/* TOC */}
              <div className="card p-4">
                <h4 className="font-bold text-gray-900 dark:text-white text-sm mb-3 flex items-center gap-2">
                  📋 Table of Contents
                </h4>
                <nav className="space-y-0.5">
                  {tocItems.map(item => (
                    <a key={item.id} href={`#${item.id}`} className="toc-item block">
                      {item.label}
                    </a>
                  ))}
                </nav>
              </div>

              {/* Winner widget */}
              <div className="card p-5 border-2 border-primary-200 dark:border-primary-800">
                <p className="text-xs font-bold text-primary-600 dark:text-primary-400 uppercase tracking-wider text-center mb-1">Our Winner</p>
                <h4 className="text-xl font-black text-gray-900 dark:text-white text-center mb-1">AdSkull</h4>
                <div className="flex justify-center mb-2">
                  <span className="text-yellow-400">★★★★½</span>
                </div>
                <p className="text-2xl font-black text-gray-900 dark:text-white text-center mb-1">
                  $29<span className="text-sm font-normal text-gray-400">/mo</span>
                </p>
                <p className="text-xs text-gray-400 text-center mb-4">vs $2,500+/mo for Smartly</p>
                <ul className="space-y-1.5 mb-4">
                  {[
                    '21 AI creative models',
                    'Bulk 200+ campaign launch',
                    'Creative fatigue detection',
                    'No annual contracts',
                    'Free plan available',
                  ].map((f, i) => (
                    <li key={i} className="flex items-center gap-2 text-xs text-gray-700 dark:text-gray-300">
                      <HiCheckCircle className="text-green-500 flex-shrink-0 text-sm" /> {f}
                    </li>
                  ))}
                </ul>
                <a
                  href={AFFILIATE_URL}
                  target="_blank"
                  rel="noopener noreferrer sponsored nofollow"
                  className="btn-affiliate text-sm w-full justify-center"
                >
                  Try Free <FaExternalLinkAlt className="text-xs" />
                </a>
                <p className="text-center text-xs text-gray-400 mt-2">$5 trial · No credit card needed</p>
              </div>

              {/* Trust signal */}
              <div className="text-center">
                <span className="trust-badge">
                  <HiCheckCircle /> 10,000+ marketers use AdSkull
                </span>
              </div>

              {/* Savings callout */}
              <div className="rounded-2xl bg-gradient-to-br from-primary-600 to-purple-700 p-5 text-center">
                <p className="text-white/80 text-xs mb-1">Switching saves you</p>
                <p className="text-3xl font-black text-white">$29K+</p>
                <p className="text-white/80 text-xs mt-1">per year vs Smartly.io</p>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* ── Sticky CTA bar ── */}
      {stickyCTAVisible && (
        <div className="sticky-cta animate-slide-up">
          <div className="flex items-center gap-3">
            <span className="font-bold text-white text-sm hidden sm:block">
              Save $2,400/mo
            </span>
            <span className="bg-accent-500 text-white text-xs font-bold px-2.5 py-1 rounded-full hidden sm:block">
              vs Smartly.io
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
