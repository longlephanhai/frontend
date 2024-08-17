import React from 'react'
import ProfileLeft from '../../components/ProfileLeft/ProfileLeft'
import ProfileCard from '../../components/ProfileCard/ProfileCard'
import RightSide from '../../components/RightSide/RightSide'
import PostById from '../../components/PostById/PostById'

const Profile = () => {
  return (
    <div className='m-2 relative grid grid-cols-[18rem_auto_22rem] gap-4'>
      <ProfileLeft />
      <div className='flex flex-col gap-4'>
        <ProfileCard/>
        <PostById />
      </div>
      
      <RightSide/>
    </div>
  )
}

export default Profile
