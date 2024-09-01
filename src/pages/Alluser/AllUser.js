import React, { useEffect, useState } from 'react';
import SummaryApi from '../../common';
import './AllUser.css';
import { toast } from 'react-toastify';
import moment from 'moment';
import ChangeUserRole from '../../components/ChangeUserRole/ChangeUserRole';
import { Table, Button, Space, Tag, Input } from 'antd'; // Import Input from antd
import { EditOutlined, SearchOutlined } from '@ant-design/icons'; // Import SearchOutlined

const AllUser = () => {
  const [allUser, setAllUser] = useState([]);
  const [openUpdateRole, setOpenUpdateRole] = useState(false);
  const [updateUserDetails, setUpdateUserDetails] = useState({
    email: '',
    name: '',
    role: '',
    _id: '',
  });
  const fetchAllUsers = async () => {
    const fetchData = await fetch(SummaryApi.allUser.url, {
      method: SummaryApi.allUser.method,
      credentials: 'include',
    });
    const dataResponse = await fetchData.json();
    if (dataResponse.success) {
      setAllUser(dataResponse.data);
    } else {
      toast.error(dataResponse.message);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const columns = [
    {
      title: 'SR.',
      dataIndex: 'sr',
      key: 'sr',
      render: (text, record, index) => index + 1,
      responsive: ['md'], // Show on medium and larger screens
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8 }}>
          <Input
            placeholder="Search name"
            value={selectedKeys[0]}
            onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => handleSearch(selectedKeys, confirm)}
            style={{ width: 188, marginBottom: 8, display: 'block' }}
          />
          <Space>
            <Button
              type="primary"
              onClick={() => handleSearch(selectedKeys, confirm)}
              icon={<SearchOutlined />}
              size="small"
              style={{ width: 90 }}
            >
              Search
            </Button>
            <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
              Reset
            </Button>
          </Space>
        </div>
      ),
      onFilter: (value, record) => record.name.toLowerCase().includes(value.toLowerCase()),
      responsive: ['xs', 'sm', 'md', 'lg'], // Show on all screen sizes
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      responsive: ['sm', 'md', 'lg'], // Hide on extra small screens
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      filters: [
        { text: 'Admin', value: 'ADMIN' },
        { text: 'User', value: 'USER' },
      ],
      onFilter: (value, record) => record.role === value,
      render: (role) => {
        let color = role === 'ADMIN' ? 'red' : 'green';
        return <Tag color={color}>{role.toUpperCase()}</Tag>;
      },
      responsive: ['xs', 'sm', 'md', 'lg'], // Show on all screen sizes
    },
    {
      title: 'Created Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (createdAt) => moment(createdAt).format('LL'),
      responsive: ['md', 'lg'], // Hide on small and extra small screens
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <Button
            type="primary"
            onClick={() => {
              setUpdateUserDetails(record);
              setOpenUpdateRole(true);
            }}
          >
            <EditOutlined />
          </Button>
        </Space>
      ),
      responsive: ['xs', 'sm', 'md', 'lg'], // Show on all screen sizes
    },
  ];

  const handleSearch = (selectedKeys, confirm) => {
    confirm();
  };

  const handleReset = (clearFilters) => {
    clearFilters();
  };

  return (
    <div className="bg-white pb-4">
      <Table
        columns={columns}
        dataSource={allUser}
        rowKey={(record) => record._id} // Assuming each record has a unique identifier '_id'
        bordered
        pagination={{ pageSize: 10 }} // Set the number of rows per page
      />
      {openUpdateRole && (
        <ChangeUserRole
          onClose={() => setOpenUpdateRole(false)}
          name={updateUserDetails.name}
          email={updateUserDetails.email}
          role={updateUserDetails.role}
          userId={updateUserDetails._id}
          callFunc={fetchAllUsers}
        />
      )}
    </div>
  );
};

export default AllUser;
