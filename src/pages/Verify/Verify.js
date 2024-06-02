/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import './Verify.css'
import { useNavigate, useSearchParams } from 'react-router-dom'
import axios from 'axios'
const Verify = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const success = searchParams.get("success");
    const orderId = searchParams.get("orderId");
    const url = "http://localhost:8080"
    const navigate = useNavigate();
    const verifyPayment = async () => {
        const response = await axios.post(url + "/api/verify", { success, orderId });
        if (response.data.success) {
            navigate("/");
        }
        // else {
        //     navigate("/")
        // }
    }
    useEffect(() => {
        verifyPayment();
    }, [])
    return (
        <>
            <div className='verify'>
                <div className='spinner'></div>
            </div>
        </>
    )
}

export default Verify
