import { createSlice } from '@reduxjs/toolkit';
import { payloadRoleInit } from 'src/constants/role';
import { IPagination } from 'src/types/common';
import { IPayloadRole, IPermission, IPermissionScheme, IRole } from 'src/types/role';
import { IUser } from 'src/types/user';
import { findIndexItem } from 'src/utils/function';
import {
  getPermissionSchemes,
  getRoleDetail,
  getRoleList,
  getUserOfRole,
  updateRole,
} from './role_action';

interface IRoleSlice {
  roleData: IPagination<IRole>;
  payload: IPayloadRole;
  roleInfo: IRole;
  selectedId: string;
  permissionList: IPermissionScheme[];
  userList: IUser[];
}

const initialState: IRoleSlice = {
  roleData: { data: [], totalData: 0 },
  payload: payloadRoleInit,
  roleInfo: {} as IRole,
  selectedId: '',
  permissionList: [],
  userList: [],
};

const roleSlice = createSlice({
  name: 'roleManagement',
  initialState,
  reducers: {
    setIdRoleSelected: (state, action: { payload: string }) => {
      state.selectedId = action.payload;
    },

    resetState: (state) => {
      state.payload = initialState.payload;
      state.roleData = initialState.roleData;
      state.roleInfo = {} as IRole;
      state.selectedId = '';
    },
    changePayloadRole: (state, action: { payload: IPayloadRole }) => {
      const newPayload = action.payload;

      state.payload = newPayload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getRoleList.fulfilled, (state, action) => {
        const data = action.payload;

        state.roleData = data;
      })
      .addCase(getRoleDetail.fulfilled, (state, action) => {
        const data = action.payload;

        state.roleInfo = data;
      })
      .addCase(getPermissionSchemes.fulfilled, (state, action) => {
        const data = action.payload;

        state.permissionList = data;
      })
      .addCase(updateRole.fulfilled, (state, action) => {
        const { roleId } = action.meta.arg;
        const currentRoleList = [...state.roleData.data];
        const index = findIndexItem(currentRoleList, roleId);
        if (index === -1) return;

        const newRole = action.payload;
        const roleFunction: string[] = [];

        const rolePermission: string[] = newRole.permissions;

        state.permissionList.map((item: any) => {
          item.permissions?.map((permission: IPermission) => {
            if (rolePermission.includes(permission.id) && !roleFunction.includes(item.name)) {
              roleFunction.push(item.name);
            }
          });
        });

        newRole.roleFunction = roleFunction;
        newRole.totalUser = currentRoleList[index].totalUser;
        currentRoleList.splice(index, 1, newRole);

        state.roleInfo = newRole;

        state.roleData.data = currentRoleList;
      })
      .addCase(getUserOfRole.fulfilled, (state, action) => {
        state.userList = action.payload || [];
      });
  },
});

const { actions, reducer } = roleSlice;

export const { setIdRoleSelected, resetState, changePayloadRole } = actions;
export default reducer;
