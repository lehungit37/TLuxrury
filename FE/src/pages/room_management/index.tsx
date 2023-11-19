import React, { useEffect } from 'react';
import ActionBar from 'src/components/action_bar';
import TablePagination from 'src/components/table_pagination';
import { useAppDispatch, useAppSelector } from 'src/hooks';
import TableLayout from 'src/layout/table_layout';
import { getRoomManagement } from 'src/redux_store/room/room_actions';
import {
  changePayloadGetRoom,
  changeRoomSelected,
  resetRoomState,
} from 'src/redux_store/room/room_slice';
import RoomAction from './action';
import RoomFilter from './filter';
import RoomDetail from './room_detail';
import RoomTableData from './table';

function RoomManagement() {
  const dispatch = useAppDispatch();
  const {
    payload,
    roomData: { totalData },
    roomIdSelected,
  } = useAppSelector((state) => state.roomSlice);

  useEffect(() => {
    dispatch(getRoomManagement(payload));
  }, [payload]);

  useEffect(() => {
    return () => {
      dispatch(resetRoomState());
    };
  }, []);

  const handleChangePage = (newPage: number) => {
    dispatch(changePayloadGetRoom({ ...payload, page: newPage }));
  };

  const handleClose = () => {
    dispatch(changeRoomSelected(''));
  };

  return (
    <TableLayout
      filterPanel={<RoomFilter />}
      tablePanel={<RoomTableData />}
      detailPanel={<RoomDetail />}
      tablePaginationPanel={
        <TablePagination
          page={payload.page}
          totalPage={Math.ceil(totalData / 16)}
          totalData={totalData}
          handleChangePage={(page) => {
            handleChangePage(page);
          }}
        />
      }
      detailActionsPanel={<ActionBar right={<RoomAction />} handleClose={handleClose} />}
      isOpenDetailPanel={Boolean(roomIdSelected)}
    />
  );
}

export default RoomManagement;
