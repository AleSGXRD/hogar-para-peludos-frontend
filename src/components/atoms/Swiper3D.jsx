// src/components/ReactSwiper3D.jsx
import { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards, Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-cards';
import 'swiper/css/navigation';

export default function swiper3D({ images, petName }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef(null);

  const settings = {
    modules: [EffectCards, Autoplay, Navigation],
    effect: 'cards',
    grabCursor: true,
    centeredSlides: true,
    loop: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    navigation: true,
    onSlideChange: (swiper) => setActiveIndex(swiper.realIndex),
    className: 'rounded-2xl shadow-xl aspect-video w-full'
  };

  return (
      <div 
    className="swiper-3d-container"
    onMouseMove={(e) => {
        const container = e.currentTarget;
        const rect = container.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateY = (x - centerX) / 20;
        const rotateX = (centerY - y) / 20;
        
        if(swiperRef.current) {
          const activeSlide = swiperRef.current.el.querySelector('.swiper-slide-active');
          if(activeSlide) {
            activeSlide.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg) scale(1)`;
          }
        }
      }}
      onMouseLeave={() => {
        if(swiperRef.current) {
          const activeSlide = swiperRef.current.el.querySelector('.swiper-slide-active');
          if(activeSlide) {
            activeSlide.style.transform = 'rotateY(0) rotateX(0) scale(1)';
          }
        }
      }}
    >
      <Swiper ref={swiperRef} {...settings}>
      {images.map((image, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-full">
              <img
                src={image}
                alt={`${petName} ${index + 1}`}
                className="w-full h-full object-cover rounded-2xl"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}