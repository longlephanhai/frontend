import React from 'react';

const ConfirmEmail = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 p-8 bg-white shadow-lg rounded-lg">
        <div>
          <h2 className="text-center text-3xl font-extrabold text-gray-900">Confirm Email</h2>
          <p className="mt-2 text-center text-sm text-gray-600">Please check your email to complete registration.</p>
        </div>
      </div>
    </div>
  );
};

export default ConfirmEmail;
