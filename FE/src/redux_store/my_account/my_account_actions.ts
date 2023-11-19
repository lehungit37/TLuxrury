import { createAsyncThunk } from '@reduxjs/toolkit';
import { myAccountApi } from 'src/clients/http/my_account_api';

import { IChangePassword, IChangePhone, IPayloadVerifyPassword } from 'src/types/my_account';
import { IUser } from 'src/types/user';
import { toastMessage } from 'src/utils/toast';

export const getMe = createAsyncThunk<IUser>('myAccount/getMe', async (_, { rejectWithValue }) => {
  try {
    const { data } = await myAccountApi.getMe();
    return data;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const login = createAsyncThunk<{ token: string }, { email: string; password: string }>(
  'myAccount/login',
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await myAccountApi.login(payload);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const logout = createAsyncThunk<any>('myAccount/logout', async (_, { rejectWithValue }) => {
  try {
    const { data } = await myAccountApi.logout();
    return data;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const verifyPassword = createAsyncThunk<any, IPayloadVerifyPassword>(
  'myAccount/verifyPassword',
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await myAccountApi.verifyPassword(payload);
      return data;
    } catch (error: any) {
      toastMessage.error(error.message || 'Lỗi hệ thống');
      return rejectWithValue(error);
    }
  },
);

export const sendEmailForgotPassword = createAsyncThunk<any, string>(
  'myAccount/sendEmailForgotPassword',
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await myAccountApi.sendEmailForgotPassword(payload);
      return data;
    } catch (error: any) {
      toastMessage.error(error.message || 'Lỗi hệ thống');
      return rejectWithValue(error);
    }
  },
);

export const updateMyPassword = createAsyncThunk<any, IChangePassword>(
  'myAccount/updateMyPassword',
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await myAccountApi.updateMyPassword(payload);
      return data;
    } catch (error: any) {
      toastMessage.error(error.message || 'Lỗi hệ thống');
      return rejectWithValue(error);
    }
  },
);

export const updateMyPhone = createAsyncThunk<any, IChangePhone>(
  'myAccount/updateMyPhone',
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await myAccountApi.updateMyPhone(payload);
      return data;
    } catch (error: any) {
      toastMessage.error(error.message || 'Lỗi hệ thống');
      return rejectWithValue(error);
    }
  },
);
