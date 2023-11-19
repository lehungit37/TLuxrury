import React from 'react';
import TabLayout from 'src/layout/tab_layout';
import { ITabItem } from 'src/types/common';
import { isSTNMT } from 'src/utils/function';
import AdminManagement from './admin';

const UserAndRoleManagement = () => {
  const [value, setValue] = React.useState('1');

  const tabList: ITabItem[] = [
    {
      key: '1',
      label: 'Admin',
      component: <AdminManagement />,
    },
  ];

  const handleChange = (newValue: string) => {
    setValue(newValue);
  };

  return <TabLayout tabList={tabList} value={value} handleChange={handleChange} />;
};

export default UserAndRoleManagement;
