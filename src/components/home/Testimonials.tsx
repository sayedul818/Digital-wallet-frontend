
import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { motion } from 'framer-motion';

const testimonials = [
  {
    name: 'Alice',
    review: 'PayWallet makes sending money to my family so easy and secure!',
    rating: 5
  },
  {
    name: 'Bob',
    review: 'I love the instant cash-out feature and the friendly agents.',
    rating: 4
  },
  {
    name: 'Priya',
    review: 'The app is super fast and the security gives me peace of mind.',
    rating: 5
  },
];

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
};

const Testimonials: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  // Responsive: 1 slide on mobile, 3 on md+
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const slidesPerView = isMobile ? 1 : 3;
  return (
    <section className="py-16 bg-blue-50 dark:bg-gray-900">
      <div className="max-w-5xl mx-auto px-4 md:px-8 text-center">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-12">
          <span className="inline-block px-4 py-2 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-full text-sm font-semibold mb-4">Testimonials</span>
          <h2 className="text-4xl font-bold mb-4">
            <span className="text-gray-800 dark:text-white">Users </span>
            <span className="text-orange-600 dark:text-orange-400">Love Us</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">Hear from users who found their perfect wallet solution through our platform</p>
        </motion.div>
        <div className="py-8 md:py-16 bg-white dark:bg-gray-900 dark:text-white">
          <div className="max-w-5xl mx-auto px-2 md:px-8 overflow-hidden">
            <Swiper
              modules={[Pagination, Autoplay]}
              spaceBetween={isMobile ? 10 : 0}
              slidesPerView={slidesPerView}
              centeredSlides={true}
              loop={true}
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              pagination={{ clickable: true }}
              onSlideChange={swiper => setActiveIndex(swiper.realIndex)}
              className="pb-12 testimonials-swiper"
            >
              {testimonials.map((testimonial, idx) => {
                // Calculate slide position relative to center
                let slideState = 'side';
                if (idx === activeIndex) slideState = 'center';
                else if (
                  idx === (activeIndex + 1) % testimonials.length ||
                  idx === (activeIndex - 1 + testimonials.length) % testimonials.length
                ) slideState = 'side';
                else slideState = 'hidden';
                return (
                  <SwiperSlide key={idx} className="flex justify-center items-center">
                    <motion.div
                      className={`flex flex-col items-center rounded-2xl p-6 md:p-8 transition-all duration-300 w-full
                        ${slideState === 'center' ? 'bg-white dark:bg-gray-800 scale-100 md:scale-105 z-20 shadow-xl' : ''}
                        ${slideState === 'side' ? 'bg-white/60 dark:bg-gray-800/60 scale-90 blur-sm z-10 shadow' : ''}
                        ${slideState === 'hidden' ? 'opacity-0 pointer-events-none' : ''}
                      `}
                      style={{ 
                        maxWidth: isMobile ? 'calc(100vw - 48px)' : '380px',
                        minHeight: '200px'
                      }}
                      animate={{
                        scale: slideState === 'center' ? (isMobile ? 1 : 1.08) : 0.92,
                        filter: slideState === 'center' ? 'blur(0px)' : 'blur(4px)',
                        opacity: slideState === 'hidden' ? 0 : 1,
                      }}
                      transition={{ type: 'spring', stiffness: 200, damping: 24 }}
                      whileHover={{}}
                    >
                      <div className="mb-4 flex items-center justify-center">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                        ))}
                      </div>
                      <p className="text-base md:text-lg text-gray-700 dark:text-gray-200 text-center mb-4 px-2 leading-relaxed">
                        "{testimonial.review}"
                      </p>
                      <span className="font-semibold text-blue-700 dark:text-blue-300">{testimonial.name}</span>
                    </motion.div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
            <style>{`
              .testimonials-swiper {
                overflow: hidden !important;
              }
              .testimonials-swiper .swiper-wrapper {
                align-items: center;
              }
              .swiper-pagination {
                display: flex; 
                justify-content: center; 
                gap: 0.5rem; 
                margin-top: 1rem;
                position: relative;
              }
              .swiper-pagination-bullet {
                width: 12px; 
                height: 12px;
                border-radius: 9999px;
                background: #dbeafe;
                opacity: 0.6;
                transition: all 0.3s cubic-bezier(.4,0,.2,1);
                margin: 0 4px;
              }
              .swiper-pagination-bullet-active {
                width: 32px;
                background: linear-gradient(90deg, #3b82f6 60%, #60a5fa 100%);
                opacity: 1;
                box-shadow: 0 2px 12px #60a5fa33;
              }
            `}</style>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
