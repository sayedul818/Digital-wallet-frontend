
import React, { useRef } from 'react';
import { Newspaper } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import { motion } from 'framer-motion';

const updates = [
  {
    title: 'New Feature: Scan-to-Pay',
    date: 'Dec 20, 2025',
    desc: 'You can now pay merchants instantly by scanning QR codes with your wallet app.'
  },
  {
    title: 'Security Update: 2FA',
    date: 'Dec 10, 2025',
    desc: 'We have added two-factor authentication for all users to enhance account security.'
  },
  {
    title: 'Agent Network Expansion',
    date: 'Nov 30, 2025',
    desc: 'Our agent network now covers 50+ new cities for instant cash services.'
  },
];




const BlogUpdates: React.FC = () => {
  const swiperRef = useRef(null);
  return (
    <section className="py-16 bg-white dark:bg-gray-950">
      <div className="max-w-5xl mx-auto px-6 md:px-8 text-center">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-12">
          <span className="inline-block px-4 py-2 bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400 rounded-full text-sm font-semibold mb-4">Blog</span>
          <h2 className="text-4xl font-bold mb-4">
            <span className="text-gray-800 dark:text-white">Latest </span>
            <span className="text-cyan-600 dark:text-cyan-400">Updates</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">Stay informed with our latest news and feature announcements</p>
        </motion.div>
        <Swiper
          modules={[Autoplay, Pagination, EffectFade]}
          spaceBetween={0}
          slidesPerView={1}
          loop={true}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          speed={900}
          direction="horizontal"
          pagination={{ clickable: true, renderBullet: (index, className) => `<span class='${className} custom-dot'></span>` }}
          className="pb-8"
          onSwiper={swiper => (swiperRef.current = swiper)}
        >
          {updates.map((update) => (
            <SwiperSlide key={update.title}>
              <motion.div
                className="flex flex-col items-center bg-blue-50/80 dark:bg-gray-800/80 rounded-xl shadow-lg px-6 py-10 md:p-10 transition-all"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
              >
                <Newspaper className="h-8 w-8 text-blue-600 mb-2" />
                <h3 className="text-lg font-semibold mb-1 text-gray-800 dark:text-white">{update.title}</h3>
                <div className="text-xs text-gray-500 mb-2 dark:text-gray-300">{update.date}</div>
                <p className="text-gray-600 dark:text-gray-300 text-center">{update.desc}</p>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
        <style>{`
          .swiper-pagination {
            display: flex; justify-content: center; gap: 0.5rem; margin-top: -1.5rem;
          }
          .custom-dot {
            display: inline-block;
            width: 12px; height: 12px;
            border-radius: 9999px;
            background: #dbeafe;
            opacity: 0.6;
            transition: all 0.3s cubic-bezier(.4,0,.2,1);
            margin: 0 4px;
          }
          .swiper-pagination-bullet-active.custom-dot {
            width: 32px;
            background: linear-gradient(90deg, #3b82f6 60%, #60a5fa 100%);
            opacity: 1;
            box-shadow: 0 2px 12px #60a5fa33;
          }
        `}</style>
      </div>
    </section>
  );
};

export default BlogUpdates;
