import { useState } from 'react';
import SEOHead from '../components/seo/SEOHead';
import { HiMail, HiCheckCircle } from 'react-icons/hi';
import { FaTwitter } from 'react-icons/fa';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = e => {
    e.preventDefault();
    // Replace with your form handler (Formspree, Netlify Forms, etc.)
    // Add action="/api/contact" and method="POST" for backend handling
    setSubmitted(true);
  };

  return (
    <>
      <SEOHead
        title="Contact Us"
        description="Get in touch with the AffiliatePro team for partnerships, sponsored content, or general inquiries."
        canonical="/contact"
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <HiMail className="text-primary-600 dark:text-primary-400 text-3xl" />
          </div>
          <h1 className="text-4xl font-black text-gray-900 dark:text-white mb-3">Get in Touch</h1>
          <p className="text-gray-500 dark:text-gray-400">
            For partnerships, affiliate programs, guest posts, or general inquiries.
          </p>
          <div className="flex items-center justify-center gap-3 mt-4 text-sm text-gray-400">
            <HiMail className="text-primary-500" />
            <a href="mailto:hello@affiliatepro.com" className="hover:text-primary-500 transition-colors">
              hello@affiliatepro.com
            </a>
            <span>•</span>
            <a href="#" className="flex items-center gap-1 hover:text-primary-500 transition-colors">
              <FaTwitter /> @AffiliatePro
            </a>
          </div>
        </div>

        {submitted ? (
          <div className="card p-10 text-center">
            <HiCheckCircle className="text-green-500 text-5xl mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Message Sent!</h3>
            <p className="text-gray-500">We'll get back to you within 1–2 business days.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="card p-8 space-y-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Name *</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={form.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-dark-border bg-white dark:bg-dark-bg text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Email *</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-dark-border bg-white dark:bg-dark-bg text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="you@example.com"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Subject *</label>
              <select
                name="subject"
                required
                value={form.subject}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-dark-border bg-white dark:bg-dark-bg text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="">Select a subject...</option>
                <option value="partnership">Affiliate / Partnership Inquiry</option>
                <option value="sponsored">Sponsored Content</option>
                <option value="guest-post">Guest Post Submission</option>
                <option value="correction">Review Correction</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Message *</label>
              <textarea
                name="message"
                required
                rows={6}
                value={form.message}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-dark-border bg-white dark:bg-dark-bg text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
                placeholder="Tell us more..."
              />
            </div>
            <button type="submit" className="btn-primary w-full py-3.5">
              Send Message →
            </button>
          </form>
        )}
      </div>
    </>
  );
}
