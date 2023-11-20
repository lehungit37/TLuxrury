import { CheckOutlined, DeleteOutline, VerifiedOutlined } from '@mui/icons-material';
import { Chip, Grid, Typography } from '@mui/material';
import { ColumnDef } from '@tanstack/react-table';
import React from 'react';
import ConfirmationDialog from 'src/components/modal/confirm_dialog';
import ReactTable from 'src/components/react_table';
import IconButtonTooltip from 'src/components/tooltip/icon_button_tooltip';
import { useAppDispatch, useAppSelector, useIsRequestPending } from 'src/hooks';
import { closeModal, openModal } from 'src/redux_store/common/modal_slice';
import { changeRoomSelected } from 'src/redux_store/room/room_slice';
import {
  deleteRoomBooking,
  updateRoomBooking,
} from 'src/redux_store/room_booking/room_booking_actions';
import { IRoom } from 'src/types/room';
import { IRoomBooking } from 'src/types/roomBooking';
import { formatNumberToVND, formatTime, formatTimeToUTC } from 'src/utils/function';
import { renderColorRoom, renderColorRoomChip, renderRoomStatus } from 'src/utils/room';
import { toastMessage } from 'src/utils/toast';

type Props = {
  asyncGetData: () => void;
};

function TableData(props: Props) {
  const { asyncGetData } = props;
  const {
    roomBookingData: { data },
    // roomIdSelected,
  } = useAppSelector((state) => state.roomBookingSlice);

  const isLoading = useIsRequestPending('room', 'getRoomManagement');

  const dispatch = useAppDispatch();

  const handleDeleteBooking = (id: string) => {
    dispatch(deleteRoomBooking(id))
      .unwrap()
      .then(() => {
        toastMessage.success('Xoá đặt phòng thành công');

        asyncGetData();
        dispatch(
          closeModal({
            modalId: 'deleteBooking',
          }),
        );
      })
      .catch((error) => {
        toastMessage.error(error.message || 'Xoá đặt phòng thành công');
      });
  };

  const handleOpenModalDeleteBooking = (id: string) => {
    dispatch(
      openModal({
        modalId: 'deleteBooking',
        modalComponent: (
          <ConfirmationDialog
            modalId="deleteBooking"
            describe="Bạn có muốn xoá lượt đặt phòng này không ?"
            sliceName="rooms"
            functionName="deleteBooking"
            callback={() => handleDeleteBooking(id)}
          />
        ),
      }),
    );
  };

  const handleVerified = (id: string) => {
    dispatch(updateRoomBooking({ id, data: { isVerified: true } }))
      .unwrap()
      .then(() => {
        toastMessage.success('Xác nhận đặt phòng thành công');

        asyncGetData();
        dispatch(
          closeModal({
            modalId: 'updateBooking',
          }),
        );
      });
  };
  const handleOpenModaVerifiedBooking = (id: string) => {
    dispatch(
      openModal({
        modalId: 'updateBooking',
        modalComponent: (
          <ConfirmationDialog
            modalId="updateBooking"
            describe="Bạn đã xác thực lượt đặt phòng này ?"
            sliceName="rooms"
            functionName="updateBooking"
            callback={() => handleVerified(id)}
            okLabel="Đã xác thực"
            icon={<VerifiedOutlined color="success" fontSize="large" />}
          />
        ),
      }),
    );
  };

  const columns: ColumnDef<IRoomBooking>[] = [
    {
      header: 'Tên khách hàng',
      accessorKey: 'customerName',
    },
    {
      header: 'SDT',
      accessorKey: 'customerPhone',
    },
    {
      header: 'Phòng',
      accessorKey: 'room',
      cell: ({ row }) => {
        const { original } = row;

        return <Typography>{original.room?.name}</Typography>;
      },
    },
    {
      header: 'Dự kiến nhận phòng',
      accessorKey: 'fromDate',
      cell: ({ row }) => {
        const { original } = row;

        return <Typography>{formatTime(original.fromDate)}</Typography>;
      },
    },
    {
      header: 'Dự kiến trả phòng',
      accessorKey: 'toDate',
      cell: ({ row }) => {
        const { original } = row;

        return <Typography>{formatTime(original.toDate)}</Typography>;
      },
    },
    {
      header: 'Trạng thái',
      accessorKey: 'toDate',
      cell: ({ row }) => {
        const { original } = row;

        return (
          <Chip
            label={original.isVerified ? 'Đã xác nhận' : 'Chưa xác nhận'}
            color={original.isVerified ? 'primary' : 'warning'}
          />
        );
      },
    },

    {
      header: 'Tuỳ chọn',
      accessorKey: 'options',
      cell: ({ row }) => {
        const { original } = row;

        return (
          <Grid container>
            <Grid item>
              <IconButtonTooltip
                onClick={() => handleOpenModalDeleteBooking(original.id)}
                icon={<DeleteOutline color="error" />}
                title="Xoá"
              />
            </Grid>
            {!original.isVerified && (
              <Grid item>
                <IconButtonTooltip
                  onClick={() => handleOpenModaVerifiedBooking(original.id)}
                  icon={<CheckOutlined color="success" />}
                  title="Xác nhận đặt phòng"
                />
              </Grid>
            )}
          </Grid>
        );
      },
    },
  ];

  return (
    <ReactTable<IRoomBooking>
      data={data || []}
      columns={columns}
      isLoading={isLoading}
      size="medium"
    />
  );
}

export default TableData;
