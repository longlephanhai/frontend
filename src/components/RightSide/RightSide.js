/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react'

import { FaCommentDots } from "react-icons/fa";
import TrendCard from '../TrendCard/TrendCard';
import { FaUsers } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { FaUserFriends } from "react-icons/fa";
import { IoPersonAddSharp } from "react-icons/io5";
import { FaBell } from "react-icons/fa";
import { useSelector } from 'react-redux';
import io from 'socket.io-client';
import { backendDomin } from '../../common';
const RightSide = () => {
  const navigate = useNavigate()
  const user = useSelector(state => state?.user?.user)


  // server return length accpet friend
  const socketRef = useRef(null);
  const [length, setLength] = useState(user?.acceptFriends.length)
  useEffect(() => {
    socketRef.current = io(backendDomin);
    socketRef.current.on("SERVER_RETURN_LENGTH_ACCEPT_FRIEND", (data) => {
      if (user._id === data.userId) {
        setLength(data.lengthAcceptFriends)
      }
    });
    return () => {
      socketRef.current.disconnect();
    };
  }, [length]);


  return (
    <div className='flex flex-col gap-8'>
      <div className='md:flex mt-4 mx-4 justify-between hidden'>
        <FaUsers className='text-xl md:text-2xl hover:text-red-500 cursor-pointer' onClick={() => navigate('/not-friend')} />
        <FaUserFriends className='text-xl md:text-2xl hover:text-red-500 cursor-pointer' onClick={() => navigate('/friend')} />
        <IoPersonAddSharp className='text-xl md:text-2xl hover:text-red-500 cursor-pointer' onClick={() => navigate('/request')} />
        <div className='flex'>
          <FaBell className='text-xl md:text-2xl hover:text-red-500 cursor-pointer' onClick={() => navigate('/accept')} />
          <span>{length}</span>
        </div>
        <FaCommentDots className='text-xl md:text-2xl hover:text-red-500 cursor-pointer' />
      </div>
      <TrendCard />
      <button className='md:flex items-center justify-center self-center text-white rounded-lg bg-red-600 transition-[all_100ms_ease-out] h-[3rem] w-[80%] md:w-[60%] lg:w-[40%] px-[20px] hover:text-red-500 hover:bg-transparent hover:border-red-600 hover:border-[1px] hidden'>
        Chia sẻ
      </button>
    </div>
  )
}

export default RightSide
