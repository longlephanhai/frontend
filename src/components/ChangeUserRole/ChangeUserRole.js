import React, { useState } from 'react';
import ROLE from '../../common/role';
import { Drawer, Button, Select } from 'antd';
import SummaryApi from '../../common';
import { toast } from 'react-toastify';

const { Option } = Select;

const ChangeUserRole = ({ name, email, role, userId, onClose, callFunc }) => {
  const [userRole, setUserRole] = useState(role);

  const handleOnChangeSelect = (value) => {
    setUserRole(value);
  };

  const updateUserRole = async () => {
    try {
      const fetchResponse = await fetch(SummaryApi.updateUser.url, {
        method: SummaryApi.updateUser.method,
        credentials: 'include',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          userId: userId,
          role: userRole,
        }),
      });
      const responseData = await fetchResponse.json();
      if (responseData.success) {
        toast.success(responseData.message);
        onClose();
        callFunc();
      }
    } catch (error) {
      console.error('Error updating user role:', error);
      toast.error('Failed to update user role');
    }
  };

  return (
    <Drawer
      title="Change User Role"
      placement="right"
      closable={false}
      onClose={onClose}
      visible={true} // Set this to your drawer visibility state
      width={400}
      footer={
        <div style={{ textAlign: 'right' }}>
          <Button onClick={onClose} style={{ marginRight: 8 }}>
            Cancel
          </Button>
          <Button onClick={updateUserRole} type="primary">
            Change Role
          </Button>
        </div>
      }
    >
      <div className="mb-4">
        <p><strong>Name:</strong> {name}</p>
        <p><strong>Email:</strong> {email}</p>
      </div>
      <div className="mb-4">
        <p><strong>Role:</strong></p>
        <Select value={userRole} onChange={handleOnChangeSelect} style={{ width: '100%' }}>
          {Object.values(ROLE).map((item, index) => (
            <Option value={item} key={index}>
              {item}
            </Option>
          ))}
        </Select>
      </div>
    </Drawer>
  );
};

export default ChangeUserRole;
