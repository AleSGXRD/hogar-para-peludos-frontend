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
            <SwiperSlide 
              key={index}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: 'auto',
                minHeight: '300px' // Altura mínima para evitar colapso
              }}
            >
              <img 
                src={img} 
                alt={`${petName} - Foto ${index + 1}`}
                style={{
                  width: '100%',
                  height: 'auto',
                  maxHeight: '500px',
                  objectFit: 'contain', // Cambiado de 'cover' a 'contain'
                  borderRadius: '8px',
                  display: 'block' // Asegura que no haya espacio extra
                }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      );
};

export default ResponsiveSwiper;