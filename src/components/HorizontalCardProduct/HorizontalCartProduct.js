/* eslint-disable jsx-a11y/heading-has-content */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react'
import fetchCategoryWiseProduct from '../../helpers/fetchCategoryWiseProduct/fetchCategoryWiseProduct.js'
import displayUSDCurrency from '../../helpers/displayCurrency/displayCurrency.js'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import addToCart from '../../helpers/addToCart/addToCart.js'
import Context from '../../context/index.js'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './Horizonta.scss'
import hoa from '../../assest/assest/hoq (1).webp'
import SummaryApi from '../../common/index.js'
import { toast } from 'react-toastify'
import { FaHeart } from "react-icons/fa";
import { Autoplay } from 'swiper/modules'

const HorizontalCartProduct = ({ category, heading,time }) => {

  const [data, setData] = useState([])
  // const scrollElement = useRef()
  const { fetchUserAddToCart, fetchUserFavorite } = useContext(Context)
  const [user, setUser] = useState("")
  const fetchUserDetails = async () => {
    const dataResponsive = await fetch(SummaryApi.current_user.url, {
      method: SummaryApi.current_user.method,
      credentials: "include"
    })
    const dataApi = await dataResponsive.json()
    // console.log("id usdwqe", dataApi.data._id);
    setUser(dataApi?.data?._id)
  }
  const handleAddToCart = async (e, id) => {
    await addToCart(e, id)
    fetchUserAddToCart()
  }
  useEffect(() => {
    fetchUserDetails();
  }, [])
  const fetchData = async () => {
    const categoryProduct = await fetchCategoryWiseProduct(category)
    setData(categoryProduct?.data)
  }
  useEffect(() => {
    fetchData()
    fetchUserFavorite()
  }, [])
  const handleLike = async (e, id) => {
    e?.stopPropagation()
    e?.preventDefault()
    const response = await fetch(SummaryApi.favoriteProduct.url, {
      method: SummaryApi.favoriteProduct.method,
      credentials: 'include',
      headers: {
        "content-type": 'application/json'
      },
      body: JSON.stringify(
        {
          productId: id,
          userId: user
        }
      )
    })
    const responseData = await response.json()
    if (responseData.success) {
      toast.success(responseData.message)
    }
    if (responseData.error) {
      toast.error(responseData.message)
    }
    fetchUserFavorite()
  }
  return (
    <div className='container mx-auto px-4 my-8' id='products'>
      <h2 className='text-3xl text-red-400 py-6 flex items-center justify-center'>{heading}
        <img src={hoa} alt='' width={50} height={"auto"} />
      </h2>
      <div className='relative'>
        <Swiper
          modules={[Autoplay]}
          spaceBetween={16}
          slidesPerView={'auto'}
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }}
          className='py-4'
          autoplay={{ delay:time, disableOnInteraction: false }}
        >
          <div className='swiper-button-prev absolute left-0 top-1/2 transform -translate-y-1/2 bg-white shadow-lg rounded-full p-3 text-2xl z-10 cursor-pointer hover:bg-gray-200 transition-all'>
            <FaAngleLeft />
          </div>
          <div className='swiper-button-next absolute right-0 top-1/2 transform -translate-y-1/2 bg-white shadow-lg rounded-full p-3 text-2xl z-10 cursor-pointer hover:bg-gray-200 transition-all'>
            <FaAngleRight />
          </div>
          {data.map((item, index) => (
            <SwiperSlide key={index} className='w-full max-w-xs' onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
              <Link
                to={'/product/' + item?._id}

                className='block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 relative'
              >
                <div className='product-image-container bg-slate-200 h-36 p-4 flex items-center justify-center'>
                  <img
                    src={item.productImage[0]}
                    alt={item?.productName}
                    className='product-image object-scale-down h-full w-full transition-transform duration-300'
                  />
                </div>
                <div className='p-4 flex flex-col items-center justify-center text-center'>
                  <h2 className='font-medium text-lg text-ellipsis line-clamp-1 text-black'>
                    {item?.productName}
                  </h2>
                  <p className='capitalize text-slate-500'>{item?.category}</p>
                  <div className='flex gap-3 items-center justify-center'>
                    <p className='text-red-600 font-medium'>
                      {displayUSDCurrency(item?.sellingPrice)}
                    </p>
                    <p className='text-slate-500 line-through'>
                      {displayUSDCurrency(item?.price)}
                    </p>
                  </div>
                  <button
                    className='mt-2 text-sm bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded-full transition-colors'
                    onClick={(e) => handleAddToCart(e, item?._id)}
                  >
                    Thêm vào giỏ hàng
                  </button>
                  <button
                    className='mt-2 text-sm bg-transparent  text-white px-2 py-2 rounded-full transition-colors flex items-center justify-center absolute right-2 top-1'
                    onClick={(e) => handleLike(e, item?._id)}
                  >
                    <FaHeart className='text-white h-6 w-6 fill-current hover:text-red-600' />
                  </button>

                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}

export default HorizontalCartProduct