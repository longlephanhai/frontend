import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import SummaryApi from '../../common';

const FriendList = () => {
  const [data, setData] = useState([])
  const navigate = useNavigate();
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
  return (
    <div className="flex flex-col p-4 gap-4 border min-h-[100vh] bg-white overflow-y-auto">
      {data.map((user, index) => (
        <div
          key={index}
          className="flex items-center justify-start gap-4 w-full h-auto cursor-pointer transition-all hover:bg-inherit hover:text-red-600 mt-4"
          onClick={() => navigate(`/room-chat/${user.roomChatId}`)}
        >
          <img
            className="w-16 h-16 sm:w-14 sm:h-14 rounded-full object-cover border-2 border-red-200 shadow-sm"
            src={user?.profilePic}
            alt={user?.name}
          />
          <div className="flex flex-col sm:ml-4">
            <span className="">{user?.name}</span>
            {
              user?.statusOnline === "online" ?
                <span className="text-base sm:text-sm text-green-500">{user?.statusOnline}</span> : <span className="text-base sm:text-sm text-red-500">{user?.statusOnline}</span>
            }
          </div>
        </div>
      ))}
    </div>




  )
}

export default FriendList
