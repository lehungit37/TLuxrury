import apiSlice from './api/api_slice';

import modalSlice from './common/modal_slice';

import roleSlice from './role/role_slice';
import roomSlice from './room/room_slice';
import roomBookingSlice from './room_booking/room_booking_slice';
import userSlice from './user/user_slice';
import myAccountSlice from './my_account/my_account_slice';

import topBarSlice from './common/topbar/topbar_slice';

export const reducer = {
  modalSlice,
  roomSlice,
  roomBookingSlice,
  roleSlice,
  userSlice,
  myAccountSlice,

  topBarSlice,

  // last reducer require
  apiSlice,
};
