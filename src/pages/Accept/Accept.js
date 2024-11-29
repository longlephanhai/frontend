/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react'
import SummaryApi, { backendDomin } from '../../common';
import io from 'socket.io-client';
import { useSelector } from 'react-redux';
import { FaCircleUser } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
const Accept = () => {
  const [data, setData] = useState([])
  const navigate = useNavigate()
  const user = useSelector(state => state?.user?.user);
  const fetchApi = async () => {
    const response = await fetch(SummaryApi.acceptList.url, {
      method: SummaryApi.acceptList.method,
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
  const [buttonStates1, setButtonStates1] = useState({});
  const [buttonStates2, setButtonStates2] = useState({});
  const socketRef = useRef(null);
  const handleOnRefuse = (_id) => {
    socketRef.current = io(backendDomin);
    socketRef.current.emit("CLIENT_REFUSE_FRIEND", _id, user?._id);
    setButtonStates1(prev => ({ ...prev, [_id]: true }));
  }

  const handleAcpt = (_id) => {
    socketRef.current = io(backendDomin);
    socketRef.current.emit("CLIENT_ACCEPT_FRIEND", _id, user?._id);
    setButtonStates2(prev => ({ ...prev, [_id]: true }));
  };

  //SERVER_RETURN_INFO_ACCEPT_FRIEND
  useEffect(() => {
    socketRef.current = io(backendDomin);
    socketRef.current.on("SERVER_RETURN_INFO_ACCEPT_FRIEND", (info) => {
      if (user._id === info.userId) {
        setData((prevData) => [...prevData, info.infoUserA]);
      }
    });
    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  //SERVER_RETURN_USER_ID_CANCEL_FRIEND
  useEffect(() => {
    socketRef.current = io(backendDomin);
    socketRef.current.on("SERVER_RETURN_USER_ID_CANCEL_FRIEND", (info) => {
      if (user._id === info.userId) {
        setData((prevData) => {
          return prevData.filter((item) => item._id !== info.userIdA);
        });
      }
    });
    return () => {
      socketRef.current.disconnect();
    };
  }, []);
  return (
    <div className='p-4'>
      <p className='text-2xl font-semibold mb-4 text-center'>Yêu cầu kết bạn</p>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4'>
        {
          data?.map((user, index) => (
            <div key={index} className='bg-white shadow-md rounded-lg p-3 flex flex-col items-center'>
              {user.profilePic ? (
                <img
                  src={user.profilePic}
                  alt={user.name}
                  className='w-20 h-20 rounded-full object-cover mb-3 cursor-pointer'
                  onClick={() => navigate(`/your-profile/${user._id}`)}
                />
              ) : (
                <FaCircleUser className='w-20 h-20 text-gray-400 mb-3 cursor-pointer' onClick={() => navigate(`/your-profile/${user._id}`)} />
              )}
              <div className='text-md font-medium mb-2'>{user.name}</div>
              <div className='flex gap-4'>
                {!buttonStates2[user?._id] ? (
                  <div className=' flex gap-2'>
                    <button className='bg-red-600 text-white px-3 py-1 rounded-full text-sm hover:bg-red-700 transition duration-200' onClick={() => handleAcpt(user?._id)}>Châp nhận</button>
                  </div>
                ) : (
                  <div>
                    <button className='bg-red-600 text-white px-3 py-1 rounded-full text-sm hover:bg-red-700 transition duration-200' disabled >Đã chấp nhận</button>
                  </div>
                )}
                {!buttonStates1[user?._id] ? (
                  <div className='gap-8'>
                    <button className='bg-gray-600 text-white px-3 py-1 rounded-full text-sm hover:bg-gray-700 transition duration-200' onClick={() => handleOnRefuse(user?._id)}>Xóa</button>
                  </div>
                ) : (
                  <div>
                    <button className='bg-gray-600 text-white px-3 py-1 rounded-full text-sm hover:bg-gray-700 transition duration-200' disabled >Đã xóa</button>
                  </div>
                )}
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Accept
