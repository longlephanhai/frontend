/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import YourProfileLeft from '../../components/YourProfileLeft/YourProfileLeft'
import YourProfileCenter from '../../components/YourProfileCenter/YourProfileCenter'
import { useParams } from 'react-router-dom';
import SummaryApi from '../../common';
import RightSide from '../../components/RightSide/RightSide';

const YourProfile = () => {
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
    <div className='grid grid-cols-[18rem_auto_20rem] gap-4'>
      <YourProfileLeft data={data} />
      <YourProfileCenter data={data} />
      <RightSide />
    </div>
  )
}

export default YourProfile
