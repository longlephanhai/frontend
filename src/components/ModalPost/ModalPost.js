/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { Modal } from 'antd';
import Post from '../Posts/Posts';
import SummaryApi from '../../common';
const ModalPost = ({ id, open, setOpen }) => {
  const [data, setData] = useState({});
  const fetchApi = async () => {
    const response = await fetch(SummaryApi.postModal.url, {
      method: SummaryApi.postModal.method,
      credentials: 'include',
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({ id: id })
    })
    const responseData = await response.json()
    setData(responseData.data)
  }
  useEffect(() => {
    fetchApi()
  }, [])
  const handleOk = () => {
    setOpen(false);
  };
  const handleCancel = () => {
    setOpen(false);
  };
  console.log("data",data);
  
  return (
    <>
      <Modal title="Post" open={open} onOk={handleOk} onCancel={handleCancel}>
        <Post data={data} />
      </Modal>
    </>
  )
}

export default ModalPost
