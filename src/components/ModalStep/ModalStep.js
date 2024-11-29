import React, { useState } from 'react'
import { SmileOutlined, SolutionOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, Modal, Steps } from 'antd';
import axios from 'axios';

import { toast } from 'react-toastify';
import SummaryApi from '../../common';
const ModalStep = ({ isModalOpen, handleOk, handleCancel, email }) => {
  const [current, setCurrent] = useState(0)

  const items = [
    {
      title: 'Gửi lại mã',
      icon: <UserOutlined />,

    },
    {
      title: 'Xác thực',
      icon: <SolutionOutlined />,
    },
    {
      title: 'Thành công',
      icon: <SmileOutlined />,
    },
  ]
  const [form] = Form.useForm()
  const [isLoading, setIsLoading] = useState(false)
  const [_id, setId] = useState('')
  const handleRetryActive = async (values) => {
    const response = await axios.post(SummaryApi.retryActive.url, values)
    if (response.data.success) {
      setId(response.data.data._id)
      setCurrent(1)
    }
  }

  const handleSendCodeId = async (values) => {
    const response = await axios.post(SummaryApi.checkCodeId.url, values)
    if (response.data.success) {
      toast.success(response.data.message)
      setCurrent(2)
    } else {
      toast.error(response.data.message)
    }
  }
  return (
    <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
      <Steps current={current} items={items} />
      {
        current === 0 && (
          <Form
            form={form}
            onFinish={handleRetryActive}
          >
            <Form.Item
              name="email"
              label="Email"
              initialValue={email}
            >
              <Input disabled />
            </Form.Item>
            <Button disabled={isLoading} type='primary' htmlType='submit'>Gửi lại mã</Button>
          </Form>
        )
      }
      {
        current === 1 && (
          <Form
            form={form}
            onFinish={handleSendCodeId}
          >
            <Form.Item
              name="_id"
              initialValue={_id}
              style={{ display: 'none' }}
            >
              <Input />
            </Form.Item>

            <Form.Item
              style={{ marginTop: 20 }}
              name="code"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập mã xác thực!'
                }
              ]}
            >
              <Input placeholder='Vui lòng nhập mã xác thực được gửi về email' />
            </Form.Item>
            <Button disabled={isLoading} htmlType='submit' type='primary'>Xác thực</Button>
          </Form>
        )
      }
      {
        current === 2 && (
          <p>Xác thực thành công</p>
        )
      }
    </Modal>
  )
}

export default ModalStep
