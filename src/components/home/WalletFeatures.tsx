
import React from 'react';
import { CreditCard, Send, Download, FileText, QrCode } from 'lucide-react';
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
  {
    icon: <FileText className="h-8 w-8 text-yellow-500" />,
    title: 'Pay Bills',
    desc: 'Pay utility bills and recharge services easily.'
  },
  {
    icon: <QrCode className="h-8 w-8 text-teal-500" />,
    title: 'Scan-to-Pay',
    desc: 'Pay merchants instantly by scanning QR codes.'
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
      <div className="max-w-5xl mx-auto px-6 md:px-8">
        <h2 className="text-3xl font-bold text-center mb-8 text-blue-700 dark:text-white">Key Wallet Features</h2>
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
