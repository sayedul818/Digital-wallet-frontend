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
      <div className="max-w-5xl mx-auto px-6 md:px-8">
        <h2 className="text-3xl font-bold text-center mb-8 text-blue-700 dark:text-white">Frequently Asked Questions</h2>
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
