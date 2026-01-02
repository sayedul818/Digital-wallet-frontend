import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection: React.FC = () => (
  <section className="relative flex flex-col items-center justify-center min-h-[60vh] md:min-h-[70vh] bg-gradient-to-br from-blue-600 to-green-400 dark:from-gray-950 dark:to-gray-900 text-white dark:text-white text-center overflow-hidden">
    <div className="absolute inset-0 opacity-20 pointer-events-none">
      {/* Example animation/slider/video placeholder */}
      <video autoPlay loop muted className="w-full h-full object-cover">
        <source src="/assets/wallet-preview.mp4" type="video/mp4" />
      </video>
    </div>
    <div className="relative z-10 max-w-4xl mx-auto py-20 px-6 md:px-8">
      <h1 className="text-4xl md:text-5xl font-bold mb-6 drop-shadow-lg">
        Welcome to PayWallet
      </h1>
      <p className="text-lg md:text-xl mb-8 font-medium drop-shadow">
        Your secure, fast, and modern digital wallet. Send, receive, and manage money with confidence.
      </p>
      <div className="flex flex-col md:flex-row gap-4 justify-center mb-8">
        <Link to="/register" className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg shadow hover:bg-blue-100 transition">Create Wallet</Link>
        <Link to="/login" className="bg-green-500 text-white font-semibold px-6 py-3 rounded-lg shadow hover:bg-green-600 transition">Add Money</Link>
      </div>
      <div className="mt-4 animate-bounce text-white/80">
        <span>▼</span>
        <p className="text-sm mt-2">Scroll for more features</p>
      </div>
    </div>
  </section>
);

export default HeroSection;
