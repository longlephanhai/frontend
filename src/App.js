/* eslint-disable react-hooks/exhaustive-deps */
import './App.css';
import { Outlet } from "react-router-dom"
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import SummaryApi from './common';
import Context from './context';
import { useDispatch } from 'react-redux';
import { setUserDetails } from './store/userSlice';
import Loading from './pages/Loading/Loading';
import { FloatButton } from 'antd';
import { ToTopOutlined } from '@ant-design/icons';
function App() {
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 5000)
  }, [])
  const dispatch = useDispatch()
  const [cartProduct, setCartProduct] = useState(0)
  const [count, setCount] = useState(0);
  const fetchUserDetails = async () => {
    const dataResponsive = await fetch(SummaryApi.current_user.url, {
      method: SummaryApi.current_user.method,
      credentials: "include"
    })
    const dataApi = await dataResponsive.json()
    if (dataApi.success) {
      dispatch(setUserDetails(dataApi.data))
    }
  }
  const fetchUserAddToCart = async () => {
    const dataResponse = await fetch(SummaryApi.addToCartProductCount.url, {
      method: SummaryApi.addToCartProductCount.method,
      credentials: 'include'
    })
    const dataApi = await dataResponse.json()
    setCartProduct(dataApi?.data?.count)
  }
  const fetchUserFavorite = async () => {
    const dataResponse = await fetch(SummaryApi.countFavorite.url, {
      method: SummaryApi.countFavorite.method,
      credentials: 'include'
    })
    const dataApi = await dataResponse.json()
    setCount(dataApi?.data?.count)
  }
  useEffect(() => {
    // user Details
    fetchUserDetails()
    //user cart product
    fetchUserAddToCart()
    // user favorite
    fetchUserFavorite()
  }, [])
  return (
    <>
      <Context.Provider value={{
        fetchUserDetails, //user detail fetch
        cartProduct,
        fetchUserAddToCart,
        fetchUserFavorite,
        count
      }}>
        <ToastContainer position='top-center' />
        {
          loading ? (
            <Loading />
          ) : (
            <>
              <Header />
              <main className='min-h-[calc(100vh)] pt-16'>
                <Outlet />
                <FloatButton.BackTop icon={<ToTopOutlined />} className='mb-8' />
                {/* <FloatButton.Group
                  className='-mb-4 text-center'
                  trigger="hover"
                  type="primary"
                  style={{
                    insetInlineEnd: 80,
                  }}
                  icon={<AiOutlineMessage className='' style={{ fontSize: '24px' }} />}
                >
                  <FloatButton icon={<CommentOutlined />} onClick={handleOnClick} />
                </FloatButton.Group> */}
              </main>
              <Footer />
            </>
          )
        }
      </Context.Provider>
    </>
  );
}

export default App;
