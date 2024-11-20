import React, { useEffect, useState } from 'react'
import SummaryApi from '../../common'
import { Link } from 'react-router-dom'
const CategoryList = () => {
  const [categoryProduct, setCategoryProduct] = useState([])
  const fetchCategoryProduct = async () => {
    const response = await fetch(SummaryApi.categoryProduct.url)
    const dataResponse = await response.json()
    setCategoryProduct(dataResponse.data)
  }
  useEffect(() => {
    fetchCategoryProduct()
  }, [])
  return (
    <div className='container mx-auto p-4'>
      <div className='flex flex-col justify-center items-center mb-3'>
        <div className='text-2xl font-bold '>Popular Categories</div>
        <div className='font-light'>Some of our popular categories include cosmetic</div>
      </div>
      <div className='flex items-center gap-4 justify-between overflow-scroll scrollbar-none hover:scrollbar-thin hover:scrollbar-thumb-rounded-full hover:scrollbar-thumb-gray-400'>
        {
          categoryProduct.map((item, index) => {
            return (
              <Link to={"/product-category?category=" + item?.category} key={index} className='cursor-pointer flex flex-col justify-center items-center'>
                <div className='w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden p-2 bg-white shadow-md flex items-center justify-center'>
                  <img src={item?.productImage[0]} alt={item?.category} className='h-full object-contain mix-blend-multiply transition-transform duration-300 transform hover:scale-110' />
                </div>
                <p className='text-center text-sm md:text-base capitalize mt-2 p-2 truncate'>{item?.category}</p>
                <div className='text-red-600 text-center text-sm md:text-base capitalize mt-4'>16 products</div>
              </Link>
            )
          })
        }
      </div>
    </div>
  )
}

export default CategoryList
