import React, { useState } from 'react';
import { FaFacebook, FaFacebookMessenger, FaInstagram, FaYoutube, FaPhoneAlt } from "react-icons/fa";
import { MdMarkEmailRead, MdOutlineEmail } from "react-icons/md";
import { Input } from 'antd';
import { AudioOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { RiMapPin2Fill } from "react-icons/ri";
import { PiMapPinAreaFill } from "react-icons/pi";
import './Footer.css';
import logo from '../../assest/assest/Remove-bg.ai_1732618552132.webp';
import { IoMdArrowDropup, IoMdArrowDropdown } from "react-icons/io";
const Footer = () => {
  const { Search } = Input;
  const suffix = (
    <AudioOutlined
      style={{
        fontSize: 16,
        color: 'red',
      }}
    />
  );

  const [isOpen, setIsOpen] = useState({
    address: false,
    customerSupport: false,
    policy: false,
    openingTimes: false,
  });

  const toggleDropdown = (section) => {
    setIsOpen(prevState => ({
      ...prevState,
      [section]: !prevState[section]
    }));
  };


  return (
    <footer id='contact'>
      <div className='bg-red-500'>
        <div className='footer-head w-full py-3 container mx-auto flex flex-col md:flex-row justify-between items-center'>
          <div className='footer-social flex text-white gap-4 items-center text-3xl cursor-pointer'>
            <FaFacebook />
            <FaFacebookMessenger />
            <FaInstagram />
            <FaYoutube />
          </div>
          <div className='footer-letter flex items-center justify-center gap-2 mt-4 md:mt-0'>
            <div className='text-white text-3xl'>
              <MdMarkEmailRead />
            </div>
            <div className='text-sm md:text-md  lg:text-lg xl:text-xl text-white'>
              Nhận thông tin về những sản phẩm mới nhất từ chúng tôi
            </div>
          </div>
          <div className='footer-search mt-4 md:mt-0'>
            <Search
              placeholder="Nhập email của bạn"
              enterButton="Đăng ký"
              size="large"
              suffix={suffix}
            />
          </div>
        </div>
      </div>
      <div className='container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4'>
        <div>
          <button
            className='w-full py-2 text-left text-xl font-medium text-red-500 md:text-xl md:font-medium md:text-red-500'
          // onClick={() => toggleDropdown('address')}
          >
            Địa chỉ
          </button>
          <ul className={`gap-3 overflow-hidden transition-all duration-300  md:max-h-none`}>
            <Link to={'/'}><img className='cursor-pointer' width={90} height={50} src={logo} alt='' /></Link>
            <li className='flex gap-2 p-1'>
              <RiMapPin2Fill className='text-red-400 text-2xl' />
              <p className='text-sm font-medium cursor-pointer hover:text-red-400'>Thanh Khuê, Ngũ Hành Sơn, Đà Nẵng</p>
            </li>
            <li className='flex gap-2 p-1'>
              <MdOutlineEmail className='text-red-400 text-2xl' />
              <p className='text-sm font-medium cursor-pointer hover:text-red-400'>support@gmail.com</p>
            </li>
            <li className='flex gap-2 p-1'>
              <FaPhoneAlt className='text-red-400 text-2xl' />
              <p className='text-sm font-medium cursor-pointer hover:text-red-400'>1800 9000</p>
            </li>
            <li className='flex gap-2 p-1'>
              <PiMapPinAreaFill className='text-red-400 text-2xl' />
              <p className='text-sm font-medium cursor-pointer hover:text-red-400'>Hệ thống cửa hàng</p>
            </li>
          </ul>
        </div>
        <div>
          <button
            className='flex items-center w-full py-2 text-left text-xl font-medium text-red-500 md:text-xl md:font-medium md:text-red-500'
            onClick={() => toggleDropdown('customerSupport')}
          >
            Hổ trợ khách hàng
            <IoMdArrowDropup className={`ml-2 ${isOpen.customerSupport ? 'hidden' : 'block'} block md:hidden`} />
            <IoMdArrowDropdown className={`ml-2 ${isOpen.customerSupport ? 'block' : 'hidden'} block md:hidden`} />
          </button>
          <ul className={`flex flex-col gap-3 overflow-hidden transition-all duration-200 ${isOpen.customerSupport ? 'max-h-screen' : 'max-h-0'} md:max-h-none`}>
            <li className='text-sm font-medium cursor-pointer hover:text-red-400'>Trang chủ</li>
            <li className='text-sm font-medium cursor-pointer hover:text-red-400'>Giới thiệu</li>
            <li className='text-sm font-medium cursor-pointer hover:text-red-400'>Sản phẩm</li>
            <li className='text-sm font-medium cursor-pointer hover:text-red-400'>Liên hệ</li>
            <li className='text-sm font-medium cursor-pointer hover:text-red-400'>Tin tức</li>
            <li className='text-sm font-medium cursor-pointer hover:text-red-400'>Giỏ hàng</li>
            <li className='text-sm font-medium cursor-pointer hover:text-red-400'>Tìm kiếm</li>
          </ul>
        </div>
        <div>
          <button
            className='flex items-center w-full py-2 text-left text-xl font-medium text-red-500 md:text-xl md:font-medium md:text-red-500'
            onClick={() => toggleDropdown('policy')}
          >
            Chính sách
            <IoMdArrowDropup className={`ml-2 ${isOpen.policy ? 'hidden' : 'block'} block md:hidden`} />
            <IoMdArrowDropdown className={`ml-2 ${isOpen.policy ? 'block' : 'hidden'} block md:hidden`} />
          </button>
          <ul className={`flex flex-col gap-3 overflow-hidden transition-all duration-200 ${isOpen.policy ? 'max-h-screen' : 'max-h-0'} md:max-h-none`}>
            <li className='text-sm font-medium cursor-pointer hover:text-red-400'>Trang chủ</li>
            <li className='text-sm font-medium cursor-pointer hover:text-red-400'>Giới thiệu</li>
            <li className='text-sm font-medium cursor-pointer hover:text-red-400'>Sản phẩm</li>
            <li className='text-sm font-medium cursor-pointer hover:text-red-400'>Liên hệ</li>
            <li className='text-sm font-medium cursor-pointer hover:text-red-400'>Tin tức</li>
            <li className='text-sm font-medium cursor-pointer hover:text-red-400'>Giỏ hàng</li>
            <li className='text-sm font-medium cursor-pointer hover:text-red-400'>Tìm kiếm</li>
          </ul>
        </div>
        <div>
          <button
            className='w-full py-2 text-left text-xl font-medium text-red-500 md:text-xl md:font-medium md:text-red-500'
          >
            Giờ mở cửa
          </button>
          <div className={`overflow-hidden transition-all duration-300  md:max-h-none`}>
            <p className='font-semibold text-sm mb-3'>Từ 9:00 - 21:30 tất cả các ngày trong tuần (kể cả ngày lễ, Tết).</p>
            <p className='text-md font-medium text-red-500 mb-1'>NHẬN XÉT VÀ KHIẾU NẠI</p>
            <div className='flex gap-2 p-1'>
              <FaPhoneAlt className='text-red-400 text-2xl' />
              <p className='text-sm font-medium cursor-pointer hover:text-red-400'>1900 8000</p>
            </div>
          </div>
        </div>
      </div>
      <div className='border-t border-solid p-3'>
        <p className='text-center text-sm font-thin font-sans text-medium'>@2024 Copyright by LQ2T</p>
      </div>
    </footer>
  );
}

export default Footer;
