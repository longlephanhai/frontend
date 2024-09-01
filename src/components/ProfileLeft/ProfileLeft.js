import React from 'react'
import LogoSearch from '../LogoSearch/LogoSearch'
import FollowersCard from '../FollowersCard/FollowersCard'
import InfoCard from '../InfoCard/InfoCard'

const ProfileLeft = () => {
  return (
    <div className='flex flex-col gap-4 items-center overflow-auto'>
      <LogoSearch />
      <InfoCard />
      <FollowersCard />
    </div>
  )
}

export default ProfileLeft
