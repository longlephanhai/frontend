/* eslint-disable jsx-a11y/heading-has-content */
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import displayUSDCurrency from '../../helpers/displayCurrency/displayCurrency'
import Context from '../../context'
import addToCart from '../../helpers/addToCart/addToCart'

const VerticalCard = ({ loading, data = [] }) => {
  const { fetchUserAddToCart } = useContext(Context)
  const handleAddToCart = async (e, id) => {
    await addToCart(e, id)
    fetchUserAddToCart()
  }
  return (
    <div className='mx-6 grid grid-cols-[repeat(auto-fit,minmax(260px,300px))] justify-center md:justify-between md:gap-4 overflow-x-scroll scrollbar-none transition-all'>
      {
        data.map((item, index) => {
          return (
            <Link to={'/product/' + item?._id} key={index} className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px]  bg-white rounded-sm shadow my-3' onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
              <div className='bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center'>
                <img src={item.productImage[0]} alt='' className='object-scale-down h-full hover:scale-110 transition-all mix-blend-multiply' />
              </div>
              <div className='p-4 grid gap-3'>
                <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black'>{item?.productName}</h2>
                <p className='capitalize text-slate-500'>{item?.category}</p>
                <div className='flex gap-3'>
                  <p className='text-red-600 font-medium'>{displayUSDCurrency(item?.sellingPrice)}</p>
                  <p className='text-slate-500 line-through'>{displayUSDCurrency(item?.price)}</p>
                </div>
                <button className='text-sm bg-red-600 hover:bg-red-700 text-white px-2 py-0.5 rounded-full' onClick={(e) => handleAddToCart(e, item?._id)} >Thêm vào giỏ hàng</button>
              </div>
            </Link>
          )
        })
      }
    </div>
  )
}

export default VerticalCard
