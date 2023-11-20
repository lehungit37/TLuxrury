import { AddOutlined } from '@mui/icons-material';
import { Box, Button, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ActionBar from 'src/components/action_bar';
import TablePagination from 'src/components/table_pagination';
import { CModalIds } from 'src/constants';
import TableLayout from 'src/layout/table_layout';
import { useAppDispatch, useAppSelector } from 'src/redux_store';
import { openModal } from 'src/redux_store/common/modal_slice';
import { getRoomBookingManagemnt } from 'src/redux_store/room_booking/room_booking_actions';
import Actions from './actions';
import Detail from './detail';

import ModalAddBooking from './modal_add_booking';
import TableData from './table';

function BookingManagement() {
  const { roomBookingIdSelected } = useAppSelector((state) => state.roomBookingSlice);
  const dispatch = useAppDispatch();

  const [payload, setPayload] = useState<{ page: number; limit: number; keyword: string }>({
    page: 1,
    limit: 15,
    keyword: '',
  });

  const asyncGetData = () => {
    dispatch(getRoomBookingManagemnt(payload));
  };

  useEffect(() => {
    asyncGetData();
  }, [payload]);

  const handleChangePage = (newPage: number) => {
    console.log({ newPage });
  };

  const handleClose = () => {
    console.log('Close');
  };

  const handleBooking = () => {
    dispatch(
      openModal({
        modalId: CModalIds.addBooking,
        modalComponent: <ModalAddBooking asyncGetData={asyncGetData} />,
      }),
    );
  };

  return (
    <TableLayout
      filterPanel={
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Box></Box>
          </Grid>
          <Grid item>
            <Button onClick={handleBooking} variant="outlined" startIcon={<AddOutlined />}>
              Đặt phòng
            </Button>
          </Grid>
        </Grid>
      }
      tablePanel={<TableData asyncGetData={asyncGetData} />}
      detailPanel={<Detail />}
      tablePaginationPanel={
        <TablePagination
          page={1}
          totalPage={1}
          totalData={1}
          handleChangePage={(page) => {
            handleChangePage(page);
          }}
        />
      }
      detailActionsPanel={<ActionBar right={<Actions />} handleClose={handleClose} />}
      isOpenDetailPanel={Boolean(roomBookingIdSelected)}
    />
  );
}

export default BookingManagement;
