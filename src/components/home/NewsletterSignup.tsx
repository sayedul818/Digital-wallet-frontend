import React, { useState } from 'react';
import { Mail } from 'lucide-react';

const NewsletterSignup: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Integrate with backend or service
    setSubmitted(true);
  };

  return (
    <section className="py-16 bg-white dark:bg-gray-950">
      <div className="max-w-2xl mx-auto px-6 md:px-8 text-center">
        <h2 className="text-3xl font-bold text-center mb-8 text-blue-700 dark:text-white">Get Wallet Updates</h2>
        <p className="text-gray-600 mb-8">Sign up for our newsletter to receive the latest features, security tips, and offers.</p>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Mail className="h-6 w-6 text-blue-600" />
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Your email address"
              className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
              disabled={submitted}
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white font-semibold px-6 py-2 rounded-lg shadow hover:bg-blue-700 transition"
            disabled={submitted}
          >
            {submitted ? 'Subscribed!' : 'Subscribe'}
          </button>
        </form>
        {submitted && <p className="mt-4 text-green-600 font-medium">Thank you for subscribing!</p>}
      </div>
    </section>
  );
};

export default NewsletterSignup;
