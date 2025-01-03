import React, { useState } from 'react'
import CategoryList from '../../components/CategoryList/CategoryList'
import BannerProduct from '../../components/BannerProduct/BannerProduct'
import HorizontalCartProduct from '../../components/HorizontalCardProduct/HorizontalCartProduct'
import ChatBot from 'react-simple-chatbot'
import Brand from '../../components/Brand/Brand'
import Countdown from '../../components/CountDown/CountDown'
import BannerItems from '../../components/BannerItems/BannerItems'
// import FeatureArea from '../../components/FeatureCard/FeatureCard'
// import ProductArea from '../../components/ProductArea/ProductArea'
const Home = () => {
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + 7);
  const [showChatBot, setShowChatBot] = useState(false);
  const steps = [
    {
      id: '0',
      message: 'Welcome to our cosmetics store!',
      trigger: '1',
    },
    {
      id: '1',
      message: 'What kind of product are you looking for today?',
      trigger: '2',
    },
    {
      id: '2',
      options: [
        { value: 'skincare', label: 'Skincare', trigger: '3' },
        { value: 'makeup', label: 'Makeup', trigger: '4' },
        { value: 'perfume', label: 'Perfume', trigger: '5' },
        { value: 'advice', label: 'Need advice', trigger: '6' },
      ],
    },
    {
      id: '3',
      message: 'We have a variety of skincare products including cleansers, serums, and moisturizers. Are you interested in any specific product?',
      trigger: '7',
    },
    {
      id: '4',
      message: 'Makeup is a great choice! Are you looking for lipstick, foundation, or eyeshadow?',
      trigger: '7',
    },
    {
      id: '5',
      message: 'Perfume adds confidence to your day. Do you prefer sweet, elegant, or seductive scents?',
      trigger: '7',
    },
    {
      id: '6',
      message: 'What would you like to know about our products or what advice do you need? Please type your question.',
      trigger: 'input',
    },
    {
      id: 'input',
      user: true, // Allows user input
      trigger: '8',
    },
    {
      id: '7',
      options: [
        { value: 'yes', label: 'I need more advice', trigger: '6' },
        { value: 'no', label: 'I understand, continue', trigger: '9' },
      ],
    },
    {
      id: '8',
      message: 'Thank you for sharing your question. We will provide advice and recommend the best products for you.',
      trigger: '9',
    },
    {
      id: '9',
      message: 'Would you like to place an order for the suitable product now?',
      trigger: '10',
    },
    {
      id: '10',
      options: [
        { value: 'yes', label: 'Yes', trigger: '11' },
        { value: 'no', label: 'No', trigger: '12' },
      ],
    },
    {
      id: '11',
      message: 'Great! We will help you place the order right away. Please provide your contact information to proceed.',
      end: true,
    },
    {
      id: '12',
      message: 'No worries, feel free to explore more products or contact us for further advice. Thank you for visiting!',
      end: true,
    },
  ];




  return (
    <>
      <div className=''>
        <BannerProduct />
      </div>
      <Brand />
      <BannerItems />
      <Countdown targetDate={targetDate} />
      <div className='m-4 mt-6' id="category">
        <CategoryList />
      </div>
      <HorizontalCartProduct category={"lich-su"} heading={"Lịch sử"} time={3000}/>
      <HorizontalCartProduct category={"tieng-anh"} heading={"Tiếng anh"} time={5000} />
      <HorizontalCartProduct category={"toan-hoc"} heading={"Toán học"} time={3000}/>
      <HorizontalCartProduct category={"khoa-hoc"} heading={"Khoa học"} time={5000}/>
      <HorizontalCartProduct category={"truyen-tranh"} heading={"Truyện tranh"} time={3000}/>
      <HorizontalCartProduct category={"van-hoc"} heading={"Văn học"} time={5000}/>
      <HorizontalCartProduct category={"dia-ly"} heading={"Địa lý"} time={3000}/>
      <HorizontalCartProduct category={"vat-ly"} heading={"Vật lý"} time={5000}/>
      {/* <FeatureArea className='mt-7' /> */}
      {/* <ProductArea/> */}
       <button
        onClick={() => setShowChatBot(!showChatBot)}
        className="fixed bottom-4 right-4 w-14 h-14 bg-blue-500 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-blue-600 focus:outline-none"
        aria-label="Open ChatBot"
      >
        💬
      </button>

      {showChatBot && (
        <div className="fixed bottom-20 mb-36 mr-16 right-4 w-80 h-96 bg-white shadow-lg z-50">
          <ChatBot steps={steps} />
        </div>
      )} 
    </>
  )
}

export default Home
