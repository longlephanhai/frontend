/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext, useEffect, useState } from 'react';
import logo from '../../assest/assest/logoupdate.webp';
import { GrSearch } from "react-icons/gr";
import { FaCircleUser } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SummaryApi from '../../common';
import { toast } from 'react-toastify';
import { setUserDetails } from '../../store/userSlice';
import ROLE from '../../common/role';
import Context from '../../context';
import { FaBars, FaHeart } from "react-icons/fa";
import { Drawer } from 'antd';
import logomini from '../../assest/assest/logomini.webp'
const Header = () => {
  const user = useSelector(state => state?.user?.user);
  const dispatch = useDispatch();
  const [menuDisplay, setMenuDisplay] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const context = useContext(Context);
  const navigate = useNavigate();
  const searchProduct = useLocation();
  const urlSearch = new URLSearchParams(searchProduct?.search);
  const searchQry = urlSearch.getAll("q");
  const [search, setSearch] = useState(searchQry);

  const handleLogout = async () => {
    const fetchData = await fetch(SummaryApi.logout_user.url, {
      method: SummaryApi.logout_user.method,
      credentials: 'include'
    });
    const data = await fetchData.json();
    if (data.success) {
      toast.success(data.message);
      dispatch(setUserDetails(null));
    }
    if (data.error) {
      toast.error(data.message);
    }
    localStorage.removeItem('token');
  };

  const handleSearch = (e) => {
    const { value } = e.target;
    setSearch(value);
    if (value) {
      navigate(`/search?q=${value}`);
    } else {
      navigate('/search');
    }
  };
  const token = localStorage.getItem('token');

  const [userId, setUserId] = useState("")
  const fetchUserDetails = async () => {
    const dataResponsive = await fetch(SummaryApi.current_user.url, {
      method: SummaryApi.current_user.method,
      credentials: "include"
    })
    const dataApi = await dataResponsive.json()
    setUserId(dataApi?.data?._id)
  }
  const [data, setData] = useState([])
  useEffect(() => {
    fetchUserDetails();
  }, []);
  const [open, setOpen] = useState(false);
  const fetchApi = async () => {
    if (userId) {
      const response = await fetch(SummaryApi.listFavorite.url, {
        method: SummaryApi.listFavorite.method,
        credentials: 'include',
        headers: {
          "content-type": 'application/json'
        },
        body: JSON.stringify({ userId })
      });
      const responseData = await response.json();
      setData(responseData.data);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  useEffect(() => {
    if (userId) {
      fetchApi();
    }
  }, [userId]);

  const showDrawer = async () => {
    await fetchUserDetails();
    fetchApi();
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  console.log(data);

  const handleDelete = async (id) => {
    const dataResponsive = await fetch(SummaryApi.deleteFavoriteProduct.url, {
      method: SummaryApi.deleteFavoriteProduct.method,
      credentials: "include",
      headers: {
        "content-type": 'application/json'
      },
      body: JSON.stringify(
        {
          productId: id
        }
      )
    })
    const dataApi = await dataResponsive.json()
    if (dataApi.success) {
      showDrawer();
      context.fetchUserFavorite()
    }
  }
  return (
    <>
      <header className='h-16 shadow-md bg-white fixed w-full z-40'>
        <div className='h-full container mx-auto flex items-center px-3 justify-between'>
          <div>
            <Link to={'/'}>
              <img
                src={logo}
                alt='logo'
                width={90}
                height={50}
                className='hidden md:block'
              />
            </Link>
            <Link to={'/'}>
              <img
                src={logomini}
                alt='logomini'
                width={50}
                height={10}
                className='block md:hidden'
              />
            </Link>
          </div>

          {/* Toggle Button for Small Screens */}


          {/* Navigation Links */}
          <nav className='hidden lg:flex items-center space-x-4'>
            <a href='#' className='text-pink-600 hover:text-pink-900'>Home</a>
            <a href='#category' className='text-pink-600 hover:text-pink-900'>Category</a>
            <a href='#products' className='text-pink-600 hover:text-pink-900'>Products</a>
            <a href='#contact' className='text-pink-600 hover:text-pink-900'>Contact</a>
            <Link to='/chat' className='text-pink-600 hover:text-pink-900'>Chat</Link>
            <Link to={"/social"} className='text-pink-600 hover:text-pink-900'>Social Page</Link>
          </nav>

          <div className='hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow-md pl-1'>
            <input onChange={handleSearch} value={search} type='text' placeholder='search product here..' className='w-full outline-none' />
            <div className='text-lg min-w-[50px] h-8 bg-pink-600 flex items-center justify-center rounded-r-full text-white'>
              <GrSearch />
            </div>
          </div>

          <div className='flex items-center gap-4 md:gap-7'>
            <div className='relative flex justify-center'>
              {user?._id && (
                <div className='text-3xl cursor-pointer relative flex justify-center' onClick={() => setMenuDisplay(prev => !prev)}>
                  {user?.profilePic ? (
                    <img src={user?.profilePic} alt='profile' className='w-10 h-10 rounded-full object-cover' />
                  ) : (
                    <FaCircleUser />
                  )}
                </div>
              )}
              {menuDisplay && (
                <div className='absolute bg-white bottom-0 top-11 h-fit p-4 shadow-lg rounded'>
                  <nav>
                    {user?.role === ROLE.ADMIN && (
                      <Link to={'/admin-panel/dashboard'} className='whitespace-nowrap block hover:bg-slate-100 p-2' onClick={() => setMenuDisplay(prev => !prev)}>Admin panel</Link>
                    )}
                    <div>
                      <Link to='/myorder' className='whitespace-nowrap block hover:bg-slate-100 p-2' onClick={() => setMenuDisplay(prev => !prev)} > My Orders</Link>
                    </div>
                  </nav>
                </div>
              )}
            </div>
            {(user?._id || token) && (
              <Link to={'/cart'} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className='text-2xl relative'>
                <span><FaShoppingCart /></span>
                <div className='bg-pink-600 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-3'>
                  <p className='text-sm'>{context?.cartProduct}</p>
                </div>
              </Link>
            )}
            {(user?._id) && (
              <div>
                <button onClick={showDrawer} className='text-2xl relative flex items-center' >
                  <FaHeart />
                  <div className='bg-pink-600 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-3'>
                    <p className='text-sm'>{context?.count}</p>
                  </div>
                </button>
                <Drawer title="Favorite Product" onClose={onClose} open={open}>
                  {data.map((item, index) => (
                    <div key={index} className="border-b border-gray-200 pb-4 mb-4 relative">
                      <Link to={`/product/${item.productId._id}`} className="flex items-center space-x-4 p-4">
                        <img src={item.productId.productImage[0]} alt='' className="w-24 h-24 object-cover rounded-lg" />
                        <div className="flex-1">
                          <p className="text-lg font-bold">{item.productId.productName}</p>
                          <p className="text-sm text-gray-500">{item.productId.brandName}</p>
                          <p className="text-sm text-gray-500">{item.productId.category}</p>
                          <div className="flex justify-between mt-2">
                            <p className="text-gray-700">Price: {item.productId.price}</p>
                            <p className="text-red-500 font-bold">Selling Price: {item.productId.sellingPrice}</p>
                          </div>
                        </div>
                      </Link>
                      <div className="flex justify-end pr-4">
                        <button
                          className="text-slate-400 px-3 py-1 rounded-lg transition-colors absolute  top-1"
                          onClick={() => handleDelete(item._id)}
                        >
                          X
                        </button>
                      </div>
                    </div>
                  ))}
                </Drawer>

              </div>
            )}

            <div>
              {user?._id || token ? (
                <button onClick={handleLogout} className='px-3 py-1 rounded-full text-white bg-pink-600 hover:bg-pink-700'>Logout</button>
              ) : (
                <Link to={'/login'} className='px-3 py-1 rounded-full text-white bg-pink-600 hover:bg-pink-700'>Login</Link>
              )}
            </div>
          </div>
          <div className='lg:hidden'>
            <button onClick={() => setDropdownOpen(!dropdownOpen)} className='text-pink-600'>
              <FaBars />
            </button>
          </div>
        </div >

        {/* Dropdown Menu for Small Screens */}
        {
          dropdownOpen && (
            <div className='lg:hidden bg-white shadow-md'>
              <nav className='flex flex-col p-4 space-y-2 items-center'>
                <a href='#' className='text-pink-600 hover:text-pink-900'>Home</a>
                <a href='#category' className='text-pink-600 hover:text-pink-900'>Category</a>
                <a href='#products' className='text-pink-600 hover:text-pink-900'>Products</a>
                <a href='#contact' className='text-pink-600 hover:text-pink-900'>Contact</a>
                <Link to='/chat' className='text-pink-600 hover:text-pink-900'>Chat</Link>
                <Link to='/social' className='text-pink-600 hover:text-pink-900'>Social Page</Link>
              </nav>
            </div>
          )
        }
      </header >
    </>
  );
};

export default Header;
