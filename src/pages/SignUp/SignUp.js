import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import imageTobass64 from '../../helpers/imageTobass64.js/imageTobass64';
import SummaryApi from '../../common';
import { toast } from 'react-toastify';
import { RxAvatar } from "react-icons/rx";
import { Avatar } from 'antd';
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
        toast.success(responseData.message);
        navigate('/login')
      }
      if (responseData.error) {
        toast.error(responseData.message);
      }
    } else {
      console.log("Please check")
    }
  }
  const handleUploadPic = async (e) => {
    const file = e.target.files[0];
    const imagePic = await imageTobass64(file)
    setData((preve) => {
      return {
        ...preve,
        profilePic: imagePic
      }
    })
  }
  console.log(data)
  return (
    <div>
      <section id='signup'>
        <div className='mx-auto container p-4'>

          <div className='bg-white p-4 w-full max-w-md mx-auto'>
            <div className='w-20 h-20 mx-auto relative overflow-hidden rounded-full'>
              <div>
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
              {/* <form>
                <label>
                  <div className='text-xs bg-opacity-80 bg-slate-200 pb-2 pt-2 cursor-pointer text-center absolute bottom-0 w-full'>
                    Upload Photo
                  </div>
                  <input type='file' className='hidden' onChange={handleUploadPic} />
                </label>
              </form> */}
            </div>
            <form className='pt-6 flex flex-col gap-2' onSubmit={handleSubmit}>
              <div className='grid'>
                <label >Name : </label>
                <div className='bg-slate-100 p-2'>
                  <input
                    required
                    type='text'
                    placeholder='enter your name'
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
                    placeholder='enter email'
                    name='email'
                    value={data.email}
                    onChange={handleOnChange}
                    className='w-full h-full outline-none bg-transparent' />
                </div>
              </div>

              <div>
                <label>Password : </label>
                <div className='bg-slate-100 p-2 flex'>
                  <input type={showPassword ? "text" : "password"}
                    required
                    placeholder='enter password'
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
                <label>Confirm Password : </label>
                <div className='bg-slate-100 p-2 flex'>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder='enter confirm password'
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
              <button className='bg-pink-600 hover:bg-pink-700 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6'>Sign Up</button>
            </form>

            <p className='my-5'>Already have account ? <Link to={'/login'} className='text-pink-600 hover:text-pink-700 hover:underline'>Login</Link></p>
          </div>

        </div>
      </section>
    </div>
  )
}

export default SignUp
