import React from 'react'
import LogoSearch from '../LogoSearch/LogoSearch'
import YourProfileInfor from '../YourProfileInfor/YourProfileInfor'
import FollowersCard from '../FollowersCard/FollowersCard'

const YourProfileLeft = ({data}) => {
  return (
    <div className='flex flex-col gap-4 items-center overflow-auto'>
      <LogoSearch />
      <YourProfileInfor data={data} />
      <FollowersCard />
    </div>
  )
}

export default YourProfileLeft
