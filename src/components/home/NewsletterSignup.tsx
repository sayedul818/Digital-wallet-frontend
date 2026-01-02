import React, { useState } from 'react';
import { Mail } from 'lucide-react';
import { motion } from 'framer-motion';

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
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-8">
          <span className="inline-block px-4 py-2 bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400 rounded-full text-sm font-semibold mb-4">Newsletter</span>
          <h2 className="text-4xl font-bold mb-4">
            <span className="text-gray-800 dark:text-white">Stay </span>
            <span className="text-pink-600 dark:text-pink-400">Updated</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg mb-8">Sign up for our newsletter to receive the latest features, security tips, and exclusive offers</p>
        </motion.div>
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
