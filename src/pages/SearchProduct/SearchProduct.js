/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import SummaryApi from '../../common'
import VerticalCard from '../../components/VerticalCard/VerticalCard'

const SearchProduct = () => {
	const params = useLocation()
	const [data, setData] = useState([])

	const fetchProduct = async () => {
		const response = await fetch(SummaryApi.searchProduct.url + params.search)
		const dataResponse = await response.json()
		setData(dataResponse.data)
	}
	useEffect(() => {
		fetchProduct()
	}, [params])
	return (
		<div className='container mx-auto'>
			<p className='text-lg font-semibold my-3'>Search Result: {data.length}</p>
			{
				data.length !== 0 && (
					<VerticalCard data={data} />
				)
			}
		</div>
	)
}

export default SearchProduct
