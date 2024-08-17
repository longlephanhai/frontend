/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { Layout, Menu, Avatar, Button } from 'antd';
import { UserOutlined, MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { FaChartLine, FaCalendar, FaUsers } from "react-icons/fa";
import { AiOutlineProduct } from "react-icons/ai";
import { useSelector } from 'react-redux'
import { FaBoxOpen } from "react-icons/fa6";
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { FaImage } from "react-icons/fa";
import ROLE from '../../common/role'
import { AiFillMessage } from "react-icons/ai";
const AdminPanel = () => {
  const { Sider, Content } = Layout;
  const user = useSelector(state => state?.user?.user)
  const navigate = useNavigate()
  useEffect(() => {
    if (user?.role !== ROLE.ADMIN) {
      navigate('/')
    }
  }, [user])
  const [collapsed, setCollapsed] = useState(false);
  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        // collapsible
        collapsed={collapsed}
        onCollapse={toggleSidebar}
        style={{ backgroundColor: '#fff', paddingTop: '60px' }}
        breakpoint="lg"
      // collapsedWidth="0"
      >
        <div style={{ position: 'absolute', top: '0', left: 0, zIndex: 1000, padding: '10px' }}>
          <Button onClick={toggleSidebar} style={{ marginBottom: 16 }}>
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </Button>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '20px' }}>
          {user?.profilePic ? (
            <img src={user?.profilePic} alt='profile' className='w-20 h-20 rounded-full object-cover' />
          ) : (
            <Avatar size={collapsed ? 32 : 64} icon={<UserOutlined />} />
          )}
          {!collapsed && (
            <>
              <p style={{ fontWeight: 'bold', marginTop: '10px', marginBottom: '0' }}>{user?.name}</p>
              <p style={{ fontSize: '12px', color: '#999', marginBottom: '0' }}>{user?.role}</p>
            </>
          )}
        </div>

        <Menu mode="inline" defaultSelectedKeys={['1']} style={{ backgroundColor: '#fff' }}>
          <Menu.Item key="1" icon={<FaChartLine />}>
            <Link to="dashboard">DashBoard</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<FaCalendar />}>
            <Link to="calendar">Calendar</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<FaUsers />}>
            <Link to="all-users">All Users</Link>
          </Menu.Item>
          <Menu.Item key="4" icon={<AiOutlineProduct />}>
            <Link to="all-products">All Products</Link>
          </Menu.Item>
          <Menu.Item key="5" icon={<FaBoxOpen />}>
            <Link to="orderlist">Orders List</Link>
          </Menu.Item>
          <Menu.Item key="6" icon={<FaImage />}>
            <Link to="post-list">Posts</Link>
          </Menu.Item>
          <Menu.Item key="7" icon={<AiFillMessage />}>
            <Link to="list-message">Message</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>

        <Content style={{ paddingRight: '10px', marginLeft: collapsed ? '20px' : '20px' }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}

export default AdminPanel
