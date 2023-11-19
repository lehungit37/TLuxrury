import { AsyncThunk, createSlice } from '@reduxjs/toolkit';

import { TRequestState } from 'src/types/request_status';

type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>;
type PendingAction = ReturnType<GenericAsyncThunk['pending']>;
type FulfilledAction = ReturnType<GenericAsyncThunk['fulfilled']>;

interface IApiState {
  [feat: string]: {
    [action: string]: TRequestState;
  };
}

const initialState: IApiState = {};

const apiSlice = createSlice({
  name: 'api',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      (action): action is PendingAction => action.type.endsWith('/pending'),
      (state, action) => {
        state[action.type.split('/')?.[0]] = {
          ...state[action.type.split('/')?.[0]],
          [action.type.split('/')?.[1]]: {
            status: 'pending',
            error: null,
          },
        };
      },
    );
    builder.addMatcher(
      (action): action is FulfilledAction => action.type.endsWith('/fulfilled'),
      (state, action) => {
        state[action.type.split('/')?.[0]] = {
          ...state[action.type.split('/')?.[0]],
          [action.type.split('/')?.[1]]: {
            status: 'fulfilled',
            error: null,
          },
        };
      },
    );
    builder.addMatcher(
      (action) => action.type.endsWith('/rejected'),
      (state, action) => {
        state[action.type.split('/')?.[0]] = {
          ...state[action.type.split('/')?.[0]],
          [action.type.split('/')?.[1]]: {
            status: 'rejected',
            error: action.payload,
          },
        };
      },
    );
  },
});

export default apiSlice.reducer;
