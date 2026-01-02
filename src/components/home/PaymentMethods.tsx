
import React from 'react';
import { Banknote, CreditCard, UserCheck } from 'lucide-react';
import { motion } from 'framer-motion';

const methods = [
  {
    icon: <Banknote className="h-8 w-8 text-blue-600" />,
    title: 'Bank Transfer',
    desc: 'Add or withdraw money directly from your bank account.'
  },
  {
    icon: <CreditCard className="h-8 w-8 text-green-600" />,
    title: 'Card Payment',
    desc: 'Supports all major debit and credit cards.'
  },
  {
    icon: <UserCheck className="h-8 w-8 text-purple-600" />,
    title: 'Cash-in Agents',
    desc: 'Deposit or withdraw cash at authorized agents.'
  },
];

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  hover: { scale: 1.05, boxShadow: '0 8px 32px rgba(0,0,0,0.12)' },
};

const PaymentMethods: React.FC = () => (
  <section className="py-16 bg-blue-50 dark:bg-gray-900">
    <div className="max-w-5xl mx-auto px-6 md:px-8 text-center">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-12">
        <span className="inline-block px-4 py-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-full text-sm font-semibold mb-4">Payments</span>
        <h2 className="text-4xl font-bold mb-4">
          <span className="text-gray-800 dark:text-white">Flexible </span>
          <span className="text-emerald-600 dark:text-emerald-400">Payment Options</span>
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-lg">Multiple ways to add and withdraw money from your wallet</p>
      </motion.div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {methods.map((method) => (
            <motion.div
              key={method.title}
              className="flex flex-col items-center bg-white dark:bg-gray-800 rounded-lg shadow p-8"
              initial="hidden"
              whileInView="visible"
              whileHover="hover"
              viewport={{ once: true, amount: 0.3 }}
              variants={cardVariants}
            >
              <div className="mb-4">{method.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">{method.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 text-center">{method.desc}</p>
            </motion.div>
          ))}
      </div>
    </div>
  </section>
);

export default PaymentMethods;
