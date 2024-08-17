import React from 'react'
import { RiHome6Fill } from "react-icons/ri";
import { IoSettings, IoNotifications } from "react-icons/io5";
import { FaCommentDots } from "react-icons/fa";
import TrendCard from '../TrendCard/TrendCard';
const RightSide = () => {
  return (
    <div className='flex flex-col gap-8'>
      <div className='flex mt-4 justify-between'>
        <RiHome6Fill className='text-xl' />
        <IoSettings className='text-xl' />
        <IoNotifications className='text-xl' />
        <FaCommentDots className='text-xl' />
      </div>
      <TrendCard />
      <button className='flex items-center justify-center self-center text-white rounded-lg bg-pink-600 transition-[all_100ms_ease-out] h-[3rem] w-[80%] px-[20px] hover:text-pink-500 hover:bg-transparent hover:border-pink-600 hover:border-[1px]'>
        Share
      </button>
    </div>
  )
}

export default RightSide
