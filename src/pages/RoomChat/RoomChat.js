/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react'
import SummaryApi, { backendDomin } from '../../common'
import { useParams } from 'react-router-dom'
import { MdEmojiEmotions } from "react-icons/md";
import { CiImageOn } from "react-icons/ci";
import { useSelector } from 'react-redux';
import uploadImage from '../../helpers/uploadImage/uploadImage';
import io from 'socket.io-client';
import { FaX } from 'react-icons/fa6';
import EmojiPickerComponent from '../../components/EmojiPicker/EmojiPicker';
import FriendList from '../../components/FriendList/FriendList';
import { FaArrowLeft } from "react-icons/fa";
const RoomChat = () => {

  // lấy data từ database
  const params = useParams();
  const [data, setData] = useState([]);
  const [idFriend, setIdFriend] = useState({});
  const [friend, setFriend] = useState({});
  const [img, setImg] = useState(null);
  const [message, setMessage] = useState('');
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);
  const socketRef = useRef(null);
  const containerRef = useRef(null);
  const imageRef = useRef();
  const timeOut = useRef();
  const pickerRef = useRef(null);
  const user = useSelector((state) => state?.user?.user);

  // Fetch chat data
  const fetchApi = async () => {
    try {
      const response = await fetch(`${SummaryApi.chatWithFriend.url}${params.id}`, {
        method: SummaryApi.chatWithFriend.method,
        credentials: "include",
      });
      const dataResponse = await response.json();
      if (dataResponse.success) {
        setData(dataResponse.data);
        setIdFriend(dataResponse.friend);
      }
    } catch (error) {
      console.error("Error fetching chat data:", error);
    }
  };

  // Fetch friend details
  const getFriend = async () => {
    if (!idFriend[0]?.userId) return; // Prevent calling the API without a valid userId
    try {
      const fetchApi = await fetch(SummaryApi.getOneFriend.url, {
        method: SummaryApi.getOneFriend.method,
        credentials: 'include',
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ userId: idFriend[0]?.userId }),
      });
      const responseData = await fetchApi.json();
      setFriend(responseData.user);
    } catch (error) {
      console.error("Error fetching friend data:", error);
    }
  };

  // Initialize data fetching
  useEffect(() => {
    fetchApi();
  }, [params]);

  // Fetch friend details whenever idFriend changes
  useEffect(() => {
    getFriend();
  }, [idFriend]);

  // Image processing
  const onImageChange = async (e) => {
    if (e.target.files[0] && e.target.files) {
      try {
        let image = await uploadImage(e.target.files[0]);
        setImg(image.url);
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  // Initialize socket connection and handle incoming messages
  useEffect(() => {
    socketRef.current = io(backendDomin);
    socketRef.current.on('SERVER_RETURN_MESSAGE_FRIEND', (chat) => {
      if (params.id === chat.room_chat_id) {
        setData((prevMessages) => [...prevMessages, chat]);
      }
    });
    socketRef.current.on("SERVER_RETURN_TYPING_FRIEND", (data) => {
      if (data.type === "show" && params.id === data.roomChatId) {
        setShow(true);
        containerRef.current.scrollTop = containerRef.current.scrollHeight;
        clearTimeout(timeOut.current);
        timeOut.current = setTimeout(() => setShow(false), 3000);
      } else {
        setShow(false);
      }
    });
    return () => {
      socketRef.current.disconnect();
    };
  }, [backendDomin, params.id]);

  // Automatically scroll to the bottom when new messages are added
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [data]);

  // Handle sending messages
  const handleSendMessage = () => {
    if (message.trim() || img) {
      socketRef.current.emit('CLIENT_SEND_MESSAGE_WITH_FRIEND', {
        content: message,
        images: img,
      }, user?._id, params.id);
      setMessage('');
      setImg(null);
      socketRef.current.emit("CLIENT_SEND_TYPYNG_FRIEND", "hidden", user?._id, params.id);
    }
  };

  // Handle emoji picker visibility
  const handleEmojiSelect = (emoji) => {
    setMessage((prevMessage) => prevMessage + emoji);
  };

  // Hide emoji picker when clicking outside
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

  // Emit typing status on key up
  const handleOnKeyUP = () => {
    socketRef.current.emit("CLIENT_SEND_TYPYNG_FRIEND", "show", user?._id, params.id);
  };
  const [openFriendList, setOpenFriendList] = useState(false);
  return (
    <div className='grid grid-cols-1 md:grid-cols-[18rem_auto]'>
      <div className={`md:block ${openFriendList ? 'block' : 'hidden'}`} onClick={() => setOpenFriendList(false)}>
        <FriendList />
      </div>
      <div className={` ${openFriendList ? 'hidden' : 'block'}`}>
        <div className="flex flex-col h-[90vh] w-full max-w-5xl mx-auto border border-gray-200 rounded-lg shadow-lg overflow-hidden mt-4">
          {friend && (
            <div className='flex gap-2 p-2 items-center justify-start bg-pink-400'>
              <FaArrowLeft
                className='md:hidden block text-2xl text-pink-700 cursor-pointer'
                onClick={() => setOpenFriendList(true)}  // Sửa lỗi hàm gọi
              />
              <img src={friend?.profilePic} alt='' className='w-[3rem] h-[3rem] rounded-full object-cover cursor-pointer' />
              <div>
                <div className='text-white'>{friend?.name}</div>
                <div>
                  {friend?.statusOnline === "online" ? (
                    <span className="text-base sm:text-sm text-green-600">{friend?.statusOnline}</span>
                  ) : (
                    <span className="text-base sm:text-sm text-red-600">{friend?.statusOnline}</span>
                  )}
                </div>
              </div>
            </div>
          )}
          <div
            className="flex flex-col flex-1 max-h-[75vh] w-full overflow-y-auto scrollbar-none p-4 py-8 bg-gray-50"
            ref={containerRef}
          >
            {data.map((msg, index) => (
              <div
                key={index}
                className={`mb-3 rounded-xl ${msg?.user_id === user?._id ? 'text-white flex items-center justify-end' : 'text-black flex items-center justify-start'
                  }`}
              >
                <div className='flex flex-col'>
                  {msg.content && (
                    <p
                      className={`p-1 py-1 px-2 ${msg.user_id === user?._id ? 'bg-pink-500' : 'bg-slate-200'
                        } rounded-2xl`}
                    >
                      {msg.content}
                    </p>
                  )}
                  {msg.images && (
                    <img
                      src={msg?.images}
                      alt=''
                      className="mt-2 rounded-lg shadow-md w-[6rem] h-auto object-cover"
                    />
                  )}
                </div>
              </div>
            ))}
            {show && (
              <div className='relative'>
                <div className='relative h-[20px] w-[50px] inline-flex items-center justify-center bg-slate-100 rounded-[45px] mt-2'>
                  <span className='dot'></span>
                  <span className='dot'></span>
                  <span className='dot'></span>
                </div>
              </div>
            )}
          </div>
          {img && (
            <div className='relative self-start'>
              <FaX
                className='cursor-pointer absolute right-4 top-2 z-20'
                onClick={() => setImg(null)}
              />
              <img
                className='w-full max-h-[6rem] object-contain rounded-[0.5rem]'
                src={img}
                alt=''
              />
            </div>
          )}
          <div className="p-4 gap-2 bg-gray-100 flex items-center border-t border-gray-300">
            <div className="relative flex items-center flex-1 w-full">
              {open && (
                <div
                  className="p-4 bg-gray-100 border-t bottom-14 right-4 border-gray-300 absolute z-22"
                  ref={pickerRef}
                >
                  <EmojiPickerComponent onEmojiSelect={handleEmojiSelect} />
                </div>
              )}
              <input
                type="text"
                className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 pl-10"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyUp={handleOnKeyUP}
                placeholder="Type your message..."
              />
              <MdEmojiEmotions
                onClick={() => setOpen(true)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-pink-500 text-xl cursor-pointer"
              />
            </div>
            <CiImageOn
              className="text-4xl text-pink-500 cursor-pointer hover:text-pink-600"
              onClick={() => imageRef.current.click()}
            />
            <button
              className="ml-3 px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500"
              onClick={handleSendMessage}
            >
              Send
            </button>
            <div style={{ display: 'none' }}>
              <input
                type='file'
                name='myImage'
                ref={imageRef}
                onChange={onImageChange}
                accept='image/*'
              />
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default RoomChat
