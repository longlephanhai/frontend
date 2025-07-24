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
      message: 'Chào mừng bạn đến với cửa hàng sách của chúng tôi!',
      trigger: '1',
    },
    {
      id: '1',
      message: 'Hôm nay bạn đang tìm kiếm loại sách nào?',
      trigger: '2',
    },
    {
      id: '2',
      options: [
        { value: 'vanhoc', label: 'Văn học', trigger: '3' },
        { value: 'khoahoc', label: 'Khoa học', trigger: '4' },
        { value: 'kynangsong', label: 'Kỹ năng sống', trigger: '5' },
        { value: 'tuvan', label: 'Cần tư vấn', trigger: '6' },
      ],
    },
    {
      id: '3',
      message: 'Chúng tôi có rất nhiều sách văn học từ các tác giả nổi tiếng. Bạn có quan tâm đến thể loại cụ thể nào không?',
      trigger: '7',
    },
    {
      id: '4',
      message: 'Sách khoa học là lựa chọn tuyệt vời! Bạn đang tìm sách về vật lý, sinh học, hay công nghệ?',
      trigger: '7',
    },
    {
      id: '5',
      message: 'Sách kỹ năng sống sẽ giúp bạn phát triển bản thân. Bạn muốn đọc về giao tiếp, quản lý thời gian, hay phát triển tư duy?',
      trigger: '7',
    },
    {
      id: '6',
      message: 'Bạn muốn biết thêm thông tin gì về sách? Hãy nhập câu hỏi của bạn.',
      trigger: 'input',
    },
    {
      id: 'input',
      user: true,
      trigger: '8',
    },
    {
      id: '7',
      options: [
        { value: 'yes', label: 'Tôi cần thêm tư vấn', trigger: '6' },
        { value: 'no', label: 'Tôi hiểu rồi, tiếp tục', trigger: '9' },
      ],
    },
    {
      id: '8',
      message: 'Cảm ơn bạn đã chia sẻ câu hỏi. Chúng tôi sẽ tư vấn và đề xuất những cuốn sách phù hợp nhất cho bạn.',
      trigger: '9',
    },
    {
      id: '9',
      message: 'Bạn có muốn đặt mua cuốn sách phù hợp ngay bây giờ không?',
      trigger: '10',
    },
    {
      id: '10',
      options: [
        { value: 'yes', label: 'Có', trigger: '11' },
        { value: 'no', label: 'Không', trigger: '12' },
      ],
    },
    {
      id: '11',
      message: 'Tuyệt vời! Chúng tôi sẽ giúp bạn đặt hàng ngay. Vui lòng cung cấp thông tin liên hệ để tiếp tục.',
      end: true,
    },
    {
      id: '12',
      message: 'Không sao, bạn có thể tham khảo thêm các đầu sách khác hoặc liên hệ chúng tôi để được hỗ trợ. Cảm ơn bạn đã ghé thăm!',
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
      <HorizontalCartProduct category={"lich-su"} heading={"Lịch sử"} time={3000} />
      <HorizontalCartProduct category={"tieng-anh"} heading={"Tiếng anh"} time={5000} />
      <HorizontalCartProduct category={"toan-hoc"} heading={"Toán học"} time={3000} />
      <HorizontalCartProduct category={"khoa-hoc"} heading={"Khoa học"} time={5000} />
      <HorizontalCartProduct category={"truyen-tranh"} heading={"Truyện tranh"} time={3000} />
      <HorizontalCartProduct category={"van-hoc"} heading={"Văn học"} time={5000} />
      <HorizontalCartProduct category={"dia-ly"} heading={"Địa lý"} time={3000} />
      <HorizontalCartProduct category={"vat-ly"} heading={"Vật lý"} time={5000} />
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
