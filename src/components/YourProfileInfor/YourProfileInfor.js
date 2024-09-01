/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { FaPen } from "react-icons/fa";

const YourProfileInfor = ({ data }) => {

  return (
    <div className='flex flex-col gap-3 bg-white p-4 rounded-2xl w-[90%]'>
      <div className='flex justify-between items-center'>
        <h4>Profile Info</h4>
        <FaPen className='text-sm cursor-pointer' />
      </div>
      <div className='info'>
        <span>
          <b>Status</b>
        </span>
        <span>Single funny</span>
      </div>
      <div className='info'>
        <span>
          <b>Lives in</b>
        </span>
        <span> Viet Nam</span>
      </div>
      <div className='info'>
        <span>
          <b>Works</b>
        </span>
        <span> LTQ</span>
      </div>
      <div className='w-[7rem] h-[2rem] mt-[6rem] self-end text-sm font-thin text-pink-400'>
        {data.name}
      </div>
    </div>
  )

}

export default YourProfileInfor
