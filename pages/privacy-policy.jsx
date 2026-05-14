import SEOHead from '../components/seo/SEOHead';

export default function PrivacyPolicy() {
  return (
    <>
      <SEOHead
        title="Privacy Policy"
        description="AffiliatePro privacy policy — how we collect, use, and protect your data."
        canonical="/privacy-policy"
        noindex
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-black text-gray-900 dark:text-white mb-2">Privacy Policy</h1>
        <p className="text-gray-400 text-sm mb-10">Last updated: May 10, 2025</p>

        <div className="prose dark:prose-dark max-w-none article-body space-y-8">
          <section>
            <h2>Information We Collect</h2>
            <p>We collect information you voluntarily provide (such as your email address when subscribing to our newsletter), as well as automatically collected data such as IP addresses, browser type, and pages visited through cookies and analytics services.</p>
          </section>

          <section>
            <h2>How We Use Your Information</h2>
            <ul>
              <li>To send newsletters and promotional content you've opted into</li>
              <li>To analyze site usage and improve our content</li>
              <li>To process affiliate link clicks for commission tracking</li>
            </ul>
          </section>

          <section>
            <h2>Cookies</h2>
            <p>This site uses cookies for analytics (Google Analytics), affiliate tracking, and user preferences (dark mode). You can disable cookies in your browser settings, though some site features may not function correctly.</p>
          </section>

          <section>
            <h2>Affiliate Links</h2>
            <p>This site contains affiliate links. When you click these links and make a purchase, we may earn a commission. This does not affect the price you pay.</p>
          </section>

          <section>
            <h2>Third-Party Services</h2>
            <p>We use Google Analytics, ConvertKit (email), and various affiliate networks. These services have their own privacy policies.</p>
          </section>

          <section>
            <h2>Your Rights</h2>
            <p>You may request access to, correction of, or deletion of your personal data by contacting us at <a href="mailto:privacy@affiliatepro.com">privacy@affiliatepro.com</a>.</p>
          </section>

          <section>
            <h2>Contact</h2>
            <p>Questions? Email us at <a href="mailto:privacy@affiliatepro.com">privacy@affiliatepro.com</a>.</p>
          </section>
        </div>
      </div>
    </>
  );
}
