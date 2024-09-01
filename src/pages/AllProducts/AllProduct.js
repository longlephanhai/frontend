import React, { useEffect, useState } from 'react'
import UploadProduct from '../../components/UploadProduct/UploadProduct'
import SummaryApi from '../../common'
import AdminProductCard from '../../components/AdminProductCard/AdminProductCard'


const AllProducts = () => {
  const [openUploadProduct, setOpenUploadProduct] = useState(false)
  const [allProduct, setAllProduct] = useState([])
  const fetchAllProduct = async () => {
    const response = await fetch(SummaryApi.allProduct.url)
    const dataResponse = await response.json()
    setAllProduct(dataResponse?.data || [])
  }
  useEffect(() => {
    fetchAllProduct();
  }, [])

  return (
    <div>
      <div className='bg-white py-2 px-4 flex justify-between items-center'>
        <h2 className='font-bold text-lg'>All Product</h2>
        <button className='border-2 border-pink-600 text-pink-600 hover:bg-pink-600 hover:text-white transition-all py-1 px-3 rounded-full ' onClick={() => setOpenUploadProduct(true)}>Upload Product</button>
      </div>

      <div className='flex items-center gap-4 py-4 flex-wrap h-[calc(100vh-190px)'>
        {
          allProduct.map((product, index) => {
            return (
              <AdminProductCard className='flex' data={product} key={index + "allProduct"} fetchdata={fetchAllProduct} />
            )
          })
        }
      </div>
      {
        openUploadProduct && (
          <UploadProduct onClose={() => setOpenUploadProduct(false)} fetchData={fetchAllProduct} />
        )
      }
    </div>
  )
}

export default AllProducts