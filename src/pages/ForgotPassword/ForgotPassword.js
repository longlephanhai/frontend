import React, { useState } from 'react'
import { toast } from 'react-toastify';
import SummaryApi from '../../common';
const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const handleOnChange = (e) => {
    setEmail(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(SummaryApi.forgotPassWord.url, {
        method: SummaryApi.forgotPassWord.method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      const responseData = await response.json();
      toast.success(responseData.message);
    } catch (error) {
      console.error(error);
      toast.error('Failed to send password reset email.');
    }
  };
  return (
    <div>
      <div className='max-w-md mx-auto p-4'>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div className=''>
            <label className='block text-sm font-medium text-gray-700'>Email Address</label>
            <input
              type='email'
              name='email'
              id='email'
              autoComplete='email'
              required
              value={email}
              onChange={handleOnChange}
              className='mt-1 p-2 w-full border-gray-300 rounded-md'
            />
          </div>
          <button
            type='submit'
            className='w-full py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors'
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  )
}

export default ForgotPassword
// Enter code hereconst 
