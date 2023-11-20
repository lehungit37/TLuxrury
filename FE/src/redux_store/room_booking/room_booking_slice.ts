import { createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';
import { IPayloadGetRoomBooking, IRoomBooking } from 'src/types/roomBooking';
import { getRoomBookingManagemnt } from './room_booking_actions';

interface IRoomSlice {
  roomBookingData: {
    data: IRoomBooking[];
    totalData: number;
  };
  roomBookingIdSelected: string;
  roomBooking: IRoomBooking;
  payload: IPayloadGetRoomBooking;
}

const initialState: IRoomSlice = {
  roomBookingData: {
    data: [],
    totalData: 0,
  },

  payload: {
    page: 1,
    roomId: '',
    limit: 16,
  },

  roomBookingIdSelected: '',
  roomBooking: <IRoomBooking>{},
};

const roomBookingSlice = createSlice({
  name: 'roleBookingManagement',
  initialState,
  reducers: {
    changePayloadGetRoom: (state, action: { payload: IPayloadGetRoomBooking }) => {
      const newPayload = action.payload;

      state.payload = newPayload;
    },
    resetRoomState: (state) => {
      state.roomBookingData = initialState.roomBookingData;
      state.payload = initialState.payload;
      state.roomBooking = initialState.roomBooking;
      state.roomBookingIdSelected = initialState.roomBookingIdSelected;
    },

    changeRoomSelected: (state, action: { payload: string }) => {
      state.roomBookingIdSelected = action.payload;
    },
  },

  extraReducers(builder) {
    builder.addCase(getRoomBookingManagemnt.fulfilled, (state, action) => {
      state.roomBookingData = action.payload;
    });
  },
});

const { actions, reducer } = roomBookingSlice;

export const { changePayloadGetRoom, resetRoomState, changeRoomSelected } = actions;
export default reducer;
