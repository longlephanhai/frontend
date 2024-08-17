import React from 'react'
// import Logo from '../../assest/assest/logomini.webp'
import { MdSearch } from "react-icons/md";
const LogoSearch = () => {
  return (
    <div className='flex gap-[0.75rem]'>
      {/* <img src={Logo} alt='' /> */}
      <div className='flex bg-slate-200 rounded-[10px] p-[5px]'>
        <input 
         className='bg-transparent border-none outline-none'
         type='text'
         placeholder='#Search' />
        <div className='flex items-center justify-center rounded-[5px]
         p-[5px] text-white hover:cursor-pointer bg-pink-400
        '>
          <MdSearch />
        </div>
      </div>
    </div>
  )
}

export default LogoSearch
