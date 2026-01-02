import React from 'react';
import { motion } from 'framer-motion';

// Example logo URLs (replace with your own or static imports as needed)
const logos = [
  {
    src: "https://cdn.worldvectorlogo.com/logos/stripe-4.svg",
    alt: "Stripe"
  },
  {
    src: "https://cdn.worldvectorlogo.com/logos/paypal-3.svg",
    alt: "PayPal"
  },
  {
    src: "https://cdn.worldvectorlogo.com/logos/shopify-2.svg",
    alt: "Shopify"
  },
  {
    src: "https://cdn.worldvectorlogo.com/logos/visa-10.svg",
    alt: "Visa"
  },
  {
    src: "https://cdn.worldvectorlogo.com/logos/mastercard-modern-design-.svg",
    alt: "Mastercard"
  },
  {
    src: "https://cdn.worldvectorlogo.com/logos/google-pay-2.svg",
    alt: "Google Pay"
  },
  {
    src: "https://cdn.worldvectorlogo.com/logos/apple-pay-2.svg",
    alt: "Apple Pay"
  },
  {
    src: "https://cdn.worldvectorlogo.com/logos/alipay-logo.svg",
    alt: "Alipay"
  }
]


const DURATION = 25; // seconds

const LogoSlider: React.FC = () => {
  // Duplicate logos for seamless infinite scroll
  const allLogos = [...logos, ...logos];
  return (
    <section className="w-full py-16 bg-white dark:bg-gradient-to-b dark:from-gray-950 dark:to-gray-900">
      <div className="max-w-5xl mx-auto px-6 md:px-8 text-center mb-12">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <span className="inline-block px-4 py-2 bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 rounded-full text-sm font-semibold mb-4">Partners</span>
          <h2 className="text-4xl font-bold mb-4">
            <span className="text-gray-800 dark:text-white">Trusted By </span>
            <span className="text-rose-600 dark:text-rose-400">World-Class Teams</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">These leading companies already use PayWallet for their payment needs</p>
        </motion.div>
      </div>
      <div className="relative overflow-hidden w-full">
        <div
          className="flex items-center gap-12 animate-logo-marquee"
          style={{
            width: 'max-content',
            animation: `logo-marquee ${DURATION}s linear infinite`,
          }}
        >
          {allLogos.map((logo, idx) => (
            <div
              key={idx}
              className="flex-shrink-0 flex items-center justify-center h-16 md:h-20 px-6 md:px-8 opacity-80 grayscale hover:opacity-100 hover:grayscale-0 hover:scale-105 transition-all duration-300"
              style={{ minWidth: 120 }}
            >
              <img
                src={logo.src}
                alt={logo.alt}
                className="h-10 md:h-12 object-contain"
                draggable={false}
                loading="lazy"
              />
            </div>
          ))}
        </div>
        <style>{`
          @keyframes logo-marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          @media (max-width: 768px) {
            .animate-logo-marquee { gap: 2rem !important; }
          }
        `}</style>
      </div>
    </section>
  );
};

export default LogoSlider;
