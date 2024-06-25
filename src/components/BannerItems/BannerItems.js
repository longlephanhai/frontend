import React from 'react';
import { Row, Col } from 'antd';
import banner1 from '../../assest/assest/banner2/home_group_banner_item_image_1.webp';
import banner2 from '../../assest/assest/banner2/home_group_banner_item_image_2.webp';
import banner3 from '../../assest/assest/banner2/home_group_banner_item_image_3.webp';
import banner4 from '../../assest/assest/banner2/home_group_banner_item_image_4.webp';
import banner5 from '../../assest/assest/banner2/home_fsale_image.webp';

const BannerItems = () => {
  return (
    <div className='container mx-auto m-4'>
      <Row gutter={[16, 16]}>
        <Col xxl={8} xl={8} lg={8} md={8} sm={8} xs={8}>
          <img src={banner1} alt='' className="w-full transition-transform duration-300 hover:scale-105" />
        </Col>
        <Col xxl={16} xl={16} lg={16} md={16} sm={16} xs={16}>
          <Row gutter={[16, 16]}>
            <Col xxl={24} xl={24} lg={24} md={24} xs={24}>
              <img src={banner2} alt='' className="w-full transition-transform duration-300 hover:scale-105" />
            </Col>
            <Col xxl={12} xl={12} lg={12} md={12} xs={12}>
              <img src={banner3} alt='' className="w-full transition-transform duration-300 hover:scale-105"/>
            </Col>
            <Col xxl={12} xl={12} lg={12} md={12} xs={12}>
              <img src={banner4} alt='' className="w-full transition-transform duration-300 hover:scale-105"/>
            </Col>
          </Row>
        </Col>
        <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
          <img src={banner5} alt='' className="w-full transition-transform duration-300 hover:scale-105"/>
        </Col>
      </Row>
    </div>
  );
}

export default BannerItems;
