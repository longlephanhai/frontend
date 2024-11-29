import React, { useContext, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Context from '../../context';
import io from 'socket.io-client';
import { backendDomin } from '../../common';
const Hooks = (url) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { fetchUserDetails, fetchUserAddToCart } = useContext(Context);
  const navigate = useNavigate();
  const socketRef = useRef(null);
  const handleGoogle = async (response) => {
    const dataResponse = await fetch(url, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ credential: response.credential }),
    })
    const data = await dataResponse.json();
    if (data?.success) {
      toast.success(data.message);
      navigate('/');
      fetchUserDetails();
      fetchUserAddToCart();
      socketRef.current = io(backendDomin);
    }
    // setLoading(true);
    // fetch(url, {
    //   method: "POST",
    //   credentials: "include",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },

    //   body: JSON.stringify({ credential: response.credential }),
    // })
    //   .then((res) => {
    //     setLoading(false);

    //     return res.json();
    //   })
    //   .then((data) => {
    //     if (data?.user) {
    //       localStorage.setItem("user", JSON.stringify(data?.user));
    //       window.location.reload();
    //     }

    //     throw new Error(data?.message || data);
    //   })
    //   .catch((error) => {
    //     setError(error?.message);
    //   });
  };
  return { loading, error, handleGoogle };
}

export default Hooks
