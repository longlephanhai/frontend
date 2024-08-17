/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { FaHeart } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { LiaCommentSolid } from "react-icons/lia";
import { PiShareFatLight } from "react-icons/pi";
import SummaryApi from '../../common';
import { useSelector } from 'react-redux';
const Post = ({ data: initialData, id }) => {
  const [data, setData] = useState(initialData);
  const user = useSelector(state => state?.user?.user)

  const handleOnClick = async (id, liked) => {
    const response = await fetch(SummaryApi.likePost.url, {
      method: SummaryApi.likePost.method,
      credentials: 'include',
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        userId: user?._id,
        idPost: id,
        liked: !liked
      })
    })
    const responseData = await response.json();
    setData(responseData.data)
  }
  console.log("a", data);

  return (
    <div className='flex flex-col p-4 bg-white gap-4'>
      <img className='w-full max-h-[20rem] object-contain rounded-[0.5rem]' src={initialData.img} alt='' />
      <div className='flex items-start gap-4'>
        {data.liked ? <FaHeart onClick={() => handleOnClick(data._id, data.liked)} className='text-3xl cursor-pointer' /> : <CiHeart onClick={() => handleOnClick(data._id, data.liked)} className='text-3xl cursor-pointer' />}
        <LiaCommentSolid className='text-3xl cursor-pointer' />
        <PiShareFatLight className='text-3xl cursor-pointer' />
      </div>
      <span className='font-thin text-sm'>{data.like} likes</span>
      <div className='detail'>
        <span><b>{initialData.name}</b></span>
        <span> {data.initialData}</span>
      </div>
    </div>
  )
}

export default Post
