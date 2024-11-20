/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react';
import SummaryApi, { backendDomin } from '../../common';
import { FaCircleUser } from "react-icons/fa6";
import io from 'socket.io-client';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
const NotFriend = () => {
  const [data, setData] = useState([]);
  const [buttonStates, setButtonStates] = useState({});
  const user = useSelector(state => state?.user?.user);
  const navigate = useNavigate()
  const fetchApi = async () => {
    const response = await fetch(SummaryApi.notFriend.url, {
      method: SummaryApi.notFriend.method,
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

  const socketRef = useRef(null);

  const handleAddFriend = async (_id) => {
    socketRef.current = io(backendDomin);
    socketRef.current.emit("CLIENT_ADD_FRIEND", _id, user?._id);

    // Update the button state to show the cancel button and hide the add button
    setButtonStates(prev => ({ ...prev, [_id]: true }));
  };

  const handleCancel = (_id) => {
    socketRef.current = io(backendDomin);
    socketRef.current.emit("CLIENT_CANCEL_FRIEND", _id, user?._id);
    // Optionally handle the cancel action here   
    setButtonStates(prev => ({ ...prev, [_id]: false }));
  };

  //SERVER_RETURN_INFO_ACCEPT_FRIEND
  useEffect(() => {
    socketRef.current = io(backendDomin);
    socketRef.current.on("SERVER_RETURN_INFO_ACCEPT_FRIEND", (info) => {
      if (user._id === info.userId) {
        // setData((prevData) => [...prevData, info.infoUserA]);
        setData((prevData) => {
          return prevData.filter((item) => item._id !== info.infoUserA);
        });
      }
    });
    return () => {
      socketRef.current.disconnect();
    };
  }, []);
  return (
    <div className='p-4'>
      <p className='text-2xl font-semibold mb-4 text-center'>People You May Know</p>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4'>
        {data?.map((user, index) => (
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
            <div className='flex gap-2'>
              {!buttonStates[user?._id] ? (
                <button
                  className='bg-red-600 text-white px-3 py-1 rounded-full text-sm hover:bg-red-700 transition duration-200'
                  onClick={() => handleAddFriend(user?._id)}
                >
                  Add Friend
                </button>
              ) : (
                <button
                  className='bg-green-600 text-white px-3 py-1 rounded-full text-sm hover:bg-green-700 transition duration-200'
                  onClick={() => handleCancel(user?._id)}
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>

  );
};

export default NotFriend;
