import { createSlice } from '@reduxjs/toolkit';

interface ITopBarState {
  indexActive: number | null;
  openRightContent: boolean;
  typeContentShow: 'notification' | '';
  isPin: boolean;
}

const topbarSlice = createSlice({
  name: 'topbarState',
  initialState: {
    openRightContent: false,
    isPin: false,
  } as ITopBarState,
  reducers: {
    openBoxRightContent: (state, action) => {
      const { typeId, index } = action.payload;
      state.openRightContent = true;
      state.indexActive = index;
      state.typeContentShow = typeId;
    },

    closeBoxRightContent: (state) => {
      state.indexActive = null;
      state.typeContentShow = '';
      state.openRightContent = false;
    },
    changePinBoxContent: (state, action) => {
      state.isPin = action.payload;
    },
  },
});

export const { openBoxRightContent, closeBoxRightContent, changePinBoxContent } =
  topbarSlice.actions;
export default topbarSlice.reducer;
