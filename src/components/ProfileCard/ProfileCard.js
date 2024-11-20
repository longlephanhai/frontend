import React, { useState } from 'react'
import img1 from '../../assest/assest/cover.webp'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { FaCircleUser } from "react-icons/fa6";
const ProfileCard = () => {
  const user = useSelector(state => state?.user?.user)
  const navigate = useNavigate()
  const [profilePage, setProfilePage] = useState(false)
  const handleOnClick = () => {
    navigate(`/profile/${user?._id}`)
    setProfilePage(true)
  }
  const link = useLocation();
  return (
    <div className='rounded-[1.5rem] flex flex-col relative gap-4 p-1 overflow-x-clip bg-white'>
      <div className='relative flex flex-col items-center justify-center'>
        <img className='w-full rounded-se-[1.5rem] rounded-ss-[1.5rem]'
          src={img1}
          alt='' />
        {
          user?.profilePic ? <
            img className='w-20 h-20 rounded-full absolute -bottom-[3rem] shadow-sm object-cover'
            src={user?.profilePic}
            alt='' />
            :
            <FaCircleUser className='w-20 h-20 rounded-full absolute -bottom-[3rem] shadow-sm object-cover' />
        }

      </div>
      <div className='flex flex-col items-center mt-[3rem] gap-[10px]'>
        <span className='font-bold'>{user?.name}</span>
        <span>Senioir UI/UX Designer</span>
      </div>

      <div className='flex flex-col items-center justify-center gap-3'>
        <hr className='w-[85%] border-[2px_solid] border-slate-400' />
        <div className='flex gap-4 w-[80%] justify-around items-center'>
          <div className='flex flex-col gap-[0.4rem] items-center justify-center'>
            <span className='font-bold'>6,890</span>
            <spann className='text-slate-400 text-[13px]'>Followings</spann>
          </div>
          <div className='h-[150%] border-l-[2px_solid] border-red-400'></div>
          <div className='flex flex-col gap-[0.4rem] items-center justify-center'>
            <span className='font-bold'>1</span>
            <span className='text-slate-400 text-[13px]'>Followers</span>
          </div>
          {profilePage && (
            <>
              <div className='vl'>

              </div>
              <div className='flex flex-col gap-[0.4rem] items-center justify-center'>
                <span className='font-bold'>3</span>
                <span className='text-slate-400 text-[13px]'>Posts</span>
              </div>
            </>
          )}
        </div>
        <hr className='w-[85%] border-[2px_solid] border-slate-400' />
      </div>
      {link.pathname !== '/social' ? '' : <span className='font-bold text-red-600 mb-4 cursor-pointer self-center' onClick={handleOnClick}>
        My Profile
      </span>}
    </div>
  )
}

export default ProfileCard
