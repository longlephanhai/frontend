import React from 'react'
import { Row, Col } from 'antd'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import './Brand.scss' // Create a separate CSS file for styling
import brand1 from '../../assest/assest/brand_1.webp'
import brand2 from '../../assest/assest/brand_2.webp'
import brand3 from '../../assest/assest/brand_3.webp'
import brand4 from '../../assest/assest/brand_4.webp'
import brand5 from '../../assest/assest/brand_5.webp'
import brand6 from '../../assest/assest/brand_7.webp'

const Brand = () => {
  return (
    <div className='brand relative'>
      <Row className='brand-row'>
        <Col xxl={7} xl={7} lg={24} md={24} sm={24} xs={24} className='brand-title-col'>
          <h2 className='brand-title'>Prominent Brand</h2>
        </Col>
        <Col xxl={17} xl={17} lg={24} md={24} sm={24} xs={24} className='brand-slider-col'>
          <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            spaceBetween={10}
            slidesPerView={5}
            navigation
            pagination={{ clickable: true }}
            className='brand-swiper'
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            breakpoints={{
              320: {
                slidesPerView: 1,
              },
              640: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 1,
              },
              1024: {
                slidesPerView: 5,
              },
            }}
          >
            <SwiperSlide className='brand-slide'><img src={brand1} alt='Brand 1' className='brand-image' /></SwiperSlide>
            <SwiperSlide className='brand-slide'><img src={brand2} alt='Brand 2' className='brand-image' /></SwiperSlide>
            <SwiperSlide className='brand-slide'><img src={brand3} alt='Brand 3' className='brand-image' /></SwiperSlide>
            <SwiperSlide className='brand-slide'><img src={brand4} alt='Brand 4' className='brand-image' /></SwiperSlide>
            <SwiperSlide className='brand-slide'><img src={brand5} alt='Brand 5' className='brand-image' /></SwiperSlide>
            <SwiperSlide className='brand-slide'><img src={brand6} alt='Brand 6' className='brand-image' /></SwiperSlide>
          </Swiper>
        </Col>
      </Row>
      <div class="arrow-down absolute -bottom-5 left-[48%]"></div>
    </div>
  )
}

export default Brand
