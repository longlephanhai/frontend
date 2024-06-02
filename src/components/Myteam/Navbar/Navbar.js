/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import logo from '../../../assest/assest/logoupdate.webp'
import { FaBars } from "react-icons/fa6";
import { Row, Col } from 'antd'
import './Navbar.scss'
import { Dropdown } from 'antd';
const Navbar = () => {
  const items = [
    {
      label: 'Home',
      key: '0',
    },
    {
      label: 'About',
      key: '1',
    },
    {
      type: 'Work Process',
      key:'3'
    },
    {
      label: 'Testimonials',
      key: '4',
    },
    {
      label: 'Pricing Tables',
      key: '5',
    },
  ];
  return (
    <div className='navbar items-center'>
      <Row>
        <Col className='' xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
          <div data-aos="zoom-in" class="header mt-4 fixed  flex top-4 w-full z-50 min-w-[80%]">
            <div class="container mx-auto flex justify-between p-2 px-8 items-center bg-white rounded-full  shadow-xl">
              <div className=''>
                <img src={logo} width={100} height={'auto'} alt='' />
              </div>
              <div>
                <ul className='social flex justify-around gap-4 ml-6'>
                  <li className='cursor-pointer text-lg ml-1 text-pink-400 hover:text-pink-600'>Home</li>
                  <li className='cursor-pointer text-lg ml-1 text-pink-400 hover:text-pink-600'>About</li>
                  <li className='cursor-pointer text-lg ml-1 text-pink-400 hover:text-pink-600'>Work Process</li>
                  <li className='cursor-pointer text-lg ml-1 text-pink-400 hover:text-pink-600'>Testimonials</li>
                  <li className='cursor-pointer text-lg ml-1 text-pink-400 hover:text-pink-600'>Pricing Tables</li>
                  <li className='cursor-pointer text-lg ml-1 text-pink-400 hover:text-pink-600'>Blog Entries</li>
                  <li className='cursor-pointer text-lg ml-1 text-pink-400 hover:text-pink-600'>Contact Us</li>
                </ul>
                <div>
                  <Dropdown
                    menu={{
                      items,
                    }}
                    trigger={['click']}
                  >
                    <a onClick={(e) => e.preventDefault()}>
                      <FaBars className='hidden icon' />
                    </a>
                  </Dropdown>
                </div>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default Navbar
