/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react'
import ProfileSide from '../../components/ProfileSide/ProfileSide'
import PostSide from '../../components/PostSide/PostSide'
import RightSide from '../../components/RightSide/RightSide'
import { FaBell, FaCommentDots, FaUsers } from 'react-icons/fa6'
import { FaUserFriends } from 'react-icons/fa'
import { IoPersonAddSharp } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { io } from 'socket.io-client'
import { backendDomin } from '../../common'

const Socical = () => {
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
    <div className='relative md:grid md:grid-cols-[18rem_auto_20rem] grid-cols-1 gap-4 m-1 flex flex-col'>
      <ProfileSide />
      <div className='flex mt-4 mx-4 justify-between md:hidden'>
        <FaUsers className='text-xl md:text-2xl hover:text-pink-500 cursor-pointer' onClick={() => navigate('/not-friend')} />
        <FaUserFriends className='text-xl md:text-2xl hover:text-pink-500 cursor-pointer' onClick={() => navigate('/friend')} />
        <IoPersonAddSharp className='text-xl md:text-2xl hover:text-pink-500 cursor-pointer' onClick={() => navigate('/request')} />
        <div className='flex'>
          <FaBell className='text-xl md:text-2xl hover:text-pink-500 cursor-pointer' onClick={() => navigate('/accept')} />
          <span>{length}</span>
        </div>
        <FaCommentDots className='text-xl md:text-2xl hover:text-pink-500 cursor-pointer' />
      </div>
      <PostSide />
      <RightSide />

    </div>
  )
}

export default Socical
