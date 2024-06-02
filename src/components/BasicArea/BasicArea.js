import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { FaLongArrowAltUp } from "react-icons/fa";
const BasicArea = () => {
  const data = [
    {
      name: 'Apr',
      uv: 50,
    },
    {
      name: 'May',
      uv: 40,
    },
    {
      name: 'Jun',
      uv: 300,
      pv: 9800,
      amt: 2290,
    },
    {
      name: 'July',
      uv: 220,
    },
    {
      name: 'Aug',
      uv: 500,
    },
    {
      name: 'Sep',
      uv: 250,
    },
    {
      name: 'Oct',
      uv: 400,
    },
    {
      name: 'Nov',
      uv: 230,
    },
    {
      name: 'Dec',
      uv: 500,
    },
  ];

  return (
    <div className='bg-white p-4 rounded-lg' style={{ width: '100%', height: 400 }}>
      <div>
        <p className='text-slate-400 text-2xl'>Sales OverView</p>
        <div className='flex  items-center gap-2 mb-4'>
          <div><FaLongArrowAltUp className='text-green-500 font-medium text-lg' /></div>
          <p className='font-semibold text-md'>4% more in 2023</p>
        </div>
      </div>
      <ResponsiveContainer>
        <AreaChart
          data={data}
          margin={{
            top: 0,
            right: 30,
            left: 0,
            bottom: 60,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey="uv" stroke="#DB2777" fill="#F2B4CF" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default BasicArea;
