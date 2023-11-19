import { createSlice } from '@reduxjs/toolkit';
import { setClientToken } from 'src/clients/http';
import { IUser } from 'src/types/user';
import { getMe, login, logout } from './my_account_actions';

interface IRoleSlice {
  me: IUser | null;
  token: string;
}

const initialState: IRoleSlice = {
  me: null,
  token: '',
};

const myAccountSlice = createSlice({
  name: 'myAccount',
  initialState,
  reducers: {
    logoutLocal: (state) => {
      state.token = '';
      state.me = {} as IUser;
      setClientToken('');
      localStorage.removeItem('token');
    },
    changeName: (state, action: { payload: string }) => {
      const newName = action.payload;
      if (!state.me) return;
      state.me.name = newName;
    },
    changePhone: (state, action: { payload: string }) => {
      const newPhone = action.payload;
      if (!state.me) return;
      state.me.phoneNumber = newPhone;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(login.fulfilled, (state, action) => {
        const { token } = action.payload;
        state.token = token;
        localStorage.setItem('token', token);
      })
      .addCase(getMe.fulfilled, (state, action) => {
        const me = action.payload;
        state.token = localStorage.getItem('token') as string;
        state.me = me;
      })
      .addCase(getMe.rejected, (state) => {
        state.token = '';
        state.me = {} as IUser;

        setClientToken('');
        localStorage.removeItem('token');
      })
      .addCase(logout.fulfilled, (state) => {
        state.me = null;
        localStorage.removeItem('token');
        setClientToken('');
      })
      .addCase(logout.rejected, (state) => {
        state.me = null;
        localStorage.removeItem('token');
        setClientToken('');
      });
  },
});

const { actions, reducer } = myAccountSlice;

export const { logoutLocal, changeName, changePhone } = actions;
export default reducer;
