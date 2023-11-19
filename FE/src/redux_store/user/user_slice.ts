import { findIndexItem } from './../../utils/function';
import { createSlice } from '@reduxjs/toolkit';
import { initPayloadUser } from 'src/constants/user';
import { IPagination } from 'src/types/common';
import { IPayloadGetUser, IUser } from 'src/types/user';
import { getUserDetail, getUserList, updateUser } from './user_actions';

interface IStationCard {
  id: string;
  name: string;
}

interface IDataState {
  stationList: IStationCard[];
  stationSelectedList: IStationCard[];
}

interface IPayloadTransfer {
  payload: {
    fieldFromTransfer: string;
    fieldToTransfer: string;
    dataTransfer: any[];
  };
}

interface IUserState {
  userData: IPagination<IUser>;
  payload: IPayloadGetUser;
  selectedId: string;
  userInfo: IUser;
  typeTabSelected: 'general' | 'permission' | 'station' | 'camera';
  configData: IDataState;
  trackAllStation: boolean;
}

const initialState: IUserState = {
  userData: {
    data: [],
    totalData: 0,
  },
  payload: initPayloadUser,
  selectedId: '',
  userInfo: {} as IUser,
  typeTabSelected: 'general',
  configData: { stationList: [], stationSelectedList: [] },
  trackAllStation: false,
};

const userSlice = createSlice({
  name: 'userManagement',
  initialState,
  reducers: {
    setSelectedId: (state, action: { payload: string }) => {
      state.selectedId = action.payload;
    },
    changePayloadUser: (state, action: { payload: IPayloadGetUser }) => {
      state.payload = action.payload;
    },

    changeTypeTabDetail: (state, action) => {
      state.typeTabSelected = action.payload;
    },
    transferData: (state, action: IPayloadTransfer) => {
      const { fieldFromTransfer, fieldToTransfer, dataTransfer } = action.payload;
      const cloneDataList = [...state.configData[fieldFromTransfer as keyof IDataState]];

      dataTransfer?.map((item: any) => {
        const index = cloneDataList.findIndex((data) => data.id === item.id);
        cloneDataList.splice(index, 1);
      });

      const cloneDataListSelected = [...state.configData[fieldToTransfer as keyof IDataState]];
      const newDataSelectedList = cloneDataListSelected.concat(dataTransfer);

      state.configData[fieldFromTransfer as keyof IDataState] = cloneDataList;
      state.configData[fieldToTransfer as keyof IDataState] = newDataSelectedList;
    },

    setStationList: (state, action) => {
      const data = action.payload;
      state.configData.stationList = data;
    },
    setStationSelectDefault: (state, action) => {
      const data = action.payload;
      state.configData.stationSelectedList = data;
    },

    changeTrackAllStation: (state, action: { payload: boolean }) => {
      state.trackAllStation = action.payload;
    },

    resetTransferData: (state) => {
      state.configData.stationList = [];
      state.configData.stationSelectedList = [];
      state.trackAllStation = false;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getUserList.fulfilled, (state, action) => {
        const data = action.payload;

        state.userData = data;
      })
      .addCase(getUserDetail.fulfilled, (state, action) => {
        state.userInfo = action.payload;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        const newUser = action.payload;
        const userId = action.meta.arg.userId;
        const currentData = [...state.userData.data];
        const index = findIndexItem(currentData, userId);

        if (index !== -1) {
          currentData.splice(index, 1, newUser);
          state.userInfo = newUser;
          state.userData.data = currentData;
        }
      });
  },
});

const { actions, reducer } = userSlice;
export const {
  setSelectedId,
  changePayloadUser,
  changeTypeTabDetail,
  transferData,
  setStationList,
  setStationSelectDefault,
  changeTrackAllStation,
  resetTransferData,
} = actions;
export default reducer;
