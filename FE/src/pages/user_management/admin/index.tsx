import React, { useEffect, useState } from 'react';
import ActionBar from 'src/components/action_bar';
import TablePagination from 'src/components/table_pagination';
import { initPayloadUser } from 'src/constants/user';
import TableLayout from 'src/layout/table_layout';
import { useAppDispatch, useAppSelector } from 'src/redux_store';
import { getUserList } from 'src/redux_store/user/user_actions';
import { changePayloadUser, setSelectedId } from 'src/redux_store/user/user_slice';
import { IPayloadGetUser } from 'src/types/user';
import AdminDetail from './detail';
import AdminDetailAction from './detail_action';
import AdminFilter from './filter';
import AdminTableData from './table';

const AdminManagement = () => {
  const dispatch = useAppDispatch();
  const {
    payload,
    userData: { totalData },
    selectedId,
  } = useAppSelector((state) => state.userSlice);

  const [isShowAllDetail, setIsShowAllDetail] = useState<boolean>(false);

  const handleChangePage = (newPage: number) => {
    const newPayload: IPayloadGetUser = { ...payload, page: newPage };
    dispatch(setSelectedId(''));
    dispatch(changePayloadUser(newPayload));
    asyncGetData(newPayload);
  };

  const asyncGetData = (newPayload: IPayloadGetUser) => {
    dispatch(getUserList({ ...newPayload, keyword: '' }));
  };

  useEffect(() => {
    return () => {
      dispatch(setSelectedId(''));
    };
  }, []);

  useEffect(() => {
    asyncGetData(initPayloadUser);
  }, []);

  const handleClose = () => {
    setIsShowAllDetail(false);
    dispatch(setSelectedId(''));
  };

  const handleChangeShowAllDetail = (status: boolean) => {
    setIsShowAllDetail(status);
  };

  return (
    <TableLayout
      filterPanel={<AdminFilter />}
      tablePanel={<AdminTableData />}
      detailPanel={<AdminDetail />}
      tablePaginationPanel={
        <TablePagination
          page={payload.page}
          totalPage={Math.ceil(totalData / payload.limit)}
          totalData={totalData}
          handleChangePage={(page) => {
            handleChangePage(page);
          }}
        />
      }
      detailActionsPanel={<ActionBar right={<AdminDetailAction />} handleClose={handleClose} />}
      isOpenDetailPanel={Boolean(selectedId)}
    />
  );
};

export default AdminManagement;
