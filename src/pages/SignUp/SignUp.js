import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import SummaryApi from '../../common';
import { toast } from 'react-toastify';
import { RxAvatar } from "react-icons/rx";
import { Avatar } from 'antd';
import loginIcon from '../../assest/assest/Remove-bg.ai_1732618552132.webp'
import imageTobass64 from '../../helpers/imageTobass64.js/imageTobass64';
import uploadImage from '../../helpers/uploadImage/uploadImage';
const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [data, setData] = useState({
    email: "",
    password: "",
    name: "",
    confirmPassword: "",
    profilePic: ""
  })
  const navigate = useNavigate();
  const handleOnChange = (e) => {
    const { name, value } = e.target
    setData((preve) => {
      return {
        ...preve,
        [name]: value
      }
    })
  }
  const handleUploadPic = async (e) => {
    const file = e.target.files[0];
    const imagePic = await uploadImage(file)
    setData((preve) => {
      return {
        ...preve,
        profilePic: imagePic.url
      }
    })
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (data.password === data.confirmPassword) {
      const dataResponse = await fetch(SummaryApi.signUp.url, {
        method: SummaryApi.signUp.method,
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify(data)
      })
      const responseData = await dataResponse.json()
      if (responseData.success) {
        console.log(responseData.data)
        toast.success(responseData.message);
        navigate(`/confirm-email/${responseData.data._id}`)
      }
      if (responseData.error) {
        toast.error(responseData.message);
      }
    } else {
      console.log("Please check")
    }
  }
  
  return (
    <div>
      <section id='signup'>
        <div className='mx-auto container p-4'>

          <div className='bg-white p-4 w-full max-w-md mx-auto'>
            <div className='w-20 h-20 mx-auto text-center relative overflow-hidden rounded-full'>
              <div>
                <img src={data.profilePic || loginIcon} alt='' />
                {/* <Avatar
                  size={{
                    xs: 64,
                    sm: 32,
                    md: 40,
                    lg: 64,
                    xl: 80,
                    xxl: 100,
                  }}
                  icon={<RxAvatar color='red' className='bg-red-600 w-full h-full ' />}
                /> */}
              </div>
              <form>
                <label>
                  <div className='text-xs bg-opacity-80 bg-slate-200 pb-3 pt-2 text-center absolute bottom-0 w-full cursor-pointer'>
                    Chọn ảnh đại diện
                  </div>
                  <input
                    onChange={handleUploadPic}
                    type='file'
                    accept='image/*'
                    className='hidden' />
                </label>
              </form>
            </div>
            <form className='pt-6 flex flex-col gap-2' onSubmit={handleSubmit}>
              <div className='grid'>
                <label >Họ và tên : </label>
                <div className='bg-slate-100 p-2'>
                  <input
                    required
                    type='text'
                    placeholder='Nhập họ và tên'
                    name='name'
                    value={data.name}
                    onChange={handleOnChange}
                    className='w-full h-full outline-none bg-transparent' />
                </div>
              </div>
              <div className='grid'>
                <label >Email : </label>
                <div className='bg-slate-100 p-2'>
                  <input
                    required
                    type='email'
                    placeholder='Nhập email'
                    name='email'
                    value={data.email}
                    onChange={handleOnChange}
                    className='w-full h-full outline-none bg-transparent' />
                </div>
              </div>

              <div>
                <label>Mật khẩu : </label>
                <div className='bg-slate-100 p-2 flex'>
                  <input type={showPassword ? "text" : "password"}
                    required
                    placeholder='Nhập mật khẩu'
                    value={data.password}
                    name='password'
                    onChange={handleOnChange}
                    className='w-full h-full outline-none bg-transparent' />
                  <div className='cursor-pointer text-lg' onClick={() => setShowPassword((prev) => !prev)}>
                    <span>
                      {
                        showPassword ?
                          (
                            <FaEyeSlash />
                          ) :
                          (
                            <FaEye />
                          )
                      }
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <label>Xác nhận mật khẩu : </label>
                <div className='bg-slate-100 p-2 flex'>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder='Nhập lại mật khẩu'
                    value={data.confirmPassword}
                    name='confirmPassword'
                    onChange={handleOnChange}
                    required
                    className='w-full h-full outline-none bg-transparent' />

                  <div className='cursor-pointer text-xl' onClick={() => setShowConfirmPassword((preve) => !preve)}>
                    <span>
                      {
                        showConfirmPassword ? (
                          <FaEyeSlash />
                        )
                          :
                          (
                            <FaEye />
                          )
                      }
                    </span>
                  </div>
                </div>
              </div>
              <button className='bg-red-600 hover:bg-red-700 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6'>Đăng ký</button>
            </form>

            <p className='my-5'>Đã có tài khoản ? <Link to={'/login'} className='text-red-600 hover:text-red-700 hover:underline'>Đăng nhập</Link></p>
          </div>

        </div>
      </section>
    </div>
  )
}

export default SignUp
