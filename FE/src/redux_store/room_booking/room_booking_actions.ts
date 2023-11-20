import { createAsyncThunk } from '@reduxjs/toolkit';
import { roomApi } from 'src/clients/http/room_client';
import { IRoomBooking } from 'src/types/roomBooking';

export const createBooking = createAsyncThunk<void, IRoomBooking>(
  'room/createBooking',
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await roomApi.createBooking(payload);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
export const checkCanCreateBooking = createAsyncThunk<
  boolean,
  { fromDate: Date; toDate: Date; roomId: string }
>('room/checkCanCreateBooking', async (payload, { rejectWithValue }) => {
  try {
    const { data } = await roomApi.checkCanCreateBooking(payload);
    return data;
  } catch (error) {
    return rejectWithValue(error);
  }
});
export const getRoomBookingManagemnt = createAsyncThunk<
  { data: IRoomBooking[]; totalData: number },
  { page: number; limit: number; keyword: string }
>('room/getRoomBookingManagemnt', async (payload, { rejectWithValue }) => {
  try {
    const { data } = await roomApi.getRoomBookingManagemnt(payload);
    return data;
  } catch (error) {
    return rejectWithValue(error);
  }
});
export const deleteRoomBooking = createAsyncThunk<void, string>(
  'room/deleteRoomBooking',
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await roomApi.deleteRoomBooking(payload);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
export const updateRoomBooking = createAsyncThunk<any, { id: string; data: any }>(
  'room/updateRoomBooking',
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await roomApi.updateRoomBooking(payload.id, payload.data);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
