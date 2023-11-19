import { Box } from '@mui/material';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import TabLayout from 'src/layout/tab_layout';
import { useAppDispatch, useAppSelector } from 'src/redux_store';
import { changeTypeTabDetail } from 'src/redux_store/user/user_slice';
import theme from 'src/theme';
import { ITabItem } from 'src/types/common';
import ConfigPermission from './config_permission';
import GeneralUser from './general';

const tabList: ITabItem[] = [
  {
    key: '1',
    label: 'Thông tin chung',
    component: <GeneralUser />,
    typeTab: 'general',
  },
  {
    key: '2',
    label: 'Cấu hình vai trò',
    component: <ConfigPermission />,
    typeTab: 'permission',
  },
];

const AdminDetail = () => {
  const [value, setValue] = useState<string>('1');
  const { selectedId } = useAppSelector((state) => state.userSlice);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setValue('1');
  }, [selectedId]);

  useEffect(() => {
    return () => {
      dispatch(changeTypeTabDetail('general'));
    };
  }, []);

  const handleChange = (tab: string) => {
    const tabSelected = tabList.find((item) => item.key === tab);

    if (!_.isEmpty(tabSelected)) {
      dispatch(changeTypeTabDetail(tabSelected.typeTab));
    }
    setValue(tab);
  };
  return (
    <Box flex={1} bgcolor={theme.palette.background.paper}>
      <TabLayout tabList={tabList} value={value} handleChange={handleChange} />;
    </Box>
  );
};

export default AdminDetail;
