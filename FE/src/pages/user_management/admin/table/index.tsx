import React from 'react';
import ReactTable from 'src/components/react_table';
import { Chip } from '@mui/material';
import { ColumnDef } from '@tanstack/react-table';
import { useIsRequestPending } from 'src/hooks';
import { useAppDispatch, useAppSelector } from 'src/redux_store';
import { setSelectedId } from 'src/redux_store/user/user_slice';
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
    {
        header: 'Vai trò',
        accessorKey: 'role',
        cell: ({ row }: any) => {
            const original: IUser = row.original;

            return (
                <Chip label={original.role.name} color={original.role.builtIn ? 'warning' : 'primary'} />
            );
        },
    },
    {
        header: 'Mô tả',
        accessorKey: 'description',
    },
];

const AdminTableData = () => {
    const {
        userData: { data },
        selectedId,
    } = useAppSelector((state) => state.userSlice);
    const dispatch = useAppDispatch();
    const isLoading = useIsRequestPending('user', 'getUserList');

    const handleRowClick = (data: IUser) => {
        if (selectedId !== data.id) {
            dispatch(setSelectedId(data.id));
        }
    };
    return (
        <ReactTable<IUser>
            selectedId={selectedId}
            data={data || []}
            columns={columns}
            handleClick={handleRowClick}
            isLoading={isLoading}
            size="medium"
        />
    );
};

export default AdminTableData;
