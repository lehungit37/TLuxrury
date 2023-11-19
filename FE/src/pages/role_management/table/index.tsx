import React from 'react';
import { Chip } from '@mui/material';
import { ColumnDef } from '@tanstack/react-table';
import _ from 'lodash';

import ReactTable from 'src/components/react_table';
import { useIsRequestPending } from 'src/hooks';
import { useAppDispatch, useAppSelector } from 'src/redux_store';
import { setIdRoleSelected } from 'src/redux_store/role/role_slice';
import { IRole } from 'src/types/role';

const columns: ColumnDef<IRole>[] = [
  {
    header: 'Tên vai trò ',
    accessorKey: 'name',
    cell: ({ row }) => {
      const { original } = row;

      return (
        <>
          {original.name}
          {original.builtIn && (
            <Chip sx={{ marginLeft: 1 }} color="primary" label="Mặc định" size="small" />
          )}
        </>
      );
    },
  },
  {
    header: 'Mô tả',
    accessorKey: 'description',
  },
  {
    header: 'Chức năng',
    accessorKey: 'roleFunction',
    cell: ({ row }) => {
      const { original } = row;

      return <>{_.join(original.roleFunction, ', ')}</>;
    },
  },
  {
    header: 'Tổng số người dùng',
    accessorKey: 'totalUser',
  },
];

const RoleTableData = () => {
  const {
    roleData: { data },
    selectedId,
  } = useAppSelector((state) => state.roleSlice);
  const isLoading = useIsRequestPending('role', 'getRoleList');
  const dispatch = useAppDispatch();

  const handleRowClick = (data: IRole) => {
    if (data.id === selectedId) {
      dispatch(setIdRoleSelected(''));
      return;
    }
    dispatch(setIdRoleSelected(data.id));
  };

  return (
    <ReactTable<IRole>
      selectedId={selectedId}
      data={data || []}
      columns={columns}
      handleClick={handleRowClick}
      isLoading={isLoading}
      size="medium"
    />
  );
};

export default RoleTableData;
