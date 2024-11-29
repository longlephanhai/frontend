/* eslint-disable react-hooks/exhaustive-deps */
import { LockOutlined } from '@ant-design/icons';
import { Button, Card, Input, Form } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import SummaryApi from '../../common';


const ConfirmEmail = () => {
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const [isLoading, setIsLoadind] = useState(false)
  const params = useParams()
  const id = params.id
  useEffect(() => {
    form.setFieldsValue({
      _id: id
    })
  }, [])
  const onFinish = async (values) => {
    const response = await axios.post(SummaryApi.checkCodeId.url, values)
    if (response.data.success) {
      toast.success(response.data.message)
      setIsLoadind(false)
      navigate('/login')
    }
    
  }
  return (
    <Card title="Trang nhập mã xác thực">
      <Form
        name="basic"
        form={form}
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          name="_id"
          label="ID"
          style={{ display: 'none' }}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="code"
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập mã xác nhận!',
            },
          ]}
        >
          <Input prefix={<LockOutlined />} placeholder='Mã xác nhận' />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit" loading={isLoading} >
            Gửi
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default ConfirmEmail;
