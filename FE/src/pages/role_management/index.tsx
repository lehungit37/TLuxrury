import React, { useEffect, useState } from 'react';
import ActionBar from 'src/components/action_bar';
import TablePagination from 'src/components/table_pagination';
import { payloadRoleInit } from 'src/constants/role';
import TableLayout from 'src/layout/table_layout';
import { useAppDispatch, useAppSelector } from 'src/redux_store';
import { getRoleList } from 'src/redux_store/role/role_action';
import { changePayloadRole, resetState, setIdRoleSelected } from 'src/redux_store/role/role_slice';
import { IPayloadRole } from 'src/types/role';
import RoleDetail from './detail';
import RoleDetailAction from './detail_action';
import RoleFilter from './filter';
import RoleTableData from './table';

const RoleManagement = () => {
  const {
    payload,
    roleData: { totalData },
    selectedId,
  } = useAppSelector((state) => state.roleSlice);
  const [typeTab, setTypeTab] = useState<'function' | 'user'>('function');
  const dispatch = useAppDispatch();

  const [isShowAllDetail, setIsShowAllDetail] = useState<boolean>(false);

  const handleChangeShowAllDetail = (status: boolean) => {
    setIsShowAllDetail(status);
  };

  const asyncGetData = (newPayload: IPayloadRole) => {
    dispatch(getRoleList(newPayload));
  };

  useEffect(() => {
    asyncGetData(payloadRoleInit);
  }, []);

  useEffect(() => {
    return () => {
      dispatch(resetState());
    };
  }, []);

  const handleClose = () => {
    dispatch(setIdRoleSelected(''));
  };

  const handleChangePage = (newPage: number) => {
    const newPayload: IPayloadRole = { ...payload, page: newPage };
    dispatch(changePayloadRole(newPayload));
    dispatch(setIdRoleSelected(''));
    asyncGetData(newPayload);
  };

  return (
    <TableLayout
      filterPanel={<RoleFilter handleChangeShowAllDetail={handleChangeShowAllDetail} />}
      tablePanel={<RoleTableData />}
      detailPanel={<RoleDetail setTypeTab={setTypeTab} />}
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
      detailActionsPanel={
        <ActionBar right={<RoleDetailAction typeTab={typeTab} />} handleClose={handleClose} />
      }
      isOpenDetailPanel={Boolean(selectedId)}
    />
  );
};

export default RoleManagement;
