import { configureStore } from '@reduxjs/toolkit';
import teacherReducer from '../features/teachers/teacherSlice';
import toastReducer from '../features/toast/toastSlice';

export const store = configureStore({
  reducer: {
    teachers: teacherReducer,
    toast: toastReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
