import { IPayloadVerifyPassword } from 'src/types/my_account';
import { IUser } from 'src/types/user';
import { createClient } from './axios_client';

const client = createClient('http://10.49.46.54:9000/api/v1');

export const myAccountApi = {
  getMe: () => {
    return client.get<IUser>('/users/me');
  },

  login: (accountInfo: { email: string; password: string }) => {
    return client.post<{ token: string }>('/users/login', accountInfo);
  },

  logout: () => {
    return client.post<any>('/users/logout');
  },

  verifyPassword: (payload: IPayloadVerifyPassword) => {
    return client.put<any>(`/users/${payload.userId}/verify_password`, {
      token: payload.token,
      password: payload.password,
      email: payload.email,
    });
  },

  sendEmailForgotPassword: (email: string) => {
    return client.get<any>(`/users/forgot_password?email=${email}`);
  },

  updateMyPassword: ({
    userId,
    oldPassword,
    newPassword,
  }: {
    userId: string;
    oldPassword: string;
    newPassword: string;
  }) => {
    return client.put<any>(`/users/${userId}/change_pass`, { oldPassword, newPassword });
  },

  updateMyPhone: ({
    userId,
    phoneNumber,
    password,
  }: {
    userId: string;
    phoneNumber: string;
    password: string;
  }) => {
    return client.put<any>(`/users/${userId}/change_phone`, { phoneNumber, password });
  },
};
