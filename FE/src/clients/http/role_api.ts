import { IPagination } from 'src/types/common';
import { IAddRole, IPayloadRole, IPermissionScheme, IRole } from 'src/types/role';
import { IUser } from 'src/types/user';
import { createClient } from './axios_client';

const client = createClient('http://10.49.46.54:9000/api/v1');

export const roleApi = {
  getRoleList: (payload: IPayloadRole) => {
    return client.post<IPagination<IRole>>('/roles', payload);
  },

  getRoleDetail: (roleId: string) => {
    return client.get<IRole>(`/roles/${roleId}`);
  },

  getPermissionSchemes: (roleLevel: number) => {
    return client.get<IPermissionScheme[]>(`/permissions/${roleLevel}`);
  },

  updateRole: ({ roleId, newRole }: { roleId: string; newRole: IRole }) => {
    return client.put<IRole>(`/roles/${roleId}`, newRole);
  },

  addRole: (data: IAddRole) => {
    return client.post<IRole>(`/roles/add`, data);
  },
  getUserOfRole: (roleId: string) => {
    return client.get<IUser[]>(`/roles/${roleId}/users`);
  },
  deleteRole: (roleId: string) => {
    return client.delete<string>(`/roles/${roleId}`);
  },

  getAllRole: () => {
    return client.get<IRole[]>(`/roles`);
  },
};
