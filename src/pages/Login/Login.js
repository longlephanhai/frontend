/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from 'react-toastify';
import Context from '../../context';
import SummaryApi, { backendDomin } from '../../common';
import { RxAvatar } from "react-icons/rx";
import { Avatar } from 'antd';
import io from 'socket.io-client';
import Hooks from '../../components/hooks/Hooks';
import ModalStep from '../../components/ModalStep/ModalStep';
const Login = () => {
  // local login
  const socketRef = useRef(null);
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


  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState('');
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
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
      socketRef.current = io(backendDomin);
    }
    if (dataApi.error) {
      console.log(dataApi.message);

      toast.error(dataApi.message);
      if (dataApi.message === 'Please confirm your email address') {
        setEmail(data.email);
        setIsModalOpen(true);

      }

    }
  };

  // google login
  const { handleGoogle, loading, error } = Hooks(
    SummaryApi.loginGoogle.url
  )

  useEffect(() => {
    /* global google */
    if (window.google) {
      google.accounts.id.initialize({
        client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        callback: handleGoogle,
        auto_select: false
      });

      google.accounts.id.renderButton(document.getElementById("loginDiv"), {
        theme: "outline",
        // text: "signin_with",
        shape: "circle",
      });
    }
  }, []);
  return (
    <section id='login' className='flex justify-center items-center min-h-screen'>
      <div className='container p-4'>
        <div className='bg-white p-4 max-w-md mx-auto rounded-md shadow-md flex flex-col justify-center items-center'>
          <div className='w-20 h-20 mx-auto text-center'>
            <Avatar
              size={{
                xs: 64,
                sm: 32,
                md: 40,
                lg: 64,
                xl: 80,
                xxl: 100,
              }}
              icon={<RxAvatar color='red' className='bg-red-600 w-full h-full ' />}
            />
          </div>

          <form className='mt-6 w-full' onSubmit={handleSubmit}>
            <div className='mb-4 w-full'>
              <label htmlFor='email' className='block text-sm font-medium text-gray-700'>Email</label>
              <input
                type='email'
                id='email'
                placeholder='Nhập email'
                name='email'
                value={data.email}
                onChange={handleOnChange}
                className='mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500'
              />
            </div>

            <div className='mb-4'>
              <label htmlFor='password' className='block text-sm font-medium text-gray-700'>Mật khẩu</label>
              <div className='relative'>
                <input
                  type={showPassword ? "text" : "password"}
                  id='password'
                  placeholder='Nhập mật khẩu'
                  value={data.password}
                  name='password'
                  onChange={handleOnChange}
                  className='mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500'
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
                className='block text-sm text-right mt-1 text-red-600 hover:text-red-700'
              >
                Quên mật khẩu
              </NavLink>
            </div>

            <button className='bg-red-600 hover:bg-red-700 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6'>Đăng nhập</button>
          </form>

          <div id='loginDiv' className='mt-6 self-center '></div>
          <p className='mt-5 text-sm text-center'>Không có tài khoản? <Link to={'/sign-up'} className='text-red-600 hover:text-red-700'>Đăng ký</Link></p>
        </div>
      </div>
      <ModalStep isModalOpen={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} email={email} />
    </section>
  );
};

export default Login;
