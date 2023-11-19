import { ERoleLevel } from 'src/types/enum';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { roleApi } from 'src/clients/http';
import { IPagination } from 'src/types/common';
import { IAddRole, IPayloadRole, IPermissionScheme, IRole, IPermission } from 'src/types/role';
import { IUser } from 'src/types/user';
import { toastMessage } from 'src/utils/toast';

export const getRoleList = createAsyncThunk<IPagination<IRole>, IPayloadRole>(
  'role/getRoleList',
  async (payload, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await roleApi.getRoleList(payload);

      const roleData = data.data;

      if (roleData.length) {
        const permissions = await dispatch(getPermissionSchemes(ERoleLevel.SYSTEM_USER));
        if (permissions.payload) {
          const payload: any = permissions.payload;

          if (payload.length) {
            for (const role of roleData) {
              const roleFunction: string[] = [];

              const rolePermission: string[] = role.permissions;

              payload.map((item: any) => {
                item.permissions?.map((permission: IPermission) => {
                  if (rolePermission.includes(permission.id) && !roleFunction.includes(item.name)) {
                    roleFunction.push(item.name);
                  }
                });
              });

              role.roleFunction = roleFunction;
            }
          }
        }
      }

      return data;
    } catch (error: any) {
      toastMessage.error(error.message);
      return rejectWithValue(error);
    }
  },
);

export const getRoleDetail = createAsyncThunk<IRole, string>(
  'role/getRoleDetail',
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await roleApi.getRoleDetail(payload);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const getPermissionSchemes = createAsyncThunk<IPermissionScheme[], number>(
  'role/getPermissionSchemes',
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await roleApi.getPermissionSchemes(payload);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const updateRole = createAsyncThunk<IRole, { roleId: string; newRole: IRole }>(
  'role/updateRole',
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await roleApi.updateRole(payload);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
export const addRole = createAsyncThunk<IRole, IAddRole>(
  'role/addRole',
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await roleApi.addRole(payload);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const getUserOfRole = createAsyncThunk<IUser[], string>(
  'role/getUserOfRole',
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await roleApi.getUserOfRole(payload);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const deleteRole = createAsyncThunk<string, string>(
  'role/deleteRole',
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await roleApi.deleteRole(payload);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
export const getAllRole = createAsyncThunk<IRole[]>(
  'role/deleteRole',
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await roleApi.getAllRole();
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
