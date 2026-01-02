import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: 'How do I create a wallet?',
    answer: 'Click on “Create Wallet” and follow the registration steps. You’ll need a valid phone number and email.'
  },
  {
    question: 'Is my money safe?',
    answer: 'Yes! We use bank-level encryption, 2FA, and JWT authentication to keep your funds secure.'
  },
  {
    question: 'How can I add money to my wallet?',
    answer: 'You can add money via bank transfer, card payment, or at any authorized agent.'
  },
  {
    question: 'Can I withdraw cash?',
    answer: 'Yes, visit any agent location or transfer funds to your bank account.'
  },
  {
    question: 'What payment methods are supported?',
    answer: 'We support bank transfers, debit/credit cards, and cash-in agents.'
  },
];

const FAQ: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section className="py-16 bg-white dark:bg-gray-900 dark:text-white">
      <div className="max-w-5xl mx-auto px-6 md:px-8 text-center">
        <div className="mb-12">
          <span className="inline-block px-4 py-2 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 rounded-full text-sm font-semibold mb-4">FAQ</span>
          <h2 className="text-4xl font-bold mb-4">
            <span className="text-gray-800 dark:text-white">Frequently Asked </span>
            <span className="text-yellow-600 dark:text-yellow-400">Questions</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">Find answers to common questions about our wallet service</p>
        </div>
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={faq.question} className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
              <button
                className="w-full flex justify-between items-center text-lg font-semibold text-gray-800 dark:text-white focus:outline-none"
                onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
              >
                {faq.question}
                <ChevronDown className={`h-5 w-5 ml-2 transition-transform ${openIdx === idx ? 'rotate-180' : ''}`} />
              </button>
              {openIdx === idx && (
                <div className="mt-2 text-gray-600 dark:text-gray-300 text-base">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
