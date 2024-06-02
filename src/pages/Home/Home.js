import React from 'react'
import CategoryList from '../../components/CategoryList/CategoryList'
import BannerProduct from '../../components/BannerProduct/BannerProduct'
import HorizontalCartProduct from '../../components/HorizontalCardProduct/HorizontalCartProduct'
const Home = () => {
  return (
    <>
      <div className='mt-4'>
        <BannerProduct />
      </div>
      <CategoryList />
      <HorizontalCartProduct category={"blush"} heading={"Top's Blush"} />
      <HorizontalCartProduct category={"facialoil"} heading={"Top's Facialoil"} />
      <HorizontalCartProduct category={"facialoil-cleanser"} heading={"Top's Facialoil-Cleanser"} />
      <HorizontalCartProduct category={"lipstick"} heading={"Top's Lipstick"} />
      <HorizontalCartProduct category={"perfume"} heading={"Top's Perfume"} />
      <HorizontalCartProduct category={"serum"} heading={"Top's Serum"} />
      <HorizontalCartProduct category={"sunscreen"} heading={"Top's Sunscreen"} />
      <HorizontalCartProduct category={"toner"} heading={"Top's Toner"} />
    </>
  )
}

export default Home
