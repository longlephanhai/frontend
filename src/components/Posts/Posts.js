/* eslint-disable no-use-before-define */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react';
import { FaHeart } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { LiaCommentSolid } from "react-icons/lia";
import { PiShareFatLight } from "react-icons/pi";
import SummaryApi from '../../common';
import { useSelector } from 'react-redux';

const Post = ({ data: initialData, id }) => {

  const [data, setData] = useState(initialData);
  const user = useSelector(state => state?.user?.user);

  const handleOnClick = async (id, liked) => {
    try {
      const response = await fetch(SummaryApi.likePost.url, {
        method: SummaryApi.likePost.method,
        credentials: 'include',
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({
          userId: user?._id,
          idPost: id,
          liked: !liked
        })
      });

      const responseData = await response.json();

      if (responseData.success) {
        setData(responseData.data);
      } else {
        console.error("Error:", responseData.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  //comment post
  const [comment, setComment] = useState(false);
  const handleOpenComment = () => {
    setComment(!comment);
  }
  // get comment by id
  const [commentId, setCommentId] = useState([]);
  const fetchApi = async () => {
    console.log("post id", initialData?._id);

    const response = await fetch(SummaryApi.getComment.url, {
      method: SummaryApi.getComment.method,
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify()
    })
    const responseData = await response.json();
    setCommentId(responseData.data);

  }

  // End get comment by id

  // send comment
  const [dataComment, setDataComment] = useState("");
  const handleSubmit = async (e, id) => {
    e.preventDefault();
    try {
      const response = await fetch(SummaryApi.commentPost.url, {
        credentials: 'include',
        method: SummaryApi.commentPost.method,
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({
          postId: id,
          userId: user?._id,
          comment: dataComment
        })
      })
      const responseData = await response.json();
      if (responseData.success) {
        setDataComment("");
        // fetchApi();
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchApi();
  }, [dataComment])
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Intl.DateTimeFormat('vi-VN', options).format(new Date(dateString));
  };

  const containerRef = useRef(null);
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [commentId, dataComment]);
  return (
    <>
      <div className='flex flex-col p-6 bg-white rounded-lg shadow-lg'>
        <img className='w-full max-h-[25rem] object-contain rounded-md' src={initialData.img} alt='' />
        <div className='flex items-center justify-between mt-4'>
          <div className='flex items-center gap-4'>
            {data?.userLike?.includes(user?._id) ?
              <FaHeart onClick={() => handleOnClick(data._id, true)} className='text-red-500 text-3xl cursor-pointer hover:scale-110 transition-transform duration-200' /> :
              <CiHeart onClick={() => handleOnClick(data._id, false)} className='text-gray-500 text-3xl cursor-pointer hover:scale-110 transition-transform duration-200' />}
            <LiaCommentSolid
              onClick={handleOpenComment}
              className='text-gray-500 text-3xl cursor-pointer hover:text-gray-700 transition-colors duration-200' />
            <PiShareFatLight className='text-gray-500 text-3xl cursor-pointer hover:text-gray-700 transition-colors duration-200' />
          </div>
          <span className='text-gray-500 text-sm'>{data.like} likes</span>
        </div>
        <div className='mt-4'>
          <span className='font-semibold text-gray-800'>{data.name}</span>
          <p className='text-gray-600'>{data.desc}</p>
        </div>
        {
          comment && (
            <div className='p-4 bg-white rounded-lg shadow-md'>
              <div className='space-y-4 max-h-80 overflow-y-auto' ref={containerRef}>
                {
                  commentId.map((item, index) => (
                    <div key={index}>
                      {
                        item.postId === data._id && (
                          <div className='flex items-start gap-3 p-3 bg-stone-50 rounded-lg'>
                            <img className='w-10 h-10 rounded-full object-cover' src={item.userId.profilePic} alt='Profile' />
                            <div>
                              <div className='flex items-center justify-between gap-x-2'>
                                <p className='font-semibold text-gray-800'>{item.userId.name}</p>
                                <p className='text-xs text-gray-500'>{formatDate(item.createdAt)}</p>
                              </div>
                              <p className='text-gray-700 mt-1'>{item.comment}</p>
                            </div>
                          </div>
                        )
                      }
                    </div>
                  ))
                }
              </div>
              <div className='mt-4'>
                <form onSubmit={(e) => handleSubmit(e, data?._id)} className='flex items-center gap-2'>
                  <input
                    type='text'
                    name='comment'
                    value={dataComment}
                    onChange={e => setDataComment(e.target.value)}
                    placeholder='Add a comment...'
                    className='flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500'
                  />
                  <button
                    type='submit'
                    className='px-4 py-2 bg-pink-500 text-white font-semibold rounded-lg hover:bg-pink-600 transition duration-200'
                  >
                    Send
                  </button>
                </form>
              </div>
            </div>

          )
        }
      </div>
    </>

  )
}

export default Post;
