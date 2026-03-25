import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}

interface ToastState {
  messages: ToastMessage[];
}

const initialState: ToastState = {
  messages: [],
};

const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    showToast: (state, action: PayloadAction<Omit<ToastMessage, 'id'>>) => {
      const id = Date.now().toString();
      state.messages.push({ ...action.payload, id });
    },
    hideToast: (state, action: PayloadAction<string>) => {
      state.messages = state.messages.filter((m) => m.id !== action.payload);
    },
  },
});

export const { showToast, hideToast } = toastSlice.actions;
export default toastSlice.reducer;
