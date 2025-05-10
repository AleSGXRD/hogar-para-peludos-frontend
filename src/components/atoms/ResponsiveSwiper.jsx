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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Verificar al montar
    handleResize();
    
    // Escuchar cambios de tamaño
    window.addEventListener('resize', handleResize);
    
    // Limpiar listener
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="swiper-container" style={{ width: '100%', maxWidth: '500px', margin: '0 auto' }}>
      {isMobile ? (
        // Versión móvil - Efecto más simple (cards)
        <Swiper
          effect={'cards'}
          grabCursor={true}
          modules={[EffectCards, Pagination]}
          pagination={true}
          className="mobile-swiper"
        >
          {images.map((img, index) => (
            <SwiperSlide key={index}>
              <img 
                src={img} 
                alt={`${petName} - Foto ${index + 1}`} 
                style={{ 
                  width: '100%', 
                  height: 'auto',
                  maxHeight: '400px',
                  objectFit: 'cover',
                  borderRadius: '8px'
                }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        // Versión desktop - Efecto 3D
        <Swiper
          effect={'coverflow'}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={'auto'}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          pagination={true}
          modules={[EffectCoverflow, Pagination]}
          className="desktop-swiper"
        >
          {images.map((img, index) => (
            <SwiperSlide key={index} style={{ width: '75%' }}>
              <img 
                src={img} 
                alt={`${petName} - Foto ${index + 1}`} 
                style={{ 
                  width: '100%', 
                  height: 'auto',
                  maxHeight: '500px',
                  objectFit: 'cover',
                  borderRadius: '16px'
                }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default ResponsiveSwiper;