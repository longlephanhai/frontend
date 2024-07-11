import React, { useEffect, useState } from 'react'
import SummaryApi from '../../common'
import './MyOrder.scss'
import box from '../../assest/assest/parcel_icon.png'
import { useNavigate } from 'react-router-dom';
const MyOrder = () => {
  const [data, setData] = useState([]);
  const fetchOrders = async () => {
    const response = await fetch(SummaryApi.userOrder.url, {
      method: SummaryApi.userOrder.method,
      credentials: 'include',
      headers: {
        "content-type": 'application/json'
      },
    })
    const responseData = await response.json()
    console.log(responseData);
    if (responseData.success) {
      setData(responseData.data)
    }
  }
  useEffect(() => {
    fetchOrders();
  }, [])
  const navigate = useNavigate()
  const handleClick = async (item, _id) => {
    navigate(`/orderdetail/${_id}`);
  }
  return (
    <div>
      <div className='my-orders'>
        <div className='container mx-auto'>
          {data.map((order, index) => {
            return (
              <div key={index} className='my-orders-orders'>
                <img src={box} alt='' />
                <p>{order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return item.productName + " x " + item.quantity
                  }
                  else {
                    return item.productName + " x " + item.quantity + ", "
                  }
                })}</p>
                <p>${order.amount}</p>
                <p>Items:{order.items.length}</p>
                <p><span>&#x25cf;</span><b>{order.status}</b></p>
                <button onClick={() => handleClick(order.items, order._id)} >
                  Track orders
                </button>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default MyOrder
