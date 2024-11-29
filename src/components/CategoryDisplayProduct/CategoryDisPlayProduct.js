/* eslint-disable jsx-a11y/heading-has-content */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react'
import fetchCategoryWiseProduct from '../../helpers/fetchCategoryWiseProduct/fetchCategoryWiseProduct.js'
import displayUSDCurrency from '../../helpers/displayCurrency/displayCurrency.js'
import addToCart from '../../helpers/addToCart/addToCart.js'
import { Link } from 'react-router-dom'
import Context from '../../context/index.js'

const CategoryDisplayProduct = ({ category, heading }) => {
  const [data, setData] = useState([])
  const { fetchUserAddToCart } = useContext(Context)

  const handleAddToCart = async (e, id) => {
    await addToCart(e, id)
    fetchUserAddToCart()
  }
  const fetchData = async () => {
    const categoryProduct = await fetchCategoryWiseProduct(category)
    setData(categoryProduct?.data)
  }
  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className='container mx-auto px-4 my-6 relative'>
      <h2 className='text-2xl font-semibold py-2'>{heading}</h2>
      <div className='grid grid-cols-[repeat(auto-fit,minmax(300px,320px))] justify-between md:gap-6 overflow-x-scroll scrollbar-none transition-all'>
        {
          data.map((item, index) => {
            return (
              <Link to={'/product/' + item?._id} key={index} className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px]  bg-white rounded-sm shadow' onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
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
    </div>
  )
}

export default CategoryDisplayProduct
