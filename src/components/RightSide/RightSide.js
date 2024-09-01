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
  // socketRef.current = io(backendDomin);
  // socketRef.current.on("SERVER_RETURN_LENGTH_ACCEPT_FRIEND", (data) => {
  //   console.log("data", data);
  // });
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
    <div className='md:flex flex-col gap-8 hidden'>
      <div className='flex mt-4 justify-between'>
        <FaUsers className='text-xl hover:text-pink-500 cursor-pointer' onClick={() => navigate('/not-friend')} />
        <FaUserFriends className='text-xl hover:text-pink-500 cursor-pointer' onClick={() => navigate('/friend')} />
        <IoPersonAddSharp className='text-xl hover:text-pink-500 cursor-pointer' onClick={() => navigate('/request')} />
        <div className='flex'>
          <FaBell className='text-xl hover:text-pink-500 cursor-pointer' onClick={() => navigate('/accept')} />
          <span>{length}</span>
        </div>
        <FaCommentDots className='text-xl hover:text-pink-500 cursor-pointer' />
      </div>
      <TrendCard />
      <button className='flex items-center justify-center self-center text-white rounded-lg bg-pink-600 transition-[all_100ms_ease-out] h-[3rem] w-[80%] px-[20px] hover:text-pink-500 hover:bg-transparent hover:border-pink-600 hover:border-[1px]'>
        Share
      </button>
    </div>
  )
}

export default RightSide
