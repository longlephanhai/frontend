/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react'
import SummaryApi, { backendDomin } from '../../common';
import io from 'socket.io-client';
import { useNavigate } from 'react-router-dom';
import { FaCircleUser } from 'react-icons/fa6';
const Friend = () => {
  const [data, setData] = useState([])
  const navigate = useNavigate();
  const socketRef = useRef(null);
  const fetchApi = async () => {
    const response = await fetch(SummaryApi.friendList.url, {
      method: SummaryApi.friendList.method,
      credentials: 'include',
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify()
    });
    const responseData = await response.json();
    setData(responseData.data);
  };

  useEffect(() => {
    fetchApi();
  }, []);


  //SERVER_RETURN_USER_ONLINE
  useEffect(() => {
    socketRef.current = io(backendDomin);
    socketRef.current.on('SERVER_RETURN_USER_ONLINE', (userId) => {
      setData(prevData =>
        prevData.map(item =>
          item._id === userId ? { ...item, statusOnline: 'online' } : item
        )
      );
    });
    return () => {
      socketRef.current.disconnect();
    };
  }, []);


  //SERVER_RETURN_USER_OFLINE
  useEffect(() => {
    socketRef.current = io(backendDomin);
    socketRef.current.on('SERVER_RETURN_USER_OFLINE', (userId) => {
      setData(prevData =>
        prevData.map(item =>
          item._id === userId ? { ...item, statusOnline: 'offline' } : item
        )
      );
    });
    return () => {
      socketRef.current.disconnect();
    };
  }, []);


  return (
    <div className='p-4'>
      <p className='text-2xl font-semibold mb-4 text-center'>Friends List</p>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4'>
        {
          data?.map((friend, index) => (
            <div key={index} className='bg-white shadow-md rounded-lg p-3 flex flex-col items-center relative'>
              {friend.profilePic ? (
                <img
                  src={friend.profilePic}
                  alt={friend.name}
                  className='w-20 h-20 rounded-full object-cover mb-3 cursor-pointer'
                  onClick={() => navigate(`/your-profile/${friend._id}`)}
                />
              ) : (
                <FaCircleUser className='w-20 h-20 text-gray-400 mb-3 cursor-pointer' onClick={() => navigate(`/your-profile/${friend._id}`)} />
              )}
              <div className='text-md font-medium mb-2'>{friend.name}</div>
              <button
                onClick={() => navigate(`/room-chat/${friend.roomChatId}`)}
                className='bg-red-600 text-white px-3 py-1 rounded-full text-sm hover:bg-red-700 transition duration-200'
              >Send</button>
              <div className='absolute top-4 right-4'>
                {friend.statusOnline === "online" ? (
                  <span className='inline-block w-3 h-3 bg-green-500 rounded-full' title='Online'></span>
                ) : (
                  <span className='inline-block w-3 h-3 opacity-0 rounded-full' title='Offline'></span>
                )}
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Friend
