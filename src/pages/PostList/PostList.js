/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import SummaryApi from '../../common';
import { TiTick } from "react-icons/ti";
import { RxCross2 } from "react-icons/rx";
import { toast } from 'react-toastify';
import ModalPost from '../../components/ModalPost/ModalPost';
const PostList = () => {
  const [data, setData] = useState([]);

  const fetchApi = async () => {
    const response = await fetch(SummaryApi.postList.url, {
      method: SummaryApi.postList.method,
      credentials: 'include',
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify()
    })
    const responseData = await response.json()
    setData(responseData.data)
  }
  useEffect(() => {
    fetchApi()
  }, [])
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' };
    return new Intl.DateTimeFormat('vi-VN', options).format(new Date(dateString));
  };
  const [status, setStatus] = useState(null)
  const handleOnClick = async (id, accept) => {
    const response = await fetch(`${SummaryApi.changeAccept.url}/${id}`, {
      method: 'post',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ accept: !accept }),
    });
    const reponseData = await response.json();
    if (reponseData.success) {
      setStatus(reponseData.data.accept)
      setData(prevData => prevData.map(item =>
        item._id === id ? { ...item, accept: reponseData.data.accept } : item
      ));
      toast.success("Successfully")
    } else {
      toast.error("Error")
    }
  }
  useEffect(() => {
    fetchApi()
  }, [status])
  const [open, setOpen] = useState(false)
  const [id, setId] = useState("");
  const handleModal = async (id) => {
    setId(id)
    setOpen(prev => !prev)
  }

  return (
    <div className='flex flex-col m-4 gap-4'>
      {
        data.map((item, index) => (
          <div key={index} className='flex flex-col md:flex-row gap-4 border-[1px] border-red-400 p-4 items-center justify-between flex-wrap'>
            <div className='flex-shrink-0'>
              <img src={item?.img} alt='' className='w-[3rem] h-[3rem] object-cover' />
            </div>
            <div className='flex flex-col md:flex-row items-center justify-around flex-1 flex-wrap self-center'>
              <div className='flex flex-col items-center justify-center px-4'>
                <p className='font-medium'>Full Name</p>
                <p>{item?.name}</p>
              </div>
              <div className='px-4 flex flex-col items-center justify-center'>
                <p className='font-medium'>Description</p>
                {item?.desc}
              </div>
              <div className='px-4'>
                <p>{formatDate(item?.createdAt)}</p>
              </div>
            </div>
            <div className='cursor-pointer m-4 text-red-600' onClick={() => handleModal(item?._id)}>
              Check Posts
            </div>
            <div className='mt-4 md:mt-0' onClick={() => handleOnClick(item?._id, item?.accept)}>
              {
                item.accept ?
                  <RxCross2 className='bg-red-600 text-xl rounded-full text-white cursor-pointer' />
                  :
                  <TiTick className='bg-green-600 text-xl rounded-full cursor-pointer text-white' />
              }
            </div>
          </div>
        ))
      }
      {
        open && (
          <ModalPost id={id} open={open} setOpen={setOpen} />
        )
      }
    </div>
  )
}

export default PostList
