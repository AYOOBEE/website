import SEOHead from '../components/seo/SEOHead';
import { HiShieldCheck } from 'react-icons/hi';

export default function AffiliateDisclaimer() {
  return (
    <>
      <SEOHead
        title="Affiliate Disclaimer"
        description="Our affiliate disclosure policy — how we make money and how it affects our reviews."
        canonical="/affiliate-disclaimer"
        noindex
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center">
            <HiShieldCheck className="text-green-600 text-2xl" />
          </div>
          <div>
            <h1 className="text-4xl font-black text-gray-900 dark:text-white">Affiliate Disclaimer</h1>
            <p className="text-gray-400 text-sm">Last updated: May 10, 2025</p>
          </div>
        </div>

        <div className="article-body space-y-6">
          <div className="highlight-box">
            <p className="font-semibold text-gray-900 dark:text-white">
              In plain English: We earn commissions from some links on this site. This never affects our reviews or ratings — we would never recommend something we don't believe in.
            </p>
          </div>

          <section>
            <h2>FTC Compliance</h2>
            <p>AffiliatePro participates in various affiliate programs. This means that when you click certain links on our site and make a purchase, we may receive a commission from the company at no additional cost to you. We are required by the FTC to disclose this relationship.</p>
          </section>

          <section>
            <h2>Our Promise to You</h2>
            <ul>
              <li><strong>Honest ratings:</strong> Affiliate relationships never influence the scores or verdicts in our reviews</li>
              <li><strong>Real testing:</strong> We use or trial every product we recommend</li>
              <li><strong>Transparency:</strong> Links marked as affiliate links are clearly identified</li>
              <li><strong>Your wallet:</strong> Prices are always the same whether you use our link or not</li>
            </ul>
          </section>

          <section>
            <h2>Which Companies Do We Work With?</h2>
            <p>We have affiliate relationships with a variety of software companies, SaaS platforms, course providers, and hosting services. These relationships are always secondary to our goal of providing genuinely useful content to our readers.</p>
          </section>

          <section>
            <h2>Questions?</h2>
            <p>If you have any questions about our affiliate relationships or editorial process, contact us at <a href="mailto:hello@affiliatepro.com">hello@affiliatepro.com</a>.</p>
          </section>
        </div>
      </div>
    </>
  );
}
