// components/atoms/ResponsiveSwiper.jsx
import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards, EffectCoverflow, Navigation, Pagination } from 'swiper/modules';

// Importa los estilos de Swiper
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/effect-cards';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const ResponsiveSwiper = ({ images, petName }) => {
    return (
        <Swiper
          spaceBetween={10}
          slidesPerView={1}
          pagination={{ clickable: true }}
          modules={[Pagination]}
          style={{ width: '100%', maxWidth: '100%' }}
        >
          {images.map((img, index) => (
            <SwiperSlide key={index}>
              <img 
                src={img} 
                alt={`${petName} - Foto ${index + 1}`}
                style={{
                  width: '100%',
                  height: 'auto',
                  maxHeight: '300px',
                  objectFit: 'cover',
                  borderRadius: '8px'
                }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      );
};

export default ResponsiveSwiper;