import React, { useEffect, useRef, useState } from 'react'
import SummaryApi, { backendDomin } from '../../common';
import io from 'socket.io-client';
import { useSelector } from 'react-redux';
import { FaCircleUser } from 'react-icons/fa6';
const Request = () => {
  const [data, setData] = useState([])
  const user = useSelector(state => state?.user?.user);
  const [buttonStates, setButtonStates] = useState({});
  const fetchApi = async () => {
    const response = await fetch(SummaryApi.requestList.url, {
      method: SummaryApi.requestList.method,
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
  // Chức năng hủy kết bạn
  const socketRef = useRef(null);
  const handleOnCancel = (_id) => {
    socketRef.current = io(backendDomin);
    socketRef.current.emit("CLIENT_CANCEL_FRIEND", _id, user?._id);
    setButtonStates(prev => ({ ...prev, [_id]: true }));
  }

  const handleAdd = (_id) => {
    socketRef.current = io(backendDomin);
    socketRef.current.emit("CLIENT_ADD_FRIEND", _id, user?._id);
    setButtonStates(prev => ({ ...prev, [_id]: false }));
  };
  // End chức năng hủy kết bạn
  return (
    <div className='p-4'>
      <p className='text-2xl font-semibold mb-4 text-center'>Invitation Sent</p>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4'>
        {
          data.map((user, index) => (
            <div key={index} className='bg-white shadow-md rounded-lg p-3 flex flex-col items-center'>
              {user.profilePic ? (
                <img
                  src={user.profilePic}
                  alt={user.name}
                  className='w-20 h-20 rounded-full object-cover mb-3 cursor-pointer'
                />
              ) : (
                <FaCircleUser className='w-20 h-20 text-gray-400 mb-3 cursor-pointer' />
              )}
              <div className='text-md font-medium mb-2'>{user.name}</div>
              <div className='flex gap-2'>
                {!buttonStates[user?._id] ? (
                  <button className='bg-green-600 text-white px-3 py-1 rounded-full text-sm hover:bg-green-700 transition duration-200' onClick={() => handleOnCancel(user?._id)}>Cancel</button>
                ) : (
                  <button className='bg-red-600 text-white px-3 py-1 rounded-full text-sm hover:bg-red-700 transition duration-200' onClick={() => handleAdd(user?._id)}>Add Friend</button>
                )}
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Request
