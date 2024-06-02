import React from 'react'
import { DatePicker, Flex } from 'antd';
const { RangePicker } = DatePicker;
const Date = () => {
  return (
    <div>
      <Flex vertical gap={12}>
        <Flex gap={8}>
          {/* <DatePicker placeholder="Outlined" /> */}
          <RangePicker placeholder={['Outlined', '']} />
        </Flex>
      </Flex>
    </div>
  )
}

export default Date
