import React from 'react'
import PostById from '../PostById/PostById'
import YourProfileCard from './YourProfileCard'
import YourProfilePost from './YourProfilePost'

const YourProfileCenter = ({ data }) => {
  return (
    <div>
      <div className='flex flex-col gap-4'>
        <YourProfileCard data={data} />
        {/* <PostById postData={data} /> */}
        <YourProfilePost userData={data}/>
      </div>
    </div>
  )
}

export default YourProfileCenter
