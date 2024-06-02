import React, { useEffect, useState } from 'react'
import axios from "axios"
import SummaryApi from '../../common'
// import { getCookie } from '../../helpers/cookie'
const MyOrder = () => {
  // const url = "http://localhost:8080"
  // const token = getCookie("token")
  // console.log("token+", token);
  const [data, setData] = useState([]);
  const fetchOrders = async () => {

    // const response = await axios.post(url + "/api/userorders", {}, { headers: {token }});
    const response = await fetch(SummaryApi.userOrder.url, {
      method: SummaryApi.userOrder.method,
      credentials: 'include',
      headers: {
        "content-type": 'application/json'
      },
    })
    // console.log(response)
    const responseData = await response.json()
    console.log(responseData);
    if (responseData.success) {
      setData(responseData.data)
    }
    // setData(response.data.data);
  }

  useEffect(() => {
    fetchOrders();
  }, [])
  return (
    <div>
      <div className='my-orders'>
        <h2>MyOrders</h2>
        <div className='container'>
          {data.map((order, index) => {
            return (
              <div key={index} className='my-orders-orders'>
                {/* <img src={assets.parcel_icon} alt='' /> */}
                <p>{order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return item.name + " x " + item.quantity
                  }
                  else {
                    return item.name + " x " + item.quantity + ", "
                  }
                })}</p>
                <p>${order.amount}.00</p>
                <p>Items:{order.items.length}</p>
                <p><span>&#x25cf;</span><b>{order.status}</b></p>
                <button >Track order</button>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default MyOrder
