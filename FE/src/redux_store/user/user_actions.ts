import { createAsyncThunk } from '@reduxjs/toolkit';
import { userApi } from 'src/clients/http';
import { IPagination } from 'src/types/common';
import { IStationSearch } from 'src/types/station';
import { IPayloadGetUser, IUpdateUser, IUser, IUserAdd } from 'src/types/user';
import { toastMessage } from 'src/utils/toast';

export const checkExistEmail = createAsyncThunk<string, string>(
  'user/checkExistEmail',
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await userApi.checkExistEmail(payload);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const getUserList = createAsyncThunk<IPagination<IUser>, IPayloadGetUser>(
  'user/getUserList',
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await userApi.getUserList(payload);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const addAdmin = createAsyncThunk<string, IUserAdd>(
  'user/addUser',
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await userApi.addUser(payload);
      return data;
    } catch (error: any) {
      toastMessage.error(error.message);
      return rejectWithValue(error);
    }
  },
);

export const getUserDetail = createAsyncThunk<IUser, string>(
  'user/getUserDetail',
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await userApi.getUserDetail(payload);
      return data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  },
);

export const updateUser = createAsyncThunk<IUser, { userId: string; user: IUpdateUser }>(
  'user/updateUser',
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await userApi.updateUser(payload);
      return data;
    } catch (error: any) {
      toastMessage.error(error.message);

      return rejectWithValue(error);
    }
  },
);

export const deleteUser = createAsyncThunk<{ message: string }, string>(
  'user/deleteUser',
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await userApi.deleteUser(payload);
      return data;
    } catch (error: any) {
      toastMessage.error(error?.message || 'Lỗi hệ thống');

      return rejectWithValue(error);
    }
  },
);
export const revokeAllSession = createAsyncThunk<{ message: string }, string>(
  'user/revokeAllSession',
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await userApi.revokeAllSession(payload);
      return data;
    } catch (error: any) {
      toastMessage.error(error.message);

      return rejectWithValue(error);
    }
  },
);

export const sendActiveEmail = createAsyncThunk<any, string>(
  'user/sendActiveEmail',
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await userApi.sendActiveEmail(payload);
      return data;
    } catch (error: any) {
      toastMessage.error(error.message);

      return rejectWithValue(error);
    }
  },
);

export const updateUserPassword = createAsyncThunk<any, { userId: string; password: string }>(
  'user/updateUserPassword',
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await userApi.updateUserPassword(payload);
      return data;
    } catch (error: any) {
      toastMessage.error(error.message);

      return rejectWithValue(error);
    }
  },
);

//userStation
