import { Tooltip } from 'antd';
import React from 'react'
import { BarChart, Bar, ResponsiveContainer, CartesianGrid, XAxis, YAxis, Legend, Rectangle } from 'recharts';
const ChartBar = () => {
  const data = [
    {
      name: 'Feb',
      Acitve: 123,
    },
    {
      name: 'Mar',
      Acitve: 134,
    },
    {
      name: 'Apr',
      Acitve: 141,
    },
    {
      name: 'May',
      Acitve: 89,
    },
    {
      name: 'Jun',
      Acitve: 241,
    },
    {
      name: 'Aug',
      Acitve: 87,
    },
    {
      name: 'Sep',
      Acitve: 142,
    },
    {
      name: 'Oct',
      Acitve: 98,
    },
  ];
  return (
    <div className='bg-white rounded-xl py-2'>
      <div style={{ width: '100%', height: 400 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 5,
              bottom: 5
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar label={{ position: 'top' }} dataKey="Acitve" fill="#FB6A9A" activeBar={<Rectangle fill="pink" stroke="pink" />} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className='flex flex-col ml-10 mr-2'>
        <p className='font-semibold text-xl ml-2'>Active Users</p>
        <div className='flex items-center'>
          <p className='text-slate-500 text-lg ml-2'>than last week</p>
          <p className='pl-2 text-green-500 text-sm font-medium'>+30%</p>
        </div>
        <div className='flex justify-between mt-1 px-3'>
          <p className='font-semibold text-lg'>More 1K <br /> <span className='text-slate-400 text-md'>Users</span></p>
          <p className='font-semibold text-lg'>1m  <br /> <span className='text-slate-400 text-md'>Clicks</span></p>
          <p className='font-semibold text-lg'>$500 <br /> <span className='text-slate-400 text-md'>Sales</span> </p>
          <p className='font-semibold text-lg'>Than 200 <br /> <span className='text-slate-400 text-md'>Items</span></p>
        </div>
      </div>
    </div >
  )
}

export default ChartBar
