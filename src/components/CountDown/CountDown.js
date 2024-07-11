import React, { useState, useEffect } from 'react';
import { Row, Col } from 'antd'
import VerticalCardProduct from '../VerticalCardProduct/VerticalCardProduct';
import hoa from '../../assest/assest/hoq (1).webp'
const Countdown = ({ targetDate }) => {
  const calculateTimeLeft = () => {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  const addLeadingZeros = value => {
    if (value < 10) {
      return `0${value}`;
    }
    return value;
  };

  const { days, hours, minutes, seconds } = timeLeft;

  return (
    <div className='container mx-auto'>
      <Row>
        <Col xxl={12} xl={12} lg={12} md={24} sm={24} xs={24}>
          <div className='flex flex-col items-center justify-center text-center w-full h-full'>
            <img src={hoa} alt='' width={50} height={'auto'} />
            <div className='text-3xl font-medium m-4'>Hot Selling</div>
            <div className='flex items-center justify-center flex-wrap'>
              <span className='text-xl md:text-xl lg:text-xxl xl:text-xl mr-2'>END LATER</span>
              <div className='flex items-center'>
                <div className=' w-16  md:w-24 lg:w-24 xl:w-24 h-20 md:h-24 lg:h-24 xl:h-24 mx-1 rounded-xl border-2 border-pink-500 p-4 flex flex-col items-center justify-center'>
                  <span className='text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold'>{addLeadingZeros(days)}</span>
                  <div className='font-light text-slate-500 text-xs md:text-sm lg:text-base xl:text-lg'>Days</div>
                </div>
                <div className=' w-16 md:w-24 lg:w-24 xl:w-24 h-20 md:h-24 lg:h-24 xl:h-24 mx-1 rounded-xl border-2 border-pink-500 p-4 flex flex-col items-center justify-center'>
                  <span className='text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold'>{addLeadingZeros(hours)}</span>
                  <div className='font-light text-slate-500 text-xs md:text-sm lg:text-base xl:text-lg'>Hours</div>
                </div>
                <div className=' w-16 md:w-24 lg:w-24 xl:w-24 h-20 md:h-24 lg:h-24 xl:h-24 mx-1 rounded-xl border-2 border-pink-500 p-4 flex flex-col items-center justify-center'>
                  <span className='text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold'>{addLeadingZeros(minutes)}</span>
                  <div className='font-light text-slate-500 text-xs md:text-sm lg:text-base xl:text-lg'>Minutes</div>
                </div>
                <div className=' w-16 md:w-24 lg:w-24 xl:w-24 h-20 md:h-24 lg:h-24 xl:h-24 mx-1 rounded-xl border-2 border-pink-500 p-4 flex flex-col items-center justify-center'>
                  <span className='text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold'>{addLeadingZeros(seconds)}</span>
                  <div className='font-light text-slate-500 text-xs md:text-sm lg:text-base xl:text-lg'>Seconds</div>
                </div>
              </div>
            </div>
          </div>
        </Col>
        <Col xxl={12} xl={12} lg={12} md={24} sm={24} xs={24}>
          <VerticalCardProduct category={"facialoil"} />
        </Col>
      </Row>
    </div >
  );
};

export default Countdown;
