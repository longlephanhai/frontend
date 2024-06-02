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
    <div className='container mx-auto p-4' id="category">
      <div className='flex items-center gap-4 justify-between overflow-scroll scrollbar-none hover:scrollbar-thin hover:scrollbar-thumb-rounded-full hover:scrollbar-thumb-gray-400'>
        {
          categoryProduct.map((item, index) => {
            return (
              <Link to={"/product-category?category=" + item?.category} key={index} className='cursor-pointer'>
                <div className='w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden p-2 bg-white shadow-md flex items-center justify-center transition-transform duration-300 transform hover:scale-110'>
                  <img src={item?.productImage[0]} alt={item?.category} className='h-full object-contain mix-blend-multiply' />
                </div>
                <p className='text-center text-sm md:text-base capitalize mt-2'>{item?.category}</p>
              </Link>
            )
          })
        }
      </div>
    </div>
  )
}

export default CategoryList
