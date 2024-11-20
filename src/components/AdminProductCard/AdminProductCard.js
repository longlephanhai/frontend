/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { MdEdit } from "react-icons/md";
import AdminEditProduct from '../AdminEditProduct/AdminEditProduct';
import displayINRCurrency from '../../helpers/displayCurrency/displayCurrency';

const AdminProductCard = ({ data, fetchdata }) => {
    const [editProduct, setEditProduct] = useState(false);

    useEffect(() => {
        fetchdata();
    }, []);

    return (
        <div className='bg-white p-4 rounded '>
            <div className='w-40'>
                <div className='w-32 h-32 flex justify-center items-center'>
                    <img src={data?.productImage[0]} alt='' className='mx-auto object-fill h-full' />
                </div>
                <h1 className='text-ellipsis line-clamp-2'>{data.productName}</h1>
                <div>
                    <p className='font-semibold'>{displayINRCurrency(data.sellingPrice)}</p>
                    <div className='w-fit ml-auto p-2 bg-red-200 hover:bg-red-600 rounded-full hover:text-white cursor-pointer'
                        onClick={() => setEditProduct(true)}>
                        <MdEdit />
                    </div>
                </div>
            </div>
            {
                editProduct && (
                    <AdminEditProduct productData={data} onClose={() => setEditProduct(false)} fetchdata={fetchdata} />
                )
            }
        </div>
    )
}

export default AdminProductCard
