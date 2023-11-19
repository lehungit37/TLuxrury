import React, { useEffect } from 'react';
import { Box } from '@mui/material';

import TabLayout from 'src/layout/tab_layout';
import { useAppSelector } from 'src/redux_store';
import theme from 'src/theme';
import { ITabItem } from 'src/types/common';

import RoleFunction from './function';
import RoleUser from './user';

const tabList: ITabItem[] = [
  {
    key: '1',
    label: 'Chức năng',
    component: <RoleFunction />,
  },
  {
    key: '2',
    label: 'Người dùng',
    component: <RoleUser />,
  },
];

type Props = {
  setTypeTab: React.Dispatch<React.SetStateAction<'function' | 'user'>>;
};

const RoleDetail = (props: Props) => {
  const [value, setValue] = React.useState('1');
  const { setTypeTab } = props;
  const { selectedId } = useAppSelector((state) => state.roleSlice);

  useEffect(() => {
    handleChange('1');
  }, [selectedId]);

  const handleChange = (newValue: string) => {
    setValue(newValue);

    if (newValue === '1') setTypeTab('function');
    else {
      setTypeTab('user');
    }
  };

  return (
    <Box flex={1} bgcolor={theme.palette.background.paper}>
      <TabLayout tabList={tabList} value={value} handleChange={handleChange} />
    </Box>
  );
};

export default RoleDetail;
