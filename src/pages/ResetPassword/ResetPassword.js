import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import SummaryApi from '../../common';
import { toast } from 'react-toastify';

const ResetPassword = () => {
  const { token } = useParams();
  // console.log("params",token);
  const [newPassword, setNewPassword] = useState('');
  const navigate=useNavigate();
  const handleOnChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${SummaryApi.resetPassword.url}/${token}`, {
        method: SummaryApi.resetPassword.method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ newPassword }),
      });
      const responseData = await response.json();
      console.log("répo",responseData);
      toast.success(responseData.message);
      if(responseData.success){
        navigate("/login")
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to reset password.');
    }
  };

  return (
    <div className='max-w-md mx-auto p-4'>
      <form onSubmit={handleSubmit} className='space-y-4'>
        <div>
          <label className='block text-sm font-medium text-gray-700'>New Password</label>
          <input
            type='password'
            name='newPassword'
            id='newPassword'
            required
            value={newPassword}
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
  )
}

export default ResetPassword
