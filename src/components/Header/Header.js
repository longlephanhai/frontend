/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext, useState } from 'react';
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

const Header = () => {
  const user = useSelector(state => state?.user?.user);
  const dispatch = useDispatch();
  const [menuDisplay, setMenuDisplay] = useState(false);
  const context = useContext(Context);
  const navigate = useNavigate();
  const searchProduct = useLocation();
  const urlSearch = new URLSearchParams(searchProduct?.search);
  const searchQry = urlSearch.getAll("q");
  const [search, setSearch] = useState(searchQry);

  const handeLogout = async () => {
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

  return (
    <>
      <header className='h-16 shadow-md bg-white fixed w-full z-40'>
        <div className='h-full container mx-auto flex items-center px-4 justify-between'>
          <div>
            <Link to={'/'}>
              <img src={logo} alt='' width={90} height={50} />
            </Link>
          </div>

          <nav className='hidden lg:flex items-center space-x-4'>
            <a href='#' className='text-pink-600 hover:text-pink-900'>Home</a>
            <a href='#category' className='text-pink-600 hover:text-pink-900'>Category</a>
            <a href='#products' className='text-pink-600 hover:text-pink-900'>Products</a>
            <a href='#contact' className='text-pink-600 hover:text-pink-900'>Contact</a>
          </nav>

          <div className='hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow-md pl-1'>
            <input onChange={handleSearch} value={search} type='text' placeholder='search product here..' className='w-full outline-none' />
            <div className='text-lg min-w-[50px] h-8 bg-pink-600 flex items-center justify-center rounded-r-full text-white'>
              <GrSearch />
            </div>
          </div>

          <div className='flex items-center gap-7'>
            <div className='relative flex justify-center'>
              {user?._id && (
                <div className='text-3xl cursor-pointer relative flex justify-center' onClick={() => setMenuDisplay(prev => !prev)}>
                  {user?.profilePic ? (
                    <img src={user?.profilePic} alt='' className='w-10 h-10 rounded-full' />
                  ) : (
                    <FaCircleUser />
                  )}
                </div>
              )}
              {menuDisplay && (
                <div className='absolute bg-white bottom-0 top-11 h-fit p-4 shadow-lg rounded'>
                  <nav>
                    {user?.role === ROLE.ADMIN && (
                      <Link to={'/admin-panel/dashboard'} className='whitespace-nowrap hidden md:block hover:bg-slate-100 p-2' onClick={() => setMenuDisplay(prev => !prev)}>Admin panel</Link>
                    )}
                    <div>
                      <Link to='http://localhost:3001/' className='whitespace-nowrap hidden md:block hover:bg-slate-100 p-2'>Social Page</Link>
                    </div>
                  </nav>
                </div>
              )}
            </div>
            {(user?._id || token) && (
              <Link to={'/cart'} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className='text-2xl relative'>
                <span> <FaShoppingCart /></span>
                <div className='bg-pink-600 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-3'>
                  <p className='text-sm'>{context?.cartProduct}</p>
                </div>
              </Link>
            )}
            <div>
              {user?._id || token ? (
                <button onClick={handeLogout} className='px-3 py-1 rounded-full text-white bg-pink-600 hover:bg-pink-700'>Logout</button>
              ) : (
                <Link to={'/login'} className='px-3 py-1 rounded-full text-white bg-pink-600 hover:bg-pink-700'>Login</Link>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
