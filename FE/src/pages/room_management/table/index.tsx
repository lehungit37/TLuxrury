import { Chip } from '@mui/material';
import { ColumnDef } from '@tanstack/react-table';
import React from 'react';
import ReactTable from 'src/components/react_table';
import { useAppDispatch, useAppSelector, useIsRequestPending } from 'src/hooks';
import { changeRoomSelected } from 'src/redux_store/room/room_slice';
import { IRoom } from 'src/types/room';
import { formatNumberToVND } from 'src/utils/function';
import { renderColorRoom, renderColorRoomChip, renderRoomStatus } from 'src/utils/room';

function RoomTableData() {
  const {
    roomData: { data },
    roomIdSelected,
  } = useAppSelector((state) => state.roomSlice);

  const isLoading = useIsRequestPending('room', 'getRoomManagement');

  const dispatch = useAppDispatch();

  const columns: ColumnDef<IRoom>[] = [
    {
      header: 'Tên phòng',
      accessorKey: 'name',
    },
    {
      header: 'Giá phòng',
      accessorKey: 'name',
      cell: ({ row }) => {
        const { original } = row;

        return formatNumberToVND(original.price);
      },
    },
    {
      header: 'Khuyến mãi',
      accessorKey: 'promotion',
      cell: ({ row }) => {
        const { original } = row;

        return formatNumberToVND(original.promotion);
      },
    },
    {
      header: 'Trạng thái',
      accessorKey: 'status',

      cell: ({ row }) => {
        const { original } = row;

        return (
          <Chip
            color={renderColorRoomChip(original.status)}
            label={renderRoomStatus(original.status)}
          />
        );
      },
    },
    {
      header: 'Sử dụng',
      accessorKey: 'isShow',

      cell: ({ row }) => {
        const { original } = row;

        return original.isShow ? 'Có' : 'Không';
      },
    },
  ];

  const handleRowClick = (data: IRoom) => {
    if (data.id === roomIdSelected) return;
    dispatch(changeRoomSelected(data.id));
  };

  return (
    <ReactTable<IRoom>
      selectedId={roomIdSelected}
      data={data || []}
      columns={columns}
      handleClick={handleRowClick}
      isLoading={isLoading}
      size="medium"
    />
  );
}

export default RoomTableData;
