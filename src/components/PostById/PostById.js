/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { CiImageOn } from "react-icons/ci";
import { BiSolidCaretRightCircle } from "react-icons/bi";
import { HiOutlineMapPin } from "react-icons/hi2";
import { FaRegCalendarAlt } from "react-icons/fa";
import { FaX } from "react-icons/fa6";
import SummaryApi from '../../common';
import { toast } from 'react-toastify';
import imageTobass64 from '../../helpers/imageTobass64.js/imageTobass64';
import Post from '../Posts/Posts';
const PostById = () => {
  const user = useSelector(state => state?.user?.user)
  const imageRef = useRef();
  const [data, setData] = useState({
    name: user?.name,
    userId: user?._id,
    img: null,
    video: "",
    desc: ""
  })
  const onImageChange = async (e) => {
    if (e.target.files[0] && e.target.files) {
      let image = await imageTobass64(e.target.files[0])
      setData((prev) => {
        return {
          ...prev,
          img: image
        }
      });
    }
  }
  const handleOnchange = (e) => {
    const { value } = e.target
    setData((preve) => {
      return {
        ...preve,
        desc: value
      }
    })
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const reponse = await fetch(SummaryApi.post.url, {
      method: SummaryApi.post.method,
      credentials: "include",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(data)
    });
    const responseData = await reponse.json();
    if (responseData.success) {
      toast.success(responseData.message)
      setData((prev) => {
        return {
          ...prev,
          img: null,
          desc: ""
        }
      })
    } else {
      toast.error("Posted Error")
    }
  }
  const [dataPost, setDataPost] = useState([])
  const fetchData = async () => {
    const response = await fetch(SummaryApi.getPostById.url, {
      method: SummaryApi.getPostById.method,
      credentials: 'include',
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(user)
    })
    const responseData = await response.json()
    console.log("json",responseData.data);
    setDataPost(responseData.data)
    
    // setDataPost(responseData.data)
  }
  useEffect(() => {
    fetchData()
  }, [])
  console.log('datarespon', dataPost);
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className='flex gap-4 bg-white p-4 rounded-[1rem]'>
          <img className='rounded-full w-[3rem] h-[3rem] object-cover' src={user?.profilePic} alt='' />
          <div className='flex flex-col w-[90%] gap-4'>
            <input
              className='rounded-[10px] p-[10px] text-[17px] border-none outline-none bg-slate-200'
              type='text'
              placeholder="What's happening"
              name='happen'
              onChange={handleOnchange}
              value={data?.desc}
            />
            <div className='flex justify-around'>
              <div className='p-[5px] px-[10px] rounded-[10px] flex items-center justify-center text-[12px] cursor-pointer text-green-600'
                onClick={() => imageRef.current.click()} onChange={handleOnchange}
              >
                <CiImageOn className='w-6 h-auto' />
                Photo
              </div>
              <div className='p-[5px] px-[10px] rounded-[10px] flex items-center justify-center text-[12px] cursor-pointer text-blue-600'>
                <BiSolidCaretRightCircle className='w-6 h-auto' />
                Video
              </div>
              <div className='p-[5px] px-[10px] rounded-[10px] flex items-center justify-center text-[12px] cursor-pointer
          text-red-600'>
                <HiOutlineMapPin className='w-6 h-auto' />
                Location
              </div>
              <div className='p-[5px] px-[10px] rounded-[10px] flex items-center justify-center text-[12px] cursor-pointer
          text-yellow-600'>
                <FaRegCalendarAlt className='w-6 h-auto' />
                Shedule
              </div>
              <button className='flex items-center border justify-center text-white rounded-lg bg-pink-600 transition-[all_100ms_ease-out] h-8 px-[20px] hover:text-pink-500 hover:bg-transparent hover:border-pink-600'
                onClick={handleSubmit}
              >
                Share
              </button>
              <div style={{ display: 'none' }}>
                <input type='file' name='myImage' ref={imageRef} onChange={onImageChange} accept='image/*' />
              </div>
            </div>
            {
              data.img && (
                <div className='relative'>
                  <FaX
                    className='absolute right-4 top-2 cursor-pointer z-20'
                    onClick={() => setData((prev) => {
                      return {
                        ...prev,
                        img: null
                      }
                    })} />
                  <img className='w-full max-h-[20rem] object-contain rounded-[0.5rem]' src={data?.img} alt='' />
                </div>
              )
            }
          </div>
        </div>
      </form>

      <div className='flex flex-col gap-4 mt-4'>
        {
          dataPost.map((post, index) => {
            return (
              <div key={index}>
                <Post data={post} id={index} />
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default PostById
