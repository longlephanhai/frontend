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
            <div className='flex items-center justify-center'>
              <span>END LATER</span>
              <div className='inline-block w-20 h-20  mx-1 rounded-xl border-2 border-pink-500 p-4'>
                <span className='text-2xl font-bold'>{addLeadingZeros(days)}</span>
                <div className='font-light text-slate-500'>Days</div>
              </div>
              <div className='inline-block w-20 h-20  mx-1 rounded-xl border-2 border-pink-500 p-4'>
                <span className='text-2xl font-bold'>{addLeadingZeros(hours)}</span>
                <div className='font-light text-slate-500'>Hours</div>
              </div>
              <div className='inline-block w-20 h-20  mx-1 rounded-xl border-2 border-pink-500 p-4'>
                <span className='text-2xl font-bold'>{addLeadingZeros(minutes)}</span>
                <div className='font-light text-slate-500'>Minutes</div>
              </div>
              <div className='inline-block w-20 h-20  mx-1 rounded-xl border-2 border-pink-500 p-4'>
                <span className='text-2xl font-bold'>{addLeadingZeros(seconds)}</span>
                <div className='font-light text-slate-500'>Seconds</div>
              </div>
            </div>
          </div>

        </Col>
        <Col xxl={12} xl={12} lg={12} md={24} sm={24} xs={24}>
          <VerticalCardProduct category={"facialoil"} />
        </Col>
      </Row>
    </div>
  );
};

export default Countdown;
