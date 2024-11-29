import React from 'react'
import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from 'recharts';
const PieChartArea = () => {
  const data = [
    { name: 'Khoa học', value: 320 },
    { name: 'Lịch sử', value: 370 },
    { name: 'Tiếng anh', value: 332 },
    { name: 'Toán học', value: 134 },
    { name: 'Truyện tranh', value: 124 },
    { name: 'Văn học', value: 110 },
    { name: 'Địa lý', value: 240 },
    { name: 'Vật lý', value: 232 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#DB2777', '#00FEFE', '#FF0000', '#FE9E9B'];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, name }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text> && name
    );
  };
  return (
    <div className='bg-white rounded-lg'>
      <p className='text-slate-400 text-2xl p-2  m-0'>Most Sold Items</p>
      <div style={{ width: '100%', height: 350 }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart width={400} height={400}>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div >
    </div>
  )
}

export default PieChartArea
