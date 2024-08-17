import React from 'react'
import ProfileSide from '../../components/ProfileSide/ProfileSide'
import PostSide from '../../components/PostSide/PostSide'
import RightSide from '../../components/RightSide/RightSide'

const Socical = () => {
  return (
    <div className='relative grid grid-cols-[18rem_auto_20rem] gap-4 m-1'>
      <ProfileSide/>
      <PostSide/>
      <RightSide/>
    </div>
  )
}

export default Socical
