/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import SummaryApi from '../../common';
import { useNavigate, useParams } from 'react-router-dom';
import displayUSDCurrency from '../../helpers/displayCurrency/displayCurrency';
import { FaRegSmileWink } from "react-icons/fa";

const OrderDetail = () => {
  const params = useParams();
  console.log("params", params);
  const [data, setData] = useState([])
  const fetchApi = async () => {
    const response = await fetch(SummaryApi.getItemOrder.url, {
      method: SummaryApi.getItemOrder.method,
      credentials: 'include',
      headers: {
        "content-type": 'application/json'
      },
      body: JSON.stringify(
        params
      )
    })
    const responseData = await response.json()
    console.log("respon", responseData);
    if (responseData.success) {
      setData(responseData.data)
    }
  }
  useEffect(() => {
    fetchApi()
  }, [])
  console.log("data", data);
  const navigate = useNavigate()
  const handleClick = (id) => {
    navigate(`/product/${id}`)
  }
  return (
    <div className="mx-auto p-4 container-fluid">
      <div className="w-full max-w-6xl mx-auto">
        {data.map((item, index) => (
          <div key={index} className="w-full bg-white h-32 my-2 border border-slate-300 rounded grid grid-cols-[128px_1fr]">
            <div className="w-32 h-32 bg-slate-200">
              <img src={item.image} alt={item.productName} className="w-full h-full object-scale-down mix-blend-multiply" />
            </div>
            <div className="flex flex-col justify-between p-2 relative">
              <div className="flex-grow">
                <h2 className="text-lg lg:text-2xl text-ellipsis line-clamp-1">{item.productName}</h2>
                <div className="flex items-center justify-between">
                  <div className="text-red-600 font-medium text-lg">
                    {displayUSDCurrency(item.price)}
                  </div>
                  <div className="text-slate-600 font-semibold text-lg">Số lượng: {item.quantity}</div>
                </div>
              </div>
              <button className="mt-2 absolute bottom-2 right-1 w-32 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition duration-300"
                onClick={() => handleClick(item.productId)}
              >
                Mua lại
              </button>
            </div>
          </div>
        ))}
        <div className="mt-4 p-4 bg-green-100 border border-green-400 rounded text-green-700 text-center flex items-center justify-center">
          <FaRegSmileWink style={{ marginRight: '8px' }} className="text-5xl md:text-2xl" />
          Cảm ơn bạn đã đặt hàng! Chúng tôi hy vọng bạn hài lòng với sản phẩm của mình.
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
