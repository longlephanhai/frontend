import React from 'react'
import PostShare from '../PostShare/PostShare'

const PostSide = () => {
  return (
    <div className='flex flex-col gap-4 h-[100vh] overflow-auto scrollbar-none'>
      <PostShare />
    </div>
  )
}

export default PostSide
