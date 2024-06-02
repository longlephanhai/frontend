import { Col, Row } from 'antd'
import { CiDollar } from "react-icons/ci";
import { FaUserFriends } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import React from 'react'
const AreaCard = () => {
  return (
    <>
      <Row className='' gutter={[20, 16]}>
        <Col xxl={6} xl={6} lg={6} md={24} sm={24} xs={24}>
          <div className='bg-white  rounded-xl shadow-sm p-2'>
            <p className='text-slate-400 text-2xl'>Today's Sales</p>
            <div className='flex gap-1 justify-between items-center'>
              <div className='flex'>
                <p className='font-semibold text-2xl'>$50,000</p>
                <p className='pt-2 pl-2 text-green-500 text-sm font-medium'>+20%</p>
              </div>
              <div className='bg-pink-600 p-2 rounded-lg -mt-4'>
                <CiDollar className='w-6 h-6 text-white font-medium' />
              </div>
            </div>
          </div>
        </Col>
        <Col  xxl={6} xl={6} lg={6} md={24} sm={24} xs={24}>
          <div className='bg-white  rounded-xl shadow-sm p-2'>
            <p className='text-slate-400 text-2xl'>Today's User</p>
            <div className='flex gap-1 justify-between items-center'>
              <div className='flex'>
                <p className='font-semibold text-2xl'>20,300</p>
                <p className='pt-2 pl-2 text-green-500 text-sm font-medium'>+20%</p>
              </div>
              <div className='bg-pink-600 p-2 rounded-lg -mt-4'>
                <FaUserFriends className='w-6 h-6 text-white font-medium' />
              </div>
            </div>
          </div>
        </Col>
        <Col xxl={6} xl={6} lg={6} md={24} sm={24} xs={24}>
          <div className='bg-white  rounded-xl shadow-sm p-2'>
            <p className='text-slate-400 text-2xl'>New Clients</p>
            <div className='flex gap-1 justify-between items-center'>
              <div className='flex'>
                <p className='font-semibold text-2xl'>$50,000</p>
                <p className='pt-2 pl-2 text-red-500 text-sm font-medium'>-20%</p>
              </div>
              <div className='bg-pink-600 p-2 rounded-lg -mt-4'>
                <FaHeart className='w-6 h-6 text-white font-medium' />
              </div>
            </div>
          </div>
        </Col>
        <Col  xxl={6} xl={6} lg={6} md={24} sm={24} xs={24}>
          <div className='bg-white rounded-xl shadow-sm p-2'>
            <p className='text-slate-400 text-2xl'>New Orders</p>
            <div className='flex gap-1 justify-between items-center'>
              <div className='flex'>
                <p className='font-semibold text-2xl'>$10,000</p>
                <p className='pt-2 pl-2 text-green-500 text-sm font-medium'>+10%</p>
              </div>
              <div className='bg-pink-600 p-2 rounded-lg -mt-4'>
                <FaLock className='w-6 h-6 text-white font-medium' />
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </>
  )
}

export default AreaCard
