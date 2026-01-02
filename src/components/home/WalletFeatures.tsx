
import React from 'react';
import { CreditCard, Send, Download } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  {
    icon: <Send className="h-8 w-8 text-blue-600" />,
    title: 'Send Money',
    desc: 'Transfer funds instantly to anyone, anywhere.'
  },
  {
    icon: <Download className="h-8 w-8 text-green-500" />,
    title: 'Add Money',
    desc: 'Top up your wallet from bank, card, or agent.'
  },
  {
    icon: <CreditCard className="h-8 w-8 text-purple-500" />,
    title: 'Withdraw',
    desc: 'Withdraw cash at agents or transfer to your bank.'
  },
];

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  hover: { scale: 1.05, boxShadow: '0 8px 32px rgba(0,0,0,0.12)' },
};

const WalletFeatures: React.FC = () => (
  <>
    <section className="py-16 bg-gray-50 dark:bg-gray-900 dark:text-white">
      <div className="max-w-5xl mx-auto px-6 md:px-8 text-center">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-12">
          <span className="inline-block px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm font-semibold mb-4">Features</span>
          <h2 className="text-4xl font-bold mb-4">
            <span className="text-gray-800 dark:text-white">Key Wallet </span>
            <span className="text-blue-600 dark:text-blue-400">Features</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">Everything you need to manage your money with ease and security</p>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              className="flex flex-col items-center bg-white dark:bg-gray-800 rounded-lg shadow p-8"
              initial="hidden"
              whileInView="visible"
              whileHover="hover"
              viewport={{ once: true, amount: 0.3 }}
              variants={cardVariants}
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 text-center">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  </>
);

export default WalletFeatures;
