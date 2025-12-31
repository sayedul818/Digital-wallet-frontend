
import React from 'react';
import { ShieldCheck, KeyRound, Lock } from 'lucide-react';
import { motion } from 'framer-motion';

const highlights = [
  {
    icon: <ShieldCheck className="h-8 w-8 text-green-600" />,
    title: '2-Factor Authentication',
    desc: 'Extra layer of security for your account and transactions.'
  },
  {
    icon: <KeyRound className="h-8 w-8 text-blue-600" />,
    title: 'JWT Auth',
    desc: 'Industry-standard secure login and session management.'
  },
  {
    icon: <Lock className="h-8 w-8 text-purple-600" />,
    title: 'Transaction Encryption',
    desc: 'All transactions are encrypted end-to-end for privacy.'
  },
];

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  hover: { scale: 1.05, boxShadow: '0 8px 32px rgba(0,0,0,0.12)' },
};

const SecurityHighlights: React.FC = () => (
  <section className="py-16 bg-gradient-to-r from-green-50 to-blue-50 dark:from-gray-950 dark:to-gray-900 dark:text-white">
    <div className="max-w-5xl mx-auto px-6 md:px-8">
      <h2 className="text-3xl font-bold text-center mb-8 text-green-700 dark:text-white">Security Highlights</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {highlights.map((item) => (
          <motion.div
            key={item.title}
            className="flex flex-col items-center bg-white dark:bg-gray-800 rounded-lg shadow p-8"
            initial="hidden"
            whileInView="visible"
            whileHover="hover"
            viewport={{ once: true, amount: 0.3 }}
            variants={cardVariants}
          >
            <div className="mb-4">{item.icon}</div>
            <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">{item.title}</h3>
            <p className="text-gray-600 dark:text-gray-300 text-center">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default SecurityHighlights;
