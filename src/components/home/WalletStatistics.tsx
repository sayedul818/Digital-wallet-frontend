
import React from 'react';
import { Users, Activity, DollarSign } from 'lucide-react';
import { motion } from 'framer-motion';

const stats = [
  {
    icon: <Users className="h-10 w-10 text-blue-600" />,
    label: 'Users',
    value: '20+',
    desc: 'Active wallet users'
  },
  {
    icon: <Activity className="h-10 w-10 text-green-600" />,
    label: 'Daily Transactions',
    value: '100+',
    desc: 'Transactions per day'
  },
  {
    icon: <DollarSign className="h-10 w-10 text-yellow-500" />,
    label: 'Total Volume',
    value: '$5000+',
    desc: 'Total money moved'
  },
];

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  hover: { scale: 1.05, boxShadow: '0 8px 32px rgba(0,0,0,0.12)' },
};

const WalletStatistics: React.FC = () => (
  <>
    <section className="py-16 bg-white dark:bg-gray-950">
      <div className="max-w-5xl mx-auto px-6 md:px-8 text-center">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-12">
          <span className="inline-block px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full text-sm font-semibold mb-4">Statistics</span>
          <h2 className="text-4xl font-bold mb-4">
            <span className="text-gray-800 dark:text-white">Wallet </span>
            <span className="text-purple-600 dark:text-purple-400">Statistics</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">Real-time insights into our growing platform</p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              className="flex flex-col items-center bg-blue-50 dark:bg-gray-800 rounded-lg shadow p-8"
              initial="hidden"
              whileInView="visible"
              whileHover="hover"
              viewport={{ once: true, amount: 0.3 }}
              variants={cardVariants}
            >
              <div className="mb-4">{stat.icon}</div>
              <div className="text-3xl font-bold text-blue-800 dark:text-white mb-2">{stat.value}</div>
              <div className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-1">{stat.label}</div>
              <div className="text-gray-500 dark:text-gray-400 text-sm">{stat.desc}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
    {/* You can add more sections here if needed, but make sure to close all tags properly */}
  </>
);

export default WalletStatistics;
