import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, } from 'recharts';
const DoubleLineChart = () => {
  const data = [
    {
      name: 'Feb',
      Websites: 350,
      Apps: 30,
    },
    {
      name: 'Mar',
      Websites: 40,
      Apps: 90,
    },
    {
      name: 'Apr',
      Websites: 300,
      Apps: 40,
    },
    {
      name: 'May',
      Websites: 230,
      Apps: 140,
    },
    {
      name: 'Jun',
      Websites: 360,
      Apps: 145,
    },
    {
      name: 'Jul',
      Websites: 120,
      Apps: 342,
    },
    {
      name: 'Aug',
      Websites: 500,
      Apps: 425,
    },
    {
      name: 'Sep',
      Websites: 341,
      Apps: 124,
    },
    {
      name: 'Oct',
      Websites: 80,
      Apps: 132,
    },
  ];
  return (
    <div className='bg-white rounded-xl p-1'>
      <div className='flex flex-col ml-10 mr-2'>
        <p className='font-semibold text-lg ml-2'>Active Users</p>
        <div className='flex items-center'>
          <p className='text-slate-500 text-md ml-2'>than last week</p>
          <p className='pl-2 text-green-500 text-sm font-medium'>+30%</p>
        </div>
      </div>
      <div style={{ width: '100%', height: 475 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart width={500} height={300} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="Apps" stroke="#FB6A9A" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="Websites" stroke="#4096FF" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default DoubleLineChart
