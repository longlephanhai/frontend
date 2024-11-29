/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import io from 'socket.io-client';
import SummaryApi from '../../common';
import { backendDomin } from '../../common';
import uploadImage from '../../helpers/uploadImage/uploadImage';
import { CiImageOn } from "react-icons/ci";
import { FaX } from 'react-icons/fa6';
import 'emoji-picker-element';
import EmojiPickerComponent from '../../components/EmojiPicker/EmojiPicker';
import { MdEmojiEmotions } from "react-icons/md";
import './Chat.scss'
import { Image } from 'antd';
const Chat = () => {
  const socketRef = useRef(null);
  const user = useSelector(state => state?.user?.user)
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
  // lấy danh sách admin
  const [admin, setAdmin] = useState({});
  const fetchAdmin = async () => {
    const response = await fetch(SummaryApi.getAdmin.url, {
      method: SummaryApi.getAdmin.method,
      credentials: 'include',
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify()
    })
    const responseData = await response.json()
    setAdmin(responseData.data)
  }
  // end lấy danh sách admin

  const [data, setData] = useState([]);
  // lấy tất cả tin nhắn
  const fetchApi = async () => {
    const response = await fetch(SummaryApi.getMessageById.url, {
      method: SummaryApi.getMessageById.method,
      credentials: 'include',
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({ id: user?._id })
    })
    const responseData = await response.json()
    setData(responseData.data)
  }
  useEffect(() => {
    fetchAdmin()
    fetchApi()
  }, [])
  // end lấy tất cả tin nhắn

  // nhắn tin và trả về tin nhắn
  const [message, setMessage] = useState('');
  useEffect(() => {
    socketRef.current = io(backendDomin);
    socketRef.current.on('server_return_message', (chat) => {
      if (chat.toUser === user?._id || chat.userId === user?._id) {
        setData((prevMessages) => [...prevMessages, chat]);
      }
    });
    return () => {
      socketRef.current.disconnect();
    };
  }, [backendDomin]);
  const handleSendMessage = () => {
    if (message.trim() || img) {
      socketRef.current.emit('client_send_message', message, img, user?._id, user?.name, user?.profilePic);
      setMessage('');
      setImg(null)
      socketRef.current.emit("CLIENT_SEND_TYPYNG", "hidden", user?._id, user?.name);
    }
  };
  const containerRef = useRef(null);
  // end nhắn tin và trả tin nhắn
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [data]);

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
    socketRef.current.emit("CLIENT_SEND_TYPYNG", "show", user?._id, user?.name);

  }
  //end client send typing
  // Server return typing
  const [show, setShow] = useState(false);
  var timeOut = useRef();
  useEffect(() => {
    socketRef.current.on("SERVER_RETURN_TYPING", (data) => {
      if (data.type === "show") {
        if (user?._id === data.touser) {
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
  }, [user?._id])
  // End Server return typing
 
  return (
    <div className="flex flex-col h-[85vh] max-w-3xl mx-auto border border-gray-200 rounded-lg shadow-lg overflow-hidden m-4 ">
      {
        admin && (
          <div className='flex gap-2 p-2 items-center justify-start bg-red-400'>
            <img src={admin.profilePic} alt='' className='w-[3rem] h-[3rem] rounded-full object-cover' />
            <div>
              <div className='text-white'>
                {admin.name}
              </div>
              <p className='text-sm font-light text-slate-100'>{admin.role}</p>
            </div>
          </div>
        )
      }

      <div className="flex flex-col flex-1 max-h-[70vh] overflow-y-auto scrollbar-none p-4 bg-gray-50" ref={containerRef}>
        {data.map((msg, index) => (
          <div
            key={index}
            className={`mb-3  rounded-xl ${msg.userId === user._id ? ' text-white flex items-center justify-end' : ' text-black flex items-center justify-start'}`}
          >
            <div className='flex flex-col'>
              {
                msg.content ? <p className={`p-1 py-1 px-2 ${msg.userId === user._id ? 'bg-red-500' : 'bg-slate-200'}  rounded-2xl`}>{msg.content}</p> : ''
              }
              {
                msg.image ?
                  // <img src={msg?.image} alt='' className="mt-2 rounded-lg shadow-md w-[6rem] h-[6rem] objectfill-cover" /> 
                  <Image src={msg?.image} width={200} alt='' className="mt-2 rounded-lg shadow-md w-[3rem] h-[3rem] objectfill-cover" />
                  :
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
      <div className="p-4 gap-2 bg-gray-100 flex items-center border-t border-gray-300">
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
  );
};

export default Chat;
