import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import ForgotPassword from "../pages/ForgotPassword/ForgotPassword";
import SignUp from "../pages/SignUp/SignUp";
import AdminPanel from "../pages/AdminPanel/AdminPanel";
import AllUser from "../pages/Alluser/AllUser";
import AllProducts from "../pages/AllProducts/AllProduct";
import CategoryProduct from "../pages/CategoryProduct/CategoryProduct";
import ProductDetail from "../pages/ProductDetail/ProductDetail";
import Cart from "../pages/Cart/Cart";
import SearchProduct from "../pages/SearchProduct/SearchProduct";
import Payment from "../pages/Payment/Payment";
import Verify from "../pages/Verify/Verify";
import MyOrder from "../pages/MyOrder/MyOrder";
import DashBoard from "../pages/DashBoard/DashBoard";
import PageCalendar from "../pages/Calendar/PageCalendar";
import OrderList from "../pages/OrderList/OrderList";
import OrderDetail from "../pages/OrderDetail/OrderDetail";
import ConfirmEmail from "../pages/Confirm-Email/ConfirmEmail";
import ResetPassword from "../pages/ResetPassword/ResetPassword";
import Socical from "../pages/Social/Socical";
import Profile from "../pages/Profile/Profile";
import PostList from "../pages/PostList/PostList";
import Chat from "../pages/Chat/Chat";
import ListMessage from "../pages/ListMessage/ListMessage";
import YourProfile from "../pages/YourProfile/YourProfile";
import NotFriend from "../pages/NotFriend/NotFriend";
import Friend from "../pages/Friend/Friend";
import Request from "../pages/Request/Request";
import Accept from "../pages/Accept/Accept";
import RoomChat from "../pages/RoomChat/RoomChat";

// import AboutUs from "../pages/AboutUs/AboutUs";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/forgot-password",
        element: <ForgotPassword />
      },
      {
        path: "/reset-password/:token",
        element: <ResetPassword />
      },
      {
        path: "/sign-up",
        element: <SignUp />
      },
      {
        path: "/confirm-email",
        element: <ConfirmEmail />
      },
      {
        path: '/product-category',
        element: <CategoryProduct />
      },
      {
        path: "product/:id",
        element: <ProductDetail />
      },
      {
        path: "cart",
        element: <Cart />
      },
      {
        path: "payment",
        element: <Payment />
      },
      {
        path: "search",
        element: <SearchProduct />
      },
      {
        path: "/verify",
        element: <Verify />
      },
      {
        path: "myorder",
        element: <MyOrder />
      },
      {
        path: "orderdetail/:id",
        element: <OrderDetail />
      },
      {
        path: "/social",
        element: <Socical />,
      },
      {
        path: "profile/:id",
        element: <Profile />
      },
      {
        path: "chat",
        element: <Chat />
      },
      {
        path: "your-profile/:id",
        element: <YourProfile />
      },
      {
        path: "not-friend",
        element: <NotFriend />
      },
      {
        path: 'friend',
        element: <Friend />
      },
      {
        path: 'request',
        element: <Request />
      },
      {
        path: 'accept',
        element: <Accept />
      },
      {
        path: 'room-chat/:id',
        element: <RoomChat />
      },
      {
        path: "/admin-panel",
        element: <AdminPanel />,
        children: [
          {
            path: 'all-users',
            element: <AllUser />
          },
          {
            path: 'all-products',
            element: <AllProducts />
          },
          {
            path: 'dashboard',
            element: <DashBoard />
          },
          {
            path: 'calendar',
            element: <PageCalendar />
          },
          {
            path: 'orderlist',
            element: <OrderList />
          },
          {
            path: 'post-list',
            element: <PostList />
          },
          {
            path: 'list-message',
            element: <ListMessage />
          }
        ]
      },
    ]
  },
  // {
  //   path:"/about-us",
  //   element:<AboutUs/>
  // },
])