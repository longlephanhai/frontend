import React from 'react'
import CategoryList from '../../components/CategoryList/CategoryList'
import BannerProduct from '../../components/BannerProduct/BannerProduct'
import HorizontalCartProduct from '../../components/HorizontalCardProduct/HorizontalCartProduct'
import FeatureArea from '../../components/FeatureCard/FeatureCard'
import Brand from '../../components/Brand/Brand'
import Countdown from '../../components/CountDown/CountDown'
import BannerItems from '../../components/BannerItems/BannerItems'
// import ProductArea from '../../components/ProductArea/ProductArea'
const Home = () => {
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + 7);
  return (
    <>
      <div className=''>
        <BannerProduct />
      </div>
      <Brand/>
      <BannerItems/>
      <Countdown targetDate={targetDate}/>
      <div className='m-4 mt-6' id="category">
        <CategoryList />
      </div>
      <HorizontalCartProduct category={"blush"} heading={"Top's Blush"} />
      <HorizontalCartProduct category={"facialoil"} heading={"Top's Facialoil"} />
      <HorizontalCartProduct category={"facialoil-cleanser"} heading={"Top's Facialoil-Cleanser"} />
      <HorizontalCartProduct category={"lipstick"} heading={"Top's Lipstick"} />
      <HorizontalCartProduct category={"perfume"} heading={"Top's Perfume"} />
      <HorizontalCartProduct category={"serum"} heading={"Top's Serum"} />
      <HorizontalCartProduct category={"sunscreen"} heading={"Top's Sunscreen"} />
      <HorizontalCartProduct category={"toner"} heading={"Top's Toner"} />
      <FeatureArea className='mt-4' />
      {/* <ProductArea/> */}
    </>
  )
}

export default Home
