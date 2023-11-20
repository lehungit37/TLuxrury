import { createAsyncThunk } from '@reduxjs/toolkit';
import { roomApi } from 'src/clients/http/room_client';
import { IGetRoom, IPayloadGetRooms, IRoom, IRoomType } from 'src/types/room';

export const getRoomTypes = createAsyncThunk<IRoomType[]>(
  'room/getRoomTypes',
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await roomApi.getRoomTypes();
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const addRoom = createAsyncThunk<any, any>(
  'room/addRoom',
  async (room, { rejectWithValue }) => {
    try {
      const { data } = await roomApi.addRoom(room);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const getRoomManagement = createAsyncThunk<
  { data: IRoom[]; totalData: number },
  IPayloadGetRooms
>('room/getRoomManagement', async (payload, { rejectWithValue }) => {
  try {
    const { data } = await roomApi.getRoomsManagement(payload);
    return data;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const getRoomDetail = createAsyncThunk<IRoom, string>(
  'room/getRoomDetail',
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await roomApi.getRoomDetail(payload);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const deleteRoom = createAsyncThunk<any, string>(
  'room/deleteRoom',
  async (roomId, { rejectWithValue }) => {
    try {
      await roomApi.deleteRoom(roomId);
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const updateRoom = createAsyncThunk<IRoom, { roomId: string; newRoom: IRoom }>(
  'room/updateRoom',
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await roomApi.updateRoom(payload);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const getRoomsShow = createAsyncThunk<IRoom[], IGetRoom>(
  'room/getRoomsShow',
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await roomApi.getRoomsShow(payload);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const getRoomCanBooking = createAsyncThunk<IRoom[], { fromDate: Date; toDate: Date }>(
  'room/getRoomsShow',
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await roomApi.getRoomCanBooking(payload);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
