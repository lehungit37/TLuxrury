import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IModal, IModalState } from 'src/types/common';

const initialState = <IModalState>{};

const modalSlice = createSlice({
  name: 'modalState',
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<IModal>) => {
      const { modalId, modalComponent } = action.payload;

      state[modalId] = {
        open: true,
        modalComponent,
      };
    },

    closeModal: (state, action: PayloadAction<IModal>) => {
      const { modalId } = action.payload;
      delete state[modalId as keyof IModalState];
    },

    resetModal: () => initialState,
  },
});

export const { openModal, closeModal, resetModal } = modalSlice.actions;
export default modalSlice.reducer;
