/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react'
import SummaryApi from '../../common'
import { Empty } from 'antd';
import { useSelector } from 'react-redux';
import io from 'socket.io-client';
import { backendDomin } from '../../common';
import { useNavigate } from 'react-router-dom';
import uploadImage from '../../helpers/uploadImage/uploadImage';
import { FaX } from 'react-icons/fa6';
import { CiImageOn } from 'react-icons/ci';
import EmojiPickerComponent from '../../components/EmojiPicker/EmojiPicker';
import { MdEmojiEmotions } from 'react-icons/md';
import { FaCircleUser } from "react-icons/fa6";
const ListMessage = () => {
  const navigate = useNavigate()
  const socketRef = useRef(null);
  const user = useSelector(state => state?.user?.user)
  const [id, setId] = useState('')
  const [dataList, setDataList] = useState([])
  const [hasMessages, setHasMessages] = useState(true);

  const fetchApi = async () => {
    const response = await fetch(SummaryApi.listMessage.url, {
      method: SummaryApi.listMessage.method,
      credentials: 'include',
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify()
    })
    const responseData = await response.json()
    const uniqueUsers = [];
    const filteredData = responseData?.data.filter(item => {
      const isDuplicate = uniqueUsers.includes(item.userId);
      if (!isDuplicate) {
        uniqueUsers.push(item.userId);
        return true;
      }
      return false;
    })
    setDataList(filteredData)
  }
  useEffect(() => {
    fetchApi()
  }, [])
  // console.log("list", dataList);


  // xử lí ảnh
  const imageRef = useRef();
  const [img, setImg] = useState(null)
  const onImageChange = async (e) => {
    if (e.target.files[0] && e.target.files) {
      let image = await uploadImage(e.target.files[0])
      setImg(image.url);
    }
  }
  // end xử lí ảnh

  const [dataMessage, setDataMessage] = useState([])
  const [profile, setProfile] = useState({})
  const handleOnClick = async (id) => {
    const response = await fetch(SummaryApi.getMessageById.url, {
      method: SummaryApi.getMessageById.method,
      credentials: 'include',
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({ id: id })
    })
    const responseData = await response.json()
    setDataMessage(responseData.data)
    setProfile(responseData.profile)
    setId(id);
    setHasMessages(false)
  }
  const [message, setMessage] = useState('');
  useEffect(() => {
    socketRef.current = io(backendDomin);
    socketRef.current.on('server_return_message', (chat) => {
      if (chat.userId === id || chat.toUser === id) {
        setDataMessage((prevMessages) => [...prevMessages, chat]);
      }
    });
    return () => {
      socketRef.current.disconnect();
    };
  }, [id]);
  const handleSendMessage = () => {
    if (message.trim() || img) {
      socketRef.current.emit('client_send_message', message, img, user?._id, user?.name, user.profilePic, id);
      setMessage('');
      socketRef.current.emit("CLIENT_SEND_TYPYNG", "hidden", user?._id, user?.name, id);
      setImg(null)
    }
  };
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [dataMessage]);


  // emojpicker
  const [open, setOpen] = useState(false)
  const handleEmojiSelect = (emoji) => {
    setMessage((prevMessage) => prevMessage + emoji);
  };
  const pickerRef = useRef(null);
  const handleClickOutside = (event) => {
    if (pickerRef.current && !pickerRef.current.contains(event.target)) {
      setOpen(false);
    }
  };
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  // client send typing
  const handleOnKeyUP = () => {
    socketRef.current.emit("CLIENT_SEND_TYPYNG", "show", user?._id, user?.name, id);

  }
  //end client send typing

  // Server return typing
  const [show, setShow] = useState(false);
  var timeOut = useRef();
  useEffect(() => {
    socketRef.current.on("SERVER_RETURN_TYPING", (data) => {
      if (data.type === "show") {
        if (data.userId === id) {
          setShow(true);
          containerRef.current.scrollTop = containerRef.current.scrollHeight;
          clearTimeout(timeOut.current);
          timeOut.current = setTimeout(() => {
            setShow(false);
          }, 3000)
        }
      } else {
        setShow(false)
      }
    });
  }, [id])
  // End Server return typing
  return (
    <div className='flex flex-wrap -ml-5'>
      <div className='flex flex-col p-4 gap-4 border min-h-[100vh] bg-white overflow-y-auto'>
        <b>Liên hệ</b>
        {
          dataList.map((item, index) => (
            <div
              onClick={() => handleOnClick(item.userId)}
              key={index}
              className='flex items-center justify-start gap-4 w-full h-auto cursor-pointer transition-all hover:bg-inherit hover:text-red-600'>
              {
                item.profilePic ? <img className='w-[3rem] h-[3rem] rounded-full object-cover' src={item.profilePic} alt='' />
                  :
                  <FaCircleUser className='w-[3rem] h-[3rem] rounded-full object-cover' />
              }
              <p>{item.name}</p>
              <hr />
            </div>
          ))
        }
      </div>

      <div className='flex-1 w-full'>
        {hasMessages ? (
          <Empty description={false} />
        ) : (
          <div className="flex flex-col h-[85vh] max-w-3xl mx-auto border border-gray-200 rounded-lg shadow-lg overflow-hidden m-4 ">
            {
              profile && (
                <div className='flex gap-2 p-2 items-center justify-start bg-red-400'>
                  {
                    profile.profilePic ?
                      <img src={profile.profilePic} alt='' className='w-[3rem] h-[3rem] rounded-full object-cover cursor-pointer' onClick={() => navigate(`/your-profile/${profile._id}`)} />
                      :
                      <FaCircleUser className='w-[3rem] h-[3rem] rounded-full object-cover cursor-pointer' onClick={() => navigate(`/your-profile/${user._id}`)} />
                  }

                  <div>
                    <div className='text-white'>
                      {profile.name}
                    </div>
                  </div>
                </div>
              )

            }
            <div className="flex flex-col flex-1 max-h-[70vh] overflow-y-auto scrollbar-none p-4 bg-gray-50" ref={containerRef}>
              {dataMessage.map((msg, index) => (
                <div
                  key={index}
                  className={`mb-3 p-1 rounded-xl ${msg.userId === user._id ? ' text-white flex items-center justify-end' : ' text-black flex items-center justify-start'}`}
                >
                  <div className='flex flex-col'>
                    {
                      msg.content ? <p className={`p-1 py-1 px-2 ${msg.userId === user._id ? 'bg-red-500' : 'bg-slate-200'}  rounded-2xl`}>{msg.content}</p> : ''
                    }
                    {
                      msg.image ?
                        <img src={msg?.image} alt='' className="mt-2 rounded-lg shadow-md w-auto h-auto objectfill-cover" /> :
                        ""
                    }
                  </div>
                </div>
              ))}
              {
                show ? <div className='relative'>
                  <div className='relative h-[20px] w-[50px] inline-flex items-center justify-center bg-slate-100 rounded-[45px] mt-2px'>
                    <span className='dot'></span>
                    <span className='dot'></span>
                    <span className='dot'></span>
                  </div>
                </div> : ""
              }
            </div>
            {
              img && (
                <div className='relative sefl-start' >
                  <FaX className='cursor-pointer absolute right-4 top-2 z-20' onClick={() => setImg(null)} />
                  <img className='w-full max-h-[6rem] object-contain rounded-[0.5rem]' src={img} alt='' />
                </div>
              )
            }
            <div className="p-4 bg-gray-100 flex items-center border-t border-gray-300">
              <div className="relative flex items-center flex-1 w-full">
                {
                  open ? <div className="p-4 bg-gray-100 border-t bottom-14 right-4 border-gray-300 absolute z-22"
                    ref={pickerRef}>
                    <EmojiPickerComponent onEmojiSelect={handleEmojiSelect} />
                  </div> : ""
                }
                <input
                  type="text"
                  className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 pl-10"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyUp={handleOnKeyUP}
                  placeholder="Nhập tin nhắn của bạn..."
                />
                <MdEmojiEmotions
                  onClick={() => setOpen(true)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-500 text-xl cursor-pointer" />
              </div>
              <CiImageOn className="text-4xl text-red-500 cursor-pointer hover:text-red-600"
                onClick={() => imageRef.current.click()} />
              <button
                className="ml-3 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                onClick={handleSendMessage}
              >
                Gửi
              </button>
              <div style={{ display: 'none' }}>
                <input type='file' name='myImage' ref={imageRef} onChange={onImageChange} accept='image/*' />
              </div>
            </div>
          </div >
        )}
      </div>
    </div >
  )
}

export default ListMessage
