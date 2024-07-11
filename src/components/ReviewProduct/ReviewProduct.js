/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { Rate } from 'antd';
import SummaryApi from '../../common';
import { useParams } from 'react-router-dom';
import { UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
const ReviewProduct = ({ productId }) => {
  const params = useParams()
  // console.log("pârasm",params);
  const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];
  const [reviews, setReviews] = useState([]);
  const [rate, setRate] = useState(5)
  const [comment, setComment] = useState('')
  const fetchApi = async () => {
    const response = await fetch(SummaryApi.getReview.url, {
      method: SummaryApi.getReview.method,
      credentials: 'include',
      headers: {
        "content-type": 'application/json'
      },
      body: JSON.stringify({
        productId: params?.id
      })
    })
    const responseData = await response.json()
    setReviews(responseData.data)
  }
  useEffect(() => {
    fetchApi()
  }, [params])
  const handleSubmmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(SummaryApi.postReview.url, {
        method: 'POST',
        credentials: 'include',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          productId: productId,
          rating: rate,
          comment: comment
        })
      });
      const responseData = await response.json();
      if (responseData.success) {
        console.log("submit thanh cong");
        setReviews([...reviews, responseData.data]);
        reload()
        setComment('');
      } else {
        alert("fail");
      }
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  }
  const reload = () => {
    fetchApi();
  }
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Intl.DateTimeFormat('vi-VN', options).format(new Date(dateString));
  };
  return (
    <div className="p-6 rounded-lg mt-6">
      <h2 className="text-3xl font-bold mb-6 text-gray-900">Product Review</h2>
      <form onSubmit={handleSubmmit} className="mb-8">
        <div className="flex flex-col md:flex-row  gap-4 mb-6">
          <div className="flex  items-center">
            <Rate tooltips={desc} onChange={setRate} value={rate} className="text-pink-400" />
          </div>
        </div>
        <textarea
          className="w-full p-3 border border-gray-300 rounded-lg mb-6 resize-none focus:outline-none focus:ring-2 focus:ring-pink-400"
          placeholder="Your comment"
          value={comment}
          required
          onChange={e => setComment(e.target.value)}
        />
        <button
          type="submit"
          className="w-full bg-pink-500 text-white py-3 rounded-lg hover:bg-pink-600 transition duration-300"
        >
          Send Review
        </button>
      </form>
      <div className="space-y-8">
        <p className='text-xl font-medium'>{reviews.length} reviews for this product</p>
        <hr />
        <div className='max-h-96 overflow-hidden overflow-y-auto'>
          {reviews.map((review, index) => (
            <div key={index} className="p-1 border-b rounded-lg">
              <div className="flex items-center space-x-4 mb-4">
                <Avatar size={{
                  xs: 24,
                  sm: 32,
                  md: 40,
                  lg: 64,
                  xl: 32,
                  xxl: 50,
                }} icon={<UserOutlined />} className='w-auto h-auto' />
                <div className="flex flex-col w-full">
                  <div className="flex items-center gap-x-2 flex-wrap w-full">
                    <Rate disabled defaultValue={review.rating} className="text-pink-400 w-full" />
                    <p className='font-light text-sm'>{formatDate(review.updatedAt)}</p>
                  </div>
                  <p className="text-gray-700 leading-relaxed"><i>{review.comment}</i></p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ReviewProduct
