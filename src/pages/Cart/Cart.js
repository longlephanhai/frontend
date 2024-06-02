import React, { useContext, useEffect, useState } from 'react'
import SummaryApi from '../../common'
import { Empty } from 'antd';
import Context from '../../context'
import displayUSDCurrency from '../../helpers/displayCurrency/displayCurrency'
import { MdDelete } from "react-icons/md";
import { useNavigate } from 'react-router-dom'
const Cart = () => {
  const navigate = useNavigate()

  const [data, setData] = useState([])
  const context = useContext(Context)
  const fetchData = async () => {
    const response = await fetch(SummaryApi.addCartProductView.url, {
      method: SummaryApi.addCartProductView.method,
      credentials: 'include',
      headers: {
        "content-type": 'application/json'
      },
    })
    const responseData = await response.json()
    if (responseData.success) {
      setData(responseData.data)
    }
  }
  useEffect(() => {
    fetchData()
  }, [])
  const increaseQty = async (id, qty) => {
    const response = await fetch(SummaryApi.updateCartProduct.url, {
      method: SummaryApi.updateCartProduct.method,
      credentials: 'include',
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(
        {
          _id: id,
          quantity: qty + 1
        }
      )
    })
    const responseData = await response.json()
    if (responseData.success) {
      fetchData()
    }
  }
  const decreaseQty = async (id, qty) => {
    if (qty >= 2) {
      const response = await fetch(SummaryApi.updateCartProduct.url, {
        method: SummaryApi.updateCartProduct.method,
        credentials: 'include',
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify(
          {
            _id: id,
            quantity: qty - 1
          }
        )
      })
      const responseData = await response.json()
      if (responseData.success) {
        fetchData()
      }
    }
  }
  const deleteCart = async (id) => {
    const response = await fetch(SummaryApi.deleteCart.url, {
      method: SummaryApi.deleteCart.method,
      credentials: 'include',
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(
        {
          _id: id,
        }
      )
    })
    const responseData = await response.json()
    if (responseData.success) {
      fetchData()
      context.fetchUserAddToCart()
    }
  }
  const totalQuantity = data.reduce((previousValue, currentValue) => previousValue + currentValue.quantity, 0)
  const totalPrice = data.reduce((preve, curr) => preve + (curr.quantity * curr.productId?.sellingPrice), 0)
  localStorage.setItem("total", totalPrice)
  return (
    <div className='container mx-auto'>
      <div className='text-center text-lg my-3'>
        {
          data.length === 0 && (
            <Empty />
          )
        }
      </div>

      <div className='flex flex-col lg:flex-row gap-10 lg:justify-between p-4'>

        {/* display product */}
        <div className='w-full max-w-3xl'>
          {

            data.map((item, index) => {
              return (
                <div key={index} className='w-full bg-white h-32 my-2 border border-slate-300 rounded grid grid-cols-[128px,1fr]'>
                  <div className='w-32 h-32 bg-slate-200'>
                    <img src={item?.productId?.productImage[0]} alt='' className='w-full h-full object-scale-down mix-blend-multiply' />
                  </div>
                  <div className='px-4 py-2 relative'>
                    {/* delete Product */}
                    <div onClick={() => deleteCart(item?._id)} className='absolute right-0 text-pink-600 rounded-full p-2 hover:bg-pink-600 hover:text-white cursor-pointer'>
                      <MdDelete />
                    </div>
                    <h2 className='text-lg lg:text-2xl text-ellipsis line-clamp-1'>{item?.productId?.productName}</h2>
                    <p className='capitalize text-slate-500'>{item?.productId?.category}</p>
                    <div className='flex items-center justify-between'>
                      <p className='text-pink-600 font-medium text-lg'>{displayUSDCurrency(item?.productId.sellingPrice)}</p>
                      <p className='text-slate-600 font-senibold text-lg'>{displayUSDCurrency(item?.productId.sellingPrice * item?.quantity)}</p>
                    </div>
                    <div className='flex items-center gap-3 mt-1'>
                      <button className='border border-pink-600 text-pink-600 hover:bg-pink-600 hover:text-white w-6 h-6 flex justify-center items-center rounded-full' onClick={() => decreaseQty(item?._id, item.quantity)}>-</button>
                      <span>{item?.quantity}</span>
                      <button className='border border-pink-600 text-pink-600 hover:bg-pink-600 hover:text-white w-6 h-6 flex justify-center items-center rounded-full' onClick={() => increaseQty(item?._id, item.quantity)}>+</button>
                    </div>
                  </div>
                </div>
              )
            })

          }
        </div>

        {/* total product */}
        {
          data.length !== 0 && (
            <div className='mt-5 lg:mt-0 w-full max-w-sm'>
              {

                <div className='h-36 bg-slate-200'>
                  <h2 className='text-white bg-pink-600 px-4 py-1'>Summary</h2>

                  <div className='flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600'>
                    <p>quantity</p>
                    <p>{totalQuantity}</p>
                  </div>

                  <div className='flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600'>
                    <p>Total Price</p>
                    <p>{displayUSDCurrency(totalPrice)}</p>
                  </div>
                  <button onClick={() => navigate('/payment')} className='bg-blue-600 p-4 text-white w-full'>Payment</button>
                </div>
              }
            </div>
          )
        }

      </div>

    </div>
  )
}

export default Cart
