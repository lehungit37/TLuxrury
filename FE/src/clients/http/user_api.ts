import { IUpdateUser } from './../../types/user';
import { IPagination } from 'src/types/common';
import { IPayloadGetUser, IUser, IUserAdd } from 'src/types/user';
import { createClient } from './axios_client';

const client = createClient('http://10.49.46.54:9000/api/v1');

export const userApi = {
  getUserList: (payload: IPayloadGetUser) => {
    return client.post<IPagination<IUser>>('/users', payload);
  },

  checkExistEmail: (email: string) => {
    return client.get<string>(`/users/checkEmail?email=${email}`);
  },

  addUser: (user: IUserAdd) => {
    return client.post<string>('/users/add', user);
  },

  getUserDetail: (userId: string) => {
    return client.get<IUser>(`/users/${userId}`);
  },

  updateUser: ({ userId, user }: { userId: string; user: IUpdateUser }) => {
    return client.put<IUser>(`/users/${userId}`, user);
  },

  deleteUser: (userId: string) => {
    return client.delete<{ message: string }>(`/users/${userId}`);
  },

  revokeAllSession: (userId: string) => {
    return client.post<any>(`/users/${userId}/sessions/revoke/all`);
  },

  sendActiveEmail: (userId: string) => {
    return client.put<any>(`/users/${userId}/active_email`);
  },

  updateUserPassword: ({ userId, password }: { userId: string; password: string }) => {
    return client.put<any>(`/users/${userId}/password`, { password });
  },
};
