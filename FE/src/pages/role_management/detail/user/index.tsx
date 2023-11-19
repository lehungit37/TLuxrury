import React, { useEffect } from 'react';
import { ColumnDef } from '@tanstack/react-table';

import ReactTable from 'src/components/react_table';
import { useIsRequestPending } from 'src/hooks';
import { useAppDispatch, useAppSelector } from 'src/redux_store';
import { getUserOfRole } from 'src/redux_store/role/role_action';
import { IUser } from 'src/types/user';

const columns: ColumnDef<IUser>[] = [
  {
    header: 'Tên người dùng',
    accessorKey: 'name',
  },
  {
    header: 'Email',
    accessorKey: 'email',
  },
  {
    header: 'Số điện thoại',
    accessorKey: 'phoneNumber',
  },
];

const RoleUser = () => {
  const { userList, selectedId } = useAppSelector((state) => state.roleSlice);
  const isLoading = useIsRequestPending('role', 'getUserOfRole');
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUserOfRole(selectedId));
  }, [selectedId]);

  return (
    <ReactTable<IUser>
      size="medium"
      isLoading={isLoading}
      data={userList || []}
      columns={columns}
    />
  );
};

export default RoleUser;
