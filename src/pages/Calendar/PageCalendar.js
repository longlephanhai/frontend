import React, { useState } from 'react';
import { Badge, Calendar, Modal, Form, Input, Select, Button } from 'antd';


const PageCalendar = () => {
  const [events, setEvents] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleOk = () => {
    form
      .validateFields()
      .then(values => {
        form.resetFields();
        const newEvent = {
          date: values.date.date(),
          type: values.type,
          content: values.content,
        };
        setEvents([...events, newEvent]);
        setIsModalVisible(false);
      })
      .catch(info => {
        console.log('Validate Failed:', info);
      });
  };

  const removeEvent = (index) => {
    const updatedEvents = [...events];
    updatedEvents.splice(index, 1);
    setEvents(updatedEvents);
  };

  const getListData = (value) => {
    return events.filter(event => event.date === value.date());
  };

  const getMonthData = (value) => {
    if (value.month() === 8) {
      return 1394;
    }
  };

  const monthCellRender = (value) => {
    const num = getMonthData(value);
    return num ? (
      <div className="notes-month">
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null;
  };

  const dateCellRender = (value) => {
    const listData = getListData(value);
    return (
      <ul className="events">
        {listData.map((item, index) => (
          <li key={index}>
            <Badge status={item.type} text={item.content} />
            <Button type="text" danger onClick={() => removeEvent(index)}>Remove</Button>
          </li>
        ))}
      </ul>
    );
  };

  const cellRender = (current, info) => {
    if (info.type === 'date') return dateCellRender(current);
    if (info.type === 'month') return monthCellRender(current);
    return info.originNode;
  };

  return (
    <div className='p-4 px-5'>
      <div className='bg-pink-400 opacity-80 rounded-md p-3'>
        <p className='font-medium text-lg text-white'>Calendar</p>
        <div className='flex flex-wrap justify-between items-center'>
          <div className='flex gap-2 flex-wrap'>
            <p className='text-white'>Dashboard</p>
            <p className='text-white'>Calendar</p>
          </div>
          <button className='text-white bg-pink-600 p-2 rounded-lg hover:bg-pink-800 mt-2 md:mt-0' onClick={showModal}>Add Event</button>
        </div>
      </div>
      <Calendar cellRender={cellRender} className="p-3" />
      <Modal title="Add Event" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <Form form={form} layout="vertical">
          <Form.Item name="date" label="Date" rules={[{ required: true, message: 'Please select a date!' }]}>
            <Calendar fullscreen={false} />
          </Form.Item>
          <Form.Item name="type" label="Event Type" rules={[{ required: true, message: 'Please select an event type!' }]}>
            <Select>
              <Select.Option value="success">Success</Select.Option>
              <Select.Option value="warning">Warning</Select.Option>
              <Select.Option value="error">Error</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item name="content" label="Event Content" rules={[{ required: true, message: 'Please input the event content!' }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default PageCalendar;
