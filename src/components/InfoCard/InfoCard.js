import React from 'react'
import { FaPen } from "react-icons/fa";
import { useSelector } from 'react-redux';
const InfoCard = () => {
  const user = useSelector(state => state?.user?.user)
  return (
    <div className='md:flex flex-col gap-3 bg-white p-4 rounded-2xl w-[90%] hidden'>
      <div className='flex justify-between items-center'>
        <h4>Thông tin của bạn</h4>
        <FaPen className='text-sm cursor-pointer' />
      </div>

      <div className='info'>
        <span>
          <b>Tình trạng</b>
        </span>
        <span> Single funny</span>
      </div>

      <div className='info'>
        <span>
          <b>Sông tại</b>
        </span>
        <span> Viet Nam</span>
      </div>

      <div className='info'>
        <span>
          <b>Làm việc tại</b>
        </span>
        <span> BookStoreLT</span>
      </div>
      <div className='w-[7rem] h-[2rem] mt-[6rem] self-end text-sm font-thin text-red-400'>
        {user?.name}
      </div>
    </div>
  )
}

export default InfoCard
