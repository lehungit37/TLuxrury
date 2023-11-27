import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'src/redux_store';
import CalendarV2 from './calendar_v2';

function BookingManagement() {
  const { roomBookingIdSelected } = useAppSelector((state) => state.roomBookingSlice);
  const dispatch = useAppDispatch();

  const [payload, setPayload] = useState<{ page: number; limit: number; keyword: string }>({
    page: 1,
    limit: 15,
    keyword: '',
  });

  // const asyncGetData = () => {
  //   dispatch(getRoomBookingManagemnt(payload));
  // };

  // useEffect(() => {
  //   asyncGetData();
  // }, [payload]);

  const handleChangePage = (newPage: number) => {
    console.log({ newPage });
  };

  const handleClose = () => {
    console.log('Close');
  };

  // const handleBooking = () => {
  //   dispatch(
  //     openModal({
  //       modalId: CModalIds.addBooking,
  //       modalComponent: <ModalAddBooking asyncGetData={asyncGetData} />,
  //     }),
  //   );
  // };

  return (
    // <TableLayout
    //   filterPanel={
    //     <Grid container justifyContent="space-between" alignItems="center">
    //       <Grid item>
    //         <Box></Box>
    //       </Grid>
    //       <Grid item>
    //         <Button onClick={handleBooking} variant="outlined" startIcon={<AddOutlined />}>
    //           Đặt phòng
    //         </Button>
    //       </Grid>
    //     </Grid>
    //   }
    //   tablePanel={<TableData asyncGetData={asyncGetData} />}
    //   detailPanel={<Detail />}
    //   tablePaginationPanel={
    //     <TablePagination
    //       page={1}
    //       totalPage={1}
    //       totalData={1}
    //       handleChangePage={(page) => {
    //         handleChangePage(page);
    //       }}
    //     />
    //   }
    //   detailActionsPanel={<ActionBar right={<Actions />} handleClose={handleClose} />}
    //   isOpenDetailPanel={Boolean(roomBookingIdSelected)}
    // />

    <CalendarV2 />
  );
}

export default BookingManagement;
