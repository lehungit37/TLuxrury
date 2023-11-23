import { createAsyncThunk } from '@reduxjs/toolkit';
import { invoiceAPI } from 'src/clients/http/invoice';
import { roomApi } from 'src/clients/http/room_client';
import { IGetRoom, IPayloadGetRooms, IRoom, IRoomType } from 'src/types/room';
import { toastMessage } from 'src/utils/toast';
import saveAs from 'file-saver';

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
  'room/getRoomCanBooking',
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await roomApi.getRoomCanBooking(payload);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const createInvoice = createAsyncThunk<void, any>(
  'room/createInvoice',
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await invoiceAPI.createInvoice(payload);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const createPayment = createAsyncThunk<any, string>(
  'room/createPayment',
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await invoiceAPI.createPayment(payload);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const invoicePaided = createAsyncThunk<any, string>(
  'room/invoicePaided',
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await invoiceAPI.invoicePaided(payload);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const getStatistical = createAsyncThunk<any, any>(
  'room/getStatistical',
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await invoiceAPI.getStatistical(payload);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const exportExcel = createAsyncThunk<any, any>(
  'room/exportExcel',
  async (payload, { rejectWithValue }) => {
    try {
      const data = await invoiceAPI.exportSyntheticViolation(payload);
      const blob = new Blob([data.data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });

      const filename = data?.headers?.['content-disposition'] || 'download.xls';

      saveAs(blob, filename);
      return data;
    } catch (error: any) {
      if (error) {
        toastMessage.error(error?.message);
      }
      return rejectWithValue(error);
    }
  },
);
