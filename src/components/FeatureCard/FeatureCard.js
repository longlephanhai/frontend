// src/components/FeatureArea.js
import React from 'react';
import './FeatureCard.scss';
import { MdLocalShipping } from "react-icons/md";
import { FaMoneyBillWave } from "react-icons/fa";
import { LiaUserAstronautSolid } from "react-icons/lia";
import { MdOutlinePayment } from "react-icons/md";

const features = [
  { icon: <MdLocalShipping />, title: 'Free Shipping', description: 'On all orders over $75.00' },
  { icon: <FaMoneyBillWave />, title: 'Free Returns', description: 'Returns are free within 9 days' },
  { icon: <LiaUserAstronautSolid />, title: 'Support 24/7', description: 'Contact us 24 hours a day' },
  { icon: <MdOutlinePayment />, title: '100% Payment Secure', description: 'Your payment is safe with us.' },
];

const FeatureArea = () => {
  return (
    <div className="feature-area feature-about-area  m-0 bg-[#F96698]">
      <div className="container-fluid mx-auto max-w-[1200px] ">
        <div className="flex flex-wrap">
          {features.map((feature, index) => (
            <div key={index} className="w-full md:w-1/2 xl:w-1/4">
              <div className="feature-icon-box">
                <div className="inner-content flex items-center py-[46px] border-b border-transparent hover:border-white transition-all">
                  <div className="icon-box border-2 border-white rounded-full text-white text-[40px] w-[68px] h-[68px] flex items-center justify-center relative transition-all">
                    {feature.icon}
                    <span className="absolute inset-0 border-2 border-dashed border-white rounded-full opacity-0 scale-0 transition-all transform hover:scale-100"></span>
                  </div>
                  <div className="content mt-1">
                    <h5 className="title text-white text-[16px] uppercase mb-1">{feature.title}</h5>
                    <p className="text-white text-[14px]">{feature.description}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeatureArea;
