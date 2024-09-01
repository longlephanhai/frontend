/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import ProfileLeft from '../../components/ProfileLeft/ProfileLeft'
import ProfileCard from '../../components/ProfileCard/ProfileCard'
import RightSide from '../../components/RightSide/RightSide'
import PostById from '../../components/PostById/PostById'
import { useParams } from 'react-router-dom'
import SummaryApi from '../../common'

const Profile = () => {
  const params = useParams();
  // console.log("param", params.id);
  const [data, setData] = useState({});
  const fetchApi = async () => {
    const response = await fetch(SummaryApi.getUserByParams.url + params.id)
    const dataResponse = await response.json()
    setData(dataResponse.data)
  }
  useEffect(() => {
    fetchApi()
  }, [params])
  return (
    <div className='m-2 relative md:grid grid-cols-[18rem_auto_22rem] gap-4 flex flex-col'>
      <ProfileLeft />
      <div className='flex flex-col gap-4'>
        <ProfileCard />
        <PostById />
      </div>
      <RightSide />
    </div>
  )
}

export default Profile
