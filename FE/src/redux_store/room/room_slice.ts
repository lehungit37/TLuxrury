import { createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';

import { IPayloadGetRooms, IRoom } from 'src/types/room';
import {
  deleteRoom,
  getRoomDetail,
  getRoomManagement,
  getRoomsShow,
  updateRoom,
} from './room_actions';

interface IRoomSlice {
  roomData: {
    data: IRoom[];
    totalData: number;
  };
  roomIdSelected: string;
  room: IRoom;
  payload: IPayloadGetRooms;
}

const initialState: IRoomSlice = {
  roomData: {
    data: [],
    totalData: 0,
  },

  payload: {
    searchKeyword: '',
    page: 1,
    roomTypeId: '',
    limit: 16,
  },

  roomIdSelected: '',
  room: <IRoom>{},
};

const roomSlice = createSlice({
  name: 'roleManagement',
  initialState,
  reducers: {
    changePayloadGetRoom: (state, action: { payload: IPayloadGetRooms }) => {
      const newPayload = action.payload;

      state.payload = newPayload;
    },
    resetRoomState: (state) => {
      state.roomData = initialState.roomData;
      state.payload = initialState.payload;
      state.room = initialState.room;
      state.roomIdSelected = initialState.roomIdSelected;
    },

    changeRoomSelected: (state, action: { payload: string }) => {
      state.roomIdSelected = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getRoomManagement.fulfilled, (state, action) => {
        const roomData = action.payload;
        state.roomData = roomData;
      })
      .addCase(deleteRoom.fulfilled, (state) => {
        state.roomIdSelected = '';
        state.room = <IRoom>{};
      })
      .addCase(getRoomDetail.fulfilled, (state, action) => {
        const room = action.payload;
        state.room = room;
      })

      .addCase(getRoomsShow.fulfilled, (state, action) => {
        state.roomData.data = action.payload;
      })
      .addCase(updateRoom.fulfilled, (state, action) => {
        const currentData = [...state.roomData.data];
        const roomId = action.meta.arg.roomId;
        const newRoom = action.meta.arg.newRoom;

        const index = currentData.findIndex((item) => item.id === roomId);

        if (!_.isEmpty(state.room)) {
          state.room = { ...state.room, ...newRoom };
        }
        if (index !== -1) {
          const currenntRoom = { ...currentData[index] };
          currentData.splice(index, 1, { ...currenntRoom, ...newRoom });

          state.roomData.data = currentData;
        }
      });
  },
});

const { actions, reducer } = roomSlice;

export const { changePayloadGetRoom, resetRoomState, changeRoomSelected } = actions;
export default reducer;
