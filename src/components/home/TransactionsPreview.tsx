import React, { useState } from 'react';
import { ArrowUpRight, ArrowDownLeft, User } from 'lucide-react';
import { motion } from 'framer-motion';

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  hover: { scale: 1.03, boxShadow: '0 8px 32px rgba(0,0,0,0.12)' },
};

const maskName = (fullName: string) => {
  const parts = fullName.split(' (');
  const name = parts[0];
  const role = parts.length > 1 ? ` (${parts[1]}` : '';
  
  if (name.length <= 2) return fullName;
  return name.substring(0, 2) + '***' + role;
};

// Demo transactions for home page preview
const demoTransactions = [
  { id: 1, type: 'Send', amount: '-$50.00', user: 'Alice (User)', time: 'Just now' },
  { id: 2, type: 'Deposit', amount: '+$200.00', user: 'Agent John (Agent)', time: '1 min ago' },
  { id: 3, type: 'Withdrawal', amount: '-$30.00', user: 'Agent Smith (Agent)', time: '2 min ago' },
  { id: 4, type: 'Receive Money', amount: '+$120.00', user: 'Bob (User)', time: '5 min ago' },
  { id: 5, type: 'Send Money', amount: '-$15.00', user: 'Carol (User)', time: '8 min ago' },
];

const TransactionsPreview: React.FC = () => {
  return (
    <section className="py-16 bg-blue-50 dark:bg-gray-900">
      <div className="max-w-5xl mx-auto px-6 md:px-8 text-center">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-12">
          <span className="inline-block px-4 py-2 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-full text-sm font-semibold mb-4">Activity</span>
          <h2 className="text-4xl font-bold mb-4">
            <span className="text-gray-800 dark:text-white">Live </span>
            <span className="text-orange-600 dark:text-orange-400">Transactions</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">See recent transactions happening on our platform right now</p>
        </motion.div>
        <ul className="space-y-4">
          {demoTransactions.map((tx) => (
            <motion.li
              key={tx.id}
              className="flex items-center justify-between bg-white dark:bg-gray-800 rounded-lg shadow p-4"
              initial="hidden"
              whileInView="visible"
              whileHover="hover"
              viewport={{ once: true, amount: 0.3 }}
              variants={cardVariants}
            >
              <div className="flex items-center gap-3">
                <User className="h-6 w-6 text-gray-400 dark:text-gray-300" />
                <span className="font-semibold text-gray-700 dark:text-white">{maskName(tx.user)}</span>
                <span className="text-sm text-gray-500 dark:text-gray-300">{tx.type}</span>
              </div>
              <div className="flex items-center gap-2">
                {tx.amount.startsWith('+') ? (
                  <ArrowDownLeft className="h-5 w-5 text-green-500" />
                ) : (
                  <ArrowUpRight className="h-5 w-5 text-red-500" />
                )}
                <span className={`font-bold ${tx.amount.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>{tx.amount}</span>
                <span className="text-xs text-gray-400 ml-2">{tx.time}</span>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default TransactionsPreview;
