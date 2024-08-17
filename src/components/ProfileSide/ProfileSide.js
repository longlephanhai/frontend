import React from 'react'
import LogoSearch from '../LogoSearch/LogoSearch'
import ProfileCard from '../ProfileCard/ProfileCard'
import FollowersCard from '../FollowersCard/FollowersCard'

const ProfileSide = () => {
  return (
    <div className='flex flex-col gap-4 items-center overflow-auto'>
      <LogoSearch/>
      <ProfileCard/>
      <FollowersCard/>
    </div>
  )
}

export default ProfileSide
