import React from 'react'

const TrendCard = () => {
  const TrendData=[
    {
      name:"Long",
      shares:100,
    },
    {
      name:"Thương",
      shares:97,
    },
    {
      name:"Thạch",
      shares:84,
    },
    {
      name:"Quân",
      shares:102,
    }
  ]
  return (
    <div className='flex flex-col gap-4 bg-white p-4 rounded-2xl pl-8'>
      <h3>Trends for you</h3>
      {
        TrendData.map((item,index)=>{
          return(
            <div className='flex flex-col gap-2'>
              <span className='font-bold'>#{item.name}</span>
              <span className='text-[13px]'>{item.shares}k shares</span>
            </div>
          )
        })
      }
    </div>
  )
}

export default TrendCard
