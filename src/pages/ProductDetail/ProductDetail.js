/* eslint-disable jsx-a11y/heading-has-content */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import SummaryApi from '../../common'
import { FaStar } from "react-icons/fa";
import { FaStarHalf } from "react-icons/fa";
import displayUSDCurrency from '../../helpers/displayCurrency/displayCurrency';
import CategoryDisplayProduct from '../../components/CategoryDisplayProduct/CategoryDisPlayProduct';
import addToCart from '../../helpers/addToCart/addToCart';
import Context from '../../context';
import ReviewProduct from '../../components/ReviewProduct/ReviewProduct';
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
const ProductDetail = () => {
  const navigate = useNavigate()
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    description: "",
    price: "",
    sellingPrice: ""
  })
  const params = useParams()
  const [loading, setLoading] = useState(true)
  const productImageListLoading = new Array(4).fill(null)
  const [activeImage, setActiveImage] = useState("")
  const { fetchUserAddToCart } = useContext(Context)
  const fetchProductDetails = async () => {
    setLoading(true)
    const reponse = await fetch(SummaryApi.productDetails.url, {
      method: SummaryApi.productDetails.method,
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        productId: params?.id
      })
    })
    setLoading(false)
    const dataReponse = await reponse.json()
    setData(dataReponse?.data)
    setActiveImage(dataReponse?.data.productImage[0])
  }
  useEffect(() => {
    fetchProductDetails()
  }, [params])
  const handleMouseEnterProduct = (imageURL) => {
    setActiveImage(imageURL)
  }

  const handleAddToCart = async (e, id) => {
    await addToCart(e, id)
    fetchUserAddToCart()
  }
  const handlePayment = async (e, id) => {
    await addToCart(e, id)
    fetchUserAddToCart()
    navigate("/cart")
  }
  const [showReviews, setShowReviews] = useState(false);

  const toggleReviews = () => {
    setShowReviews(!showReviews);
  };
  return (
    <div className='container mx-auto p-4'>
      <div className='min-h-[200px] flex flex-col lg:flex-row gap-4'>
        <div className='h-96 flex flex-col lg:flex-row-reverse gap-4'>
          <div className='h-[300px] w-[300px] lg:h-96 lg:w-96 bg-slate-200 relative p-2'>
            <img src={activeImage} className='h-full w-full object-scale-down mix-blend-multiply' alt='' />
          </div>
          <div className='h-full'>
            {
              loading ? (
                <div className='flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full'>
                  {
                    productImageListLoading.map((item, index) => {
                      return (
                        <div key={index} className='h-20 w-20 bg-slate-200 rounded animate-pulse'>
                        </div>
                      )
                    })
                  }
                </div>
              ) : (
                <div className='flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full'>
                  {
                    data?.productImage.map((item, index) => {
                      return (
                        <div key={index} className='h-20 w-20 bg-slate-200 rounded p-1'>
                          <img src={item} alt='' className='w-full h-full object-scale-down mix-blend-multiply cursor-pointer'
                            onMouseEnter={() => handleMouseEnterProduct(item)}
                            onClick={() => handleMouseEnterProduct(item)}
                          />
                        </div>
                      )
                    })
                  }
                </div>
              )
            }
          </div>
        </div>


        {

          <div className='flex flex-col gap-1'>
            <p className='bg-red-200 text-red-600 px-2 rounded-full inline-block w-fit'> {data?.brandName}</p>
            <h2 className='text-2xl lg:text-4xl font-medium'>{data?.productName}</h2>
            <p className='capitalize text-slate-400'>{data?.category}</p>
            <div className='text-red-600 flex items-center gap-1'>
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStarHalf />
            </div>

            <div className='flex items-center gap-2 text-2xl lg:text-3xl font-medium my-1'>
              <p className='text-red-600'>{displayUSDCurrency(data?.sellingPrice)}</p>
              <p className='line-through text-slate-400'>{displayUSDCurrency(data?.price)}</p>
            </div>

            <div className='flex items-center gap-3 my-2'>
              <button className='border-2 border-red-600 rounded px-3 py-1 min-w-[120px] text-red-600 font-medium hover:bg-red-600 hover:text-white' onClick={(e) => handlePayment(e, data._id)}>Mua</button>
              <button className='border-2 border-red-600 rounded px-3 py-1 min-w-[120px] font-medium text-white bg-red-600 hover:text-red-600 hover:bg-white' onClick={(e) => handleAddToCart(e, data._id)}>Thêm vào giỏ hàng</button>
            </div>

            <div>
              <p className='text-slate-600 font-medium my-1'>Miêu tả :</p>
              <p>{data?.description}</p>
            </div>
          </div>

        }
      </div>
      <div className="container mx-auto p-4">
        <div className="my-4">
          <button
            onClick={toggleReviews}
            className="flex items-center gap-1 bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition duration-300"
          >
            {showReviews ? <IoIosArrowDown /> : <IoIosArrowUp />}
            <span>{showReviews ? 'Ẩn đánh giá' : 'Hiển thị đánh giá'}</span>
          </button>
          {showReviews && (
            <div className="overflow-hidden transition-all duration-500 ease-in-out">
              <ReviewProduct productId={params} />
            </div>
          )}
        </div>
      </div>
      {
        data.category && (
          <CategoryDisplayProduct category={data?.category} heading={"Sản phẩm đề cử"} />
        )
      }

    </div >
  )
}

export default ProductDetail
