/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
// import Logo from '../../assest/assest/logomini.webp'
import { MdSearch } from "react-icons/md";
import { useLocation, useNavigate } from 'react-router-dom';
import SummaryApi from '../../common';
import { FaCircleUser } from "react-icons/fa6";
import { FaX } from "react-icons/fa6";
const LogoSearch = () => {
  const searchProduct = useLocation();
  const urlSearch = new URLSearchParams(searchProduct?.search);
  const searchQry = urlSearch.getAll("q");
  const [search, setSearch] = useState(searchQry);
  const navigate = useNavigate();
  const handleOnChange = (e) => {
    const { value } = e.target;
    setSearch(value)
    if (value) {
      navigate(`?q=${value}`)
    }
    else {
      navigate('')
    }
  }
  const params = useLocation()
  console.log("para", SummaryApi.findFriend.url + params.search);

  const [data, setData] = useState([])

  const fetchProduct = async () => {
    const response = await fetch(SummaryApi.findFriend.url + params.search)
    const dataResponse = await response.json()
    setData(dataResponse.data)
  }
  useEffect(() => {
    fetchProduct()
  }, [params])
  const handleOnClick = () => {
    setSearch("");
    setData([]);
  }
  console.log("data", data);

  return (
    <div className='flex flex-col relative'>
      <div className='flex bg-white rounded-[10px] p-[5px] relative'>
        <input
          className='bg-transparent border-none outline-none'
          type='text'
          onChange={handleOnChange}
          value={search}
          placeholder='#Search' />
        <div className='flex items-center justify-center rounded-[5px]
         p-[5px] text-white hover:cursor-pointer bg-red-400
        '>
          <MdSearch />
        </div>
        <FaX className='absolute text-[8px] top-4 right-8 text-slate-500 cursor-pointer' onClick={handleOnClick} />
      </div>
      <div className="bg-white w-full rounded-lg shadow-lg mt-4 max-w-lg mx-auto absolute z-30 top-5 border border-gray-200">
        {data.length > 0 && (
          <ul className="list-none p-0 m-0">
            {data.map((item, index) => (
              <li
                key={index}
                className="flex items-center border-b last:border-none border-slate-300 py-3 px-4 hover:bg-gray-50 transition duration-200 cursor-pointer"
                onClick={() => navigate(`/your-profile/${item._id}`)}
              >
                {
                  item.profilePic ? <img
                    src={item.profilePic}
                    alt=""
                    className="w-10 h-10 rounded-full object-cover mr-4"
                  /> : <FaCircleUser className="w-10 h-10 rounded-full object-cover mr-4" />
                }
                <span className="text-gray-700">{item.name}</span>
              </li>
            ))}
          </ul>
        )}
      </div>


    </div>
  )
}

export default LogoSearch
