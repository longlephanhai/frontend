import React, { useEffect, useState } from 'react'
import SummaryApi from '../../common';
import { FaCircleUser } from 'react-icons/fa6';

const FollowersCard = () => {
  const [data, setData] = useState([]);
  const fetchApi = async () => {
    const dataResponsive = await fetch(SummaryApi.limitUser.url, {
      method: SummaryApi.limitUser.method,
      credentials: "include"
    })
    const dataApi = await dataResponsive.json()
    // console.log("data",dataApi);
    setData(dataApi.data)
  }
  useEffect(() => {
    fetchApi();
  }, [])
  return (
    <div className='w-full rounded-[0.7rem] gap-4 md:flex flex-col text-[13px] hidden'>
      <h4 className='font-bold text-md'>Who is following you</h4>
      {
        data?.map((item, index) => {
          return (
            <>
              {item?.profilePic ? (
                <div key={index} className='flex justify-between items-center'>
                  <div className='flex gap-[10px]'>
                    <img src={item?.profilePic} alt='profile' className='w-[3.2rem] h-[3.2rem] rounded-full object-cover' />
                    <div className='flex flex-col items-center justify-center'>
                      <span className='font-bold'>{item.name}</span>
                      <span className='font-light tracking-tighter'>@{item.name}</span>
                    </div>
                  </div>
                  <button className='flex items-center justify-center text-white rounded-lg bg-red-600 transition-[all_100ms_ease-out] h-8 px-[20px] hover:text-red-500 hover:bg-transparent hover:border-red-600 hover:border-[1px]'>Follow</button>
                </div>
              ) : (
                <FaCircleUser />
              )}
            </>
          )
        })
      }
    </div>
  )
}

export default FollowersCard
