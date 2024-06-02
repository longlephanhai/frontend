import React from 'react'
import { FaFacebook } from "react-icons/fa";
import { FaFacebookMessenger } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { MdMarkEmailRead } from "react-icons/md";
import { Input } from 'antd';
import { AudioOutlined } from '@ant-design/icons';
import './Footer.css'
import logo from '../../assest/assest/logo.png'
import { RiMapPin2Fill } from "react-icons/ri";
import { FaPhoneAlt } from "react-icons/fa";
import { PiMapPinAreaFill } from "react-icons/pi";
import { MdOutlineEmail } from "react-icons/md";
import { Link } from 'react-router-dom';
const Footer = () => {
  const { Search } = Input;
  const suffix = (
    <AudioOutlined
      style={{
        fontSize: 16,
        color: '#DB2777',
      }}
    />
  );
  return (
    <footer id='contact'>
      <div className='bg-pink-500'>
        <div className='footer-head w-full py-3 container mx-auto flex justify-between'>
          <div className='footer-social flex text-white  gap-4 items-center text-3xl cursor-pointer'>
            <FaFacebook />
            <FaFacebookMessenger />
            <FaInstagram />
            <FaYoutube />
          </div>
          <div className='footer-letter flex items-center justify-center gap-2'>
            <div className='text-white text-3xl'>
              <MdMarkEmailRead />
            </div>
            <div className='text-2xl'>
              Receive beauty newsletters from us
            </div>
          </div>
          <div className='footer-search'>
            <Search
              placeholder="Enter your email"
              enterButton="Sign Up"
              defaultBg
              size="large"
              suffix={suffix}
            />
          </div>
        </div>
      </div>
      <div className='container mx-auto grid md:grid-cols-4 gap-4 mt-4'>
        <div>
          <ul className='gap-3'>
            <Link to={'/'}><img className='cursor-pointer' width={90} height={50} src={logo} alt='' /></Link>
            <li className='flex gap-2 p-1'>
              <RiMapPin2Fill className='text-pink-400 text-2xl' />
              <p className='text-sm font-medium cursor-pointer hover:text-pink-400'>Thanh Khuê, Ngũ Hành Sơn, Đà Nẵng</p>
            </li>
            <li className='flex gap-2 p-1'>
              <MdOutlineEmail className='text-pink-400 text-2xl' />
              <p className='text-sm font-medium cursor-pointer hover:text-pink-400'>support@gmail.com</p>
            </li>
            <li className='flex gap-2 p-1'>
              <FaPhoneAlt className='text-pink-400 text-2xl' />
              <p className='text-sm font-medium cursor-pointer hover:text-pink-400'>1800 9000</p>
            </li>
            <li className='flex gap-2 p12'>
              <PiMapPinAreaFill className='text-pink-400 text-2xl' />
              <p className='text-sm font-medium cursor-pointer hover:text-pink-400'>Shop System</p>
            </li>
          </ul>
        </div>
        <div>
          <p className='text-xl font-medium text-pink-500 mb-6'>Customer Support</p>
          <ul className='flex flex-col gap-3'>
            <li className='text-sm font-medium cursor-pointer hover:text-pink-400'>Home Page</li>
            <li className='text-sm font-medium cursor-pointer hover:text-pink-400'>Introduce</li>
            <li className='text-sm font-medium cursor-pointer hover:text-pink-400'>Product</li>
            <li className='text-sm font-medium cursor-pointer hover:text-pink-400'>Contact</li>
            <li className='text-sm font-medium cursor-pointer hover:text-pink-400'>news</li>
            <li className='text-sm font-medium cursor-pointer hover:text-pink-400'>Cart</li>
            <li className='text-sm font-medium cursor-pointer hover:text-pink-400'>Search</li>
          </ul>
        </div>
        <div>
          <p className='text-xl font-medium text-pink-500 mb-6'>Policy</p>
          <ul className='flex flex-col gap-3'>
            <li className='text-sm font-medium cursor-pointer hover:text-pink-400'>Home Page</li>
            <li className='text-sm font-medium cursor-pointer hover:text-pink-400'>Introduce</li>
            <li className='text-sm font-medium cursor-pointer hover:text-pink-400'>Product</li>
            <li className='text-sm font-medium cursor-pointer hover:text-pink-400'>Contact</li>
            <li className='text-sm font-medium cursor-pointer hover:text-pink-400'>news</li>
            <li className='text-sm font-medium cursor-pointer hover:text-pink-400'>Cart</li>
            <li className='text-sm font-medium cursor-pointer hover:text-pink-400'>Search</li>
          </ul>
        </div>
        <div>
          <p className='text-xl font-medium text-pink-500 mb-6'>Openning Times</p>
          <p className='font-semibold text-sm mb-3'>From 9:00 - 21:30 every day of the week (including holidays and New Year).</p>
          <p className='text-md font-medium text-pink-500 mb-1'>COMMENTS AND COMPLAINTS</p>
          <div className='flex gap-2 p-1'>
            <FaPhoneAlt className='text-pink-400 text-2xl' />
            <p className='text-sm font-medium cursor-pointer hover:text-pink-400' > 1900 8000</p>
          </div>
        </div>
      </div>
      <div className='border-t border-solid p-3'>
        <p className='text-center text-sm font-thin font-sans text-medium'>@2024 Copyright by LQ2T</p>
      </div>
    </footer>
  )
}

export default Footer
