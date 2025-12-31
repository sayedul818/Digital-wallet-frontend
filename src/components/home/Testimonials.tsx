
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
      <div className="max-w-5xl mx-auto px-6 md:px-8">
        <h2 className="text-3xl font-bold text-center mb-8 text-blue-700 dark:text-white">Testimonials & Reviews</h2>
        <div className="py-16 bg-white dark:bg-gray-900 dark:text-white">
          <div className="max-w-5xl mx-auto px-6 md:px-8 overflow-x-hidden">
            <Swiper
              modules={[Pagination, Autoplay]}
              spaceBetween={0}
              slidesPerView={slidesPerView}
              centeredSlides={true}
              loop={true}
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              pagination={{ clickable: true }}
              onSlideChange={swiper => setActiveIndex(swiper.realIndex)}
              className="pb-8"
              style={{ overflow: 'visible', maxWidth: '100vw' }}
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
                  <SwiperSlide key={idx} style={{ display: 'flex', justifyContent: 'center', minWidth: 0 }}>
                    <motion.div
                      className={`flex flex-col items-center rounded-2xl p-4 md:p-8 m-4 transition-all duration-300
                        ${slideState === 'center' ? 'bg-white/90 dark:bg-gray-800/90 scale-105 z-20 shadow-lg' : ''}
                        ${slideState === 'side' ? 'bg-white/60 dark:bg-gray-800/60 scale-90 blur-sm z-10 shadow' : ''}
                        ${slideState === 'hidden' ? 'opacity-0 pointer-events-none' : ''}
                      `}
                      style={{ minWidth: 0, width: isMobile ? '90vw' : 320, maxWidth: isMobile ? '98vw' : 400 }}
                      animate={{
                        scale: slideState === 'center' ? 1.08 : 0.92,
                        filter: slideState === 'center' ? 'blur(0px)' : 'blur(4px)',
                        opacity: slideState === 'hidden' ? 0 : 1,
                      }}
                      transition={{ type: 'spring', stiffness: 200, damping: 24 }}
                      whileHover={{}}
                    >
                      <div className="mb-4 flex items-center">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="h-5 w-5 text-yellow-400" />
                        ))}
                      </div>
                      <p className="text-lg text-gray-700 dark:text-gray-200 text-center mb-2">"{testimonial.review}"</p>
                      <span className="font-semibold text-blue-700 dark:text-blue-300">{testimonial.name}</span>
                    </motion.div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
            <style>{`
              .swiper-pagination {
                display: flex; justify-content: center; gap: 0.5rem; margin-top: -1.5rem;
              }
              .swiper-pagination-bullet {
                width: 12px; height: 12px;
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
