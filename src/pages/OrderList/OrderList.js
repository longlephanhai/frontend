import React, { useEffect, useState } from 'react'
import SummaryApi from '../../common';
import box from '../../assest/assest/parcel_icon.png'
import './OrderList.css'
import displayVNDCurrency from '../../helpers/displayCurrency/displayCurrency';

const OrderList = () => {
  const [data, setData] = useState([]);

  const fetchApi = async () => {
    const response = await fetch(SummaryApi.allOrder.url, {
      method: SummaryApi.allOrder.method,
      credentials: 'include',
      headers: {
        "content-type": 'application/json'
      },
    });
    const responseData = await response.json();
    if (responseData.success) {
      setData(responseData.data);
    }
  };

  useEffect(() => {
    fetchApi();
  }, []);

  const statusHandler = async (e, orderId) => {
    const response = await fetch(SummaryApi.updateStatus.url, {
      method: SummaryApi.updateStatus.method,
      credentials: 'include',
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        orderId,
        status: e.target.value
      })
    });
    const responseData = await response.json();
    if (responseData.success) {
      await fetchApi();
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' };
    return new Intl.DateTimeFormat('vi-VN', options).format(new Date(dateString));
  };

  return (
    <div>
      <div className='order add'>
        <div className='order-list'>
          {data.map((order, index) => (
            <div key={index} className='order-item'>
              <img src={box} alt='' />
              <div>
                <p className='order-item-cosmetic'>
                  {order.items.map((item, index) => {
                    if (index === order.items.length - 1) {
                      return item.productName + " x " + item.quantity;
                    } else {
                      return item.productName + " x " + item.quantity + ",";
                    }
                  })}
                </p>
                <p className='order-item-name'>{order.address.firstName + " " + order.address.lastName}</p>
                <div className='order-item-address'>
                  <p>{order.address.street + ","}</p>
                  <p>{order.address.city + ", " + order.address.state + ", " + order.address.country + ", " + order.address.zipcode}</p>
                </div>
                <p className='order-item-phone'>{order.address.phone}</p>
              </div>
              <p>Items: {order.items.length}</p>
              <p>{displayVNDCurrency(order.amount)}</p>
              <p>{formatDate(order.createdAt)}</p>
              <select onChange={(e) => statusHandler(e, order._id)} value={order.status}>
                <option value={'Cosmetic Processing'}>Processing</option>
                <option value={'Delivery'}>Delivery</option>
                <option value={'Received'}>Received</option>
              </select>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default OrderList;
