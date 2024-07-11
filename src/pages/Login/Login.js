import React, { useContext, useState } from 'react';
// import loginIcons from '../../assest/assest/signin.gif'; // Sửa đường dẫn file
import googleLogo from '../../assest/assest/idesign_logogg_1.webp'; // Thêm logo Google
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from 'react-toastify';
import Context from '../../context';
import { useGoogleLogin } from '@react-oauth/google';
import SummaryApi from '../../common';
import { RxAvatar } from "react-icons/rx";
import { Avatar } from 'antd';
const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: ""
  });
  const navigate = useNavigate();
  const { fetchUserDetails, fetchUserAddToCart } = useContext(Context);
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataResponse = await fetch(SummaryApi.signIn.url, {
      method: SummaryApi.signIn.method,
      credentials: "include",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(data)
    });
    const dataApi = await dataResponse.json();
    if (dataApi.success) {
      toast.success(dataApi.message);
      navigate('/');
      fetchUserDetails();
      fetchUserAddToCart();
    }
    if (dataApi.error) {
      toast.error(dataApi.message);
    }
  };

  const handleGoogleSignInSuccess = async (response) => {
    localStorage.setItem("token", response.clientId);
    navigate('/');
  };

  const handleGoogleSignInFailure = (error) => {
    toast.error("Google Sign In failed. Please try again.");
  };

  const googleLogin = useGoogleLogin({
    onSuccess: handleGoogleSignInSuccess,
    onError: handleGoogleSignInFailure,
  });

  return (
    <section id='login' className='flex justify-center items-center min-h-screen'>
      <div className='container p-4'>
        <div className='bg-white p-4 max-w-md mx-auto rounded-md shadow-md'>
          <div className='w-20 h-20 mx-auto text-center'>
            <Avatar
              size={{
                xs: 24,
                sm: 32,
                md: 40,
                lg: 64,
                xl: 80,
                xxl: 100,
              }}
              icon={<RxAvatar color='pink' className='bg-pink-600 w-full h-full ' />}
            />
          </div>

          <form className='mt-6' onSubmit={handleSubmit}>
            <div className='mb-4'>
              <label htmlFor='email' className='block text-sm font-medium text-gray-700'>Email</label>
              <input
                type='email'
                id='email'
                placeholder='Enter email'
                name='email'
                value={data.email}
                onChange={handleOnChange}
                className='mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500'
              />
            </div>

            <div className='mb-4'>
              <label htmlFor='password' className='block text-sm font-medium text-gray-700'>Password</label>
              <div className='relative'>
                <input
                  type={showPassword ? "text" : "password"}
                  id='password'
                  placeholder='Enter password'
                  value={data.password}
                  name='password'
                  onChange={handleOnChange}
                  className='mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500'
                />
                <div
                  className='absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer'
                  onClick={() => setShowPassword(prevState => !prevState)}
                >
                  {showPassword ? <FaEyeSlash className='text-gray-400' /> : <FaEye className='text-gray-400' />}
                </div>
              </div>
              <NavLink
                to={'/forgot-password'}
                className='block text-sm text-right mt-1 text-pink-600 hover:text-pink-700'
              >
                Forgot password
              </NavLink>
            </div>

            <button className='bg-pink-600 hover:bg-pink-700 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6'>Login</button>
          </form>

          <div className='mt-6 text-center flex flex-col justify-center items-center'>
            <p className='text-sm text-gray-500'>or login with Google</p>
            <button
              onClick={() => googleLogin()}
              className='mt-2 w-12 h-12 border border-pink-400 rounded-full flex items-center justify-center hover:border-pink-600'
            >
              <img src={googleLogo} alt='Google Sign In' className='items-center rounded-full' />
            </button>
          </div>

          <p className='mt-5 text-sm text-center'>Don't have an account? <Link to={'/sign-up'} className='text-pink-600 hover:text-pink-700'>Sign Up</Link></p>
        </div>
      </div>
    </section>
  );
};

export default Login;
