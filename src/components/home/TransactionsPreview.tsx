import React, { useEffect, useState } from 'react';
import { ArrowUpRight, ArrowDownLeft, User } from 'lucide-react';
import { motion } from 'framer-motion';
// Example static data; replace with live API data if available
const demoTransactions = [
  { id: 1, type: 'Send', amount: '-$50.00', user: 'Alice', time: 'Just now' },
  { id: 2, type: 'Add Money', amount: '+$200.00', user: 'You', time: '1 min ago' },
  { id: 3, type: 'Withdraw', amount: '-$30.00', user: 'Agent', time: '2 min ago' },
  { id: 4, type: 'Pay Bills', amount: '-$120.00', user: 'Utility', time: '5 min ago' },
  { id: 5, type: 'Scan-to-Pay', amount: '-$15.00', user: 'Merchant', time: '8 min ago' },
];

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  hover: { scale: 1.03, boxShadow: '0 8px 32px rgba(0,0,0,0.12)' },
};

const TransactionsPreview: React.FC = () => {
  const [transactions, setTransactions] = useState(demoTransactions);

  // Optionally animate new transactions
  useEffect(() => {
    const interval = setInterval(() => {
      setTransactions((prev) => {
        // Find max id in current transactions
        const maxId = prev.reduce((max, tx) => Math.max(max, tx.id), 0);
        const newTx = {
          id: maxId + 1,
          type: 'Send',
          amount: `-$${Math.floor(Math.random() * 100)}.00`,
          user: 'RandomUser',
          time: 'Just now',
        };
        return [newTx, ...prev.slice(0, 4)];
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-16 bg-blue-50 dark:bg-gray-900">
      <div className="max-w-5xl mx-auto px-6 md:px-8">
        <ul className="space-y-4">
          {transactions.map((tx) => (
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
                <span className="font-semibold text-gray-700 dark:text-white">{tx.user}</span>
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
