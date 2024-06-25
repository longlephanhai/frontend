import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import banner1 from '../../assest/assest/banner/banner1.webp';
import banner2 from '../../assest/assest/banner/banner2.webp';
import banner3 from '../../assest/assest/banner/banner3.webp';
import banner4 from '../../assest/assest/banner/banner4.webp';
import banner5 from '../../assest/assest/banner/banner5.webp';
import banner1_mobile from '../../assest/assest/banner/banner1_mobile.webp';
import banner2_mobile from '../../assest/assest/banner/banner2_mobile.webp';
import banner3_mobile from '../../assest/assest/banner/banner3_mobile.webp';
import banner4_mobile from '../../assest/assest/banner/banner4_mobile.webp';
import banner5_mobile from '../../assest/assest/banner/banner5_mobile.webp';
import './BannerProduct.scss'
const BannerProduct = () => {
  const desktopImages = [banner1, banner2, banner3, banner4, banner5, banner1_mobile, banner2_mobile, banner3_mobile, banner4_mobile, banner5_mobile];
  return (
    <div className=' rounded'>
      <div className='h-[60vh] md:h-[60vh] w-full bg-slate-200 relative'>
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={0}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          className='h-full'
        >
          {desktopImages.map((item, index) => (
            <SwiperSlide key={index}>
              <img src={item} alt='' className='block w-full h-full object-cover' />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default BannerProduct;
